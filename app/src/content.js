// Everything the page says. This is placeholder copy from the Blueprint mock (mocks/src/content.js and
// mocks/copy-deck.md); the content steps write the real text here.
import inprogressIcon from './assets/icons/inprogress.png';
import ingameIcon from './assets/icons/ingame.png';
import inthinkIcon from './assets/icons/inthink.png';
import tokenlessIcon from './assets/icons/tokenless.png';
import shipwrightIcon from './assets/icons/shipwright.png';
import weddingIcon from './assets/icons/wedding.png';
import versatermIcon from './assets/icons/versaterm.png';
import wicketIcon from './assets/icons/wicket.png';
import carletonIcon from './assets/icons/carleton.png';
import iemIcon from './assets/icons/iem.png';
import headshot from './assets/web/headshot.jpg';
import inprogressDesktop from './assets/web/inprogressDesktop.jpg';
import inprogressSplit from './assets/web/inprogressSplit.jpg';
import ingameCollection from './assets/web/ingameCollection.jpg';
import ingameGame from './assets/web/ingameGame.jpg';
import ingameFriends from './assets/web/ingameFriends.jpg';
import inthinkHub from './assets/web/inthinkHub.jpg';
import inthinkPhone from './assets/web/inthinkPhone.jpg';
import tokenlessDrawer from './assets/web/tokenlessDrawer.jpg';
import financialTracker from './assets/web/financialTracker.jpg';
import portfolioBefore from './assets/web/portfolioBefore.jpg';
import portfolioAfter from './assets/web/portfolioAfter.jpg';
import rsvpImg from './assets/web/RSVPImg.jpg';
import aiAssessorImg from './assets/web/aiAssessor1.jpg';
import dontSnoozeImg from './assets/web/dontSnoozeImg1.jpg';

// a screenshot with its pixel size, so a row of them can share one height
const shot = (src, w, h, alt) => ({ src, w, h, alt });

