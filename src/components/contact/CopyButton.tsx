import { useEffect, useRef, useState } from 'react'
import { Icon } from '../ui/Icon'
import styles from './Contact.module.css'

/** Copies `value` to the clipboard and announces the result to screen readers. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }

  return (
    <>
      <button type="button" className={styles.copy} onClick={copy} data-state={state}>
        <Icon name={state === 'copied' ? 'check' : 'copy'} size={16} />
        <span>{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}</span>
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {state === 'copied' ? 'Email address copied to clipboard' : state === 'failed' ? 'Could not copy email address' : ''}
      </span>
    </>
  )
}
