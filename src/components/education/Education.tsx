import { education } from '../../content'
import { Section } from '../layout/Section'
import styles from './Education.module.css'

export function Education() {
  return (
    <Section
      id="education"
      title={
        <>
          Computer Science at George Mason University.
        </>
      }
    >
      <article className={styles.card} aria-labelledby="degree-heading">
        <div className={styles.degree}>
          <p className={styles.school}>{education.school}</p>
          <h3 id="degree-heading" className={styles.title}>
            {education.degree}
          </h3>
          <dl className={styles.facts}>
            <div>
              <dt>Graduated</dt>
              <dd>{education.graduated}</dd>
            </div>
            <div>
              <dt>GPA</dt>
              <dd>{education.gpa}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.coursework}>
          <h4 className={styles.courseLabel}>Relevant coursework</h4>
          <ul className={styles.courses}>
            {education.coursework.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </div>
      </article>
    </Section>
  )
}
