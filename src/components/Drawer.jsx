import { useEffect } from 'react'
import { CloseIcon } from './bits.jsx'

// Slide-in panel used to show course details on top of the schedule
export default function Drawer({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="drawer-layer">
      <button className="drawer-scrim" onClick={onClose} aria-label="Close course details" />
      <div className="drawer" role="dialog" aria-modal="true" aria-label={`${title} details`}>
        <button className="drawer-close mini-btn" onClick={onClose} autoFocus>
          <CloseIcon />
          <span className="visually-hidden">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}
