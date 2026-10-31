// The footer's heart monitor: an ECG trace swept across a canvas, one beat per heartbeat at the hero heart's rate.
// A pen moves left to right and wipes a short gap ahead of itself, like a ward monitor; flatten() sends it to a flat
// line. Under reduced motion the strip is drawn once, still. It only runs while it's on screen.
// mountEcg(canvas, { bpm, flat }) -> { setBpm(bpm), flatten(on), destroy() }
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SPEED = 110; // css px per second
const GAP = 14; // css px wiped ahead of the pen
const STEP = 0.5; // css px between samples, fine enough to catch the R spike
const bump = (t, c, w) => Math.exp(-((t - c) * (t - c)) / (w * w));

// One heartbeat, t seconds after it starts: a small P wave, a sharp QRS, then T. Up is positive and R peaks at 1.
// A fast heart squeezes the beat so the T wave still ends before the next one.
function wave(t, period) {
  t /= Math.min(1, period / 0.75);
  return 0.12 * bump(t, 0.12, 0.035) - 0.12 * bump(t, 0.215, 0.008) + bump(t, 0.235, 0.01) - 0.28 * bump(t, 0.255, 0.009) + 0.22 * bump(t, 0.45, 0.06);
}

export function mountEcg(cv, opts = {}) {
  const o = Object.assign({ bpm: 72, flat: false }, opts);
  const ctx = cv.getContext('2d');
  if (!ctx) return { setBpm() {}, flatten() {}, destroy() {} };
  let W = 1, H = 1, d = 1, x = 0, beat = 0, prev = null, raf = 0, last = 0, visible = false, dead = false, color = '#e8361c';

  const period = () => 60 / Math.max(1, o.bpm);
  const level = () => (o.flat ? 0 : wave(beat, period()));
  const yOf = v => H * 0.66 - v * H * 0.56;
  const advance = dt => { beat += dt; if (beat >= period()) beat %= period(); };
  const pen = () => { ctx.strokeStyle = color; ctx.lineWidth = 1.5 * d; ctx.lineCap = ctx.lineJoin = 'round'; };

  // reduced motion: the whole strip at once, no pen
  function still() {
    ctx.clearRect(0, 0, W, H); pen(); ctx.beginPath(); beat = 0;
    for (let px = 0; px <= W; px += STEP * d) { const y = yOf(level()); if (px) ctx.lineTo(px, y); else ctx.moveTo(px, y); advance(STEP / SPEED); }
    ctx.stroke();
  }
  function frame(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    const n = Math.max(1, Math.ceil(SPEED * dt / STEP));
    pen();
    for (let i = 0; i < n; i++) {
      advance(dt / n); x += SPEED * d * dt / n;
      if (x >= W) { x -= W; prev = null; }
      const gap = x + 1 + GAP * d;
      ctx.clearRect(x + 1, 0, GAP * d, H);
      if (gap > W) ctx.clearRect(0, 0, gap - W, H);
      const p = [x, yOf(level())];
      if (prev) { ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
      prev = p;
    }
    go();
  }
  function go() {
    if (raf || dead || !visible || reduced()) return;
    if (!last || performance.now() - last > 100) last = performance.now(); // back on screen: don't jump
    raf = requestAnimationFrame(frame);
  }
  function size() {
    const r = cv.getBoundingClientRect(); d = Math.min(2, window.devicePixelRatio || 1);
    W = cv.width = Math.max(1, Math.round(r.width * d)); H = cv.height = Math.max(1, Math.round(r.height * d));
    x = 0; prev = null;
    if (reduced()) still();
  }
  // a theme change restarts the sweep in the new colour
  const readCol = () => {
    color = getComputedStyle(cv).getPropertyValue('--heart').trim() || color;
    ctx.clearRect(0, 0, W, H); prev = null;
    if (reduced()) still();
  };

  const ro = new ResizeObserver(size); ro.observe(cv);
  const io = new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; go(); }); io.observe(cv);
  const mo = new MutationObserver(readCol); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const mq = window.matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener?.('change', readCol);
  size(); readCol();

  return {
    setBpm(bpm) { o.bpm = bpm; if (reduced()) still(); },
    flatten(on) { o.flat = on; if (reduced()) still(); },
    destroy() {
      dead = true; if (raf) cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); mo.disconnect(); mq.removeEventListener?.('change', readCol);
    },
  };
}
