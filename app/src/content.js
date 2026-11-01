// Everything the page says. This is placeholder copy from the Blueprint mock (mocks/src/content.js and
// mocks/copy-deck.md); the content steps write the real text here.
import headshot from './assets/web/headshot.jpg';
import ingameHomeImg1 from './assets/web/ingameHomeImg1.jpg';
import rsvpImg from './assets/web/RSVPImg.jpg';
import cesImg from './assets/web/CES.jpg';
import searchEngineImg from './assets/web/searchEngine.jpg';
import aiAssessorImg from './assets/web/aiAssessor1.jpg';
import dontSnoozeImg from './assets/web/dontSnoozeImg1.jpg';

export const CONTENT = {
  name: 'Aiden Molyneaux',
  headshot,
  // the line under the name cycles through these, starting with the first
  taglines: [
    'Building tools that build software.',
    'Creating with code. Small details matter.',
    'Designing, Developing, and Experimenting.',
    'Coding makes my heart beat.',
  ],
  role: { title: 'Software Engineer', org: 'Versaterm' },
  place: 'Ottawa, Canada',
  field: 'Public-safety software',
  contact: {
    email: 'aidenmolyneaux@hotmail.com',
    github: 'https://github.com/Aiden-Molyneaux',
    linkedin: 'https://linkedin.com/in/aiden-molyneaux',
    resume: 'Résumé · coming soon',
  },
  // HTML: <b> marks the bold phrases
  about: [
    'I\'m a <b>Software Engineer II</b> at Versaterm in Ottawa. I work on the dispatch software that police, fire and 911 centres use in Canada and the US.',
    'I went from <b>technical support to engineering in under a year</b>, and now I co-lead the pod that owns customer-reported bugs.',
    'I studied Computer Science at Carleton and have worked full-stack since my first co-op. I\'m as comfortable in a Genero backend as in a React front end.',
  ],
  // Stack section: [group, tools], as Aiden trimmed it. Each tool needs a glyph in
  // data/stack-icons.js (a Simple Icons logo, an alias of one, or one of our outline glyphs).
  stack: [
    ['Language', ['TypeScript', 'JavaScript', 'C#', 'Python', 'C++']],
    ['Frontend', ['React', 'React Native', 'Vite', 'Electron', 'WPF']],
    ['Backend & Data', ['Node.js', '.NET', 'PostgreSQL', 'Informix', 'Redis', 'SQLite', 'AWS Lambda']],
    ['AI', ['Claude Code']],
    ['Workflow & Tools', ['Git', 'GitHub', 'GitHub Actions', 'GitLab', 'Jira', 'Docker', 'VMware']],
  ],
  shelfTitle: 'The rest of the household',
  cats: [
    { id: 'tubbin', role: 'senior napper' },
    { id: 'timber', role: 'code reviewer' },
    { id: 'tulip', role: 'pair programmer' },
    { id: 'tonka', role: 'new hire' },
  ],
  experience: [
    { org: 'Versaterm Public Safety', place: 'Ottawa',
      roles: [
        { title: 'Software Engineer II, CAD Engineering', start: '2026-03', end: null, icon: 'code',
          bullets: [
            'Co-lead the Bug pod, where two of us fixed 80+ customer-reported bugs (Aug to Oct 2026).',
            'Built cad-dev-loop, the Claude Code plugin the team works tickets with.',
            'Host "AI in Action: Show and Tell" every other Wednesday.',
            'Rewrote a CAD interface daemon in .NET with Claude Code at the 2026 company hackathon, and presented it to hundreds of people.',
          ],
          tech: ['Claude Code', 'Genero4GL', 'C#/.NET', 'Postgres', 'Informix', 'Redis', 'GitHub'] },
        { title: 'Technical Support II', start: '2025-04', end: '2026-03', icon: 'code',
          bullets: [
            'Resolved 200+ tickets across CAD, MDT, vMobile and VMC (Genero4GL, C#, React).',
            'Spent a year on the 24/7 after-hours rotation: 30+ calls, every one answered.',
            'Trained my own backfill: a two-week technical onboarding with a final project.',
            'Worked directly with police and fire staff, and with every team from Support to Customer Success.',
          ],
          tech: ['Genero4GL', 'C#', 'React', 'Cordova', 'GitLab', 'Zendesk'] },
      ] },
    { org: 'Industrial Electrical & Mechanical', place: 'Ottawa', ended: true,
      roles: [
        { title: 'Industrial Electrical Apprentice (temp)', start: '2024-05', end: '2025-03', icon: 'shield',
          bullets: ['Installed and maintained electrical systems in quarries and wash plants around Ottawa.'],
          tech: ['Field work', 'Industrial electrical'] },
      ] },
    { org: 'Wicket', place: 'Remote', ended: true,
      roles: [
        { title: 'Junior Software Developer', start: '2021-05', end: '2023-11', icon: 'code',
          bullets: [
            'React and Ruby on a SaaS product, from student developer to junior over 2.5 years.',
            'Wrote 90+ Cypress end-to-end tests that run in CI.',
            'Halved load times on several resources with paginated queries.',
          ],
          tech: ['React', 'Ruby', 'Cypress', 'GitHub Actions', 'Python', 'AWS S3'] },
      ] },
  ],
  education: { school: 'Carleton University', initials: 'CU', degree: 'Bachelor of Computer Science', date: 'June 2024',
    note: 'I hold federal and state-level security clearances in Canada and the US.' },
  selected: ['cad-dev-loop', 'inprogress', 'inthink', 'ingame'],
  projects: [
    // tier: 'full' gets a "screenshots to follow" plate when it has no image. link: null means no public repo.
    { id: 'cad-dev-loop', name: 'cad-dev-loop', year: '2026', tier: 'full',
      line: 'A Claude Code plugin for Versaterm’s CAD team. Hand it a Jira ticket and it works the ticket with you from approach to PR. It stops for your sign-off at each step that matters.',
      more: 'Ten-plus skills covering the CAD 8.0 backend, the CAD clients, VMC and the 7.6 line, plus dev reviews, VM troubleshooting, PR bodies, client emails and release-notes fields.',
      tech: ['Claude Code skills', 'SSH', 'Jira', 'GitHub'], tag: 'work project', link: null, image: null },
    { id: 'inprogress', name: 'InProgress', year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A live task tree beside Claude Code. Claude keeps the plan, steps, resources and sessions up to date as it works.',
      more: 'Built for my own Claude Code sessions. I planned and tracked this site\'s redesign in it.',
      tech: ['TypeScript', 'Node 20', 'Vitest', 'Playwright'], tag: 'private repo', link: null, image: null },
    { id: 'inthink', name: 'InThink', year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'My personal assistant app: notes, calendar, finances, fitness and movies in one place.',
      more: 'Single-user and self-hosted, with daily notes and briefings I can check from my phone.',
      tech: ['Fastify', 'TypeScript', 'SQLite', 'React', 'Vite'], tag: 'private repo', link: null, image: null },
    { id: 'ingame', name: 'InGame', year: '2026', tier: 'full',
      line: 'A retro arcade trophy case for the games you play, made for sharing with friends. Version two of my GameStatsApp.',
      more: 'Mobile-first for iOS and Android. Greenfield and docs-first: the spec, contract and design system came before the code.',
      tech: ['Mobile', 'Spec-first'], tag: 'private repo', link: null, image: ingameHomeImg1 },
    { id: 'shipwright', name: 'shipwright', year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A portable toolkit that lets Claude drive an app from day one to launched: spec-first, design-first, robustness-first, with one owner reviewing at a few gates.',
      more: 'Generalized from InGame. A starter kit, reviewer skills, subagent wrappers and a local dashboard.',
      tech: ['Claude Code skills', 'Starter-kit doc graph'], tag: 'private repo', link: null, image: null },
    { id: 'site', name: 'Portfolio site (aidenmolyneaux.com)', year: '2024', start: '2024', ongoing: true, tier: 'full',
      line: 'This site. I first built it in 2024 and redesigned it in 2026.',
      more: 'React and SCSS on Vite, with a small AWS Lambda for the GitHub data. The low-poly heart has been on every version.',
      tech: ['React', 'Vite', 'SCSS', 'AWS Lambda'], tag: null, link: 'https://github.com/Aiden-Molyneaux/Portfolio-Website', image: null },
    { id: 'wedding', name: 'My Wedding Website', year: '2024', tier: 'full',
      line: 'The site our guests used for details and RSVPs. Built with my fiancée, tested on family of every age.',
      more: 'RSVP system backed by an external service, responsive design, and the planning tool for the whole event.',
      tech: ['React'], tag: null, link: 'https://github.com/Aiden-Molyneaux/WeddingSite', image: rsvpImg },
    { id: 'gamestats', name: 'Videogame Statistic Mobile App', year: '2024', tier: 'full',
      line: 'A cross-platform app to log every game you’ve played, sort by purchase date or hours, and keep a profile of your top five. The prototype for InGame.',
      more: 'Built with a friend. React Native with Redux, a Node and Postgres backend, user accounts and a game entry system.',
      tech: ['React Native', 'Node', 'Postgres'], tag: null, link: 'https://github.com/Aiden-Molyneaux/GameStatsApp', image: ingameHomeImg1 },
    { id: 'tokenless', name: 'TokenLess', year: '2026', tier: 'short',
      line: 'A Windows desktop app that rewrites prompts to Claude to be token-efficient. Capture from the clipboard, gear it with Haiku, copy it back.',
      tech: ['Electron', 'better-sqlite3', 'Claude Haiku'], tag: 'private repo', link: null, image: null },
    { id: 'mip', name: 'Mip', year: '2026', tier: 'short',
      line: 'A coding assistant that wraps any OpenAI-compatible chat endpoint with project-aware RAG over your own repos.',
      tech: ['Python', 'FastAPI', 'Ollama', 'Qdrant'], tag: 'private repo', link: null, image: null },
    { id: 'financial-tracker', name: 'Financial Tracker', year: '2025', tier: 'short',
      line: 'A desktop app for monthly financial position snapshots: enter month-end balances, see the change over time.',
      tech: ['WPF', 'C#/.NET', 'Postgres'], tag: 'private repo', link: null, image: null },
    { id: 'ces', name: 'Prototype CES Software', year: '2022', tier: 'short',
      line: 'Led a team building the control software for a prototype medical device, with safety and validation up front.',
      tech: ['C++', 'Qt'], tag: null, link: 'https://github.com/Aiden-Molyneaux/CESdevice-software', image: cesImg },
    { id: 'crawler', name: 'Web Crawler and Search Engine', year: '2022', tier: 'short',
      line: 'A crawler, a RESTful server and a front end that ranks what it finds.',
      tech: ['JavaScript', 'Node', 'MongoDB'], tag: null, link: 'https://github.com/Aiden-Molyneaux/WebCrawler-SearchEngine', image: searchEngineImg },
    { id: 'ai-assessor', name: 'A.I. Image-Text Accessibility Assessor', year: '2023', tier: 'short',
      line: 'Rates how readable the text in an image is, using logistic regression and Tesseract OCR over a diverse dataset.',
      tech: ['Python'], tag: null, link: 'https://github.com/Aiden-Molyneaux/AI-TextAccessibility-Assessor', image: aiAssessorImg },
    { id: 'fitness-club', name: 'Health & Fitness Club Web App', year: '2024', tier: 'short',
      line: 'A full-stack web app for a fitness club: members, trainers, schedules and a Postgres schema designed from scratch.',
      tech: ['React', 'Node', 'Postgres'], tag: null, link: 'https://github.com/Aiden-Molyneaux/HealthFitnessClub-WebApp', image: dontSnoozeImg },
  ],
  alsoMentioned: 'Glimpse, a business idea with Patrick Foley: digitize people’s photos and memorabilia, then store, label and share them with family from a phone.',
  notFound: { title: 'No pulse.', body: 'This page doesn’t exist.', link: 'Back to the homepage' },
};

const thisMonth = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };

// Months between two YYYY-MM strings (end null = this month).
export function monthsBetween(a, b) {
  const [ay, am] = a.split('-').map(Number);
  const [by, bm] = (b || thisMonth()).split('-').map(Number);
  return (by - ay) * 12 + (bm - am);
}
// '7m', '1y', '2.5y'
export function spanLabel(months) {
  if (months < 12) return months + 'm';
  const y = months / 12;
  return (Number.isInteger(y) ? y : y.toFixed(1).replace(/\.0$/, '')) + 'y';
}
// '2026-03' -> '03.2026'
export const monthDot = s => s.split('-').reverse().join('.');
