import type { CSSProperties } from 'react'
import { coreSkills, projectsUsing, skillGroups, skillsIntro } from '../../content'
import { Section } from '../layout/Section'
import { AiPanel } from './AiPanel'
import styles from './Skills.module.css'

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      tone="raised"
      title={
        <>
          The tools I reach for, <em>and where I’ve used them.</em>
        </>
      }
      intro={skillsIntro}
    >
      <h3 className={`${styles.label} reveal`}>Core stack</h3>
      <ul className={styles.core}>
        {coreSkills.map((skill, i) => {
          const usedIn = projectsUsing(skill.name)
          return (
            <li
              key={skill.name}
              className={`${styles.coreItem} reveal`}
              style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
            >
              <p className={styles.coreName}>{skill.name}</p>
              <p className={styles.coreNote}>{skill.note}</p>
              {usedIn.length > 0 && (
                <p className={styles.usedIn}>
                  <span className={styles.usedInLabel}>Used in</span>
                  {usedIn.map((p, j) => (
                    <span key={p.slug}>
                      <a href={`#${p.slug}`} className={styles.usedInLink}>
                        {p.title}
                      </a>
                      {j < usedIn.length - 1 && <span aria-hidden="true">, </span>}
                    </span>
                  ))}
                </p>
              )}
            </li>
          )
        })}
      </ul>

      <h3 className={`${styles.label} ${styles.labelSpaced} reveal`}>Full inventory</h3>
      <dl className={`${styles.table} reveal`}>
        {skillGroups.map((group) => (
          <div key={group.name} className={styles.row}>
            <dt className={styles.group}>{group.name}</dt>
            <dd>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <AiPanel />
    </Section>
  )
}
