import React, { useEffect, useRef, useState } from 'react';
import { CONTENT, monthDot, monthsBetween, spanLabel } from '../content.js';
import { CAT_NAMES, catSound, meow, portraitMarkup, setCatSound } from '../lib/cats.js';
import { toggleDetails } from '../lib/motion.js';
import { mountEcg } from '../lib/ecg.js';
import { useSlide } from '../lib/hooks.js';
import { GLYPHS, GLYPH_FOR, LOGOS, LOGO_ALIAS } from '../data/stack-icons.js';
import { Chevron, ExternalIcon, GitHubIcon, Icon, LinkIcon, LinkedInIcon, PixelHeart, iconUrl } from './icons.jsx';

// date ranges read like chanhdai's: sans digits, a mono dash, and a drawn ∞ for an open end (the glyph is tiny in both fonts)
const Dash = () => <span className="dash">—</span>;
const Inf = ({ label }) => <svg className="inf" viewBox="0 0 24 24" role="img" aria-label={label}><path d="M12 12c-2-2.7-3.7-4-5.5-4a4 4 0 0 0 0 8c1.8 0 3.5-1.3 5.5-4s3.7-4 5.5-4a4 4 0 0 1 0 8c-1.8 0-3.5-1.3-5.5-4z" /></svg>;

const greeting = () => {
  const hr = new Date().getHours();
  return hr < 5 ? 'Good evening' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
};

export function About() {
  return (
    <section className="about pad" id="about">
      <h2 className="sec-h">{greeting()}</h2>
      <ul>{CONTENT.about.map((t, i) => <li key={i} dangerouslySetInnerHTML={{ __html: t }} />)}</ul>
    </section>
  );
}

// A tool's glyph: its brand mark, filled, or one of our outline glyphs, stroked.
function ToolGlyph({ name }) {
  const logo = LOGOS[LOGO_ALIAS[name] || name];
  if (logo) return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={logo} /></svg>;
  return <svg className="outline" viewBox="0 0 24 24" aria-hidden="true"><path d={GLYPHS[GLYPH_FOR[name] || 'code']} /></svg>;
}

