// Everything shown on the page lives here. Edit this file to update the site.

export const CONTACT_EMAIL = 'it.admin@hamapps.dev'

const ORG_URL = 'https://github.com/HamAppsDev'

// Category dots use shades of the club's blue palette.
// `thumb` picks a built-in placeholder picture (see thumbs in main.js) until real screenshots exist.
export const CATEGORIES = [
  {
    name: 'Course Planning',
    color: '#173A78',
    apps: [
      {
        name: 'Hamilton Scheduler',
        description:
          'Search Hamilton College courses, build up to three weekly schedules a semester with time-conflict checking, and add them to your calendar.',
        open: 'https://scheduler.hamapps.dev/',
        code: `${ORG_URL}/HamiltonScheduler`,
        credits: 'By the HamApps team.',
        thumb: 'calendar',
      },
    ],
  },
  {
    name: 'Campus Life',
    color: '#43699A',
    apps: [
      {
        name: 'Hameats',
        description: 'Today\'s menus and hours for every Hamilton dining hall and cafe, on one page.',
        open: 'https://hameats.app',
        code: null,
        credits: 'For the Hamilton community.',
        thumb: 'menu',
      },
    ],
  },
]

// Groups shown in this order. `layout: 'large'` = big centered cards (like the Board).
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Members', layout: 'compact' },
]

// Current roster.
export const MEMBERS = [
  { name: 'Brandon Niles Taylor', year: '28', group: 'Board', position: 'President', title: 'Product Manager', github: 'brandonnilestaylor', roles: ['Board', 'Product Management', 'Engineering', 'Infrastructure'] },
  { name: 'Zhuo (Philip) Li', year: '29', group: 'Board', position: 'Vice President', title: 'Product Designer', github: 'flp-lab', roles: ['Board', 'Product Management', 'Engineering', 'Design'] },
  { name: 'Haiqi Lyu', year: '29', group: 'Board', position: 'Treasurer', title: 'Graphic Designer', roles: ['Board', 'Design'] },
  { name: 'Maung Thein Nyunt', year: '28', group: 'Board', position: 'Secretary', title: 'Beta Tester', roles: ['Board'] },
  { name: 'Jun Seo', year: '27', group: 'Members', title: 'Beta Tester', roles: ['Member'] },
]

