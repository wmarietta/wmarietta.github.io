import { cardProjects, featuredProject, otherProjects, profile, projects } from '../../content'
import { Section } from '../layout/Section'
import { Icon } from '../ui/Icon'
import { FeaturedProject } from './FeaturedProject'
import { ProjectCard } from './ProjectCard'
import { ProjectIndex } from './ProjectIndex'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <Section
      id="work"
      tight
      eyebrow="Selected work"
      title={
        <>
          Projects, from the interface <em>down to the database.</em>
        </>
      }
    >
      <ProjectIndex projects={projects} />

      {featuredProject && <FeaturedProject project={featuredProject} />}

      <div className={styles.grid}>
        {cardProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} number={i + (featuredProject ? 2 : 1)} />
        ))}
      </div>

      <div className={`${styles.more} reveal`}>
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
    </Section>
  )
}
