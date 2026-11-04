import { profile } from '../../content'
import { Section } from '../layout/Section'
import { emphasize } from '../ui/emphasize'
import styles from './About.module.css'

export function About() {
  const { about } = profile
  return (
    <Section id="about" title={emphasize(about.heading)}>
      <div className={styles.layout}>
        <div className={styles.prose}>
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? styles.first : undefined}>
              {p}
            </p>
          ))}
        </div>

        <aside className={styles.glance} aria-labelledby="glance-heading">
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
        <h3 className={styles.principlesTitle}>How I work</h3>
        <ul className={styles.principles}>
          {about.principles.map((item) => (
            <li key={item.title} className={styles.principle}>
              <p className={styles.principleTitle}>{item.title}</p>
              <p className={styles.principleBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
