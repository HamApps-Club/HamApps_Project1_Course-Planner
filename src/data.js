// Everything shown on the page lives here. Edit this file to update the site.

// TODO: replace with the club's real email address
export const CONTACT_EMAIL = 'club-email@example.com'

const ORG_URL = 'https://github.com/HamApps-Club'

// Each category has a color used for its dot, the Open button and the card hover border.
// `thumb` picks a built-in placeholder picture (see thumbs in main.js) until real screenshots exist.
export const CATEGORIES = [
  {
    name: 'Course Planning',
    color: '#339AF0',
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
    color: '#FFA94D',
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
    color: '#51CF66',
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
    color: '#F783AC',
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

// Role filter pills (color for each)
export const ROLES = [
  { name: 'Board', color: '#FF6B6B' },
  { name: 'Product Management', color: '#FFA94D' },
  { name: 'Design', color: '#F783AC' },
  { name: 'Marketing', color: '#51CF66' },
  { name: 'Outreach', color: '#20C997' },
  { name: 'Engineering', color: '#339AF0' },
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
