/**
 * Content types for the portfolio. Every piece of copy on the site lives in
 * the files in this folder, so updating the site rarely means touching a
 * component.
 */

export interface Link {
  label: string
  href: string
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  title: string
  location: string
  email: string
  /** Short availability line shown in the hero and contact section. */
  availability: string
  /** One- or two-sentence introduction under the name in the hero. */
  heroIntro: string
  links: {
    github: string
    /** Path to the résumé PDF inside /public. */
    resume: string
    /** Add your LinkedIn URL here and it appears automatically everywhere. */
    linkedin?: string
  }
  heroFacts: { label: string; value: string }[]
  about: {
    heading: string
    paragraphs: string[]
    principles: { title: string; body: string }[]
    glance: { label: string; value: string }[]
  }
  contact: {
    heading: string
    body: string
  }
}

export type ProjectStatus = 'in-development' | 'completed'

/**
 * Abstract illustration drawn for a project card. Purposefully *not* fake
 * screenshots; add real screenshots via `screenshots` instead.
 */
export type ProjectVisual = 'duelist' | 'mapreduce' | 'fighter' | 'radio' | 'robotics'

export interface Screenshot {
  /** Path inside /public, e.g. "/projects/duelist-kingdom/decks.png". */
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export interface CaseStudy {
  overview: string
  architecture: {
    intro: string
    layers: { name: string; detail: string; role: string }[]
  }
  auth: {
    intro: string
    steps: { title: string; body: string }[]
  }
  data: {
    intro: string
    entities: { name: string; body: string; status: ProjectStatus }[]
  }
  progress: {
    built: string[]
    inProgress: string[]
  }
}

export interface Project {
  slug: string
  title: string
  category: string
  /** Optional context, e.g. "Course project". */
  context?: string
  status: ProjectStatus
  summary: string
  /** Concrete engineering work: what *I* built. */
  highlights: string[]
  stack: string[]
  /** Only real, working URLs. Leave empty rather than linking to nothing. */
  links: { repo?: string; live?: string }
  visual: ProjectVisual
  screenshots?: Screenshot[]
  caseStudy?: CaseStudy
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Experience {
  role: string
  organization: string
  start: number
  end: number
  summary: string
  points: string[]
  strengths: string[]
}

export interface AiTool {
  name: string
  maker: string
  detail: string
  work: string[]
  everyday: string[]
}

export interface AiExperience {
  /** Wrap a phrase in *asterisks* to emphasize it in the heading. */
  heading: string
  intro: string
  tools: AiTool[]
  workflow: { title: string; body: string }[]
  practices: string[]
  /** Optional note about how AI was used on this site. */
  siteNote?: string
}

export interface Education {
  school: string
  degree: string
  graduated: string
  gpa: string
  coursework: string[]
}
