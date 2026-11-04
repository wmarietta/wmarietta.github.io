import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  /** Anchor id; must match an id in content/navigation.ts to appear in the header. */
  id: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  tone?: 'base' | 'raised'
  /** Less space above the section, for the one that follows the hero. */
  tight?: boolean
  children: ReactNode
}

/** Standard page section: serif heading that carries the section, optional intro. */
export function Section({ id, title, intro, aside, tone = 'base', tight = false, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone]} ${tight ? styles.tight : ''}`}>
      <div className="container">
        <header className={styles.header}>
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
