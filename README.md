# aidenmolyneaux.com

My portfolio site, live at https://aidenmolyneaux.com. It's a single page built with React 18, SCSS and Vite 5.

## Run it locally

I use Node 20.

```bash
git clone https://github.com/Aiden-Molyneaux/Portfolio-Website.git
cd Portfolio-Website/app
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

`npm run build` writes the site to `app/dist`, `npm run preview` serves that build, and `npm run lint` runs ESLint.

## Where things are

- `app/src/content.js`: all the copy on the page
- `app/src/components/`: the page sections
- `app/src/styles/`: the SCSS, with colour tokens in `_tokens.scss`

## Contribution map

The GitHub contribution map renders from a snapshot, `app/src/data/github-contributions.json`. The `Refresh contributions` Action (`.github/workflows/refresh-contributions.yml`) rewrites that file every day at 09:17 UTC and commits it if it changed. The Action needs a repository secret named `CONTRIB_TOKEN`, a GitHub token that can read public user data.

To refresh it by hand from `app/`:

```bash
CONTRIB_TOKEN=<token> npm run refresh:contributions
```

## Deployment

Cloudflare Pages builds the site and deploys every push to `master`. Other branches get preview deployments. The project uses root directory `app`, build command `npm run build`, output directory `dist`, and `NODE_VERSION` set to `20`.
