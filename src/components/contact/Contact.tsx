import { profile } from '../../content'
import { Section } from '../layout/Section'
import { Icon, type IconName } from '../ui/Icon'
import { emphasize } from '../ui/emphasize'
import { CopyButton } from './CopyButton'
import styles from './Contact.module.css'

export function Contact() {
  const links: { label: string; detail: string; href: string; icon: IconName; srHint: string }[] = [
    {
      label: 'GitHub',
      detail: profile.links.github.replace('https://', ''),
      href: profile.links.github,
      icon: 'github',
      srHint: '(opens in new tab)',
    },
    {
      label: 'Résumé',
      detail: 'PDF · one page',
      href: profile.links.resume,
      icon: 'file',
      srHint: '(PDF, opens in new tab)',
    },
  ]
  if (profile.links.linkedin) {
    links.push({
      label: 'LinkedIn',
      detail: profile.links.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      href: profile.links.linkedin,
      icon: 'linkedin',
      srHint: '(opens in new tab)',
    })
  }

  return (
    <Section id="contact" index="07" eyebrow="Contact" tone="raised" title={emphasize(profile.contact.heading)}>
      <div className={styles.layout}>
        <div className={`${styles.primary} reveal`}>
          <p className={styles.body}>{profile.contact.body}</p>

          <div className={styles.emailBlock}>
            <p className={styles.emailLabel}>Email</p>
            <a href={`mailto:${profile.email}`} className={styles.email}>
              {profile.email}
            </a>
            <div className={styles.emailActions}>
              <a href={`mailto:${profile.email}`} className={styles.send}>
                <Icon name="mail" size={16} />
                Send an email
              </a>
              <CopyButton value={profile.email} label="Copy address" />
            </div>
          </div>
        </div>

        <ul className={`${styles.links} reveal`}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.linkCard} target="_blank" rel="noopener noreferrer">
                <Icon name={link.icon} size={20} className={styles.linkIcon} />
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <span className={styles.linkDetail}>{link.detail}</span>
                </span>
                <Icon name="arrow-up-right" size={18} className={styles.linkArrow} />
                <span className="visually-hidden"> {link.srHint}</span>
              </a>
            </li>
          ))}
          <li className={styles.location}>
            <span className={styles.locationLabel}>Based in</span>
            <span>{profile.location}</span>
          </li>
        </ul>
      </div>
    </Section>
  )
}
