import type { Profile } from './types'

export const profile: Profile = {
  name: 'William Marietta',
  firstName: 'William',
  lastName: 'Marietta',
  title: 'Full-Stack Developer',
  location: 'Northern Virginia',
  email: 'wemarietta@gmail.com',
  primaryStack: ['TypeScript', 'React', 'Node.js', 'Express', 'MySQL'],
  heroIntro:
    'I design and build web applications, from responsive interfaces to backend APIs and relational databases. My work focuses on maintainable architecture, secure systems, and turning complex requirements into working software.',
  links: {
    github: 'https://github.com/wmarietta',
    resume: '/resume/William-Marietta-Resume.pdf',
    linkedin: 'https://www.linkedin.com/in/wemarietta/',
  },
  heroFacts: [
    { label: 'Available for', value: 'Junior software engineering roles' },
    { label: 'Featured project', value: 'Duelist Kingdom', href: '#duelist-kingdom' },
    { label: 'Education', value: 'B.S. CS, George Mason ’26 · 3.67 GPA' },
    { label: 'Based in', value: 'Northern Virginia' },
  ],
  about: {
    /** Wrap a phrase in *asterisks* to emphasize it in the heading. */
    heading: 'I build *systems,* not just features.',
    paragraphs: [
      'I’m a full-stack developer with a B.S. in Computer Science from George Mason University (May 2026). I build React and TypeScript interfaces, the Node.js and Express APIs behind them, and the relational databases that store their data.',
      'I care about more than getting code to run. I want to understand how the entire application works, make deliberate architectural decisions, and build software that can grow without becoming difficult to maintain. I take ownership of problems across the frontend, backend, and database, and I explain the reasoning behind my solutions.',
      'Before focusing on software development, I spent eight years teaching programming and game development to students, teachers, and professionals. Explaining technical ideas to people who are new to them shaped how I communicate, and how I write code that other people need to read.',
    ],
    principles: [
      {
        title: 'Understand the whole system',
        body: 'I trace problems across interfaces, APIs, and data models to find their root causes instead of treating symptoms.',
      },
      {
        title: 'Engineer for maintainability',
        body: 'I make deliberate choices about architecture, data modeling, and separation of responsibilities so applications stay understandable and extensible.',
      },
      {
        title: 'Communicate technical decisions',
        body: 'Eight years of teaching programming and software development sharpened my ability to explain complex technical concepts, communicate design decisions, and collaborate effectively.',
      },
    ],
    glance: [
      { label: 'Looking for', value: 'Junior full-stack, backend & software engineering roles' },
      { label: 'Focus', value: 'Backend, full-stack, application architecture' },
      { label: 'Degree', value: 'B.S. Computer Science, May 2026' },
      { label: 'Location', value: 'Northern Virginia' },
    ],
  },
  contact: {
    heading: 'Ready to join your engineering team.',
    body: 'I’m pursuing full-stack, backend, and general software engineering roles where I can take ownership of features across the stack. If you’re hiring, or want to talk through a project, email is the best way to reach me.',
  },
}
