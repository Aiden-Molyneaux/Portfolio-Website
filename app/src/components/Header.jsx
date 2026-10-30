import React, { useEffect, useState } from 'react';
import { GitHubIcon, PixelHeart } from './icons.jsx';
import { CONTENT } from '../content.js';
import { useTheme } from '../lib/hooks.js';

const SECTIONS =[['top', 'Index'], ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects']];

// Scroll spy: the last section whose top has passed 40% of the viewport.
function useActiveSection() {
  const [cur, setCur] = useState('top');
  useEffect(() => {
    const spy = () => {
      const y = window.innerHeight * 0.4;
      let next = 'top';
      SECTIONS.slice(1).forEach(([id]) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < y) next = id; });
      setCur(next);
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    return () => { window.removeEventListener('scroll', spy); window.removeEventListener('resize', spy); };
  }, []);
  return cur;
}

export default function Header() {
  const cur = useActiveSection();
  const [theme, toggleTheme] = useTheme();
  const [menu, setMenu] = useState(false);
  const links = SECTIONS.slice(1).map(([id, name]) => (
    <a key={id} href={`#${id}`} className={cur === id ? 'on' : undefined} aria-current={cur === id ? 'true' : undefined} onClick={() => setMenu(false)}>{name}</a>
  ));
  return (
    <header className="top" id="hdr">
      <div className="frame pad top-in">
        <a className="mark" href="#top" aria-label="Aiden Molyneaux, home"><PixelHeart />AM</a>
        <nav className="links" aria-label="Sections">{links}</nav>
        <a className="ico-btn" href={CONTENT.contact.github} target="_blank" rel="noopener" aria-label="GitHub"><GitHubIcon /></a>
        <button className="ico-btn theme-ico" type="button" data-mode={theme} onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
          <svg className="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        </button>
        <button className="ico-btn menu-btn" type="button" aria-expanded={menu} aria-controls="menu-panel" aria-label="Menu" onClick={() => setMenu(!menu)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 9h16M4 15h16" /></svg>
        </button>
      </div>
      <nav className="frame pad menu-panel" id="menu-panel" aria-label="Sections" hidden={!menu}>{links}</nav>
      <div className="rule" />
    </header>
  );
}
