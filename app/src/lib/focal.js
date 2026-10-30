// The hero heart: the site's low-poly heart.svg as a real 3D solid, drawn on a canvas 2D (no library, no WebGL).
// heart-mesh.json is rebuilt from the SVG's outline and shard corners (see mocks/src/heart-mesh.cjs in the
// InProgress resources); this extrudes it, then each frame rotates, culls back faces, sorts far to near, shades
// every facet from the light and inks the inset shard outlines the site heart is drawn with.
// Motion: idle sway, a turn toward the pointer, drag to spin with inertia, press to squash and beat, and a heart
// rate that rises when pressed and settles back to its resting rate.
// mountHeart(el, { bpm, label, onBpm }) -> { press(), flatten(on), setRest(bpm), destroy() }
import HEART_MESH from '../data/heart-mesh.json';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const pulse = (x, c, w) => Math.exp(-((x - c) * (x - c)) / (w * w));
const wrap = a => Math.atan2(Math.sin(a), Math.cos(a));
const hex = s => {
  s = (s || '').trim();
  if (s[0] === '#') {
    if (s.length === 4) s = '#' + [...s.slice(1)].map(c => c + c).join('');
    return [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16) / 255);
  }
  const m = s.match(/[\d.]+/g);
  return m ? m.slice(0, 3).map(v => v / 255) : [0.9, 0.2, 0.1];
};

// the press sound is synthesized: a low two-part thump
let audio = null;
function thump() {
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const t = audio.currentTime;
    [[0, 82, 0.32], [0.17, 70, 0.2]].forEach(([d, f, v]) => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f, t + d);
      o.frequency.exponentialRampToValueAtTime(40, t + d + 0.16);
      g.gain.setValueAtTime(0.0001, t + d);
      g.gain.exponentialRampToValueAtTime(v, t + d + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.2);
      o.connect(g).connect(audio.destination);
      o.start(t + d);
      o.stop(t + d + 0.22);
    });
  } catch (e) { /* no audio */ }
}

const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const nrm3 = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };

// The solid: the mesh's front relief (thicker toward the middle), a mirrored back, and side walls along the outline.
// Faces are counter-clockwise seen from outside; y up, z toward the viewer.
const HEART = (() => {
  const { V, T, N } = HEART_MESH, T0 = 0.15, B = 0.3, n = V.length;
  const verts = V.map(([x, y, d]) => [x, y, T0 + B * Math.sqrt(d)]).concat(V.map(([x, y, d]) => [x, y, -(T0 + B * Math.sqrt(d))]));
  const faces = [];
  T.forEach(t => {
    faces.push({ v: t, shard: true });
    faces.push({ v: [t[0] + n, t[2] + n, t[1] + n], shard: true });
  });
  let area = 0;
  for (let i = 0; i < N; i++) { const a = V[i], b = V[(i + 1) % N]; area += a[0] * b[1] - b[0] * a[1]; }
  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N;
    faces.push({ v: area > 0 ? [i, i + n, j + n, j] : [i, j, j + n, i + n], shard: false });
  }
  return { V: verts, F: faces };
})();
export const FACETS = HEART_MESH.T.length;

const POSE = [-0.45, 0.16], SWAY = 0.32, SPEC = 0.28;

