// The four cats as low-poly vector poses with an ink outline, faceted like the heart.
// Coats come from photos of the real cats. Frame art and timing are a first pass; tune them in the page.
// mountCats({ anchors: { tubbin, timber, tulip }, bottom }) -> unmount()
const NAMES = { tubbin: 'Tubbin', timber: 'Timber', tulip: 'Tulip', tonka: 'Tonka' };
export const CAT_NAMES = NAMES;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const touch = () => window.matchMedia('(hover: none)').matches;
const ns = 'http://www.w3.org/2000/svg';
const P = s => s.trim().split(/\s+/).map(Number);
const fan = (outline, o, regs) => outline.map((p, i) => [regs[i % regs.length], [...p, ...outline[(i + 1) % outline.length], ...o]]);
const shadeHex = (hex, k) => {
  const n = parseInt(hex.slice(1), 16), ch = [n >> 16, n >> 8 & 255, n & 255];
  const out = ch.map(v => Math.max(0, Math.min(255, Math.round(k < 0 ? v * (1 + k) : v + (255 - v) * k))));
  return '#' + out.map(v => v.toString(16).padStart(2, '0')).join('');
};

// ---------- coats ----------
const COATS = {
  tubbin: { ear: '#2b2b2b', earIn: '#6b4a4a', headA: '#353535', headB: '#2b2b2b', mask: null, muzzle: '#323232', chest: '#333333', body: '#2e2e2e', bodyB: '#262626', leg: '#2b2b2b', paw: '#2b2b2b', tail: '#282828', eye: '#c7c24a', pupil: '#111', nose: '#6b4a4a', lid: '#8c8c8c', stripe: null },
  timber: { ear: '#4a3f3a', earIn: '#6b5a52', headA: '#d2c3ae', headB: '#c4b39c', mask: '#5a4c44', muzzle: '#5a4c44', chest: '#f3ead9', body: '#ece2cf', bodyB: '#ddd0b9', leg: '#ddd0b9', paw: '#5a4c44', tail: '#4a3f3a', eye: '#6fa8ff', pupil: '#111', nose: '#3a3030', lid: '#2f2723', stripe: null },
  tulip: { ear: '#66707b', earIn: '#8a7f86', headA: '#76808b', headB: '#6a747f', mask: null, muzzle: '#7d8792', chest: '#76808b', body: '#6f7a86', bodyB: '#636d78', leg: '#6f7a86', paw: '#6f7a86', tail: '#5e6873', eye: '#7fbf4d', pupil: '#111', nose: '#4e5560', lid: '#3e454d', stripe: null },
  tonka: { ear: '#8c7666', earIn: '#d8b8a8', headA: '#ebdfd0', headB: '#e0d2c0', mask: '#9c8778', muzzle: '#f4eee6', chest: '#faf6f0', body: '#efe6d8', bodyB: '#e4d8c6', leg: '#b9a594', paw: '#ffffff', tail: '#a8927f', eye: '#7fa9e8', pupil: '#111', nose: '#d9a59a', lid: '#6b5a4c', stripe: '#7a6656' },
};
const DETAIL = new Set(['stripe', 'legStripe', 'eye', 'pupil', 'nose', 'lid']);
function fillOf(coat, r) {
  if (r === 'legFar') return coat.leg && shadeHex(coat.leg, -0.22);
  if (r === 'pawFar') return coat.paw && shadeHex(coat.paw, -0.22);
  if (r === 'legStripe') return coat.stripe;
  return coat[r];
}

