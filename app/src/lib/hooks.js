import { useEffect, useState } from 'react';
import { SNAPSHOT, isCalendar } from './contrib.js';
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
