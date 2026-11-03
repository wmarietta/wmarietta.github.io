import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './Button.module.css'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'sm'
  icon?: IconName
  /** Opens in a new tab and adds an accessible "(opens in new tab)" hint. */
  external?: boolean
  className?: string
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={size === 'sm' ? 15 : 17} className={styles.icon} />}
      {external && <span className="visually-hidden"> (opens in new tab)</span>}
    </a>
  )
}
