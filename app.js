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
    'Small care for myself makes the next task lighter.',
    'I can begin with the part that is already in front of me.',
    'A small start counts even if the rest stays messy.',
    'I can let today be lighter than my worry about it.',
    'I don’t have to solve my whole life to open one tab.',
    'Coming back is a skill, and I am practicing it.',
    'I can do this in short bursts and still be proud.',
    'My brain can wander and I can gently bring it back.',
    'I can make the task fit the energy I actually have.',
    'It is okay to need a list. Lists are a kindness.',
    'I can stop at a reasonable place and call that enough.',
    'I can choose a tiny win and let it be the whole plan.',
    'I am allowed to move slowly without falling behind myself.',
    'I can put the next step on paper so my head can rest.',
    'Forgetting a step does not undo the steps I finished.',
    'I can ask the task to be smaller until I can touch it.',
    'A restart is not a failure. It is another beginning.',
    'I can keep the promise very small and still keep it.',
    'I don’t have to be in the mood to take the first minute.',
    'I can leave a trail of notes for the me who comes back.',
    'Today can be a soft day and still be a real day.',
    'I can do one kind thing for my future self and stop there.',
    'My attention is precious. I can spend a little of it here.',
    'I can work beside the noise in my head without fighting it.',
    'I am allowed to use tools, timers, and reminders.',
    'I can change the order. The order is not a moral test.',
    'I can sit down for two minutes and see what happens.',
    'The unfinished pile does not get to name who I am.',
    'I can drink water, then do the next visible thing.',
    'I can be new at this and still be doing it right.',
    'I can let “later” have a time, not a fog.',
    'I can close one loop and leave the others for tomorrow.',
    'I don’t have to earn the right to start over.',
    'A wobbly plan is still a plan I can follow.',
    'I can notice shame and set it down for this step.',
    'I can make the environment easier instead of pushing harder.',
    'I can do the boring part for five minutes and then reassess.',
    'I am allowed to need more breaks than the schedule expected.',
    'I can return to a half-done thing without a speech.',
    'My effort is real even when the result is quiet.',
    'I can choose the version that fits in this hour.',
    'I can write it badly and fix the shape later.',
    'I don’t have to hold every detail in my head.',
    'I can trust the page to remember for me.',
    'Starting in the middle is allowed.',
    'I can be kind to the part of me that is overwhelmed.',
    'I can take the task out of my head and onto the list.',
    'One clear next action is a gift I can give myself.',
    'I can stop comparing this morning to someone else’s.',
    'I am allowed to do less and still be a person who tries.',
    'I can let interest lead for a few minutes, then return.',
    'A pause to stretch still counts as taking care of the work.',
    'I can name what “done for now” looks like.',
    'I don’t have to finish to deserve rest tonight.',
    'I can make the first move so small it feels almost silly.',
    'Silly and started is better than grand and stuck.',
    'I can ask for a body double and not explain myself.',
    'I can keep the lights low and the task small.',
    'I can forgive the delay and begin from here.',
    'Here is a fine place to begin.',
    'I can let the timer hold the edge so I don’t have to.',
    'I can put my phone in another room and call that a strategy.',
    'I can do the easy version and still tell the truth.',
    'I can leave a sentence unfinished and come back to it.',
    'Coming back is the skill. I am allowed to use it.',
    'I can treat focus like a visitor, not a test I can fail.',
    'I can stack one tiny action on top of another.',
    'I can stop when I said I would and trust that I will return.',
    'I can be proud of a day that was mostly maintenance.',
    'Maintenance is care. Care counts.',
    'I can choose water, a stretch, and then the first click.',
    'I can let the plan be a suggestion, not a verdict.',
    'I can rewrite the plan in kinder words.',
    'Kinder words still get the work done.',
    'I can notice “I should” and trade it for “I could start with”.',
    'I can start with the visible object, not the whole project.',
    'The whole project can wait while I touch one piece.',
    'I can keep my promises pocket-sized.',
    'Pocket-sized promises are easier to keep, and keeping them matters.',
    'I can end the session with a note about where I stopped.',
    'A note about where I stopped is a bridge, not a confession.',
    'I can be on my own side while the list is long.',
    'The list being long does not mean I am behind as a person.',
    'I can do the next right-sized thing and then look up.',
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
  const SESSION_IDLE_MS = 60 * 60 * 1000;
  const ACTIVITY_STORAGE_KEY = 'tinystarts-last-activity';
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
  let loadedDayKey = null;
  const lastKnownCloudDays = {};
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
    if (!isDeletedRecord(remote) && dayHasContent(local) && !dayHasContent(remote)) return local;
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
        estimate: (item && item.estimate) || '',
        firstStep: (item && item.firstStep) || ''
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
  const DEFAULT_SUPPLEMENTS = [
    { slug: 'vitamin-d', label: 'Vitamin D', locked: true },
    { slug: 'vitamin-k', label: 'Vitamin K', locked: true },
    { slug: 'zinc', label: 'Zinc', locked: true }
  ];

  function supplementSlug(label) {
    return String(label || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 32);
  }

  function getSupplementCatalog() {
    const raw = loadJson('supplement-catalog', null);
    const saved = raw && Array.isArray(raw.items) ? raw.items : [];
    const bySlug = {};
    saved.forEach(function (item) {
      const slug = supplementSlug(item && (item.slug || item.label));
      if (!slug) return;
      bySlug[slug] = { slug: slug, label: String((item && item.label) || slug).trim().slice(0, 40) || slug, locked: !!item.locked };
    });
    DEFAULT_SUPPLEMENTS.forEach(function (item) {
      if (!bySlug[item.slug]) bySlug[item.slug] = { slug: item.slug, label: item.label, locked: true };
      else bySlug[item.slug].locked = true;
    });
    const ordered = [];
    DEFAULT_SUPPLEMENTS.forEach(function (item) { ordered.push(bySlug[item.slug]); });
    Object.keys(bySlug).forEach(function (slug) {
      if (!DEFAULT_SUPPLEMENTS.some(function (item) { return item.slug === slug; })) ordered.push(bySlug[slug]);
    });
    return ordered;
  }

  function saveSupplementCatalog(items) {
    saveJson('supplement-catalog', { items: items });
  }

  function normalizeMeds(meds) {
    const src = meds && typeof meds === 'object' ? meds : {};
    const supplements = {};
    const raw = src.supplements && typeof src.supplements === 'object' ? src.supplements : {};
    Object.keys(raw).forEach(function (key) {
      const slug = supplementSlug(key);
      if (slug) supplements[slug] = !!raw[key];
    });
    return { morning: !!src.morning, afternoon: !!src.afternoon, supplements: supplements };
  }

  function readSupplementChecks() {
    const supplements = {};
    document.querySelectorAll('#supplementList input[data-supplement]').forEach(function (input) {
      supplements[input.dataset.supplement] = !!input.checked;
    });
    return supplements;
  }

  function renderSupplementChecks(checkedMap) {
    const wrap = $('supplementList');
    if (!wrap) return;
    const checked = checkedMap || {};
    wrap.innerHTML = '';
    getSupplementCatalog().forEach(function (item) {
      const label = document.createElement('label');
      label.className = 'check-pill';
      label.htmlFor = 'med-' + item.slug;
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.id = 'med-' + item.slug;
      input.name = 'med-' + item.slug;
      input.dataset.supplement = item.slug;
      input.checked = !!checked[item.slug];
      const span = document.createElement('span');
      span.textContent = item.label;
      label.appendChild(input);
      label.appendChild(span);
      wrap.appendChild(label);
    });
  }

  function renderSupplementSettings() {
    const list = $('supplementSettings');
    if (!list) return;
    list.innerHTML = '';
    getSupplementCatalog().forEach(function (item) {
      const row = document.createElement('div');
      row.className = 'supplement-setting';
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.label;
      input.id = 'supplement-label-' + item.slug;
      input.maxLength = 40;
      input.setAttribute('aria-label', 'Name for ' + item.label);
      input.addEventListener('change', function () { renameSupplement(item.slug, input.value); });
      row.appendChild(input);
      if (!item.locked) {
        const del = document.createElement('button');
        del.type = 'button';
        del.className = 'btn ghost';
        del.id = 'supplement-remove-' + item.slug;
        del.textContent = 'Remove';
        del.addEventListener('click', function () { removeSupplement(item.slug); });
        row.appendChild(del);
      }
      list.appendChild(row);
    });
  }

  function renameSupplement(slug, label) {
    const name = String(label || '').trim().slice(0, 40);
    if (!name) { renderSupplementSettings(); return; }
    const items = getSupplementCatalog().map(function (item) {
      if (item.slug !== slug) return item;
      return { slug: item.slug, label: name, locked: item.locked };
    });
    saveSupplementCatalog(items);
    renderSupplementChecks(readSupplementChecks());
    renderSupplementSettings();
  }

  function removeSupplement(slug) {
    if (DEFAULT_SUPPLEMENTS.some(function (item) { return item.slug === slug; })) return;
    saveSupplementCatalog(getSupplementCatalog().filter(function (item) { return item.slug !== slug; }));
    renderSupplementChecks(readSupplementChecks());
    renderSupplementSettings();
  }

  function addSupplement(label) {
    const name = String(label || '').trim().slice(0, 40);
    const slug = supplementSlug(name);
    if (!slug) { showToast('Give the supplement a name', 'info'); return; }
    const items = getSupplementCatalog();
    if (items.some(function (item) { return item.slug === slug; })) {
      showToast('That one is already on the list', 'info');
      return;
    }
    items.push({ slug: slug, label: name, locked: false });
    saveSupplementCatalog(items);
    renderSupplementChecks(readSupplementChecks());
    renderSupplementSettings();
    if ($('newSupplementName')) $('newSupplementName').value = '';
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
  let saveSeq = 0;
  let saveRetryTimer = null;
  let pendingCloudSave = null;

  function setSaveStatus(state, text) {
    const el = $('saveStatus');
    if (!el) return;
    el.dataset.state = state || '';
    el.textContent = text || '';
    el.classList.toggle('show', !!text);
  }

  function savedClock(date) {
    return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  function finishCloudSave(seq, ok) {
    if (seq !== saveSeq) return;
    if (ok) {
      pendingCloudSave = null;
      setSaveStatus('saved', 'Saved ' + savedClock(new Date()));
      return;
    }
    setSaveStatus('error', 'Not saved yet, will retry');
    clearTimeout(saveRetryTimer);
    saveRetryTimer = setTimeout(retryCloudSave, 4000);
  }

  function retryCloudSave() {
    if (!pendingCloudSave || pendingCloudSave.seq !== saveSeq) return;
    if ($('saveStatus')) setSaveStatus('saving', 'Saving…');
    cloudUpsertDay(pendingCloudSave.key, pendingCloudSave.data, function (ok) {
      finishCloudSave(pendingCloudSave.seq, ok);
    });
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
        estimate: estBtn ? estBtn.dataset.estimate : '',
        firstStep: row.dataset.firstStep || ''
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
      affirmation: affirmationForSave(),
      meds: normalizeMeds({
        morning: !!( $('meds-morning') && $('meds-morning').checked ),
        afternoon: !!( $('meds-afternoon') && $('meds-afternoon').checked ),
        supplements: readSupplementChecks()
      }),
      savedAt: new Date().toISOString()
    };
  }

  let dictation = null;
  let dictationBtn = null;
  let dictationInput = null;
  let dictationMode = 'replace';
  let dictationBase = '';
  let dictationFinal = '';
  let silenceTimer = null;

  function dictationCtor() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function dictationSupported() {
    return !!dictationCtor();
  }

  function micIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ico');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    head.setAttribute('d', 'M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z');
    head.setAttribute('fill', 'none');
    head.setAttribute('stroke', 'currentColor');
    head.setAttribute('stroke-width', '1.7');
    const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    stem.setAttribute('d', 'M19 11a7 7 0 0 1-14 0M12 18v3');
    stem.setAttribute('fill', 'none');
    stem.setAttribute('stroke', 'currentColor');
    stem.setAttribute('stroke-width', '1.7');
    stem.setAttribute('stroke-linecap', 'round');
    svg.appendChild(head);
    svg.appendChild(stem);
    return svg;
  }

  function setMicState(button, listening) {
    if (!button) return;
    button.dataset.state = listening ? 'listening' : 'idle';
    button.setAttribute('aria-pressed', listening ? 'true' : 'false');
    const idleLabel = button.dataset.idleLabel || 'Dictate';
    button.setAttribute('aria-label', listening ? 'Stop dictation' : idleLabel);
  }

  function clearDictationUi() {
    if (dictationBtn) setMicState(dictationBtn, false);
    dictationBtn = null;
    dictationInput = null;
    clearTimeout(silenceTimer);
    silenceTimer = null;
  }

  function stopDictation() {
    clearTimeout(silenceTimer);
    const rec = dictation;
    dictation = null;
    if (rec) {
      rec.onresult = null;
      rec.onerror = null;
      rec.onend = null;
      try { rec.stop(); } catch (err) {}
    }
    clearDictationUi();
  }

  function writeDictated(input, value) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function appendSpoken(base, addition) {
    const extra = String(addition || '').replace(/\s+/g, ' ').trim();
    if (!extra) return base || '';
    if (!base) return extra;
    if (/\s$/.test(base)) return base + extra;
    return base + '\n' + extra;
  }

  function noteSilence() {
    clearTimeout(silenceTimer);
    silenceTimer = setTimeout(function () { stopDictation(); }, 2500);
  }

  function startDictation(input, button, mode) {
    const Ctor = dictationCtor();
    if (!Ctor || !input || !button) return;
    stopDictation();
    const rec = new Ctor();
    dictation = rec;
    dictationBtn = button;
    dictationInput = input;
    dictationMode = mode;
    dictationBase = mode === 'append' ? (input.value || '') : '';
    dictationFinal = '';
    rec.lang = 'en-US';
    rec.interimResults = true;
    rec.continuous = mode === 'append';
    rec.onresult = function (event) {
      if (dictation !== rec) return;
      noteSilence();
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const piece = event.results[i][0].transcript || '';
        if (event.results[i].isFinal) dictationFinal += piece;
        else interim += piece;
      }
      const spoken = (dictationFinal + ' ' + interim).replace(/\s+/g, ' ').trim();
      const next = mode === 'append' ? appendSpoken(dictationBase, spoken) : spoken;
      writeDictated(input, next);
    };
    rec.onerror = function (event) {
      if (dictation !== rec) return;
      const code = event && event.error;
      if (code === 'aborted') return;
      if (code === 'not-allowed' || code === 'service-not-allowed') {
        showToast('The mic stayed off. You can type instead.', 'info', 5000);
      } else {
        showToast('Couldn’t hear that — want to try again?', 'info', 5000);
      }
    };
    rec.onend = function () {
      if (dictation !== rec) return;
      stopDictation();
    };
    setMicState(button, true);
    noteSilence();
    try { rec.start(); }
    catch (err) {
      stopDictation();
      showToast('Couldn’t hear that — want to try again?', 'info', 5000);
    }
  }

  function toggleDictation(input, button, mode) {
    if (!dictationSupported()) return;
    if (dictationBtn === button && button.dataset.state === 'listening') {
      stopDictation();
      return;
    }
    startDictation(input, button, mode);
  }

  function makeMicButton(id, label, input, mode) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = id;
    btn.className = 'icon-btn mic-btn';
    btn.dataset.state = 'idle';
    btn.dataset.idleLabel = label;
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', label);
    btn.hidden = !dictationSupported();
    btn.appendChild(micIcon());
    btn.addEventListener('click', function () { toggleDictation(input, btn, mode); });
    return btn;
  }

  function initDictation() {
    const supported = dictationSupported();
    ['brainDumpMic', 'myAffirmationMic'].forEach(function (id) {
      const btn = $(id);
      if (!btn) return;
      btn.hidden = !supported;
      if (!supported || btn.dataset.bound) return;
      btn.dataset.bound = '1';
      if (!btn.querySelector('svg')) btn.appendChild(micIcon());
      const fieldId = id === 'brainDumpMic' ? 'brainDump' : 'myAffirmationInput';
      const mode = id === 'brainDumpMic' ? 'append' : 'replace';
      btn.dataset.idleLabel = btn.getAttribute('aria-label') || 'Dictate';
      btn.addEventListener('click', function () { toggleDictation($(fieldId), btn, mode); });
    });
  }

  function renderTop3(list) {
    const wrap = $('top3');
    if (!wrap) return;
    if (dictationInput && dictationInput.id && dictationInput.id.indexOf('top3-text-') === 0) stopDictation();
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
      row.dataset.firstStep = item.firstStep || '';
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
      input.placeholder = (currentEnergy() === 'Low' && n === 1) ? 'Verb, then the first step' : (placeholders[i] || 'Another small action…');
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
      line.appendChild(makeMicButton('top3-mic-' + n, 'Dictate priority ' + n, input, 'replace'));
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
      const options = document.createElement('details');
      options.className = 'task-options';
      const summary = document.createElement('summary');
      summary.textContent = 'Options';
      options.appendChild(summary);
      options.appendChild(meta);
      main.appendChild(line);
      main.appendChild(options);
      row.appendChild(main);
      // keep checkbox in the row visually at left - already in line
      wrap.appendChild(row);
    });
    applyEnergySlots();
    syncFirstStepField();
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
    const aff = (day.affirmation && String(day.affirmation).trim()) || '';
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
    renderSupplementChecks(meds.supplements);
    updateTodayTagline();
    initDictation();
  }

  function markDayUnloaded() {
    loadedDayKey = null;
  }

  function loadDay() {
    const key = activeKey();
    const all = getDayMap();
    const data = all[key] || {};
    fillDayForm(isDeletedRecord(data) ? {} : data);
    loadedDayKey = key;
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
    renderDayBackups();
    renderLaterList();
    syncFirstStepField();
    applyLowEnergyMode();
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
    const pill = $('todayPill');
    const onToday = key === todayKey();
    if (jump) jump.hidden = onToday;
    if (pill) pill.hidden = !onToday;
    updateTodayTagline();
    updateQuietAck();
    applyLowEnergyMode();
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
    updateQuietAck();
    dayDirty = true;
    setSaveStatus('saving', 'Saving…');
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
    if (data.meds && data.meds.supplements && Object.keys(data.meds.supplements).some(function (key) { return data.meds.supplements[key]; })) return true;
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
    markDayUnloaded();
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
      const actions = document.createElement('div');
      actions.className = 'brain-line-actions';
      const toTop = document.createElement('button');
      toTop.type = 'button';
      toTop.className = 'btn ghost';
      toTop.id = 'brain-line-top3-' + (index + 1);
      toTop.textContent = '→ Top 3';
      toTop.setAttribute('aria-label', 'Send line ' + (index + 1) + ' to Top 3');
      toTop.addEventListener('click', function () { sendBrainLineToTop3(line.trim()); });
      const toPlan = document.createElement('button');
      toPlan.type = 'button';
      toPlan.className = 'btn ghost';
      toPlan.id = 'brain-line-plan-' + (index + 1);
      toPlan.textContent = '→ Planner';
      toPlan.setAttribute('aria-label', 'Add line ' + (index + 1) + ' to the planner');
      toPlan.addEventListener('click', function () { sendBrainLineToPlanner(line.trim()); });
      const toLater = document.createElement('button');
      toLater.type = 'button';
      toLater.className = 'btn ghost';
      toLater.id = 'brain-line-later-' + (index + 1);
      toLater.textContent = '→ Later';
      toLater.setAttribute('aria-label', 'Park line ' + (index + 1) + ' for later');
      toLater.addEventListener('click', function () { moveBrainLineToLater(index); });
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'icon-text';
      btn.id = 'brain-line-delete-' + (index + 1);
      btn.textContent = 'Delete';
      btn.setAttribute('aria-label', 'Delete brain dump line ' + (index + 1));
      btn.addEventListener('click', function () { deleteBrainLine(index); });
      actions.appendChild(toTop);
      actions.appendChild(toPlan);
      actions.appendChild(toLater);
      actions.appendChild(btn);
      li.appendChild(span);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  function deleteBrainLine(index) {
    const box = $('brainDump');
    if (!box) return;
    if (!confirm('Delete this line?')) return;
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
    if (!confirm('Delete this task?')) return;
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
      row.appendChild(makeCalendarActions(key, index, 'day-cal'));
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

  function rememberCloudDay(key, data) {
    if (!key || !data) return;
    try { lastKnownCloudDays[key] = JSON.parse(JSON.stringify(data)); }
    catch (err) { lastKnownCloudDays[key] = data; }
  }

  function emptyWouldEraseContent(key, data) {
    if (!data || isDeletedRecord(data) || dayHasContent(data)) return false;
    return dayHasContent(getDayMap()[key]) || dayHasContent(lastKnownCloudDays[key]);
  }

  function rememberDayBackup(key) {
    const existing = getDayMap()[key];
    if (!dayHasContent(existing)) return;
    const all = loadJson('task-days-backup', {});
    const list = Array.isArray(all[key]) ? all[key].slice() : [];
    let copy = existing;
    try { copy = JSON.parse(JSON.stringify(existing)); } catch (err) {}
    list.push({ savedAt: new Date().toISOString(), data: copy });
    all[key] = list.slice(-3);
    saveJson('task-days-backup', all);
  }

  function saveDay() {
    if (!currentUser) return;
    if (loadedDayKey == null || loadedDayKey !== activeKey()) return;
    const all = getDayMap();
    const key = activeKey();
    const data = currentDayDataFromDom();
    if (emptyWouldEraseContent(key, data)) {
      console.warn('Skipped saving an empty day over existing entries for ' + key);
      dayDirty = false;
      clearTimeout(saveTimer);
      saveTimer = null;
      return;
    }
    rememberDayBackup(key);
    dayDirty = false;
    all[key] = data;
    saveJson('task-days', all);
    showAffirmation(data.affirmation);
    const seq = ++saveSeq;
    pendingCloudSave = { key: key, data: data, seq: seq };
    setSaveStatus('saving', 'Saving…');
    renderEnergyCalendar();
    renderWinsThisWeek();
    renderWeeklySummary();
    renderHistory();
    scheduleSyncPush();
    cloudUpsertDay(key, data, function (ok) { finishCloudSave(seq, ok); });
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
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn secondary';
    btn.id = 'carryOverBtn';
    btn.textContent = 'Carry over leftovers';
    btn.addEventListener('click', carryOverLeftovers);
    prompt.appendChild(btn);
  }

  function yesterdayLeftovers() {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yData = getDayMap()[dateKey(y)] || {};
    const todayTexts = normalizeTop3(currentDayDataFromDom().top3).map(function (t) { return t.text.trim().toLowerCase(); }).filter(Boolean);
    const suggestions = [];
    normalizeTop3(yData.top3).forEach(function (t) {
      if (t.text && !t.done && todayTexts.indexOf(t.text.trim().toLowerCase()) === -1) suggestions.push({ text: t.text, estimate: t.estimate || '' });
    });
    if (yData.tomorrow1 && todayTexts.indexOf(String(yData.tomorrow1).trim().toLowerCase()) === -1) {
      const already = suggestions.some(function (s) { return s.text.trim().toLowerCase() === String(yData.tomorrow1).trim().toLowerCase(); });
      if (!already) suggestions.push({ text: String(yData.tomorrow1).trim(), estimate: '' });
    }
    return suggestions;
  }

  function carryOverLeftovers() {
    const cap = energySlotCount(currentEnergy());
    let filled = 0;
    for (let n = 1; n <= 3; n++) {
      const input = $('top3-text-' + n);
      if (input && String(input.value || '').trim()) filled++;
    }
    const room = Math.max(0, Math.min(3, cap) - filled);
    const suggestions = yesterdayLeftovers();
    if (!suggestions.length) {
      showToast('Nothing left over from yesterday.', 'info');
      return;
    }
    if (!room) {
      showToast('Today already has room for what fits. You can edit one if you want.', 'info');
      return;
    }
    let added = 0;
    suggestions.forEach(function (item) {
      if (added >= room) return;
      for (let n = 1; n <= cap; n++) {
        const input = $('top3-text-' + n);
        if (input && !String(input.value || '').trim()) {
          input.value = item.text;
          const row = input.closest('.task-row');
          if (row && item.estimate) {
            row.querySelectorAll('.est-chips button').forEach(function (b) {
              b.classList.toggle('active', b.dataset.estimate === item.estimate);
            });
          }
          input.dispatchEvent(new Event('input', { bubbles: true }));
          added++;
          break;
        }
      }
    });
    applyEnergySlots();
    if (!added) showToast('Nothing else fits in today’s space.', 'info');
    else showToast('Brought over what fits today.', 'success');
    checkCarryOver();
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
    const low = currentEnergy() === 'Low';
    const cap = energySlotCount(currentEnergy());
    const rows = document.querySelectorAll('#top3 .task-row');
    let lastFilled = -1;
    rows.forEach(function (row, i) {
      const input = row.querySelector('input[type="text"]');
      if (input && input.value.trim()) lastFilled = i;
    });
    const showUntil = low ? 1 : Math.max(cap, lastFilled + 1);
    rows.forEach(function (row, i) {
      row.classList.toggle('hidden-slot', i >= showUntil);
    });
    const addBtn = $('addAnotherTask');
    if (addBtn) addBtn.hidden = low || showUntil >= rows.length;
    updateTodayTagline();
    applyLowEnergyMode();
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
    return { items: items, mixOwn: !!raw.mixOwn, savedAt: raw.savedAt || '', later: getLaterItems() };
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
    const pool = AFFIRMATIONS.length ? AFFIRMATIONS : [DEFAULT_AFFIRMATION];
    return pool[hashString('tinystarts|' + (key || todayKey())) % pool.length];
  }

  function affirmationForSave() {
    const typed = (($('affirmation') || {}).value || '').trim();
    if (typed) return typed;
    const existing = getDayMap()[activeKey()];
    if (existing && !existing.deleted && existing.affirmation) return String(existing.affirmation).trim();
    return '';
  }

  function showAffirmation(text) {
    const stored = String(text || '').trim();
    const shown = stored || dailyAffirmation(activeKey());
    if ($('affirmation')) $('affirmation').value = stored;
    if ($('affirmationText')) $('affirmationText').textContent = shown;
    const btn = $('affirmationUseBtn');
    if (btn) {
      btn.textContent = stored ? 'Using this' : 'Use it';
      btn.setAttribute('aria-pressed', stored ? 'true' : 'false');
    }
  }

  function useShownAffirmation() {
    const shown = (($('affirmationText') && $('affirmationText').textContent) || '').trim();
    if (!shown) return;
    if ($('affirmation')) $('affirmation').value = shown;
    dayDirty = true;
    saveDay();
    showToast('Using this for today.', 'success');
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
    store.savedAt = store.savedAt || new Date().toISOString();
    const later = Array.isArray(store.later) ? normalizeLaterItems(store.later) : getLaterItems();
    const payload = {
      items: store.items,
      mixOwn: !!store.mixOwn,
      savedAt: store.savedAt,
      later: later
    };
    saveJson('user-affirmations', payload);
    saveJson('later-items', { items: later, savedAt: store.savedAt });
    cloudUpsertAffirmations(payload);
    renderMyAffirmations();
    renderLaterList();
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
    if ($('affirmation')) $('affirmation').value = text;
    dayDirty = true;
    saveDay();
    showToast('Saved, and using it today.', 'success');
  }

  function deleteMyAffirmation(id) {
    const store = getAffirmationStore();
    const item = store.items.filter(function (row) { return row.id === id && !row.deletedAt; })[0];
    if (!item) return;
    if (!confirm('Delete this affirmation?')) return;
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

  function sendBrainLineToTop3(text) {
    const value = String(text || '').trim();
    if (!value) return;
    for (let n = 1; n <= 3; n++) {
      const input = $('top3-text-' + n);
      if (input && !String(input.value || '').trim()) {
        input.value = value;
        applyEnergySlots();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        showToast('Added to Top 3.', 'success');
        return;
      }
    }
    showToast('Top 3 is full for now. You can edit one when you want.', 'info');
  }

  function normalizeLaterItems(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item && String(item.text || '').trim();
    }).map(function (item) {
      return {
        id: item.id || ('later-' + hashString(item.text + '|' + (item.savedAt || ''))),
        text: String(item.text).trim(),
        savedAt: item.savedAt || ''
      };
    });
  }

  function mergeLaterLists(localList, remoteList) {
    const local = normalizeLaterItems(localList);
    const remote = normalizeLaterItems(remoteList);
    if (!local.length && remote.length) return remote;
    if (!remote.length) return local;
    const byId = {};
    remote.forEach(function (item) { byId[item.id] = item; });
    local.forEach(function (item) {
      const prev = byId[item.id];
      if (!prev || (Date.parse(item.savedAt || 0) || 0) >= (Date.parse(prev.savedAt || 0) || 0)) byId[item.id] = item;
    });
    return Object.keys(byId).map(function (id) { return byId[id]; });
  }

  function getLaterItems() {
    const aff = loadJson('user-affirmations', {});
    const legacy = loadJson('later-items', {});
    return mergeLaterLists(normalizeLaterItems(legacy.items), normalizeLaterItems(aff.later));
  }

  function saveLaterItems(items) {
    const cleaned = normalizeLaterItems(items);
    const stamp = new Date().toISOString();
    saveJson('later-items', { items: cleaned, savedAt: stamp });
    const store = getAffirmationStore();
    store.later = cleaned;
    store.savedAt = stamp;
    persistAffirmationStore(store);
  }

  function renderLaterList() {
    const list = $('laterList');
    if (!list) return;
    list.innerHTML = '';
    getLaterItems().forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'brain-line';
      li.id = 'later-item-' + item.id;
      const span = document.createElement('span');
      span.textContent = item.text;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn ghost';
      btn.textContent = '→ Today';
      btn.setAttribute('aria-label', 'Pull ' + item.text + ' into Today');
      btn.addEventListener('click', function () { pullLaterToToday(item.id); });
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function moveBrainLineToLater(index) {
    const box = $('brainDump');
    if (!box) return;
    const lines = String(box.value || '').split('\n');
    const text = String(lines[index] || '').trim();
    if (!text) return;
    const items = getLaterItems();
    items.push({ id: 'later-' + Date.now().toString(36), text: text, savedAt: new Date().toISOString() });
    lines.splice(index, 1);
    box.value = lines.join('\n');
    box.dispatchEvent(new Event('input', { bubbles: true }));
    saveLaterItems(items);
    showToast('Parked for later.', 'success');
  }

  function pullLaterToToday(id) {
    const items = getLaterItems();
    const item = items.filter(function (row) { return row.id === id; })[0];
    if (!item) return;
    let placed = false;
    for (let n = 1; n <= 3; n++) {
      const input = $('top3-text-' + n);
      if (input && !String(input.value || '').trim()) {
        input.value = item.text;
        applyEnergySlots();
        input.dispatchEvent(new Event('input', { bubbles: true }));
        placed = true;
        break;
      }
    }
    if (!placed) {
      showToast('Top 3 is full for now. You can edit one when you want.', 'info');
      return;
    }
    saveLaterItems(items.filter(function (row) { return row.id !== id; }));
    showToast('Pulled into Today.', 'success');
  }

  function syncFirstStepField() {
    const input = $('firstStepInput');
    const row = currentTop3Row();
    if (!input) return;
    input.value = row ? (row.dataset.firstStep || '') : '';
  }

  function currentTop3Row() {
    const rows = document.querySelectorAll('#top3 .task-row');
    for (let i = 0; i < rows.length; i++) {
      const text = rows[i].querySelector('input[type="text"]');
      const done = rows[i].querySelector('input[type="checkbox"]');
      if (text && String(text.value || '').trim() && !(done && done.checked)) return rows[i];
    }
    return rows[0] || null;
  }

  let focusTimerInterval = null;
  let focusEndsAt = 0;

  function startFocusTimer(mins) {
    clearInterval(focusTimerInterval);
    focusEndsAt = Date.now() + mins * 60 * 1000;
    tickFocusTimer();
    focusTimerInterval = setInterval(tickFocusTimer, 250);
  }

  function tickFocusTimer() {
    const remaining = Math.max(0, Math.round((focusEndsAt - Date.now()) / 1000));
    const el = $('focusTimerDisplay');
    if (el) {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      el.textContent = remaining ? (minutes + ':' + String(seconds).padStart(2, '0')) : 'Time’s up. The step can stay small.';
    }
    if (remaining <= 0) {
      clearInterval(focusTimerInterval);
      focusTimerInterval = null;
    }
  }

  function stopFocusTimer() {
    clearInterval(focusTimerInterval);
    focusTimerInterval = null;
    focusEndsAt = 0;
    if ($('focusTimerDisplay')) $('focusTimerDisplay').textContent = '';
  }

  function sendBrainLineToPlanner(text) {
    const value = String(text || '').trim();
    if (!value) return;
    const key = activeKey();
    const slot = nextFreeSlot(key, 30);
    const items = loadPlannerItems(key);
    items.push({ text: value, done: false, start: slot.start, end: slot.end, type: 'personal', allDay: false });
    savePlannerItems(key, items);
    if (typeof renderPlanner === 'function') renderPlanner();
    showToast('Added to the planner.', 'success');
  }

  function updateQuietAck() {
    const el = $('quietAck');
    if (!el) return;
    const energyOn = !!currentEnergy();
    const medsOn = !!($('meds-morning') && $('meds-morning').checked)
      || !!($('meds-afternoon') && $('meds-afternoon').checked)
      || !!document.querySelector('#supplementList input:checked');
    const dumpOn = String(($('brainDump') && $('brainDump').value) || '').split('\n').some(function (line) { return !!line.trim(); });
    let anyTop = false;
    for (let n = 1; n <= 3; n++) {
      const input = $('top3-text-' + n);
      if (input && String(input.value || '').trim()) anyTop = true;
    }
    el.hidden = !(energyOn || medsOn || dumpOn || anyTop);
  }

  function applyLowEnergyMode() {
    const view = $('todayView');
    const btn = $('showMoreToday');
    if (!view) return;
    const low = currentEnergy() === 'Low';
    if (low) view.dataset.energy = 'low';
    else {
      delete view.dataset.energy;
      delete view.dataset.more;
    }
    if (btn) {
      btn.hidden = !low;
      const open = view.dataset.more === 'open';
      btn.textContent = open ? 'Show less' : 'Show more';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    const title = $('top3Title');
    const hint = $('top3Hint');
    if (low) {
      if (title) title.textContent = 'One thing';
      if (hint) hint.textContent = 'A verb, then the first step. That’s enough.';
    }
  }

  function toggleShowMore() {
    const view = $('todayView');
    if (!view) return;
    view.dataset.more = view.dataset.more === 'open' ? '' : 'open';
    if (!view.dataset.more) delete view.dataset.more;
    applyLowEnergyMode();
  }

  function dayBackupList(key) {
    const all = loadJson('task-days-backup', {});
    return Array.isArray(all[key]) ? all[key] : [];
  }

  function backupPreview(data) {
    const top = normalizeTop3(data && data.top3).map(function (item) { return String(item.text || '').trim(); }).filter(Boolean)[0];
    if (top) return top;
    const line = String((data && data.brainDump) || '').split('\n').map(function (part) { return part.trim(); }).filter(Boolean)[0];
    if (line) return line;
    if (data && data.energy) return 'Energy: ' + data.energy;
    return 'Saved version';
  }

  function backupWhen(iso) {
    const date = new Date(iso || '');
    if (isNaN(date.getTime())) return 'Earlier';
    return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  }

  function renderDayBackups() {
    const card = $('dayBackupCard');
    const list = $('restoreEarlierList');
    if (!card || !list) return;
    const versions = dayBackupList(activeKey());
    card.hidden = !versions.length;
    list.innerHTML = '';
    versions.forEach(function (version, index) {
      const row = document.createElement('div');
      row.className = 'backup-version';
      const copy = document.createElement('p');
      const when = document.createElement('span');
      when.className = 'when';
      when.textContent = backupWhen(version && (version.savedAt || (version.data && version.data.savedAt)));
      const preview = document.createElement('span');
      preview.textContent = backupPreview(version && version.data);
      copy.appendChild(when);
      copy.appendChild(preview);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn secondary';
      btn.id = 'restore-version-' + (index + 1);
      btn.textContent = 'Restore';
      btn.addEventListener('click', function () { restoreDayVersion(index); });
      row.appendChild(copy);
      row.appendChild(btn);
      list.appendChild(row);
    });
  }

  function restoreDayVersion(index) {
    const versions = dayBackupList(activeKey());
    const version = versions[index];
    if (!version || !version.data || isDeletedRecord(version.data)) return;
    if (!confirm('Restore this earlier version? The current version stays in the backup list.')) return;
    fillDayForm(version.data);
    dayDirty = true;
    saveDay();
    renderDayBackups();
    showToast('Earlier version restored.', 'success');
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
    const affirmations = getAffirmationStore();
    return {
      exportedAt: new Date().toISOString(),
      taskDays: getDayMap(),
      plannerEntries: getPlannerMap(),
      affirmations: {
        items: affirmations.items || [],
        mixOwn: !!affirmations.mixOwn,
        savedAt: affirmations.savedAt || ''
      },
      later: getLaterItems(),
      tileCompletions: loadJson('tile-completions', {}),
      tileVisited: loadJson('tile-visited', {}),
      plannerUpdated: loadJson('planner-updated', {}),
      supplementCatalog: loadJson('supplement-catalog', null),
      theme: safeGet('theme', 'light')
    };
  }

  function exportData() {
    const name = 'tinystarts-backup-' + todayKey() + '.json';
    downloadFile(new File([JSON.stringify(exportPayload(), null, 2)], name, { type: 'application/json' }));
    showToast('Backup downloaded', 'success');
  }

  function setExportStatus(text) {
    const el = $('exportStatus');
    if (el) el.textContent = text || '';
  }

  function exportShareSupported() {
    try {
      if (!navigator.share || !navigator.canShare) return false;
      const file = new File(['day'], 'tinystarts-export.csv', { type: 'text/csv' });
      return !!navigator.canShare({ files: [file] });
    } catch (err) { return false; }
  }

  function initExportShare() {
    const btn = $('exportShareBtn');
    if (btn) btn.hidden = !exportShareSupported();
  }

  function csvCell(value) {
    const text = value == null ? '' : String(value);
    if (/[",\n\r]/.test(text)) return '"' + text.replace(/"/g, '""') + '"';
    return text;
  }

  function inExportRange(key, range) {
    if (!parseDateKey(key)) return false;
    if (range === 'all') return true;
    const count = range === '30' ? 30 : 7;
    const end = parseDateKey(todayKey());
    const start = new Date(end.getTime());
    start.setDate(start.getDate() - (count - 1));
    const day = parseDateKey(key);
    return day >= start && day <= end;
  }

  function dayIsExportable(data) {
    return !!(data && !isDeletedRecord(data));
  }

  async function collectExportSource() {
    const days = getDayMap();
    let affirmations = getAffirmationStore();
    if (currentUser && initSupabase() && (typeof navigator === 'undefined' || navigator.onLine !== false)) {
      try {
        const daysRes = await sb.from('task_days').select('date, data').eq('user_id', currentUser.id);
        if (!daysRes.error && daysRes.data) {
          daysRes.data.forEach(function (row) {
            if (!row || !parseDateKey(row.date)) return;
            days[row.date] = mergeDayRecord(days[row.date], row.data);
          });
        }
        const affRes = await sb.from('user_affirmations').select('data').eq('user_id', currentUser.id);
        if (!affRes.error && affRes.data && affRes.data[0] && affRes.data[0].data) {
          const remote = affRes.data[0].data;
          if (recordTime(remote) >= recordTime(affirmations)) affirmations = remote;
        }
      } catch (err) {}
    }
    return { days: days, affirmations: affirmations };
  }

  function savedAffirmationTexts(store) {
    const items = store && Array.isArray(store.items) ? store.items : [];
    return items.filter(function (item) {
      return item && !item.deletedAt && String(item.text || '').trim();
    }).map(function (item) { return String(item.text).trim(); });
  }

  function buildExportRows(source, range) {
    const texts = savedAffirmationTexts(source.affirmations);
    const saved = texts.join(' | ');
    const rows = [];
    Object.keys(source.days).filter(function (key) {
      return inExportRange(key, range) && dayIsExportable(source.days[key]);
    }).sort().forEach(function (key) {
      const day = source.days[key] || {};
      const top3 = normalizeTop3(day.top3);
      const meds = normalizeMeds(day.meds);
      rows.push({
        date: key,
        affirmation: (day.affirmation && String(day.affirmation).trim()) || '',
        top3: top3.slice(0, 3).map(function (item) { return { text: item.text || '', done: !!item.done }; }),
        brainDump: day.brainDump || '',
        energy: day.energy || '',
        medsMorning: !!meds.morning,
        medsAfternoon: !!meds.afternoon,
        supplements: meds.supplements,
        savedAffirmations: saved
      });
    });
    return { rows: rows, savedAffirmations: texts };
  }

  function supplementColumns(rows) {
    const slugs = {};
    rows.forEach(function (row) {
      Object.keys(row.supplements || {}).forEach(function (slug) { slugs[slug] = true; });
    });
    return Object.keys(slugs).sort();
  }

  function buildExportCsv(rows) {
    const extras = supplementColumns(rows);
    const header = ['date', 'affirmation', 'top3_1', 'top3_1_done', 'top3_2', 'top3_2_done', 'top3_3', 'top3_3_done', 'brain_dump', 'energy', 'meds_morning', 'meds_afternoon']
      .concat(extras.map(function (slug) { return 'med_' + slug.replace(/-/g, '_'); }))
      .concat(['saved_affirmations']);
    const lines = [header.join(',')];
    rows.forEach(function (row) {
      const cells = [
        row.date,
        row.affirmation,
        row.top3[0] ? row.top3[0].text : '',
        row.top3[0] && row.top3[0].done ? 'yes' : 'no',
        row.top3[1] ? row.top3[1].text : '',
        row.top3[1] && row.top3[1].done ? 'yes' : 'no',
        row.top3[2] ? row.top3[2].text : '',
        row.top3[2] && row.top3[2].done ? 'yes' : 'no',
        row.brainDump,
        row.energy,
        row.medsMorning ? 'yes' : 'no',
        row.medsAfternoon ? 'yes' : 'no'
      ];
      extras.forEach(function (slug) {
        cells.push(row.supplements[slug] ? 'yes' : 'no');
      });
      cells.push(row.savedAffirmations);
      lines.push(cells.map(csvCell).join(','));
    });
    return lines.join('\r\n') + '\r\n';
  }

  function buildExportJson(rows, savedAffirmations, range) {
    return JSON.stringify({
      exportedAt: new Date().toISOString(),
      range: range,
      savedAffirmations: savedAffirmations,
      days: rows.map(function (row) {
        return {
          date: row.date,
          affirmation: row.affirmation,
          top3: row.top3,
          brainDump: row.brainDump,
          energy: row.energy,
          meds: {
            morning: row.medsMorning,
            afternoon: row.medsAfternoon,
            supplements: row.supplements
          },
          savedAffirmations: savedAffirmationTexts({ items: savedAffirmations.map(function (text) { return { text: text }; }) })
        };
      })
    }, null, 2);
  }

  async function makeExportFile() {
    const range = ($('exportRange') && $('exportRange').value) || '7';
    const format = ($('exportFormat') && $('exportFormat').value) === 'json' ? 'json' : 'csv';
    const source = await collectExportSource();
    const built = buildExportRows(source, range);
    if (!built.rows.length) {
      setExportStatus('No entries yet in this range.');
      return null;
    }
    setExportStatus('');
    const name = 'tinystarts-export-' + todayKey() + '.' + format;
    if (format === 'json') {
      return new File([buildExportJson(built.rows, built.savedAffirmations, range)], name, { type: 'application/json' });
    }
    return new File([buildExportCsv(built.rows)], name, { type: 'text/csv' });
  }

  function downloadFile(file) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }

  async function downloadExport() {
    const file = await makeExportFile();
    if (!file) return;
    downloadFile(file);
    showToast('Export downloaded', 'success');
  }

  async function shareExport() {
    const file = await makeExportFile();
    if (!file) return;
    try {
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'TinyStarts export', text: 'My planner days' });
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
    showToast('Couldn’t share just now. The download is ready instead.', 'info', 5000);
    downloadFile(file);
  }

  function backupDayKeys(obj) {
    const src = (obj && (obj.taskDays || obj['task-days'])) || {};
    return Object.keys(src).filter(function (key) { return !!parseDateKey(key); }).sort();
  }

  function validateBackupFile(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) throw new Error('That file doesn’t look like a TinyStarts backup.');
    const days = obj.taskDays || obj['task-days'];
    if (days && (typeof days !== 'object' || Array.isArray(days))) throw new Error('The days in that file are not readable.');
    const plans = obj.plannerEntries || obj['planner-entries'];
    if (plans && (typeof plans !== 'object' || Array.isArray(plans))) throw new Error('The planner in that file is not readable.');
    const hasDays = !!days;
    const hasPlans = !!plans;
    const hasAff = !!(obj.affirmations || obj.userAffirmations);
    const hasLater = Array.isArray(obj.later) || (obj.affirmations && Array.isArray(obj.affirmations.later));
    if (!hasDays && !hasPlans && !hasAff && !hasLater) throw new Error('That file doesn’t contain TinyStarts data.');
  }

  function backupSummaryText(obj) {
    const keys = backupDayKeys(obj);
    const countLabel = keys.length === 1 ? '1 day' : (keys.length + ' days');
    const range = !keys.length ? 'no dated days' : (keys[0] === keys[keys.length - 1] ? keys[0] : (keys[0] + ' to ' + keys[keys.length - 1]));
    return 'This backup has ' + countLabel + (keys.length ? ' (' + range + ')' : '') + '. Restore it? Your current days are saved in Restore earlier version first. A day that already has entries will not be replaced by an empty one.';
  }

  function mergePlannerImport(local, incoming) {
    if (!incoming) return local;
    if (!local) return incoming;
    const incomingMeta = plannerMeta(incoming);
    const incomingDeleted = !!(incomingMeta && incomingMeta.deleted);
    if (visiblePlannerItems(local).length && !visiblePlannerItems(incoming).length && !incomingDeleted) return local;
    return pickPlanner(local, incoming);
  }

  function mergeImportedData(obj) {
    validateBackupFile(obj);
    const currentDays = getDayMap();
    Object.keys(currentDays).forEach(function (key) {
      if (parseDateKey(key)) rememberDayBackup(key);
    });
    const srcDays = obj.taskDays || obj['task-days'] || {};
    const days = getDayMap();
    Object.keys(srcDays).forEach(function (key) {
      if (!parseDateKey(key)) return;
      const incoming = srcDays[key];
      const local = days[key];
      if (!local) { days[key] = incoming; return; }
      days[key] = mergeDayRecord(local, incoming);
    });
    saveJson('task-days', days);

    const srcPlans = obj.plannerEntries || obj['planner-entries'] || {};
    const plans = getPlannerMap();
    const meta = loadJson('planner-updated', {});
    Object.keys(srcPlans).forEach(function (key) {
      if (!parseDateKey(key)) return;
      plans[key] = mergePlannerImport(plans[key], srcPlans[key]);
      const chosen = plannerMeta(plans[key]);
      if (chosen && chosen.savedAt) meta[key] = chosen.savedAt;
    });
    saveJson('planner-entries', plans);
    saveJson('planner-updated', meta);
    if (obj.tileCompletions && typeof obj.tileCompletions === 'object') saveJson('tile-completions', Object.assign(loadJson('tile-completions', {}), obj.tileCompletions));
    if (obj.tileVisited && typeof obj.tileVisited === 'object') saveJson('tile-visited', Object.assign(loadJson('tile-visited', {}), obj.tileVisited));
    if (obj.supplementCatalog && typeof obj.supplementCatalog === 'object') saveJson('supplement-catalog', obj.supplementCatalog);
    if (obj.theme === 'dark' || obj.theme === 'light') setTheme(obj.theme);

    const incomingAff = obj.affirmations || obj.userAffirmations || {};
    const localAff = getAffirmationStore();
    const incomingItems = Array.isArray(incomingAff.items) ? incomingAff.items : [];
    const keepItems = (!incomingItems.length && (localAff.items || []).length) ? localAff.items : (incomingItems.length ? incomingItems : localAff.items);
    const later = mergeLaterLists(getLaterItems(), obj.later || incomingAff.later);
    persistAffirmationStore({
      items: keepItems || [],
      mixOwn: incomingAff.mixOwn != null ? !!incomingAff.mixOwn : !!localAff.mixOwn,
      savedAt: new Date().toISOString(),
      later: later
    });
  }

  function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const obj = JSON.parse(reader.result);
        validateBackupFile(obj);
        if (!confirm(backupSummaryText(obj))) return;
        mergeImportedData(obj);
        loadDay();
        renderPlanner();
        renderLaterList();
        pushLocalToCloud();
        showToast('Backup restored. Days that already had entries were kept.', 'success', 5000);
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
        const holder = document.createElement('div');
        holder.className = 'all-day-item';
        holder.addEventListener('click', function (ev) { ev.stopPropagation(); });
        holder.appendChild(chip);
        holder.appendChild(makeCalendarActions(key, realIndex, 'allday-cal'));
        cell.appendChild(holder);
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
    block.appendChild(makeCalendarActions(key, index, 'plan-cal'));
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
        const holder = document.createElement('div');
        holder.className = 'month-event-row';
        holder.addEventListener('click', function (e) { e.stopPropagation(); });
        holder.appendChild(ev);
        holder.appendChild(makeCalendarActions(key, realIndex, 'month-cal'));
        cell.appendChild(holder);
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
    renderModalCalendarActions();
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
    renderModalCalendarActions();
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
    if (!confirm('Delete this event?')) return;
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

  function closeCalMenus(except) {
    document.querySelectorAll('.cal-menu').forEach(function (menu) {
      if (except && menu === except) return;
      menu.hidden = true;
      const btn = document.querySelector('[aria-controls="' + menu.id + '"]');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function makeCalendarActions(key, index, idPrefix) {
    const wrap = document.createElement('div');
    wrap.className = 'cal-actions';
    const google = document.createElement('button');
    google.type = 'button';
    google.className = 'icon-btn cal-google';
    google.id = idPrefix + '-google-' + key + '-' + index;
    google.textContent = '📅';
    google.setAttribute('aria-label', 'Add to Google Calendar');
    const more = document.createElement('button');
    more.type = 'button';
    more.className = 'icon-btn cal-more';
    more.id = idPrefix + '-more-' + key + '-' + index;
    more.textContent = '▾';
    more.setAttribute('aria-label', 'More ways to save this event');
    more.setAttribute('aria-haspopup', 'menu');
    more.setAttribute('aria-expanded', 'false');
    const menu = document.createElement('div');
    menu.className = 'cal-menu';
    menu.id = idPrefix + '-menu-' + key + '-' + index;
    menu.hidden = true;
    menu.setAttribute('role', 'menu');
    more.setAttribute('aria-controls', menu.id);
    const ics = document.createElement('button');
    ics.type = 'button';
    ics.className = 'btn secondary';
    ics.id = idPrefix + '-ics-' + key + '-' + index;
    ics.setAttribute('role', 'menuitem');
    ics.textContent = 'Export (.ics)';
    google.addEventListener('click', function () {
      closeCalMenus();
      addToGoogleCalendar(key, index);
    });
    more.addEventListener('click', function () {
      const willOpen = menu.hidden;
      closeCalMenus(willOpen ? menu : null);
      menu.hidden = !willOpen;
      more.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    ics.addEventListener('click', function () {
      closeCalMenus();
      downloadEventIcs(key, index);
    });
    wrap.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    wrap.addEventListener('click', function (e) { e.stopPropagation(); });
    menu.appendChild(ics);
    wrap.appendChild(google);
    wrap.appendChild(more);
    wrap.appendChild(menu);
    return wrap;
  }

  function renderModalCalendarActions() {
    const slot = $('eventCalendarActions');
    if (!slot) return;
    slot.innerHTML = '';
    if (!editingPlanner) {
      slot.hidden = true;
      return;
    }
    slot.hidden = false;
    slot.appendChild(makeCalendarActions(editingPlanner.key, editingPlanner.index, 'modal-cal'));
  }

  function icsEscape(value) {
    return String(value == null ? '' : value)
      .replace(/\\/g, '\\\\')
      .replace(/\r\n|\r|\n/g, '\\n')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,');
  }

  function foldIcsLine(line) {
    const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
    let out = '';
    let octets = 0;
    const chars = Array.from(String(line));
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      const size = encoder ? encoder.encode(ch).length : ch.length;
      if (octets + size > 75) {
        out += '\r\n ';
        octets = 1;
      }
      out += ch;
      octets += size;
    }
    return out;
  }

  function icsStamp(date) {
    const d = date || new Date();
    return d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()) + 'T' +
      pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + pad2(d.getUTCSeconds()) + 'Z';
  }

  function icsClock(value) {
    const t = parseTime(value);
    if (!t) return '090000';
    return pad2(t.h) + pad2(t.m) + '00';
  }

  function nextDateKey(key) {
    const d = parseDateKey(key);
    if (!d) return key;
    d.setDate(d.getDate() + 1);
    return dateKey(d);
  }

  function eventUid(key, item) {
    const basis = [key, item && item.allDay ? 'day' : 'time', (item && item.start) || '', (item && item.end) || '', (item && item.text) || ''].join('|');
    return 'tinystarts-' + hashString(basis).toString(16) + '@tinystarts.app';
  }

  function veventLines(key, item) {
    const summary = icsEscape(((item && item.text) || '').trim() || 'Event');
    const lines = [
      'BEGIN:VEVENT',
      'UID:' + eventUid(key, item),
      'DTSTAMP:' + icsStamp(new Date()),
      'SUMMARY:' + summary,
      'DESCRIPTION:' + icsEscape('From TinyStarts')
    ];
    const allDay = !!(item && (item.allDay || !item.start));
    if (allDay) {
      lines.push('DTSTART;VALUE=DATE:' + key.replace(/-/g, ''));
      lines.push('DTEND;VALUE=DATE:' + nextDateKey(key).replace(/-/g, ''));
    } else {
      const startTime = eventStart(item);
      let endTime = eventEnd(item);
      let endKey = key;
      if (minutesOf(endTime) <= minutesOf(startTime)) endKey = nextDateKey(key);
      lines.push('DTSTART:' + key.replace(/-/g, '') + 'T' + icsClock(startTime));
      lines.push('DTEND:' + endKey.replace(/-/g, '') + 'T' + icsClock(endTime));
    }
    lines.push('END:VEVENT');
    return lines;
  }

  function buildCalendarIcs(entries) {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TinyStarts//Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];
    entries.forEach(function (entry) {
      veventLines(entry.key, entry.item).forEach(function (line) { lines.push(line); });
    });
    lines.push('END:VCALENDAR');
    return lines.map(foldIcsLine).join('\r\n') + '\r\n';
  }

  function downloadEventIcs(key, index) {
    const item = loadPlannerItems(key)[index];
    if (!item) return;
    downloadFile(new File([buildCalendarIcs([{ key: key, item: item }])], 'tinystarts-event-' + key + '.ics', { type: 'text/calendar' }));
    showToast('Calendar file downloaded', 'success');
  }

  async function collectPlannerMap() {
    const plans = getPlannerMap();
    if (currentUser && initSupabase() && (typeof navigator === 'undefined' || navigator.onLine !== false)) {
      try {
        const res = await sb.from('planner_entries').select('date, items').eq('user_id', currentUser.id);
        if (!res.error && res.data) {
          res.data.forEach(function (row) {
            if (!row || !parseDateKey(row.date)) return;
            plans[row.date] = pickPlanner(plans[row.date], row.items);
          });
        }
      } catch (err) {}
    }
    return plans;
  }

  async function downloadCalendarExport() {
    const plans = await collectPlannerMap();
    const entries = [];
    Object.keys(plans).filter(function (key) { return !!parseDateKey(key); }).sort().forEach(function (key) {
      visiblePlannerItems(plans[key]).forEach(function (item) {
        entries.push({ key: key, item: item });
      });
    });
    if (!entries.length) {
      setExportStatus('No calendar entries yet.');
      return;
    }
    setExportStatus('');
    downloadFile(new File(
      [buildCalendarIcs(entries)],
      'tinystarts-calendar-' + todayKey() + '.ics',
      { type: 'text/calendar' }
    ));
    showToast('Calendar downloaded', 'success');
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
    'user-affirmations',
    'supplement-catalog',
    'task-days-backup',
    'later-items'
  ];

  function clearLocalPersonalData() {
    markDayUnloaded();
    Object.keys(lastKnownCloudDays).forEach(function (key) { delete lastKnownCloudDays[key]; });
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
    markDayUnloaded();
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
    markDayUnloaded();
    writeLastActivity(Date.now());
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
    document.documentElement.dataset.gate = 'checking';
    if (client) {
      if (user) {
        try {
          await client.from('audit_log').insert({ user_id: user.id, action: 'logout', details: {} });
        } catch (err) {}
      }
      try { await client.auth.signOut(); } catch (err) {}
    }
    clearSupabaseStorage();
    clearLocalPersonalData();
    try { localStorage.removeItem(ACTIVITY_STORAGE_KEY); } catch (err) {}
    delete memoryStore[ACTIVITY_STORAGE_KEY];
    blankAppDom();
    closeModal('settingsModal');
    closeModal('addItemModal');
    closeModal('winModal');
    updateAccountUI();
    showLogin();
  }

  let sessionExpiring = false;

  function readLastActivity() {
    const parsed = parseInt(safeGet(ACTIVITY_STORAGE_KEY, ''), 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function writeLastActivity(time) {
    safeSet(ACTIVITY_STORAGE_KEY, String(time || Date.now()));
  }

  function activityIsStale() {
    const last = readLastActivity();
    if (!last) return true;
    return Date.now() - last >= SESSION_IDLE_MS;
  }

  function noteActivity() {
    if (document.documentElement.dataset.gate !== 'signed-in') return;
    const now = Date.now();
    const last = readLastActivity();
    if (last && now - last < 15000) return;
    writeLastActivity(now);
  }

  async function clearAppCaches() {
    if (typeof caches === 'undefined' || !caches.keys) return;
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(function (key) {
        return String(key).indexOf('tinystarts-') === 0;
      }).map(function (key) { return caches.delete(key); }));
    } catch (err) {}
  }

  async function expireSession() {
    if (sessionExpiring) return;
    sessionExpiring = true;
    document.documentElement.dataset.gate = 'checking';
    setAuthStatus('Sign in again to open your planner.');
    try { await clearAppCaches(); } catch (err) {}
    try { await signOut(); } catch (err) {}
    setAuthStatus('Sign in again to open your planner.');
    sessionExpiring = false;
  }

  function onSessionVisibility() {
    if (document.visibilityState === 'hidden') {
      if (document.documentElement.dataset.gate === 'signed-in') writeLastActivity(Date.now());
      return;
    }
    if (document.documentElement.dataset.gate !== 'signed-in') return;
    if (activityIsStale()) expireSession();
    else writeLastActivity(Date.now());
  }

  function cloudUpsertDay(key, data, done) {
    if (!currentUser || !initSupabase() || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
      if (done) done(false);
      return;
    }
    sb.from('task_days').upsert({ user_id: currentUser.id, date: key, data: data })
      .then(function (res) {
        if (res.error) {
          console.warn('Cloud day save failed:', res.error.message);
          if (done) done(false);
        } else {
          logAudit('save_day', { date: key });
          if (done) done(true);
        }
      })
      .catch(function (err) {
        console.warn('Cloud day save failed:', err);
        if (done) done(false);
      });
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
          rememberCloudDay(row.date, row.data);
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
        const later = mergeLaterLists(getLaterItems(), remote.later);
        saveJson('user-affirmations', {
          items: Array.isArray(chosen.items) ? chosen.items : [],
          mixOwn: !!chosen.mixOwn,
          savedAt: chosen.savedAt || '',
          later: later
        });
        saveJson('later-items', { items: later, savedAt: chosen.savedAt || '' });
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
      data: {
        items: store.items || [],
        mixOwn: !!store.mixOwn,
        savedAt: store.savedAt || '',
        later: normalizeLaterItems(store.later || getLaterItems())
      },
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
          new Notification('TinyStarts', { body: 'Timer done. What’s the very next small thing?', silent: true });
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
      renderSupplementSettings();
      openModal('settingsModal');
    });
    if ($('accountBtn')) $('accountBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      toggleAccountMenu();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.cal-actions')) closeCalMenus();
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
    if ($('firstStepInput')) $('firstStepInput').addEventListener('input', function () {
      const row = currentTop3Row();
      if (!row) return;
      row.dataset.firstStep = $('firstStepInput').value;
      scheduleSave();
    });
    document.querySelectorAll('.focus-mins').forEach(function (btn) {
      btn.addEventListener('click', function () { startFocusTimer(Number(btn.dataset.mins) || 5); });
    });
    if ($('focusTimerStop')) $('focusTimerStop').addEventListener('click', stopFocusTimer);
    if ($('showMoreToday')) $('showMoreToday').addEventListener('click', toggleShowMore);
    if ($('restoreEarlierBtn')) $('restoreEarlierBtn').addEventListener('click', function () {
      const list = $('restoreEarlierList');
      if (!list) return;
      const open = list.hidden;
      list.hidden = !open;
      $('restoreEarlierBtn').setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    if ($('affirmationUseBtn')) $('affirmationUseBtn').addEventListener('click', useShownAffirmation);
    if ($('myAffirmationAddBtn')) $('myAffirmationAddBtn').addEventListener('click', addOrUpdateMyAffirmation);
    if ($('myAffirmationInput')) $('myAffirmationInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addOrUpdateMyAffirmation();
      }
    });
    if ($('meds-morning')) $('meds-morning').addEventListener('change', scheduleSave);
    if ($('meds-afternoon')) $('meds-afternoon').addEventListener('change', scheduleSave);
    if ($('supplementList')) $('supplementList').addEventListener('change', function (e) {
      if (e.target && e.target.dataset && e.target.dataset.supplement) scheduleSave();
    });
    if ($('addSupplementBtn')) $('addSupplementBtn').addEventListener('click', function () {
      addSupplement($('newSupplementName') && $('newSupplementName').value);
    });
    window.addEventListener('online', retryCloudSave);
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
    $('exportBtn').addEventListener('click', function () { downloadExport(); });
    if ($('exportCalendarBtn')) $('exportCalendarBtn').addEventListener('click', function () { downloadCalendarExport(); });
    initExportShare();
    if ($('exportShareBtn')) $('exportShareBtn').addEventListener('click', function () { shareExport(); });
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
    const todayView = $('todayView');
    if (todayView) {
      let swipeX = null;
      let swipeY = null;
      todayView.addEventListener('touchstart', function (e) {
        if (!e.touches || !e.touches[0]) return;
        const t = e.target;
        if (t && t.closest && t.closest('input, textarea, button, a, select, label')) return;
        swipeX = e.touches[0].clientX;
        swipeY = e.touches[0].clientY;
      }, { passive: true });
      todayView.addEventListener('touchend', function (e) {
        if (swipeX == null || !e.changedTouches || !e.changedTouches[0]) return;
        const dx = e.changedTouches[0].clientX - swipeX;
        const dy = e.changedTouches[0].clientY - swipeY;
        swipeX = null;
        swipeY = null;
        if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy)) return;
        const base = parseDateKey(activeKey()) || new Date();
        base.setDate(base.getDate() + (dx < 0 ? 1 : -1));
        openDay(dateKey(base), true);
      }, { passive: true });
    }
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
      if (document.visibilityState === 'hidden') flushSave();
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
      markDayUnloaded();
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

  function appIsInstalled() {
    try {
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
      if (window.navigator && window.navigator.standalone) return true;
    } catch (err) {}
    return false;
  }

  let installPromptEvent = null;

  function updateInstallUI() {
    const btn = $('installAppBtn');
    const help = $('installHelp');
    const settingsHelp = $('installHelpSettings');
    const installed = appIsInstalled();
    if (btn) btn.hidden = installed;
    if (installed) {
      if (help) help.hidden = true;
      if (settingsHelp) settingsHelp.hidden = true;
    }
  }

  function initInstall() {
    updateInstallUI();
    window.addEventListener('beforeinstallprompt', function (event) {
      event.preventDefault();
      installPromptEvent = event;
      updateInstallUI();
      if ($('installHelp')) $('installHelp').hidden = true;
    });
    window.addEventListener('appinstalled', function () {
      installPromptEvent = null;
      updateInstallUI();
    });
    if ($('installAppBtn')) $('installAppBtn').addEventListener('click', function () {
      if (!installPromptEvent) {
        if ($('installHelp')) $('installHelp').hidden = false;
        return;
      }
      const promptEvent = installPromptEvent;
      installPromptEvent = null;
      promptEvent.prompt();
      const choice = promptEvent.userChoice;
      if (choice && choice.then) {
        choice.then(function () { updateInstallUI(); }).catch(function () { updateInstallUI(); });
      }
    });
    if (!appIsInstalled() && !installPromptEvent && $('installHelp')) $('installHelp').hidden = false;
  }

  function start() {
    initTheme();
    initInstall();
    document.body.dataset.view = 'today';
    document.documentElement.dataset.gate = 'checking';
    ['click', 'keydown', 'touchstart'].forEach(function (type) {
      document.addEventListener(type, noteActivity, true);
    });
    document.addEventListener('visibilitychange', onSessionVisibility);
    setInterval(function () {
      if (document.documentElement.dataset.gate !== 'signed-in') return;
      if (activityIsStale()) expireSession();
    }, 15000);
    if ($('authForm')) $('authForm').addEventListener('submit', function (e) {
      e.preventDefault();
      signIn();
    });
    resolveSession().then(function (user) {
      if (sb) watchAuth();
      if (user && activityIsStale()) return expireSession();
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
    navigator.serviceWorker.register('sw.js?v=16').catch(function (err) {
      console.warn('Service worker not registered:', err);
    });
  });
}
