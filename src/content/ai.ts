import type { AiExperience } from './types'

/** Compact AI-assisted development panel shown at the end of the Skills section. */
export const aiExperience: AiExperience = {
  summary:
    'Experienced in AI-assisted and agentic development workflows, using Claude Code for implementation planning, codebase exploration, debugging, refactoring, and iterative development. I review generated code, validate changes, and retain responsibility for technical decisions and software quality.',
  tools: [
    { name: 'Claude Code', use: 'Agentic coding, planning, and refactoring' },
    { name: 'Claude', use: 'Implementation planning and code review' },
    { name: 'ChatGPT', use: 'Technical research and documentation' },
  ],
}
