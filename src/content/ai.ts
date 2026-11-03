import type { AiExperience } from './types'

/** Compact AI-assisted development panel shown at the end of the Skills section. */
export const aiExperience: AiExperience = {
  summary:
    'Experienced in AI-assisted development workflows. I integrate AI tools into my development process for codebase exploration, implementation planning, debugging, refactoring, and code review. I use these tools to accelerate development while maintaining ownership of technical decisions, architectural choices, and the quality of the final implementation.',
  tools: [
    { name: 'Claude Code', use: 'Codebase exploration, refactoring, and debugging' },
    { name: 'Claude', use: 'Implementation planning and code review' },
    { name: 'ChatGPT', use: 'Technical research and documentation' },
  ],
}
