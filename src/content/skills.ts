import type { SkillGroup } from './types'

/**
 * Core stack, shown prominently. "Used in" is computed automatically from the
 * `stack` arrays in projects.ts, so keep names consistent between the files.
 */
export const coreSkills: { name: string; note: string }[] = [
  { name: 'TypeScript', note: 'Typed frontends and request/response contracts' },
  { name: 'React', note: 'Component-driven interfaces and client state' },
  { name: 'Node.js', note: 'Server-side JavaScript for APIs' },
  { name: 'Express', note: 'Routing, middleware, and layered REST APIs' },
  { name: 'MySQL', note: 'Relational schema design and data access' },
  { name: 'REST APIs', note: 'Resource design between frontend and backend' },
]

export const skillGroups: SkillGroup[] = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Go', 'Python', 'C++', 'C#'] },
  { name: 'Frontend', items: ['React', 'HTML', 'CSS', 'Responsive design'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'Authentication', 'Session management'] },
  { name: 'Data', items: ['MySQL', 'MongoDB', 'Relational database design'] },
  { name: 'Tools & platforms', items: ['Git', 'AWS Lightsail', 'Android Studio', 'Unity', 'Unreal Engine 5'] },
  { name: 'AI tools', items: ['Claude', 'Claude Code', 'ChatGPT'] },
  {
    name: 'Foundations',
    items: [
      'Object-oriented programming',
      'Data structures & algorithms',
      'Software architecture',
      'Debugging',
      'Unit testing',
      'Agile / Scrum',
    ],
  },
]
