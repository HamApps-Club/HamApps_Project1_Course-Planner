import { TAGS } from '../data/courses.js'
import { ratingBand } from '../lib/rating.js'

export function RatingChip({ value, isNew, large }) {
  if (isNew) return <span className={large ? 'rating-chip new large' : 'rating-chip new'}>New</span>
  if (value == null) return <span className="rating-chip none">N/A</span>
  return (
    <span className={`rating-chip ${ratingBand(value)}${large ? ' large' : ''}`} title="Average overall rating out of 5">
      {value.toFixed(2)}
    </span>
  )
}

export function TagList({ tags, small }) {
  if (!tags.length) return null
  return (
    <span className={small ? 'tag-list small' : 'tag-list'}>
      {tags.map((t) => (
        <span key={t} className={`tag tag-${t.toLowerCase()}`} title={TAGS[t].name}>
          {TAGS[t].label}
        </span>
      ))}
    </span>
  )
}

export const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path
      d="M10 17s-6.5-4.1-6.5-8.6A3.6 3.6 0 0 1 10 6.1a3.6 3.6 0 0 1 6.5 2.3C16.5 12.9 10 17 10 17Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

export const PlusIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const CheckIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export const CloseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)
