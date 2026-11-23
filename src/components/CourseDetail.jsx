import { DEPARTMENTS, TAGS } from '../data/courses.js'
import { formatRange } from '../lib/schedule.js'
import { RatingChip, TagList, HeartIcon, PlusIcon, CheckIcon } from './bits.jsx'
import { ratingBand } from '../lib/rating.js'

export default function CourseDetail({
  course,
  term,
  isFavorite,
  inSchedule,
  scheduleName,
  fits,
  onToggleFavorite,
  onToggleSchedule,
  compact,
}) {
  if (!course) {
    return (
      <div className="detail-empty">
        <h2>Pick a course</h2>
        <p>Search on the left, then choose a course to see its description, sections and past ratings.</p>
      </div>
    )
  }

  const seatsLeft = course.sections.reduce((n, s) => n + Math.max(0, s.seats - s.enrolled), 0)

  return (
    <article className={compact ? 'detail compact' : 'detail'} aria-labelledby="detail-title">
      <header className="detail-head">
        <div className="detail-titles">
          <p className="detail-eyebrow">
            {DEPARTMENTS[course.dept]} · {term}
          </p>
          <h1 id="detail-title" className="detail-title">
            {course.title}
          </h1>
          <div className="detail-codes">
            <span className="code big">{course.code}</span>
            {course.crosslist.map((x) => (
              <span key={x} className="code big muted">
                / {x}
              </span>
            ))}
            <TagList tags={course.tags} />
          </div>
        </div>
        <div className="detail-actions">
          <RatingChip value={course.rating} isNew={course.isNew} large />
          <div className="action-row">
            <button
              className={isFavorite ? 'btn ghost heart is-on' : 'btn ghost heart'}
              onClick={onToggleFavorite}
              aria-pressed={isFavorite}
            >
              <HeartIcon filled={isFavorite} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
            <button className={inSchedule ? 'btn secondary' : 'btn primary'} onClick={onToggleSchedule}>
              {inSchedule ? <CheckIcon /> : <PlusIcon />}
              {inSchedule ? `In ${scheduleName}` : `Add to ${scheduleName}`}
            </button>
          </div>
          {!inSchedule && !fits && <p className="warn-text small">Every section conflicts with {scheduleName}</p>}
        </div>
      </header>

      <div className="fact-strip">
        <Fact label="Credit" value={course.credit.toFixed(1)} />
        <Fact label="Workload" value={`~${course.workload} hrs/wk`} />
        <Fact label="Seats left" value={seatsLeft} />
        <Fact label="Prerequisites" value={course.prereqs} wide />
      </div>

      <div className="detail-grid">
        <div className="detail-col">
          <Panel title="Description">
            <p>{course.description}</p>
          </Panel>

          <Panel title={`Sections · ${term}`}>
            <ul className="section-list">
              {course.sections.map((s) => {
                const left = s.seats - s.enrolled
                return (
                  <li key={s.id} className="section-row">
                    <span className="section-id">{s.id}</span>
                    <span className="section-body">
                      <span className="section-type">
                        {s.type} · {s.instructor}
                      </span>
                      {s.meetings.map((m, i) => (
                        <span key={i} className="section-time">
                          {m.days} {formatRange(m.start, m.end)} · {s.room}
                        </span>
                      ))}
                    </span>
                    <span className={left <= 0 ? 'seat-pill full' : left <= 3 ? 'seat-pill low' : 'seat-pill'}>
                      {left <= 0 ? 'Full' : `${left} open`}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel title="Grading">
            <ul className="plain-list">
              {course.grading.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            {course.tags.length > 0 && (
              <p className="small muted">
                Counts toward: {course.tags.map((t) => TAGS[t].name).join(', ')}
              </p>
            )}
          </Panel>
        </div>

        <div className="detail-col">
          {course.isNew ? (
            <Panel title="Evaluations">
              <p className="muted">
                This course is new this term, so it has no student evaluations yet.
              </p>
            </Panel>
          ) : (
            <>
              <Panel title="Student evaluations" note="Sample">
                <ul className="eval-list">
                  {Object.entries(course.evals).map(([label, value]) => (
                    <li key={label} className="eval-row">
                      <span className="eval-label">{label}</span>
                      <span className="eval-bar">
                        <span className={`eval-fill ${ratingBand(value)}`} style={{ width: `${(value / 5) * 100}%` }} />
                      </span>
                      <span className="eval-value">{value.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="Past terms">
                <ul className="history-list">
                  {course.history.map((h) => (
                    <li key={h.term} className="history-row">
                      <span className="history-term">{h.term}</span>
                      <span className="history-inst">{h.instructors.join(', ')}</span>
                      <RatingChip value={h.rating} />
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="What students said" note="Sample">
                <ul className="comment-list">
                  {course.comments.map((c) => (
                    <li key={c} className="comment">
                      {c}
                    </li>
                  ))}
                </ul>
              </Panel>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

function Fact({ label, value, wide }) {
  return (
    <div className={wide ? 'fact wide' : 'fact'}>
      <span className="fact-label">{label}</span>
      <span className="fact-value">{value}</span>
    </div>
  )
}

function Panel({ title, note, children }) {
  return (
    <section className="panel">
      <h2 className="panel-title">
        {title}
        {note && <span className="note-pill">{note}</span>}
      </h2>
      {children}
    </section>
  )
}