export const CONTENT = {
  name: 'Aiden Molyneaux',
  headshot,
  // the line under the name cycles through these, starting with the first
  taglines: [
    'Building tools that build software.',
    'Designing, Developing, and Experimenting.',
    'When building something big, small details matter.',
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
    'I\'m a <b>Software Engineer II</b> at Versaterm in Ottawa. I work on the computer-aided dispatch software that 911 centres (police, fire, EMS) use in Canada and the US, and I hold federal and state-level security clearances in both countries.',
    'I went from <b>technical support to engineering in under a year</b>, and now I co-lead the pod that owns customer-reported bugs.',
    'I studied Computer Science at Carleton and have worked full-stack since my first co-op. I\'m as comfortable in a .NET backend as in a React frontend.',
  ],
  // Stack section: [group, tools], as Aiden trimmed it. Each tool needs a glyph in
  // data/stack-icons.js (a Simple Icons logo, an alias of one, or one of our outline glyphs).
  stack: [
    ['Language', ['JavaScript', 'TypeScript', 'C#', 'Python', 'C++']],
    ['Frontend', ['React', 'React Native', 'Vite', 'Electron', 'WPF']],
    ['Backend & Data', ['Node.js', '.NET', 'PostgreSQL', 'Informix', 'Redis', 'SQLite', 'AWS Lambda']],
    ['AI', ['Claude Code']],
    ['Workflow & Tools', ['Git', 'GitHub', 'GitHub Actions', 'Jira', 'Zendesk', 'Docker', 'VMware']],
  ],
  shelfTitle: 'The rest of the household',
  cats: [
    { id: 'tubbin', role: 'senior napper' },
    { id: 'timber', role: 'code reviewer' },
    { id: 'tulip', role: 'pair programmer' },
    { id: 'tonka', role: 'new hire' },
  ],
  experience: [
    { org: 'Versaterm Public Safety', icon: versatermIcon, place: 'Ottawa',
      roles: [
        { title: 'Software Engineer II', start: '2026-03', end: null, icon: 'code',
          bullets: [
            'Co-lead a two-person pod fixing customer-reported bugs, with 80+ fixed in three months.',
            'Built cad-dev-loop, the Claude Code plugin my team uses to work tickets.',
            'Host a show-and-tell on working with AI every other week.',
            'Rewrote a legacy interface service in .NET with Claude Code at the 2026 company hackathon, then presented it to the whole company.',
          ],
          tech: ['Claude Code', 'C#/.NET', 'Genero4GL', 'Postgres', 'Informix', 'Redis', 'GitHub', 'Jira'] },
        { title: 'Technical Support II', start: '2025-04', end: '2026-03', icon: 'code',
          bullets: [
            'Resolved 200+ tickets across the desktop, mobile and messaging products.',
            'Spent a year on the 24/7 after-hours rotation and answered 30+ calls.',
            'Trained my own backfill with a two-week technical onboarding that ended in a final project.',
            'Worked directly with police and fire staff, and with every internal team, including Customer Success, Deployments, and Engineering.',
          ],
          tech: ['C#', 'React', 'Genero4GL', 'GitHub', 'Zendesk'] },
      ] },
    { org: 'Industrial Electrical & Mechanical', icon: iemIcon, iconFill: true, place: 'Ottawa', ended: true,
      roles: [
        { title: 'Industrial Electrical Apprentice', start: '2024-05', end: '2025-03', icon: 'shield',
          bullets: ['Installed and maintained electrical systems in quarries and wash plants around Ottawa.'],
          tech: ['Field work', 'Industrial electrical'] },
      ] },
    { org: 'Wicket', icon: wicketIcon, place: 'Remote', ended: true,
      roles: [
        { title: 'Junior Software Developer', start: '2021-05', end: '2023-11', icon: 'code',
          bullets: [
            'React and Ruby on a SaaS product, from student developer to junior over 2.5 years.',
            'Wrote and maintained a suite of 90+ Cypress end-to-end tests that run in CI.',
            'Halved load times on several resources with paginated queries.',
          ],
          tech: ['React', 'Ruby', 'Cypress', 'GitHub Actions', 'Python', 'AWS S3'] },
      ] },
  ],
  education: { school: 'Carleton University', icon: carletonIcon, initials: 'CU', degree: 'Bachelor of Computer Science', date: 'June 2024' },
  selected: ['cad-dev-loop', 'inprogress', 'ingame', 'shipwright'],
  projects: [
    // icon: the app's own icon ('heart' is the site's pixel heart), iconPad for marks that need the tile behind them;
    // shots: screenshots, laid out in one row at equal height. link: null means no public repo;
    // demo: a live URL, shown as a second icon. Order: the selected four, then newest first.
    { id: 'cad-dev-loop', name: 'cad-dev-loop', year: '2026', tier: 'full',
      line: 'A Claude Code plugin my engineering team uses to work tickets. Hand it a ticket and it works through it with you, from the approach to the pull request, and stops for your sign-off before each big decision.',
      more: 'More than ten skills for our backend, desktop clients and messaging services, plus code review, test-environment troubleshooting, pull request descriptions, client emails and release notes.',
      tech: ['Claude Code skills', 'SSH', 'Jira', 'GitHub'], tag: 'work project', link: null, shots: [] },
    { id: 'inprogress', name: 'InProgress', icon: inprogressIcon, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A local command centre for running several Claude Code sessions across projects at once. One window holds each project’s plan: what’s waiting on me, what’s in flight and which session owns it, what’s queued next, and what’s finished. Claude updates it as it works.',
      more: 'I built it for my own development work once parallel sessions started losing track of each other in chat scroll-back. Hooks brief each session as it starts. A background scribe agent records progress through an MCP server, and an orchestrator session reviews what changed and assigns the next steps. I planned and tracked this site’s redesign in it.',
      tech: ['TypeScript', 'Fastify', 'SQLite', 'React', 'MCP', 'Playwright'], tag: null, link: 'https://github.com/Aiden-Molyneaux/InProgress', shots: [shot(inprogressDesktop, 1600, 1000, 'The InProgress board in a wide window'), shot(inprogressSplit, 520, 1000, 'The InProgress board in the narrow window beside Claude')] },
    { id: 'ingame', name: 'InGame', icon: ingameIcon, year: '2024', start: '2024', ongoing: true, tier: 'full',
      line: 'A retro arcade trophy case for the games you play, to share with friends. I started it in 2024 as GameStatsApp, a React Native prototype I built with a friend.',
      more: 'Version two is mobile-first, for iOS and Android. The spec, contract and design system all came before the code.',
      tech: ['React Native', 'Expo', 'Express', 'Postgres', 'Drizzle'], tag: 'private repo', link: null, shots: [shot(ingameCollection, 390, 844, 'The InGame collection'), shot(ingameGame, 390, 844, 'A game page in InGame'), shot(ingameFriends, 390, 844, 'Friends and activity in InGame')] },
    { id: 'shipwright', name: 'shipwright', icon: shipwrightIcon, iconPad: true, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A portable toolkit that lets Claude drive new software projects from day one to launched: spec-first, design-first, robustness-first, with one owner reviewing at a few gates.',
      more: 'Generalized from InGame. A starter kit, reviewer skills, subagent wrappers and a local dashboard.',
      tech: ['Claude Code skills', 'Starter-kit doc graph'], tag: null, link: 'https://github.com/Aiden-Molyneaux/shipwright', shots: [] },
    { id: 'inthink', name: 'InThink', icon: inthinkIcon, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'My personal assistant app: notes, calendar, finances, fitness and movies in one place.',
      more: 'Single-user and self-hosted, with daily notes and briefings I can check from my phone.',
      tech: ['Fastify', 'TypeScript', 'SQLite', 'React', 'Vite'], tag: 'private repo', link: null, shots: [shot(inthinkHub, 1440, 900, 'The InThink hub on a desktop'), shot(inthinkPhone, 390, 844, 'The InThink hub on a phone')] },
    { id: 'tokenless', name: 'TokenLess', icon: tokenlessIcon, iconPad: true, year: '2026', tier: 'short',
      line: 'A Windows app that sits next to Claude Code and looks over a prompt before you send it. Haiku rewrites it so Claude knows how long the answer should be and what shape it should take, because the answer is where the tokens go.',
      tech: ['Electron', 'better-sqlite3', 'Claude Haiku'], tag: null, link: 'https://github.com/Aiden-Molyneaux/tokenless', shots: [shot(tokenlessDrawer, 720, 900, 'A prompt geared in TokenLess, original beside the rewrite')] },
    { id: 'mip', name: 'Mip', year: '2026', tier: 'short',
      line: 'A small server that gives a coding agent an OpenAI-compatible endpoint backed by a model running in Ollama on my own machine. It adds the relevant code and docs from my project to every request.',
      tech: ['Python', 'FastAPI', 'Ollama', 'Qdrant'], tag: null, link: 'https://github.com/Aiden-Molyneaux/mip', shots: [] },
    { id: 'financial-tracker', name: 'Financial Tracker', year: '2025', tier: 'short',
      line: 'A desktop app for monthly financial position snapshots: enter month-end balances, see the change over time.',
      tech: ['WPF', 'C#/.NET', 'Postgres'], tag: 'private repo', link: null, shots: [shot(financialTracker, 1280, 800, 'A month of balances in Financial Tracker')] },
    { id: 'site', name: 'Portfolio site (aidenmolyneaux.com)', icon: 'heart', iconPad: true, year: '2024', start: '2024', ongoing: true, tier: 'full',
      line: 'This site. I first built it in 2024 and redesigned it in 2026.',
      more: 'React and SCSS on Vite, with a small AWS Lambda for the GitHub data. The low-poly heart has been on every version.',
      tech: ['React', 'Vite', 'SCSS', 'AWS Lambda'], tag: null, link: 'https://github.com/Aiden-Molyneaux/Portfolio-Website', shots: [shot(portfolioBefore, 1440, 900, 'The site before the 2026 redesign'), shot(portfolioAfter, 1440, 900, 'The site after the 2026 redesign')] },
    { id: 'wedding', name: 'My Wedding Website', icon: weddingIcon, year: '2024', tier: 'full',
      line: 'The site our guests used for details and RSVPs. Designed with my fiancée.',
      more: 'RSVP system backed by an external service, responsive design, and the planning tool for the whole event.',
      tech: ['React'], tag: null, link: 'https://github.com/Aiden-Molyneaux/WeddingSite', shots: [shot(rsvpImg, 600, 450, 'The RSVP page')] },
    { id: 'fitness-club', name: 'Health & Fitness Club Web App', year: '2024', tier: 'short',
      line: 'A full-stack web app for a fitness club: members, trainers, schedules and a Postgres schema designed from scratch.',
      tech: ['React', 'Node', 'Postgres'], tag: null, link: 'https://github.com/Aiden-Molyneaux/HealthFitnessClub-WebApp', shots: [shot(dontSnoozeImg, 600, 730, 'The fitness club app')] },
    { id: 'ai-assessor', name: 'A.I. Image-Text Accessibility Assessor', year: '2023', tier: 'short',
      line: 'Rates how readable the text in an image is, using logistic regression and Tesseract OCR over a diverse dataset.',
      tech: ['Python'], tag: null, link: 'https://github.com/Aiden-Molyneaux/AI-TextAccessibility-Assessor', shots: [shot(aiAssessorImg, 600, 535, 'The accessibility assessor')] },
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
