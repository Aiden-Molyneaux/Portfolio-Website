import React, { useEffect, useState } from 'react';
import './styles/app.scss';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Identity from './components/Identity.jsx';
import Contributions from './components/Contributions.jsx';
import { About, CatShelf, Experience, Footer, NotFound, Projects, Stack } from './components/Sections.jsx';
import { useContributions } from './lib/hooks.js';
import { restBpm, weekTotal } from './lib/contrib.js';
import { mountCats } from './lib/cats.js';
import { CONTENT } from './content.js';

// The old site had five pages; their paths now point at the matching section of the one page.
const LEGACY = { home: '', about: 'about', experience: 'experience', portfolio: 'projects', contact: '' };

function routeFromPath() {
  const path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  const legacy = path.match(/^\/(home|about|experience|portfolio|contact)(\/\d+)?$/);
  if (legacy) {
    const id = LEGACY[legacy[1]];
    window.history.replaceState(null, '', '/' + (id ? '#' + id : ''));
    return 'home';
  }
  return 'notFound';
}

const Rule = () => <div className="rule" />;
const Band = () => <><Rule /><div className="hatch" /><Rule /></>;

export default function App() {
  const [route, setRoute] = useState(routeFromPath);
  const days = useContributions();
  const notFound = route === 'notFound';

  useEffect(() => {
    document.title = notFound ? 'Page not found · Aiden Molyneaux' : 'Aiden Molyneaux';
  }, [notFound]);

  // the page renders after the browser's own jump to #section, so make that jump once it exists,
  // and again once the web fonts have settled the layout
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const jump = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
    jump();
    document.fonts?.ready.then(jump);
  }, []);

  useEffect(() => {
    const q = s => document.querySelector(s);
    return mountCats({
      anchors: { tubbin: { el: q('#meta'), x: 0.86 }, timber: { el: q('#experience .sec-h'), x: 0.42 }, tulip: { el: q('#projects .sec-h'), x: 0.36 } },
      bottom: q('#foot'),
      roles: Object.fromEntries(CONTENT.cats.map(c => [c.id, c.role])),
    });
  }, []);

  const goHome = () => {
    window.history.pushState(null, '', '/');
    setRoute('home');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Header />
      <main className="frame" id="top">
        <Hero rest={restBpm(days)} week={weekTotal(days)} flat={notFound} />
        <Identity />
        <Rule />
        <div className="pad"><Contributions days={days} /></div>
        <Band />
        <About />
        <Rule />
        <CatShelf />
        <Band />
        <Stack />
        <Band />
        <Experience />
        <Band />
        <Projects />
        <Band />
        <Footer />
      </main>
      {notFound && <NotFound onHome={goHome} />}
    </>
  );
}
