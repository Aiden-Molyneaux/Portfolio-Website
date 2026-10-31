import React, { useEffect, useRef, useState } from 'react';
import { CONTENT } from '../content.js';
import { GitHubIcon, Icon, LinkedInIcon, PixelHeart } from './icons.jsx';
import { useWidth } from '../lib/hooks.js';

const TZ = 'America/Toronto';

// Minutes east of UTC for a time zone at this moment.
function tzOffset(now, timeZone) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
    .formatToParts(now).map(p => [p.type, p.value]));
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((asUtc - Math.floor(now.getTime() / 60000) * 60000) / 60000);
}

// Ottawa local time, and how far ahead or behind the viewer it is.
function ottawaTime() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-CA', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hour12: false });
  const h = (tzOffset(now, TZ) + now.getTimezoneOffset()) / 60;
  const n = +Math.abs(h).toFixed(1);
  return { time, rel: h === 0 ? 'same time as you' : `${n}h ${h > 0 ? 'ahead' : 'behind'}` };
}

function Clock() {
  const [t, setT] = useState(ottawaTime);
  useEffect(() => { const id = setInterval(() => setT(ottawaTime()), 30000); return () => clearInterval(id); }, []);
  return <span>{t.time} <span className="soft">{'// '}{t.rel}</span></span>;
}

function CopyEmail({ email }) {
  const [state, setState] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    if (!state) return undefined;
    const id = setTimeout(() => setState(null), 1500);
    return () => clearTimeout(id);
  }, [state]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setState('Copied'); } catch (err) {
      // no clipboard access: select the address so it can be copied by hand
      const r = document.createRange(); r.selectNodeContents(ref.current);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      setState('Press Ctrl+C');
    }
  };
  return <button className={`copy${state ? ' done' : ''}`} type="button" title="Copy email" onClick={copy} ref={ref}>{state || email}</button>;
}

export default function Identity() {
  const avatarRef = useRef(null);
  const d = useWidth(avatarRef);
  const c = CONTENT.contact;
  const cells = {
    code: <>{CONTENT.role.title} <span className="soft">@</span> {CONTENT.role.org}</>,
    clock: <Clock />,
    pin: CONTENT.place,
    mail: <CopyEmail email={c.email} />,
    shield: CONTENT.field,
    file: <span className="soft">{c.resume}</span>,
  };
  return (
    <>
      <div className="id">
        <div className="id-line" aria-hidden="true" />
        <div className="avatar-cell">
          <div className="dim-d" aria-hidden="true"><span>{d ? `Ø${d}` : ''}</span></div>
          <div className="avatar-wrap">
            <img className="avatar" ref={avatarRef} src={CONTENT.headshot} alt={CONTENT.name} width="160" height="160" />
          </div>
        </div>
        <div className="id-name">
          <h1><span>{CONTENT.name}</span><PixelHeart className="badge" /></h1>
          <p className="tagline">{CONTENT.tagline}</p>
        </div>
      </div>
      <div className="rule" />
      <div className="hatch" />
      <div className="rule" />
      <div className="meta pad" id="meta">
        {Object.entries(cells).map(([icon, v]) => <div className="cell" key={icon}><span className="ibox"><Icon name={icon} /></span><span>{v}</span></div>)}
      </div>
      <div className="rule" />
      <div className="socials pad">
        <div className="note note-follow">follow along<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M2 4c10 0 20 6 26 18M28 22l1-7M28 22l-7-2" /></svg></div>
        <a href={c.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
        <a href={c.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><LinkedInIcon /></a>
      </div>
    </>
  );
}
