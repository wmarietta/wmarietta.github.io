import type { CSSProperties } from 'react'
import { aiExperience } from '../../content'
import { Section } from '../layout/Section'
import { Icon } from '../ui/Icon'
import { emphasize } from '../ui/emphasize'
import styles from './AiExperience.module.css'

export function AiExperience() {
  const { heading, intro, tools, workflow, practices, siteNote } = aiExperience

  return (
    <Section id="ai" eyebrow="AI tools" title={emphasize(heading)} intro={intro}>
      <div className={styles.tools}>
        {tools.map((tool, i) => (
          <article
            key={tool.name}
            className={`${styles.tool} reveal`}
            aria-labelledby={`ai-tool-${i}`}
            style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
          >
            <header className={styles.toolHead}>
              <div>
                <h3 id={`ai-tool-${i}`} className={styles.toolName}>
                  {tool.name}
                </h3>
                <p className={styles.toolDetail}>{tool.detail}</p>
              </div>
              <span className={styles.maker}>{tool.maker}</span>
            </header>

            <div className={styles.usage}>
              <div>
                <h4 className={styles.usageLabel}>At work</h4>
                <ul className={styles.workList}>
                  {tool.work.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className={styles.usageLabel}>Everyday</h4>
                <ul className={styles.everydayList}>
                  {tool.everyday.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.lower}>
        <div className={`${styles.workflow} reveal`}>
          <h3 className={styles.blockLabel}>How I work with it</h3>
          <ol className={styles.steps}>
            {workflow.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNo} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className={styles.stepTitle}>{step.title}</p>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${styles.side} reveal`} style={{ '--reveal-delay': '90ms' } as CSSProperties}>
          <h3 className={styles.blockLabel}>Ground rules</h3>
          <ul className={styles.practices}>
            {practices.map((item) => (
              <li key={item}>
                <Icon name="check" size={16} className={styles.check} />
                {item}
              </li>
            ))}
          </ul>

          {siteNote && (
            <aside className={styles.note} aria-label="About this site">
              <p className={styles.noteLabel}>About this site</p>
              <p className={styles.noteBody}>{siteNote}</p>
            </aside>
          )}
        </div>
      </div>
    </Section>
  )
}
