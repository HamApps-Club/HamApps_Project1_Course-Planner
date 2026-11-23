export default function Header({ term, terms, onTermChange, view, onViewChange, scheduleCount }) {
  return (
    <header className="topbar">
      <a className="brand" href="#home" title="Back to HamApps home">
        <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill="var(--brand)" />
          <path d="M4 24 Q11 12 16 15 T28 10 V24 Z" fill="var(--buff)" />
          <path d="M9 9 h3 v6 h8 v-6 h3 v15 h-3 v-6 h-8 v6 h-3 Z" fill="var(--on-brand)" opacity="0.92" />
        </svg>
        <div className="brand-text">
          <span className="brand-name">HamiltonCourses</span>
          <span className="brand-sub">by HamApps · ← all apps</span>
        </div>
      </a>

      <nav className="view-tabs" aria-label="Views">
        <button
          className={view === 'explore' ? 'view-tab is-active' : 'view-tab'}
          onClick={() => onViewChange('explore')}
          aria-current={view === 'explore' ? 'page' : undefined}
        >
          Explore courses
        </button>
        <button
          className={view === 'schedule' ? 'view-tab is-active' : 'view-tab'}
          onClick={() => onViewChange('schedule')}
          aria-current={view === 'schedule' ? 'page' : undefined}
        >
          Build schedule
          <span className="count-pill">{scheduleCount}</span>
        </button>
      </nav>

      <div className="topbar-right">
        <label className="term-select">
          <span className="visually-hidden">Term</span>
          <select id="term" value={term} onChange={(e) => onTermChange(e.target.value)}>
            {terms.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <span className="sample-pill" title="Courses, instructors, ratings and comments are placeholders">
          Sample data
        </span>
      </div>
    </header>
  )
}
