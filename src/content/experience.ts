import type { Education, Experience } from './types'

export const experienceIntro =
  'From 2016 to 2024 I taught programming and game development, first to classes of teenagers and later to teachers and working professionals. I led classrooms, wrote curriculum, and trained new instructors, and breaking technical problems down and explaining them clearly became second nature.'

export const experience: Experience[] = [
  {
    role: 'Lead Instructor',
    organization: 'Mason Game & Technology Academy',
    start: 2016,
    end: 2024,
    summary: 'Programming and game-development classes for students.',
    points: [
      'Led programming and game-development classes of 20+ students through hands-on software projects.',
      'Developed technical curriculum, programming exercises, and course materials for new and existing classes.',
      'Trained and mentored new instructors and teaching assistants on course content, expectations, and procedures.',
    ],
    strengths: ['Technical instruction', 'Curriculum design', 'Mentorship', 'Leadership'],
  },
  {
    role: 'Instructor',
    organization: 'Virginia Serious Game Institute',
    start: 2017,
    end: 2023,
    summary: 'Unity application development training for educators and professionals.',
    points: [
      'Taught Unity application development to groups of 6–20+ public school teachers and professionals.',
      'Created technical curriculum and instructional materials for use by educational institutions.',
      'Contributed to an interactive educational web platform.',
      'Delivered technical demonstrations of lessons and educational software to prospective partners.',
    ],
    strengths: ['Unity', 'Technical training', 'Curriculum design', 'Presenting to partners'],
  },
]

export const education: Education = {
  school: 'George Mason University',
  degree: 'B.S. Computer Science',
  graduated: 'May 2026',
  gpa: '3.67 / 4.00',
  coursework: [
    'Web Application Development',
    'Database Concepts',
    'Secure Programming',
    'Concurrent & Distributed Systems',
    'Networking',
    'Mobile App Development',
    'Professional & Technical Writing',
  ],
}
