import type { Profile } from './types'

export const profile: Profile = {
  name: 'William Marietta',
  firstName: 'William',
  lastName: 'Marietta',
  title: 'Software Developer',
  location: 'Northern Virginia',
  email: 'wemarietta@gmail.com',
  availability: 'Open to entry-level & junior software roles',
  heroIntro:
    'Recent Computer Science graduate building full-stack web applications with React, TypeScript, Node.js, and MySQL. I’m most at home on the backend, working out how data, logic, and interfaces fit together.',
  links: {
    github: 'https://github.com/wmarietta',
    resume: '/resume/William-Marietta-Resume.pdf',
    linkedin: 'https://www.linkedin.com/in/wemarietta/',
  },
  heroFacts: [
    { label: 'Focus', value: 'Full-stack · Backend' },
    { label: 'Education', value: 'B.S. CS, George Mason ’26' },
    { label: 'Based in', value: 'Northern Virginia' },
  ],
  about: {
    /** Wrap a phrase in *asterisks* to emphasize it in the heading. */
    heading: 'I want to understand how the *whole system* fits together.',
    paragraphs: [
      'I graduated from George Mason University in May 2026 with a B.S. in Computer Science. Most of what I build is web software: React and TypeScript interfaces backed by Node.js and Express APIs and relational databases.',
      'What keeps me interested is the structure underneath. How does a request move through an application? Where should a piece of logic live? Will this schema still make sense as features grow? Duelist Kingdom, my current project, is where I’m putting those questions into practice.',
      'Before focusing on software development, I spent eight years teaching programming and game development to students, teachers, and professionals. Explaining technical ideas to people who are new to them shaped how I communicate, and how I think about writing code that other people need to read.',
    ],
    principles: [
      {
        title: 'Understand the system',
        body: 'I try to learn how components interact before changing one of them.',
      },
      {
        title: 'Structure for change',
        body: 'Clear layers and boundaries make code easier to test, debug, and extend.',
      },
      {
        title: 'Explain it clearly',
        body: 'Years of teaching made explaining technical decisions part of how I work.',
      },
    ],
    glance: [
      { label: 'Looking for', value: 'Entry-level & junior software developer roles' },
      { label: 'Interests', value: 'Backend, full-stack, application architecture' },
      { label: 'Degree', value: 'B.S. Computer Science, May 2026' },
      { label: 'Location', value: 'Northern Virginia' },
    ],
  },
  contact: {
    heading: 'Looking for my *first software engineering role.*',
    body: 'I’m interested in full-stack, backend, and general software engineering positions. If you’re hiring, or just want to talk about a project, email is the best way to reach me.',
  },
}
