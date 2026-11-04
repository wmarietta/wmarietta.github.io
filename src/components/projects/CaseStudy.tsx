import type { ReactNode } from 'react'
import type { CaseStudy as CaseStudyData } from '../../content/types'
import { Icon } from '../ui/Icon'
import styles from './CaseStudy.module.css'

interface CaseStudyProps {
  id: string
  study: CaseStudyData
  /** Architecture figure shown beside the layer descriptions. */
  figure?: ReactNode
}

/** Technical deep-dive inside a project's detail view. */
export function CaseStudy({ id, study, figure }: CaseStudyProps) {
  const titleId = `${id}-title`
  return (
    <section id={id} className={styles.study} aria-labelledby={titleId}>
      <div className={styles.lead}>
        <h3 id={titleId} className={styles.studyTitle}>
          Technical case study
        </h3>
        <p className={styles.overview}>{study.overview}</p>
      </div>

      <Block title="Architecture" intro={study.architecture.intro}>
        <div className={figure ? styles.architecture : undefined}>
          {figure}
          <ol className={styles.pipeline}>
            {study.architecture.layers.map((layer, i) => (
              <li key={layer.name} className={styles.layer}>
                <span className={styles.layerNode} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={styles.layerName}>{layer.name}</p>
                <p className={styles.layerDetail}>{layer.detail}</p>
                <p className={styles.layerRole}>{layer.role}</p>
              </li>
            ))}
          </ol>
        </div>
      </Block>

      <Block title="Authentication" intro={study.auth.intro}>
        <ol className={styles.steps}>
          {study.auth.steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNo} aria-hidden="true">
                {i + 1}
              </span>
              <p className={styles.stepTitle}>{step.title}</p>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Data model" intro={study.data.intro}>
        <ul className={styles.entities}>
          {study.data.entities.map((entity) => (
            <li key={entity.name} className={styles.entity} data-status={entity.status}>
              <div className={styles.entityHead}>
                <p className={styles.entityName}>{entity.name}</p>
                <span className={styles.entityStatus}>{entity.status === 'completed' ? 'In use' : 'In progress'}</span>
              </div>
              <p className={styles.entityBody}>{entity.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Where it stands">
        <div className={styles.progress}>
          <div>
            <p className={styles.progressLabel}>Built</p>
            <ul className={styles.progressList}>
              {study.progress.built.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} className={styles.check} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.progressLabel}>In development</p>
            <ul className={styles.progressList}>
              {study.progress.inProgress.map((item) => (
                <li key={item}>
                  <span className={styles.pending} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>
    </section>
  )
}

function Block({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <section className={styles.block}>
      <h4 className={styles.blockTitle}>{title}</h4>
      {intro && <p className={styles.blockIntro}>{intro}</p>}
      {children}
    </section>
  )
}
