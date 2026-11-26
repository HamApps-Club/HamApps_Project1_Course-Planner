// Static box-cat illustrations for the "Create the Next HamApp" cards.
// Geometry is the traced logo from the art branch, in its 1000 x 856 drawing space.

const EYES = {
  logo: `<path class="da-solid" d="M392 317 L440 330 L433 447 L390 432 Z"/><path class="da-solid" d="M522 347 L625 340 L617 533 L515 480 Z"/>`,
  happy: `<path class="da-ln" d="M388 438 Q412 392 438 442"/><path class="da-ln" d="M515 498 Q566 410 620 502"/>`,
}

function cat({ eyes = 'logo', eyeShift = '', front = '' } = {}) {
  return `
  <ellipse class="da-shadow" cx="560" cy="880" rx="420" ry="30"/>
  <path class="da-body" d="M285 32 L432 102 L675 15 L972 165 L972 580 L605 715 L333 557 L334 178 Z"/>
  <path class="da-lid" d="M432 102 L675 15 L972 165 L818 226 Z"/>
  <path class="da-ln" d="M334 178 L285 32 Q392 28 432 102"/>
  <path class="da-ln" d="M334 178 L331 552 L125 625"/>
  <path class="da-ln" d="M432 102 L675 15 L972 165 L972 580 L385 822"/>
  <path class="da-ln" d="M334 552 L608 700"/>
  <path class="da-ln" d="M820 248 L958 200"/>
  <path class="da-ln" d="M125 625 C125 560 105 500 70 497 C35 495 22 545 25 575 C28 605 40 630 58 645"/>
  <path class="da-ln" d="M385 822 C385 760 365 702 330 700 C290 700 275 745 278 770 C282 800 300 820 318 832"/>
  <path class="da-ln" d="M578 263 C650 195 740 150 808 138"/>
  <path class="da-solid" d="M786 140 L827 136 L816 232 L838 268 L840 365 L778 383 L773 285 Z"/>
  <path class="da-solid" d="M786 507 L838 492 L845 610 L800 628 L790 620 Z"/>
  <g transform="${eyeShift}">${EYES[eyes]}</g>
  ${front}`
}

const place = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`

const request = `
  ${place(330, 330, 0.6, cat())}
  <path d="M428 50 H852 Q900 50 900 98 V222 Q900 270 852 270 H620 L560 330 L560 270 H428 Q380 270 380 222 V98 Q380 50 428 50 Z"
    fill="#fff" stroke="#0f366f" stroke-width="22" stroke-linejoin="round"/>
  <path d="M440 118 H840" stroke="#0f366f" stroke-width="22" stroke-linecap="round"/>
  <path d="M440 162 H770" stroke="#0f366f" stroke-width="22" stroke-linecap="round"/>
  <path d="M440 206 H620" stroke="#e3c777" stroke-width="22" stroke-linecap="round"/>`

const laptop = `
  <path d="M360 560 L720 590 L705 800 L345 770 Z" fill="#fff" stroke="#0f366f" stroke-width="30" stroke-linejoin="round"/>
  <circle cx="530" cy="680" r="24" fill="#e3c777"/>
  <path d="M250 800 L720 812 L840 870 L310 880 Z" fill="#fff" stroke="#0f366f" stroke-width="28" stroke-linejoin="round"/>`

const contribute = `
  ${place(300, 250, 0.62, cat({ eyeShift: 'translate(0 20)', front: laptop }))}
  <text x="600" y="210" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="140" fill="#e3c777">&lt;/&gt;</text>`

const share = `
  <ellipse cx="600" cy="848" rx="230" ry="18" fill="#0f366f" opacity=".1"/>
  <rect x="410" y="40" width="380" height="790" rx="62" fill="#fff" stroke="#0f366f" stroke-width="18"/>
  <rect x="432" y="62" width="336" height="746" rx="44" fill="#0f366f"/>
  <rect x="550" y="80" width="100" height="22" rx="11" fill="#082048"/>
  <rect x="452" y="122" width="96" height="8" rx="4" fill="#f8f4ee"/>
  <rect x="552" y="122" width="96" height="8" rx="4" fill="#f8f4ee" opacity=".85"/>
  <rect x="652" y="122" width="96" height="8" rx="4" fill="#f8f4ee" opacity=".35"/>
  <circle cx="474" cy="168" r="20" fill="#0f366f" stroke="#e3c777" stroke-width="5"/>
  <path d="M466 160 L470 176 L482 172 Z" fill="#e3c777"/>
  <text x="506" y="176" font-family="Nunito, sans-serif" font-weight="800" font-size="24" fill="#f8f4ee">hamapps</text>
  <text x="746" y="176" text-anchor="end" font-family="Nunito, sans-serif" font-weight="800" font-size="30" fill="#f8f4ee">&#x2715;</text>
  <g class="da-dark">${place(452, 250, 0.3, cat({ eyes: 'happy' }))}</g>
  <g transform="rotate(-4 600 588)">
    <rect x="490" y="560" width="220" height="56" rx="14" fill="#e3c777"/>
    <text x="600" y="598" text-anchor="middle" font-family="Fredoka, Nunito, sans-serif" font-weight="600" font-size="30" fill="#0f366f">New HamApp!</text>
  </g>
  <rect x="452" y="716" width="200" height="60" rx="30" fill="#f8f4ee"/>
  <circle cx="486" cy="746" r="18" fill="#0f366f" stroke="#e3c777" stroke-width="5"/>
  <text x="514" y="755" font-family="Nunito, sans-serif" font-weight="800" font-size="24" fill="#0f366f">Your story</text>
  <circle cx="712" cy="746" r="32" fill="#f8f4ee"/>
  <path d="M698 746 H724 M714 735 L726 746 L714 757" fill="none" stroke="#0f366f" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="560" cy="760" r="42" fill="none" stroke="#e3c777" stroke-width="5" opacity=".9"/>
  <circle cx="560" cy="760" r="62" fill="none" stroke="#e3c777" stroke-width="4" opacity=".45"/>`

const CARDS = [
  { title: 'Request', art: request, text: 'Students, faculty, or campus offices ask us to build an app, or to take over one that already exists.' },
  { title: 'Contribute', art: contribute, text: 'Join a project team as a developer, designer, product manager, marketer, or tester.' },
  { title: 'Share', art: share, text: 'Built something for campus already? Submit it and we\u2019ll keep it running after you graduate.' },
]

export function renderDevelopCards(el) {
  el.innerHTML = CARDS.map(
    (c) => `
    <article class="step">
      <div class="step-art"><svg viewBox="0 0 1200 900" aria-hidden="true">${c.art}</svg></div>
      <h3>${c.title}</h3>
      <p>${c.text}</p>
    </article>`,
  ).join('')
}
