// PostHog analytics for hamapps.dev, shared "HamApps" project (also used by the Scheduler and HamEats).
// The phc_ key is PostHog's public, send-only project key: it is meant to ship in the browser.
// Loaded by index.html and join.html. Only runs on the live site, so local dev never adds fake visits.
const POSTHOG_KEY = 'phc_pRMhKfUTLbr9LWvxuor7h3JnqWKVCUYaxycy5TQL9HPs'
const LIVE_HOSTS = ['hamapps.dev']

/** What a link points to, as an event name and properties. null = not worth tracking. */
function classify(a) {
  const url = new URL(a.href, location.href)
  if (url.protocol === 'mailto:') return ['email_clicked', {}]
  const host = url.hostname.replace(/^www\./, '')
  if (host === 'scheduler.hamapps.dev') return ['app_opened', { app_name: 'scheduler' }]
  if (host === 'hameats.app') return ['app_opened', { app_name: 'hameats' }]
  if (host === 'discord.gg' || host.endsWith('discord.com')) return ['discord_join_clicked', {}]
  if (host === 'github.com') return ['github_clicked', { github_path: url.pathname }]
  if (host === 'hamapps.dev' && url.pathname.replace(/\.html$/, '') === '/join') return ['join_page_clicked', {}]
  return null
}

if (LIVE_HOSTS.includes(location.hostname)) {
  // Loaded after the page, so it never slows down the first paint.
  import('posthog-js').then(({ default: posthog }) => {
    posthog.init(POSTHOG_KEY, {
      api_host: 'https://us.i.posthog.com',
      ui_host: 'https://us.posthog.com',
      defaults: '2025-05-24',
      person_profiles: 'identified_only',
      disable_session_recording: true, // no screen recordings, analytics events only
    })
    posthog.register({ app: 'homepage' })

    document.addEventListener('click', (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null
      const hit = a && classify(a)
      if (!hit) return
      const [event, props] = hit
      // Which part of the page the click came from (hero, apps, team, ...).
      const section = a.closest('section[id], header, footer, [data-section]')
      posthog.capture(
        event,
        { ...props, link_text: a.textContent.trim().slice(0, 60), page_section: section?.id || section?.dataset.section || section?.tagName.toLowerCase() },
        { send_instantly: true }, // the visitor may be leaving the page
      )
    })
  }).catch(() => {}) // blocked by an ad-blocker: the site works the same without analytics
}
