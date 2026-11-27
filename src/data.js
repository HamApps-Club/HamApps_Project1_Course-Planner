// Everything shown on the page lives here. Edit this file to update the site.

export const CONTACT_EMAIL = 'it.admin@hamapps.dev'

const ORG_URL = 'https://github.com/HamAppsDev'

// One card per app. `category` and `color` drive the tag at the top of the card;
// `stats` are the two figures under the description; `image` is a screenshot in public/apps/.
export const APPS = [
  {
    name: 'Hamilton Scheduler',
    category: 'Course Planning',
    color: '#173A78',
    description:
      'Search Hamilton College courses, build up to three weekly schedules a semester with time-conflict checking, and add them to your calendar.',
    stats: [
      { value: '5x faster', label: 'than student planning' },
      { value: 'Extremely', label: 'user-friendly' },
    ],
    image: '/apps/scheduler.jpg',
    open: 'https://scheduler.hamapps.dev/',
    code: `${ORG_URL}/HamiltonScheduler`,
  },
  {
    name: 'Hameats',
    category: 'Campus Life',
    color: '#43699A',
    description: 'Today\'s menus and hours for every Hamilton dining hall and cafe, on one page.',
    stats: [
      { value: '200+', label: 'Daily users' },
      { value: '7', label: 'Dining menus' },
    ],
    image: '/apps/hameats.jpg',
    open: 'https://hameats.app',
    code: `${ORG_URL}/hameats`,
  },
]

// Groups shown in this order. `layout: 'large'` = big centered cards (like the Board).
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Members', layout: 'compact' },
]

// Current roster.
export const MEMBERS = [
  { name: 'Brandon Niles Taylor', year: '28', group: 'Board', position: 'President', title: 'Product Manager', github: 'brandonnilestaylor' },
  { name: 'Zhuo (Philip) Li', year: '29', group: 'Board', position: 'Vice President', title: 'Product Designer', github: 'flp-lab' },
  { name: 'Haiqi Lyu', year: '29', group: 'Board', position: 'Treasurer', title: 'Graphic Designer' },
  { name: 'Maung Thein Nyunt', year: '28', group: 'Board', position: 'Secretary', title: 'Beta Tester' },
  { name: 'Jun Seo', year: '27', group: 'Members', title: 'Beta Tester' },
]

