import type { ReactNode } from 'react'
import { navigation } from '../../content/navigation'
import styles from './Section.module.css'

interface SectionProps {
  /** Must match an id in content/navigation.ts; its position sets the section number. */
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  tone?: 'base' | 'raised'
  children: ReactNode
}

/** Standard page section: numbered eyebrow, serif heading, optional intro. */
export function Section({ id, eyebrow, title, intro, aside, tone = 'base', children }: SectionProps) {
  const headingId = `${id}-heading`
  const position = navigation.findIndex((item) => item.id === id)
  const index = position >= 0 ? String(position + 1).padStart(2, '0') : null
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone]}`}>
      <div className="container">
        <header className={`${styles.header} reveal`}>
          <p className={styles.eyebrow}>
            {index && (
              <>
                <span className={styles.index}>{index}</span>
                <span className={styles.rule} aria-hidden="true" />
              </>
            )}
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
