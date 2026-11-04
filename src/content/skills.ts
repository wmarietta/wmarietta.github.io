import type { SkillGroup } from './types'

/** Introduction under the Skills section heading. */
export const skillsIntro =
  'I build software across the entire stack. TypeScript, React, Node.js, Express, and MySQL are where I do my strongest work: I design frontend interfaces, build structured APIs, design the database schemas that support them, and solve problems that cut across all three. Experience with Java, Go, C++, Python, and other languages gives me the range to work beyond web development.'

/**
 * Core stack, shown prominently. "Used in" is computed automatically from the
 * `stack` arrays in projects.ts, so keep names consistent between the files.
 */
export const coreSkills: { name: string; note: string }[] = [
  { name: 'TypeScript', note: 'Typed frontends and request/response contracts' },
  { name: 'React', note: 'Component-driven interfaces and client state' },
  { name: 'Node.js', note: 'Server-side application logic and API services' },
  { name: 'Express', note: 'Routing, middleware, and layered REST APIs' },
  { name: 'MySQL', note: 'Relational schema design and data access' },
  { name: 'REST APIs', note: 'Resource design between frontend and backend' },
]

export const skillGroups: SkillGroup[] = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Go', 'Python', 'C++', 'C#'] },
  { name: 'Frontend', items: ['React', 'HTML', 'CSS', 'Responsive design'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Session management'] },
  { name: 'Data', items: ['MySQL', 'MongoDB', 'Relational database design'] },
  { name: 'Tools & platforms', items: ['Git', 'Claude Code', 'AWS Lightsail', 'Android SDK', 'Android Studio', 'Unity', 'Unreal Engine 5'] },
  {
    name: 'Foundations',
    items: ['Object-oriented programming', 'Data structures & algorithms', 'Software architecture', 'Debugging'],
  },
  { name: 'Practices', items: ['Agentic coding', 'AI-assisted development', 'Unit testing', 'Agile / Scrum'] },
]
