import type { ReactNode } from 'react'
import type { Project, ProjectDiagram } from '../../content/types'
import { Icon } from '../ui/Icon'
import { Status } from '../ui/Status'
import { TagList } from '../ui/Tag'
import { emphasize } from '../ui/emphasize'
import { CaseStudy } from './CaseStudy'
import { Gallery } from './Gallery'
import { ProjectActions } from './ProjectActions'
import { BattleframeDiagram } from './diagrams/BattleframeDiagram'
import { MapReduceDiagram } from './diagrams/MapReduceDiagram'
import { RequestDiagram } from './diagrams/RequestDiagram'
import styles from './ProjectDialog.module.css'

/**
 * Full project view in a native modal <dialog>: the browser handles focus
 * trapping, Escape, and inert page content. Opening, closing, and the URL hash
 * are driven by useProjectRouting. Rendered closed, so the content is still
 * in the prerendered HTML.
 */
export function ProjectDialog({ project }: { project: Project }) {
  const headingId = `${project.slug}-dialog-title`
  const figure = project.diagram ? <DiagramFigure kind={project.diagram} project={project} /> : null

  return (
    <dialog id={`${project.slug}-dialog`} className={styles.dialog} aria-labelledby={headingId} data-project={project.slug}>
      <article className={styles.sheet}>
        <header className={styles.head}>
          <div className={styles.headText}>
            <h2 id={headingId} className={styles.title}>
              {project.title}
            </h2>
            <p className={styles.meta}>
              <span className={styles.category}>{project.category}</span>
              {project.status === 'in-development' && <Status status={project.status} />}
            </p>
          </div>
          <button type="button" className={styles.close} data-close>
            <Icon name="close" size={20} />
            <span className="visually-hidden">Close {project.title}</span>
          </button>
        </header>

        <div className={styles.body}>
          <section className={styles.overview} aria-label="Overview">
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.overviewSide}>
              <TagList items={project.stack} label={`${project.title} technologies`} />
              <ProjectActions project={project} size="lg" />
            </div>
          </section>

          <Gallery title={project.title} screenshots={project.screenshots} needed={project.screenshotsNeeded} />

          <section className={styles.built} aria-labelledby={`${project.slug}-built`}>
            <h3 id={`${project.slug}-built`} className={styles.sectionTitle}>
              What I built
            </h3>
            <ul className={styles.highlights}>
              {project.highlights.map((item) => (
                <li key={item}>{emphasize(item)}</li>
              ))}
            </ul>
          </section>

          {project.caseStudy ? (
            <CaseStudy id={`${project.slug}-case-study`} study={project.caseStudy} figure={figure} />
          ) : (
            figure && (
              <section aria-labelledby={`${project.slug}-arch`}>
                <h3 id={`${project.slug}-arch`} className={styles.sectionTitle}>
                  How it works
                </h3>
                {figure}
              </section>
            )
          )}
        </div>

        <footer className={styles.foot}>
          <button type="button" className={styles.back} data-close>
            <Icon name="arrow-left" size={16} />
            Back to projects
          </button>
        </footer>
      </article>
    </dialog>
  )
}

const FIGURES: Record<ProjectDiagram, { number: string; caption: string }> = {
  'request-lifecycle': {
    number: 'Fig. 01',
    caption:
      'How a request moves through Duelist Kingdom: session middleware, routes, controllers, services, and repositories down to MySQL, with the services layer calling the YGOPRODeck card API.',
  },
  mapreduce: {
    number: 'Fig. 02',
    caption: 'How a job runs: the coordinator schedules map tasks on concurrent workers and releases reduce tasks only after the map phase completes.',
  },
  battleframe: {
    number: 'Fig. 03',
    caption: 'How a turn reaches the screen: actions resolve on the UI thread while a dedicated render thread updates and draws every game object.',
  },
}

function DiagramFigure({ kind, project }: { kind: ProjectDiagram; project: Project }) {
  let diagram: ReactNode = null
  if (kind === 'request-lifecycle' && project.caseStudy) {
    diagram = <RequestDiagram layers={project.caseStudy.architecture.layers} />
  }
  if (kind === 'mapreduce') diagram = <MapReduceDiagram />
  if (kind === 'battleframe') diagram = <BattleframeDiagram />
  if (!diagram) return null
  const { number, caption } = FIGURES[kind]
  return (
    <figure className={styles.figure}>
      <div className={styles.figureFrame}>{diagram}</div>
      <figcaption className={styles.figureCaption}>
        <span className={styles.figNo}>{number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}
