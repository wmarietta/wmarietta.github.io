import type { Project } from '../../content/types'
import { Icon } from '../ui/Icon'
import styles from './ProjectActions.module.css'

/**
 * Links that let a reviewer verify a project: live site, demo, source, and
 * the specific files that back up the highlights. Renders nothing for links
 * that don't exist.
 */
export function ProjectActions({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const { repo, live, demo } = project.links
  const evidence = project.evidence ?? []
  if (!repo && !live && !demo && evidence.length === 0) return null

  return (
    <div className={`${styles.actions} ${styles[size]}`}>
      {(live || demo || repo) && (
        <div className={styles.buttons}>
          {live && (
            <a href={live} className={`${styles.button} ${styles.primary}`} target="_blank" rel="noopener noreferrer">
              Live site
              <Icon name="arrow-up-right" size={14} className={styles.arrow} />
              <span className="visually-hidden"> for {project.title} (opens in new tab)</span>
            </a>
          )}
          {demo && (
            <a href={demo} className={styles.button} target="_blank" rel="noopener noreferrer">
              Watch demo
              <Icon name="arrow-up-right" size={14} className={styles.arrow} />
              <span className="visually-hidden"> of {project.title} (opens in new tab)</span>
            </a>
          )}
          {repo && (
            <a href={repo} className={styles.button} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={16} />
              Source code
              <Icon name="arrow-up-right" size={14} className={styles.arrow} />
              <span className="visually-hidden"> for {project.title} on GitHub (opens in new tab)</span>
            </a>
          )}
        </div>
      )}

      {evidence.length > 0 && (
        <p className={styles.evidence}>
          <span className={styles.evidenceLabel}>Code to look at</span>
          {evidence.map((file) => (
            <a key={file.href} href={file.href} className={styles.file} target="_blank" rel="noopener noreferrer">
              {file.label}
              <span className="visually-hidden"> in {project.title} on GitHub (opens in new tab)</span>
            </a>
          ))}
        </p>
      )}
    </div>
  )
}
