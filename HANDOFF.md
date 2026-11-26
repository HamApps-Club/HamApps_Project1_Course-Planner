# HamApps homepage handoff

Updated November 26, 2026.

## Where the work stands

- The site is live at [hamapps.dev](https://hamapps.dev), deployed from `main` to AWS on every push (see "How it's deployed" in [README.md](README.md)). It is no longer on Vercel.
- **Our Apps** shows Hamilton Scheduler (Course Planning) and HamEats (Campus Life). App pictures are illustrations drawn in `src/main.js`, not screenshots.
- **Meet the Team** lists the Board (President, Vice President, Treasurer, Secretary) and one member. All Team Lead spots are TBD.
- The homepage is a public directory of club projects. It has no sign-in; each app handles its own.

## Open work

1. Add the real Instagram link (`index.html`, search for `insta`) and a destination for **Submit an App** (also in `index.html`).
2. Fill in Team Leads in `src/data.js` once people are chosen. Add names, roles and photos only with each member's consent.
3. Replace the app illustrations with screenshots if the app teams want them.
4. The older branches (`Draft1`, `Draft2`, `Draft3`, `art`, `laughing-lovelace-su929w`) hold earlier design drafts; delete them once nobody needs them.

Changes to `main` need a second member's review before merging (the Tech Lead when a project has only one member), per the HamApps constitution. Keep passwords, tokens and student data out of this repository.
