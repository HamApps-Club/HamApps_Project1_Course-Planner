import { APPS, CONTACT_EMAIL, GROUPS, MEMBERS } from './data.js'
import { mountBoxCat } from './boxcat.js'
import { mountBoxCatBg } from './boxcat-bg.js'
import { renderDevelopCards } from './develop-art.js'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

/* ---------- hero mascot ---------- */
const heroStage = document.getElementById('hero-logo-stage')
if (heroStage) mountBoxCat(heroStage)

const heroBg = document.getElementById('hero-bg')
if (heroBg) mountBoxCatBg(heroBg)

const developCards = document.getElementById('develop-cards')
if (developCards) renderDevelopCards(developCards)


/* ---------- smooth scroll buttons ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-scroll]')
  if (!btn) return
  const target = document.getElementById(btn.dataset.scroll)
  target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
})

/* ---------- email text + copy chip ---------- */
document.querySelectorAll('.email-text').forEach((el) => (el.textContent = CONTACT_EMAIL))

const chip = document.getElementById('email-chip')
const tooltip = document.getElementById('copy-tooltip')
chip?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(CONTACT_EMAIL)
  } catch {
    /* clipboard blocked: still show feedback */
  }
  chip.classList.add('copied')
  tooltip.classList.add('show')
  setTimeout(() => {
    chip.classList.remove('copied')
    tooltip.classList.remove('show')
  }, 1600)
})

const openIcon = `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" stroke-width="2.5" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>`
const ghIcon = `<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`

// Resize an icon by its width/height only (the path data also contains 13s).
const sized = (icon, px) => icon.replace('width="13" height="13"', `width="${px}" height="${px}"`)

const link = (href, cls, inner, title) =>
  href
    ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${inner}</a>`
    : `<span class="${cls} is-disabled" title="Coming soon">${inner}</span>`

/* ---------- apps ---------- */
const appsEl = document.getElementById('app-cards')
appsEl.innerHTML = APPS.map(
  (app, i) => `
  <article class="app-card fade-up" style="animation-delay:${(0.05 + i * 0.08).toFixed(2)}s">
    <span class="app-tag"><span class="dot" style="background:${esc(app.color)}"></span>${esc(app.category)}</span>
    <h3 class="app-name">${esc(app.name)}</h3>
    <p class="app-desc">${esc(app.description)}</p>
    <div class="app-stats">
      ${app.stats.map((st) => `<div class="app-stat"><span class="app-stat-value">${esc(st.value)}</span><span class="app-stat-label">${esc(st.label)}</span></div>`).join('')}
    </div>
    ${link(app.open, 'app-shot', `<img src="${esc(app.image)}" alt="Screenshot of ${esc(app.name)}" width="1280" height="960" loading="lazy" />`)}
    <div class="app-actions">
      ${link(app.open, 'app-btn app-btn-open', `${sized(openIcon, 18)} Open`)}
      ${link(app.code, 'app-btn app-btn-code', `${sized(ghIcon, 18)} GitHub`, 'View source code')}
    </div>
  </article>`,
).join('')

/* ---------- team ---------- */
const groupsEl = document.getElementById('member-groups')

const initials = (name) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const avatar = (m) =>
  m.photo
    ? `<img class="avatar" src="${esc(m.photo)}" alt="" loading="lazy" />`
    : `<span class="avatar avatar-empty" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="7" fill="#fff"/><path d="M6 38c1-8 7-12 14-12s13 4 14 12" fill="#fff"/></svg></span>`

const memberLinks = (m) => {
  const parts = []
  if (m.github) parts.push(`<a href="https://github.com/${esc(m.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile for ${esc(m.name)}">${sized(ghIcon, 18)}</a>`)
  if (m.site) parts.push(`<a href="${esc(m.site)}" target="_blank" rel="noopener noreferrer" aria-label="Website for ${esc(m.name)}">${sized(openIcon, 18)}</a>`)
  return parts.length ? `<div class="member-links">${parts.join('')}</div>` : ''
}

function renderMembers() {
  groupsEl.innerHTML = GROUPS.map((g) => {
    const people = MEMBERS.filter((m) => m.group === g.name)
    if (!people.length) return ''
    return `
    <section class="member-group">
      <div class="group-head"><h4>${esc(g.name)}</h4><span class="rule"></span></div>
      <ul class="member-grid ${g.layout}">
        ${people
          .map((m) => {
            const id = MEMBERS.indexOf(m)
            const isTbd = m.name === 'TBD'
            return `
          <li class="member${isTbd ? ' is-tbd' : ''}" style="view-transition-name: member-${id}">
            <div class="member-portrait">${avatar(m)}${g.layout === 'compact' ? memberLinks(m) : ''}</div>
            <div class="member-content">
              <span class="member-name">${esc(m.name)}${m.year ? ` <span class="member-year">'${esc(m.year)}</span>` : ''}</span>
              ${
                m.leadRoles
                  ? `<div class="member-roles">${m.leadRoles
                      .map((r) => `<div class="member-role"><span class="member-position">${esc(r.position)}</span><span class="member-title">${esc(r.title)}</span></div>`)
                      .join('')}</div>`
                  : `${m.position ? `<span class="member-position">${esc(m.position)}</span>` : ''}<span class="member-title">${esc(m.title)}</span>`
              }
              ${g.layout === 'large' ? memberLinks(m) : ''}
            </div>
          </li>`
          })
          .join('')}
      </ul>
    </section>`
  }).join('')
}

renderMembers()
