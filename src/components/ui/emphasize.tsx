import { Fragment, type ReactNode } from 'react'

/**
 * Lightweight inline markup for content strings, so the content files never
 * need JSX:
 *   **text** -> <strong>   (key accomplishments in project highlights)
 *   *text*   -> <em>       (emphasized phrase in headings)
 */
export function emphasize(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    return <Fragment key={i}>{part}</Fragment>
  })
}
