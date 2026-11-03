import type { CSSProperties } from 'react'
import type { Project } from '../../content/types'
import { Icon } from '../ui/Icon'
import { TagList } from '../ui/Tag'
import { ProjectVisual } from './visuals/ProjectVisual'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const titleId = `${project.slug}-title`
  return (
    <div className={`${styles.cell} reveal`} style={{ '--reveal-delay': `${(index % 2) * 90}ms` } as CSSProperties}>
    <article id={project.slug} className={styles.card} aria-labelledby={titleId}>
      <div className={styles.media}>
        <ProjectVisual kind={project.visual} />
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 2).padStart(2, '0')}
          </span>
          <span className={styles.category}>{project.category}</span>
          {project.context && <span className={styles.context}>{project.context}</span>}
        </p>

        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>

        <h4 className={styles.subhead}>What I built</h4>
        <ul className={styles.highlights}>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className={styles.footer}>
          <TagList items={project.stack} label={`${project.title} technologies`} />
          {project.links.repo && (
            <a href={project.links.repo} className={styles.link} target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={16} />
              Source
              <span className="visually-hidden">
                {' '}
                code for {project.title} on GitHub (opens in new tab)
              </span>
              <Icon name="arrow-up-right" size={14} className={styles.linkArrow} />
            </a>
          )}
          {project.links.live && (
            <a href={project.links.live} className={styles.link} target="_blank" rel="noopener noreferrer">
              Live site
              <span className="visually-hidden"> for {project.title} (opens in new tab)</span>
              <Icon name="arrow-up-right" size={14} className={styles.linkArrow} />
            </a>
          )}
        </div>
      </div>
    </article>
    </div>
  )
}
