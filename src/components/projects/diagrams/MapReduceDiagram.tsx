import flow from './Flow.module.css'
import styles from './MapReduceDiagram.module.css'

/**
 * How a MapReduce job runs: the coordinator hands map tasks to concurrent
 * workers, intermediate data is grouped by key, and reduce tasks are only
 * scheduled once the map phase has completed. Illustrative task counts.
 */
export function MapReduceDiagram() {
  return (
    <div className={`${flow.diagram} ${styles.layout}`}>
      <div className={`${flow.node} ${styles.coordinator}`} data-tone="accent">
        <p className={flow.label}>Coordinator</p>
        <p className={flow.title}>Splits the job, tracks every task, schedules the work</p>
        <ol className={styles.states} aria-label="Task states">
          <li>Idle</li>
          <li>In progress</li>
          <li>Completed</li>
        </ol>
      </div>

      <p className={`${flow.arrow} ${styles.assignMap}`}>assigns map tasks</p>
      <p className={`${flow.arrow} ${styles.assignReduce}`}>schedules reduce tasks after the map phase completes</p>

      <div className={`${flow.node} ${styles.map}`}>
        <p className={flow.label}>Map phase</p>
        <p className={flow.text}>Concurrent worker processes run map tasks in parallel.</p>
        <div className={flow.chips}>
          <span className={flow.chip}>map 1</span>
          <span className={flow.chip}>map 2</span>
          <span className={flow.chip}>map 3</span>
          <span className={flow.chip}>…</span>
        </div>
      </div>

      <div className={`${flow.node} ${styles.intermediate}`} data-tone="quiet">
        <p className={flow.label}>Intermediate data</p>
        <p className={flow.text}>Map output, grouped by key for the reduce phase.</p>
      </div>

      <div className={styles.gate} role="note">
        <span className={styles.gateLine} aria-hidden="true" />
        <p>Dependency: reduce waits for every map task</p>
      </div>

      <div className={`${flow.node} ${styles.reduce}`}>
        <p className={flow.label}>Reduce phase</p>
        <p className={flow.text}>Workers run reduce tasks over the grouped keys.</p>
        <div className={flow.chips}>
          <span className={flow.chip}>reduce 1</span>
          <span className={flow.chip}>reduce 2</span>
          <span className={flow.chip}>…</span>
        </div>
      </div>

      <div className={`${flow.node} ${styles.output}`} data-tone="quiet">
        <p className={flow.label}>Output</p>
        <p className={flow.text}>Final results of the job.</p>
      </div>
    </div>
  )
}
