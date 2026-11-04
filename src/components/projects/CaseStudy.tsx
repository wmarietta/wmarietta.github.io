import { useEffect, useRef, type ReactNode } from 'react'
import type { CaseStudy as CaseStudyData } from '../../content/types'
import { Icon } from '../ui/Icon'
import styles from './CaseStudy.module.css'

interface CaseStudyProps {
  id: string
  open: boolean
  study: CaseStudyData
}

/**
 * Expandable technical deep-dive. Content is always in the DOM (so it's
 * prerendered and searchable); while collapsed it's visually hidden and
 * `inert`, so keyboard and screen-reader users skip it.
 */
export function CaseStudy({ id, open, study }: CaseStudyProps) {
  const regionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (regionRef.current) regionRef.current.inert = !open
  }, [open])

  return (
    <div
      id={id}
      ref={regionRef}
      className={styles.region}
      data-open={open ? 'true' : 'false'}
      role="region"
      aria-label="Technical case study"
    >
      <div className={styles.clip}>
        <div className={styles.body}>
          <div className={styles.lead}>
            <p className={styles.kicker}>Case study</p>
            <p className={styles.overview}>{study.overview}</p>
          </div>

          <Block title="Architecture" intro={study.architecture.intro}>
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
                    <span className={styles.entityStatus}>
                      {entity.status === 'completed' ? 'In use' : 'In progress'}
                    </span>
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
        </div>
      </div>
    </div>
  )
}

function Block({
  title,
  intro,
  children,
}: {
  title: string
  intro?: string
  children: ReactNode
}) {
  return (
    <section className={styles.block}>
      <h4 className={styles.blockTitle}>{title}</h4>
      {intro && <p className={styles.blockIntro}>{intro}</p>}
      {children}
    </section>
  )
}
