// Everything the page says.
import inprogressIcon from './assets/icons/inprogress.png';
import ingameIcon from './assets/icons/ingame.png';
import inthinkIcon from './assets/icons/inthink.png';
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
    '911 dispatch software, and the AI tools my team builds it with.',
  ],
  role: { title: 'Software Engineer II', org: 'Versaterm Public Safety' },
  place: 'Ottawa, Canada',
  field: 'Public-safety software',
  contact: {
    email: 'aidenmolyneaux@hotmail.com',
    github: 'https://github.com/Aiden-Molyneaux',
    linkedin: 'https://linkedin.com/in/aiden-molyneaux',
    resume: { label: 'Résumé', note: 'PDF, one page', href: '/AidenMolyneaux_Resume.pdf' },
  },
  // HTML: <b> marks the bold phrases
  about: [
    'I’m a <b>Software Engineer II</b> at Versaterm in Ottawa. I work on the computer-aided dispatch software that 911 centres (police, fire, EMS) use in Canada and the US. I hold Reliability status (PSPC) in Canada and CJIS clearance in 20+ US states.',
    'I went from <b>technical support to engineering in under a year</b>, and now I co-lead the team that fixes customer-reported bugs.',
    'I studied Computer Science at Carleton and have worked full stack since my first co-op. At Versaterm that means Genero4GL and C#; on my own projects it’s mostly TypeScript and React.',
    'I build most of my projects with Claude Code. I write the spec and decide what gets built, and I overrule it when it over-engineers or heads the wrong way. shipwright and cad-dev-loop are the two tools I built to work that way: both make Claude stop for my sign-off before each big decision.',
  ],
  // Stack section: [group, tools], as Aiden trimmed it. Each tool needs a glyph in
  // data/stack-icons.js (a Simple Icons logo, an alias of one, or one of our outline glyphs).
  stack: [
    ['Languages', ['TypeScript', 'JavaScript', 'C#', 'Python', 'Ruby', 'SQL']],
    ['Frontend', ['React', 'React Native', 'Expo', 'WPF']],
    ['Backend & Data', ['Node.js', '.NET', 'Ruby on Rails', 'PostgreSQL', 'Informix', 'SQLite', 'Redis', 'AWS']],
    ['AI tooling', ['Claude Code', 'Claude API', 'MCP']],
    ['Tools', ['Git', 'GitHub', 'GitHub Actions', 'Jira', 'Docker', 'Cypress', 'Playwright']],
  ],
  shelfTitle: 'The rest of the household',
  cats: [
    { id: 'tubbin', role: 'senior napper' },
    { id: 'timber', role: 'code reviewer' },
    { id: 'tulip', role: 'pair programmer' },
    { id: 'tonka', role: 'new hire' },
  ],
  experience: [
    { org: 'Versaterm Public Safety', icon: versatermIcon, place: 'Ottawa, Canada',
      roles: [
        { title: 'Software Engineer II', start: '2026-03', end: null, icon: 'code',
          bullets: [
            'Co-lead a two-person team on customer-reported bugs: 80+ fixed in three months.',
            'Built cad-dev-loop, the Claude Code plugin my team uses to take a ticket from approach to pull request.',
            'Host a show-and-tell every other week on working with AI.',
            'Rebuilt a legacy interface service in .NET at our 2026 hackathon, with Claude Code. It shipped in the product, and I presented it to the whole company.',
          ],
          tech: ['Claude Code', 'C#/.NET', 'Genero4GL', 'PostgreSQL', 'Informix', 'Redis', 'GitHub', 'Jira'] },
        { title: 'Technical Support II', start: '2025-04', end: '2026-03', icon: 'code',
          bullets: [
            'Resolved 200+ tickets across the desktop, mobile and messaging products.',
            'Covered the after-hours on-call rotation and took 30+ calls.',
            'Trained my replacement with a two-week technical onboarding that ended in a final project.',
            'Worked directly with police and fire staff, and with every internal team, including Customer Success, Deployments and Engineering.',
          ],
          tech: ['C#', 'React', 'Genero4GL', 'GitHub', 'Zendesk'] },
      ] },
    { org: 'Industrial Electrical & Mechanical', icon: iemIcon, iconFill: true, place: 'Ottawa, Canada', ended: true,
      roles: [
        { title: 'Industrial Electrical Apprentice', start: '2024-05', end: '2025-03', icon: 'shield',
          bullets: [
            'A planned stint in the family electrical business between software roles.',
            'Installed and maintained electrical systems in quarries and wash plants around Ottawa.',
          ],
          tech: [] },
      ] },
    { org: 'Wicket', icon: wicketIcon, place: 'Remote', ended: true,
      roles: [
        { title: 'Junior Software Developer', start: '2021-05', end: '2023-11', icon: 'code',
          bullets: [
            'Built features in React and Ruby for a SaaS platform that associations across Canada and the US use to manage member data.',
            'Started as an 8-month co-op, then stayed on as a junior developer while I finished school.',
            'Wrote and maintained 90+ Cypress end-to-end tests that ran in CI.',
            'Sped up the Organizations and People resources, which hold up to hundreds of thousands of records, by paginating their queries.',
          ],
          tech: ['React', 'Ruby', 'Cypress', 'GitHub Actions', 'Python', 'AWS S3'] },
      ] },
  ],
  education: { school: 'Carleton University', icon: carletonIcon, initials: 'CU', degree: 'Bachelor of Computer Science', date: '06.2024' },
  selected: ['cad-dev-loop', 'ingame', 'inprogress', 'inthink'],
  projects: [
    // icon: the app's own icon ('heart' is the site's pixel heart), iconPad for marks that need the tile behind them;
    // shots: screenshots, laid out in one row at equal height. link: null means no public repo;
    // demo: a live URL, shown as a second icon. Order: the selected four, then newest first.
    { id: 'cad-dev-loop', name: 'cad-dev-loop', year: '2026', tier: 'full',
      line: 'A Claude Code plugin my engineering team uses to work tickets. Hand it a ticket and it works through it with you, from the approach to the pull request, and stops for your sign-off before each big decision.',
      more: 'More than ten skills for our backend, desktop clients and messaging services, plus code review, test-environment troubleshooting, pull request descriptions, client emails and release notes.',
      tech: ['Claude Code', 'Jira', 'GitHub'], tag: 'work project', link: null, shots: [] },
    { id: 'ingame', name: 'InGame', icon: ingameIcon, year: '2024', start: '2024', ongoing: true, tier: 'full',
      line: 'An iOS and Android app for collecting and sharing the games you play, styled as a retro arcade trophy case. It started in 2024 as GameStatsApp, a React Native prototype I made with a friend.',
      more: 'Version two is pre-beta and built with shipwright. The spec, contract and design system all came before the code.',
      tech: ['React Native', 'Expo', 'Express', 'PostgreSQL', 'Drizzle'], tag: 'private repo', link: null, shots: [shot(ingameCollection, 390, 844, 'The InGame collection'), shot(ingameGame, 390, 844, 'A game page in InGame'), shot(ingameFriends, 390, 844, 'Friends and activity in InGame')] },
    { id: 'inprogress', name: 'InProgress', icon: inprogressIcon, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A local dashboard for running several Claude Code sessions across projects at once. One window shows each project’s plan: what’s waiting on me, what’s in progress and which session owns it, what’s next and what’s done. Claude updates it as it works.',
      more: 'It started when parallel sessions began losing track of each other in chat scrollback. Each session gets a briefing when it starts. A background agent records progress as it works. A lead session reviews what changed and hands out the next steps. I built it with shipwright, and I planned and tracked this site’s redesign in it.',
      tech: ['TypeScript', 'Fastify', 'SQLite', 'React', 'MCP', 'Playwright'], tag: null, link: 'https://github.com/Aiden-Molyneaux/InProgress', shots: [shot(inprogressDesktop, 1600, 1000, 'The InProgress board in a wide window'), shot(inprogressSplit, 520, 1000, 'The InProgress board in the narrow window beside Claude')] },
    { id: 'inthink', name: 'InThink', icon: inthinkIcon, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'My personal assistant app: notes, calendar, finances, fitness and movies in one place, with daily notes and briefings I check from my phone.',
      more: 'Single-user and built with shipwright. One container on Railway serves the Fastify API and the React build, with SQLite on a persistent volume.',
      tech: ['Fastify', 'TypeScript', 'SQLite', 'React', 'Vite'], tag: 'private repo', link: null, shots: [shot(inthinkHub, 1440, 900, 'The InThink hub on a desktop'), shot(inthinkPhone, 390, 844, 'The InThink hub on a phone')] },
    { id: 'shipwright', name: 'shipwright', icon: shipwrightIcon, iconPad: true, year: '2026', start: '2026', ongoing: true, tier: 'full',
      line: 'A toolkit I pulled out of InGame for starting new projects with Claude Code. It comes with starter spec, contract and design docs. Reviewer skills check the design, the running app and the code before I see them, and I sign off at set gates.',
      more: 'I built InGame, InThink and InProgress with it.',
      tech: ['Claude Code'], tag: null, link: 'https://github.com/Aiden-Molyneaux/shipwright', shots: [] },
    { id: 'mip', name: 'Mip', year: '2026', tier: 'short',
      line: 'A small server that gives a coding agent an OpenAI-compatible endpoint with retrieval over my own repos. It embeds code and docs locally with Ollama and stores them in Qdrant. Chat goes to a hosted model, or to a local one when code shouldn’t leave the machine.',
      tech: ['Python', 'FastAPI', 'Ollama', 'Qdrant'], tag: null, link: 'https://github.com/Aiden-Molyneaux/mip', shots: [] },
    { id: 'financial-tracker', name: 'Financial Tracker', year: '2025', tier: 'short',
      line: 'A desktop app for a monthly snapshot of my finances: enter month-end balances and see how they change over time.',
      tech: ['WPF', 'C#/.NET', 'PostgreSQL'], tag: 'private repo', link: null, shots: [shot(financialTracker, 1280, 800, 'A month of balances in Financial Tracker')] },
    { id: 'site', name: 'Portfolio Site (aidenmolyneaux.com)', icon: 'heart', iconPad: true, year: '2024', start: '2024', ongoing: true, tier: 'full',
      line: 'This site. I first built it in 2024 and redesigned it in 2026.',
      more: 'React and SCSS on Vite, with a small AWS Lambda for the GitHub data. The low-poly heart has been on every version.',
      tech: ['React', 'Vite', 'SCSS', 'AWS Lambda'], tag: null, link: 'https://github.com/Aiden-Molyneaux/Portfolio-Website', shots: [shot(portfolioBefore, 1440, 900, 'The site before the 2026 redesign'), shot(portfolioAfter, 1440, 900, 'The site after the 2026 redesign')] },
    { id: 'wedding', name: 'Wedding Website', icon: weddingIcon, year: '2024', tier: 'full',
      line: 'The site our guests used for details and RSVPs. I designed it with my wife.',
      more: 'I built the RSVP system myself, along with the tool we used to plan the whole event.',
      tech: ['React'], tag: null, link: 'https://github.com/Aiden-Molyneaux/WeddingSite', shots: [shot(rsvpImg, 600, 450, 'The RSVP page')] },
    { id: 'fitness-club', name: 'Health & Fitness Club Web App', year: '2024', tier: 'short',
      line: 'A full-stack web app that manages a fitness club’s members, trainers and schedules. I designed its PostgreSQL schema from scratch.',
      tech: ['React', 'Node.js', 'PostgreSQL'], tag: null, link: 'https://github.com/Aiden-Molyneaux/HealthFitnessClub-WebApp', shots: [shot(dontSnoozeImg, 600, 730, 'The fitness club app')] },
    { id: 'ai-assessor', name: 'AI Image-Text Accessibility Assessor', year: '2023', tier: 'short',
      line: 'A model that rates how readable the text in an image is. It combines Tesseract OCR with logistic regression trained on a diverse dataset.',
      tech: ['Python'], tag: null, link: 'https://github.com/Aiden-Molyneaux/AI-TextAccessibility-Assessor', shots: [shot(aiAssessorImg, 600, 535, 'The accessibility assessor')] },
  ],
  alsoMentioned: 'Glimpse, a business idea with Patrick Foley that digitizes people’s photos and memorabilia so families can store, label and share them from a phone.',
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
