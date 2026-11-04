import { caseStudyId } from '../../content'
import type { Project } from '../../content/types'
import { Icon } from '../ui/Icon'
import styles from './ProjectIndex.module.css'

/**
 * One-glance summary of every project: what it demonstrates, the core stack,
 * and the fastest way to verify it. Written for reviewers with 30 seconds.
 */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <div className={styles.index}>
      <div className={styles.head} aria-hidden="true">
        <span>Project · what it shows</span>
        <span>Core stack</span>
        <span className={styles.headRight}>Links</span>
      </div>
      <ol className={styles.rows} aria-label="Project index">
        {projects.map((project) => (
          <li key={project.slug} className={styles.row}>
            <div className={styles.main}>
              <a href={`#${project.slug}`} className={styles.title}>
                {project.title}
              </a>
              {project.status === 'in-development' && <span className={styles.badge}>In development</span>}
              <p className={styles.takeaway}>{project.takeaway}</p>
            </div>
            <p className={styles.stack}>
              <span className="visually-hidden">Stack: </span>
              {project.stack.slice(0, 4).join(' · ')}
            </p>
            <div className={styles.links}>
              {project.caseStudy && (
                <a href={`#${caseStudyId(project)}`} className={styles.link}>
                  Case study
                  <Icon name="arrow-down" size={14} />
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} className={styles.link} target="_blank" rel="noopener noreferrer">
                  Live
                  <Icon name="arrow-up-right" size={14} />
                  <span className="visually-hidden"> {project.title} (opens in new tab)</span>
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" size={14} />
                  Code
                  <span className="visually-hidden"> for {project.title} on GitHub (opens in new tab)</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