// ---------- sitting, front view ----------
const HEAD_O = [16, 12.5], HEAD = [[5, 9], [12, 7], [16, 6], [20, 7], [27, 9], [27, 12], [25, 16], [16, 18.5], [7, 16], [5, 12]];
const HEAD_REG = ['headA', 'headB'];
const BODY = [[9, 17.5], [23, 17.5], [26, 25], [25, 31], [7, 31], [6, 25]];
const sitCommon = [
  ...fan(BODY, [16, 24], ['chest', 'body', 'bodyB', 'body', 'bodyB', 'body']),
  ['leg', P('11 23 14.5 23 14.5 31 11 31')], ['leg', P('17.5 23 21 23 21 31 17.5 31')],
  ['paw', P('10.5 29.4 15 29.4 15 31.3 10.5 31.3')], ['paw', P('17 29.4 21.5 29.4 21.5 31.3 17 31.3')],
  ['legStripe', P('11 25 14.5 25 14.5 25.8 11 25.8')], ['legStripe', P('11 27.1 14.5 27.1 14.5 27.9 11 27.9')],
  ['legStripe', P('17.5 25 21 25 21 25.8 17.5 25.8')], ['legStripe', P('17.5 27.1 21 27.1 21 27.9 17.5 27.9')],
  ...fan(HEAD, HEAD_O, HEAD_REG),
  ['ear', P('6 1.5 5 9 12 7')], ['ear', P('26 1.5 20 7 27 9')],
  ['earIn', P('7 4 6.5 8 10 7')], ['earIn', P('25 4 22 7 25.5 8')],
  ['mask', P('8.8 10.6 14.4 10.4 14.6 14.4 9 14.6')], ['mask', P('17.6 10.4 23.2 10.6 23 14.6 17.4 14.4')],
  ['muzzle', P('13 14 19 14 18.6 17.4 16 18.5 13.4 17.4')],
  ['stripe', P('13.8 7.2 14.4 7 14.8 10 14.2 10.1')], ['stripe', P('15.7 6.6 16.3 6.6 16.3 10 15.7 10')], ['stripe', P('17.6 7 18.2 7.2 17.8 10.1 17.2 10')],
  ['nose', P('15 15 17 15 16 16.2')],
];
const eyesOpen = [['eye', P('10.5 12.5 12 11.2 13.5 12.5 12 13.7')], ['eye', P('18.5 12.5 20 11.2 21.5 12.5 20 13.7')],
  ['pupil', P('11.7 12.5 12 11.5 12.3 12.5 12 13.4')], ['pupil', P('19.7 12.5 20 11.5 20.3 12.5 20 13.4')]];
const SIT = [
  [['tail', P('24 30 28 30.6 31 26 31 20 29 19 29.6 25 27 28')], ...sitCommon, ...eyesOpen],
  [['tail', P('24 30 28 30.6 31.6 25 30.2 16.8 28.2 17.4 29.6 24 27 28')], ...sitCommon, ...eyesOpen],
];

// ---------- sleeping: curled up on its side, head on its paws, tail wrapped round ----------
function napFrame(breath) {
  const b = breath ? -0.7 : 0;
  // the body mound dips at the neck so the head reads as its own shape
  const body = [[4, 30.4], [4.4, 25], [7.6, 20.6 + b], [13.6, 18.6 + b], [18.6, 19.4 + b], [21.4, 22.6], [22.6, 26.8], [22.4, 30.4]];
  return [
    ['tail', P('3.6 28.6 10 30 19 30.4 23 29.6 23.2 31.4 12 31.7 3.6 31.2')],
    ...fan(body, [14, 25.6], ['body', 'bodyB']),
    ['paw', P('20.6 28 29.4 28 29.4 30.6 20.6 30.6')],
    ['ear', P('20.6 19.6 21.4 13.4 25 17.8')], ['ear', P('25.8 17.6 29.4 12.8 30.2 19.8')],
    ['earIn', P('21.6 18.6 21.9 15.6 23.8 17.8')], ['earIn', P('26.8 17.6 28.9 15 29.2 18.8')],
    ...fan([[19.6, 21.4], [22.2, 18.4], [27, 18], [30.6, 20.4], [31.4, 24.6], [29.4, 27.8], [24, 28.4], [20.4, 26.2]], [25.6, 23.2], HEAD_REG),
    ['mask', P('25.4 20.4 30.6 20.4 31.4 24.6 29.4 27.8 25.6 26.4')],
    ['muzzle', P('28.4 24 31.4 24 30.6 26.8 28.6 27.4')],
    ['stripe', P('23 19.2 23.6 19 24 21.4 23.4 21.6')], ['stripe', P('24.8 18.6 25.4 18.6 25.4 21 24.8 21')],
    ['lid', P('26.4 22.2 27.9 23.1 29.4 22.2 29.4 22.8 27.9 23.7 26.4 22.8')],
    ['nose', P('30.8 23.8 31.6 24.2 30.8 24.7')],
  ];
}
const NAP = [napFrame(false), napFrame(true)];

