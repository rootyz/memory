/* Focus Recall 1.0 — pure, dependency-free learning and scoring logic. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FocusCore = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const M = typeof module === 'object' && module.exports ? require('./mnemonic-core.js') : globalThis.FocusMnemonics;
  const DAY = 86400000;
  const INTERVALS = [DAY, 3 * DAY, 7 * DAY, 14 * DAY, 30 * DAY];
  const SCHEMA = 1;
  const safeId = v => typeof v === 'string' && /^(?:seed|user|run|try)-[a-zA-Z0-9_-]{1,90}$/.test(v);
  const clamp = (x, a, b) => Math.min(b, Math.max(a, Number(x) || 0));
  const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function uid(prefix = 'user') {
    const random = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    return prefix + '-' + random;
  }
  function tokens(text) {
    return String(text || '').normalize('NFKC').toLowerCase().replace(/[\u2018\u2019]/g, "'").match(/[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu) || [];
  }
  function compareWords(expected, actual) {
    const a = tokens(expected).slice(0, 250), b = tokens(actual).slice(0, 500);
    const d = Array.from({length: a.length + 1}, () => new Uint16Array(b.length + 1));
    for (let i = 0; i <= a.length; i++) d[i][0] = i;
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + (a[i-1] === b[j-1] ? 0 : 1));
    }
    let i = a.length, j = b.length;
    const ops = [];
    while (i || j) {
      if (i && j && a[i-1] === b[j-1] && d[i][j] === d[i-1][j-1]) { ops.push({type:'same', text:a[--i]}); j--; }
      else if (i && j && d[i][j] === d[i-1][j-1] + 1) { ops.push({type:'replace', expected:a[--i], actual:b[--j]}); }
      else if (i && d[i][j] === d[i-1][j] + 1) ops.push({type:'missing', text:a[--i]});
      else ops.push({type:'extra', text:b[--j]});
    }
    const distance = d[a.length][b.length];
    return {score: Math.max(0, 1 - distance / Math.max(a.length, b.length, 1)), exact: distance === 0 && a.length > 0, distance, ops:ops.reverse(), expectedWords:a.length, actualWords:b.length};
  }
  function mean(values) { return values.length ? values.reduce((s,x) => s + x, 0) / values.length : null; }
  function newState() {
    return {schemaVersion:SCHEMA, settings:{points:3, readingView:'all', largeText:false}, custom:[], progress:{}, records:[], session:null, completedSessions:0, memory:M.blank()};
  }
  function localDay(ms = Date.now()) {
    const d = new Date(ms);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function schedule(previous, score, lagMs, now = Date.now()) {
    const old = previous || {stage:0, reps:0};
    const stageBefore = clamp(old.stage, 0, 4);
    let stage = stageBefore, interval;
    if (score < 0.5) { stage = 0; interval = 10 * 60000; }
    else if (score < 0.85) { stage = 0; interval = DAY; }
    else {
      // Only a genuinely delayed, due review can lengthen the interval.
      if (old.reps > 0 && lagMs >= DAY && now >= (old.due || 0)) stage = Math.min(4, stageBefore + 1);
      interval = INTERVALS[stage];
    }
    // An optional early success must not keep pushing an existing due date back.
    const due = score >= 0.85 && old.due > now ? old.due : now + interval;
    return {...old, stage, reps:(old.reps || 0)+1, due, lastExposedAt:now, lastReviewed:now};
  }
  function planSession(state, decks, {size=4, kind='practice', preferred=null, now=Date.now()} = {}) {
    if (size !== 2 && size !== 4) throw new Error('Sessions contain two or four rounds.');
    const all = decks.concat(state.custom);
    const byId = new Map(all.map(c => [c.id,c]));
    const used = new Set(), queue = [];
    const firstMode = state.completedSessions % 2 ? 'wording' : 'meaning';
    const otherMode = firstMode === 'meaning' ? 'wording' : 'meaning';
    const modes = Array.from({length:size}, (_,i) => i % 2 ? otherMode : firstMode);
    let preferredMode = null;
    if (preferred && byId.has(preferred)) preferredMode = state.progress[preferred]?.mode || byId.get(preferred).preferredMode || firstMode;
    for (const mode of modes) {
      let card, phase = 'new';
      const available = c => !used.has(c.id) && (!state.progress[c.id] || state.progress[c.id].mode === mode) && (!c.preferredMode || c.preferredMode === mode || state.progress[c.id]);
      if (preferred && preferredMode === mode && !used.has(preferred)) card = byId.get(preferred);
      if (!card && kind !== 'fresh') {
        card = all.filter(c => available(c) && state.progress[c.id]?.reps > 0 && state.progress[c.id].due <= now)
          .sort((a,b) => state.progress[a.id].due - state.progress[b.id].due)[0];
      }
      if (!card) {
        const unused = all.filter(c => available(c) && !state.progress[c.id] && (kind !== 'fresh' || !c.custom));
        // Favor personally added text, otherwise rotate through the original seed library.
        card = unused.find(c => c.custom) || unused[0];
      }
      if (!card && kind !== 'fresh') {
        card = all.filter(available).sort((a,b) => (state.progress[a.id]?.due || 0) - (state.progress[b.id]?.due || 0))[0];
      }
      if (!card) throw new Error(kind === 'fresh' ? 'No unused built-in passages remain for a fresh check. Add your own unfamiliar text for further practice.' : 'Not enough passages for a balanced session. Add a new passage and try again.');
      const p = state.progress[card.id];
      if (kind === 'fresh') phase = 'fresh';
      else if (p?.reps > 0) phase = p.due <= now ? 'review' : 'early';
      else if (p || card.custom) phase = 'familiar';
      const count = p?.count || (card.custom ? card.points.length : Math.min(card.points.length, kind === 'fresh' ? 3 : state.settings.points));
      queue.push({id:card.id, mode, count, phase}); used.add(card.id);
    }
    return {id:uid('run'), kind, createdAt:now, queue, index:0, stage:'prepare', results:[], current:null, paused:false};
  }
  function levelAdvice(records, count) {
    const strong = ['meaning','wording'].every(mode => {
      const last = records.filter(r => r.mode === mode && r.count === count && r.lagMs >= DAY && !r.interrupted).slice(-3);
      return last.length === 3 && last.every(r => r.score >= 0.85);
    });
    return strong && count < 4 ? count + 1 : null;
  }
  function validateBackup(input, seedIds = []) {
    if (!input || input.schemaVersion !== SCHEMA || !Array.isArray(input.custom) || !Array.isArray(input.records) || !input.progress || typeof input.progress !== 'object' || Array.isArray(input.progress)) throw new Error('This is not a supported Focus Recall backup.');
    if (input.custom.length > 120 || input.records.length > 1500) throw new Error('Backup exceeds the supported size.');
    const out = newState();
    const s = input.settings || {};
    out.settings = {points:[2,3,4].includes(s.points) ? s.points : 3, readingView:s.readingView === 'spotlight' ? 'spotlight' : 'all', largeText:s.largeText === true};
    const ids = new Set(seedIds);
    const text = (v,n) => typeof v === 'string' && v.length <= n;
    for (const c of input.custom) {
      if (!safeId(c.id) || !c.id.startsWith('user-') || ids.has(c.id) || !text(c.title,80) || !c.title.trim() || !Array.isArray(c.points) || c.points.length < 2 || c.points.length > 4 || !c.points.every(p => text(p,300) && p.trim())) throw new Error('A passage in this backup is invalid.');
      ids.add(c.id);
      out.custom.push({id:c.id, title:c.title, points:c.points.slice(), sourceText:text(c.sourceText,6000)?c.sourceText:'', custom:true, createdAt:clamp(c.createdAt,0,1e14), preferredMode:['meaning','wording'].includes(c.preferredMode) ? c.preferredMode : null});
    }
    for (const [id,p] of Object.entries(input.progress)) {
      if (!safeId(id) || !ids.has(id)) continue;
      if (!p || !['meaning','wording'].includes(p.mode) || ![2,3,4].includes(p.count) || !Number.isFinite(p.due) || !Number.isFinite(p.lastExposedAt)) throw new Error('Review dates or learning tracks in this backup are invalid.');
      const card = out.custom.find(c => c.id === id);
      if (card && p.count > card.points.length) throw new Error('A saved passage has too few target points.');
      out.progress[id] = {mode:p.mode, count:p.count, due:clamp(p.due,0,1e14), lastExposedAt:clamp(p.lastExposedAt,0,1e14), lastReviewed:clamp(p.lastReviewed,0,1e14), stage:Math.trunc(clamp(p.stage,0,4)), reps:Math.trunc(clamp(p.reps,0,1e6)), createdAt:clamp(p.createdAt,0,1e14)};
    }
    for (const r of input.records) {
      if (!r || !safeId(r.id) || !safeId(r.cardId) || !text(r.title,80) || !['meaning','wording'].includes(r.mode) || !['new','fresh','review','early','familiar'].includes(r.phase) || !Number.isFinite(r.at) || !Number.isFinite(r.score) || r.score < 0 || r.score > 1 || ![2,3,4].includes(r.count)) throw new Error('A practice result in this backup is invalid.');
      if (!Array.isArray(r.original) || r.original.length > 4 || !r.original.every(x => text(x,2000))) throw new Error('An answer in this backup is invalid.');
      const prompted = Array.isArray(r.prompted) && r.prompted.length <= 4 && r.prompted.every(x => text(x,2000)) ? r.prompted.slice() : null;
      out.records.push({id:r.id, cardId:r.cardId, title:r.title, mode:r.mode, phase:r.phase, count:r.count, at:r.at, score:r.score, lagMs:clamp(r.lagMs,0,1e14), studyMs:clamp(r.studyMs,0,1e10), original:r.original.slice(), prompted, hintUsed:r.hintUsed === true, drifts:Math.trunc(clamp(r.drifts,0,10000)), interrupted:r.interrupted === true, attention:['steady','some','often'].includes(r.attention) ? r.attention : '', exactCount:Math.trunc(clamp(r.exactCount,0,4)), perPoint:Array.isArray(r.perPoint) ? r.perPoint.slice(0,4).map(x => clamp(x,0,1)) : [], custom:r.custom === true});
    }
    out.memory = M.validate(input.memory);
    out.completedSessions = Math.trunc(clamp(input.completedSessions,0,1e6));
    // Imported unfinished rounds are intentionally not resumed: source exposure cannot be reconstructed reliably.
    out.session = null;
    return out;
  }
  return {DAY, INTERVALS, SCHEMA, uid, esc, tokens, compareWords, mean, newState, localDay, schedule, planSession, levelAdvice, validateBackup, safeId};
}));
