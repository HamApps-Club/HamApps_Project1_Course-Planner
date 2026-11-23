// SAMPLE DATA ONLY.
// These courses, instructors, ratings and comments are placeholders written for the
// front-end draft. Replace them with real catalog data once the club has a source.

export const TERMS = ['Fall 2026', 'Spring 2027']

export const DEPARTMENTS = {
  ARTH: 'Art History',
  BIO: 'Biology',
  CHEM: 'Chemistry',
  CPSCI: 'Computer Science',
  ECON: 'Economics',
  ENGL: 'Literature & Creative Writing',
  ENVST: 'Environmental Studies',
  GOVT: 'Government',
  HIST: 'History',
  MATH: 'Mathematics',
  MUSIC: 'Music',
  PHIL: 'Philosophy',
  PHYS: 'Physics',
  PSYCH: 'Psychology',
  SOC: 'Sociology',
  SPNST: 'Hispanic Studies',
  THEAT: 'Theatre',
}

// Hamilton-style requirement tags
export const TAGS = {
  W: { label: 'W', name: 'Writing-intensive' },
  QSR: { label: 'QSR', name: 'Quantitative & Symbolic Reasoning' },
  SSIH: { label: 'SSIH', name: 'Social, Structural & Institutional Hierarchies' },
  LAB: { label: 'Lab', name: 'Includes a lab section' },
  PF: { label: 'P/F', name: 'Pass/Fail option allowed' },
}

const ROOMS = [
  'Taylor Science Ctr 2004',
  'Kirner-Johnson 125',
  'Christian A. Johnson 101',
  'Benedict 015',
  'Root Hall 211',
  'List Art Ctr 150',
  'Science Ctr G027',
  'Kirner-Johnson 201',
]

const COMMENTS = [
  'Come to every class. The discussions are where most of the learning happens.',
  'Problem sets are long but fair. Start them early and go to office hours.',
  'One of the best courses I have taken here. The professor clearly loves the material.',
  'The readings pile up fast. Skimming works for some weeks but not before papers.',
  'Great intro if you are curious about the major. Grading is clear and consistent.',
  'Exams are hard, but the review sessions cover exactly what you need.',
  'Lots of small writing assignments that really improved my writing.',
  'Workload is lighter than expected, so it pairs well with a lab science.',
  'The final project was the highlight. You get a lot of freedom to pick a topic.',
  'Feedback on papers was detailed and came back quickly.',
]

// Small deterministic random so the sample data is the same on every load
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const round2 = (n) => Math.round(n * 100) / 100

function buildCourse(c, i) {
  const rand = seeded(i * 97 + 13)
  const base = c.rating
  const jitter = () => round2(Math.min(5, Math.max(2.5, base + (rand() - 0.5) * 0.8)))
  const history = ['Spring 2026', 'Fall 2025', 'Spring 2025', 'Fall 2024']
    .slice(0, 2 + Math.floor(rand() * 3))
    .map((term, k) => ({
      term,
      instructors: [c.sections[0].instructor, ...(k === 2 && c.altInstructor ? [c.altInstructor] : [])],
      rating: c.isNew ? null : jitter(),
    }))
  const comments = Array.from({ length: 3 }, () => COMMENTS[Math.floor(rand() * COMMENTS.length)])
  return {
    id: `${c.dept}-${c.num}`,
    code: `${c.dept} ${c.num}`,
    credit: 1,
    tags: [],
    crosslist: [],
    prereqs: 'None',
    ...c,
    rating: c.isNew ? null : c.rating,
    evals: c.isNew
      ? null
      : {
          'Overall quality': base,
          'Class sessions': jitter(),
          Readings: jitter(),
          'Assignments & exams': jitter(),
          'Feedback to students': jitter(),
        },
    history: c.isNew ? [] : history,
    comments: c.isNew ? [] : [...new Set(comments)],
    sections: c.sections.map((s) => ({
      room: ROOMS[Math.floor(rand() * ROOMS.length)],
      ...s,
    })),
  }
}

// meeting: [days, start, end]  days use M T W R F
const sec = (id, type, instructor, meetings, seats = 30, enrolled = 0) => ({
  id,
  type,
  instructor,
  meetings: meetings.map(([days, start, end]) => ({ days, start, end })),
  seats,
  enrolled,
})

