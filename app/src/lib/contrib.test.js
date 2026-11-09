import { describe, expect, it } from 'vitest';
import { buildCalendar, windowStart } from './contrib.js';

const DAY = 86400000;
const iso = t => new Date(t).toISOString().slice(0, 10);
const utc = s => Date.parse(s + 'T00:00:00Z');

// One [date, count] per day from `from` through `to`.
function range(from, to, count = () => 1) {
  const out = [];
  for (let t = utc(from); t <= utc(to); t += DAY) out.push([iso(t), count(iso(t))]);
  return out;
}

const realCells = cal => cal.cells.filter(Boolean);

describe('windowStart', () => {
  it('goes back to the 1st of the month 11 months before a mid-month date', () => {
    expect(windowStart('2026-11-08')).toBe('2025-12-01');
  });

  it('gives the same start on the 1st of a month', () => {
    expect(windowStart('2026-11-01')).toBe('2025-12-01');
  });

  it('crosses the year boundary from a January date', () => {
    expect(windowStart('2027-01-15')).toBe('2026-02-01');
  });

  it('stays in the same year for a December date', () => {
    expect(windowStart('2026-12-31')).toBe('2026-01-01');
  });
});

describe('buildCalendar', () => {
  const rollingYear = range('2025-11-02', '2026-11-08');

  it('starts at the 1st of the window and ends on the last day of data', () => {
    const cells = realCells(buildCalendar(rollingYear));
    expect(cells[0].date).toBe('2025-12-01');
    expect(cells[cells.length - 1].date).toBe('2026-11-08');
  });

  it('blanks the days before the 1st in the first column', () => {
    // Dec 1, 2025 is a Monday, so only Sunday is blank
    const { cells } = buildCalendar(rollingYear);
    expect(cells[0]).toBeNull();
    expect(cells[1].date).toBe('2025-12-01');
  });

  it('computes the caption from the days in the window', () => {
    expect(buildCalendar(rollingYear).caption).toBe('343 contributions, Dec 1, 2025 – Nov 8, 2026.');
  });

  it('leaves the placeholder activity out of the total', () => {
    const data = range('2025-11-02', '2026-11-08', d => (d >= '2026-04-01' ? 2 : 0));
    const cal = buildCalendar(data);
    expect(cal.total).toBe(444);
    expect(realCells(cal).find(c => c.date === '2025-12-07').count).toBeGreaterThan(0);
  });

  it('describes the window in the aria text', () => {
    const { aria } = buildCalendar(rollingYear);
    expect(aria).toContain('Dec 1, 2025');
    expect(aria).toContain('Nov 8, 2026');
    expect(aria).not.toContain('last year');
  });

  it('does not change the array it is given', () => {
    const data = range('2025-11-02', '2026-11-08');
    buildCalendar(data);
    expect(data).toEqual(range('2025-11-02', '2026-11-08'));
  });

  it('marks a month label on the last column so it can stay inside the grid', () => {
    // Nov 1, 2026 is a Sunday: the Nov label lands on the very last column
    const cal = buildCalendar(range('2025-11-02', '2026-11-01'));
    const last = cal.months[cal.months.length - 1];
    expect(last).toMatchObject({ m: 'Nov', w: cal.weeks - 1, end: true });
    expect(cal.months.filter(x => x.end)).toHaveLength(1);
  });

  describe('across every month of three years', () => {
    const ends = [];
    for (let y = 2026; y <= 2028; y++) {
      for (let m = 0; m < 12; m++) {
        ends.push(iso(Date.UTC(y, m, 1)), iso(Date.UTC(y, m, 15)), iso(Date.UTC(y, m + 1, 0)));
      }
    }
    const cals = ends.map(end => [end, buildCalendar(range(iso(utc(windowStart(end)) - 14 * DAY), end))]);

    it.each(cals)('labels each month once, from the first column, on %s', (end, cal) => {
      const names = cal.months.map(x => x.m);
      expect(new Set(names).size).toBe(names.length);
      expect(cal.months[0].w).toBe(0);
      expect(names.length).toBeGreaterThanOrEqual(11);
    });

    it.each(cals)('keeps labels at least three columns apart on %s', (end, cal) => {
      cal.months.slice(1).forEach((x, i) => expect(x.w - cal.months[i].w).toBeGreaterThanOrEqual(3));
    });

    it.each(cals)('stays between 48 and 54 columns on %s', (end, cal) => {
      expect(cal.weeks).toBeGreaterThanOrEqual(48);
      expect(cal.weeks).toBeLessThanOrEqual(54);
    });
  });
});
