/* eslint-env node */
// GET /contributions: Aiden's public GitHub contribution calendar as [[date, count], ...], oldest first,
// the same shape as app/src/data/github-contributions.json. The site renders that bundled snapshot first and
// swaps this in when it arrives.
//
// Environment:
//   GITHUB_TOKEN   a GitHub token that can read public user data (a fine-grained token with no extra scopes works)
//   GITHUB_LOGIN   optional, defaults to Aiden-Molyneaux
//   ALLOW_ORIGIN   optional CORS origin, defaults to * (the data is public)
//
// Needs the Node 18+ Lambda runtime for the global fetch. Works behind API Gateway (REST or HTTP API) and
// Lambda function URLs.

const LOGIN = process.env.GITHUB_LOGIN || 'Aiden-Molyneaux';
const TTL_MS = 60 * 60 * 1000;

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

// Kept for the life of a warm Lambda instance; a cold start fetches again.
let cache = null;

const headers = (extra = {}) => ({
  'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
  ...extra,
});
const reply = (statusCode, body, extra) => ({ statusCode, headers: headers(extra), body: JSON.stringify(body) });

async function fetchCalendar() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is not set');
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'aidenmolyneaux.com' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) throw new Error(`Unexpected GitHub response: ${JSON.stringify(json?.errors || json).slice(0, 300)}`);
  return weeks.flatMap(w => w.contributionDays.map(d => [d.date, d.contributionCount]));
}

export const handler = async (event = {}) => {
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const path = event.rawPath || event.path || '/';

  if (method === 'OPTIONS') return { statusCode: 204, headers: headers({ 'Access-Control-Max-Age': '86400' }), body: '' };
  if (!/\/contributions\/?$/.test(path)) return reply(404, { message: 'Not found' });
  if (method !== 'GET') return reply(405, { message: 'Method not allowed' }, { Allow: 'GET, OPTIONS' });

  const now = Date.now();
  if (!cache || now - cache.at > TTL_MS) {
    try {
      cache = { at: now, days: await fetchCalendar() };
    } catch (error) {
      console.error('Contributions fetch failed:', error);
      // a stale calendar beats none; the site falls back to its snapshot when this errors
      if (!cache) return reply(502, { message: 'Could not load contributions' }, { 'Cache-Control': 'no-store' });
      cache.at = now - TTL_MS + 5 * 60 * 1000; // serve the stale one and try GitHub again in five minutes
    }
  }
  const maxAge = Math.max(60, Math.round((TTL_MS - (now - cache.at)) / 1000));
  return reply(200, cache.days, { 'Cache-Control': `public, max-age=${maxAge}` });
};
