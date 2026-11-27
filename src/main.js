import { CATEGORIES, CONTACT_EMAIL, GROUPS, MEMBERS } from './data.js'
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

/* ---------- app placeholder thumbnails ---------- */
const thumbs = {
  calendar: () => {
    const cols = ['#C6D5ED', '#E3C777', '#D9E4F3', '#F0DFA7', '#9FB7DA']
    let blocks = ''
    const spots = [[0, 1, 2], [1, 0, 1], [2, 1, 2], [3, 0, 1], [4, 1, 2], [1, 3, 2], [3, 3, 2], [0, 4, 1], [2, 4, 1], [4, 4, 1], [2, 6, 2]]
    spots.forEach(([d, t, h], i) => {
      blocks += `<rect x="${8 + d * 37}" y="${22 + t * 15}" width="33" height="${h * 15 - 3}" rx="2" fill="${cols[i % cols.length]}"/>`
    })
    return `<svg viewBox="0 0 200 150"><rect width="200" height="150" fill="#fff"/><rect width="200" height="14" fill="#E7EEF8"/>${blocks}</svg>`
  },
  map: () =>
    `<svg viewBox="0 0 200 150"><rect width="200" height="150" fill="#E7EEF8"/><path d="M0 100 C50 80 90 120 200 70" stroke="#fff" stroke-width="8" fill="none"/><path d="M60 0 L90 150" stroke="#fff" stroke-width="6"/><rect x="110" y="20" width="30" height="22" fill="#A9BFDF" stroke="#456A9E"/><rect x="20" y="30" width="26" height="30" fill="#A9BFDF" stroke="#456A9E"/><rect x="130" y="95" width="34" height="24" fill="#A9BFDF" stroke="#456A9E"/><circle cx="118" cy="66" r="8" fill="#E3C777"/></svg>`,
  menu: () => {
    let lines = ''
    for (let c = 0; c < 3; c++) for (let r = 0; r < 7; r++) lines += `<rect x="${12 + c * 62}" y="${40 + r * 14}" width="${40 + ((r * 7 + c * 3) % 14)}" height="5" rx="2" fill="#CED4DA"/>`
    return `<svg viewBox="0 0 200 150"><rect width="200" height="150" fill="#fff"/><rect width="200" height="26" fill="#F1F3F5"/><rect x="70" y="9" width="60" height="8" rx="3" fill="#868E96"/>${lines}</svg>`
  },
  table: () => {
    let rows = ''
    for (let r = 0; r < 8; r++) rows += `<rect x="10" y="${30 + r * 14}" width="180" height="1" fill="#DCE5F1"/><rect x="14" y="${34 + r * 14}" width="40" height="5" rx="2" fill="#C6D5ED"/><rect x="70" y="${34 + r * 14}" width="60" height="5" rx="2" fill="#C6D5ED"/><rect x="160" y="${33 + r * 14}" width="24" height="7" rx="3" fill="#E3C777"/>`
    return `<svg viewBox="0 0 200 150"><rect width="200" height="150" fill="#fff"/><rect width="200" height="18" fill="#173A78"/>${rows}</svg>`
  },
}

const openIcon = `<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" stroke-width="2.5" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>`
const ghIcon = `<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>`

const link = (href, cls, inner, title) =>
  href
    ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener noreferrer"${title ? ` title="${title}"` : ''}>${inner}</a>`
    : `<span class="${cls} is-disabled" title="Coming soon">${inner}</span>`

const appsEl = document.getElementById('app-categories')
let delay = 0
const renderCategories = (categories, headingTag) => categories.map(
  (cat) => `
  <div class="category">
    <div class="category-head">
      <span class="dot" style="background:${cat.color}"></span>
      <${headingTag}>${esc(cat.name)}</${headingTag}>
      <span class="rule"></span>
    </div>
    <div class="app-grid">
      ${cat.apps
        .map((app) => {
          delay += 0.05
          return `
        <article class="app-card fade-up" style="animation-delay:${delay.toFixed(2)}s">
          <div class="app-left">
            ${link(app.open, 'thumb', thumbs[app.thumb]?.() ?? '')}
            <div class="app-actions">
              ${link(app.open, 'pill-open', `${openIcon} Open`)}
              ${link(app.code, 'pill-code', `${ghIcon} Code`, 'View source code')}
            </div>
          </div>
          <div class="app-right">
            ${app.open ? `<a href="${esc(app.open)}" target="_blank" rel="noopener"><h4>${esc(app.name)}</h4></a>` : `<h4>${esc(app.name)}</h4>`}
            <p class="app-desc">${esc(app.description)}</p>
            <p class="app-credits">${esc(app.credits)}</p>
          </div>
        </article>`
        })
        .join('')}
    </div>
  </div>`,
).join('')

appsEl.innerHTML = renderCategories(CATEGORIES, 'h3')

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
  if (m.github) parts.push(`<a href="https://github.com/${esc(m.github)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile for ${esc(m.name)}">${ghIcon.replace(/13/g, '18')}</a>`)
  if (m.site) parts.push(`<a href="${esc(m.site)}" target="_blank" rel="noopener noreferrer" aria-label="Website for ${esc(m.name)}">${openIcon.replace(/13/g, '18')}</a>`)
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
