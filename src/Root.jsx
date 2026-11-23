import { useEffect, useState } from 'react'
import App from './App.jsx'
import Home from './home/Home.jsx'

// Simple hash routing so the site works on static hosting (e.g. GitHub Pages):
//   #explore or #schedule -> HamiltonCourses app, anything else -> HamApps home page
const APP_ROUTES = ['#explore', '#schedule']
const isAppRoute = () => APP_ROUTES.includes(window.location.hash)

export default function Root() {
  const [inApp, setInApp] = useState(isAppRoute)

  useEffect(() => {
    const onHash = () => {
      setInApp(isAppRoute())
      if (!isAppRoute() && !window.location.hash) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = inApp ? 'HamiltonCourses' : 'HamApps'
  }, [inApp])

  return inApp ? <App /> : <Home />
}
