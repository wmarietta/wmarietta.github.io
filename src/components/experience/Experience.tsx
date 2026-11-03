import type { CSSProperties } from 'react'
import { experience, experienceIntro } from '../../content'
import { Section } from '../layout/Section'
import { TagList } from '../ui/Tag'
import styles from './Experience.module.css'

export function Experience() {
  const first = Math.min(...experience.map((e) => e.start))
  const last = Math.max(...experience.map((e) => e.end))
  const span = Math.max(last - first, 1)
  const years = Array.from({ length: span + 1 }, (_, i) => first + i)

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Eight years of <em>teaching people to build software.</em>
        </>
      }
      intro={experienceIntro}
    >
      {/* Timeline overview (decorative; the same information is in the list below) */}
      <div className={`${styles.timeline} reveal`} aria-hidden="true">
        <div className={styles.bars}>
          {experience.map((job, i) => (
            <div
              key={job.organization}
              className={styles.bar}
              style={
                {
                  '--start': (job.start - first) / span,
                  '--length': (job.end - job.start) / span,
                  '--i': i,
                } as CSSProperties
              }
            >
              <span className={styles.barLabel}>{job.organization}</span>
            </div>
          ))}
        </div>
        <div className={styles.ruler}>
          {years.map((year) => (
            <span key={year} className={styles.tick} style={{ '--pos': (year - first) / span } as CSSProperties}>
              <span className={styles.tickLabel}>{year}</span>
            </span>
          ))}
        </div>
      </div>

      <ol className={styles.list}>
        {experience.map((job) => (
          <li key={job.organization} className={`${styles.entry} reveal`}>
            <div className={styles.when}>
              <p className={styles.years}>
                {job.start}
                <span aria-hidden="true"> — </span>
                <span className="visually-hidden"> to </span>
                {job.end}
              </p>
              <p className={styles.org}>{job.organization}</p>
            </div>
            <div className={styles.what}>
              <h3 className={styles.role}>{job.role}</h3>
              <p className={styles.summary}>{job.summary}</p>
              <ul className={styles.points}>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <TagList items={job.strengths} label={`Skills used as ${job.role}`} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
