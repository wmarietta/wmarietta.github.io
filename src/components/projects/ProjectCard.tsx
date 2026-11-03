import type { CSSProperties } from 'react'
import type { Project } from '../../content/types'
import { emphasize } from '../ui/emphasize'
import { TagList } from '../ui/Tag'
import { ProjectActions } from './ProjectActions'
import { ProjectVisual } from './visuals/ProjectVisual'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project, number }: { project: Project; number: number }) {
  const titleId = `${project.slug}-title`
  return (
    <div className={`${styles.cell} reveal`} style={{ '--reveal-delay': `${(number % 2) * 90}ms` } as CSSProperties}>
      <article id={project.slug} className={styles.card} aria-labelledby={titleId}>
        <div className={styles.media}>
          <ProjectVisual kind={project.visual} />
        </div>

        <div className={styles.body}>
          <p className={styles.meta}>
            <span className={styles.number} aria-hidden="true">
              {String(number).padStart(2, '0')}
            </span>
            <span className={styles.category}>{project.category}</span>
            {project.context && <span className={styles.context}>{project.context}</span>}
          </p>

          <h3 id={titleId} className={styles.title}>
            {project.title}
          </h3>
          <div className={styles.stack}>
            <TagList items={project.stack} label={`${project.title} technologies`} />
          </div>
          <p className={styles.summary}>{project.summary}</p>

          <h4 className={styles.subhead}>What I built</h4>
          <ul className={styles.highlights}>
            {project.highlights.map((item) => (
              <li key={item}>{emphasize(item)}</li>
            ))}
          </ul>

          <div className={styles.footer}>
            <ProjectActions project={project} />
          </div>
        </div>
      </article>
    </div>
  )
}
