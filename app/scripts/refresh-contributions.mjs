/* eslint-env node */
// Refreshes the bundled contribution calendar (src/data/github-contributions.json) from GitHub's GraphQL API.
// The site renders that file, so this is what keeps the map and the hero's "this week" readout current.
// .github/workflows/refresh-contributions.yml runs it daily and commits the result.
//
//   CONTRIB_TOKEN=<token> npm run refresh:contributions
//
// Environment:
//   CONTRIB_TOKEN  a GitHub token that can read public user data (a fine-grained token with no extra scopes
//                  works); GITHUB_TOKEN or GH_TOKEN are used if it is unset
//   GITHUB_LOGIN   optional, defaults to Aiden-Molyneaux

import { readFile, writeFile } from 'node:fs/promises';

const OUT = new URL('../src/data/github-contributions.json', import.meta.url);
const LOGIN = process.env.GITHUB_LOGIN || 'Aiden-Molyneaux';
const TOKEN = process.env.CONTRIB_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

// Same loose check as isCalendar in src/lib/contrib.js, which Node can't import (it imports the JSON).
const isCalendar = v => Array.isArray(v) && v.length > 300
  && v.every(d => Array.isArray(d) && /^\d{4}-\d{2}-\d{2}$/.test(d[0]) && Number.isFinite(d[1]));

const fail = msg => { console.error(`${msg} The snapshot is unchanged.`); process.exit(1); };

if (!TOKEN) fail('No token: set CONTRIB_TOKEN (or GITHUB_TOKEN / GH_TOKEN).');

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'aidenmolyneaux.com' },
  body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  signal: AbortSignal.timeout(15000),
});
if (!res.ok) fail(`GitHub GraphQL answered ${res.status}.`);
const json = await res.json();
const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
if (!Array.isArray(weeks)) fail(`Unexpected GitHub response: ${JSON.stringify(json?.errors || json).slice(0, 300)}.`);
const days = weeks.flatMap(w => w.contributionDays.map(d => [d.date, d.contributionCount]));
if (!isCalendar(days)) fail('The response is not a contribution calendar.');

const next = JSON.stringify(days);
const prev = await readFile(OUT, 'utf8').catch(() => '');
const total = days.reduce((a, d) => a + d[1], 0);
const range = `${days.length} days, ${days[0][0]} to ${days[days.length - 1][0]}, ${total} contributions`;
if (next === prev) {
  console.log(`Snapshot already current: ${range}.`);
} else {
  await writeFile(OUT, next);
  console.log(`Snapshot refreshed: ${range}.`);
}
