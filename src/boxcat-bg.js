// Falling box-cat background, ported from the animatedboxcat branch's "For backgrounds"
// demo (public/boxcat.html). Unlike the demo, every spawned cat gets a pose picked at
// random from the full pool each time it (re)spawns, so the same pose never clumps together.

function cat({ shadow = true, t = {} } = {}) {
  const st = (k) => (t[k] ? ` style="transform:${t[k]};${t[k + 'O'] ? 'transform-origin:' + t[k + 'O'] : ''}"` : '')
  return `
  ${shadow ? `<ellipse class="bcbg-shadow" cx="560" cy="880" rx="420" ry="30"/>` : ''}
  <g class="bcbg-rig"${st('rig')}>
    <path class="bcbg-body" d="M285 32 L432 102 L675 15 L972 165 L972 580 L605 715 L333 557 L334 178 Z"/>
    <path class="bcbg-lid" d="M432 102 L675 15 L972 165 L818 226 Z"/>
    <path class="bcbg-ln" d="M334 178 L285 32 Q392 28 432 102"/>
    <path class="bcbg-ln" d="M334 178 L331 552 L125 625"/>
    <path class="bcbg-ln" d="M432 102 L675 15 L972 165 L972 580 L385 822"/>
    <path class="bcbg-ln" d="M334 552 L608 700"/>
    <path class="bcbg-ln" d="M820 248 L958 200"/>
    <path class="bcbg-ln" d="M125 625 C125 560 105 500 70 497 C35 495 22 545 25 575 C28 605 40 630 58 645"/>
    <path class="bcbg-ln" d="M385 822 C385 760 365 702 330 700 C290 700 275 745 278 770 C282 800 300 820 318 832"/>
    <path class="bcbg-ln" d="M578 263 C650 195 740 150 808 138"/>
    <path class="bcbg-solid" d="M786 140 L827 136 L816 232 L838 268 L840 365 L778 383 L773 285 Z"/>
    <path class="bcbg-solid" d="M786 507 L838 492 L845 610 L800 628 L790 620 Z"/>
    <path class="bcbg-solid" d="M392 317 L440 330 L433 447 L390 432 Z"/>
    <path class="bcbg-solid" d="M522 347 L625 340 L617 533 L515 480 Z"/>
  </g>`
}

const mini = (x, y, sc) => `<g transform="translate(${x} ${y}) scale(${sc} ${sc})">${cat({ shadow: false })}</g>`
const flame = (x, y, sc) =>
  `<path class="bcbg-flame" d="M${x - 46 * sc} ${y} Q${x} ${y + 260 * sc} ${x} ${y + 300 * sc} Q${x} ${y + 260 * sc} ${x + 46 * sc} ${y} Z"/>`

const BG = {
  falling: () => cat({ shadow: false, t: { rig: 'rotate(16deg)', rigO: '500px 450px' } }),
  parachute: () =>
    `<path class="bcbg-chute" d="M30 250 Q500 -300 970 250 Q852 205 735 250 Q617 205 500 250 Q382 205 265 250 Q147 205 30 250 Z"/>` + mini(200, 330, 0.6),
  umbrella: () =>
    `<path class="bcbg-chute" d="M-50 130 Q200 -300 450 130 Q388 100 325 130 Q262 100 200 130 Q138 100 75 130 Q12 100 -50 130 Z"/>` +
    cat({ shadow: false, t: { rig: 'translate(40px,60px)' } }),
  balloon: () =>
    `<ellipse class="bcbg-balloon" cx="170" cy="20" rx="140" ry="160"/>` + cat({ shadow: false, t: { rig: 'translate(40px,80px) rotate(-6deg)' } }),
  bubble: () => mini(140, 150, 0.74) + `<circle class="bcbg-bubble" cx="510" cy="440" r="480"/>`,
  cloud: () => mini(170, 90, 0.66) + `<g class="bcbg-cloud"><circle cx="240" cy="740" r="160"/><circle cx="500" cy="680" r="210"/><circle cx="770" cy="740" r="170"/><rect x="240" y="740" width="530" height="160"/></g>`,
  plane: () => mini(150, 40, 0.72) + `<path class="bcbg-plane" d="M-40 690 L1060 540 L300 900 Z"/>`,
  rocket: () => flame(430, 770, 1) + flame(700, 670, 0.9) + cat({ shadow: false, t: { rig: 'translate(0,-80px)' } }),
  tumble: () => cat({ shadow: false }),
}
const POOL = Object.keys(BG)

const svg = (inner, box = '-70 -150 1140 1140') => `<svg viewBox="${box}" aria-hidden="true">${inner}</svg>`

export function mountBoxCatBg(container) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  let W = 0
  let H = 0
  let parts = []
  let last = 0
  let visible = true

  // Shuffle-bag randomizer to avoid clumping into the same pose.
  let bag = []
  let lastPick = null
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const pick = () => {
    if (bag.length === 0) {
      bag = shuffle([...POOL])
      if (bag.length > 1 && bag[0] === lastPick) {
        ;[bag[0], bag[1]] = [bag[1], bag[0]]
      }
    }
    lastPick = bag.pop()
    return lastPick
  }

  function spawn(p, fresh) {
    p.id = pick()
    p.el.innerHTML = svg(BG[p.id]())
    p.size = 56 + Math.random() * 70
    p.v = 40 + Math.random() * 50 + (130 - p.size) * 0.4
    p.phase = Math.random() * 6.28
    p.rot = (Math.random() - 0.5) * 30
    p.x = pickX(p.size)
    p.y = fresh ? Math.random() * H : -p.size * 1.2
    p.el.style.width = p.el.style.height = p.size + 'px'
  }

  // Keep spawns out of the centered text column so the headline stays readable.
  const pickX = (size) => {
    const safeStart = W * 0.3
    const safeEnd = W * 0.7
    let x = Math.random() * (W - size)
    if (x + size > safeStart && x < safeEnd) {
      x = Math.random() < 0.5 ? Math.random() * Math.max(0, safeStart - size) : safeEnd + Math.random() * Math.max(0, W - safeEnd - size)
    }
    return x
  }

  function build() {
    W = container.clientWidth
    H = container.clientHeight
    const n = Math.max(8, Math.min(20, Math.round(W / 60)))
    container.innerHTML = ''
    parts = Array.from({ length: n }, () => {
      const el = document.createElement('div')
      el.className = 'bcbg-part'
      el.style.opacity = (0.22 + Math.random() * 0.26).toFixed(2)
      container.appendChild(el)
      const p = { el }
      spawn(p, true)
      return p
    })
    draw(0)
  }

  function draw(dt) {
    for (const p of parts) {
      p.phase += dt * 1.6
      p.y += p.v * dt
      p.x += Math.sin(p.phase) * 14 * dt
      if (p.y > H + 10) spawn(p, false)
      p.rot += 0
      const sway = Math.sin(p.phase) * 8
      p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot + sway}deg)`
    }
  }

  function tick(t) {
    const dt = Math.min(0.05, (t - last) / 1000 || 0)
    last = t
    if (visible) draw(dt)
    requestAnimationFrame(tick)
  }

  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting
  }).observe(container)

  let rz
  addEventListener('resize', () => {
    clearTimeout(rz)
    rz = setTimeout(build, 200)
  })

  build()
  requestAnimationFrame(tick)
}
