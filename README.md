# HamApps

The website for HamApps, a club of Hamilton College students who build apps for campus life. It has two parts:

1. **Home page**: introduces the club, lists our apps and app ideas, explains how to build with us, and shows the team. It's modeled on the layout of [tigerapps.org](https://tigerapps.org).
2. **HamiltonCourses**: a course planner that combines two tools in one app:
   - **Explore courses**: search and filter the catalog. Each course page shows its description, sections, seats, grading, student evaluations, past terms and student comments.
   - **Build schedule**: add courses to a weekly calendar, pick sections right on the calendar, spot time conflicts, add personal events (practice, work) and keep several schedules per term.

The ideas come from Princeton's [PrincetonCourses](https://github.com/TigerAppsOrg/PrincetonCourses) and [TigerJunction](https://github.com/TigerAppsOrg/tiger-junction). This project does not use their code.

> **Status: front-end rough draft.** All courses, instructors, ratings and comments in `src/data/courses.js` are made-up sample data. The home page's app ideas and team cards are placeholders. Saved courses and schedules are stored only in your own browser. There is no backend yet.

---

## See the demo

You don't need to install anything. You just need [Git](https://git-scm.com/downloads) to download the repo, plus a web browser.

### 1. Clone the repo

Open a terminal (on Windows, use **Git Bash** or **PowerShell**) and run:

```bash
git clone https://github.com/HamApps-Club/HamApps_Project1_Course-Planner.git
```

No Git? On the repo's GitHub page, click the green **Code** button, choose **Download ZIP**, and unzip it.

### 2. Open the demo file

In the folder you just downloaded, open:

```
HamApps_Project1_Course-Planner/demo/index.html
```

Double-click `index.html` and it opens in your web browser. You can also drag the file onto an open browser window.

The site starts on the HamApps home page. Click **Open HamiltonCourses** to get to the course planner.

> The demo is the whole site packed into that one file, so it works straight from your computer. It needs an internet connection only for the fonts.

---

## How to use the schedule builder

- Press **+** on a course in the left panel to add it to the current schedule.
- If the course has more than one section, every option appears on the calendar as a **striped** block. **Click the one you want to keep.** Click it again to bring all the options back.
- Courses in the schedule are listed at the top of the left panel. Use **×** to remove one, **Hide** to hide it from the calendar for now, or click its color dot to change its color.
- Hover over a course in the list to preview its times as dashed outlines on the calendar.
- Conflicting times get a red outline and a **!** badge.

---

## For developers: editing the code

You need [Node.js](https://nodejs.org) version 20 or newer. Choose the LTS download if you're not sure. From the repo folder, run:

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually **http://localhost:5173**. The page reloads by itself whenever you save a file.

**After changing the code, rebuild the demo file** so `demo/index.html` matches, and commit it along with your change:

```bash
npm run build:demo
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build:demo` | Rebuilds `demo/index.html`, the one-file demo |
| `npm run build` | Builds the site into the `dist/` folder, for hosting later |
| `npm run lint` | Checks the code for common mistakes |

### Where things are

| Address | Page |
| --- | --- |
| `index.html` (no `#`) | HamApps home page |
| `index.html#explore` | HamiltonCourses: explore courses |
| `index.html#schedule` | HamiltonCourses: build a schedule |

## Project layout

| Path | What's in it |
| --- | --- |
| `src/Root.jsx` | Chooses between the home page and HamiltonCourses based on the URL |
| `src/home/` | Home page (`Home.jsx`) and its editable content (`content.js`) |
| `src/App.jsx` | HamiltonCourses state: term, schedules, saved courses, current view |
| `src/components/Header.jsx` | HamiltonCourses top bar with the view switcher and term picker |
| `src/components/Sidebar.jsx` | Search, filters, courses in the schedule, saved courses and results |
| `src/components/CourseDetail.jsx` | Course page (Explore view and the pop-out panel on the schedule) |
| `src/components/ScheduleView.jsx` | Weekly calendar, section picking, schedule tabs and personal events |
| `src/data/courses.js` | Sample catalog data |
| `src/lib/` | Time and conflict helpers, rating colors, saved state |
| `src/styles.css` | All styles and color tokens (light and dark mode) |
| `demo/index.html` | The one-file demo, built by `npm run build:demo` |
| `vite.demo.config.js` | Settings for building the one-file demo |
