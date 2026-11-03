import type { CSSProperties } from 'react'
import { profile } from '../../content'
import { Section } from '../layout/Section'
import { emphasize } from '../ui/emphasize'
import styles from './About.module.css'

export function About() {
  const { about } = profile
  return (
    <Section id="about" index="02" eyebrow="About" title={emphasize(about.heading)}>
      <div className={styles.layout}>
        <div className={`${styles.prose} reveal`}>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? styles.first : undefined}>
              {p}
            </p>
          ))}
        </div>

        <aside className={`${styles.glance} reveal`} aria-labelledby="glance-heading" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
          <h3 id="glance-heading" className={styles.glanceTitle}>
            At a glance
          </h3>
          <dl className={styles.glanceList}>
            {about.glance.map((item) => (
              <div key={item.label} className={styles.glanceRow}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className={styles.principlesWrap}>
        <h3 className={`${styles.principlesTitle} reveal`}>How I work</h3>
        <ol className={styles.principles}>
          {about.principles.map((item, i) => (
            <li
              key={item.title}
              className={`${styles.principle} reveal`}
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
            >
              <span className={styles.principleNo} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className={styles.principleTitle}>{item.title}</p>
              <p className={styles.principleBody}>{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
