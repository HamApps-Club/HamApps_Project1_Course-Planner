import { useEffect, useMemo, useState } from 'react'
import { COURSES, COURSE_BY_ID, TERMS } from './data/courses.js'
import { COLOR_COUNT, defaultSections, sectionBlocks, blocksConflict } from './lib/schedule.js'
import { usePersistentState } from './lib/usePersistentState.js'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import CourseDetail from './components/CourseDetail.jsx'
import ScheduleView from './components/ScheduleView.jsx'
import Drawer from './components/Drawer.jsx'
import Toast from './components/Toast.jsx'

const uid = () => Math.random().toString(36).slice(2, 9)

const pick = (id, sections, color) => ({ id, sections, color })

// Example plan so the first view shows what the planner does
const starterSchedules = () => ({
  'Fall 2026': [
    {
      id: 'main',
      name: 'Main',
      courses: [
        pick('CPSCI-110', ['01', 'L1'], 0),
        pick('MATH-123', ['01'], 1),
        pick('ENGL-150', ['01'], 2),
        pick('ECON-101', [], 3),
      ],
      events: [{ id: 'ev1', name: 'Club soccer', days: 'MW', start: '16:30', end: '18:00' }],
    },
    {
      id: 'backup',
      name: 'Backup',
      courses: [pick('CPSCI-101', ['01', 'L1'], 0), pick('GOVT-116', ['01'], 5)],
      events: [],
    },
  ],
  'Spring 2027': [{ id: 'main-s', name: 'Main', courses: [], events: [] }],
})

const readView = () => (window.location.hash === '#schedule' ? 'schedule' : 'explore')

