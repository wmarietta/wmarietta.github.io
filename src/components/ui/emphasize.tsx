import { Fragment, type ReactNode } from 'react'

/**
 * Renders `*text*` segments of a content string as <em>, so headings in the
 * content files can carry an emphasized phrase without containing JSX.
 */
export function emphasize(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
