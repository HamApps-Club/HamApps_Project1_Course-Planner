import { useEffect, useRef } from 'react'

export default function Toast({ message, onDone }) {
  const done = useRef(onDone)

  useEffect(() => {
    done.current = onDone
  })

  useEffect(() => {
    const t = setTimeout(() => done.current(), 3200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="toast" role="status">
      {message}
    </div>
  )
}