export default function App() {
  const [term, setTerm] = usePersistentState('hp.term', TERMS[0])
  const [schedules, setSchedules] = usePersistentState('hp.schedules', starterSchedules)
  const [activeIds, setActiveIds] = usePersistentState('hp.active', {})
  const [favorites, setFavorites] = usePersistentState('hp.favorites', ['GOVT-230', 'CPSCI-307', 'THEAT-120'])
  const [selectedId, setSelectedId] = useState('CPSCI-333')
  const [drawerId, setDrawerId] = useState(null)
  const [previewId, setPreviewId] = useState(null)
  const [view, setView] = useState(readView)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const onHash = () => setView(readView())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const changeView = (next) => {
    setView(next)
    try {
      history.replaceState(null, '', `#${next}`)
    } catch {
      window.location.hash = next
    }
  }

  const termSchedules = schedules[term] ?? [{ id: uid(), name: 'Main', courses: [], events: [] }]
  const active = termSchedules.find((s) => s.id === activeIds[term]) ?? termSchedules[0]

  const updateActive = (fn) =>
    setSchedules((all) => ({
      ...all,
      [term]: (all[term] ?? termSchedules).map((s) => (s.id === active.id ? fn(s) : s)),
    }))

  const notify = (message) => {
    setToast({ message, key: uid() })
  }

  // Blocks already on the calendar, used for conflict checks
  const scheduledBlocks = useMemo(
    () =>
      active.courses.flatMap((entry) => {
        const course = COURSE_BY_ID[entry.id]
        if (!course) return []
        return course.sections.filter((s) => entry.sections.includes(s.id)).flatMap(sectionBlocks)
      }),
    [active],
  )

  const fitsSchedule = (course) => {
    if (active.courses.some((c) => c.id === course.id)) return true
    // Fits if at least one section of every required type avoids conflicts
    const types = [...new Set(course.sections.map((s) => s.type))]
    return types.every((type) =>
      course.sections
        .filter((s) => s.type === type)
        .some((s) => !blocksConflict(sectionBlocks(s), scheduledBlocks)),
    )
  }

  const inSchedule = (id) => active.courses.some((c) => c.id === id)

  const toggleSchedule = (id) => {
    const course = COURSE_BY_ID[id]
    if (inSchedule(id)) {
      updateActive((s) => ({ ...s, courses: s.courses.filter((c) => c.id !== id) }))
      notify(`Removed ${course.code} from ${active.name}`)
    } else {
      const used = new Set(active.courses.map((c) => c.color))
      let color = 0
      while (used.has(color) && color < COLOR_COUNT - 1) color += 1
      updateActive((s) => ({
        ...s,
        courses: [...s.courses, { id, sections: defaultSections(course), color }],
      }))
      notify(`Added ${course.code} to ${active.name}`)
    }
  }

  // Click a faded section on the calendar to pick it; click the picked one to undo
  const toggleSection = (courseId, sectionId) => {
    const course = COURSE_BY_ID[courseId]
    const type = course.sections.find((x) => x.id === sectionId).type
    updateActive((s) => ({
      ...s,
      courses: s.courses.map((c) => {
        if (c.id !== courseId) return c
        const sameType = (sid) => course.sections.find((x) => x.id === sid)?.type === type
        const others = c.sections.filter((sid) => !sameType(sid))
        return c.sections.includes(sectionId) ? { ...c, sections: others } : { ...c, sections: [...others, sectionId] }
      }),
    }))
  }

  const toggleFavorite = (id) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))

  const scheduleActions = {
    select: (id) => setActiveIds((a) => ({ ...a, [term]: id })),
    add: () => {
      const id = uid()
      setSchedules((all) => ({
        ...all,
        [term]: [...termSchedules, { id, name: `Schedule ${termSchedules.length + 1}`, courses: [], events: [] }],
      }))
      setActiveIds((a) => ({ ...a, [term]: id }))
    },
    duplicate: () => {
      const id = uid()
      setSchedules((all) => ({
        ...all,
        [term]: [...termSchedules, { ...structuredClone(active), id, name: `${active.name} (copy)` }],
      }))
      setActiveIds((a) => ({ ...a, [term]: id }))
      notify(`Made a copy of ${active.name}`)
    },
    rename: (name) => updateActive((s) => ({ ...s, name })),
    remove: () => {
      if (termSchedules.length === 1) return notify('Keep at least one schedule for each term')
      setSchedules((all) => ({ ...all, [term]: termSchedules.filter((s) => s.id !== active.id) }))
      notify(`Deleted ${active.name}`)
    },
    cycleColor: (courseId) =>
      updateActive((s) => ({
        ...s,
        courses: s.courses.map((c) => (c.id === courseId ? { ...c, color: (c.color + 1) % COLOR_COUNT } : c)),
      })),
    removeCourse: (courseId) => toggleSchedule(courseId),
    setColor: (courseId, color) =>
      updateActive((s) => ({
        ...s,
        courses: s.courses.map((c) => (c.id === courseId ? { ...c, color } : c)),
      })),
    toggleHidden: (courseId) =>
      updateActive((s) => ({
        ...s,
        courses: s.courses.map((c) => (c.id === courseId ? { ...c, hidden: !c.hidden } : c)),
      })),
    addEvent: (event) =>
      updateActive((s) => ({ ...s, events: [...s.events, { ...event, id: uid() }] })),
    removeEvent: (eventId) =>
      updateActive((s) => ({ ...s, events: s.events.filter((e) => e.id !== eventId) })),
    exportCalendar: () => notify('Calendar export is not built yet. It is planned for a later version.'),
  }

  const openCourse = (id) => {
    if (view === 'schedule') setDrawerId(id)
    else setSelectedId(id)
  }

  const detailProps = (id) => ({
    course: COURSE_BY_ID[id],
    term,
    isFavorite: favorites.includes(id),
    inSchedule: inSchedule(id),
    scheduleName: active.name,
    fits: fitsSchedule(COURSE_BY_ID[id]),
    onToggleFavorite: () => toggleFavorite(id),
    onToggleSchedule: () => toggleSchedule(id),
  })

  return (
    <div className="app">
      <Header
        term={term}
        terms={TERMS}
        onTermChange={setTerm}
        view={view}
        onViewChange={changeView}
        scheduleCount={active.courses.length}
      />
      <div className="workspace">
        <Sidebar
          courses={COURSES}
          view={view}
          selectedId={view === 'schedule' ? drawerId : selectedId}
          favorites={favorites}
          inSchedule={inSchedule}
          fitsSchedule={fitsSchedule}
          onOpen={openCourse}
          onToggleFavorite={toggleFavorite}
          onToggleSchedule={toggleSchedule}
          onPreview={setPreviewId}
          schedule={view === 'schedule' ? active : null}
          scheduleActions={scheduleActions}
        />
        <main className="main" id="main">
          {view === 'explore' ? (
            <CourseDetail {...detailProps(selectedId)} />
          ) : (
            <ScheduleView
              term={term}
              schedules={termSchedules}
              active={active}
              actions={scheduleActions}
              previewCourse={previewId && !inSchedule(previewId) ? COURSE_BY_ID[previewId] : null}
              onToggleSection={toggleSection}
            />
          )}
        </main>
      </div>
      {drawerId && (
        <Drawer onClose={() => setDrawerId(null)} title={COURSE_BY_ID[drawerId].code}>
          <CourseDetail {...detailProps(drawerId)} compact />
        </Drawer>
      )}
      {toast && <Toast key={toast.key} message={toast.message} onDone={() => setToast(null)} />}
    </div>
  )
}
