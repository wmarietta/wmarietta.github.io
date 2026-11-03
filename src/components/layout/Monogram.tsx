/** "WM" monogram: a single continuous stroke with a brass terminal. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="9.25" fill="none" stroke="var(--line-brass)" />
      <path
        d="M8.5 13l4.2 14.5L16.9 16.5l3.1 11 3.1-11 4.2 11L31.5 13"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31.5" cy="13" r="2" fill="var(--brass)" />
    </svg>
  )
}
