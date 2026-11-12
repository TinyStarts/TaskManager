(function () {
  'use strict';

  const DEFAULT_AFFIRMATION = 'I am capable of starting, even when it feels hard.';
  const AFFIRMATIONS = [
    DEFAULT_AFFIRMATION,
    'Progress counts, no matter how small.',
    'I can return to this anytime without judgment.',
    'My effort today is enough.',
    'Starting is the hardest part — and I can do hard things.',
    'I don’t have to finish. I only have to begin.',
    'Small steps still move me forward.',
    'It’s okay to do this imperfectly.',
    'I am allowed to take breaks and come back.',
    'Focus on the next tiny action, not the whole mountain.',
    'I’ve started before. I can start again.',
    'Done is better than perfect right now.',
    'My energy is information, not a verdict.',
    'I can make this smaller until it feels possible.',
    'A slow start is still a start.',
    'I can begin before I feel ready.',
    'My brain is not a problem to solve.',
    'Interest is a kind of fuel, and I can follow a spark.',
    'I can do the next kind thing for future me.',
    'Rest is part of the work, not a detour from it.',
    'I don’t have to earn a break.',
    'One finished tiny step is a real win.',
    'I can ask for help without apologizing for needing it.',
    'Forgetting is human. I can write it down and keep going.',
    'I can change the plan without abandoning myself.',
    'Today only needs a beginning.',
    'I am allowed to do this in the order that works for me.',
    'A messy attempt counts.',
    'I can put the phone down for five minutes and be proud of that.',
    'My worth is not measured by my inbox.',
    'I can start again as many times as I need.',
    'Gentle structure is a kindness, not a cage.',
    'I can notice the urge to quit and still do one more small thing.',
    'I don’t have to do it the hard way to make it count.',
    'Body first, then the task. Water, stretch, then begin.',
    'I can trust a timer more than a mood.',
    'Showing up messy is still showing up.',
    'I can leave a note for myself and call that progress.',
    'The task can be smaller than my worry about it.',
    'I am learning what helps, and that learning counts.',
    'I can celebrate the start, not only the finish.',
    'It’s okay if today is a maintenance day.',
    'I can be on my own side while I figure this out.',
    'A pause is not the same as quitting.',
    'I can choose the easiest honest version of this.',
    'My attention wandering doesn’t erase what I already did.',
    'I can return to the tab, the page, the sentence.',
    'I don’t owe anyone a perfect morning.',
    'I can make the next step visible and then take it.',
    'Boredom is information. I can make the next two minutes kinder.',
    'I can keep promises to myself in tiny sizes.',
    'I am allowed to outgrow a system and try a softer one.',
    'Done for now is a complete sentence.',
    'I can name one thing that went okay and let that be enough.',
    'I don’t have to carry the whole week in this hour.',
    'Starting late is still starting.',
    'I can be proud of the effort nobody saw.',
    'My pace is allowed to be uneven.',
    'I can set the bar on the floor and step over it.',
    'I can come back after a spiral. The door stays open.',
    'I am more than the tasks I didn’t finish.',
    'A five-minute try is a real try.',
    'I can let “good enough” be the goal today.',
    'I can write the first ugly sentence and keep it.',
    'Support is a tool, not a verdict.',
    'I can move my body and let my mind catch up.',
    'I don’t have to feel motivated to take the first step.',
    'Today’s version of me deserves a gentle start.',
    'I can put one thing where I will see it tomorrow.',
    'I am allowed to be both capable and tired.',
    'Small care for myself makes the next task lighter.'
  ];
  const STUCK_HELPS = [
    'Shrink it to the very first 2-minute step and start a 5-minute timer.',
    'Stand up, get water, then open the exact file or tab you need.',
    'Write the next physical action as a verb (“open…”, “type…”, “send…”).',
    'Set a 10-minute timer and only do that one tiny piece.',
    'Clear your desk of everything except what this task needs.',
    'Tell yourself you’ll only do the first sentence / first click.',
    'Put on one song and work until it ends.',
    'Move to a different spot in the room and restart.',
    'Name the feeling out loud, then do the smallest next action.',
    'Open a blank note and type the next three words only.',
    'Set a timer for 3 minutes and stop when it rings — no more.',
    'Ask: what’s the version of this that takes under 60 seconds?'
  ];
  const TINY_ACTIONS = [
    'What’s the very next physical action?',
    'Open the exact tab or file this needs.',
    'Write the first three words only.',
    'Set a 5-minute timer and stop when it ends.',
    'Stand up, then sit back down and start.'
  ];
  const EASIER_PROMPTS = [
    'What would make this 10% easier right now?',
    'What if you only had to do the first 2 minutes?',
    'Who or what could reduce the friction?',
    'What’s the version of this that feels possible today?',
    'What would you tell a friend who was stuck here?'
  ];
  const DEFAULT_REMINDERS = [
    { startHour: 6, endHour: 7, endMinute: 30, text: 'Morning setup — set your Top 3 and energy.' },
    { startHour: 8, text: 'Breakfast supplements.' },
    { startHour: 12, text: 'Midday check + lunch supplements.' },
    { startHour: 21, text: 'Bedtime supplements.' }
  ];

  const AUTH_EMAIL_DOMAIN = 'users.tinystarts.app';
  const SUPABASE_URL = 'https://wqbssirqnbbeftgskktb.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxYnNzaXJxbmJiZWZ0Z3Nra3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNzcxODQsImV4cCI6MjEwNzg1MzE4NH0.XsHIZ5kZTSv10UGZwEy-4Urv-GTUyb23-BOeRYi1u8Q';

  const memoryStore = {};
  let sb = null;
  let currentUser = null;
  let authBusy = false;
  let appReady = false;
  let editingKey = null;
  let pickerMonth = new Date();
  let dayDirty = false;
  let plannerDate = new Date();
  let plannerView = 'week';
  let editingPlanner = null;
  let dragState = null;
  let saveTimer = null;
  let timerInterval = null;
  let timerEndsAt = 0;
  let lastAff = -1;
  let lastStuck = -1;
  let undoStack = [];

  function $(id) { return document.getElementById(id); }
  function todayKey() { return dateKey(new Date()); }
  function activeKey() { return editingKey || todayKey(); }
  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function parseDateKey(key) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key || '')) return null;
    const d = new Date(key + 'T12:00:00');
    return isNaN(d.getTime()) ? null : d;
  }
  function readDateParam() {
    try {
      const value = new URLSearchParams(location.search).get('date');
      return parseDateKey(value) ? value : null;
    } catch (err) { return null; }
  }
  function writeDateParam(key, push) {
    const url = new URL(location.href);
    if (!key || key === todayKey()) url.searchParams.delete('date');
    else url.searchParams.set('date', key);
    const next = url.pathname + url.search + url.hash;
    const current = location.pathname + location.search + location.hash;
    if (next === current) return;
    if (push) history.pushState({ date: key || '' }, '', next);
    else history.replaceState({ date: key || '' }, '', next);
  }
  function isDeletedRecord(data) {
    return !!(data && data.deleted === true);
  }
  function recordTime(data) {
    if (!data) return 0;
    return Date.parse(data.deletedAt || data.savedAt || 0) || 0;
  }
  function mergeDayRecord(local, remote) {
    if (!local) return remote || null;
    if (!remote) return local;
    return recordTime(remote) >= recordTime(local) ? remote : local;
  }

  function safeGet(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value == null ? fallback : value;
    } catch (err) {
      return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : fallback;
    }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); }
    catch (err) { memoryStore[key] = value; }
  }
  function sessionGet(key) {
    try { return sessionStorage.getItem(key); } catch (err) { return memoryStore['s:' + key] || null; }
  }
  function sessionSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch (err) { memoryStore['s:' + key] = value; }
  }
  function loadJson(key, fallback) {
    try {
      const raw = safeGet(key, null);
      if (raw == null || raw === '') return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch (err) { return fallback; }
  }
  function saveJson(key, value) { safeSet(key, JSON.stringify(value)); }
  function getDayMap() { return loadJson('task-days', {}); }
  function getPlannerMap() { return loadJson('planner-entries', {}); }

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeEventType(type) {
    return type === 'personal' || type === 'health' || type === 'errand' || type === 'work' ? type : 'work';
  }

  function normalizeTop3(list) {
    const rows = Array.isArray(list) ? list.map(function (item) {
      if (typeof item === 'string') return { text: item, done: false, estimate: '' };
      return {
        text: (item && item.text) || '',
        done: !!(item && item.done),
        estimate: (item && item.estimate) || ''
      };
    }) : [];
    while (rows.length < 3) rows.push({ text: '', done: false, estimate: '' });
    return rows;
  }
  function energySlotCount(level) {
    if (level === 'High') return 3;
    if (level === 'Medium') return 2;
    return 1;
  }
  function currentEnergy() {
    const btn = document.querySelector('#energyBtns button.active');
    return btn ? btn.dataset.level : null;
  }
  function normalizeMeds(meds) {
    const src = meds && typeof meds === 'object' ? meds : {};
    return { morning: !!src.morning, afternoon: !!src.afternoon };
  }
  function normalizeMicro(list) {
    if (!Array.isArray(list)) return [];
    return list.map(function (item) {
      if (typeof item === 'string') return { text: item, done: false };
      return { text: (item && item.text) || '', done: !!(item && item.done) };
    }).filter(function (item) { return item.text; });
  }

  function setTheme(next) {
    const theme = next === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    safeSet('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1a1c1b' : '#3f6f62');
  }
  function initTheme() {
    const saved = safeGet('theme', '');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    else setTheme('light');
  }

  function showToast(message, type, duration, undo) {
    const container = $('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    const span = document.createElement('span');
    span.textContent = message;
    toast.appendChild(span);
    if (undo) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn';
      btn.style.cssText = 'width:auto;min-height:32px;padding:4px 10px;background:#fff;color:#1f2930;';
      btn.textContent = 'Undo';
      btn.addEventListener('click', function () { undoLast(); toast.remove(); });
      toast.appendChild(btn);
    }
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      setTimeout(function () { toast.remove(); }, 300);
    }, duration || 3000);
  }
  function setSaveStatus(text) {
    const el = $('saveStatus');
    if (!el) return;
    el.textContent = text || '';
    el.classList.toggle('show', !!text);
  }
  function openModal(id) { const el = $(id); if (el) el.classList.add('show'); }
  function closeModal(id) { const el = $(id); if (el) el.classList.remove('show'); }

  function currentDayDataFromDom() {
    const energyBtn = document.querySelector('#energyBtns button.active');
    const top3 = [];
    document.querySelectorAll('#top3 .task-row').forEach(function (row) {
      const textEl = row.querySelector('input[type="text"]');
      const doneEl = row.querySelector('input[type="checkbox"]');
      const estBtn = row.querySelector('.est-chips button.active');
      top3.push({
        text: textEl ? textEl.value : '',
        done: !!(doneEl && doneEl.checked),
        estimate: estBtn ? estBtn.dataset.estimate : ''
      });
    });
    const micro = [];
    document.querySelectorAll('#microList .micro-row').forEach(function (row) {
      const textEl = row.querySelector('input[type="text"]');
      const doneEl = row.querySelector('input[type="checkbox"]');
      const text = textEl ? textEl.value.trim() : '';
      if (text) micro.push({ text: text, done: !!(doneEl && doneEl.checked) });
    });
    return {
      energy: energyBtn ? energyBtn.dataset.level : null,
      top3: normalizeTop3(top3),
      micro: micro,
      brainDump: ($('brainDump') || {}).value || '',
      gotDone: (($('gotDone') || {}).value || '').trim(),
      carryOver: (($('carryOver') || {}).value || '').trim(),
      tomorrow1: (($('tomorrow1') || {}).value || '').trim(),
      affirmation: ((($('affirmation') || {}).value || '').trim()) || DEFAULT_AFFIRMATION,
      meds: normalizeMeds({
        morning: !!( $('meds-morning') && $('meds-morning').checked ),
        afternoon: !!( $('meds-afternoon') && $('meds-afternoon').checked )
      }),
      savedAt: new Date().toISOString()
    };
  }

  function renderTop3(list) {
    const wrap = $('top3');
    if (!wrap) return;
    wrap.innerHTML = '';
    const placeholders = [
      'Next small action…',
      'Another small action…',
      'A third, if you want one…'
    ];
    const labels = ['First priority', 'Second priority', 'Third priority'];
    const rows = normalizeTop3(list);
    rows.forEach(function (item, i) {
      const n = i + 1;
      const row = document.createElement('div');
      row.className = 'task-row' + (item.done ? ' done' : '');
      row.id = 'top3-row-' + n;
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.id = 'top3-done-' + n;
      cb.name = 'top3-done-' + n;
      cb.checked = !!item.done;
      cb.setAttribute('aria-label', (labels[i] || ('Priority ' + n)) + ' done');
      const lab = document.createElement('label');
      lab.className = 'visually-hidden';
      lab.htmlFor = 'top3-text-' + n;
      lab.textContent = labels[i] || ('Priority ' + n);
      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'top3-text-' + n;
      input.name = 'top3-text-' + n;
      input.value = item.text;
      input.placeholder = placeholders[i] || 'Another small action…';
      input.setAttribute('aria-label', labels[i] || ('Priority ' + n));
      cb.addEventListener('change', function () {
        row.classList.toggle('done', cb.checked);
        scheduleSave();
      });
      input.addEventListener('input', scheduleSave);
      const main = document.createElement('div');
      main.className = 'task-main';
      main.style.flex = '1';
      main.style.minWidth = '0';
      const line = document.createElement('div');
      line.className = 'task-line';
      line.style.display = 'flex';
      line.style.alignItems = 'flex-start';
      line.style.gap = '12px';
      line.appendChild(cb);
      line.appendChild(lab);
      line.appendChild(input);
      const meta = document.createElement('div');
      meta.className = 'task-meta';
      const chips = document.createElement('div');
      chips.className = 'est-chips';
      chips.setAttribute('role', 'group');
      chips.setAttribute('aria-label', 'Time estimate for task ' + n);
      ['15m', '30m', '1h'].forEach(function (est) {
        const b = document.createElement('button');
        b.type = 'button';
        b.id = 'top3-est-' + est + '-' + n;
        b.dataset.estimate = est;
        b.textContent = est;
        if (item.estimate === est) b.classList.add('active');
        b.addEventListener('click', function () {
          const on = !b.classList.contains('active');
          chips.querySelectorAll('button').forEach(function (x) { x.classList.remove('active'); });
          if (on) b.classList.add('active');
          scheduleSave();
        });
        chips.appendChild(b);
      });
      const tools = document.createElement('div');
      tools.className = 'task-tools';
      const cal = document.createElement('button');
      cal.type = 'button';
      cal.id = 'top3-cal-' + n;
      cal.textContent = 'Put on my calendar';
      cal.addEventListener('click', function () { putTop3OnCalendar(i); });
      const park = document.createElement('button');
      park.type = 'button';
      park.id = 'top3-not-today-' + n;
      park.className = 'not-today';
      park.textContent = 'Not today';
      park.addEventListener('click', function () { notToday(i); });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.id = 'top3-delete-' + n;
      remove.className = 'icon-text';
      remove.textContent = 'Delete';
      remove.setAttribute('aria-label', 'Delete priority ' + n);
      remove.addEventListener('click', function () { deleteTop3(i); });
      tools.appendChild(cal);
      tools.appendChild(park);
      tools.appendChild(remove);
      meta.appendChild(chips);
      meta.appendChild(tools);
      main.appendChild(line);
      main.appendChild(meta);
      row.appendChild(main);
      // keep checkbox in the row visually at left - already in line
      wrap.appendChild(row);
    });
    applyEnergySlots();
  }

  function renderMicro(list) {
    const wrap = $('microList');
    if (!wrap) return;
    wrap.innerHTML = '';
    const items = normalizeMicro(list);
    if (!items.length) addMicroRow('', false);
    else items.forEach(function (item) { addMicroRow(item.text, item.done); });
  }

  function renumberMicros() {
    const rows = document.querySelectorAll('#microList .micro-row');
    rows.forEach(function (row, idx) {
      const n = idx + 1;
      const cb = row.querySelector('input[type="checkbox"]');
      const input = row.querySelector('input[type="text"]');
      const lab = row.querySelector('label');
      if (cb) {
        cb.id = 'micro-done-' + n;
        cb.name = 'micro-done-' + n;
        cb.setAttribute('aria-label', 'Micro-start ' + n + ' done');
      }
      if (input) {
        input.id = 'micro-text-' + n;
        input.name = 'micro-text-' + n;
        input.setAttribute('aria-label', 'Micro-start ' + n);
      }
      if (lab) {
        lab.htmlFor = 'micro-text-' + n;
        lab.textContent = 'Micro-start ' + n;
      }
    });
  }

  function addMicroRow(text, done) {
    const wrap = $('microList');
    const row = document.createElement('div');
    row.className = 'micro-row task-row';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!done;
    const lab = document.createElement('label');
    lab.className = 'visually-hidden';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = text || '';
    input.placeholder = 'Micro-start…';
    cb.addEventListener('change', scheduleSave);
    input.addEventListener('input', scheduleSave);
    row.appendChild(cb);
    row.appendChild(lab);
    row.appendChild(input);
    wrap.appendChild(row);
    renumberMicros();
    return input;
  }

  function fillDayForm(data) {
    const day = data || {};
    const aff = (day.affirmation && String(day.affirmation).trim()) || dailyAffirmation(activeKey());
    showAffirmation(aff);
    document.querySelectorAll('#energyBtns button').forEach(function (btn) {
      const on = btn.dataset.level === day.energy;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderTop3(day.top3);
    renderMicro(day.micro);
    if ($('brainDump')) $('brainDump').value = day.brainDump || '';
    renderBrainLines();
    if ($('gotDone')) $('gotDone').value = day.gotDone || '';
    if ($('carryOver')) $('carryOver').value = day.carryOver || '';
    if ($('tomorrow1')) $('tomorrow1').value = day.tomorrow1 || '';
    const meds = normalizeMeds(day.meds);
    if ($('meds-morning')) $('meds-morning').checked = meds.morning;
    if ($('meds-afternoon')) $('meds-afternoon').checked = meds.afternoon;
    updateTodayTagline();
  }

  function loadDay() {
    const key = activeKey();
    const all = getDayMap();
    const data = all[key] || {};
    fillDayForm(isDeletedRecord(data) ? {} : data);
    dayDirty = false;
    checkCarryOver();
    updateTodayHeading();
    renderDayEvents();
    renderEnergyCalendar();
    renderWinsThisWeek();
    renderWeeklySummary();
    renderHistory();
    renderMyAffirmations();
    updateEditingBanner();
  }

  function maybePrefillTomorrow() {
    /* Unchecked items from yesterday are offered as tap-to-add suggestions instead of being auto-filled. */
  }

  function updateTodayHeading() {
    const el = $('todayHeading');
    if (!el) return;
    const key = activeKey();
    const date = new Date(key + 'T12:00:00');
    el.textContent = date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    const title = $('top3Title');
    if (title) title.textContent = key === todayKey() ? 'Today’s Top 3' : 'Top 3';
    const jump = $('jumpTodayBtn');
    if (jump) jump.hidden = key === todayKey();
    updateTodayTagline();
  }

  function updateTodayTagline() {
    const el = $('todayTagline');
    if (!el) return;
    const n = energySlotCount(currentEnergy());
    const phrases = {
      1: 'One small next action is enough.',
      2: 'Two small next actions is enough.',
      3: 'Three small next actions is enough.'
    };
    el.textContent = currentEnergy()
      ? phrases[n]
      : 'Start with your energy, then one small next action.';
    const hint = $('top3Hint');
    if (hint) hint.textContent = 'Write the next concrete step, not the whole project.';
  }

  function updateEditingBanner() {
    const banner = $('editingBanner');
    if (!banner) return;
    if (editingKey && editingKey !== todayKey()) {
      banner.style.display = 'block';
      const label = new Date(editingKey + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      $('editingLabel').textContent = 'Viewing ' + label + '.';
    } else {
      banner.style.display = 'none';
    }
  }

  function scheduleSave() {
    dayDirty = true;
    setSaveStatus('Saving…');
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDay, 500);
  }

  function flushSave() {
    if (!dayDirty) return;
    clearTimeout(saveTimer);
    saveTimer = null;
    saveDay();
  }

  function dayHasContent(data) {
    if (!data || isDeletedRecord(data)) return false;
    if (data.energy) return true;
    if (String(data.brainDump || '').trim()) return true;
    if (String(data.gotDone || '').trim() || String(data.carryOver || '').trim() || String(data.tomorrow1 || '').trim()) return true;
    if (normalizeTop3(data.top3).some(function (t) { return t.text && String(t.text).trim(); })) return true;
    if (Array.isArray(data.micro) && data.micro.some(function (m) { return m && String(m.text || '').trim(); })) return true;
    if (data.meds && (data.meds.morning || data.meds.afternoon)) return true;
    return false;
  }

  function dateHasDot(key) {
    return dayHasContent(getDayMap()[key]) || loadPlannerItems(key).length > 0;
  }

  function closeDayChrome() {
    const picker = $('dayPicker');
    const menu = $('dayMenu');
    if (picker) picker.hidden = true;
    if (menu) menu.hidden = true;
    const opener = $('openDayPickerBtn');
    const menuBtn = $('dayMenuBtn');
    if (opener) opener.setAttribute('aria-expanded', 'false');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  function openDay(key, push) {
    const parsed = parseDateKey(key);
    if (!parsed) return;
    flushSave();
    const next = dateKey(parsed);
    editingKey = next === todayKey() ? null : next;
    plannerDate = new Date(parsed.getTime());
    pickerMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    writeDateParam(next, !!push);
    closeDayChrome();
    loadDay();
    renderPlanner();
  }

  function renderBrainLines() {
    const list = $('brainDumpLines');
    const box = $('brainDump');
    if (!list || !box) return;
    list.innerHTML = '';
    const lines = String(box.value || '').split('\n');
    lines.forEach(function (line, index) {
      if (!line.trim()) return;
      const li = document.createElement('li');
      li.className = 'brain-line';
      li.id = 'brain-line-' + (index + 1);
      const span = document.createElement('span');
      span.textContent = line.trim();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'icon-text';
      btn.id = 'brain-line-delete-' + (index + 1);
      btn.textContent = 'Delete';
      btn.setAttribute('aria-label', 'Delete brain dump line ' + (index + 1));
      btn.addEventListener('click', function () { deleteBrainLine(index); });
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function deleteBrainLine(index) {
    const box = $('brainDump');
    if (!box) return;
    const previous = box.value;
    const lines = previous.split('\n');
    if (!lines[index] || !lines[index].trim()) return;
    lines.splice(index, 1);
    box.value = lines.join('\n');
    undoStack.push({ type: 'brain', key: activeKey(), previous: previous });
    renderBrainLines();
    dayDirty = true;
    saveDay();
    showToast('Line removed', 'info', 8000, true);
  }

  function deleteTop3(index) {
    const data = currentDayDataFromDom();
    const previous = data.top3.map(function (item) {
      return { text: item.text, done: item.done, estimate: item.estimate || '' };
    });
    if (!previous[index] || !String(previous[index].text || '').trim()) return;
    const next = previous.filter(function (_, i) { return i !== index; });
    undoStack.push({ type: 'top3', key: activeKey(), previous: previous });
    renderTop3(next);
    dayDirty = true;
    saveDay();
    showToast('Task removed', 'info', 8000, true);
  }

  function renderDayEvents() {
    const wrap = $('dayEvents');
    if (!wrap) return;
    const key = activeKey();
    const items = loadPlannerItems(key);
    wrap.innerHTML = '';
    const hint = $('dayEventsHint');
    if (hint) hint.textContent = items.length ? 'Events saved on this date.' : 'Nothing scheduled this day.';
    items.forEach(function (item, index) {
      const row = document.createElement('div');
      row.className = 'day-event';
      row.id = 'day-event-' + (index + 1);
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'event-open';
      open.id = 'day-event-open-' + (index + 1);
      const when = document.createElement('span');
      when.className = 'when';
      when.textContent = item.allDay ? 'All day' : (formatTimeLabel(eventStart(item)) + ' – ' + formatTimeLabel(eventEnd(item)));
      const title = document.createElement('span');
      title.textContent = item.text || 'Event';
      open.appendChild(when);
      open.appendChild(title);
      open.addEventListener('click', function () { openEditItem(key, index); });
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'icon-text';
      del.id = 'day-event-delete-' + (index + 1);
      del.textContent = 'Delete';
      del.setAttribute('aria-label', 'Delete event ' + (index + 1));
      del.addEventListener('click', function () { deletePlannerItem(key, index); });
      row.appendChild(open);
      row.appendChild(del);
      wrap.appendChild(row);
    });
  }

  function clearDay(key, message) {
    if (!parseDateKey(key)) return;
    if (!confirm(message || 'Clear this day? Tasks, notes, and events on this date will be removed. You can undo for a few seconds.')) return;
    clearTimeout(saveTimer);
    saveTimer = null;
    dayDirty = false;
    const all = getDayMap();
    const previousDay = all[key] ? JSON.parse(JSON.stringify(all[key])) : null;
    const previousPlans = loadPlannerItems(key).map(function (item) { return JSON.parse(JSON.stringify(item)); });
    const stamp = new Date().toISOString();
    const tomb = { deleted: true, deletedAt: stamp, savedAt: stamp };
    all[key] = tomb;
    saveJson('task-days', all);
    cloudUpsertDay(key, tomb);
    const plans = getPlannerMap();
    plans[key] = [{ _meta: true, savedAt: stamp, deleted: true }];
    saveJson('planner-entries', plans);
    const meta = loadJson('planner-updated', {});
    meta[key] = stamp;
    saveJson('planner-updated', meta);
    cloudUpsertPlanner(key, plans[key]);
    undoStack.push({ type: 'clear', key: key, day: previousDay, plans: previousPlans });
    if (activeKey() === key) loadDay();
    renderPlanner();
    renderHistory();
    renderEnergyCalendar();
    renderWeeklySummary();
    closeDayChrome();
    showToast('Day cleared', 'info', 8000, true);
  }

  function renderDayPicker() {
    const root = $('dayPicker');
    if (!root) return;
    root.innerHTML = '';
    const year = pickerMonth.getFullYear();
    const month = pickerMonth.getMonth();
    const head = document.createElement('div');
    head.className = 'mini-cal-head';
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'icon-btn';
    prev.id = 'dayPickerPrev';
    prev.setAttribute('aria-label', 'Previous month');
    prev.textContent = '‹';
    prev.addEventListener('click', function () {
      pickerMonth = new Date(year, month - 1, 1);
      renderDayPicker();
    });
    const title = document.createElement('strong');
    title.id = 'dayPickerLabel';
    title.textContent = pickerMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'icon-btn';
    next.id = 'dayPickerNext';
    next.setAttribute('aria-label', 'Next month');
    next.textContent = '›';
    next.addEventListener('click', function () {
      pickerMonth = new Date(year, month + 1, 1);
      renderDayPicker();
    });
    head.appendChild(prev);
    head.appendChild(title);
    head.appendChild(next);
    root.appendChild(head);
    const grid = document.createElement('div');
    grid.className = 'mini-grid';
    grid.id = 'dayPickerGrid';
    ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(function (d) {
      const el = document.createElement('div');
      el.className = 'mini-dow';
      el.textContent = d;
      grid.appendChild(el);
    });
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    const selected = activeKey();
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dateKey(d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mini-day'
        + (d.getMonth() !== month ? ' muted' : '')
        + (key === todayKey() ? ' today' : '')
        + (key === selected ? ' selected' : '')
        + (dateHasDot(key) ? ' has-events' : '');
      btn.id = 'day-pick-' + key;
      btn.textContent = String(d.getDate());
      btn.setAttribute('aria-label', d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }));
      btn.addEventListener('click', function () { openDay(key, true); });
      grid.appendChild(btn);
    }
    root.appendChild(grid);
  }

  function toggleDayPicker() {
    const picker = $('dayPicker');
    if (!picker) return;
    const open = picker.hidden;
    closeDayChrome();
    if (open) {
      const current = parseDateKey(activeKey()) || new Date();
      pickerMonth = new Date(current.getFullYear(), current.getMonth(), 1);
      picker.hidden = false;
      if ($('openDayPickerBtn')) $('openDayPickerBtn').setAttribute('aria-expanded', 'true');
      renderDayPicker();
    }
  }

  function toggleDayMenu() {
    const menu = $('dayMenu');
    if (!menu) return;
    const open = menu.hidden;
    closeDayChrome();
    if (open) {
      menu.hidden = false;
      if ($('dayMenuBtn')) $('dayMenuBtn').setAttribute('aria-expanded', 'true');
    }
  }

  function saveDay() {
    if (!currentUser) return;
    dayDirty = false;
    const all = getDayMap();
    const key = activeKey();
    const data = currentDayDataFromDom();
    all[key] = data;
    saveJson('task-days', all);
    showAffirmation(data.affirmation);
    setSaveStatus('Saved');
    renderEnergyCalendar();
    renderWinsThisWeek();
    renderWeeklySummary();
    renderHistory();
    scheduleSyncPush();
    cloudUpsertDay(key, data);
  }

  function checkCarryOver() {
    const prompt = $('carryPrompt');
    if (!prompt) return;
    prompt.innerHTML = '';
    prompt.style.display = 'none';
    prompt.classList.remove('show');
    if (activeKey() !== todayKey()) return;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yData = getDayMap()[dateKey(y)] || {};
    const todayTexts = normalizeTop3(currentDayDataFromDom().top3).map(function (t) { return t.text.trim().toLowerCase(); }).filter(Boolean);
    const suggestions = [];
    normalizeTop3(yData.top3).forEach(function (t) {
      if (t.text && !t.done && todayTexts.indexOf(t.text.trim().toLowerCase()) === -1) suggestions.push({ text: t.text, estimate: t.estimate || '', source: 'yesterday' });
    });
    if (yData.tomorrow1 && todayTexts.indexOf(yData.tomorrow1.trim().toLowerCase()) === -1) {
      const already = suggestions.some(function (s) { return s.text.trim().toLowerCase() === yData.tomorrow1.trim().toLowerCase(); });
      if (!already) suggestions.push({ text: yData.tomorrow1, estimate: '', source: 'tomorrow' });
    }
    if (!suggestions.length) return;
    prompt.style.display = 'block';
    prompt.classList.add('show');
    const intro = document.createElement('p');
    intro.className = 'hint';
    intro.id = 'carryPromptText';
    intro.textContent = 'From yesterday, if you want them today. Tap to add.';
    prompt.appendChild(intro);
    const list = document.createElement('div');
    list.className = 'suggest-list';
    list.id = 'carrySuggestions';
    suggestions.forEach(function (s, i) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggest-chip';
      btn.id = 'carry-suggest-' + (i + 1);
      btn.appendChild(document.createTextNode(s.text));
      const mark = document.createElement('span');
      mark.textContent = 'Add';
      btn.appendChild(mark);
      btn.addEventListener('click', function () { addSuggestionToTop3(s); });
      list.appendChild(btn);
    });
    prompt.appendChild(list);
  }

  function carryForward() {
    /* Replaced by tap-to-add suggestions. */
  }

  function addSuggestionToTop3(suggestion) {
    if (!suggestion || !suggestion.text) return;
    addToTop3(suggestion.text, suggestion.estimate);
    checkCarryOver();
  }

  function applyEnergySlots() {
    const cap = energySlotCount(currentEnergy());
    const rows = document.querySelectorAll('#top3 .task-row');
    let lastFilled = -1;
    rows.forEach(function (row, i) {
      const input = row.querySelector('input[type="text"]');
      if (input && input.value.trim()) lastFilled = i;
    });
    const showUntil = Math.max(cap, lastFilled + 1);
    rows.forEach(function (row, i) {
      row.classList.toggle('hidden-slot', i >= showUntil);
    });
    const addBtn = $('addAnotherTask');
    if (addBtn) addBtn.hidden = showUntil >= rows.length;
    updateTodayTagline();
  }

  function revealAnotherTask() {
    const rows = Array.from(document.querySelectorAll('#top3 .task-row'));
    const hidden = rows.find(function (row) { return row.classList.contains('hidden-slot'); });
    if (!hidden) return;
    hidden.classList.remove('hidden-slot');
    const input = hidden.querySelector('input[type="text"]');
    if (input) input.focus();
    const addBtn = $('addAnotherTask');
    if (addBtn) addBtn.hidden = !rows.some(function (row) { return row.classList.contains('hidden-slot'); });
  }

  function notToday(index) {
    const data = currentDayDataFromDom();
    const item = data.top3[index];
    if (!item || !item.text.trim()) return;
    const moved = { text: item.text.trim(), done: false, estimate: item.estimate || '' };
    const today = new Date(activeKey() + 'T12:00:00');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tKey = dateKey(tomorrow);
    const all = getDayMap();
    const tDay = all[tKey] || {};
    const list = normalizeTop3(tDay.top3 || []);
    let placed = false;
    for (let i = 0; i < list.length; i++) {
      if (!list[i].text.trim()) { list[i] = moved; placed = true; break; }
    }
    if (!placed) list.push(moved);
    tDay.top3 = list;
    tDay.savedAt = new Date().toISOString();
    all[tKey] = tDay;
    saveJson('task-days', all);
    cloudUpsertDay(tKey, tDay);
    const input = $('top3-text-' + (index + 1));
    const done = $('top3-done-' + (index + 1));
    if (input) input.value = '';
    if (done) done.checked = false;
    const row = $('top3-row-' + (index + 1));
    if (row) {
      row.classList.remove('done');
      row.querySelectorAll('.est-chips button').forEach(function (b) { b.classList.remove('active'); });
    }
    saveDay();
    applyEnergySlots();
    showToast('Moved to tomorrow', 'info');
  }

  function durationFromEstimate(est) {
    if (est === '15m') return 15;
    if (est === '1h') return 60;
    return 30;
  }

  function putTop3OnCalendar(index) {
    const item = currentDayDataFromDom().top3[index];
    if (!item || !item.text.trim()) {
      showToast('Write the task first', 'info');
      return;
    }
    const key = activeKey();
    const mins = durationFromEstimate(item.estimate);
    const slot = nextFreeSlot(key, mins);
    const items = loadPlannerItems(key);
    items.push({
      text: item.text.trim(),
      done: false,
      start: slot.start,
      end: slot.end,
      type: 'work',
      allDay: false
    });
    savePlannerItems(key, items);
    showToast('Added to your schedule at ' + formatTimeLabel(slot.start), 'success');
  }

  function hashString(value) {
    let h = 2166136261;
    const s = String(value || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function getAffirmationStore() {
    const raw = loadJson('user-affirmations', {});
    const items = Array.isArray(raw.items) ? raw.items.filter(function (item) {
      return item && item.id && String(item.text || '').trim();
    }) : [];
    return { items: items, mixOwn: !!raw.mixOwn, savedAt: raw.savedAt || '' };
  }

  function visibleAffirmations(store) {
    return (store && store.items ? store.items : []).filter(function (item) {
      return item && !item.deletedAt && String(item.text || '').trim();
    });
  }

  function affirmationPool() {
    const pool = AFFIRMATIONS.slice();
    const store = getAffirmationStore();
    if (store.mixOwn) {
      visibleAffirmations(store).forEach(function (item) {
        const text = String(item.text).trim();
        if (pool.indexOf(text) === -1) pool.push(text);
      });
    }
    return pool.length ? pool : [DEFAULT_AFFIRMATION];
  }

  function dailyAffirmation(key) {
    const pool = affirmationPool();
    return pool[hashString('tinystarts|' + (key || todayKey())) % pool.length];
  }

  function showAffirmation(text) {
    const value = String(text || '').trim() || dailyAffirmation(activeKey());
    if ($('affirmation')) $('affirmation').value = value;
    if ($('affirmationText')) $('affirmationText').textContent = value;
    const btn = $('affirmationSaveBtn');
    if (btn) {
      const saved = visibleAffirmations(getAffirmationStore()).some(function (item) {
        return item.text.trim().toLowerCase() === value.toLowerCase();
      });
      btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      btn.textContent = saved ? '♥ Saved' : '♡ Save';
    }
  }

  function shuffleAffirmation() {
    const pool = affirmationPool();
    const current = (($('affirmation') && $('affirmation').value) || '').trim();
    let next = pool[Math.floor(Math.random() * pool.length)];
    let guard = 0;
    while (pool.length > 1 && next === current && guard < 12) {
      next = pool[Math.floor(Math.random() * pool.length)];
      guard++;
    }
    showAffirmation(next);
    dayDirty = true;
    saveDay();
  }

  function renderMyAffirmations() {
    const list = $('myAffirmationList');
    if (!list) return;
    const store = getAffirmationStore();
    if ($('affirmationMixToggle')) $('affirmationMixToggle').checked = !!store.mixOwn;
    list.innerHTML = '';
    const rows = visibleAffirmations(store);
    if (!rows.length) {
      const empty = document.createElement('li');
      empty.className = 'hint';
      empty.id = 'myAffirmationEmpty';
      empty.textContent = 'Nothing saved yet. A hearted line or one you write will live here.';
      list.appendChild(empty);
      return;
    }
    rows.forEach(function (item, index) {
      const li = document.createElement('li');
      li.className = 'affirmation-item';
      li.id = 'my-affirmation-' + (index + 1);
      const p = document.createElement('p');
      p.textContent = item.text;
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'icon-text';
      edit.id = 'my-affirmation-edit-' + (index + 1);
      edit.textContent = 'Edit';
      edit.addEventListener('click', function () { beginEditAffirmation(item.id); });
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'icon-text';
      del.id = 'my-affirmation-delete-' + (index + 1);
      del.textContent = 'Delete';
      del.addEventListener('click', function () { deleteMyAffirmation(item.id); });
      li.appendChild(p);
      li.appendChild(edit);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  function persistAffirmationStore(store) {
    store.savedAt = new Date().toISOString();
    saveJson('user-affirmations', {
      items: store.items,
      mixOwn: !!store.mixOwn,
      savedAt: store.savedAt
    });
    cloudUpsertAffirmations(store);
    renderMyAffirmations();
    showAffirmation(($('affirmation') && $('affirmation').value) || '');
  }

  function beginEditAffirmation(id) {
    const store = getAffirmationStore();
    const item = visibleAffirmations(store).filter(function (row) { return row.id === id; })[0];
    const input = $('myAffirmationInput');
    if (!item || !input) return;
    input.value = item.text;
    input.dataset.editingId = item.id;
    if ($('myAffirmationAddBtn')) $('myAffirmationAddBtn').textContent = 'Update';
    input.focus();
  }

  function addOrUpdateMyAffirmation() {
    const input = $('myAffirmationInput');
    const text = input ? input.value.trim() : '';
    if (!text) { showToast('Write a sentence first', 'info'); return; }
    if (text.length > 280) { showToast('Keep it to a sentence or two', 'info'); return; }
    const store = getAffirmationStore();
    const editing = input.dataset.editingId || '';
    if (editing) {
      store.items = store.items.map(function (item) {
        if (item.id !== editing) return item;
        return { id: item.id, text: text, savedAt: new Date().toISOString(), deletedAt: null };
      });
      input.dataset.editingId = '';
      if ($('myAffirmationAddBtn')) $('myAffirmationAddBtn').textContent = 'Save mine';
    } else {
      const exists = visibleAffirmations(store).some(function (item) {
        return item.text.trim().toLowerCase() === text.toLowerCase();
      });
      if (exists) { showToast('That’s already in your list', 'info'); return; }
      store.items.push({ id: 'aff-' + Date.now().toString(36), text: text, savedAt: new Date().toISOString(), deletedAt: null });
    }
    input.value = '';
    persistAffirmationStore(store);
    showToast('Saved to your list', 'success');
  }

  function deleteMyAffirmation(id) {
    const store = getAffirmationStore();
    const item = store.items.filter(function (row) { return row.id === id && !row.deletedAt; })[0];
    if (!item) return;
    const previous = { id: item.id, text: item.text, savedAt: item.savedAt || '', deletedAt: null };
    const stamp = new Date().toISOString();
    store.items = store.items.map(function (row) {
      if (row.id !== id) return row;
      return { id: row.id, text: row.text, savedAt: stamp, deletedAt: stamp };
    });
    undoStack.push({ type: 'affirmation', previous: previous });
    persistAffirmationStore(store);
    showToast('Affirmation removed', 'info', 8000, true);
  }

  function heartCurrentAffirmation() {
    const text = (($('affirmationText') && $('affirmationText').textContent) || '').trim();
    if (!text) return;
    const store = getAffirmationStore();
    if (visibleAffirmations(store).some(function (item) { return item.text.trim().toLowerCase() === text.toLowerCase(); })) {
      showToast('Already in your list', 'info');
      showAffirmation(text);
      return;
    }
    store.items.push({ id: 'aff-' + Date.now().toString(36), text: text, savedAt: new Date().toISOString(), deletedAt: null });
    persistAffirmationStore(store);
    showToast('Saved to your list', 'success');
  }

  function setMixOwn(on) {
    const store = getAffirmationStore();
    store.mixOwn = !!on;
    persistAffirmationStore(store);
  }

  function suggestTop3() {
    const text = $('brainDump').value;
    const lines = text.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    const suggestions = lines.slice(0, 3);
    const el = $('suggestions');
    el.innerHTML = '';
    el.id = 'suggestions';
    if (!suggestions.length) { el.textContent = 'Add a few lines first. Each line can become a suggestion.'; return; }
    suggestions.forEach(function (s, i) {
      const row = document.createElement('div');
      row.style.margin = '6px 0';
      row.id = 'suggestion-row-' + (i + 1);
      row.appendChild(document.createTextNode((i + 1) + '. ' + s + ' '));
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'suggestion-add-' + (i + 1);
      btn.className = 'btn ghost';
      btn.textContent = 'Add';
      btn.addEventListener('click', function () { addToTop3(s); });
      row.appendChild(btn);
      el.appendChild(row);
    });
  }

  function addToTop3(text, estimate) {
    applyEnergySlots();
    let inputs = document.querySelectorAll('#top3 .task-row:not(.hidden-slot) input[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value.trim()) {
        inputs[i].value = text;
        if (estimate) {
          const row = inputs[i].closest('.task-row');
          row.querySelectorAll('.est-chips button').forEach(function (b) {
            b.classList.toggle('active', b.dataset.estimate === estimate);
          });
        }
        scheduleSave();
        applyEnergySlots();
        showToast('Added to today', 'success');
        return;
      }
    }
    const hidden = document.querySelector('#top3 .task-row.hidden-slot');
    if (hidden) {
      hidden.classList.remove('hidden-slot');
      const input = hidden.querySelector('input[type="text"]');
      if (input) {
        input.value = text;
        if (estimate) {
          hidden.querySelectorAll('.est-chips button').forEach(function (b) {
            b.classList.toggle('active', b.dataset.estimate === estimate);
          });
        }
        scheduleSave();
        applyEnergySlots();
        showToast('Added to today', 'success');
        return;
      }
    }
    showToast('Your list is full. Clear one first, or leave it in the dump.', 'info');
  }

  function renderEnergyCalendar() {
    const container = $('energyCalendar');
    if (!container) return;
    const all = getDayMap();
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startPad = new Date(year, month, 1).getDay();
    const colors = { High: 'var(--high)', Medium: 'var(--med)', Low: 'var(--low)' };
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'energy-cal';
    ['S','M','T','W','T','F','S'].forEach(function (d) {
      const el = document.createElement('div');
      el.className = 'dow';
      el.textContent = d;
      grid.appendChild(el);
    });
    for (let i = 0; i < startPad; i++) grid.appendChild(document.createElement('div'));
    for (let day = 1; day <= daysInMonth; day++) {
      const dt = new Date(year, month, day);
      const key = dateKey(dt);
      const energy = (all[key] && all[key].energy) || '';
      const cell = document.createElement('div');
      cell.className = 'energy-day' + (key === todayKey() ? ' today' : '');
      cell.id = 'energy-cal-' + key;
      if (colors[energy]) cell.style.background = colors[energy];
      const num = document.createElement('div');
      num.textContent = String(day);
      cell.appendChild(num);
      if (energy) {
        const dot = document.createElement('div');
        dot.className = 'energy-dot ' + energy;
        dot.title = energy + ' energy';
        cell.appendChild(dot);
      }
      grid.appendChild(cell);
    }
    container.appendChild(grid);
  }

  function renderWeekGraph() {
    renderWinsThisWeek();
  }

  function parseWins(day, key) {
    const wins = [];
    const label = new Date(key + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    normalizeTop3(day && day.top3).forEach(function (t) {
      if (t.text && t.done) wins.push({ date: label, key: key, text: t.text, kind: 'task' });
    });
    String((day && day.gotDone) || '').split('\n').forEach(function (line) {
      const text = line.replace(/^\s*✓\s*/, '').trim();
      if (text) wins.push({ date: label, key: key, text: text, kind: 'logged' });
    });
    return wins;
  }

  function renderWinsThisWeek() {
    const list = $('winsThisWeek');
    const countEl = $('winsCount');
    if (!list) return;
    list.innerHTML = '';
    const all = getDayMap();
    const wins = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dateKey(d);
      if (all[key]) wins.push.apply(wins, parseWins(all[key], key));
    }
    if (countEl) {
      countEl.textContent = wins.length
        ? (wins.length + ' win' + (wins.length === 1 ? '' : 's') + ' this week — completed tasks and logged wins. Not a score.')
        : 'No wins logged in the last 7 days yet. Any finished task or note in End of day will show up here.';
    }
    if (!wins.length) return;
    wins.forEach(function (w, i) {
      const li = document.createElement('li');
      li.id = 'win-item-' + i;
      const date = document.createElement('span');
      date.className = 'win-date';
      date.textContent = w.date + (w.kind === 'logged' ? ' · logged win' : '');
      li.appendChild(date);
      li.appendChild(document.createTextNode(w.text));
      list.appendChild(li);
    });
  }

  function renderWeeklySummary() {
    const el = $('weeklySummary');
    if (!el) return;
    const all = getDayMap();
    let finished = 0, logged = 0, days = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const day = all[dateKey(d)];
      if (day) {
        days++;
        finished += normalizeTop3(day.top3).filter(function (t) { return t.done && t.text; }).length;
        logged += String(day.gotDone || '').split('\n').filter(function (line) { return line.trim(); }).length;
      }
    }
    el.textContent = 'Last 7 days: ' + finished + ' finished ' + (finished === 1 ? 'task' : 'tasks') + ' and ' + logged + ' logged ' + (logged === 1 ? 'win' : 'wins') + ' across ' + days + ' logged ' + (days === 1 ? 'day' : 'days') + '. If you want a focus for tomorrow, pick one small morning start.';
  }

  function renderHistory() {
    const hist = $('history');
    if (!hist) return;
    const all = getDayMap();
    const q = (($('historySearch') || {}).value || '').toLowerCase();
    let keys = Object.keys(all).filter(function (k) {
      return /^\d{4}-\d{2}-\d{2}$/.test(k) && !isDeletedRecord(all[k]) && (dayHasContent(all[k]) || loadPlannerItems(k).length);
    }).sort().reverse();
    if (q) {
      keys = keys.filter(function (k) {
        try { return k.toLowerCase().includes(q) || JSON.stringify(all[k]).toLowerCase().includes(q); }
        catch (err) { return k.toLowerCase().includes(q); }
      });
    }
    keys = keys.slice(0, 20);
    hist.innerHTML = '';
    if (!keys.length) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.id = 'historyEmpty';
      p.textContent = 'No days saved yet. That’s okay — today’s a fine place to start.';
      hist.appendChild(p);
      return;
    }
    keys.forEach(function (k) {
      const d = all[k] || {};
      const filled = normalizeTop3(d.top3).filter(function (t) { return t.text; });
      const done = filled.filter(function (t) { return t.done; }).length;
      const label = new Date(k + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
      const dump = String(d.brainDump || '').split('\n').map(function (line) { return line.trim(); }).filter(Boolean)[0] || '';
      const summary = [done + '/' + filled.length + ' done', d.energy || '', dump ? dump.slice(0, 42) : ''].filter(Boolean).join(' · ');
      const row = document.createElement('div');
      row.className = 'history-item';
      row.id = 'history-row-' + k;
      const openBtn = document.createElement('button');
      openBtn.type = 'button';
      openBtn.className = 'linkish';
      openBtn.id = 'history-open-' + k;
      openBtn.textContent = label + ' · ' + summary;
      openBtn.addEventListener('click', function () { viewPastDay(k); });
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn ghost';
      del.id = 'history-delete-' + k;
      del.setAttribute('aria-label', 'Delete ' + label);
      del.textContent = '✕';
      del.addEventListener('click', function (ev) { ev.stopPropagation(); deleteDay(k); });
      row.appendChild(openBtn);
      row.appendChild(del);
      hist.appendChild(row);
    });
  }

  function deleteDay(key) {
    clearDay(key, 'Delete this day? Tasks, notes, and events on this date will be removed. You can undo for a few seconds.');
  }

  function viewPastDay(key) {
    switchTab('today');
    openDay(key, true);
  }

  function backToToday() {
    openDay(todayKey(), true);
  }

  function undoLast() {
    const last = undoStack.pop();
    if (!last) return;
    const stamp = new Date().toISOString();
    if (last.type === 'day' || last.type === 'clear') {
      const all = getDayMap();
      if (last.day) {
        last.day.savedAt = stamp;
        delete last.day.deleted;
        delete last.day.deletedAt;
        all[last.key] = last.day;
      } else if (last.data) {
        last.data.savedAt = stamp;
        delete last.data.deleted;
        delete last.data.deletedAt;
        all[last.key] = last.data;
      } else {
        delete all[last.key];
      }
      saveJson('task-days', all);
      if (all[last.key]) cloudUpsertDay(last.key, all[last.key]);
      if (last.plans) savePlannerItems(last.key, last.plans);
      if (activeKey() === last.key) loadDay();
      renderHistory();
      renderEnergyCalendar();
      renderWeekGraph();
      renderWeeklySummary();
      renderPlanner();
    } else if (last.type === 'planner') {
      const items = loadPlannerItems(last.key);
      items.splice(last.index, 0, last.data);
      savePlannerItems(last.key, items);
      renderPlanner();
      renderDayEvents();
    } else if (last.type === 'top3') {
      const all = getDayMap();
      const day = Object.assign({}, all[last.key] || {});
      day.top3 = last.previous;
      day.savedAt = stamp;
      delete day.deleted;
      delete day.deletedAt;
      all[last.key] = day;
      saveJson('task-days', all);
      cloudUpsertDay(last.key, day);
      if (activeKey() === last.key) loadDay();
    } else if (last.type === 'brain') {
      const all = getDayMap();
      const day = Object.assign({}, all[last.key] || {});
      day.brainDump = last.previous;
      day.savedAt = stamp;
      delete day.deleted;
      delete day.deletedAt;
      all[last.key] = day;
      saveJson('task-days', all);
      cloudUpsertDay(last.key, day);
      if (activeKey() === last.key) loadDay();
    } else if (last.type === 'affirmation' && last.previous) {
      const store = getAffirmationStore();
      const stamp = new Date().toISOString();
      let found = false;
      store.items = store.items.map(function (row) {
        if (row.id !== last.previous.id) return row;
        found = true;
        return { id: last.previous.id, text: last.previous.text, savedAt: stamp, deletedAt: null };
      });
      if (!found) {
        store.items.push({ id: last.previous.id, text: last.previous.text, savedAt: stamp, deletedAt: null });
      }
      persistAffirmationStore(store);
    }
    scheduleSyncPush();
    showToast('Restored', 'success');
  }

  function exportPayload() {
    return {
      taskDays: getDayMap(),
      plannerEntries: getPlannerMap(),
      tileCompletions: loadJson('tile-completions', {}),
      tileVisited: loadJson('tile-visited', {}),
      plannerUpdated: loadJson('planner-updated', {}),
      theme: safeGet('theme', 'light'),
      exportedAt: new Date().toISOString()
    };
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(exportPayload(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'tinystarts-backup-' + todayKey() + '.json';
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    showToast('Backup downloaded', 'success');
  }

  function newerDay(a, b) {
    const at = Date.parse((a && a.savedAt) || 0) || 0;
    const bt = Date.parse((b && b.savedAt) || 0) || 0;
    return bt >= at ? b : a;
  }

  function mergeImportedData(obj, preferIncomingIfTied) {
    if (!obj || typeof obj !== 'object') throw new Error('That file doesn’t look like a TinyStarts backup.');
    const srcDays = obj.taskDays || obj['task-days'] || {};
    const days = getDayMap();
    Object.keys(srcDays).forEach(function (key) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
      const incoming = srcDays[key];
      const local = days[key];
      if (!local) { days[key] = incoming; return; }
      days[key] = newerDay(local, incoming);
    });
    saveJson('task-days', days);

    const srcPlans = obj.plannerEntries || obj['planner-entries'] || {};
    const plans = getPlannerMap();
    const meta = loadJson('planner-updated', {});
    Object.keys(srcPlans).forEach(function (key) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
      const incoming = srcPlans[key];
      plans[key] = pickPlanner(plans[key], incoming);
      const chosen = plannerMeta(plans[key]);
      if (chosen && chosen.savedAt) meta[key] = chosen.savedAt;
    });
    saveJson('planner-entries', plans);
    saveJson('planner-updated', meta);
    if (obj.tileCompletions) saveJson('tile-completions', Object.assign(loadJson('tile-completions', {}), obj.tileCompletions));
    if (obj.tileVisited) saveJson('tile-visited', Object.assign(loadJson('tile-visited', {}), obj.tileVisited));
  }

  function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const obj = JSON.parse(reader.result);
        mergeImportedData(obj);
        loadDay();
        renderPlanner();
        showToast('Backup restored. Existing newer days were kept.', 'success', 5000);
      } catch (err) {
        showToast('Could not read that backup: ' + (err.message || 'invalid file'), 'error', 5000);
      }
    };
    reader.readAsText(file);
  }

  function plannerMeta(items) {
    if (!Array.isArray(items)) return null;
    for (let i = 0; i < items.length; i++) {
      if (items[i] && items[i]._meta) return items[i];
    }
    return null;
  }
  function visiblePlannerItems(items) {
    if (!Array.isArray(items)) return [];
    return items.filter(function (it) { return it && typeof it === 'object' && !it._meta; });
  }
  function loadPlannerItems(key) {
    return visiblePlannerItems(getPlannerMap()[key]);
  }
  function savePlannerItems(key, items) {
    const visible = visiblePlannerItems(items);
    const stamp = new Date().toISOString();
    const stored = [{ _meta: true, savedAt: stamp }].concat(visible);
    const all = getPlannerMap();
    all[key] = stored;
    saveJson('planner-entries', all);
    const meta = loadJson('planner-updated', {});
    meta[key] = stamp;
    saveJson('planner-updated', meta);
    scheduleSyncPush();
    cloudUpsertPlanner(key, stored);
    renderDayEvents();
  }
  function pickPlanner(local, remote) {
    if (!remote) return local;
    if (!local) return remote;
    const lt = Date.parse((plannerMeta(local) && plannerMeta(local).savedAt) || 0) || 0;
    const rt = Date.parse((plannerMeta(remote) && plannerMeta(remote).savedAt) || 0) || 0;
    if (lt || rt) return rt >= lt ? remote : local;
    if (visiblePlannerItems(local).length === 0 && visiblePlannerItems(remote).length) return remote;
    return local;
  }


  const HOUR_START = 0;
  const HOUR_END = 24;
  const HOUR_PX = 56;
  const SNAP_MIN = 15;
  const DEFAULT_DURATION = 30;

  function pad2(n) { return String(n).padStart(2, '0'); }
  function parseTime(value) {
    if (!value) return null;
    const parts = String(value).split(':');
    const h = Number(parts[0]), m = Number(parts[1] || 0);
    if (Number.isNaN(h)) return null;
    return { h: Math.max(0, Math.min(23, h)), m: Math.max(0, Math.min(59, m || 0)) };
  }
  function formatTimeValue(h, m) { return pad2(h) + ':' + pad2(m); }
  function formatTimeLabel(value) {
    const t = parseTime(value);
    if (!t) return '';
    const ampm = t.h >= 12 ? 'PM' : 'AM';
    const h12 = t.h % 12 || 12;
    return t.m ? (h12 + ':' + pad2(t.m) + ' ' + ampm) : (h12 + ' ' + ampm);
  }
  function minutesOf(value) {
    const t = parseTime(value);
    return t ? t.h * 60 + t.m : 0;
  }
  function timeFromMinutes(mins) {
    const clamped = Math.max(0, Math.min(24 * 60 - SNAP_MIN, mins));
    const snapped = Math.round(clamped / SNAP_MIN) * SNAP_MIN;
    const h = Math.floor(snapped / 60);
    const m = snapped % 60;
    if (h >= 24) return '23:45';
    return formatTimeValue(h, m);
  }
  function addMinutesToTime(value, delta) {
    return timeFromMinutes(minutesOf(value || '00:00') + delta);
  }
  function eventStart(item) { return item && item.start ? item.start : '09:00'; }
  function eventEnd(item) {
    if (item && item.end) return item.end;
    return addMinutesToTime(eventStart(item), DEFAULT_DURATION);
  }
  function nextFreeSlot(key, durationMins) {
    durationMins = durationMins || 30;
    const items = loadPlannerItems(key).filter(function (it) { return it && !it.allDay && (it.start || it.end); });
    const busy = items.map(function (it) {
      return { s: minutesOf(eventStart(it)), e: minutesOf(eventEnd(it)) };
    }).sort(function (a, b) { return a.s - b.s; });
    const now = new Date();
    let cursor;
    if (key === todayKey()) {
      cursor = now.getHours() * 60 + now.getMinutes();
      cursor = Math.ceil(cursor / SNAP_MIN) * SNAP_MIN;
      if (cursor < 8 * 60) cursor = 8 * 60;
    } else {
      cursor = 9 * 60;
    }
    const dayEnd = 20 * 60;
    function overlaps(start) {
      const end = start + durationMins;
      return busy.some(function (b) { return start < b.e && end > b.s; });
    }
    while (cursor + durationMins <= 22 * 60) {
      if (!overlaps(cursor)) {
        return { start: timeFromMinutes(cursor), end: timeFromMinutes(cursor + durationMins) };
      }
      let jump = cursor + SNAP_MIN;
      busy.forEach(function (b) {
        if (cursor < b.e && cursor + durationMins > b.s) jump = Math.max(jump, b.e);
      });
      cursor = Math.ceil(jump / SNAP_MIN) * SNAP_MIN;
      if (cursor > dayEnd && key === todayKey()) {
        /* still search later evening before giving up */
      }
    }
    return { start: timeFromMinutes(Math.min(cursor, 18 * 60)), end: timeFromMinutes(Math.min(cursor, 18 * 60) + durationMins) };
  }

  function timeToY(value) {
    return ((minutesOf(value) / 60) - HOUR_START) * HOUR_PX;
  }
  function yToTime(y) {
    const mins = ((y / HOUR_PX) + HOUR_START) * 60;
    return timeFromMinutes(mins);
  }
  function viewDays(date, view) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (view === 'day') return [d];
    if (view === 'workweek') {
      const start = new Date(d);
      const day = start.getDay();
      const offset = day === 0 ? -6 : 1 - day;
      start.setDate(start.getDate() + offset);
      const days = [];
      for (let i = 0; i < 5; i++) {
        const x = new Date(start);
        x.setDate(start.getDate() + i);
        days.push(x);
      }
      return days;
    }
    const start = new Date(d);
    start.setDate(start.getDate() - start.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const x = new Date(start);
      x.setDate(start.getDate() + i);
      days.push(x);
    }
    return days;
  }

  function renderPlanner() {
    const label = $('plannerDateLabel');
    const content = $('plannerContent');
    if (!content) return;
    content.innerHTML = '';
    document.querySelectorAll('.view-toggle button').forEach(function (b) {
      b.classList.toggle('active', b.dataset.view === plannerView);
      b.setAttribute('aria-selected', b.dataset.view === plannerView ? 'true' : 'false');
    });
    try {
      if (plannerView === 'month') renderMonthPlanner(label, content);
      else renderTimeGridPlanner(label, content);
      renderMiniCalendar();
    } catch (err) {
      const p = document.createElement('p');
      p.style.color = 'var(--danger)';
      p.id = 'plannerError';
      p.textContent = 'Calendar error: ' + (err.message || 'unknown');
      content.appendChild(p);
      console.error(err);
    }
  }

  function renderTimeGridPlanner(label, content) {
    const days = viewDays(plannerDate, plannerView);
    if (plannerView === 'day') {
      label.textContent = days[0].toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
      const a = days[0].toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const b = days[days.length - 1].toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      label.textContent = a + ' – ' + b;
    }
    const cols = days.length;
    const template = '72px repeat(' + cols + ', minmax(0, 1fr))';
    const wrap = document.createElement('div');
    wrap.className = 'time-grid-wrap';
    wrap.id = 'timeGridWrap';

    const head = document.createElement('div');
    head.className = 'dow-head';
    head.style.gridTemplateColumns = template;
    head.appendChild(document.createElement('div'));
    days.forEach(function (d) {
      const cell = document.createElement('div');
      const key = dateKey(d);
      cell.className = 'dow-cell' + (key === todayKey() ? ' today' : '');
      cell.id = 'planner-dow-' + key;
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = d.toLocaleDateString(undefined, { weekday: 'short' });
      const num = document.createElement('span');
      num.className = 'num';
      num.textContent = String(d.getDate());
      cell.appendChild(name);
      cell.appendChild(num);
      cell.addEventListener('click', function () {
        plannerDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        if (plannerView !== 'day') { /* stay in current view, just focus date */ }
        renderPlanner();
      });
      head.appendChild(cell);
    });
    wrap.appendChild(head);

    const allDay = document.createElement('div');
    allDay.className = 'all-day-grid';
    allDay.id = 'planner-all-day';
    allDay.style.gridTemplateColumns = template;
    const allLabel = document.createElement('div');
    allLabel.className = 'all-day-label';
    allLabel.textContent = 'All-day';
    allDay.appendChild(allLabel);
    days.forEach(function (d) {
      const key = dateKey(d);
      const cell = document.createElement('div');
      cell.className = 'all-day-cell';
      cell.id = 'all-day-' + key;
      loadPlannerItems(key).filter(function (it) { return it.allDay; }).forEach(function (item, i) {
        const realIndex = loadPlannerItems(key).indexOf(item);
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'all-day-chip event-' + safeEventType(item.type);
        chip.id = 'allday-event-' + key + '-' + realIndex;
        chip.textContent = item.text || 'Event';
        chip.addEventListener('click', function (ev) { ev.stopPropagation(); openEditItem(key, realIndex); });
        cell.appendChild(chip);
      });
      cell.addEventListener('click', function () { openAddModal({ date: key, allDay: true }); });
      allDay.appendChild(cell);
    });
    wrap.appendChild(allDay);

    const body = document.createElement('div');
    body.className = 'time-columns';
    body.id = 'timeColumns';
    body.style.gridTemplateColumns = template;
    const hours = HOUR_END - HOUR_START;
    const gutter = document.createElement('div');
    gutter.className = 'time-gutter';
    gutter.style.height = (hours * HOUR_PX) + 'px';
    for (let h = HOUR_START; h < HOUR_END; h++) {
      const row = document.createElement('div');
      row.className = 'hour-row';
      const lab = document.createElement('div');
      lab.className = 'hour-label';
      lab.textContent = formatTimeLabel(formatTimeValue(h, 0));
      row.appendChild(lab);
      gutter.appendChild(row);
    }
    body.appendChild(gutter);

    days.forEach(function (d) {
      const key = dateKey(d);
      const col = document.createElement('div');
      col.className = 'day-col';
      col.id = 'day-col-' + key;
      col.dataset.date = key;
      col.style.height = (hours * HOUR_PX) + 'px';
      for (let h = HOUR_START; h < HOUR_END; h++) {
        const row = document.createElement('div');
        row.className = 'hour-row';
        row.dataset.hour = String(h);
        col.appendChild(row);
      }
      const items = loadPlannerItems(key);
      items.forEach(function (item, i) {
        if (item.allDay) return;
        col.appendChild(buildEventBlock(key, item, i));
      });
      if (key === todayKey()) col.appendChild(buildNowLine());
      col.addEventListener('click', function (e) {
        if (dragState && dragState.moved) return;
        if (e.target.closest('.event-block')) return;
        const rect = col.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const start = yToTime(y);
        openAddModal({ date: key, start: start, end: addMinutesToTime(start, DEFAULT_DURATION) });
      });
      body.appendChild(col);
    });
    wrap.appendChild(body);
    content.appendChild(wrap);
    scrollGridToUsefulTime(wrap);
    bindCalendarSwipe(wrap);
  }

  function buildNowLine() {
    const line = document.createElement('div');
    line.className = 'now-line';
    line.id = 'nowLine';
    const now = new Date();
    line.style.top = timeToY(formatTimeValue(now.getHours(), now.getMinutes())) + 'px';
    return line;
  }

  function scrollGridToUsefulTime(wrap) {
    const now = new Date();
    const target = (now.getHours() >= HOUR_START && now.getHours() < HOUR_END)
      ? timeToY(formatTimeValue(now.getHours(), Math.max(0, now.getMinutes() - 30)))
      : timeToY('08:00');
    const head = wrap.querySelector('.dow-head');
    const allDay = wrap.querySelector('.all-day-grid');
    const offset = (head ? head.offsetHeight : 0) + (allDay ? allDay.offsetHeight : 0);
    wrap.scrollTop = Math.max(0, target - 8 + offset - (head ? head.offsetHeight : 0));
    // simpler: scroll the body into view around 8am or now
    wrap.scrollTop = Math.max(0, target - 24);
  }

  function buildEventBlock(key, item, index) {
    const block = document.createElement('div');
    block.className = 'event-block event-' + safeEventType(item.type) + (item.done ? ' done' : '');
    block.id = 'event-block-' + key + '-' + index;
    block.dataset.date = key;
    block.dataset.index = String(index);
    const start = eventStart(item);
    const end = eventEnd(item);
    let top = timeToY(start);
    let height = Math.max(22, timeToY(end) - top);
    if (minutesOf(end) <= minutesOf(start)) height = Math.max(22, (DEFAULT_DURATION / 60) * HOUR_PX);
    block.style.top = top + 'px';
    block.style.height = height + 'px';
    const time = document.createElement('span');
    time.className = 'ev-time';
    time.textContent = formatTimeLabel(start) + ' – ' + formatTimeLabel(end);
    const title = document.createElement('span');
    title.className = 'ev-title';
    title.textContent = item.text || 'Event';
    block.appendChild(time);
    block.appendChild(title);
    const handle = document.createElement('div');
    handle.className = 'resize-handle';
    handle.dataset.resize = '1';
    block.appendChild(handle);
    block.addEventListener('pointerdown', function (e) { startEventDrag(e, key, index, handle.contains(e.target) ? 'resize' : 'move'); });
    block.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dragState && dragState.moved) return;
      openEditItem(key, index);
    });
    return block;
  }

  function startEventDrag(e, key, index, type) {
    if (e.button != null && e.button !== 0) return;
    const items = loadPlannerItems(key);
    const item = items[index];
    if (!item || item.allDay) return;
    e.preventDefault();
    const col = e.currentTarget.closest('.day-col') || $('day-col-' + key);
    dragState = {
      type: type,
      key: key,
      index: index,
      startY: e.clientY,
      origStart: eventStart(item),
      origEnd: eventEnd(item),
      moved: false,
      col: col
    };
    e.currentTarget.classList.add('dragging');
    e.currentTarget.setPointerCapture(e.pointerId);
    function onMove(ev) { moveEventDrag(ev); }
    function onUp(ev) { endEventDrag(ev); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  function moveEventDrag(e) {
    if (!dragState) return;
    const dy = e.clientY - dragState.startY;
    if (Math.abs(dy) > 3) dragState.moved = true;
    const deltaMins = Math.round((dy / HOUR_PX) * 60 / SNAP_MIN) * SNAP_MIN;
    dragState.deltaMins = deltaMins;
    const items = loadPlannerItems(dragState.key);
    const item = items[dragState.index];
    if (!item) return;
    const duration = Math.max(SNAP_MIN, minutesOf(dragState.origEnd) - minutesOf(dragState.origStart) || DEFAULT_DURATION);
    if (dragState.type === 'move') {
      // Change day if pointer is over another column
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const col = el && el.closest && el.closest('.day-col');
      if (col && col.dataset.date && col.dataset.date !== dragState.key) {
        // preview only via moving block; apply on drop
        dragState.dropDate = col.dataset.date;
      } else {
        dragState.dropDate = dragState.key;
      }
      item.start = addMinutesToTime(dragState.origStart, deltaMins);
      item.end = addMinutesToTime(item.start, duration);
    } else {
      const endMins = minutesOf(dragState.origEnd) + deltaMins;
      item.end = timeFromMinutes(Math.max(minutesOf(dragState.origStart) + SNAP_MIN, endMins));
    }
    const block = $('event-block-' + dragState.key + '-' + dragState.index);
    if (block) {
      const top = timeToY(eventStart(item));
      const height = Math.max(22, timeToY(eventEnd(item)) - top);
      block.style.top = top + 'px';
      block.style.height = height + 'px';
      const time = block.querySelector('.ev-time');
      if (time) time.textContent = formatTimeLabel(eventStart(item)) + ' – ' + formatTimeLabel(eventEnd(item));
    }
  }

  function endEventDrag(e) {
    if (!dragState) return;
    const state = dragState;
    const block = $('event-block-' + state.key + '-' + state.index);
    if (block) block.classList.remove('dragging');
    if (!state.moved) { dragState = null; return; }
    const items = loadPlannerItems(state.key);
    const item = items[state.index];
    if (item) {
      const duration = Math.max(SNAP_MIN, minutesOf(state.origEnd) - minutesOf(state.origStart) || DEFAULT_DURATION);
      const deltaMins = state.deltaMins || 0;
      if (state.type === 'move') {
        item.start = addMinutesToTime(state.origStart, deltaMins);
        item.end = addMinutesToTime(item.start, duration);
        item.allDay = false;
      } else {
        item.end = timeFromMinutes(Math.max(minutesOf(state.origStart) + SNAP_MIN, minutesOf(state.origEnd) + deltaMins));
      }
      if (state.type === 'move' && state.dropDate && state.dropDate !== state.key) {
        items.splice(state.index, 1);
        savePlannerItems(state.key, items);
        const dest = loadPlannerItems(state.dropDate);
        dest.push(item);
        savePlannerItems(state.dropDate, dest);
      } else {
        savePlannerItems(state.key, items);
      }
    }
    dragState = { moved: true };
    setTimeout(function () { dragState = null; }, 200);
    renderPlanner();
  }

  function renderMonthPlanner(label, content) {
    const year = plannerDate.getFullYear(), month = plannerDate.getMonth();
    label.textContent = plannerDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    const board = document.createElement('div');
    board.className = 'month-board';
    board.id = 'plannerMonthGrid';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(function (d) {
      const h = document.createElement('div');
      h.className = 'mb-dow';
      h.textContent = d;
      board.appendChild(h);
    });
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dateKey(d);
      const items = loadPlannerItems(key);
      const cell = document.createElement('div');
      cell.className = 'month-cell' + (d.getMonth() !== month ? ' outside' : '') + (key === todayKey() ? ' today' : '');
      cell.id = 'planner-day-' + key;
      const num = document.createElement('div');
      num.className = 'date-num';
      num.textContent = String(d.getDate());
      cell.appendChild(num);
      const visible = items.slice(0, 3);
      visible.forEach(function (item) {
        const realIndex = items.indexOf(item);
        const ev = document.createElement('button');
        ev.type = 'button';
        ev.className = 'month-event event-' + safeEventType(item.type);
        ev.textContent = (item.allDay ? '' : (item.start ? item.start + ' ' : '')) + (item.text || 'Event');
        ev.addEventListener('click', function (e) { e.stopPropagation(); openEditItem(key, realIndex); });
        cell.appendChild(ev);
      });
      if (items.length > 3) {
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 'month-more';
        more.textContent = '+' + (items.length - 3) + ' more';
        more.addEventListener('click', function (e) {
          e.stopPropagation();
          plannerDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          plannerView = 'day';
          renderPlanner();
        });
        cell.appendChild(more);
      }
      cell.addEventListener('click', function () {
        plannerDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        openAddModal({ date: key });
      });
      board.appendChild(cell);
    }
    content.appendChild(board);
    bindCalendarSwipe(board);
  }

  function renderMiniCalendar() {
    const root = $('miniCalendar');
    if (!root) return;
    root.innerHTML = '';
    const year = plannerDate.getFullYear(), month = plannerDate.getMonth();
    const head = document.createElement('div');
    head.className = 'mini-cal-head';
    const prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'icon-btn';
    prev.id = 'miniPrevBtn';
    prev.setAttribute('aria-label', 'Previous month');
    prev.textContent = '‹';
    prev.addEventListener('click', function () {
      plannerDate = new Date(year, month - 1, Math.min(plannerDate.getDate(), 28));
      renderPlanner();
    });
    const title = document.createElement('strong');
    title.id = 'miniCalLabel';
    title.textContent = plannerDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'icon-btn';
    next.id = 'miniNextBtn';
    next.setAttribute('aria-label', 'Next month');
    next.textContent = '›';
    next.addEventListener('click', function () {
      plannerDate = new Date(year, month + 1, Math.min(plannerDate.getDate(), 28));
      renderPlanner();
    });
    head.appendChild(prev);
    head.appendChild(title);
    head.appendChild(next);
    root.appendChild(head);
    const grid = document.createElement('div');
    grid.className = 'mini-grid';
    grid.id = 'miniCalGrid';
    ['S','M','T','W','T','F','S'].forEach(function (d) {
      const el = document.createElement('div');
      el.className = 'mini-dow';
      el.textContent = d;
      grid.appendChild(el);
    });
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(1 - first.getDay());
    const selected = dateKey(plannerDate);
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = dateKey(d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mini-day'
        + (d.getMonth() !== month ? ' muted' : '')
        + (key === todayKey() ? ' today' : '')
        + (key === selected ? ' selected' : '')
        + (loadPlannerItems(key).length ? ' has-events' : '');
      btn.id = 'mini-day-' + key;
      btn.textContent = String(d.getDate());
      btn.addEventListener('click', function () {
        plannerDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        renderPlanner();
      });
      grid.appendChild(btn);
    }
    root.appendChild(grid);
  }

  function bindCalendarSwipe(el) {
    if (!el || el.dataset.swipeBound) return;
    el.dataset.swipeBound = '1';
    let x0 = 0, y0 = 0, tracking = false;
    el.addEventListener('touchstart', function (e) {
      if (!e.changedTouches[0]) return;
      if (e.target.closest('.event-block')) return;
      tracking = true;
      x0 = e.changedTouches[0].clientX;
      y0 = e.changedTouches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (!tracking) return;
      tracking = false;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
      shiftPlannerDate(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function shiftPlannerDate(delta) {
    if (plannerView === 'day') plannerDate.setDate(plannerDate.getDate() + delta);
    else if (plannerView === 'month') plannerDate.setMonth(plannerDate.getMonth() + delta);
    else plannerDate.setDate(plannerDate.getDate() + delta * 7);
    renderPlanner();
  }

  function goPlannerToday() {
    plannerDate = new Date();
    renderPlanner();
  }

  function openAddModal(opts) {
    opts = opts || {};
    editingPlanner = null;
    const date = opts.date || dateKey(plannerDate);
    $('addItemTitle').textContent = 'Add event';
    $('confirmAddBtn').textContent = 'Save event';
    if ($('deleteItemBtn')) $('deleteItemBtn').hidden = true;
    $('newItemText').value = opts.text || '';
    if ($('newItemDate')) $('newItemDate').value = date;
    $('newItemStart').value = opts.start || '';
    if ($('newItemEnd')) $('newItemEnd').value = opts.end || (opts.start ? addMinutesToTime(opts.start, DEFAULT_DURATION) : '');
    $('newItemType').value = safeEventType(opts.type);
    $('newItemAllDay').checked = !!opts.allDay;
    if (opts.allDay) {
      $('newItemStart').value = '';
      if ($('newItemEnd')) $('newItemEnd').value = '';
    }
    if ($('newItemStart')) $('newItemStart').disabled = !!opts.allDay;
    if ($('newItemEnd')) $('newItemEnd').disabled = !!opts.allDay;
    plannerDate = new Date(date + 'T12:00:00');
    openModal('addItemModal');
    setTimeout(function () { $('newItemText').focus(); }, 50);
  }

  function openEditItem(key, index) {
    const items = loadPlannerItems(key);
    const item = items[index];
    if (!item) return;
    editingPlanner = { key: key, index: index };
    $('addItemTitle').textContent = 'Edit event';
    $('confirmAddBtn').textContent = 'Save changes';
    if ($('deleteItemBtn')) $('deleteItemBtn').hidden = false;
    $('newItemText').value = item.text || '';
    if ($('newItemDate')) $('newItemDate').value = key;
    $('newItemStart').value = item.allDay ? '' : eventStart(item);
    if ($('newItemEnd')) $('newItemEnd').value = item.allDay ? '' : eventEnd(item);
    $('newItemType').value = safeEventType(item.type);
    $('newItemAllDay').checked = !!item.allDay;
    if ($('newItemStart')) $('newItemStart').disabled = !!item.allDay;
    if ($('newItemEnd')) $('newItemEnd').disabled = !!item.allDay;
    plannerDate = new Date(key + 'T12:00:00');
    openModal('addItemModal');
    setTimeout(function () { $('newItemText').focus(); }, 50);
  }

  function plannerRow(key, item, i) {
    // Kept for compatibility if needed; time grid uses event blocks instead.
    openEditItem(key, i);
    return document.createElement('div');
  }

  function updatePlannerItem(key, index, text) {
    const items = loadPlannerItems(key);
    if (items[index]) items[index].text = text;
    savePlannerItems(key, items);
  }
  function togglePlannerItem(key, index, done) {
    const items = loadPlannerItems(key);
    if (items[index]) items[index].done = done;
    savePlannerItems(key, items);
  }
  function deletePlannerItem(key, index) {
    const items = loadPlannerItems(key);
    const deleted = items[index];
    if (!deleted) return;
    undoStack.push({ type: 'planner', key: key, index: index, data: deleted });
    items.splice(index, 1);
    savePlannerItems(key, items);
    renderPlanner();
    showToast('Item deleted', 'info', 8000, true);
  }

  function addToGoogleCalendar(key, index) {
    const items = loadPlannerItems(key);
    const item = items[index];
    if (!item || !(item.text || '').trim()) return;
    const title = encodeURIComponent(item.text.trim());
    const details = encodeURIComponent('From TinyStarts');
    let dates;
    if (!item.allDay && item.start) {
      const start = key.replace(/-/g, '') + 'T' + String(eventStart(item)).replace(':', '') + '00';
      const endVal = eventEnd(item);
      const endDate = new Date(key + 'T' + endVal);
      const end = dateKey(isNaN(endDate.getTime()) ? new Date(key + 'T12:00:00') : endDate).replace(/-/g, '') + 'T' + String(endVal).replace(':', '') + '00';
      dates = start + '/' + end;
    } else {
      const date = key.replace(/-/g, '');
      const next = new Date(key + 'T12:00:00');
      next.setDate(next.getDate() + 1);
      dates = date + '/' + dateKey(next).replace(/-/g, '');
    }
    window.open('https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + title + '&dates=' + dates + '&details=' + details, '_blank', 'noopener');
  }

  function copyDayToTomorrow() {
    const key = dateKey(plannerDate);
    const items = loadPlannerItems(key);
    const tomorrow = new Date(plannerDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tKey = dateKey(tomorrow);
    const existing = loadPlannerItems(tKey);
    if (existing.length && !confirm('Tomorrow already has entries. Replace them with a copy of this day?')) return;
    savePlannerItems(tKey, JSON.parse(JSON.stringify(items)));
    showToast('Copied to ' + tomorrow.toLocaleDateString(), 'success');
  }

  function confirmAddItem() {
    const text = ($('newItemText').value || '').trim();
    if (!text) { showToast('Please enter a description', 'error'); return; }
    const date = (($('newItemDate') && $('newItemDate').value) || dateKey(plannerDate));
    const allDay = $('newItemAllDay').checked;
    const start = allDay ? '' : ($('newItemStart').value || '');
    const end = allDay ? '' : (($('newItemEnd') && $('newItemEnd').value) || (start ? addMinutesToTime(start, DEFAULT_DURATION) : ''));
    const type = safeEventType($('newItemType').value);
    if (editingPlanner) {
      const fromKey = editingPlanner.key;
      const items = loadPlannerItems(fromKey);
      const item = items[editingPlanner.index];
      if (!item) return;
      item.text = text;
      item.start = start;
      item.end = end;
      item.type = type;
      item.allDay = allDay;
      if (date !== fromKey) {
        items.splice(editingPlanner.index, 1);
        savePlannerItems(fromKey, items);
        const dest = loadPlannerItems(date);
        dest.push(item);
        savePlannerItems(date, dest);
      } else {
        savePlannerItems(fromKey, items);
      }
      editingPlanner = null;
      plannerDate = new Date(date + 'T12:00:00');
      closeModal('addItemModal');
      renderPlanner();
      showToast('Event saved', 'success');
      return;
    }
    const items = loadPlannerItems(date);
    items.push({ text: text, done: false, start: start, end: end, type: type, allDay: allDay });
    savePlannerItems(date, items);
    plannerDate = new Date(date + 'T12:00:00');
    closeModal('addItemModal');
    renderPlanner();
    showToast('Event added', 'success');
  }

  function deleteEditingItem() {
    if (!editingPlanner) return;
    deletePlannerItem(editingPlanner.key, editingPlanner.index);
    editingPlanner = null;
    closeModal('addItemModal');
  }

  const SYNC_FILE = 'tinystarts-data.json';
  let syncPushTimer = null;
  let syncInFlight = false;

  function getSyncConfig() {
    return {
      gistId: (safeGet('tinystarts-sync-gist-id', '') || '').trim(),
      token: (safeGet('tinystarts-sync-token', '') || '').trim(),
      enabled: safeGet('tinystarts-sync-enabled', '') === '1'
    };
  }

  function setSyncStatus(text, isError) {
    const el = $('syncStatus');
    if (!el) return;
    el.textContent = text || '';
    el.style.color = isError ? 'var(--danger)' : 'var(--muted)';
  }

  function fillSyncForm() {
    const cfg = getSyncConfig();
    if ($('syncGistId')) $('syncGistId').value = cfg.gistId;
    if ($('syncEnabled')) $('syncEnabled').checked = cfg.enabled && !!(cfg.gistId && cfg.token);
    if ($('syncGistToken')) {
      $('syncGistToken').value = '';
      $('syncGistToken').placeholder = cfg.token ? 'Token saved on this device' : 'Token with gist scope only';
    }
    if (cfg.enabled && cfg.gistId && cfg.token) setSyncStatus('Sync is on for this device.');
    else if (cfg.gistId || cfg.token) setSyncStatus('Sync is set up but not enabled.');
    else setSyncStatus('Sync is off. This device keeps its own copy until you connect a gist.');
  }

  function saveSyncSettings() {
    const gistId = (($('syncGistId') && $('syncGistId').value) || '').trim().replace(/^https?:\/\/gist\.github\.com\/[^/]+\//, '');
    const typedToken = (($('syncGistToken') && $('syncGistToken').value) || '').trim();
    const existing = getSyncConfig();
    const token = typedToken || existing.token;
    if ($('syncGistId')) $('syncGistId').value = gistId;
    safeSet('tinystarts-sync-gist-id', gistId);
    if (typedToken) safeSet('tinystarts-sync-token', typedToken);
    const enabled = !!($('syncEnabled') && $('syncEnabled').checked);
    if (enabled && (!gistId || !token)) {
      safeSet('tinystarts-sync-enabled', '0');
      if ($('syncEnabled')) $('syncEnabled').checked = false;
      setSyncStatus('A gist ID and token are needed before sync can turn on.', true);
      return;
    }
    safeSet('tinystarts-sync-enabled', enabled ? '1' : '0');
    if ($('syncGistToken')) {
      $('syncGistToken').value = '';
      $('syncGistToken').placeholder = token ? 'Token saved on this device' : 'Token with gist scope only';
    }
    setSyncStatus(enabled ? 'Sync settings saved. Pulling now…' : 'Sync is off on this device. Local data is unchanged.');
    if (enabled) syncNow(true);
    else showToast('Sync turned off on this device', 'info');
  }

  function gistHeaders(token) {
    return {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    };
  }

  async function gistRequest(method, path, token, body) {
    const res = await fetch('https://api.github.com' + path, {
      method: method,
      headers: gistHeaders(token),
      body: body ? JSON.stringify(body) : undefined
    });
    let data = null;
    const text = await res.text();
    if (text) {
      try { data = JSON.parse(text); } catch (err) { data = { message: text }; }
    }
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || ('GitHub error ' + res.status);
      const err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  function payloadFromGist(gist) {
    const files = (gist && gist.files) || {};
    const file = files[SYNC_FILE] || files[Object.keys(files)[0]];
    if (!file || !file.content) return { taskDays: {}, plannerEntries: {} };
    const obj = JSON.parse(file.content);
    if (!obj || typeof obj !== 'object') throw new Error('The gist file was not valid JSON.');
    return obj;
  }

  async function pullFromGist() {
    const cfg = getSyncConfig();
    if (!cfg.enabled || !cfg.gistId || !cfg.token) return { pulled: false };
    const gist = await gistRequest('GET', '/gists/' + encodeURIComponent(cfg.gistId), cfg.token);
    const obj = payloadFromGist(gist);
    mergeImportedData(obj);
    return { pulled: true };
  }

  async function pushToGist() {
    const cfg = getSyncConfig();
    if (!cfg.enabled || !cfg.gistId || !cfg.token) return { pushed: false };
    const payload = exportPayload();
    // Never include tokens or device-only sync settings in the shared file.
    await gistRequest('PATCH', '/gists/' + encodeURIComponent(cfg.gistId), cfg.token, {
      files: {
        'tinystarts-data.json': { content: JSON.stringify(payload, null, 2) }
      }
    });
    return { pushed: true };
  }

  async function syncNow(fromSettings) {
    if (!currentUser) return;
    const cfg = getSyncConfig();
    if (!cfg.enabled || !cfg.gistId || !cfg.token) {
      if (fromSettings) setSyncStatus('Sync is not enabled on this device.');
      return;
    }
    if (syncInFlight) {
      setSyncStatus('Sync already in progress…');
      return;
    }
    syncInFlight = true;
    setSyncStatus('Syncing…');
    try {
      await pullFromGist();
      loadDay();
      renderPlanner();
      await pushToGist();
      const when = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
      setSyncStatus('Last synced at ' + when + '.');
      if (fromSettings) showToast('Synced', 'success');
    } catch (err) {
      const msg = err && err.message ? err.message : 'Sync failed';
      setSyncStatus(msg, true);
      if (fromSettings) showToast(msg, 'error', 5000);
      console.warn('Sync failed:', err);
    } finally {
      syncInFlight = false;
    }
  }

  function scheduleSyncPush() {
    const cfg = getSyncConfig();
    if (!cfg.enabled || !cfg.gistId || !cfg.token) return;
    clearTimeout(syncPushTimer);
    syncPushTimer = setTimeout(function () { syncNow(false); }, 1500);
  }

  async function createSecretGist() {
    const typedToken = (($('syncGistToken') && $('syncGistToken').value) || '').trim();
    const token = typedToken || getSyncConfig().token;
    if (!token) {
      setSyncStatus('Enter a GitHub token first, then create a gist.', true);
      return;
    }
    if (typedToken) safeSet('tinystarts-sync-token', typedToken);
    setSyncStatus('Creating a secret gist…');
    try {
      const gist = await gistRequest('POST', '/gists', token, {
        public: false,
        description: 'TinyStarts planner data (secret). Do not make this gist public.',
        files: {
          'tinystarts-data.json': { content: JSON.stringify(exportPayload(), null, 2) }
        }
      });
      if (!gist || !gist.id) throw new Error('GitHub did not return a gist ID.');
      safeSet('tinystarts-sync-gist-id', gist.id);
      safeSet('tinystarts-sync-enabled', '1');
      if ($('syncGistId')) $('syncGistId').value = gist.id;
      if ($('syncEnabled')) $('syncEnabled').checked = true;
      if ($('syncGistToken')) {
        $('syncGistToken').value = '';
        $('syncGistToken').placeholder = 'Token saved on this device';
      }
      setSyncStatus('Secret gist created. Enter this same gist ID and token on your other devices. Gist ID: ' + gist.id);
      showToast('Secret gist created', 'success', 5000);
    } catch (err) {
      setSyncStatus(err.message || 'Could not create gist', true);
      showToast(err.message || 'Could not create gist', 'error', 5000);
    }
  }

  function initSupabase() {
    if (window.supabase && !sb) {
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return sb;
  }

  function setAuthStatus(msg, isError) {
    const el = $('authStatus');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('error', !!isError);
  }

  function setAuthBusy(busy) {
    authBusy = !!busy;
    const btn = $('authSubmitBtn');
    if (!btn) return;
    btn.disabled = authBusy;
    btn.setAttribute('aria-busy', authBusy ? 'true' : 'false');
    btn.textContent = authBusy ? 'Signing in…' : 'Sign in';
  }

  function friendlyAuthError(error) {
    const msg = String((error && (error.message || error.error_description)) || '');
    const lower = msg.toLowerCase();
    if (lower.indexOf('invalid login') !== -1 || lower.indexOf('invalid credentials') !== -1 || lower.indexOf('email or password') !== -1 || lower.indexOf('username or password') !== -1) {
      return 'That username or password doesn’t match. Please try again.';
    }
    if (lower.indexOf('email not confirmed') !== -1 || lower.indexOf('not confirmed') !== -1) {
      return 'This account isn’t confirmed yet. Try again after it’s confirmed.';
    }
    if (lower.indexOf('mfa') !== -1 || lower.indexOf('factor') !== -1 || lower.indexOf('challenge') !== -1) {
      return 'That authenticator code didn’t work. Try the current code.';
    }
    if (!msg || lower.indexOf('fetch') !== -1 || lower.indexOf('network') !== -1) {
      return 'Can’t reach sign-in right now. Check your connection and try again.';
    }
    if (lower.indexOf('@') !== -1 || lower.indexOf(AUTH_EMAIL_DOMAIN) !== -1) {
      return 'That username or password doesn’t match. Please try again.';
    }
    return 'Couldn’t sign in. Please try again.';
  }

  function loginEmailFromUsername(raw) {
    const value = String(raw || '').trim();
    if (!value) return { error: 'Enter your username and password.' };
    if (value.indexOf('@') !== -1) return { email: value };
    const username = value.toLowerCase();
    if (!/^[a-z0-9._-]{3,32}$/.test(username)) {
      return { error: 'Usernames are 3–32 characters: letters, numbers, dots, underscores, and hyphens.' };
    }
    return { email: username + '@' + AUTH_EMAIL_DOMAIN };
  }

  function showLogin() {
    document.documentElement.dataset.gate = 'signed-out';
    setAuthBusy(false);
    const email = $('authEmail');
    if (email) setTimeout(function () { email.focus(); }, 30);
  }

  function getDisplayName() {
    if (!currentUser) return '';
    let name = (currentUser.user_metadata && currentUser.user_metadata.username) ||
      (currentUser.email && currentUser.email.split('@')[0]) ||
      'Signed in';
    if (String(name).indexOf('@') !== -1) name = String(name).split('@')[0];
    if (name && String(name).toLowerCase().endsWith('@' + AUTH_EMAIL_DOMAIN)) {
      name = String(name).slice(0, -1 - AUTH_EMAIL_DOMAIN.length);
    }
    return name || 'Signed in';
  }

  function closeAccountMenu() {
    const menu = $('accountMenu');
    const btn = $('accountBtn');
    if (menu) menu.hidden = true;
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleAccountMenu() {
    const menu = $('accountMenu');
    const btn = $('accountBtn');
    if (!menu || !btn) return;
    const willOpen = menu.hidden;
    closeDayChrome();
    menu.hidden = !willOpen;
    btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
  }

  function updateAccountUI() {
    const name = currentUser ? getDisplayName() : '';
    const emailEl = $('userEmail');
    if (emailEl) emailEl.textContent = name;
    const who = $('accountWho');
    if (who) who.textContent = name ? ('Signed in as ' + name) : 'Signed in';
    const initial = $('accountInitial');
    if (initial) initial.textContent = name ? String(name).charAt(0).toUpperCase() : '?';
    const accountBtn = $('accountBtn');
    if (accountBtn) accountBtn.setAttribute('aria-label', name ? ('Account menu, signed in as ' + name) : 'Account menu');
    const status = $('accountStatus');
    if (status) {
      status.textContent = currentUser
        ? ('Signed in as ' + getDisplayName() + '. Days sync to your account when you’re online.')
        : 'Sign in to open your planner.';
    }
    const buttons = $('authButtons');
    if (buttons) {
      buttons.innerHTML = '';
      if (currentUser) {
        const sec = document.createElement('button');
        sec.type = 'button';
        sec.id = 'openSecurityBtn';
        sec.className = 'btn secondary';
        sec.textContent = 'Two-step verification';
        sec.addEventListener('click', openSecurity);
        const out = document.createElement('button');
        out.type = 'button';
        out.id = 'signOutBtn';
        out.className = 'btn secondary';
        out.textContent = 'Sign out';
        out.addEventListener('click', signOut);
        buttons.appendChild(sec);
        buttons.appendChild(out);
      }
    }
  }

  async function logAudit(action, details) {
    if (!currentUser || !sb) return;
    try { await sb.from('audit_log').insert({ user_id: currentUser.id, action: action, details: details || {} }); }
    catch (err) {}
  }

  const LOCAL_DATA_KEYS = [
    'task-days',
    'planner-entries',
    'planner-updated',
    'tile-completions',
    'tile-visited',
    'tinystarts-sync-gist-id',
    'tinystarts-sync-token',
    'tinystarts-sync-enabled',
    'tinystarts-user-id',
    'user-affirmations'
  ];

  function clearLocalPersonalData() {
    LOCAL_DATA_KEYS.forEach(function (key) {
      try { localStorage.removeItem(key); } catch (err) {}
      delete memoryStore[key];
    });
    try { sessionStorage.clear(); } catch (err) {}
    Object.keys(memoryStore).forEach(function (key) {
      if (key.indexOf('s:') === 0) delete memoryStore[key];
    });
  }

  function clearSupabaseStorage() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.indexOf('sb-') === 0) keys.push(key);
      }
      keys.forEach(function (key) { localStorage.removeItem(key); });
    } catch (err) {}
  }

  function blankAppDom() {
    fillDayForm({});
    ['plannerContent', 'history', 'winsThisWeek', 'energyCalendar', 'suggestions', 'miniCalendar'].forEach(function (id) {
      const el = $(id);
      if (el) el.textContent = '';
    });
    if ($('weeklySummary')) $('weeklySummary').textContent = '';
    if ($('myAffirmationList')) $('myAffirmationList').textContent = '';
    if ($('myAffirmationInput')) { $('myAffirmationInput').value = ''; $('myAffirmationInput').dataset.editingId = ''; }
    if ($('userEmail')) $('userEmail').textContent = '';
    if ($('accountWho')) $('accountWho').textContent = 'Signed in';
    if ($('accountInitial')) $('accountInitial').textContent = '?';
    closeAccountMenu();
    if ($('authPassword')) $('authPassword').value = '';
    editingKey = null;
    editingPlanner = null;
    undoStack = [];
  }

  function localDataBelongsTo(user) {
    const stored = safeGet('tinystarts-user-id', '');
    return !stored || !user || stored === user.id;
  }

  async function enterApp(user, options) {
    if (!localDataBelongsTo(user)) clearLocalPersonalData();
    safeSet('tinystarts-user-id', user.id);
    currentUser = user;
    if (!appReady) {
      bindEvents();
      appReady = true;
      setInterval(checkReminders, 60000);
      setInterval(function () {
        const line = $('nowLine');
        if (!line) return;
        const now = new Date();
        line.style.top = timeToY(formatTimeValue(now.getHours(), now.getMinutes())) + 'px';
      }, 30000);
    }
    updateAccountUI();
    try { await loadFromCloud(); } catch (err) {}
    const requested = readDateParam();
    if (requested && requested !== todayKey()) {
      editingKey = requested;
      const parsed = parseDateKey(requested);
      if (parsed) {
        plannerDate = new Date(parsed.getTime());
        pickerMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
      }
    }
    loadDay();
    renderPlanner();
    checkReminders();
    applyLocationHash();
    fillSyncForm();
    document.documentElement.dataset.gate = 'signed-in';
    if ($('authPassword')) $('authPassword').value = '';
    setAuthStatus('');
    if (options && options.freshLogin) {
      try { await logAudit('login'); } catch (err) {}
      try { await pushLocalToCloud(); } catch (err) {}
    }
    if (getSyncConfig().enabled) syncNow(false);
  }

  async function signIn() {
    if (authBusy) return;
    setAuthStatus('');
    if (!initSupabase()) {
      setAuthStatus('Can’t reach sign-in right now. Check your connection and try again.', true);
      return;
    }
    const password = $('authPassword').value;
    const login = loginEmailFromUsername($('authEmail') && $('authEmail').value);
    if (!password || (login && login.error === 'Enter your username and password.')) {
      setAuthStatus('Enter your username and password.', true);
      return;
    }
    if (login.error) {
      setAuthStatus(login.error, true);
      return;
    }
    setAuthBusy(true);
    setAuthStatus('Signing in…');
    try {
      const result = await sb.auth.signInWithPassword({ email: login.email, password: password });
      if (result.error) {
        setAuthBusy(false);
        setAuthStatus(friendlyAuthError(result.error), true);
        return;
      }
      try {
        const aal = await sb.auth.mfa.getAuthenticatorAssuranceLevel();
        if (aal.data && aal.data.nextLevel === 'aal2' && aal.data.currentLevel !== 'aal2') {
          const factors = await sb.auth.mfa.listFactors();
          const totp = factors.data && factors.data.totp && factors.data.totp[0];
          if (totp) {
            if ($('authTotp')) $('authTotp').hidden = false;
            if ($('authTotpLabel')) $('authTotpLabel').hidden = false;
            const code = (($('authTotp') && $('authTotp').value) || '').trim();
            if (!code) {
              setAuthBusy(false);
              setAuthStatus('Enter the 6-digit code from your authenticator app.', true);
              if ($('authTotp')) $('authTotp').focus();
              return;
            }
            const challenge = await sb.auth.mfa.challenge({ factorId: totp.id });
            if (challenge.error) {
              setAuthBusy(false);
              setAuthStatus(friendlyAuthError(challenge.error), true);
              return;
            }
            const verify = await sb.auth.mfa.verify({ factorId: totp.id, challengeId: challenge.data.id, code: code });
            if (verify.error) {
              setAuthBusy(false);
              setAuthStatus(friendlyAuthError(verify.error), true);
              return;
            }
          }
        }
      } catch (mfaErr) {
        console.warn('MFA check skipped:', mfaErr);
      }
      const user = (result.data && result.data.user) || (await sb.auth.getUser()).data.user;
      if (!user) {
        setAuthBusy(false);
        setAuthStatus('Couldn’t sign in. Please try again.', true);
        return;
      }
      await enterApp(user, { freshLogin: true });
      setAuthBusy(false);
    } catch (err) {
      setAuthBusy(false);
      setAuthStatus(friendlyAuthError(err), true);
    }
  }

  async function signOut() {
    const user = currentUser;
    const client = sb;
    currentUser = null;
    clearSupabaseStorage();
    clearLocalPersonalData();
    blankAppDom();
    closeModal('settingsModal');
    closeModal('addItemModal');
    closeModal('winModal');
    updateAccountUI();
    showLogin();
    if (!client || !user) return;
    try {
      await client.from('audit_log').insert({ user_id: user.id, action: 'logout', details: {} });
    } catch (err) {}
    try { await client.auth.signOut(); } catch (err) {}
    clearSupabaseStorage();
  }

  function cloudUpsertDay(key, data) {
    if (!currentUser || !initSupabase()) return;
    sb.from('task_days').upsert({ user_id: currentUser.id, date: key, data: data })
      .then(function (res) {
        if (res.error) console.warn('Cloud day save failed:', res.error.message);
        else logAudit('save_day', { date: key });
      })
      .catch(function (err) { console.warn('Cloud day save failed:', err); });
  }

  function cloudDeleteDay(key) {
    if (!currentUser || !initSupabase()) return;
    sb.from('task_days').delete().eq('user_id', currentUser.id).eq('date', key)
      .then(function (res) {
        if (res.error) console.warn('Cloud day delete failed:', res.error.message);
      })
      .catch(function (err) { console.warn('Cloud day delete failed:', err); });
  }

  function cloudUpsertPlanner(key, items) {
    if (!currentUser || !initSupabase()) return;
    sb.from('planner_entries').upsert({ user_id: currentUser.id, date: key, items: items })
      .then(function (res) {
        if (res.error) console.warn('Cloud planner save failed:', res.error.message);
        else logAudit('save_planner', { date: key });
      })
      .catch(function (err) { console.warn('Cloud planner save failed:', err); });
  }

  async function loadFromCloud() {
    if (!currentUser || !initSupabase()) return;
    try {
      const daysRes = await sb.from('task_days').select('date, data').eq('user_id', currentUser.id);
      if (daysRes.error) throw daysRes.error;
      if (daysRes.data) {
        const local = getDayMap();
        daysRes.data.forEach(function (row) {
          if (!row || !row.date || !parseDateKey(row.date)) return;
          local[row.date] = mergeDayRecord(local[row.date], row.data);
        });
        saveJson('task-days', local);
      }
      const plansRes = await sb.from('planner_entries').select('date, items').eq('user_id', currentUser.id);
      if (plansRes.error) throw plansRes.error;
      if (plansRes.data) {
        const local = getPlannerMap();
        const meta = loadJson('planner-updated', {});
        plansRes.data.forEach(function (row) {
          if (!row || !row.date || !parseDateKey(row.date)) return;
          local[row.date] = pickPlanner(local[row.date], row.items);
          const chosen = plannerMeta(local[row.date]);
          if (chosen && chosen.savedAt) meta[row.date] = chosen.savedAt;
        });
        saveJson('planner-entries', local);
        saveJson('planner-updated', meta);
      }
      const affRes = await sb.from('user_affirmations').select('data').eq('user_id', currentUser.id);
      if (affRes.error) console.warn('Affirmation cloud load skipped:', affRes.error.message);
      else if (affRes.data && affRes.data[0] && affRes.data[0].data) {
        const remote = affRes.data[0].data;
        const local = getAffirmationStore();
        const chosen = recordTime(remote) >= recordTime(local) ? remote : local;
        saveJson('user-affirmations', {
          items: Array.isArray(chosen.items) ? chosen.items : [],
          mixOwn: !!chosen.mixOwn,
          savedAt: chosen.savedAt || ''
        });
      }
      await logAudit('load_data');
    } catch (err) {
      console.warn('Cloud load skipped:', err);
      showToast('Could not load cloud data just now. This device copy is still here.', 'info', 4000);
    }
  }

  async function pushLocalToCloud() {
    if (!currentUser || !initSupabase()) return;
    const days = getDayMap();
    const dayRows = Object.keys(days).filter(function (k) { return /^\d{4}-\d{2}-\d{2}$/.test(k); }).map(function (k) {
      return { user_id: currentUser.id, date: k, data: days[k] };
    });
    if (dayRows.length) {
      const res = await sb.from('task_days').upsert(dayRows);
      if (res.error) console.warn('Cloud day push failed:', res.error.message);
    }
    const plans = getPlannerMap();
    const planRows = Object.keys(plans).filter(function (k) { return /^\d{4}-\d{2}-\d{2}$/.test(k); }).map(function (k) {
      return { user_id: currentUser.id, date: k, items: plans[k] };
    });
    if (planRows.length) {
      const res = await sb.from('planner_entries').upsert(planRows);
      if (res.error) console.warn('Cloud planner push failed:', res.error.message);
    }
    const aff = getAffirmationStore();
    if (aff.savedAt) cloudUpsertAffirmations(aff);
  }

  function cloudUpsertAffirmations(store) {
    if (!currentUser || !initSupabase()) return;
    sb.from('user_affirmations').upsert({
      user_id: currentUser.id,
      data: { items: store.items || [], mixOwn: !!store.mixOwn, savedAt: store.savedAt || '' },
      updated_at: new Date().toISOString()
    }).then(function (res) {
      if (res.error) console.warn('Cloud affirmation save failed:', res.error.message);
    }).catch(function (err) { console.warn('Cloud affirmation save failed:', err); });
  }

  function isSafeImageSrc(src) {
    return typeof src === 'string' && /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml)[;,]/i.test(src);
  }

  async function openSecurity() {
    const panel = $('securityPanel');
    if (!panel) return;
    if (!initSupabase() || !currentUser) { panel.textContent = 'Sign in first to manage two-step verification.'; return; }
    panel.textContent = 'Loading…';
    try {
      const { data: factors, error } = await sb.auth.mfa.listFactors();
      if (error) throw error;
      panel.innerHTML = '';
      const totp = factors && factors.totp && factors.totp[0];
      if (totp) {
        const p = document.createElement('p');
        p.className = 'hint';
        p.textContent = 'Authenticator app is enabled.';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'disableTotpBtn';
        btn.className = 'btn secondary';
        btn.textContent = 'Disable 2FA';
        btn.addEventListener('click', function () { disableTotp(totp.id); });
        panel.appendChild(p);
        panel.appendChild(btn);
      } else {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'enrollTotpBtn';
        btn.className = 'btn secondary';
        btn.textContent = 'Enable authenticator app';
        btn.addEventListener('click', enrollTotp);
        panel.appendChild(btn);
      }
    } catch (err) {
      panel.textContent = err.message || 'Could not load security settings.';
    }
  }

  async function enrollTotp() {
    const panel = $('securityPanel');
    if (!panel || !sb) return;
    panel.textContent = 'Preparing…';
    const { data, error } = await sb.auth.mfa.enroll({ factorType: 'totp' });
    if (error) { panel.textContent = error.message; return; }
    panel.innerHTML = '';
    const p = document.createElement('p');
    p.textContent = 'Scan this QR code with your authenticator app:';
    panel.appendChild(p);
    if (data && data.totp && isSafeImageSrc(data.totp.qr_code)) {
      const img = document.createElement('img');
      img.src = data.totp.qr_code;
      img.alt = 'QR code';
      img.style.cssText = 'max-width:200px;margin:12px auto;display:block;';
      panel.appendChild(img);
    }
    if (data && data.totp && data.totp.secret) {
      const man = document.createElement('p');
      man.className = 'hint';
      man.textContent = 'Or enter manually: ' + data.totp.secret;
      panel.appendChild(man);
    }
    const lab = document.createElement('label');
    lab.className = 'field';
    lab.htmlFor = 'totpCode';
    lab.textContent = '6-digit code';
    const input = document.createElement('input');
    input.id = 'totpCode';
    input.name = 'totpCode';
    input.placeholder = '6-digit code';
    input.inputMode = 'numeric';
    panel.appendChild(lab);
    panel.appendChild(input);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'verifyTotpBtn';
    btn.className = 'btn';
    btn.textContent = 'Verify & enable';
    const factorId = data.id;
    btn.addEventListener('click', function () { verifyEnroll(factorId); });
    panel.appendChild(btn);
  }

  async function verifyEnroll(factorId) {
    const code = (($('totpCode') || {}).value || '').trim();
    const challenge = await sb.auth.mfa.challenge({ factorId: factorId });
    if (challenge.error) { showToast(challenge.error.message, 'error'); return; }
    const { error } = await sb.auth.mfa.verify({ factorId: factorId, challengeId: challenge.data.id, code: code });
    if (error) { showToast(error.message, 'error'); return; }
    showToast('2FA enabled', 'success');
    openSecurity();
  }

  async function disableTotp(factorId) {
    if (!confirm('Disable 2FA?')) return;
    const { error } = await sb.auth.mfa.unenroll({ factorId: factorId });
    if (error) showToast(error.message, 'error');
    else openSecurity();
  }

  function authRejected(err) {
    if (!err) return false;
    const status = err.status || err.statusCode;
    if (status === 401 || status === 403) return true;
    const msg = String(err.message || err).toLowerCase();
    return msg.indexOf('invalid') !== -1 && (msg.indexOf('jwt') !== -1 || msg.indexOf('token') !== -1 || msg.indexOf('session') !== -1);
  }

  function sessionStillValid(session) {
    if (!session || !session.user) return false;
    if (!session.expires_at) return true;
    return session.expires_at * 1000 > Date.now() + 5000;
  }

  async function resolveSession() {
    if (!initSupabase()) return null;
    try {
      const { data, error } = await sb.auth.getSession();
      if (error || !data || !data.session || !sessionStillValid(data.session)) return null;
      try {
        const userRes = await sb.auth.getUser();
        if (userRes && userRes.data && userRes.data.user) return userRes.data.user;
        if (userRes && authRejected(userRes.error)) {
          try { await sb.auth.signOut(); } catch (err) {}
          clearSupabaseStorage();
          clearLocalPersonalData();
          return null;
        }
      } catch (err) {
        if (authRejected(err)) {
          try { await sb.auth.signOut(); } catch (e) {}
          clearSupabaseStorage();
          clearLocalPersonalData();
          return null;
        }
      }
      return data.session.user;
    } catch (err) {
      return null;
    }
  }

  function startTimer(mins) {
    clearInterval(timerInterval);
    timerEndsAt = Date.now() + mins * 60 * 1000;
    tickTimer();
    timerInterval = setInterval(tickTimer, 250);
    try {
      if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
    } catch (err) {}
  }
  function tickTimer() {
    const remaining = Math.max(0, Math.round((timerEndsAt - Date.now()) / 1000));
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const label = m + ':' + String(s).padStart(2, '0');
    if ($('timerDisplay')) $('timerDisplay').textContent = remaining ? label : 'Done';
    const chip = $('timerChip');
    if (chip) {
      chip.textContent = remaining ? '⏱ ' + label : '';
      chip.classList.toggle('show', remaining > 0);
    }
    if (remaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      showToast('Timer done. What’s the very next small thing?', 'success', 6000);
      if ($('helperOutput')) $('helperOutput').textContent = 'What’s the very next small thing?';
      try {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('TinyStarts', { body: 'Timer done. What’s the very next small thing?' });
        }
      } catch (err) {}
    }
  }
  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    if ($('timerDisplay')) $('timerDisplay').textContent = '';
    const chip = $('timerChip');
    if (chip) { chip.textContent = ''; chip.classList.remove('show'); }
  }

  function reminderMatches(r, hour, minute) {
    if (r.endMinute != null) {
      return hour === r.startHour || (hour === r.endHour && minute < r.endMinute);
    }
    return hour === r.startHour;
  }

  function checkReminders() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const banner = $('reminderBanner');
    const text = $('reminderText');
    if (!banner || !text) return;
    const dismissed = sessionGet('reminder-dismissed-' + todayKey() + '-' + hour);
    if (dismissed) { banner.style.display = 'none'; return; }
    let msg = '';
    DEFAULT_REMINDERS.forEach(function (r) {
      if (!msg && reminderMatches(r, hour, minute)) msg = r.text;
    });
    if (msg) { text.textContent = msg; banner.style.display = 'block'; }
    else banner.style.display = 'none';
  }

  function switchTab(tab) {
    document.body.dataset.view = tab;
    document.querySelectorAll('.view').forEach(function (el) { el.classList.toggle('active', el.id === tab + 'View'); });
    document.querySelectorAll('nav.tabs button').forEach(function (el) { el.classList.toggle('active', el.dataset.tab === tab); });
    if (tab === 'planner') renderPlanner();
    if (tab === 'progress') {
      renderEnergyCalendar();
      renderWinsThisWeek();
      renderWeeklySummary();
      renderHistory();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pickRandom(list, last) {
    let idx;
    do { idx = Math.floor(Math.random() * list.length); } while (idx === last && list.length > 1);
    return idx;
  }

  function bindEvents() {
    $('themeBtn').addEventListener('click', function () {
      setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      closeAccountMenu();
    });
    $('settingsBtn').addEventListener('click', function () {
      closeAccountMenu();
      updateAccountUI();
      fillSyncForm();
      openModal('settingsModal');
    });
    if ($('accountBtn')) $('accountBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleAccountMenu();
    });
    document.addEventListener('click', function (e) {
      const menu = $('accountMenu');
      const btn = $('accountBtn');
      if (!menu || menu.hidden) return;
      if (btn && (e.target === btn || btn.contains(e.target))) return;
      if (menu.contains(e.target)) return;
      closeAccountMenu();
    });
    $('closeSettingsBtn').addEventListener('click', function () { closeModal('settingsModal'); });
    $('energyBtns').addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-level]');
      if (!btn) return;
      document.querySelectorAll('#energyBtns button').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      applyEnergySlots();
      scheduleSave();
    });
    if ($('affirmationShuffleBtn')) $('affirmationShuffleBtn').addEventListener('click', shuffleAffirmation);
    if ($('affirmationSaveBtn')) $('affirmationSaveBtn').addEventListener('click', heartCurrentAffirmation);
    if ($('myAffirmationAddBtn')) $('myAffirmationAddBtn').addEventListener('click', addOrUpdateMyAffirmation);
    if ($('affirmationMixToggle')) $('affirmationMixToggle').addEventListener('change', function (ev) {
      setMixOwn(ev.target.checked);
    });
    if ($('myAffirmationInput')) $('myAffirmationInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addOrUpdateMyAffirmation();
      }
    });
    if ($('meds-morning')) $('meds-morning').addEventListener('change', scheduleSave);
    if ($('meds-afternoon')) $('meds-afternoon').addEventListener('change', scheduleSave);
    if ($('addAnotherTask')) $('addAnotherTask').addEventListener('click', revealAnotherTask);
    $('brainDump').addEventListener('input', function () { renderBrainLines(); scheduleSave(); });
    $('gotDone').addEventListener('input', scheduleSave);
    $('carryOver').addEventListener('input', scheduleSave);
    $('tomorrow1').addEventListener('input', scheduleSave);
    $('suggestTop3Btn').addEventListener('click', suggestTop3);
    $('addMicroBtn').addEventListener('click', function () { addMicroRow('', false).focus(); });
    document.querySelectorAll('.micro-preset').forEach(function (btn) {
      btn.addEventListener('click', function () { addMicroRow(btn.dataset.text, false); scheduleSave(); });
    });
    $('stuckBtn').addEventListener('click', function () {
      lastStuck = pickRandom(STUCK_HELPS, lastStuck);
      $('stuckHelp').textContent = STUCK_HELPS[lastStuck];
    });
    $('tinyActionBtn').addEventListener('click', function () {
      $('helperOutput').textContent = TINY_ACTIONS[Math.floor(Math.random() * TINY_ACTIONS.length)];
    });
    $('easierBtn').addEventListener('click', function () {
      $('helperOutput').textContent = EASIER_PROMPTS[Math.floor(Math.random() * EASIER_PROMPTS.length)];
    });
    $('bodyDoubleBtn').addEventListener('click', function () {
      $('helperOutput').textContent = 'Imagine someone is sitting nearby working quietly. You’re not alone with this. Start for 5 minutes.';
    });
    document.querySelectorAll('.timer-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { startTimer(Number(btn.dataset.mins)); });
    });
    $('stopTimerBtn').addEventListener('click', stopTimer);
    $('timerChip').addEventListener('click', function () {
      switchTab('today');
      const fold = $('helpersFold');
      if (fold) fold.open = true;
    });
    $('logWinBtn').addEventListener('click', function () {
      $('winInput').value = '';
      openModal('winModal');
      setTimeout(function () { $('winInput').focus(); }, 50);
    });
    $('confirmWinBtn').addEventListener('click', function () {
      const win = $('winInput').value.trim();
      if (!win) return;
      const got = $('gotDone');
      got.value = (got.value ? got.value + '\n' : '') + '✓ ' + win;
      closeModal('winModal');
      scheduleSave();
    });
    $('cancelWinBtn').addEventListener('click', function () { closeModal('winModal'); });
    $('backToTodayBtn').addEventListener('click', backToToday);
    $('dismissReminderBtn').addEventListener('click', function () {
      sessionSet('reminder-dismissed-' + todayKey() + '-' + new Date().getHours(), '1');
      $('reminderBanner').style.display = 'none';
    });
    document.querySelectorAll('nav.tabs button').forEach(function (btn) {
      btn.addEventListener('click', function () { switchTab(btn.dataset.tab); });
    });
    $('prevDateBtn').addEventListener('click', function () { shiftPlannerDate(-1); });
    $('nextDateBtn').addEventListener('click', function () { shiftPlannerDate(1); });
    if ($('plannerTodayBtn')) $('plannerTodayBtn').addEventListener('click', goPlannerToday);
    document.querySelectorAll('.view-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        plannerView = btn.dataset.view;
        document.querySelectorAll('.view-toggle button').forEach(function (b) { b.classList.toggle('active', b === btn); });
        renderPlanner();
      });
    });
    $('addItemBtn').addEventListener('click', function () { openAddModal({ date: dateKey(plannerDate) }); });
    $('confirmAddBtn').addEventListener('click', confirmAddItem);
    $('cancelAddBtn').addEventListener('click', function () { editingPlanner = null; closeModal('addItemModal'); });
    if ($('deleteItemBtn')) $('deleteItemBtn').addEventListener('click', deleteEditingItem);
    if ($('newItemAllDay')) $('newItemAllDay').addEventListener('change', function () {
      const on = $('newItemAllDay').checked;
      if ($('newItemStart')) $('newItemStart').disabled = on;
      if ($('newItemEnd')) $('newItemEnd').disabled = on;
    });
    $('copyTomorrowBtn').addEventListener('click', copyDayToTomorrow);
    $('exportBtn').addEventListener('click', exportData);
    $('exportBtn2').addEventListener('click', exportData);
    function pickImport() { $('importFile').click(); }
    $('importBtn').addEventListener('click', pickImport);
    $('importBtn2').addEventListener('click', pickImport);
    $('importFile').addEventListener('change', function (e) {
      const file = e.target.files && e.target.files[0];
      handleImportFile(file);
      e.target.value = '';
    });
    $('historySearch').addEventListener('input', renderHistory);
    $('newItemText').addEventListener('keydown', function (e) { if (e.key === 'Enter') confirmAddItem(); });
    $('winInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') $('confirmWinBtn').click(); });
    if ($('prevDayBtn')) $('prevDayBtn').addEventListener('click', function () {
      const base = parseDateKey(activeKey()) || new Date();
      base.setDate(base.getDate() - 1);
      openDay(dateKey(base), true);
    });
    if ($('nextDayBtn')) $('nextDayBtn').addEventListener('click', function () {
      const base = parseDateKey(activeKey()) || new Date();
      base.setDate(base.getDate() + 1);
      openDay(dateKey(base), true);
    });
    if ($('jumpTodayBtn')) $('jumpTodayBtn').addEventListener('click', function () { openDay(todayKey(), true); });
    if ($('openDayPickerBtn')) $('openDayPickerBtn').addEventListener('click', toggleDayPicker);
    if ($('dayMenuBtn')) $('dayMenuBtn').addEventListener('click', toggleDayMenu);
    if ($('clearDayBtn')) $('clearDayBtn').addEventListener('click', function () { clearDay(activeKey()); });
    if ($('headerSignOutBtn')) $('headerSignOutBtn').addEventListener('click', signOut);
    if ($('syncForm')) $('syncForm').addEventListener('submit', function (e) { e.preventDefault(); });
    $('syncSaveBtn').addEventListener('click', saveSyncSettings);
    $('syncNowBtn').addEventListener('click', function () { syncNow(true); });
    $('syncCreateBtn').addEventListener('click', createSecretGist);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAccountMenu();
        closeDayChrome();
        ['settingsModal', 'addItemModal', 'winModal'].forEach(closeModal);
      }
    });
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(modal.id); });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') saveDay();
      if (document.visibilityState === 'visible') {
        checkReminders();
        if (currentUser) {
          loadFromCloud().then(function () { loadDay(); renderPlanner(); });
        }
        syncNow(false);
      }
    });
    window.addEventListener('beforeunload', function () { flushSave(); });
    window.addEventListener('popstate', function () {
      if (document.documentElement.dataset.gate !== 'signed-in') return;
      flushSave();
      const requested = readDateParam();
      const key = requested || todayKey();
      editingKey = key === todayKey() ? null : key;
      const parsed = parseDateKey(key);
      if (parsed) {
        plannerDate = new Date(parsed.getTime());
        pickerMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
      }
      closeDayChrome();
      loadDay();
      renderPlanner();
    });
  }

  function applyLocationHash() {
    const hash = (location.hash || '').replace(/^#/, '');
    if (!hash) return;
    if (hash.indexOf('planner') === 0 || hash === 'schedule') {
      const parts = hash.split('-');
      const view = parts[1];
      if (view === 'day' || view === 'week' || view === 'month' || view === 'workweek') plannerView = view;
      switchTab('planner');
    } else if (hash === 'progress') switchTab('progress');
    else if (hash === 'today') switchTab('today');
  }

  function watchAuth() {
    if (!sb || sb.__tinyAuthWatch) return;
    sb.__tinyAuthWatch = true;
    sb.auth.onAuthStateChange(function (event) {
      if (event === 'SIGNED_OUT' && document.documentElement.dataset.gate === 'signed-in') {
        currentUser = null;
        clearSupabaseStorage();
        clearLocalPersonalData();
        blankAppDom();
        closeModal('settingsModal');
        updateAccountUI();
        showLogin();
      }
    });
  }

  function start() {
    initTheme();
    document.body.dataset.view = 'today';
    document.documentElement.dataset.gate = 'checking';
    if ($('authForm')) $('authForm').addEventListener('submit', function (e) {
      e.preventDefault();
      signIn();
    });
    resolveSession().then(function (user) {
      if (sb) watchAuth();
      if (user) return enterApp(user);
      showLogin();
    }).catch(function () {
      showLogin();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js?v=6').catch(function (err) {
      console.warn('Service worker not registered:', err);
    });
  });
}
