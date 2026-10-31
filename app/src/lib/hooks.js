import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SNAPSHOT, isCalendar } from './contrib.js';
import { canSlide, slide } from './motion.js';
import { CONTRIB_URL } from '../config.js';

// The bundled snapshot first, then the live calendar from the Lambda when it answers. A failed or odd
// response keeps the snapshot, so the grid and the heart rate always have data.
export function useContributions(url = CONTRIB_URL) {
  const [days, setDays] = useState(SNAPSHOT);
  useEffect(() => {
    if (!url) return undefined;
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 8000);
    fetch(url, { signal: ac.signal })
      .then(r => r.ok ? r.json() : null)
      .then(v => { if (isCalendar(v)) setDays(v); })
      .catch(() => { /* keep the snapshot */ })
      .finally(() => clearTimeout(timer));
    return () => { clearTimeout(timer); ac.abort(); };
  }, [url]);
  return days;
}

const THEME_KEY = 'theme';
const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
const stored = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };

// The viewer's pick if they made one, else the system setting. index.html applies a stored pick before
// first paint, so there is no flash.
export function useTheme() {
  const [theme, setTheme] = useState(() => stored() || (systemDark() ? 'dark' : 'light'));
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (!stored()) setTheme(systemDark() ? 'dark' : 'light'); };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked */ }
    setTheme(next);
  };
  return [theme, toggle];
}

// Shows and hides a block (Show more, the phone menu) with the page's slide instead of the hidden attribute
// snapping it. The block itself carries no hidden prop; this sets it, before first paint. keep: an element
// to hold still on screen while the block closes above it.
export function useSlide(ref, open, keep) {
  const was = useRef(null); // the last state applied, so a re-run with the same value (StrictMode) does nothing
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || was.current === open) return;
    const first = was.current === null;
    was.current = open;
    if (first || !canSlide(el)) { el.hidden = !open; return; }
    slide(el, open, { show: () => { el.hidden = false; }, hide: () => { el.hidden = true; }, keep: keep?.current });
  }, [open]);
}

// Width of an element in CSS pixels, for the live dimension labels.
export function useWidth(ref) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => setW(Math.round(el.getBoundingClientRect().width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}
