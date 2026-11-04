import type { Project } from '../../content/types'
import { Icon } from '../ui/Icon'
import { Status } from '../ui/Status'
import { ProjectVisual } from './visuals/ProjectVisual'
import styles from './ProjectCard.module.css'

/**
 * Project card in the Selected work grid. The title link stretches over the
 * whole card, so the card has one accessible name and one tab stop; it opens
 * the project's detail dialog (see useProjectRouting).
 */
export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const titleId = `${project.slug}-card-title`
  const cover = featured ? project.screenshots?.[0] : undefined
  return (
    <article
      id={project.slug}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-labelledby={titleId}
    >
      <div className={styles.media}>
        {cover ? (
          <div className={styles.shot}>
            <img
              src={cover.src}
              alt=""
              width={cover.width}
              height={cover.height}
              loading="lazy"
              decoding="async"
              className={styles.shotImage}
            />
          </div>
        ) : (
          <ProjectVisual kind={project.visual} />
        )}
      </div>

      <div className={styles.body}>
        {featured && (
          <p className={styles.flag}>
            <span>Featured project</span>
            <Status status={project.status} />
          </p>
        )}
        <h3 id={titleId} className={styles.title}>
          <a href={`#${project.slug}`} className={styles.link}>
            {project.title}
          </a>
        </h3>
        <p className={styles.category}>{project.category}</p>
        <p className={styles.summary}>{project.cardSummary}</p>
        <ul className={styles.stack} aria-label={`${project.title} technologies`}>
          {project.stack.slice(0, featured ? 5 : 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <span className={styles.cta} aria-hidden="true">
          {project.caseStudy ? 'Read the case study' : 'View project'}
          <Icon name="arrow-right" size={16} className={styles.ctaIcon} />
        </span>
      </div>
    </article>
  )
}
