import { aiExperience } from '../../content'
import styles from './AiPanel.module.css'

/** Compact note on AI-assisted development, shown at the end of Skills. */
export function AiPanel() {
  const { summary, tools } = aiExperience
  return (
    <aside className={`${styles.panel} reveal`} aria-labelledby="ai-panel-heading">
      <div className={styles.intro}>
        <h3 id="ai-panel-heading" className={styles.label}>
          AI-assisted development
        </h3>
        <p className={styles.summary}>{summary}</p>
      </div>
      <dl className={styles.tools}>
        {tools.map((tool) => (
          <div key={tool.name} className={styles.tool}>
            <dt>{tool.name}</dt>
            <dd>{tool.use}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
