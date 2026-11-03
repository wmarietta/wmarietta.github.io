import type { AiExperience } from './types'

/** Compact AI-tools panel shown at the end of the Skills section. */
export const aiExperience: AiExperience = {
  summary:
    'I use AI tools daily for development and everyday work, and I review, test, and understand anything they produce before relying on it.',
  tools: [
    { name: 'Claude Code', use: 'Codebase-wide changes, refactoring, and debugging' },
    { name: 'Claude', use: 'Design discussions and code review' },
    { name: 'ChatGPT', use: 'Explanations, documentation, and study' },
  ],
  siteNote: 'This site was built with Claude Code from a brief I wrote, then reviewed and edited by me.',
}
