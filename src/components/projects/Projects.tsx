import { featuredProject, otherProjects, profile, projects } from '../../content'
import { useProjectRouting } from '../../hooks/useProjectRouting'
import { Section } from '../layout/Section'
import { Icon } from '../ui/Icon'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'
import styles from './Projects.module.css'

const SLUGS = projects.map((project) => project.slug)

/** Featured project first, then the rest in content order. */
const ORDERED = featuredProject ? [featuredProject, ...projects.filter((p) => p !== featuredProject)] : projects

export function Projects() {
  useProjectRouting(SLUGS)

  return (
    <Section
      id="work"
      tight
      title="Selected work"
      intro="From frontend interfaces to backend systems, these projects demonstrate how I approach software architecture, implementation, and problem-solving."
    >
      <ul className={styles.grid} aria-label="Projects">
        {ORDERED.map((project) => {
          const featured = project === featuredProject
          return (
            <li key={project.slug} className={featured ? styles.featuredCell : styles.cell}>
              <ProjectCard project={project} featured={featured} />
            </li>
          )
        })}
      </ul>

      <div className={styles.more}>
        {otherProjects.length > 0 && (
          <div className={styles.also}>
            <h3 className={styles.alsoLabel}>Also built</h3>
            <ul className={styles.alsoList}>
              {otherProjects.map((p) => (
                <li key={p.title}>
                  <span className={styles.alsoTitle}>{p.title}</span>
                  <span className={styles.alsoDesc}>{p.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <a href={profile.links.github} className={styles.github} target="_blank" rel="noopener noreferrer">
          <Icon name="github" size={22} />
          <span className={styles.githubText}>
            <span className={styles.githubLabel}>More on GitHub</span>
            <span className={styles.githubUrl}>{profile.links.github.replace('https://', '')}</span>
          </span>
          <Icon name="arrow-up-right" size={18} className={styles.githubArrow} />
          <span className="visually-hidden"> (opens in new tab)</span>
        </a>
      </div>

      {projects.map((project) => (
        <ProjectDialog key={project.slug} project={project} />
      ))}
    </Section>
  )
}
