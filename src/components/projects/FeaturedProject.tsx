import { useEffect, useState } from 'react'
import { caseStudyId } from '../../content'
import type { Project } from '../../content/types'
import { Icon } from '../ui/Icon'
import { Status } from '../ui/Status'
import { TagList } from '../ui/Tag'
import { CaseStudy } from './CaseStudy'
import { Gallery } from './Gallery'
import { ProjectVisual } from './visuals/ProjectVisual'
import styles from './FeaturedProject.module.css'

export function FeaturedProject({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const regionId = caseStudyId(project)
  const titleId = `${project.slug}-title`

  // Any link to the case study anchor (e.g. the hero figure) opens it.
  useEffect(() => {
    if (window.location.hash === `#${regionId}`) setOpen(true)
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      if (target?.closest(`a[href="#${regionId}"]`)) setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [regionId])

  return (
    <div className="reveal">
      <article id={project.slug} className={styles.featured} aria-labelledby={titleId}>
        <header className={styles.topbar}>
          <p className={styles.flag}>
            <span className={styles.flagIndex}>01</span>
            Featured project
          </p>
          <Status status={project.status} />
        </header>

        <div className={styles.main}>
          <div className={styles.content}>
            <p className={styles.category}>{project.category}</p>
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

            <div className={styles.stack}>
              <TagList items={project.stack} label={`${project.title} technologies`} />
            </div>

            <div className={styles.actions}>
              {project.caseStudy && (
                <button
                  type="button"
                  className={styles.toggle}
                  aria-expanded={open}
                  aria-controls={regionId}
                  onClick={() => setOpen((o) => !o)}
                >
                  <span className={styles.toggleIcon} aria-hidden="true">
                    <Icon name="plus" size={16} />
                  </span>
                  {open ? 'Hide the technical case study' : 'Read the technical case study'}
                </button>
              )}
              {project.links.repo && (
                <a href={project.links.repo} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" size={16} />
                  Source code
                  <span className="visually-hidden"> (opens in new tab)</span>
                </a>
              )}
              {project.links.live && (
                <a href={project.links.live} className={styles.link} target="_blank" rel="noopener noreferrer">
                  Live site
                  <Icon name="arrow-up-right" size={14} />
                  <span className="visually-hidden"> (opens in new tab)</span>
                </a>
              )}
            </div>
          </div>

          <div className={styles.visualPane}>
            <ProjectVisual kind={project.visual} />
          </div>
        </div>

        {project.screenshots && project.screenshots.length > 0 && (
          <Gallery title={project.title} screenshots={project.screenshots} />
        )}

        {project.caseStudy && <CaseStudy id={regionId} open={open} study={project.caseStudy} />}
      </article>
    </div>
  )
}
