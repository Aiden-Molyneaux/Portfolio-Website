import React, { useRef, useState } from 'react';
import { CONTENT, monthDot, monthsBetween, spanLabel } from '../content.js';
import { CAT_NAMES, portraitMarkup } from '../lib/cats.js';
import { toggleDetails } from '../lib/motion.js';
import { useSlide } from '../lib/hooks.js';
import { Chevron, GitHubIcon, LinkIcon, LinkedInIcon, iconUrl } from './icons.jsx';

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

const hop = e => e.currentTarget.animate?.([{ transform: 'translateY(0)' }, { transform: 'translateY(-5px)' }, { transform: 'translateY(0)' }], { duration: 280, easing: 'cubic-bezier(.4,0,.2,1)' });

export function CatShelf() {
  return (
    <>
      <div className="shelf-h pad">{CONTENT.shelfTitle}</div>
      <div className="rule" />
      <div className="shelf">
        {CONTENT.cats.map(({ id, role }) => (
          <button key={id} type="button" aria-label={`${CAT_NAMES[id]}, ${role}`} onClick={hop}>
            <span className="portrait" dangerouslySetInnerHTML={{ __html: portraitMarkup(id, 64) }} />
            <b>{CAT_NAMES[id]}</b><small>{role}</small>
          </button>
        ))}
      </div>
    </>
  );
}

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
              <span className="mono-box">{initialsOf(org.org)}</span><b>{org.org}</b>
              <span className="where">{org.place}, Canada{!org.ended && <i title="Current" />}</span>
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
                    <div className="pills">{r.tech.map(t => <span key={t}>{t}</span>)}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
        <div className="org">
          <div className="org-h"><span className="mono-box">{e.initials}</span><b>{e.school}</b><span className="where">{e.date}</span></div>
          <div className="roles"><div className="edu"><span className="role-t">{e.degree}</span><div className="role-m">{e.note}</div></div></div>
        </div>
      </div>
    </section>
  );
}

const projInitials = name => name.replace(/[^A-Za-z ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

function Project({ p, open }) {
  return (
    <details className="p" open={open}>
      <summary onClick={toggleDetails}>
        <span className="p-ico" aria-hidden="true">{projInitials(p.name)}</span>
        <span className="p-n">{p.name}</span>
        {p.link
          ? <a className="p-lnk" href={p.link} target="_blank" rel="noopener" aria-label={`${p.name} on GitHub`} onClick={e => e.stopPropagation()}><LinkIcon /></a>
          : <span className="p-lnk private">{p.tag || 'private'}</span>}
        <Chevron />
        <span className="p-d dates" title={p.ongoing ? 'Ongoing, no end date' : undefined}>{p.ongoing ? <>{p.start}<Dash /><Inf label="ongoing" /></> : p.year}</span>
      </summary>
      <div className="p-b">
        <div className="pills">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
        <p>{p.line}</p>
        {p.more && <p>{p.more}</p>}
        {p.image
          ? <img className="shot" src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
          : p.tier === 'full' && <div className="plate"><span>screenshots to follow</span></div>}
      </div>
    </details>
  );
}

export function Projects() {
  const [more, setMore] = useState(false);
  const moreRef = useRef(null), btnRef = useRef(null);
  useSlide(moreRef, more, btnRef);
  const selected = CONTENT.selected.map(id => CONTENT.projects.find(p => p.id === id));
  const rest = CONTENT.projects.filter(p => !CONTENT.selected.includes(p.id));
  return (
    <section id="projects">
      <div className="pad"><h2 className="sec-h">Projects<sup>({CONTENT.projects.length})</sup></h2></div>
      <div className="rule" />
      <div className="pad">{selected.map((p, i) => <Project key={p.id} p={p} open={i === 0} />)}</div>
      <div id="proj-more" ref={moreRef}>
        <div className="pad">{rest.map(p => <Project key={p.id} p={p} />)}</div>
        <div className="pad"><p className="also">Also in the works: {CONTENT.alsoMentioned}</p></div>
      </div>
      <div className="more-btn">
        <button type="button" ref={btnRef} aria-expanded={more} aria-controls="proj-more" onClick={() => setMore(!more)}>
          {more ? 'Show less' : 'Show more'}
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg>
        </button>
      </div>
    </section>
  );
}

export function Footer() {
  const c = CONTENT.contact;
  return (
    <footer className="pad" id="foot">
      <span>© {new Date().getFullYear()} {CONTENT.name} · Ottawa</span>
      <nav className="foot-links" aria-label="Footer">
        <a className="glyph" href={c.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
        <a className="glyph" href={c.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
        <a href="#top">Back to top ↑</a>
      </nav>
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
        <a href="/" onClick={e => { e.preventDefault(); onHome(); }}>{nf.link}</a>
      </div>
    </div>
  );
}
