export const DAYS = [
  { key: 'M', label: 'Monday', short: 'Mon' },
  { key: 'T', label: 'Tuesday', short: 'Tue' },
  { key: 'W', label: 'Wednesday', short: 'Wed' },
  { key: 'R', label: 'Thursday', short: 'Thu' },
  { key: 'F', label: 'Friday', short: 'Fri' },
]

export const COLOR_COUNT = 8

// "13:30" -> minutes after midnight
export const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// "13:30" -> "1:30"
export const formatTime = (t) => {
  const [h, m] = t.split(':').map(Number)
  const hh = ((h + 11) % 12) + 1
  return `${hh}:${String(m).padStart(2, '0')}`
}

export const formatRange = (start, end) => {
  const suffix = toMinutes(end) >= 12 * 60 ? 'pm' : 'am'
  return `${formatTime(start)}–${formatTime(end)}${suffix}`
}

export const formatDays = (days) => days.split('').join('')

// Flatten a section into one block per day it meets
export function sectionBlocks(section) {
  return section.meetings.flatMap((m) =>
    m.days.split('').map((day) => ({
      day,
      start: toMinutes(m.start),
      end: toMinutes(m.end),
      startLabel: m.start,
      endLabel: m.end,
    })),
  )
}

const overlaps = (a, b) => a.day === b.day && a.start < b.end && b.start < a.end

export function blocksConflict(blocksA, blocksB) {
  return blocksA.some((a) => blocksB.some((b) => overlaps(a, b)))
}

// Section types a student must pick one of (e.g. a Lecture and a Lab)
export function sectionTypes(course) {
  return [...new Set(course.sections.map((s) => s.type))]
}

// Section types with only one option are picked automatically.
// Types with several options start unpicked, so the student chooses on the calendar.
export function defaultSections(course) {
  return sectionTypes(course)
    .map((type) => course.sections.filter((s) => s.type === type))
    .filter((options) => options.length === 1)
    .map((options) => options[0].id)
}

// Section types the student still has to pick for a scheduled course
export function unpickedTypes(course, chosenIds) {
  return sectionTypes(course).filter(
    (type) => !course.sections.some((s) => s.type === type && chosenIds.includes(s.id)),
  )
}

// Lay out blocks in one day column so overlapping blocks sit side by side
export function layoutDay(blocks) {
  const sorted = [...blocks].sort((a, b) => a.start - b.start || b.end - a.end)
  const placed = []
  let cluster = []
  let clusterEnd = -1

  const flush = () => {
    const cols = Math.max(...cluster.map((b) => b.col)) + 1
    cluster.forEach((b) => placed.push({ ...b, cols }))
    cluster = []
  }

  for (const block of sorted) {
    if (cluster.length && block.start >= clusterEnd) flush()
    const used = new Set(cluster.filter((b) => b.end > block.start).map((b) => b.col))
    let col = 0
    while (used.has(col)) col += 1
    cluster.push({ ...block, col })
    clusterEnd = Math.max(clusterEnd, block.end)
  }
  if (cluster.length) flush()
  return placed
}