const RAW = [
  {
    dept: 'CPSCI', num: '101', title: 'Introduction to Computer Science', rating: 4.42, workload: 6,
    tags: ['QSR'],
    description: 'An introduction to computational thinking and programming in Python. Students design, write and debug programs that solve real problems, and learn how data and algorithms shape everyday technology.',
    grading: ['40% programming assignments', '25% midterm exam', '25% final exam', '10% participation'],
    sections: [
      sec('01', 'Lecture', 'Dana Whitfield', [['MWF', '09:00', '09:50']], 32, 29),
      sec('02', 'Lecture', 'Dana Whitfield', [['MWF', '11:00', '11:50']], 32, 18),
      sec('L1', 'Lab', 'Dana Whitfield', [['R', '13:00', '14:15']], 16, 14),
    ],
  },
  {
    dept: 'CPSCI', num: '110', title: 'Principles of Computer Science', rating: 4.18, workload: 8,
    tags: ['QSR', 'LAB'], prereqs: 'CPSCI 101 or placement',
    description: 'Object-oriented design, recursion, and fundamental data structures including lists, stacks, queues and trees. Weekly labs build toward a multi-week team project.',
    grading: ['45% labs and projects', '20% midterm', '25% final', '10% quizzes'],
    sections: [
      sec('01', 'Lecture', 'Marcus Oyelaran', [['TR', '10:00', '11:15']], 28, 27),
      sec('L1', 'Lab', 'Marcus Oyelaran', [['W', '13:00', '15:00']], 14, 13),
    ],
  },
  {
    dept: 'CPSCI', num: '240', title: 'Algorithms and Complexity', rating: 4.05, workload: 10,
    tags: ['QSR'], prereqs: 'CPSCI 110 and MATH 123',
    description: 'Design and analysis of algorithms: divide and conquer, greedy methods, dynamic programming, graph algorithms, and an introduction to NP-completeness.',
    grading: ['40% problem sets', '30% midterms', '30% final'],
    sections: [sec('01', 'Lecture', 'Priya Ramaswamy', [['MWF', '10:00', '10:50']], 25, 22)],
  },
  {
    dept: 'CPSCI', num: '333', title: 'Software Engineering Studio', rating: 4.61, workload: 9,
    tags: ['W'], prereqs: 'CPSCI 240',
    description: 'Teams of students build a complete web application for a campus client. Covers version control, testing, code review, accessibility and working on a team with real deadlines.',
    grading: ['50% team project', '20% individual reflections', '20% code reviews', '10% presentation'],
    sections: [sec('01', 'Seminar', 'Marcus Oyelaran', [['TR', '13:00', '14:15']], 20, 20)],
  },
  {
    dept: 'MATH', num: '113', title: 'Calculus I', rating: 3.92, workload: 6,
    tags: ['QSR'],
    description: 'Limits, derivatives and their applications, and an introduction to integration. Emphasis on building intuition alongside computation.',
    grading: ['30% homework', '40% three exams', '30% final'],
    sections: [
      sec('01', 'Lecture', 'Helen Marchetti', [['MWF', '08:00', '08:50']], 30, 25),
      sec('02', 'Lecture', 'Ivan Petrov', [['MWF', '10:00', '10:50']], 30, 30),
    ],
  },
  {
    dept: 'MATH', num: '123', title: 'Discrete Mathematics', rating: 4.27, workload: 7,
    tags: ['QSR'],
    description: 'Logic, proof techniques, sets, functions, counting, induction and graphs. A first course in writing mathematical proofs.',
    grading: ['35% weekly proofs', '30% midterm', '35% final'],
    sections: [sec('01', 'Lecture', 'Ivan Petrov', [['TR', '08:30', '09:45']], 28, 21)],
  },
  {
    dept: 'MATH', num: '216', title: 'Probability and Statistics', rating: 4.01, workload: 7,
    tags: ['QSR'], prereqs: 'MATH 116',
    description: 'Probability models, random variables, distributions, estimation and hypothesis testing, with weekly computing work in R.',
    grading: ['30% homework', '20% R projects', '50% exams'],
    sections: [sec('01', 'Lecture', 'Helen Marchetti', [['MWF', '13:00', '13:50']], 30, 19)],
  },
  {
    dept: 'ECON', num: '101', title: 'Introductory Microeconomics', rating: 3.84, workload: 5,
    tags: ['QSR', 'PF'],
    description: 'How households and firms make decisions, how markets work, and when they fail. Topics include supply and demand, competition, monopoly and public goods.',
    grading: ['20% problem sets', '50% two midterms', '30% final'],
    sections: [
      sec('01', 'Lecture', 'Samuel Breckner', [['TR', '10:00', '11:15']], 40, 38),
      sec('02', 'Lecture', 'Leah Duarte', [['MWF', '11:00', '11:50']], 40, 33),
    ],
  },
  {
    dept: 'ECON', num: '275', title: 'Behavioral Economics', rating: 4.47, workload: 6,
    tags: ['W'], prereqs: 'ECON 101 and ECON 102',
    description: 'What happens to economic models when people are not perfectly rational? Students read experimental research and design a small experiment of their own.',
    grading: ['30% response papers', '40% research proposal', '30% final exam'],
    sections: [sec('01', 'Seminar', 'Leah Duarte', [['TR', '14:30', '15:45']], 20, 17)],
  },
  {
    dept: 'BIO', num: '115', title: 'Explorations in Biology', rating: 4.12, workload: 8,
    tags: ['LAB'],
    description: 'Major themes in modern biology, from molecules and cells to ecosystems. Weekly labs introduce experimental design and data analysis.',
    grading: ['30% lab reports', '45% exams', '15% quizzes', '10% participation'],
    sections: [
      sec('01', 'Lecture', 'Grace Achebe', [['MWF', '09:00', '09:50']], 48, 44),
      sec('L1', 'Lab', 'Grace Achebe', [['T', '13:00', '16:00']], 16, 15),
      sec('L2', 'Lab', 'Tom Kessler', [['W', '13:00', '16:00']], 16, 9),
    ],
  },
  {
    dept: 'BIO', num: '248', title: 'Genetics', rating: 4.33, workload: 9,
    tags: ['LAB'], prereqs: 'BIO 115',
    description: 'Mendelian and molecular genetics, gene regulation, and genomics. Labs use fruit flies and bacterial systems.',
    grading: ['35% lab notebook and reports', '45% exams', '20% problem sets'],
    sections: [
      sec('01', 'Lecture', 'Tom Kessler', [['TR', '08:30', '09:45']], 32, 28),
      sec('L1', 'Lab', 'Tom Kessler', [['R', '13:00', '16:00']], 16, 16),
    ],
  },
  {
    dept: 'CHEM', num: '120', title: 'Principles of Chemistry', rating: 3.78, workload: 9,
    tags: ['QSR', 'LAB'],
    description: 'Atomic structure, bonding, stoichiometry, thermochemistry and equilibrium, with an integrated laboratory.',
    grading: ['25% labs', '50% exams', '25% final'],
    sections: [
      sec('01', 'Lecture', 'Nora Lindqvist', [['MWF', '10:00', '10:50']], 50, 47),
      sec('L1', 'Lab', 'Nora Lindqvist', [['M', '13:00', '16:00']], 18, 18),
    ],
  },
  {
    dept: 'PHYS', num: '190', title: 'Fundamental Physics I', rating: 4.09, workload: 8,
    tags: ['QSR', 'LAB'], prereqs: 'MATH 113 (may be taken at the same time)',
    description: 'Mechanics: motion, forces, energy, momentum and rotation, taught through active learning and weekly labs.',
    grading: ['25% labs', '25% problem sets', '50% exams'],
    sections: [
      sec('01', 'Lecture', 'Arjun Mehta', [['MWF', '11:00', '11:50']], 36, 30),
      sec('L1', 'Lab', 'Arjun Mehta', [['T', '13:00', '15:00']], 18, 12),
    ],
  },
  {
    dept: 'ENGL', num: '150', title: 'Introduction to Creative Writing', rating: 4.71, workload: 5,
    tags: ['W', 'PF'],
    description: 'A workshop in poetry and short fiction. Students read widely, write every week, and give and receive feedback in a supportive workshop setting.',
    grading: ['50% portfolio', '30% weekly exercises', '20% workshop participation'],
    sections: [
      sec('01', 'Workshop', 'Claire Okafor', [['TR', '13:00', '14:15']], 15, 15),
      sec('02', 'Workshop', 'Ben Hollis', [['MW', '14:30', '15:45']], 15, 11),
    ],
  },
  {
    dept: 'ENGL', num: '227', title: 'The American Novel', rating: 4.25, workload: 7,
    tags: ['W'], crosslist: ['AMST 227'],
    description: 'Novels from the nineteenth century to the present that ask what it means to be American. Short response papers build toward a longer critical essay.',
    grading: ['40% two essays', '30% response papers', '30% final essay'],
    sections: [sec('01', 'Lecture', 'Ben Hollis', [['MWF', '10:00', '10:50']], 25, 20)],
  },
  {
    dept: 'GOVT', num: '116', title: 'Comparative Politics', rating: 4.02, workload: 6,
    tags: ['SSIH'],
    description: 'Why are some countries democracies and others not? An introduction to states, regimes, elections, political parties and social movements around the world.',
    grading: ['30% papers', '40% exams', '30% participation and quizzes'],
    sections: [sec('01', 'Lecture', 'Farid Nazari', [['TR', '10:00', '11:15']], 35, 31)],
  },
  {
    dept: 'GOVT', num: '230', title: 'Constitutional Law', rating: 4.55, workload: 8,
    tags: ['W', 'SSIH'], prereqs: 'GOVT 112',
    description: 'How the Supreme Court has shaped American government and civil liberties. Students brief cases and argue a moot court case at the end of term.',
    grading: ['30% case briefs', '30% moot court', '40% final paper'],
    sections: [sec('01', 'Seminar', 'Rebecca Stanhope', [['W', '13:00', '15:30']], 18, 18)],
  },
  {
    dept: 'HIST', num: '135', title: 'The Atlantic World, 1450–1850', rating: 4.15, workload: 6,
    tags: ['SSIH'],
    description: 'Connections between Europe, Africa and the Americas: trade, empire, slavery, revolution and the exchange of ideas across the Atlantic.',
    grading: ['40% papers', '30% midterm', '30% final'],
    sections: [sec('01', 'Lecture', 'Elena Vasquez', [['MWF', '13:00', '13:50']], 30, 22)],
  },
  {
    dept: 'HIST', num: '290', title: 'History of Medicine', rating: 4.38, workload: 6,
    tags: ['W'], isNew: false,
    description: 'Disease, healing and the medical profession from antiquity to the age of antibiotics. Students work with primary sources from the college archives.',
    grading: ['50% research paper', '30% source analyses', '20% participation'],
    sections: [sec('01', 'Seminar', 'Elena Vasquez', [['TR', '14:30', '15:45']], 18, 12)],
  },
  {
    dept: 'PSYCH', num: '101', title: 'Introductory Psychology', rating: 3.96, workload: 5,
    tags: ['PF'],
    description: 'A survey of the science of mind and behavior: perception, memory, learning, development, personality and mental health.',
    grading: ['60% three exams', '25% short assignments', '15% research participation'],
    sections: [
      sec('01', 'Lecture', 'Jonah Feld', [['MWF', '09:00', '09:50']], 60, 58),
      sec('02', 'Lecture', 'Amara Singh', [['TR', '13:00', '14:15']], 60, 41),
    ],
  },
  {
    dept: 'PSYCH', num: '280', title: 'Research Methods in Psychology', rating: 4.08, workload: 8,
    tags: ['QSR', 'W'], prereqs: 'PSYCH 101',
    description: 'Designing, running and analyzing psychology experiments. Students complete a group research project and write it up in APA style.',
    grading: ['40% research project', '30% lab write-ups', '30% exams'],
    sections: [sec('01', 'Lecture', 'Amara Singh', [['MW', '14:30', '15:45']], 24, 20)],
  },
  {
    dept: 'PHIL', num: '111', title: 'Introduction to Ethics', rating: 4.36, workload: 5,
    tags: ['W', 'PF'],
    description: 'What makes an action right or wrong? Readings from classical and contemporary philosophers on consequences, duties, virtue and justice.',
    grading: ['45% three papers', '25% final', '30% discussion'],
    sections: [sec('01', 'Lecture', 'Owen Carraway', [['TR', '08:30', '09:45']], 30, 24)],
  },
  {
    dept: 'SOC', num: '110', title: 'Introduction to Sociology', rating: 4.11, workload: 5,
    tags: ['SSIH'],
    description: 'How social structures such as class, race, gender and institutions shape individual lives, and how individuals shape society in return.',
    grading: ['30% papers', '40% exams', '30% participation'],
    sections: [sec('01', 'Lecture', 'Maya Torres', [['MWF', '11:00', '11:50']], 35, 29)],
  },
  {
    dept: 'ENVST', num: '201', title: 'Environmental Policy', rating: 4.22, workload: 6,
    tags: ['SSIH'], crosslist: ['GOVT 201'],
    description: 'How environmental problems become policy. Case studies include climate change, water rights, and land use in the Mohawk Valley.',
    grading: ['30% policy memos', '30% group project', '40% exams'],
    sections: [sec('01', 'Lecture', 'Farid Nazari', [['MW', '13:00', '14:15']], 25, 14)],
  },
  {
    dept: 'ARTH', num: '152', title: 'Art and Visual Culture', rating: 4.29, workload: 5,
    tags: ['PF'],
    description: 'How to look closely at images, objects and buildings. Includes regular visits to the campus art museum.',
    grading: ['40% visual analyses', '30% midterm', '30% final'],
    sections: [sec('01', 'Lecture', 'Sophie Laurent', [['TR', '11:30', '12:45']], 30, 18)],
  },
  {
    dept: 'MUSIC', num: '109', title: 'Music Theory I', rating: 4.17, workload: 6,
    tags: ['QSR'],
    description: 'The building blocks of tonal music: notation, scales, harmony and voice leading, with ear training and keyboard skills.',
    grading: ['35% homework', '25% ear training', '40% exams'],
    sections: [sec('01', 'Lecture', 'Daniel Rourke', [['MWF', '14:00', '14:50']], 20, 13)],
  },
  {
    dept: 'THEAT', num: '120', title: 'Acting I', rating: 4.64, workload: 6,
    tags: ['PF'],
    description: 'Voice, movement and scene work. Students perform monologues and scenes and reflect on the process in a journal.',
    grading: ['60% performances', '20% journal', '20% participation'],
    sections: [sec('01', 'Studio', 'Iris Kaplan', [['TR', '15:00', '16:45']], 14, 10)],
  },
  {
    dept: 'SPNST', num: '140', title: 'Intermediate Spanish', rating: 4.31, workload: 6,
    tags: ['PF'], prereqs: 'SPNST 130 or placement',
    description: 'Grammar review, conversation and short readings from across the Spanish-speaking world.',
    grading: ['30% homework', '30% exams', '20% oral work', '20% participation'],
    sections: [
      sec('01', 'Lecture', 'Lucía Ferrer', [['MTWR', '09:00', '09:50']], 18, 17),
      sec('02', 'Lecture', 'Lucía Ferrer', [['MTWR', '11:00', '11:50']], 18, 12),
    ],
  },
  {
    dept: 'CPSCI', num: '307', title: 'Machine Learning', rating: null, workload: 9, isNew: true,
    tags: ['QSR'], prereqs: 'CPSCI 240 and MATH 216',
    description: 'A new course for Fall 2026. Regression, classification, neural networks and model evaluation, with a focus on responsible use of data.',
    grading: ['40% programming projects', '30% midterm', '30% final project'],
    sections: [sec('01', 'Lecture', 'Priya Ramaswamy', [['TR', '13:00', '14:15']], 24, 8)],
  },
  {
    dept: 'ENVST', num: '310', title: 'Climate and Society Seminar', rating: null, workload: 7, isNew: true,
    tags: ['W', 'SSIH'],
    description: 'A new seminar on how communities adapt to a changing climate. Students interview local stakeholders and write a final policy brief.',
    grading: ['50% policy brief', '30% interviews and memos', '20% participation'],
    sections: [sec('01', 'Seminar', 'Maya Torres', [['R', '18:30', '21:00']], 15, 6)],
  },
]

export const COURSES = RAW.map(buildCourse)

export const COURSE_BY_ID = Object.fromEntries(COURSES.map((c) => [c.id, c]))
