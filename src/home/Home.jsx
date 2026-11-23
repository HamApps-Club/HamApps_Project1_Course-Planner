import { useState } from 'react'
import { APP_GROUPS, CRITERIA, REPO_URL, TEAM, TEAM_FILTERS } from './content.js'

export default function Home() {
  const [teamFilter, setTeamFilter] = useState('All')
  const team = TEAM.filter((m) => teamFilter === 'All' || m.group === teamFilter)

  return (
    <div className="home">
      <header className="home-nav">
        <div className="home-wrap home-nav-inner">
          <a className="home-logo" href="#home">
            <LogoMark />
            HamApps
          </a>
          <nav className="home-links" aria-label="Sections">
            <a href="#apps">Apps</a>
            <a href="#build">Build with us</a>
            <a href="#team">Team</a>
          </nav>
          <a className="btn primary small" href="#explore">
            Open HamiltonCourses
          </a>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="home-wrap hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Student-built at Hamilton College</p>
            <h1 className="hero-title">
              Apps for <span>the Hill.</span>
            </h1>
            <p className="hero-lede">
              HamApps is a club of Hamilton students who design and build free tools for campus life, starting with a
              better way to pick your courses.
            </p>
            <div className="hero-actions">
              <a className="btn hero-btn" href="#apps">
                Explore apps
              </a>
              <a className="btn hero-btn ghost" href="#build">
                Join the club
              </a>
            </div>
          </div>
          <MiniPlanner />
        </div>
        <HillLines />
      </section>

      <main>
        <section className="home-section" id="apps" aria-labelledby="apps-title">
          <div className="home-wrap">
            <p className="section-eyebrow">Our apps</p>
            <h2 className="section-title" id="apps-title">
              What we’re building
            </h2>
            {APP_GROUPS.map((group) => (
              <div key={group.title} className="app-group">
                <h3 className="group-title">{group.title}</h3>
                <div className={group.apps.some((a) => a.featured) ? 'app-grid featured' : 'app-grid'}>
                  {group.apps.map((app) => (app.featured ? <FeaturedApp key={app.name} app={app} /> : <IdeaCard key={app.name} app={app} />))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section alt" id="build" aria-labelledby="build-title">
          <div className="home-wrap build">
            <div>
              <p className="section-eyebrow">Build with us</p>
              <h2 className="section-title" id="build-title">
                Make the next HamApp
              </h2>
              <p className="section-lede">
                Have an idea for something campus needs? Bring it to HamApps. We help with design, code review, hosting
                and getting the word out. No experience needed to join; we pair new members with someone who has shipped
                before.
              </p>
              <div className="hero-actions">
                <span className="btn primary is-placeholder" title="The sign-up form is not set up yet">
                  Submit an idea · form coming soon
                </span>
                <a className="btn ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                  <GitHubIcon /> See our code
                </a>
              </div>
            </div>
            <div>
              <h3 className="group-title">What makes a good HamApp</h3>
              <ul className="criteria">
                {CRITERIA.map((c) => (
                  <li key={c.icon} className="criterion">
                    <span className="criterion-icon" aria-hidden="true">
                      <Icon name={c.icon} />
                    </span>
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="home-section" id="team" aria-labelledby="team-title">
          <div className="home-wrap">
            <p className="section-eyebrow">Our team</p>
            <h2 className="section-title" id="team-title">
              Meet HamApps
            </h2>
            <div className="team-filters" role="group" aria-label="Filter team by group">
              {TEAM_FILTERS.map((f) => (
                <button
                  key={f}
                  className={teamFilter === f ? 'chip is-on' : 'chip'}
                  aria-pressed={teamFilter === f}
                  onClick={() => setTeamFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <ul className="team-grid">
              {team.map((m, i) => (
                <li key={`${m.role}-${i}`} className="person">
                  <span className="avatar" aria-hidden="true">
                    ?
                  </span>
                  <span className="person-name">Open seat</span>
                  <span className="person-role">{m.role}</span>
                </li>
              ))}
            </ul>
            <p className="placeholder-note">Placeholder cards. Member names, class years and photos go here.</p>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-wrap footer-inner">
          <a className="home-logo" href="#home">
            <LogoMark />
            HamApps
          </a>
          <p>
            HamApps is a student-run club. It is not an official Hamilton College website, and Hamilton College does not
            maintain these apps.
          </p>
          <p>HamApps is open to every Hamilton student who supports its mission.</p>
        </div>
      </footer>
    </div>
  )
}

function FeaturedApp({ app }) {
  return (
    <article className="app-card featured">
      <a className="app-shot" href={app.href} aria-label={`Open ${app.name}`}>
        <MiniPlanner flat />
      </a>
      <div className="app-body">
        <div className="app-head">
          <h4 className="app-name">
            <a href={app.href}>{app.name}</a>
          </h4>
          <span className="status-pill preview">{app.status}</span>
        </div>
        <p className="app-desc">{app.description}</p>
        <ul className="feature-list">
          {app.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="app-actions">
          <a className="btn primary" href={app.href}>
            Open
          </a>
          <a className="btn ghost" href={app.code} target="_blank" rel="noreferrer" title="View source code">
            <GitHubIcon /> Code
          </a>
        </div>
        <p className="app-credit">{app.credit}</p>
      </div>
    </article>
  )
}

function IdeaCard({ app }) {
  return (
    <article className="app-card idea">
      <span className="idea-icon" aria-hidden="true">
        <Icon name={app.icon} />
      </span>
      <div className="app-head">
        <h4 className="app-name">{app.name}</h4>
        <span className="status-pill">{app.status}</span>
      </div>
      <p className="app-desc">{app.description}</p>
      <a className="link-btn" href="#build">
        Help build this
      </a>
    </article>
  )
}

// A small static picture of the planner, drawn with HTML/CSS
function MiniPlanner({ flat }) {
  const blocks = [
    { d: 0, t: 1, h: 1, c: 4, label: 'PSYCH 101' },
    { d: 2, t: 1, h: 1, c: 4, label: 'PSYCH 101' },
    { d: 4, t: 1, h: 1, c: 4, label: 'PSYCH 101' },
    { d: 1, t: 0.5, h: 1.25, c: 1, label: 'MATH 123' },
    { d: 3, t: 0.5, h: 1.25, c: 1, label: 'MATH 123' },
    { d: 1, t: 2, h: 1.25, c: 0, label: 'CPSCI 110' },
    { d: 3, t: 2, h: 1.25, c: 0, label: 'CPSCI 110' },
    { d: 0, t: 3, h: 1, c: 3, label: 'ECON 101' },
    { d: 2, t: 3, h: 1, c: 3, label: 'ECON 101' },
    { d: 1, t: 5, h: 1.25, c: 2, label: 'ENGL 150' },
    { d: 3, t: 5, h: 1.25, c: 2, label: 'ENGL 150' },
    { d: 2, t: 5, h: 2, c: 0, label: 'CPSCI Lab' },
  ]
  return (
    <div className={flat ? 'mini-planner flat' : 'mini-planner'} aria-hidden="true">
      <div className="mp-bar">
        <span className="mp-dot" />
        <span className="mp-dot" />
        <span className="mp-dot" />
        <span className="mp-url">HamiltonCourses · Fall 2026</span>
      </div>
      <div className="mp-days">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="mp-grid">
        {blocks.map((b, i) => (
          <span
            key={i}
            className={`mp-block c${b.c}`}
            style={{
              left: `calc(${b.d} * 20% + 2px)`,
              top: `calc(${b.t} * 12.5%)`,
              height: `calc(${b.h} * 12.5% - 3px)`,
            }}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  )
}

// Layered ridge lines for College Hill
function HillLines() {
  return (
    <svg className="hill-lines" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 70 C 240 20, 420 30, 640 60 S 1100 110, 1440 40 V120 H0 Z" fill="var(--hill-back)" />
      <path d="M0 95 C 300 60, 520 70, 760 92 S 1180 120, 1440 80 V120 H0 Z" fill="var(--bg)" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="var(--brand)" />
      <path d="M4 24 Q11 12 16 15 T28 10 V24 Z" fill="var(--buff)" />
      <path d="M9 9 h3 v6 h8 v-6 h3 v15 h-3 v-6 h-8 v6 h-3 Z" fill="var(--on-brand)" opacity="0.92" />
    </svg>
  )
}

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

function Icon({ name }) {
  const paths = {
    menu: 'M5 4v6a2 2 0 0 0 2 2v6M9 4v6M7 4v4M15 4c-1.7 0-3 2-3 5s1.3 3 3 3v6',
    map: 'M3 6l5-2 6 2 5-2v14l-5 2-6-2-5 2zM8 4v14M14 6v14',
    door: 'M6 20V4h10v16M4 20h14M13 12h.01',
    heart: 'M12 19s-7-4.5-7-9.3A3.9 3.9 0 0 1 12 7a3.9 3.9 0 0 1 7 2.7C19 14.5 12 19 12 19z',
    check: 'M5 12.5l4.5 4.5L19 7',
    code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name]} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
