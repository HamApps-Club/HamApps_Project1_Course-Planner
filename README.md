# HamApps homepage

The homepage for HamApps, a student-run club that builds apps for the Hamilton College community. It lives at **[hamapps.dev](https://hamapps.dev)**. The layout follows the [TigerApps](https://tigerapps.org) homepage: a hero with floating shapes, color-coded app categories, a "Build with us" section and a filterable team roster.

> **Status: sample.** The contact email, Instagram link, team roster and most apps are placeholders. Hamilton Scheduler is the club's first real project; the other apps are ideas marked "Coming soon".

## How HamApps is organized

Each app is its own project with its own repo in the [HamApps-Club](https://github.com/HamApps-Club) organization and its own subdomain of `hamapps.dev`. This homepage only links to them.

| Site | Address | Repo |
| --- | --- | --- |
| Homepage (this repo) | [hamapps.dev](https://hamapps.dev) | [HamApps-Club/homepage](https://github.com/HamApps-Club/homepage) |
| Hamilton Scheduler | [scheduler.hamapps.dev](https://scheduler.hamapps.dev) | [HamApps-Club/HamiltonScheduler](https://github.com/HamApps-Club/HamiltonScheduler) |

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

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually http://localhost:5173.

## Deploy

On Vercel, import the repo with the **Vite** framework preset. The build command is `npm run build`, and the output folder is `dist`.

## Files

| Path | What's in it |
| --- | --- |
| `index.html` | Page structure: header, hero, sections, footer |
| `src/data.js` | All editable content |
| `src/main.js` | Renders apps and team, email copy chip, blob parallax, logo spin, team filters |
| `src/style.css` | All styles |
| `public/logo.svg` | HamApps logo (placeholder) |
