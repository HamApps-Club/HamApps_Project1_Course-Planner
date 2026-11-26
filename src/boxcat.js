// The HamApps box-cat mascot, traced from the logo artwork (ported from the
// animatedboxcat branch's public/boxcat.html) and adapted to run as the hero icon.
// Classes are prefixed `bc-` so they never collide with the rest of the site's CSS.

const EYES = {
  logo: `<path class="bc-solid" d="M392 317 L440 330 L433 447 L390 432 Z"/><path class="bc-solid" d="M522 347 L625 340 L617 533 L515 480 Z"/>`,
  closed: `<path class="bc-ln" d="M386 418 Q412 452 438 432"/><path class="bc-ln" d="M512 468 Q566 524 620 498"/>`,
  happy: `<path class="bc-ln" d="M388 438 Q412 392 438 442"/><path class="bc-ln" d="M515 498 Q566 410 620 502"/>`,
}

function cat({ eyes = 'logo' } = {}) {
  return `
  <g class="bc-rig">
    <path class="bc-body-fill" d="M285 32 L432 102 L675 15 L972 165 L972 580 L605 715 L333 557 L334 178 Z"/>
    <path class="bc-lid" d="M432 102 L675 15 L972 165 L818 226 Z"/>
    <g class="bc-ear"><path class="bc-ln" d="M334 178 L285 32 Q392 28 432 102"/></g>
    <path class="bc-ln" d="M334 178 L331 552 L125 625"/>
    <path class="bc-ln" d="M432 102 L675 15 L972 165 L972 580 L385 822"/>
    <path class="bc-ln" d="M334 552 L608 700"/>
    <path class="bc-ln" d="M820 248 L958 200"/>
    <g class="bc-curlA"><path class="bc-ln" d="M125 625 C125 560 105 500 70 497 C35 495 22 545 25 575 C28 605 40 630 58 645"/></g>
    <g class="bc-curlB"><path class="bc-ln" d="M385 822 C385 760 365 702 330 700 C290 700 275 745 278 770 C282 800 300 820 318 832"/></g>
    <g class="bc-brow"><path class="bc-ln" d="M578 263 C650 195 740 150 808 138"/></g>
    <path class="bc-solid" d="M786 140 L827 136 L816 232 L838 268 L840 365 L778 383 L773 285 Z"/>
    <path class="bc-solid" d="M786 507 L838 492 L845 610 L800 628 L790 620 Z"/>
    <g class="bc-eyes-track"><g class="bc-eyes">${EYES[eyes]}</g></g>
  </g>`
}

// Ambient poses the mascot eases into when left alone for a while.
const AMBIENT_POSES = ['hello', 'curious', 'stretch', 'think', 'love']
const AMBIENT_DELAY = 9000
const AMBIENT_DURATION = 4000

export function mountBoxCat(stage) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  stage.classList.add('bc-stage', 'bc-idle', 'bc-twitch')
  stage.innerHTML = `<svg viewBox="-90 -170 1180 1180" role="img" aria-label="HamApps mascot">${cat()}</svg>`

  const track = stage.querySelector('.bc-eyes-track')
  let ambientTimer = null
  let lastInteraction = 0

  const scheduleAmbient = () => {
    if (reduceMotion) return
    clearTimeout(ambientTimer)
    ambientTimer = setTimeout(() => {
      if (Date.now() - lastInteraction < AMBIENT_DELAY) return scheduleAmbient()
      const pose = AMBIENT_POSES[Math.floor(Math.random() * AMBIENT_POSES.length)]
      stage.classList.remove('bc-idle', 'bc-twitch')
      stage.classList.add(`bc-p-${pose}`)
      setTimeout(() => {
        stage.classList.remove(`bc-p-${pose}`)
        stage.classList.add('bc-idle', 'bc-twitch')
        scheduleAmbient()
      }, AMBIENT_DURATION)
    }, AMBIENT_DELAY)
  }

  if (!reduceMotion) {
    window.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width * 0.45)) / r.width
      const dy = (e.clientY - (r.top + r.height * 0.45)) / r.height
      const k = Math.min(1, Math.hypot(dx, dy) * 2.5)
      const a = Math.atan2(dy, dx)
      track.style.transform = `translate(${Math.cos(a) * 30 * k}px, ${Math.sin(a) * 26 * k}px)`
    })
    scheduleAmbient()
  }

  stage.addEventListener('click', () => {
    lastInteraction = Date.now()
    clearTimeout(ambientTimer)
    stage.classList.remove('bc-jump', 'bc-idle', 'bc-p-hello', 'bc-p-curious', 'bc-p-stretch', 'bc-p-think', 'bc-p-love')
    void stage.offsetWidth
    stage.classList.add('bc-jump')
  })

  stage.addEventListener('animationend', (e) => {
    if (e.animationName === 'bc-jump') {
      stage.classList.remove('bc-jump')
      stage.classList.add('bc-idle', 'bc-twitch')
      scheduleAmbient()
    }
  })
}
