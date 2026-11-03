import { navigation } from '../../content/navigation'
import { profile } from '../../content/profile'
import { Icon } from '../ui/Icon'
import { Monogram } from './Monogram'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <Monogram className={styles.mark} />
          <div>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.meta}>
              {profile.title} · {profile.location}
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className={styles.nav}>
          <ul>
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                GitHub<span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                Résumé<span className="visually-hidden"> (PDF, opens in new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
            {profile.links.linkedin && (
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn<span className="visually-hidden"> (opens in new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.bottom}>
          <p>
            © {__BUILD_YEAR__} {profile.name}. Built with React, TypeScript &amp; Vite.
          </p>
          <a href="#top" className={styles.top}>
            Back to top
            <Icon name="arrow-up" size={15} />
          </a>
        </div>
      </div>
    </footer>
  )
}
