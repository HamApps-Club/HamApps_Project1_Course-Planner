// Content for the HamApps home page. Edit this file to add apps or team members.

export const REPO_URL = 'https://github.com/HamApps-Club/HamApps_Project1_Course-Planner'

export const APP_GROUPS = [
  {
    title: 'Course planning',
    apps: [
      {
        name: 'HamiltonCourses',
        status: 'Preview',
        featured: true,
        description:
          'Search every course, read past ratings and comments, then add your picks to a weekly schedule that flags time conflicts.',
        features: ['Course ratings & comments', 'Weekly schedule builder', 'Requirement filters (W, QSR, SSIH)'],
        href: '#explore',
        code: REPO_URL,
        credit: 'By the HamApps team',
      },
    ],
  },
  {
    title: 'Ideas we want to build',
    apps: [
      {
        name: 'Commons Menus',
        status: 'Idea',
        description: 'Today’s menus for the dining halls on one page, with allergen filters.',
        icon: 'menu',
      },
      {
        name: 'Hill Map',
        status: 'Idea',
        description: 'A campus map that finds buildings, study spaces and where your next class meets.',
        icon: 'map',
      },
      {
        name: 'Room Draw Helper',
        status: 'Idea',
        description: 'Browse residence hall rooms, compare floor plans and plan for housing selection.',
        icon: 'door',
      },
    ],
  },
]

export const CRITERIA = [
  { icon: 'heart', text: 'It makes student life at Hamilton better, or helps a local non-profit.' },
  { icon: 'check', text: 'It works end to end, without major bugs.' },
  { icon: 'code', text: 'It uses modern, well-supported tools so others can keep it running.' },
]

export const TEAM_FILTERS = ['All', 'Board', 'Engineering', 'Design', 'Outreach']

// Placeholder seats until the club adds real members
export const TEAM = [
  { role: 'President', group: 'Board' },
  { role: 'Vice President', group: 'Board' },
  { role: 'Tech Lead', group: 'Engineering' },
  { role: 'Software Developer', group: 'Engineering' },
  { role: 'Software Developer', group: 'Engineering' },
  { role: 'Product Designer', group: 'Design' },
  { role: 'Outreach Lead', group: 'Outreach' },
  { role: 'Marketing', group: 'Outreach' },
]
