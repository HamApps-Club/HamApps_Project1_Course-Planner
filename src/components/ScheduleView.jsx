import { useState } from 'react'
import { COURSE_BY_ID } from '../data/courses.js'
import {
  DAYS,
  formatRange,
  layoutDay,
  sectionBlocks,
  toMinutes,
  unpickedTypes,
} from '../lib/schedule.js'
import { CloseIcon, PlusIcon } from './bits.jsx'

const START_HOUR = 8
const END_HOUR = 22
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i)

const hourLabel = (h) => `${((h + 11) % 12) + 1}${h < 12 ? 'am' : 'pm'}`

export default function ScheduleView({
  term,
  schedules,
  active,
  actions,
  previewCourse,
  onToggleSection,
}) {
  const [renaming, setRenaming] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)

  // Build every block that goes on the calendar
  const blocks = []
  let toPick = 0
  active.courses.forEach((entry) => {
    const course = COURSE_BY_ID[entry.id]
    if (!course) return
    const open = unpickedTypes(course, entry.sections)
    toPick += open.length
    if (entry.hidden) return
    course.sections
      // picked sections, plus every option for a part that is not picked yet
      .filter((s) => entry.sections.includes(s.id) || open.includes(s.type))
      .forEach((s) => {
        const picked = entry.sections.includes(s.id)
        sectionBlocks(s).forEach((b) =>
          blocks.push({
            ...b,
            key: `${entry.id}-${s.id}-${b.day}`,
            kind: 'course',
            picked,
            courseId: entry.id,
            sectionId: s.id,
            title: `${course.code} ${s.id}`,
            sub: s.type === 'Lecture' ? s.room : `${s.type} · ${s.room}`,
            color: entry.color,
            label: picked
              ? `${course.code} ${s.type} ${s.id}, picked. Click to see the other options.`
              : `Pick ${course.code} ${s.type} ${s.id}`,
          }),
        )
      })
  })
  active.events.forEach((ev) =>
    ev.days.split('').forEach((day) =>
      blocks.push({
        key: `${ev.id}-${day}`,
        kind: 'event',
        day,
        start: toMinutes(ev.start),
        end: toMinutes(ev.end),
        startLabel: ev.start,
        endLabel: ev.end,
        title: ev.name,
        sub: 'Personal event',
        eventId: ev.id,
      }),
    ),
  )
  if (previewCourse) {
    previewCourse.sections.forEach((s) =>
      sectionBlocks(s).forEach((b) =>
        blocks.push({
          ...b,
          key: `preview-${s.id}-${b.day}`,
          kind: 'preview',
          title: `${previewCourse.code} ${s.id}`,
          sub: s.type,
        }),
      ),
    )
  }

  // Only picked sections and personal events count as conflicts
  const realBlocks = blocks.filter((b) => b.kind === 'event' || (b.kind === 'course' && b.picked))
  const conflictKeys = new Set()
  realBlocks.forEach((a) =>
    realBlocks.forEach((b) => {
      if (a.key !== b.key && a.day === b.day && a.start < b.end && b.start < a.end) conflictKeys.add(a.key)
    }),
  )

  const credits = active.courses.reduce((n, c) => n + (COURSE_BY_ID[c.id]?.credit ?? 0), 0)
  const conflictCourses = new Set(
    realBlocks.filter((b) => conflictKeys.has(b.key) && b.courseId).map((b) => b.courseId),
  )

  return (
    <div className="schedule">
      <div className="schedule-bar">
        <div className="sched-tabs" role="tablist" aria-label={`${term} schedules`}>
          {schedules.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === active.id}
              className={s.id === active.id ? 'sched-tab is-active' : 'sched-tab'}
              onClick={() => actions.select(s.id)}
            >
              {s.name}
            </button>
          ))}
          <button className="sched-tab add" onClick={actions.add} title="New schedule">
            <PlusIcon />
            <span className="visually-hidden">New schedule</span>
          </button>
        </div>

        <div className="sched-tools">
          {renaming ? (
            <form
              className="rename-form"
              onSubmit={(e) => {
                e.preventDefault()
                const name = new FormData(e.currentTarget).get('name').toString().trim()
                if (name) actions.rename(name)
                setRenaming(false)
              }}
            >
              <label htmlFor="rename" className="visually-hidden">
                Schedule name
              </label>
              <input id="rename" name="name" defaultValue={active.name} autoFocus maxLength={30} />
              <button className="btn small primary" type="submit">
                Save
              </button>
            </form>
          ) : (
            <>
              <button className="btn small ghost" onClick={() => setRenaming(true)}>
                Rename
              </button>
              <button className="btn small ghost" onClick={actions.duplicate}>
                Duplicate
              </button>
              <button className="btn small ghost danger" onClick={actions.remove}>
                Delete
              </button>
              <button className="btn small secondary" onClick={actions.exportCalendar}>
                Export to calendar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="stat-row">
        <Stat label="Courses" value={active.courses.length} />
        <Stat label="Credits" value={credits.toFixed(1)} hint={credits > 4 ? 'Above the usual 4' : credits < 3 ? 'Below full-time' : 'Full-time'} />
        <Stat
          label="Conflicts"
          value={conflictCourses.size}
          tone={conflictCourses.size ? 'bad' : 'good'}
          hint={conflictCourses.size ? 'Fix overlapping times' : 'None'}
        />
        <Stat
          label="Sections to pick"
          value={toPick}
          tone={toPick ? 'warn' : 'good'}
          hint={toPick ? 'Click a striped block' : 'All picked'}
        />
      </div>

      <div className="schedule-body">
        <div className="calendar-wrap">
          <div className="calendar" style={{ '--hours': HOURS.length }}>
            <div className="cal-corner" />
            {DAYS.map((d) => (
              <div key={d.key} className="cal-day-head">
                <span className="long">{d.label}</span>
                <span className="short">{d.short}</span>
              </div>
            ))}
            <div className="cal-times">
              {HOURS.map((h) => (
                <span key={h} className="cal-time">
                  {hourLabel(h)}
                </span>
              ))}
            </div>
            {DAYS.map((d) => (
              <div key={d.key} className="cal-col">
                {HOURS.map((h) => (
                  <span key={h} className="cal-line" />
                ))}
                {layoutDay(blocks.filter((b) => b.day === d.key)).map((b) => {
                  const top = ((b.start - START_HOUR * 60) / 60) * 100
                  const height = ((b.end - b.start) / 60) * 100
                  const cls = [
                    'cal-block',
                    b.kind,
                    b.kind === 'course' && `c${b.color}`,
                    b.kind === 'course' && !b.picked && 'unpicked',
                    conflictKeys.has(b.key) && 'conflict',
                    b.end - b.start <= 60 && 'short',
                  ]
                    .filter(Boolean)
                    .join(' ')
                  const style = {
                    top: `calc(${top / 100} * var(--hour))`,
                    height: `calc(${height / 100} * var(--hour) - 2px)`,
                    left: `calc(${(b.col / b.cols) * 100}% + 2px)`,
                    width: `calc(${100 / b.cols}% - 4px)`,
                  }
                  const content = (
                    <>
                      <span className="blk-time">{formatRange(b.startLabel, b.endLabel)}</span>
                      <span className="blk-title">{b.title}</span>
                      <span className="blk-sub">{b.sub}</span>
                    </>
                  )
                  return b.kind === 'course' ? (
                    <button
                      key={b.key}
                      className={cls}
                      style={style}
                      onClick={() => onToggleSection(b.courseId, b.sectionId)}
                      aria-label={b.label}
                      title={b.picked ? 'Click to choose a different section' : 'Click to pick this section'}
                    >
                      {content}
                    </button>
                  ) : (
                    <div key={b.key} className={cls} style={style} aria-hidden={b.kind === 'preview'}>
                      {content}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <aside className="sched-side" aria-label="Schedule help and personal events">
          <div className="how-to">
            <h2 className="side-title">Picking sections</h2>
            <p>
              When a course has more than one section, every option shows on the calendar as a <strong>striped</strong>{' '}
              block. Click the one you want to keep. Click it again to bring the other options back.
            </p>
            <p className="muted small">Remove a course or change its color in the list on the left.</p>
          </div>

          <h2 className="side-title">
            Personal events <span className="muted">({active.events.length})</span>
          </h2>
          <ul className="event-list">
            {active.events.map((ev) => (
              <li key={ev.id} className="event-item">
                <span>
                  <strong>{ev.name}</strong>
                  <span className="muted small">
                    {' '}
                    {ev.days} {formatRange(ev.start, ev.end)}
                  </span>
                </span>
                <button className="mini-btn" onClick={() => actions.removeEvent(ev.id)} title={`Remove ${ev.name}`}>
                  <CloseIcon />
                  <span className="visually-hidden">Remove {ev.name}</span>
                </button>
              </li>
            ))}
          </ul>
          {showEventForm ? (
            <EventForm
              onCancel={() => setShowEventForm(false)}
              onSave={(ev) => {
                actions.addEvent(ev)
                setShowEventForm(false)
              }}
            />
          ) : (
            <button className="btn small ghost full" onClick={() => setShowEventForm(true)}>
              <PlusIcon /> Add a practice, job or meeting
            </button>
          )}
        </aside>
      </div>
    </div>
  )
}

function Stat({ label, value, hint, tone }) {
  return (
    <div className={tone ? `stat ${tone}` : 'stat'}>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  )
}

function EventForm({ onSave, onCancel }) {
  const [name, setName] = useState('')
  const [days, setDays] = useState(['T', 'R'])
  const [start, setStart] = useState('16:00')
  const [end, setEnd] = useState('17:30')
  const valid = name.trim() && days.length && start < end

  return (
    <form
      className="event-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (!valid) return
        const order = DAYS.map((d) => d.key)
        onSave({ name: name.trim(), days: [...days].sort((a, b) => order.indexOf(a) - order.indexOf(b)).join(''), start, end })
      }}
    >
      <label className="field">
        <span className="field-label">Name</span>
        <input id="ev-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Work study shift" />
      </label>
      <div className="chip-row">
        {DAYS.map((d) => (
          <button
            type="button"
            key={d.key}
            className={days.includes(d.key) ? 'chip is-on' : 'chip'}
            aria-pressed={days.includes(d.key)}
            onClick={() => setDays(days.includes(d.key) ? days.filter((x) => x !== d.key) : [...days, d.key])}
          >
            {d.short}
          </button>
        ))}
      </div>
      <div className="time-row">
        <label className="field">
          <span className="field-label">Starts</span>
          <input id="ev-start" type="time" value={start} min="08:00" max="22:00" onChange={(e) => setStart(e.target.value)} />
        </label>
        <label className="field">
          <span className="field-label">Ends</span>
          <input id="ev-end" type="time" value={end} min="08:00" max="22:00" onChange={(e) => setEnd(e.target.value)} />
        </label>
      </div>
      {start >= end && <p className="warn-text small">The end time has to be after the start time.</p>}
      <div className="action-row">
        <button type="button" className="btn small ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn small primary" disabled={!valid}>
          Add event
        </button>
      </div>
    </form>
  )
}
