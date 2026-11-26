# HamApps homepage

The homepage for HamApps, a student-run club that builds apps for the Hamilton College community. It lives at **[hamapps.dev](https://hamapps.dev)** (`www.hamapps.dev` redirects there).

One page with four parts:

- **Hero:** the animated box-cat mascot (click it to make it jump) over falling box-cats, the club's email (click to copy) and a link to the GitHub organization.
- **Our Apps:** a card for each app, grouped by color-coded category, linking to the live site and (when public) its code.
- **Create the Next HamApp:** how to build with the club. The **Submit an App** button is a placeholder for now.
- **Meet the Team:** the roster, grouped into Board, Team Leads and Members, with role filters.

The header's Instagram link is also a placeholder.

## How HamApps is organized

Each app is its own project with its own repo in the [HamAppsDev](https://github.com/HamAppsDev) organization and its own address. This homepage only links to them.

| Site | Address | Repo |
| --- | --- | --- |
| Homepage (this repo) | [hamapps.dev](https://hamapps.dev) | [HamAppsDev/homepage](https://github.com/HamAppsDev/homepage) |
| Hamilton Scheduler | [scheduler.hamapps.dev](https://scheduler.hamapps.dev) | [HamAppsDev/HamiltonScheduler](https://github.com/HamAppsDev/HamiltonScheduler) |
| HamEats | [hameats.app](https://www.hameats.app) | [HamAppsDev/hameats](https://github.com/HamAppsDev/hameats) |

To add a new app: create its repo in the organization, deploy it (a `<name>.hamapps.dev` address is a DNS record in Cloudflare), then add a card for it in `src/data.js`.

## Edit the content

Almost everything on the page comes from **`src/data.js`**:

| What | Where in `src/data.js` |
| --- | --- |
| Contact email (hero, Develop section, footer) | `CONTACT_EMAIL` |
| Apps and categories | `CATEGORIES`: each category has a `name`, `color` and `apps`. Each app has `description`, `open` (live link), `code` (GitHub link, or `null` to hide it), `credits` and `thumb` (which built-in illustration to draw). |
| Team filter pills | `ROLES` |
| Team groups and their order | `GROUPS` (`layout: 'large'` for big cards, like the Board) |
| Team members | `MEMBERS`: `name`, `year`, `group`, `position`, `title`, `roles`, and optionally `github` (username) and `photo` (put the image in `public/` and set `photo: '/name.jpg'`). |

Page text, navigation and the Instagram link are in `index.html`; colors and layout in `src/style.css`.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually http://localhost:5173. Run `npm run build` before pushing to check the production build.

Without Node.js, `python3 preview.py` serves the page at http://127.0.0.1:8765 (no build checks).

## How it's deployed

Every push to `main` runs `.github/workflows/deploy.yml`: it builds the site and runs `npx sst deploy --stage production` (`sst.config.ts`), which puts the built site in a private S3 bucket behind CloudFront at hamapps.dev, with DNS in Cloudflare. GitHub signs in to AWS with the role from `infra/github-deploy-role.yaml` (us-east-2), so no AWS keys are stored in GitHub. The workflow needs the repository variable `AWS_DEPLOY_ROLE_ARN` and the secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_DEFAULT_ACCOUNT_ID` (Settings → Secrets and variables → Actions).

To deploy by hand: put those two Cloudflare values in `.env` (git-ignored), run `eval "$(aws configure export-credentials --profile hamapps --format env)"`, then `npx sst deploy --stage production`.

## Files

| Path | What's in it |
| --- | --- |
| `index.html` | Page structure: header, hero, sections, footer |
| `src/data.js` | All editable content |
| `src/main.js` | Renders the apps and team, the email copy chip and the team filters |
| `src/boxcat.js` | The animated mascot in the hero |
| `src/boxcat-bg.js` | The falling box-cats behind the hero |
| `src/develop-art.js` | The box-cat illustrations on the Develop cards |
| `src/style.css` | All styles |
| `public/` | Logos, icons, `robots.txt`, `sitemap.xml`, and `boxcat.html` (the standalone mascot demo the animations came from) |
| `sst.config.ts`, `infra/` | AWS hosting and the GitHub deploy role |
| `preview.py` | Local preview without Node.js |
