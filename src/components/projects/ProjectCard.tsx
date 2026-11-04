import type { Project } from '../../content/types'
import { emphasize } from '../ui/emphasize'
import { TagList } from '../ui/Tag'
import { ProjectActions } from './ProjectActions'
import { ProjectVisual } from './visuals/ProjectVisual'
import styles from './ProjectCard.module.css'

/** A supporting project: framed figure, then copy set directly on the page. */
export function ProjectCard({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`
  return (
    <article id={project.slug} className={styles.project} aria-labelledby={titleId}>
      <div className={styles.media}>
        <ProjectVisual kind={project.visual} />
      </div>

      <div className={styles.body}>
        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.category}>{project.category}</p>
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
  )
}
