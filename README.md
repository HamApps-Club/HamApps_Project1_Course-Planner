# HamApps

The website for HamApps, a club of Hamilton College students who build apps for campus life. It has two parts:

1. **Home page**: introduces the club, lists our apps and app ideas, explains how to build with us, and shows the team. It's modeled on the layout of [tigerapps.org](https://tigerapps.org).
2. **HamiltonCourses**: a course planner that combines two tools in one app:
   - **Explore courses**: search and filter the catalog. Each course page shows its description, sections, seats, grading, student evaluations, past terms and student comments.
   - **Build schedule**: add courses to a weekly calendar, pick sections right on the calendar, spot time conflicts, add personal events (practice, work) and keep several schedules per term.

The ideas come from Princeton's [PrincetonCourses](https://github.com/TigerAppsOrg/PrincetonCourses) and [TigerJunction](https://github.com/TigerAppsOrg/tiger-junction). This project does not use their code.

> **Status: front-end rough draft.** All courses, instructors, ratings and comments in `src/data/courses.js` are made-up sample data. The home page's app ideas and team cards are placeholders. Saved courses and schedules are stored only in your own browser. There is no backend yet.

---

## See it in your browser

Pick whichever option is easiest. You don't need to install anything for options 1 or 2.

### Option 1: Open the live site

**https://hamapps-club.github.io/HamApps_Project1_Course-Planner/**

The site rebuilds automatically every time someone pushes to `main`.

> **One-time setup (repo admin only):** the link above works only after GitHub Pages is turned on. Go to the repo's **Settings → Pages**, and under **Build and deployment → Source** choose **GitHub Actions**. Then open the **Actions** tab and re-run the latest "Deploy to GitHub Pages" run, or push any change to `main`.

### Option 2: Run it in a browser tab with GitHub Codespaces

1. On the repo's GitHub page, click the green **Code** button.
2. Open the **Codespaces** tab and click **Create codespace on main**.
3. When the terminal at the bottom is ready, run:
   ```bash
   npm install && npm run dev
   ```
4. Click **Open in Browser** in the pop-up that appears. You can also open the **Ports** tab and click the globe icon next to port 5173.

### Option 3: Run it on your own computer

You need [Node.js](https://nodejs.org) version 20 or newer. Choose the LTS download if you're not sure.

```bash
git clone https://github.com/HamApps-Club/HamApps_Project1_Course-Planner.git
```

```bash
cd HamApps_Project1_Course-Planner
```

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints, usually **http://localhost:5173**. The page reloads by itself whenever you save a file.

### Where things are

| Address | Page |
| --- | --- |
| `/` | HamApps home page |
| `/#explore` | HamiltonCourses: explore courses |
| `/#schedule` | HamiltonCourses: build a schedule |

---

## How to use the schedule builder

- Press **+** on a course in the left panel to add it to the current schedule.
- If the course has more than one section, every option appears on the calendar as a **striped** block. **Click the one you want to keep.** Click it again to bring all the options back.
- Courses in the schedule are listed at the top of the left panel. Use **×** to remove one, **Hide** to hide it from the calendar for now, or click its color dot to change its color.
- Hover over a course in the list to preview its times as dashed outlines on the calendar.
- Conflicting times get a red outline and a **!** badge.

---

## Other commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the finished site into the `dist/` folder |
| `npm run preview` | Serves the built `dist/` folder so you can check it |
| `npm run lint` | Checks the code for common mistakes |

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
| `.github/workflows/deploy.yml` | Publishes the site to GitHub Pages on every push to `main` |
