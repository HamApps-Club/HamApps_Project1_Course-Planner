# HamApps homepage handoff

Updated November 26, 2026.

## Where the work stands

- The site is live at [hamapps.dev](https://hamapps.dev), deployed from `main` to AWS on every push (see "How it's deployed" in [README.md](README.md)). It is no longer on Vercel.
- **Our Apps** shows Hamilton Scheduler (Course Planning) and HamEats (Campus Life) as two tall cards, each with a screenshot in `public/apps/`.
- **Meet the Team** lists the Board (President, Vice President, Treasurer, Secretary) and one member.
- The homepage is a public directory of club projects. It has no sign-in; each app handles its own.

## Open work

1. Add the real Instagram link (`index.html`, search for `insta`) and a destination for **Join Us** (also in `index.html`).
2. Add new members in `src/data.js`. Add names, roles and photos only with each member's consent.
3. The older branches (`Draft1`, `Draft2`, `Draft3`, `art`, `laughing-lovelace-su929w`) hold earlier design drafts; delete them once nobody needs them.

Changes to `main` need a second member's review before merging (the Tech Lead when a project has only one member), per the HamApps constitution. Keep passwords, tokens and student data out of this repository.