function heartView(cv) {
  const ctx = cv.getContext('2d');
  if (!ctx) return null;
  const rgb = c => `rgb(${c.map(v => Math.round(clamp(v, 0, 1) * 255)).join(',')})`;
  return (st, col) => {
    const { V, F } = HEART;
    const W = cv.width, H = cv.height, lw = Math.max(1, W / (cv.clientWidth || W));
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W * 0.4, H * 0.43), cx = W / 2, cy = H / 2, f = 4.5;
    const cyw = Math.cos(st.yaw), syw = Math.sin(st.yaw), cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
    const tf = ([x, y, z]) => {
      x *= st.sx; y *= st.sy; z *= st.sz;
      const x2 = x * cyw + z * syw, z2 = -x * syw + z * cyw, y3 = y * cp - z2 * sp, z3 = y * sp + z2 * cp, k = f / (f - z3);
      return [x2, y3, z3, cx + x2 * S * k, cy - y3 * S * k];
    };
    const P = V.map(tf), L = st.light, list = [];
    for (const fc of F) {
      const p = fc.v.map(i => P[i]);
      if ((p[1][3] - p[0][3]) * (p[0][4] - p[2][4]) - (p[0][4] - p[1][4]) * (p[2][3] - p[0][3]) <= 0) continue;
      const n = nrm3(cross3(sub3(p[1], p[0]), sub3(p[2], p[0])));
      list.push({ p, n, z: p.reduce((s, q) => s + q[2], 0) / p.length, fc });
    }
    list.sort((x, y) => x.z - y.z);
    const hl = Math.hypot(L[0], L[1], L[2] + 1), H3 = [L[0] / hl, L[1] / hl, (L[2] + 1) / hl];
    const shade = (lit, spec) => col.base.map((v, i) => {
      v += (col.grey[i] - v) * st.flat;
      v = lit <= 1 ? v * lit : v + (1 - v) * (lit - 1) * 0.9;
      return v + spec;
    });
    const path = pts => { ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(q[3], q[4]) : ctx.moveTo(q[3], q[4])); ctx.closePath(); };
    ctx.lineJoin = 'round';
    for (const { p, n, fc } of list) {
      const ndl = Math.max(0, dot3(n, L));
      const spec = Math.pow(Math.max(0, dot3(n, H3)), 28) * SPEC * (1 - st.flat);
      const fill = rgb(shade(0.34 + 0.8 * ndl, spec));
      path(p); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = fill; ctx.lineWidth = 0.8 * lw; ctx.stroke();
      if (fc.shard) {
        const gx = p.reduce((s, q) => s + q[3], 0) / 3, gy = p.reduce((s, q) => s + q[4], 0) / 3, k = 0.14;
        path(p.map(q => [0, 0, 0, q[3] + (gx - q[3]) * k, q[4] + (gy - q[4]) * k]));
      } else path(p);
      ctx.strokeStyle = col.edge; ctx.lineWidth = 1.1 * lw; ctx.stroke();
    }
  };
}

