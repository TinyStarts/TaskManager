-- TinyStarts recommended Row Level Security
-- Run this in the Supabase SQL editor if RLS is not already on.
-- It does not change table columns. Existing task_days, planner_entries,
-- and audit_log stay the same. Safe to review before running.
--
-- Goal: only the signed-in user can read or write their own rows.
-- The public anon key in the web app is not a secret; these policies
-- are what actually protect the data.

alter table public.task_days enable row level security;
alter table public.planner_entries enable row level security;
alter table public.audit_log enable row level security;

-- Drop similarly named policies first if you need to re-run this file.
drop policy if exists "task_days_select_own" on public.task_days;
drop policy if exists "task_days_insert_own" on public.task_days;
drop policy if exists "task_days_update_own" on public.task_days;
drop policy if exists "task_days_delete_own" on public.task_days;
drop policy if exists "planner_entries_select_own" on public.planner_entries;
drop policy if exists "planner_entries_insert_own" on public.planner_entries;
drop policy if exists "planner_entries_update_own" on public.planner_entries;
drop policy if exists "planner_entries_delete_own" on public.planner_entries;
drop policy if exists "audit_log_select_own" on public.audit_log;
drop policy if exists "audit_log_insert_own" on public.audit_log;

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

create policy "audit_log_select_own"
  on public.audit_log for select to authenticated
  using (auth.uid() = user_id);
create policy "audit_log_insert_own"
  on public.audit_log for insert to authenticated
  with check (auth.uid() = user_id);

-- Optional: keep anonymous visitors from touching tables directly.
revoke all on public.task_days, public.planner_entries, public.audit_log from anon;
grant select, insert, update, delete on public.task_days, public.planner_entries to authenticated;
grant select, insert on public.audit_log to authenticated;

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
