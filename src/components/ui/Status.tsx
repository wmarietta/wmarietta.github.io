import type { ProjectStatus } from '../../content/types'
import styles from './Status.module.css'

const labels: Record<ProjectStatus, string> = {
  'in-development': 'In active development',
  completed: 'Completed',
}

export function Status({ status, label }: { status: ProjectStatus; label?: string }) {
  return (
    <span className={`${styles.status} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label ?? labels[status]}
    </span>
  )
}
