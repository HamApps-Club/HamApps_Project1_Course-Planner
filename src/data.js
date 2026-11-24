// Everything shown on the page lives here. Edit this file to update the site.

// TODO: replace with the club's real email address
export const CONTACT_EMAIL = 'club-email@example.com'

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
        open: 'https://scheduler.hamapps.dev',
        code: `${ORG_URL}/HamiltonScheduler`,
        credits: 'By the HamApps team.',
        thumb: 'calendar',
      },
    ],
  },
  {
    name: 'Games',
    color: '#315A90',
    apps: [
      {
        name: 'HillGuessr',
        description: 'Guess where on College Hill a mystery photo was taken. Coming soon.',
        open: null,
        code: null,
        credits: 'Idea. Looking for builders.',
        thumb: 'map',
      },
    ],
  },
  {
    name: 'Campus Life',
    color: '#43699A',
    apps: [
      {
        name: 'Commons Menus',
        description: "Compare today's dining hall menus on a single page. Coming soon.",
        open: null,
        code: null,
        credits: 'Idea. Looking for builders.',
        thumb: 'menu',
      },
      {
        name: 'Hill Map',
        description: 'An interactive campus map with buildings, study spots and dining. Coming soon.',
        open: null,
        code: null,
        credits: 'Idea. Looking for builders.',
        thumb: 'map',
      },
    ],
  },
  {
    name: 'Housing',
    color: '#5A79A3',
    apps: [
      {
        name: 'Room Draw Helper',
        description: 'Browse residence hall rooms and plan for housing selection. Coming soon.',
        open: null,
        code: null,
        credits: 'Idea. Looking for builders.',
        thumb: 'table',
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
]

// Groups shown in this order. `layout: 'large'` = big centered cards (like the Board).
export const GROUPS = [
  { name: 'Board', layout: 'large' },
  { name: 'Team Leads', layout: 'compact' },
  { name: 'Members', layout: 'compact' },
]

// PLACEHOLDER roster. Replace with real members.
// photo: path to an image in /public (optional) · github: username (optional) · site: URL (optional)
export const MEMBERS = [
  { name: 'Your Name', year: '28', group: 'Board', position: 'President', title: 'Software Developer', roles: ['Board', 'Engineering'] },
  { name: 'Your Name', year: '28', group: 'Board', position: 'Vice President', title: 'Designer & Developer', roles: ['Board', 'Design'] },
  { name: 'Your Name', year: '29', group: 'Board', position: 'Head of Marketing', title: 'Marketer', roles: ['Board', 'Marketing'] },
  { name: 'Your Name', year: '29', group: 'Board', position: 'Treasurer', title: 'Outreach', roles: ['Board', 'Outreach'] },
  { name: 'Your Name', year: '29', group: 'Team Leads', position: 'PM Lead', title: 'Product Manager', roles: ['Product Management'] },
  { name: 'Your Name', year: '28', group: 'Team Leads', position: 'Tech Lead', title: 'Software Developer', roles: ['Engineering'] },
  { name: 'Your Name', year: '29', group: 'Team Leads', position: 'Design Lead', title: 'Product Designer', roles: ['Design'] },
  { name: 'Your Name', year: '29', group: 'Members', title: 'Software Developer', roles: ['Engineering'] },
  { name: 'Your Name', year: '30', group: 'Members', title: 'Software Developer', roles: ['Engineering'] },
  { name: 'Your Name', year: '30', group: 'Members', title: 'Outreach', roles: ['Outreach'] },
]