// ---------- side view, facing right: walks, trot, run, crouch, pounce ----------
const S_BODY = [[7, 15], [12, 13.5], [18, 13.5], [23, 14.5], [25, 18], [23, 22], [16, 22.5], [9, 22], [6, 19]];
const S_HEAD = [[22, 10], [25, 8.5], [29, 9.5], [31, 12.5], [30.5, 15.5], [27.5, 17.2], [23.5, 16.5], [21.5, 13.5]];
const TAILS = {
  up: [[7.5, 15.5], [5.5, 12.5], [4.6, 8], [4.8, 3.8], [6.6, 3.6], [6.6, 8], [8, 12], [9.2, 14.6]],
  curl: [[7.5, 15.5], [4.8, 12], [3.6, 7.5], [4.6, 3.6], [7.6, 2.6], [9.4, 4.4], [8.2, 5.6], [6.8, 4.8], [6.2, 7.6], [7.6, 11.6], [9.4, 14.4]],
  straight: [[7, 15.2], [3, 13.6], [0.4, 12.8], [0.5, 14.8], [3.2, 16], [7, 17.6]],
  low: [[7, 18], [3, 19.6], [0.6, 21.4], [0.9, 23], [3.6, 21.6], [7.4, 20.4]],
};
// legs: [anchorX, footX, footY, far]
function sideCat({ dy = 0, tilt = 0, stretch = 0, legs, tail = 'up', tailSway = 0 }) {
  const c = Math.cos(tilt), s = Math.sin(tilt);
  const T = ([x, y]) => { x = 16 + (x - 16) * (1 + stretch); return [16 + (x - 16) * c - (y - 18) * s, 18 + (x - 16) * s + (y - 18) * c + dy]; };
  const TT = arr => arr.map(T);
  const flat = arr => arr.flat();
  const tailPts = TAILS[tail].map(([x, y]) => [x + (y < 9 ? tailSway : 0), y]);
  const legPoly = ([ax, fx, fy]) => { const [tx, ty] = T([ax, 20.8]); return [tx - 1.1, ty, tx + 1.1, ty, fx + 1, fy, fx - 1, fy]; };
  const pawPoly = ([, fx, fy]) => [fx - 1.2, fy - 1.1, fx + 1.7, fy - 1.1, fx + 1.7, fy + 0.1, fx - 1.2, fy + 0.1];
  const stripePolys = ([ax, fx, fy]) => {
    const [tx, ty] = T([ax, 20.8]);
    return [0.45, 0.68].map(k => { const y = ty + (fy - ty) * k, x = tx + (fx - tx) * k; return ['legStripe', [x - 1.05, y, x + 1.05, y, x + 1.05, y + 0.8, x - 1.05, y + 0.8]]; });
  };
  const far = legs.filter(l => l[3]), near = legs.filter(l => !l[3]);
  const head = TT(S_HEAD), ho = T([26, 13]);
  return [
    ['tail', flat(TT(tailPts))],
    ...far.map(l => ['legFar', legPoly(l)]), ...far.map(l => ['pawFar', pawPoly(l)]),
    ...fan(TT(S_BODY), T([15, 18]), ['body', 'bodyB']),
    ['chest', flat(TT([[21, 18], [24.6, 18.4], [23, 22], [20, 22]]))],
    ...near.map(l => ['leg', legPoly(l)]), ...near.flatMap(stripePolys), ...near.map(l => ['paw', pawPoly(l)]),
    ...fan(head, ho, HEAD_REG),
    ['ear', flat(TT([[22.6, 10.2], [23.4, 4.8], [25.6, 9]]))], ['ear', flat(TT([[26.2, 9], [28.2, 4.6], [29.2, 10]]))],
    ['earIn', flat(TT([[23.3, 9.4], [23.7, 6.6], [24.9, 9]]))], ['earIn', flat(TT([[26.9, 9.2], [28.1, 6.4], [28.5, 9.6]]))],
    ['mask', flat(TT([[25.5, 10.5], [29.5, 10.5], [31, 13], [30.5, 15.5], [27, 16]]))],
    ['muzzle', flat(TT([[28.5, 13.5], [31, 13], [30.5, 15.5], [28, 15.8]]))],
    ['stripe', flat(TT([[24, 9.2], [24.6, 9], [25, 11.4], [24.4, 11.5]]))], ['stripe', flat(TT([[25.6, 8.8], [26.2, 8.8], [26.2, 11.2], [25.6, 11.2]]))],
    ['eye', flat(TT([[26.8, 11.8], [27.6, 11], [28.4, 11.8], [27.6, 12.6]]))],
    ['pupil', flat(TT([[27.45, 11.8], [27.6, 11.1], [27.75, 11.8], [27.6, 12.5]]))],
    ['nose', flat(TT([[30.6, 13.4], [31.3, 13.8], [30.6, 14.2]]))],
  ];
}
const G = 30.6; // ground
// a gait: legs [anchor, phase, far], stride, lift, bob, frames
function gait({ legs, stride, lift, bob, frames, tail, sway = 0, stretch = 0, tilt = 0 }) {
  return Array.from({ length: frames }, (_, f) => {
    const ph = (f / frames) * Math.PI * 2;
    return sideCat({
      dy: -bob * Math.abs(Math.sin(ph)),
      stretch: stretch * Math.sin(ph), tilt: tilt * Math.sin(ph),
      tail, tailSway: sway * Math.sin(ph),
      legs: legs.map(([ax, p, far]) => { const a = ph + p; return [ax, ax + stride * Math.sin(a), G - lift * Math.max(0, Math.cos(a)), far]; }),
    });
  });
}
const PI = Math.PI;
// Timber strolls: a slow lateral walk, tail held up, barely any bob.
const STROLL = gait({ legs: [[21.5, PI / 2, 0], [20, 3 * PI / 2, 1], [10, 0, 0], [8.6, PI, 1]], stride: 2.1, lift: 1.3, bob: 0.25, frames: 6, tail: 'up', sway: 0.8 });
// Tonka trots: diagonal pairs, longer lift, a bouncy bob and a curled question-mark tail.
const TROT = gait({ legs: [[21.5, 0, 0], [20, PI, 1], [10, PI, 0], [8.6, 0, 1]], stride: 2.8, lift: 2.4, bob: 0.9, frames: 4, tail: 'curl', sway: 0.6 });
// Tulip gallops: fronts together, backs together, body stretching and gathering, tail straight out.
const RUN = gait({ legs: [[22, 0, 0], [20.6, 0.35, 1], [10, PI, 0], [8.6, PI + 0.35, 1]], stride: 3.6, lift: 3, bob: 1, frames: 4, tail: 'straight', stretch: 0.07, tilt: 0.05 });
const CROUCH = sideCat({ dy: 2.6, tilt: -0.06, tail: 'low', legs: [[21.5, 23.6, G, 0], [20, 22.4, G, 1], [10, 9.4, G, 0], [8.6, 8, G, 1]] });
const POUNCE = sideCat({ dy: -3.2, tilt: -0.32, tail: 'straight', legs: [[21.5, 28.4, 22.4, 0], [20, 27.4, 23.4, 1], [10, 3.6, 28.6, 0], [8.6, 4.8, 29.4, 1]] });

