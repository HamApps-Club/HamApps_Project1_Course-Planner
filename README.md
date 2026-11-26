# HamApps homepage

The homepage for HamApps, a student-run club that builds apps for the Hamilton College community. It lives at **[hamapps.dev](https://hamapps.dev)**. The layout follows the [TigerApps](https://tigerapps.org) homepage: a hero with floating shapes, color-coded app categories, a "Build with us" section and a filterable team roster.

> **Status: in progress.** The Instagram link and team roster are placeholders. The two app cards link to Hamilton Scheduler and Hameats. See [HANDOFF.md](HANDOFF.md) for the current Feature 1 status and next steps.

## How HamApps is organized

Each app is its own project with its own repo in the [HamAppsDev](https://github.com/HamAppsDev) organization and its own subdomain of `hamapps.dev`. This homepage only links to them.

| Site | Address | Repo |
| --- | --- | --- |
| Homepage (this repo) | [hamapps.dev](https://hamapps.dev) | [HamAppsDev/homepage](https://github.com/HamAppsDev/homepage) |
| Hamilton Scheduler | [scheduler.hamapps.dev](https://scheduler.hamapps.dev) | [HamAppsDev/HamiltonScheduler](https://github.com/HamAppsDev/HamiltonScheduler) |
| Hameats | [hameats.app](https://hameats.app) | Separate app; source repository is not linked here |

To add a new app: create its repo in the organization, deploy it, point a new `<name>.hamapps.dev` record in Cloudflare DNS at the host, then add a card for it in `src/data.js`.

## Edit the content

Almost everything on the page comes from **`src/data.js`**:

| What | Where in `src/data.js` |
| --- | --- |
| Contact email | `CONTACT_EMAIL` |
| Apps and categories | `CATEGORIES` (name, color, apps). Each app has `open` (live link) and `code` (GitHub link). |
| Team filter pills | `ROLES` |
| Team members | `MEMBERS`. Put photos in `public/` and set `photo: '/name.jpg'`. |

The Instagram link is in `index.html` (search for `insta`).
The current “Our Apps” section contains the two linked projects above.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually http://localhost:5173.

For a quick local preview without Node.js, run `python3 preview.py` in this folder and open http://127.0.0.1:8765. This serves the same image paths that Vite serves from `public/`.

## Deploy

On Vercel, import the repo with the **Vite** framework preset. The build command is `npm run build`, and the output folder is `dist`.

## Files

| Path | What's in it |
| --- | --- |
| `index.html` | Page structure: header, hero, sections, footer |
| `src/data.js` | All editable content |
| `src/main.js` | Renders apps and team, email copy chip, and team filters |
| `src/style.css` | All styles |
| `public/hamapps-logo.png` | Navy and gold HamApps logo on transparent background for the header |
| `public/hamapps-logo-on-navy.png` | Ivory and gold HamApps logo on navy for the browser tab icon |
| `preview.py` | Local homepage preview without Node.js |

The Feature 1 homepage uses a pale blue-gray header and Our Apps background, black headings, blue underlines, and navy and muted gold accents.

The homepage shows the club contact address in the hero and footer. Set it once with `CONTACT_EMAIL` in `src/data.js`.
