import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { navigation } from '../../content/navigation'
import { profile } from '../../content/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Icon } from '../ui/Icon'
import { Monogram } from './Monogram'
import styles from './Header.module.css'

const sectionIds = navigation.map((item) => item.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Lock scroll, trap focus, and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    document.body.classList.add('menu-open')
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab' || !headerRef.current) return
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>('[data-menu-focus], [data-menu-panel] a'),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onResize = () => {
      if (window.matchMedia('(min-width: 64em)').matches) close(false)
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.classList.remove('menu-open')
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={scrolled || open ? '' : undefined}
      data-open={open ? '' : undefined}
    >
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.brand} data-menu-focus onClick={() => open && close(false)}>
          <Monogram className={styles.mark} />
          <span className={styles.brandText}>
            <span className={styles.brandName}>{profile.name}</span>
            <span className={styles.brandRole}>{profile.title}</span>
          </span>
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          <ul className={styles.navList}>
            {navigation.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.navLink}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  <span className={styles.navIndex} aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={profile.links.resume}
            className={styles.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
            <Icon name="arrow-up-right" size={14} />
            <span className="visually-hidden"> (PDF, opens in new tab)</span>
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            data-menu-focus
            onClick={() => (open ? close(false) : setOpen(true))}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className={styles.toggleBars} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        data-menu-panel
        hidden={!open}
      >
        <nav aria-label="Mobile" className="container">
          <ul className={styles.panelList}>
            {navigation.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as CSSProperties}>
                <a href={`#${item.id}`} className={styles.panelLink} onClick={() => close(false)}>
                  <span className={styles.panelIndex} aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.panelFooter}>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className={styles.panelLinks}>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub <span className="visually-hidden">(opens in new tab)</span>
              </a>
              <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                Résumé <span className="visually-hidden">(PDF, opens in new tab)</span>
              </a>
              {profile.links.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span className="visually-hidden">(opens in new tab)</span>
                </a>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