function geoSVG(polys, coat, px) {
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 32 32'); svg.setAttribute('width', px); svg.setAttribute('height', px);
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('geo');
  for (const [reg, pts] of polys) {
    const fill = fillOf(coat, reg);
    if (!fill) continue;
    const p = document.createElementNS(ns, 'polygon');
    p.setAttribute('points', pts.map(n => +n.toFixed(2)).join(' ')); p.setAttribute('fill', fill);
    if (DETAIL.has(reg)) p.classList.add('detail');
    svg.append(p);
  }
  return svg;
}

// A static sitting cat for the shelf, as SVG markup.
export function portraitMarkup(id, px = 64) {
  return geoSVG(SIT[0], COATS[id], px).outerHTML;
}

// ---------- behaviour ----------
let gen = 0;
export function mountCats(o) {
  const my = ++gen;
  const opts = Object.assign({ scale: 3, anchors: {}, tonkaAfter: 40000 }, o);
  const live = () => my === gen;
  const px = 16 * opts.scale;
  const SETS = { sit: SIT, nap: NAP, stroll: STROLL, trot: TROT, run: RUN, crouch: [CROUCH], pounce: [POUNCE] };
  const cleanups = [];
  const later = (fn, ms) => { const t = setTimeout(fn, ms); cleanups.push(() => clearTimeout(t)); };
  const listen = (target, type, fn, options) => { target.addEventListener(type, fn, options); cleanups.push(() => target.removeEventListener(type, fn, options)); };

  function make(id, onClick) {
    const el = document.createElement('div');
    el.className = `cat cat-${id} cat-geo`; el.setAttribute('role', 'button'); el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', NAMES[id] + ', one of the cats');
    const body = document.createElement('div'); body.className = 'cat-body'; el.append(body);
    const tag = document.createElement('span'); tag.className = 'cat-tag'; tag.textContent = NAMES[id]; el.append(tag);
    const built = {}; let cur = null, timer = null;
    cleanups.push(() => clearInterval(timer));
    const frames = set => built[set] || (built[set] = SETS[set].map(f => { const s = geoSVG(f, COATS[id], px); s.style.display = 'none'; body.append(s); return s; }));
    const show = (set, i) => { if (cur) cur.style.display = 'none'; cur = frames(set)[i % SETS[set].length]; cur.style.display = ''; };
    const cat = {
      el, id, w: px, h: px,
      still(set, i = 0) { clearInterval(timer); show(set, i); },
      play(set, ms) {
        clearInterval(timer); let i = 0; show(set, 0);
        if (reduced()) return;
        timer = setInterval(() => { if (!live()) return clearInterval(timer); show(set, ++i); }, ms);
      },
      face(dir) { el.style.setProperty('--face', dir < 0 ? -1 : 1); },
      bob(v) { el.style.setProperty('--bob', v + 'px'); },
      tagFor(ms) { el.classList.add('tagged'); later(() => el.classList.remove('tagged'), ms); },
    };
    el.addEventListener('click', e => { e.stopPropagation(); cat.tagFor(2000); if (onClick) onClick(cat); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    return cat;
  }
  function perch(cat, anchor, xFrac = 0.6, overlap = 6) {
    if (getComputedStyle(anchor).position === 'static') anchor.style.position = 'relative';
    anchor.append(cat.el);
    cat.el.style.top = (-(cat.h - overlap)) + 'px';
    cat.el.style.left = `calc(${xFrac * 100}% - ${cat.w / 2}px)`;
  }

  // Tubbin naps on the metadata rule, curled up, breathing, with a few z's
  if (opts.anchors.tubbin) {
    const t = make('tubbin');
    perch(t, opts.anchors.tubbin.el, opts.anchors.tubbin.x ?? 0.7, 3);
    t.play('nap', 1500);
    const z = document.createElement('span'); z.className = 'cat-z'; z.setAttribute('aria-hidden', 'true'); z.innerHTML = '<i>z</i><i>z</i><i>z</i>';
    t.el.append(z);
  }

  // Timber sits on a heading; hover the heading and he gets up and strolls out of the way, then walks back
  const ta = opts.anchors.timber;
  if (ta) {
    const t = make('timber');
    perch(t, ta.el, ta.x ?? 0.6); t.play('sit', 2200);
    const base = t.el.style.left; let away = false, busy = null;
    const walk = (to, dir) => {
      clearTimeout(busy);
      if (reduced()) { t.el.style.left = to; return; }
      t.face(dir); t.play('stroll', 170);
      t.el.style.transition = 'left 1300ms linear'; t.el.style.left = to;
      busy = setTimeout(() => { t.el.style.transition = ''; t.face(1); t.play('sit', 2200); }, 1300);
    };
    cleanups.push(() => clearTimeout(busy));
    listen(ta.el, 'mouseenter', () => { if (!t.el.isConnected || away) return; away = true; walk(`calc(${base} + 84px)`, 1); });
    listen(ta.el, 'mouseleave', () => { if (!away) return; away = false; walk(base, -1); });
  }

  // Tulip sits until clicked; then she crouches, wiggles, gallops after the pointer and pounces when she's close
  const tu = opts.anchors.tulip;
  if (tu) {
    let chasing = false;
    const chase = () => {
      if (reduced() || chasing) return; chasing = true;
      const r = t.el.getBoundingClientRect();
      document.body.append(t.el); t.el.classList.add('fixed');
      let cx = r.left, cy = r.top, tx = cx + 120, ty = cy, raf = 0, mode = 'crouch', until = performance.now() + 700, mode0 = null, hopStart = 0;
      t.el.style.left = cx + 'px'; t.el.style.top = cy + 'px';
      const set = md => { if (md === mode0) return; mode0 = md; t.el.classList.toggle('wiggle', md === 'crouch'); if (md === 'run') t.play('run', 85); else t.still(md); };
      set('crouch');
      const step = now => {
        if (!live()) return;
        const dx = tx - cx, dy = ty - cy, d = Math.hypot(dx, dy);
        if (Math.abs(dx) > 2) t.face(dx);
        if (mode === 'crouch' && now > until) mode = d > 46 ? 'run' : 'pounce';
        if (mode === 'run') { cx += dx * 0.09; cy += dy * 0.09; if (d < 46) { mode = 'pounce'; hopStart = now; } }
        if (mode === 'pounce') {
          if (!hopStart) hopStart = now;
          const p = Math.min(1, (now - hopStart) / 340);
          cx += dx * 0.16; cy += dy * 0.16; t.bob(-Math.sin(p * Math.PI) * 14);
          if (p >= 1) { t.bob(0); mode = 'crouch'; until = now + 650; hopStart = 0; }
        }
        set(mode);
        t.el.style.left = cx + 'px'; t.el.style.top = cy + 'px';
        raf = requestAnimationFrame(step);
      };
      const onMove = e => { tx = e.clientX - t.w / 2; ty = e.clientY - t.h + 6; };
      if (touch()) [[r.left + 120, r.top - 10], [r.left + 10, r.top + 20], [r.left + 70, r.top]].forEach((p, i) => later(() => { tx = p[0]; ty = p[1]; }, i * 1600));
      else listen(document, 'mousemove', onMove);
      raf = requestAnimationFrame(step);
      cleanups.push(() => cancelAnimationFrame(raf));
      // after the chase she sits down wherever she ended up
      later(() => {
        cancelAnimationFrame(raf); document.removeEventListener('mousemove', onMove);
        if (!live()) return;
        const rr = t.el.getBoundingClientRect();
        t.el.classList.remove('fixed', 'wiggle'); t.bob(0); t.face(1);
        t.el.style.left = (rr.left + window.scrollX) + 'px'; t.el.style.top = (rr.top + window.scrollY) + 'px';
        t.el.style.position = 'absolute';
        t.play('sit', 2600); chasing = false;
      }, touch() ? 5200 : 20000);
    };
    const t = make('tulip', chase);
    perch(t, tu.el, tu.x ?? 0.5); t.play('sit', 2600);
  }

  // Tonka, the new hire, trots across the bottom once: quick steps, a bounce, the odd little hop
  let tonkaDone = false;
  function crossTonka() {
    const c = make('tonka');
    c.el.classList.add('fixed'); c.el.style.bottom = 'env(safe-area-inset-bottom, 0px)'; c.el.style.left = (-c.w) + 'px'; c.el.style.top = 'auto';
    document.body.append(c.el); c.play('trot', 105);
    const start = performance.now(), dur = 5200, W = window.innerWidth + c.w * 2;
    const step = now => {
      if (!live()) { c.el.remove(); return; }
      const t = now - start, p = Math.min(1, t / dur);
      const hop = (t % 1700) < 320 ? Math.sin(((t % 1700) / 320) * Math.PI) * 8 : 0;
      c.bob(-(Math.abs(Math.sin(t / 105 * Math.PI / 2)) * 1.5 + hop));
      c.el.style.left = (-c.w + p * W) + 'px';
      if (p < 1) requestAnimationFrame(step); else c.el.remove();
    };
    requestAnimationFrame(step);
  }
  if (reduced()) {
    // no crossing: Tonka just sits by the footer
    if (opts.bottom) { const c = make('tonka'); c.still('sit'); perch(c, opts.bottom, 0.85, 0); }
  } else {
    const go = () => { if (tonkaDone || !live()) return; tonkaDone = true; crossTonka(); };
    later(go, opts.tonkaAfter);
    listen(window, 'scroll', () => { if (window.scrollY + window.innerHeight > document.body.scrollHeight * 0.92) go(); }, { passive: true });
  }

  return () => {
    gen++;
    cleanups.forEach(fn => fn());
    document.querySelectorAll('.cat').forEach(e => e.remove());
  };
}