// Stack: one row per group, a numbered label on the left and the tools as pills (not links) on the right.
export function Stack() {
  return (
    <section id="stack">
      <div className="pad"><h2 className="sec-h">Stack</h2></div>
      <div className="rule" />
      <div className="stack">
        {CONTENT.stack.map(([group, tools], i) => {
          const id = `stack-${i + 1}`;
          return (
            <div className="stack-row" key={group}>
              <div className="stack-g" id={id}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{group}</div>
              <ul aria-labelledby={id}>{tools.map(t => <li key={t}><ToolGlyph name={t} />{t}</li>)}</ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const hop = e => e.currentTarget.animate?.([{ transform: 'translateY(0)' }, { transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }], { duration: 280, easing: 'cubic-bezier(.4,0,.2,1)' });

// The shelf heading carries the cats' sound switch; sound is off until a visitor turns it on.
export function CatShelf() {
  const [sound, setSound] = useState(catSound);
  const toggle = () => { setCatSound(!sound); setSound(!sound); };
  return (
    <>
      <div className="shelf-h pad">
        {CONTENT.shelfTitle}
        <button type="button" className="sound" aria-pressed={sound} onClick={toggle}><Icon name={sound ? 'soundOn' : 'soundOff'} /><span>Sound</span></button>
      </div>
      <div className="rule" />
      <div className="shelf">
        {CONTENT.cats.map(({ id, role }) => (
          <button key={id} type="button" aria-label={`${CAT_NAMES[id]}, ${role}`} onClick={e => { hop(e); meow(id); }}>
            <span className="portrait" dangerouslySetInnerHTML={{ __html: portraitMarkup(id, 64) }} />
            <b>{CAT_NAMES[id]}</b><small>{role}</small>
          </button>
        ))}
      </div>
    </>
  );
}

// an employer's or school's logo on a white tile (so dark logos hold up in dark mode), else its initials;
// fill: the logo is its own tile and fills the box
const OrgMark = ({ icon, fill, text }) => icon
  ? <span className={'mono-box logo' + (fill ? ' fill' : '')} aria-hidden="true"><img src={icon} alt="" /></span>
  : <span className="mono-box">{text}</span>;

const initialsOf = s => s.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0, 2).map(w => w[0]).join('');

export function Experience() {
  const e = CONTENT.education;
  return (
    <section id="experience">
      <div className="pad"><h2 className="sec-h">Experience</h2></div>
      <div className="rule" />
      <div className="pad">
        {CONTENT.experience.map((org, oi) => (
          <div className="org" key={org.org}>
            <div className="org-h">
              <OrgMark icon={org.icon} fill={org.iconFill} text={initialsOf(org.org)} /><b>{org.org}</b>
              <span className="where">{org.place}{!org.ended && <i title="Current" />}</span>
            </div>
            <div className="roles">
              {org.roles.map((r, ri) => (
                <details className="role" key={r.title} open={oi === 0 && ri === 0} style={{ '--ico': iconUrl(r.icon) }}>
                  <summary onClick={toggleDetails}>
                    <span className="role-t">{r.title}</span><Chevron />
                    <span className="role-m dates">{monthDot(r.start)}<Dash />{r.end ? monthDot(r.end) : <Inf label="present" />}<span className="sep">|</span>{spanLabel(monthsBetween(r.start, r.end))}</span>
                  </summary>
                  <div className="role-b">
                    <ul>{r.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                    {r.tech.length > 0 && <div className="pills">{r.tech.map(t => <span key={t}>{t}</span>)}</div>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
        <div className="org">
          <div className="org-h"><OrgMark icon={e.icon} text={e.initials} /><b>{e.school}</b><span className="where">{e.date}</span></div>
          <div className="roles"><div className="edu"><span className="role-t">{e.degree}</span>{e.note && <div className="role-m">{e.note}</div>}</div></div>
        </div>
      </div>
    </section>
  );
}

const projInitials = name => name.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

// A screenshot opened full size: a modal <dialog> (Esc closes it), arrows step through the project's shots,
// and a click on the backdrop closes it.
const ShotButton = ({ s, onOpen, style }) => (
  <button type="button" className="shot" style={style} onClick={onOpen} aria-label={`${s.alt}, open full size`}>
    <img src={s.src} alt={s.alt} fetchPriority="low" />
  </button>
);

function Lightbox({ view, onClose, onStep }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (view && !d.open) d.showModal();
    if (!view && d.open) d.close();
  }, [view]);
  const many = view && view.shots.length > 1;
  const onKey = e => {
    if (!many) return;
    if (e.key === 'ArrowRight') onStep(1);
    if (e.key === 'ArrowLeft') onStep(-1);
  };
  const s = view && view.shots[view.i];
  return (
    <dialog className="lightbox" ref={ref} onClose={onClose} onKeyDown={onKey} onClick={e => e.target === ref.current && onClose()}
      aria-label={s ? s.alt : 'Screenshot'}>
      {s && <>
        <img src={s.src} alt={s.alt} />
        <div className="lb-bar">
          <span className="lb-cap">{s.alt}{many && <span className="lb-n">{view.i + 1} / {view.shots.length}</span>}</span>
          {many && <button type="button" onClick={() => onStep(-1)} aria-label="Previous screenshot">‹</button>}
          {many && <button type="button" onClick={() => onStep(1)} aria-label="Next screenshot">›</button>}
          <button type="button" onClick={onClose} aria-label="Close" autoFocus>✕</button>
        </div>
      </>}
    </dialog>
  );
}

function Project({ p, open, onShot }) {
  return (
    <details className="p" id={p.id} open={open}>
      <summary onClick={toggleDetails}>
        <span className={'p-ico' + (p.icon && !p.iconPad ? ' app' : '')} aria-hidden="true">
          {p.icon === 'heart' ? <PixelHeart /> : p.icon ? <img src={p.icon} alt="" /> : projInitials(p.name)}
        </span>
        <span className="p-n">{p.name}</span>
        {p.link || p.demo
          ? <span className="p-lnks">
            {p.demo && <a className="p-lnk" href={p.demo} target="_blank" rel="noopener" aria-label={`${p.name}, live demo`} onClick={e => e.stopPropagation()}><ExternalIcon /></a>}
            {p.link && <a className="p-lnk" href={p.link} target="_blank" rel="noopener" aria-label={`${p.name} on GitHub`} onClick={e => e.stopPropagation()}><LinkIcon /></a>}
          </span>
          : <span className="p-lnk private">{p.tag || 'private'}</span>}
        <Chevron />
        <span className="p-d dates" title={p.ongoing ? 'Ongoing, no end date' : undefined}>{p.ongoing ? <>{p.start}<Dash /><Inf label="ongoing" /></> : p.year}</span>
      </summary>
      <div className="p-b">
        <div className="pills">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
        <p>{p.line}</p>
        {p.more && <p>{p.more}</p>}
        {p.shots.length > 1
          ? <div className="shots">{p.shots.map((s, i) => <ShotButton key={s.src} s={s} onOpen={() => onShot(p.shots, i)} style={{ flex: s.w / s.h }} />)}</div>
          : p.shots.map(s => <ShotButton key={s.src} s={s} onOpen={() => onShot(p.shots, 0)} />)}
      </div>
    </details>
  );
}

export function Projects() {
  const [more, setMore] = useState(false);
  const [view, setView] = useState(null);
  const moreRef = useRef(null), btnRef = useRef(null);
  const onShot = (shots, i) => setView({ shots, i });
  const onStep = d => setView(v => ({ ...v, i: (v.i + d + v.shots.length) % v.shots.length }));
  useSlide(moreRef, more, btnRef);
  const selected = CONTENT.selected.map(id => CONTENT.projects.find(p => p.id === id));
  const rest = CONTENT.projects.filter(p => !CONTENT.selected.includes(p.id));
  // a deep link like /#ingame (the résumé uses one) lands on that card open
  const linked = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  return (
    <section id="projects">
      <div className="pad"><h2 className="sec-h">Projects<sup>({CONTENT.projects.length})</sup></h2></div>
      <div className="rule" />
      <div className="pad">{selected.map((p, i) => <Project key={p.id} p={p} open={i === 0 || p.id === linked} onShot={onShot} />)}</div>
      <div id="proj-more" ref={moreRef}>
        <div className="pad">{rest.map(p => <Project key={p.id} p={p} onShot={onShot} />)}</div>
        <div className="pad"><p className="also">Also in the works: {CONTENT.alsoMentioned}</p></div>
      </div>
      <div className="more-btn">
        <button type="button" ref={btnRef} aria-expanded={more} aria-controls="proj-more" onClick={() => setMore(!more)}>
          {more ? 'Show less' : 'Show more'}
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
        </button>
      </div>
      <Lightbox view={view} onClose={() => setView(null)} onStep={onStep} />
    </section>
  );
}

// A heart monitor: an ECG trace at the hero heart's rate, flat on the 404.
function Ecg({ bpm, flat }) {
  const ref = useRef(null), mon = useRef(null);
  useEffect(() => {
    mon.current = mountEcg(ref.current, { bpm, flat });
    return () => mon.current.destroy();
    // mounted once; bpm and flat are pushed in below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { mon.current.setBpm(bpm); }, [bpm]);
  useEffect(() => { mon.current.flatten(flat); }, [flat]);
  return <div className="ecg" aria-hidden="true"><canvas ref={ref} /></div>;
}

export function Footer({ bpm, flat }) {
  const c = CONTENT.contact;
  return (
    <footer className="pad" id="foot">
      <span>© {new Date().getFullYear()} {CONTENT.name} · Ottawa</span>
      <nav className="foot-links" aria-label="Footer">
        <a className="glyph" href={c.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
        <a className="glyph" href={c.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="#top">Back to top ↑</a>
      </nav>
      <Ecg bpm={bpm} flat={flat} />
    </footer>
  );
}

export function NotFound({ onHome }) {
  const nf = CONTENT.notFound;
  return (
    <div className="nf" role="dialog" aria-modal="true" aria-labelledby="nf-title">
      <div>
        <span className="code">404</span>
        <h2 id="nf-title">{nf.title}</h2>
        <p>{nf.body}</p>
        <Ecg bpm={0} flat />
        <a href="/" onClick={e => { e.preventDefault(); onHome(); }}>{nf.link}</a>
      </div>
    </div>
  );
}
