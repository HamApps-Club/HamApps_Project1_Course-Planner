// Everything shown on the page lives here. Edit this file to update the site.

export const CONTACT_EMAIL = 'it.admin@hamapps.dev'

const ORG_URL = 'https://github.com/HamAppsDev'

// One card per app. `category` and `color` drive the tag at the top of the card;
// `stats` are the two figures under the description; `image` (800px wide) and `imageLarge`
// (1280px, for sharp screens) are WebP screenshots in public/apps/; see the README.
export const APPS = [
  {
    name: 'Hamilton Scheduler',
    category: 'Course Planning',
    color: '#173A78',
    description:
      'Search Hamilton College courses, build up to three weekly schedules a semester with time-conflict checking, and add them to your calendar.',
    stats: [
      { value: '5x faster', label: 'than student planning' },
      { value: '100%', label: 'user-friendly' },
    ],
    image: '/apps/scheduler-800.webp',
    imageLarge: '/apps/scheduler-1280.webp',
    open: 'https://scheduler.hamapps.dev/',
    code: `${ORG_URL}/HamiltonScheduler`,
  },
  {
    name: 'HamEats',
    category: 'Campus Life',
    color: '#43699A',
    description: 'Today\'s menus and hours for every Hamilton dining hall and cafe, on one page.',
    stats: [
      { value: '1200+', label: 'All time users' },
      { value: '7', label: 'Dining menus' },
    ],
    image: '/apps/hameats-800.webp',
    imageLarge: '/apps/hameats-1280.webp',
    open: 'https://www.hameats.app/',
    code: `${ORG_URL}/hameats`,
  },
]

// The three cards in "Build With Us". `image` is a 4:3 picture in public/develop/.
export const DEVELOP_CARDS = [
  {
    title: 'Request',
    image: '/develop/request.svg',
    text: 'Students, faculty, or campus offices ask us to build an app, or to take over one that already exists.',
  },
  {
    title: 'Contribute',
    image: '/develop/contribute.svg',
    text: 'Join a project team as a developer, designer, product manager, marketer, or tester.',
  },
  {
    title: 'Share',
    image: '/develop/share.svg',
    text: 'Built something for campus already? Submit it and we’ll keep it running after you graduate.',
  },
]

// Groups shown in this order. `layout: 'large'` = big centered cards (like the Board).
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Members', layout: 'compact' },
]

// Current roster.
export const MEMBERS = [
  { name: 'Brandon Niles Taylor', year: '28', group: 'Board', position: 'President', title: 'Product Manager', github: 'brandonnilestaylor', photo: '/team/brandon-niles-taylor.jpg', roles: ['Board', 'Product Management', 'Engineering', 'Infrastructure'] },
  { name: 'Zhuo (Philip) Li', year: '29', group: 'Board', position: 'Vice President', title: 'Product Designer', github: 'flp-lab', photo: '/team/philip-li.jpg', roles: ['Board', 'Product Management', 'Engineering', 'Design'] },
  { name: 'Haiqi Lyu', year: '29', group: 'Board', position: 'Treasurer', title: 'Graphic Designer', photo: '/team/haiqi-lyu-2.jpg', roles: ['Board', 'Design'] },
  { name: 'Maung Thein Nyunt', year: '28', group: 'Board', position: 'Secretary', title: 'Quality Assurance', photo: '/team/maung-thein-nyunt.jpg', roles: ['Board'] },
  { name: 'Jun Seo', year: '27', group: 'Members', title: 'Quality Assurance', photo: '/team/jun-seo.jpg', roles: ['Member'] },
  { name: 'Ian Chang', year: '28', group: 'Members', title: 'Quality Assurance', photo: '/team/ian-chang.jpg', roles: ['Member'] },
]

