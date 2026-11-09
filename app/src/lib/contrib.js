// GitHub contribution calendar: [[date, count], ...] from the bundled snapshot, or from CONTRIB_URL when one is set.
import SNAPSHOT from '../data/github-contributions.json';

export { SNAPSHOT };

// Placeholder activity for the empty months before April 2026, at Aiden's request, so the grid
// doesn't open on half a year of blanks. The filler replays the real weeks from May 2026 on, shuffled
// in three-week blocks so busy and quiet spells stay together, which keeps both halves of the grid
// reading the same. It only touches days before FILLER_END, so it fades out on its own as the window
// moves; remove it once the window starts at FILLER_END (March 2027).
const FILLER_END = '2026-04-01', SOURCE_FROM = '2026-05-01';
const dow = d => new Date(d + 'T00:00:00Z').getUTCDay();

function withFiller(days) {
  let s = 2026;
  const rnd = () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const weeks = [];
  days.filter(([d]) => d >= SOURCE_FROM).forEach(([d, c]) => {
    if (dow(d) === 0 || !weeks.length) weeks.push([]);
    weeks[weeks.length - 1][dow(d)] = c;
  });
  const full = weeks.filter(w => w.filter(v => v !== undefined).length === 7);
  if (!full.length) return days;
  const blocks = [];
  for (let i = 0; i < full.length; i += 3) blocks.push(full.slice(i, i + 3));
  for (let i = blocks.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [blocks[i], blocks[j]] = [blocks[j], blocks[i]]; }
  const pool = blocks.flat();
  let wi = -1;
  return days.map(([d, c]) => {
    if (dow(d) === 0 || wi < 0) wi++;
    if (d >= FILLER_END) return [d, c];
    return [d, Math.max(c, pool[wi % pool.length][dow(d)])];
  });
}

// The last seven days, and the resting heart rate they set: 60 bpm + 1 per 10 contributions, capped at 110.
export function weekTotal(real) {
  return real.slice(-7).reduce((a, d) => a + d[1], 0);
}
export function restBpm(real) {
  return Math.min(110, 60 + Math.round(weekTotal(real) / 10));
}

// A loose check on live data, so a bad response never replaces the snapshot.
export function isCalendar(v) {
  return Array.isArray(v) && v.length > 300 && v.every(d => Array.isArray(d) && /^\d{4}-\d{2}-\d{2}$/.test(d[0]) && Number.isFinite(d[1]));
}

const fmtDay = s => new Date(s + 'T00:00:00Z').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const monthOf = s => new Date(s + 'T00:00:00Z').toLocaleDateString('en-CA', { month: 'short', timeZone: 'UTC' });
const monthLong = s => new Date(s + 'T00:00:00Z').toLocaleDateString('en-CA', { month: 'long', timeZone: 'UTC' });

// The 1st of the month 11 months before `end` (YYYY-MM-DD): the grid shows that month through `end`,
// twelve calendar months in all, so no month appears at both ends.
export function windowStart(end) {
  const months = Number(end.slice(0, 4)) * 12 + Number(end.slice(5, 7)) - 1 - 11;
  return `${Math.floor(months / 12)}-${String(months % 12 + 1).padStart(2, '0')}-01`;
}

// Weeks x 7 cells, month labels and the caption for the window ending on the last day of data.
// Levels and the caption use the real days in the window only, so the filler never shifts the scale.
// The filler runs on the full data and is trimmed afterwards, so its pattern doesn't reshuffle each month.
export function buildCalendar(real) {
  const from = windowStart(real[real.length - 1][0]);
  const inWindow = ([d]) => d >= from;
  const visible = real.filter(inWindow);
  const total = visible.reduce((a, b) => a + b[1], 0);
  const nz = visible.map(d => d[1]).filter(Boolean).sort((a, b) => a - b);
  const q = p => nz[Math.min(nz.length - 1, Math.floor(nz.length * p))] || 0;
  const cuts = [q(0.25), q(0.5), q(0.75)];
  const level = c => !c ? 0 : c <= cuts[0] ? 1 : c <= cuts[1] ? 2 : c <= cuts[2] ? 3 : 4;
  const days = withFiller(real).filter(inWindow);
  const cells = Array(dow(days[0][0])).fill(null).concat(days.map(([date, count]) => ({ date, count, level: level(count), label: `${count} contribution${count === 1 ? '' : 's'} on ${fmtDay(date)}` })));
  const weeks = Math.ceil(cells.length / 7);
  const months = [];
  for (let w = 0; w < weeks; w++) {
    const d = cells[w * 7] || cells[w * 7 + 6];
    if (!d) continue;
    const m = monthOf(d.date);
    if (!months.length || months[months.length - 1].m !== m) months.push({ m, w });
  }
  // drop a label that would crowd the next one
  // and flag one too close to the right edge to fit, so it can align to the end of the grid
  const shown = months.filter((x, i) => !(months[i + 1] && months[i + 1].w - x.w < 3)).map(x => ({ ...x, end: x.w >= weeks - 2 }));
  const byMonth = {};
  visible.forEach(([d, c]) => { const k = d.slice(0, 7); byMonth[k] = (byMonth[k] || 0) + c; });
  const busiest = Object.entries(byMonth).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => monthLong(k + '-01'));
  const n = total.toLocaleString('en-CA');
  const span = [fmtDay(visible[0][0]), fmtDay(visible[visible.length - 1][0])];
  return {
    weeks, cells, months: shown, total,
    caption: `${n} contributions, ${span[0]} – ${span[1]}.`,
    aria: `${n} GitHub contributions from ${span[0]} to ${span[1]}${busiest.length > 1 ? `, busiest in ${busiest[0]} and ${busiest[1]}` : ''}.`,
  };
}
