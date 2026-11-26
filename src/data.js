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
        open: 'https://hameats.app',
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
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Team Leads', layout: 'compact' },
  { name: 'Members', layout: 'compact' },
]

// Current roster. Team Lead roles are all TBD for now; Board officers are filled in.
export const MEMBERS = [
  { name: 'Brandon Niles Taylor', year: '28', group: 'Board', position: 'President', title: 'PM Lead & Tech Lead', github: 'brandonnilestaylor', roles: ['Board', 'Product Management', 'Engineering', 'Infrastructure'] },
  { name: 'Zhuo (Philip) Li', year: '29', group: 'Board', position: 'Vice President', title: 'PM Lead & Tech Lead', github: 'flp-lab', roles: ['Board', 'Product Management', 'Engineering', 'Design'] },
  { name: 'Haiqi Lyu', year: '29', group: 'Board', position: 'Treasurer', title: 'Graphic Designer', roles: ['Board', 'Design'] },
  { name: 'Maung Thein Nyunt', year: '28', group: 'Board', position: 'Secretary', title: 'Beta Tester', roles: ['Board'] },
  { name: 'TBD', group: 'Team Leads', position: 'PM Lead', title: 'Product Manager', roles: ['Product Management'] },
  { name: 'TBD', group: 'Team Leads', position: 'Tech Lead', title: 'Software Developer', roles: ['Engineering'] },
  { name: 'TBD', group: 'Team Leads', position: 'Infrastructure Lead', title: 'Systems & Deployment', roles: ['Infrastructure'] },
  { name: 'TBD', group: 'Team Leads', position: 'Design Lead', title: 'Product Designer', roles: ['Design'] },
  { name: 'TBD', group: 'Team Leads', position: 'Marketing Lead', title: 'Marketer', roles: ['Marketing'] },
  { name: 'TBD', group: 'Team Leads', position: 'Outreach Lead', title: 'Outreach', roles: ['Outreach'] },
  { name: 'Jun Seo', year: '27', group: 'Members', title: 'Developer', roles: ['Member'] },
]

