import type { AiExperience } from './types'

/**
 * AI tools section. The bullets describe how I use each tool. Keep them
 * specific and true; edit freely as my habits change.
 */
export const aiExperience: AiExperience = {
  heading: 'Using AI as a tool, *not a substitute for understanding.*',
  intro:
    'I use Claude and ChatGPT every day, for software work and for everyday tasks. I treat them like a capable collaborator: useful for moving faster and learning, but I still read, test, and understand the result before I rely on it.',
  tools: [
    {
      name: 'Claude',
      maker: 'Anthropic',
      detail: 'Including Claude Code in the terminal',
      work: [
        'Working across a codebase with Claude Code: scaffolding features, refactoring, and tracing bugs.',
        'Talking through architecture and design tradeoffs before I write code.',
        'Reviewing my own code for bugs, edge cases, and security issues.',
      ],
      everyday: ['Researching and summarizing long documents', 'Planning projects and breaking work into steps'],
    },
    {
      name: 'ChatGPT',
      maker: 'OpenAI',
      detail: 'Explanations, writing, and study',
      work: [
        'Quick explanations of unfamiliar APIs, libraries, and error messages.',
        'Drafting and tightening technical writing such as documentation and READMEs.',
        'Breaking down new concepts and quizzing myself while learning.',
      ],
      everyday: ['Drafting and editing emails and other writing', 'Brainstorming and answering everyday questions'],
    },
  ],
  workflow: [
    { title: 'Frame', body: 'Give specific context and constraints, the same way I’d write a good ticket.' },
    { title: 'Generate', body: 'Let the model draft code, explanations, or options.' },
    { title: 'Review', body: 'Read every change and make sure I understand why it works.' },
    { title: 'Verify', body: 'Run it, test it, and check the docs before anything ships.' },
  ],
  practices: [
    'I don’t accept code I can’t explain.',
    'I keep secrets, credentials, and private data out of prompts.',
    'I check claims against documentation instead of trusting the model’s word.',
  ],
  siteNote:
    'This portfolio was built with Claude Code, working from a detailed brief I wrote for its design, content, and engineering requirements. I reviewed and edited the result.',
}
