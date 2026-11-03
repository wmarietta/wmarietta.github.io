import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  tone?: 'base' | 'raised'
  children: ReactNode
}

/** Standard page section: numbered eyebrow, serif heading, optional intro. */
export function Section({ id, index, eyebrow, title, intro, aside, tone = 'base', children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone]}`}>
      <div className="container">
        <header className={`${styles.header} reveal`}>
          <p className={styles.eyebrow}>
            <span className={styles.index}>{index}</span>
            <span className={styles.rule} aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <div className={styles.titleRow}>
            <h2 id={headingId} className={styles.title}>
              {title}
            </h2>
            {aside && <div className={styles.aside}>{aside}</div>}
          </div>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
