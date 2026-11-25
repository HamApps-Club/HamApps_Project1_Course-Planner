// Everything shown on the page lives here. Edit this file to update the site.

export const CONTACT_EMAIL = 'it.admin@hamapps.dev'

const ORG_URL = 'https://github.com/HamApps-Club'

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
          'Search Hamilton College courses, read ratings and comments, and build your weekly schedule with conflict checking.',
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
        description: 'Explore campus dining with Hameats.',
        open: 'https://www.hameats.app/',
        code: null,
        credits: 'For the Hamilton community.',
        thumb: 'menu',
      },
    ],
  },
]

// Team roles use the same blue and gold filter treatment.
export const ROLES = [
  { name: 'Board' },
  { name: 'Product Management' },
  { name: 'Design' },
  { name: 'Marketing' },
  { name: 'Outreach' },
  { name: 'Engineering' },
  { name: 'Infrastructure' },
  { name: 'Member' },
]

// Groups shown in this order. `layout: 'large'` = big centered cards (like the Board).
// 'Team Leads' renders from LEADS below instead of MEMBERS, since a lead can also be an officer.
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Team Leads', layout: 'compact' },
  { name: 'Members', layout: 'compact' },
]

// Lead assignments per the HamApps constitution. `names: []` shows as "TBD".
export const LEADS = [
  { title: 'PM Lead', role: 'Product Management', names: ['Brandon Taylor', 'Zhuo (Philip) Li'] },
  { title: 'Tech Lead', role: 'Engineering', names: ['Brandon Taylor', 'Zhuo (Philip) Li'] },
  { title: 'Infrastructure Lead', role: 'Infrastructure', names: ['Brandon Taylor'] },
  { title: 'Design Lead', role: 'Design', names: [] },
  { title: 'Marketing Lead', role: 'Marketing', names: [] },
  { title: 'Outreach Lead', role: 'Outreach', names: [] },
]

// Current roster. `group: 'Team Leads'` entries are no longer used here — see LEADS above.
export const MEMBERS = [
  { name: 'Brandon Taylor', year: '28', group: 'Board', position: 'President', title: 'PM Lead & Tech Lead', roles: ['Board', 'Product Management', 'Engineering', 'Infrastructure'] },
  { name: 'Zhuo (Philip) Li', year: '29', group: 'Board', position: 'Vice President', title: 'PM Lead & Tech Lead', roles: ['Board', 'Product Management', 'Engineering', 'Design'] },
  { name: 'Haiqi Lyu', year: '29', group: 'Board', position: 'Secretary', title: 'Graphic Designer', roles: ['Board', 'Design'] },
  { name: 'Maun', year: '28', group: 'Board', position: 'Treasurer', title: 'Beta Tester', roles: ['Board'] },
  { name: 'June', year: '27', group: 'Members', title: 'Developer', roles: ['Member'] },
]
