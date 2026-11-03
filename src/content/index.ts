import { projects } from './projects'
import type { Project } from './types'

export { profile } from './profile'
export { projects, otherProjects } from './projects'
export { coreSkills, skillGroups } from './skills'
export { experience, experienceIntro, education } from './experience'
export { aiExperience } from './ai'
export { navigation } from './navigation'

/** The first project with a case study is featured; everything else is a card. */
export const featuredProject: Project | undefined = projects.find((p) => p.caseStudy)
export const cardProjects: Project[] = projects.filter((p) => p !== featuredProject)

/** Anchor id of the featured project's case study, used by the hero figure link. */
export const caseStudyId = (project: Project) => `${project.slug}-case-study`

/** Projects whose stack includes `skill`, for "Used in" annotations. */
export function projectsUsing(skill: string): Project[] {
  const needle = skill.toLowerCase()
  return projects.filter((p) => p.stack.some((s) => s.toLowerCase() === needle))
}
