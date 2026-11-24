# HamApps homepage handoff

Updated November 24, 2026. This handoff covers the **homepage** repository and the `Feature1_Homepage-design` branch. Hamilton Scheduler is a separate project and repository.

## Where the work stands

- Repository: [HamApps-Club/homepage](https://github.com/HamApps-Club/homepage)
- Working branch: `Feature1_Homepage-design`
- Latest homepage change before this document: `a68aa82` — light header, black headings, blue underlines, and the two live app cards.
- The branch was pushed to GitHub. [Vercel reported a successful branch deployment](https://vercel.com/ham-apps/ham-apps-project1-course-planner/F8NNbb5SsQhs4du7DNjJ2TNmZ5Y7). The Vercel project still has an older “course-planner” name, although this repository is the homepage. Open the deployment and select **Visit** to see its preview. The production URL may show `main` until changes are reviewed and merged.
- The homepage is a public directory for club projects. It does not implement Hamilton sign-in; each project handles its own access rules.

## Current page

The site is a small Vite project using HTML, CSS, and JavaScript. `index.html` contains the page sections; `src/style.css` controls the appearance; `src/data.js` contains the app cards, contact address, roles, and placeholder roster; `src/main.js` renders the app and team data and handles the email copy button and role filters.

The current visual direction uses a pale blue-gray header and Our Apps background (`#F5F7FB`), near-black headings (`#171B22`), and blue (`#173A78`) for heading underlines, links, and app-card hover borders. The header displays the transparent navy-and-gold club logo. The browser tab uses the ivory-and-gold logo on a navy square, so it remains visible at small sizes.

**Our Apps** currently shows only:

| Category | App | Destination |
| --- | --- | --- |
| Course Planning | Hamilton Scheduler | <https://scheduler.hamapps.dev/> |
| Campus Life | Hameats | <https://www.hameats.app/> |

The former future-ideas list was removed from this branch. App thumbnails are illustrations generated in `src/main.js`, not screenshots of the live apps.

## Run and edit locally

Use Node.js 20 or newer. In a new workspace, clone the repository first; in an existing clone, start with `cd homepage`:

```bash
git clone https://github.com/HamApps-Club/homepage.git
cd homepage
git switch Feature1_Homepage-design
npm ci
npm run dev
```

Open the local address Vite prints, usually <http://localhost:5173/>. Without Node.js, run `python3 preview.py` from this directory and open <http://127.0.0.1:8765/>. This fallback serves the page but does not run Vite's build checks.

To change an app card, edit `CATEGORIES` in `src/data.js`. `open` is the live URL; `code` is an optional source-code URL; `thumb` selects a placeholder illustration. The contact address is `CONTACT_EMAIL` in the same file. Edit page copy and navigation in `index.html`, and colors/layout in `src/style.css`.

Before sharing a change, run `npm run build` and check the desktop and mobile layouts. In the previous workspace, `npm` was unavailable, so the local build was not run; the JavaScript syntax and links were checked, and Vercel reported the deployment as successful.

## Open work and decisions

1. Review the Feature 1 design on desktop and mobile, including the pale header, heading contrast, logo size, and both app cards.
2. Replace the placeholder team roster in `src/data.js` only after members provide their names, roles, and consent for any photos. The Instagram, “View Data Sources,” and “Submit an App” links are still placeholders.
3. Replace the app thumbnail illustrations with approved screenshots if the teams want product previews.
4. Review the Develop section's example about benefiting a local nonprofit against the club's current constitution, which centers projects on the Hamilton College community.
5. When the team agrees on the design, open a pull request from `Feature1_Homepage-design` to `main`. The HamApps constitution requires a second member to review changes to main code before merge, or the Tech Lead when a project has only one member. Check the production site after the merge/deployment.

Keep the current constitution and any deployment account access in club-owned shared records. Do not put passwords, tokens, or student data in this repository.
