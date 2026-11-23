import { useMemo, useState } from 'react'
import { COURSE_BY_ID, DEPARTMENTS, TAGS } from '../data/courses.js'
import { DAYS, unpickedTypes } from '../lib/schedule.js'
import { RatingChip, TagList, HeartIcon, PlusIcon, CheckIcon, CloseIcon } from './bits.jsx'

const SORTS = {
  code: { label: 'Course code', fn: (a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }) },
  rating: { label: 'Highest rated', fn: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) },
  workload: { label: 'Lightest workload', fn: (a, b) => a.workload - b.workload },
  title: { label: 'Title', fn: (a, b) => a.title.localeCompare(b.title) },
}

const matchesQuery = (course, q) => {
  if (!q) return true
  const hay = [
    course.code,
    course.code.replace(' ', ''),
    course.title,
    DEPARTMENTS[course.dept],
    ...course.crosslist,
    ...course.sections.map((s) => s.instructor),
  ]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => hay.includes(word))
}

export default function Sidebar({
  courses,
  view,
  selectedId,
  favorites,
  inSchedule,
  fitsSchedule,
  onOpen,
  onToggleFavorite,
  onToggleSchedule,
  onPreview,
  schedule,
  scheduleActions,
}) {
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [dept, setDept] = useState('')
  const [tags, setTags] = useState([])
  const [freeDays, setFreeDays] = useState([])
  const [minRating, setMinRating] = useState(0)
  const [onlyFits, setOnlyFits] = useState(false)
  const [sort, setSort] = useState('code')
  const [favOpen, setFavOpen] = useState(true)

  const activeFilterCount =
    (dept ? 1 : 0) + tags.length + freeDays.length + (minRating ? 1 : 0) + (onlyFits ? 1 : 0)

  const results = useMemo(
    () =>
      courses
        .filter((c) => matchesQuery(c, query.trim()))
        .filter((c) => !dept || c.dept === dept)
        .filter((c) => tags.every((t) => c.tags.includes(t)))
        .filter((c) => !minRating || (c.rating ?? 0) >= minRating)
        .filter(
          (c) =>
            !freeDays.length ||
            !c.sections.some((s) => s.meetings.some((m) => freeDays.some((d) => m.days.includes(d)))),
        )
        .filter((c) => !onlyFits || fitsSchedule(c))
        .sort(SORTS[sort].fn),
    [courses, query, dept, tags, minRating, freeDays, onlyFits, fitsSchedule, sort],
  )

  const favCourses = courses.filter((c) => favorites.includes(c.id))

  const toggleIn = (list, setList, value) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const clearFilters = () => {
    setDept('')
    setTags([])
    setFreeDays([])
    setMinRating(0)
    setOnlyFits(false)
  }

  const card = (course) => (
    <CourseCard
      key={course.id}
      course={course}
      view={view}
      selected={selectedId === course.id}
      isFavorite={favorites.includes(course.id)}
      added={inSchedule(course.id)}
      fits={fitsSchedule(course)}
      onOpen={() => onOpen(course.id)}
      onToggleFavorite={() => onToggleFavorite(course.id)}
      onToggleSchedule={() => onToggleSchedule(course.id)}
      onPreview={onPreview}
    />
  )

  return (
    <aside className="sidebar" aria-label="Course search">
      <div className="search-block">
        <div className="search-row">
          <label htmlFor="search" className="visually-hidden">
            Search courses
          </label>
          <input
            id="search"
            type="search"
            className="search-input"
            placeholder="Search by code, title or instructor"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button
            className={showFilters || activeFilterCount ? 'icon-btn is-on' : 'icon-btn'}
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="filters"
            title="Filters"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M3 5h14M6 10h8M8.5 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
            {activeFilterCount > 0 && <span className="dot-count">{activeFilterCount}</span>}
            <span className="visually-hidden">Filters</span>
          </button>
        </div>

        <div className="search-meta">
          <label className="inline-select">
            Sort
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="switch">
            <input id="only-fits" type="checkbox" checked={onlyFits} onChange={(e) => setOnlyFits(e.target.checked)} />
            <span>Fits my schedule</span>
          </label>
        </div>

        {showFilters && (
          <div className="filters" id="filters">
            <label className="field">
              <span className="field-label">Department</span>
              <select id="dept" value={dept} onChange={(e) => setDept(e.target.value)}>
                <option value="">All departments</option>
                {Object.entries(DEPARTMENTS).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} · {name}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="field">
              <legend className="field-label">Requirements</legend>
              <div className="chip-row">
                {Object.entries(TAGS).map(([key, t]) => (
                  <button
                    key={key}
                    className={tags.includes(key) ? 'chip is-on' : 'chip'}
                    onClick={() => toggleIn(tags, setTags, key)}
                    aria-pressed={tags.includes(key)}
                    title={t.name}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="field">
              <legend className="field-label">Keep these days free</legend>
              <div className="chip-row">
                {DAYS.map((d) => (
                  <button
                    key={d.key}
                    className={freeDays.includes(d.key) ? 'chip is-on' : 'chip'}
                    onClick={() => toggleIn(freeDays, setFreeDays, d.key)}
                    aria-pressed={freeDays.includes(d.key)}
                  >
                    {d.short}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="field">
              <span className="field-label">
                Minimum rating <strong>{minRating ? minRating.toFixed(1) : 'Any'}</strong>
              </span>
              <input
                id="min-rating"
                type="range"
                min="0"
                max="4.5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              />
            </label>

            {activeFilterCount > 0 && (
              <button className="link-btn" onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="sidebar-scroll">
        {schedule && (
          <section className="list-section">
            <h2 className="list-heading static">
              <span>
                In {schedule.name} <span className="muted">({schedule.courses.length})</span>
              </span>
            </h2>
            {schedule.courses.length === 0 ? (
              <p className="empty-note">No courses yet. Press + on a course below to add it.</p>
            ) : (
              <ul className="in-schedule">
                {schedule.courses.map((entry) => {
                  const course = COURSE_BY_ID[entry.id]
                  if (!course) return null
                  const open = unpickedTypes(course, entry.sections)
                  return (
                    <li key={entry.id} className={`in-item c${entry.color}${entry.hidden ? ' is-hidden' : ''}`}>
                      <button
                        className="in-swatch"
                        onClick={() => scheduleActions.cycleColor(entry.id)}
                        title="Change color"
                      >
                        <span className="visually-hidden">Change color of {course.code}</span>
                      </button>
                      <button className="in-name" onClick={() => onOpen(course.id)}>
                        <span className="code">{course.code}</span>
                        <span className="in-title">{course.title}</span>
                        {open.length > 0 && <span className="in-pick">Pick a {open.join(' and ').toLowerCase()} section</span>}
                      </button>
                      <button className="link-btn small" onClick={() => scheduleActions.toggleHidden(entry.id)}>
                        {entry.hidden ? 'Show' : 'Hide'}
                      </button>
                      <button
                        className="mini-btn"
                        onClick={() => scheduleActions.removeCourse(entry.id)}
                        title={`Remove ${course.code} from ${schedule.name}`}
                      >
                        <CloseIcon />
                        <span className="visually-hidden">Remove {course.code}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        )}

        {favCourses.length > 0 && (
          <section className="list-section">
            <button className="list-heading" onClick={() => setFavOpen((v) => !v)} aria-expanded={favOpen}>
              <span>
                Saved <span className="muted">({favCourses.length})</span>
              </span>
              <span className={favOpen ? 'chev is-open' : 'chev'} aria-hidden="true">
                ▾
              </span>
            </button>
            {favOpen && <div className="card-list">{favCourses.map(card)}</div>}
          </section>
        )}

        <section className="list-section">
          <h2 className="list-heading static">
            <span>
              {query || activeFilterCount ? 'Results' : 'All courses'}{' '}
              <span className="muted">({results.length})</span>
            </span>
          </h2>
          {results.length ? (
            <div className="card-list">{results.map(card)}</div>
          ) : (
            <p className="empty-note">
              No courses match. Try a shorter search or{' '}
              <button className="link-btn" onClick={clearFilters}>
                clear the filters
              </button>
              .
            </p>
          )}
        </section>
      </div>
    </aside>
  )
}

function CourseCard({
  course,
  view,
  selected,
  isFavorite,
  added,
  fits,
  onOpen,
  onToggleFavorite,
  onToggleSchedule,
  onPreview,
}) {
  const full = course.sections.every((s) => s.enrolled >= s.seats)
  return (
    <article
      className={['course-card', selected && 'is-selected', added && view === 'schedule' && 'is-added']
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => view === 'schedule' && onPreview(course.id)}
      onMouseLeave={() => view === 'schedule' && onPreview(null)}
    >
      <button className="card-main" onClick={onOpen}>
        <span className="card-top">
          <span className="code">{course.code}</span>
          <TagList tags={course.tags} small />
        </span>
        <span className="card-title">{course.title}</span>
        <span className="card-meta">
          {course.sections[0].instructor}
          {full && <span className="warn-text"> · Full</span>}
          {!fits && !added && <span className="warn-text"> · Conflicts</span>}
        </span>
      </button>
      <div className="card-side">
        <RatingChip value={course.rating} isNew={course.isNew} />
        <div className="card-actions">
          <button
            className={isFavorite ? 'mini-btn heart is-on' : 'mini-btn heart'}
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Remove from saved' : 'Save course'}
          >
            <HeartIcon filled={isFavorite} />
            <span className="visually-hidden">{isFavorite ? 'Unsave' : 'Save'} {course.code}</span>
          </button>
          <button
            className={added ? 'mini-btn add is-on' : 'mini-btn add'}
            onClick={onToggleSchedule}
            aria-pressed={added}
            title={added ? 'Remove from schedule' : 'Add to schedule'}
          >
            {added ? <CheckIcon /> : <PlusIcon />}
            <span className="visually-hidden">{added ? 'Remove' : 'Add'} {course.code}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
