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
  /** Quick facts under the hero. `href` makes the value a link (e.g. to a project). */
  heroFacts: { label: string; value: string; href?: string }[]
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
  status: ProjectStatus
  /** Three-to-six words on what the project demonstrates, shown in the project index. */
  takeaway: string
  summary: string
  /**
   * Concrete engineering work: what *I* built. Start each with the key
   * accomplishment wrapped in **double asterisks** so it stands out.
   */
  highlights: string[]
  stack: string[]
  /** Only real, working URLs. Leave empty rather than linking to nothing. */
  links: { repo?: string; live?: string; demo?: string }
  /** Direct links to the source files that back up the highlights. */
  evidence?: Link[]
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

export interface AiExperience {
  summary: string
  tools: { name: string; use: string }[]
}

export interface Education {
  school: string
  degree: string
  graduated: string
  gpa: string
  coursework: string[]
}