export function mountHeart(el, opts = {}) {
  const o = Object.assign({ bpm: 72, label: 'Press the heart', sound: true, onBpm: null }, opts);
  el.innerHTML = '';
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'focal-btn'; btn.setAttribute('aria-label', o.label + '. Drag to turn it.');
  const cv = document.createElement('canvas'); cv.className = 'focal-cv'; cv.setAttribute('aria-hidden', 'true');
  btn.append(cv); el.append(btn);
  const draw = heartView(cv);
  if (!draw) return { press() {}, flatten() {}, setRest() {}, destroy() { el.innerHTML = ''; } };

  let col;
  const readCol = () => {
    const cs = getComputedStyle(el), tok = (k, d) => cs.getPropertyValue(k).trim() || d;
    col = { base: hex(tok('--heart', '#e8361c')), edge: tok('--heart-edge', '#18181a'), grey: hex(tok('--heart-flat', '#bbbbbb')) };
    wake();
  };
  const [yaw0, pitch0] = POSE;
  const st = { yaw: yaw0, pitch: pitch0, sx: 1, sy: 1, sz: 1, light: [-0.45, 0.55, 0.7], flat: 0 };
  const m = { vy: 0, drag: null, look: [0, 0], lookT: [0, 0], hover: false, k: 0, kv: 0, down: false, bpm: o.bpm, kick: 0, flat: false, phase: 0, t: 0, shown: 0, until: 0 };
  let raf = 0, last = 0, visible = true, dead = false;

  function step(dt) {
    const still = reduced();
    m.t += dt;
    m.bpm += (o.bpm - m.bpm) * (1 - Math.exp(-dt / 5));
    if (o.onBpm && Math.round(m.bpm) !== m.shown) { m.shown = Math.round(m.bpm); o.onBpm(m.shown); }
    m.phase += dt * m.bpm / 60;
    const ph = m.phase % 1;
    for (const i of [0, 1]) m.look[i] += (m.lookT[i] - m.look[i]) * (1 - Math.exp(-dt * 4));
    const ty = yaw0 + (still ? 0 : Math.sin(m.t * 0.45) * SWAY) + m.look[0] * 0.55;
    const tp = m.flat ? Math.min(1.25, pitch0 + 0.9) : pitch0 + (still ? 0 : Math.sin(m.t * 0.31) * 0.06) + m.look[1] * 0.3;
    if (!m.drag || !m.drag.moved) {
      st.yaw += m.vy * dt; m.vy *= Math.exp(-dt * 1.8);
      if (Math.abs(m.vy) < 1.2) { st.yaw = ty + wrap(st.yaw - ty); st.yaw += (ty - st.yaw) * (1 - Math.exp(-dt * 2.2)); }
      st.pitch += (tp - st.pitch) * (1 - Math.exp(-dt * (m.flat ? 1.2 : 2.2)));
    }
    const target = m.down ? 1 : 0;
    if (still) { m.k = target; m.kv = 0; } else { m.kv += (-170 * (m.k - target) - 13 * m.kv) * dt; m.k += m.kv * dt; }
    m.kick *= Math.exp(-dt * 5);
    st.flat += ((m.flat ? 1 : 0) - st.flat) * (still ? 1 : 1 - Math.exp(-dt * 1.5));
    const amp = still ? 0 : 1 - st.flat, wave = pulse(ph, 0.06, 0.05) + 0.6 * pulse(ph, 0.25, 0.05);
    const b = 1 + amp * (0.045 * wave + 0.07 * m.kick);
    st.sx = st.sz = b * (1 + 0.07 * m.k); st.sy = b * (1 - 0.13 * m.k);
    const lx = m.hover ? m.look[0] * 1.1 : Math.sin(m.t * 0.3) * 0.6, ly = m.hover ? 0.25 - m.look[1] * 1.1 : 0.55;
    const ln = Math.hypot(lx, ly, 0.85); st.light = [lx / ln, ly / ln, 0.85 / ln];
  }
  function frame(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    step(dt); draw(st, col);
    if (!dead && visible && (!reduced() || m.drag || now < m.until)) raf = requestAnimationFrame(frame);
  }
  function wake() {
    m.until = performance.now() + 900;
    if (!raf && !dead && visible && col) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  const size = () => {
    const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.max(1, Math.round(r.width * d)); cv.height = Math.max(1, Math.round(r.height * d));
    if (col) draw(st, col);
  };
  const ro = new ResizeObserver(size); ro.observe(cv);
  const io = new IntersectionObserver(es => { visible = es[es.length - 1].isIntersecting; if (visible) wake(); }); io.observe(el);
  const mo = new MutationObserver(readCol); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const mq = window.matchMedia('(prefers-color-scheme: dark)'); mq.addEventListener?.('change', readCol);
  const onVis = () => { if (!document.hidden) wake(); };
  document.addEventListener('visibilitychange', onVis);

  const onMove = e => {
    const r = btn.getBoundingClientRect();
    m.lookT = [clamp(((e.clientX - r.left) / r.width - 0.5) * 0.9, -1, 1), clamp(((e.clientY - r.top) / r.height - 0.5) * 0.9, -1, 1)];
    if (e.pointerType === 'mouse') m.hover = true;
    wake();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  btn.addEventListener('pointerdown', e => {
    if (m.flat || e.button > 0) return;
    m.down = true; m.drag = { x: e.clientX, y: e.clientY, yaw: st.yaw, pitch: st.pitch, moved: false, lx: e.clientX, lt: performance.now() };
    try { btn.setPointerCapture(e.pointerId); } catch (err) { /* capture is optional */ }
    wake();
  });
  btn.addEventListener('pointermove', e => {
    const d = m.drag; if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > 6) { d.moved = true; m.down = false; btn.classList.add('dragging'); }
    if (d.moved) {
      const now = performance.now(), dts = Math.max(16, now - d.lt) / 1000;
      st.yaw = d.yaw + dx * 0.012; st.pitch = clamp(d.pitch + dy * 0.008, -1.1, 1.3);
      m.vy = (e.clientX - d.lx) * 0.012 / dts; d.lx = e.clientX; d.lt = now;
    }
    wake();
  });
  const end = cancel => {
    const d = m.drag; if (!d) return;
    m.drag = null; m.down = false; btn.classList.remove('dragging');
    if (!d.moved && !cancel) handle.press();
    wake();
  };
  btn.addEventListener('pointerup', () => end(false));
  btn.addEventListener('pointercancel', () => end(true));
  btn.addEventListener('keydown', e => {
    if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); if (!m.flat) { m.down = true; wake(); } }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); m.vy += e.key === 'ArrowLeft' ? -5 : 5; wake(); }
  });
  btn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') { m.down = false; handle.press(); } });

  const handle = {
    press() {
      if (m.flat) return;
      if (o.sound) thump();
      m.kick = 1; m.bpm = Math.min(180, m.bpm + 14);
      wake();
    },
    flatten(on) {
      m.flat = on; btn.setAttribute('aria-disabled', String(on)); btn.classList.toggle('flat', on);
      m.until = performance.now() + 2500; wake();
    },
    setRest(bpm) { o.bpm = bpm; wake(); },
    destroy() {
      dead = true; if (raf) cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect(); mo.disconnect(); mq.removeEventListener?.('change', readCol);
      document.removeEventListener('visibilitychange', onVis); window.removeEventListener('pointermove', onMove);
      el.innerHTML = '';
    },
  };
  readCol(); size();
  return handle;
}
