-- TinyStarts recommended Row Level Security
-- Run this in the Supabase SQL editor if RLS is not already on.
-- It does not change table columns. Existing task_days, planner_entries,
-- and audit_log stay the same. Safe to review before running.
--
-- Goal: only the signed-in user can read or write their own planner rows.
-- The audit log is insert-only for that same user (no read, update, or delete).
-- The public anon key in the web app is not a secret; these policies
-- are what actually protect the data.
-- Turning off new sign-ups is an Auth setting in the Supabase dashboard,
-- not something this SQL file can do.

alter table public.task_days enable row level security;
alter table public.planner_entries enable row level security;
alter table public.audit_log enable row level security;
alter table public.task_days force row level security;
alter table public.planner_entries force row level security;
alter table public.audit_log force row level security;

-- Drop every existing policy on these tables so an older, wider policy
-- cannot stay in place beside the ones below.
do $$
declare r record;
begin
  for r in
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('task_days', 'planner_entries', 'audit_log')
  loop
    execute format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  end loop;
end $$;

create policy "task_days_select_own"
  on public.task_days for select to authenticated
  using (auth.uid() = user_id);
create policy "task_days_insert_own"
  on public.task_days for insert to authenticated
  with check (auth.uid() = user_id);
create policy "task_days_update_own"
  on public.task_days for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "task_days_delete_own"
  on public.task_days for delete to authenticated
  using (auth.uid() = user_id);

create policy "planner_entries_select_own"
  on public.planner_entries for select to authenticated
  using (auth.uid() = user_id);
create policy "planner_entries_insert_own"
  on public.planner_entries for insert to authenticated
  with check (auth.uid() = user_id);
create policy "planner_entries_update_own"
  on public.planner_entries for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
create policy "planner_entries_delete_own"
  on public.planner_entries for delete to authenticated
  using (auth.uid() = user_id);

-- audit_log is insert-only for the signed-in owner. No select, update, or delete policy.
create policy "audit_log_insert_own"
  on public.audit_log for insert to authenticated
  with check (auth.uid() = user_id);

-- Replace grants so anon cannot touch the tables, and authenticated cannot
-- update or delete the audit log.
revoke all on public.task_days, public.planner_entries, public.audit_log from anon, authenticated;
grant select, insert, update, delete on public.task_days, public.planner_entries to authenticated;
grant insert on public.audit_log to authenticated;

-- Upsert in the app assumes one row per user per date.
-- Skip these if the unique constraints already exist.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'task_days_user_id_date_key'
  ) then
    begin
      alter table public.task_days add constraint task_days_user_id_date_key unique (user_id, date);
    exception when duplicate_object then null;
    end;
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'planner_entries_user_id_date_key'
  ) then
    begin
      alter table public.planner_entries add constraint planner_entries_user_id_date_key unique (user_id, date);
    exception when duplicate_object then null;
    end;
  end if;
end $$;
