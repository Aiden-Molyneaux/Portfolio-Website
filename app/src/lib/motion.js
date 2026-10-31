// Eased open and close for everything on the page that expands: the Experience and Projects <details>, the
// Show more list and the phone menu. The element's height (and vertical padding) animates between zero and its
// natural size, so whatever sits below slides instead of jumping. A click mid-animation turns it around from
// wherever it is. With reduced motion, or without the Web Animations API, things open and close instantly.
//
//   <summary onClick={toggleDetails}>        a <details> row
//   useSlide(ref, open)  (lib/hooks.js)      a block shown and hidden by React state

const DURATION = 280;
const EASING = 'cubic-bezier(.4, 0, .2, 1)';
const SIZE = ['height', 'paddingTop', 'paddingBottom', 'opacity'];
const CLOSED = { height: '0px', paddingTop: '0px', paddingBottom: '0px', opacity: 0 };
const state = new WeakMap(); // element -> { anim, token }

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const canSlide = el => !!el?.animate && !reduced();

const sizeOf = el => { const cs = getComputedStyle(el); return Object.fromEntries(SIZE.map(k => [k, cs[k]])); };
const hold = (el, at) => SIZE.forEach(k => { el.style[k] = at[k]; });
const release = el => SIZE.forEach(k => { el.style[k] = ''; });

// screenshots are lazy, so they start loading as a panel opens; give the visible ones a moment so the panel
// animates to its real height rather than growing again when an image lands
const imagesReady = el => Promise.race([
  Promise.all([...el.querySelectorAll('img')].filter(img => img.getClientRects().length).map(img => img.decode().catch(() => {}))),
  new Promise(r => setTimeout(r, 250)),
]);

// keep an element (the Show more button) still on screen while the content above it collapses
function pin(target, anim) {
  if (!target) return;
  let top = target.getBoundingClientRect().top;
  const step = () => {
    const now = target.getBoundingClientRect().top;
    if (now !== top) window.scrollBy({ top: now - top, behavior: 'instant' });
    top = target.getBoundingClientRect().top;
    if (anim.playState === 'running') requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// Slide el open or shut. show() makes it rendered before it opens; hide() takes it away once it has closed.
export function slide(el, opening, { show, hide, keep } = {}) {
  const s = state.get(el) || {};
  const token = (s.token || 0) + 1;
  const rendered = el.getClientRects().length > 0;
  if (!opening && !rendered) { s.anim?.cancel(); state.set(el, { token }); hide?.(); return; } // nothing to slide shut
  const midway = rendered && s.anim?.playState === 'running';
  const now = sizeOf(el); // where it is right now, mid-animation or not
  s.anim?.cancel();
  state.set(el, { token });
  el.style.overflow = 'hidden';

  const run = (from, to, done) => {
    const anim = el.animate([from, to], { duration: DURATION, easing: EASING });
    state.set(el, { anim, token });
    if (!opening) pin(keep, anim);
    // cancel() rejects this promise, which is how a turned-around animation steps aside
    anim.finished.then(() => {
      if (state.get(el)?.token !== token) return;
      if (done) done();
      release(el); el.style.overflow = '';
    }, () => {});
  };

  if (!opening) { run(now, CLOSED, hide); return; }

  const from = midway ? now : CLOSED;
  hold(el, from);
  show?.();
  imagesReady(el).then(() => {
    if (state.get(el)?.token !== token) return;
    // let go of the held size, measure the natural one, then hand over to the animation (same task, so no flash)
    release(el);
    run(from, { ...sizeOf(el), opacity: 1 });
  });
}

// onClick for a <summary>: slides its panel instead of the instant toggle. The .closing class turns the
// chevron back as soon as a panel starts to close, since the <details> stays open until the end.
export function toggleDetails(e) {
  const d = e.currentTarget.parentElement;
  const panel = d.querySelector(':scope > :not(summary)');
  if (!canSlide(panel)) return;
  e.preventDefault();
  const opening = !d.open || d.classList.contains('closing');
  d.classList.toggle('closing', !opening);
  slide(panel, opening, {
    show: () => { d.open = true; },
    hide: () => { d.open = false; d.classList.remove('closing'); },
  });
}
