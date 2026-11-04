import type { CSSProperties } from 'react'
import { profile } from '../../content'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { StackFigure } from './StackFigure'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <h1 id="hero-name" className={styles.name}>
            <span className={styles.line}>
              <span>{profile.firstName}</span>
            </span>{' '}
            <span className={styles.line}>
              <span>{profile.lastName}</span>
            </span>
          </h1>

          <p className={`${styles.role} ${styles.enter}`} style={{ '--d': '240ms' } as CSSProperties}>
            {profile.title}
          </p>

          <p className={`${styles.intro} ${styles.enter}`} style={{ '--d': '330ms' } as CSSProperties}>
            {profile.heroIntro}
          </p>

          <ul
            className={`${styles.stack} ${styles.enter}`}
            style={{ '--d': '410ms' } as CSSProperties}
            aria-label="Primary stack"
          >
            {profile.primaryStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className={`${styles.actions} ${styles.enter}`} style={{ '--d': '490ms' } as CSSProperties}>
            <ButtonLink href="#work" icon="arrow-down">
              View projects
            </ButtonLink>
            <ButtonLink href={profile.links.resume} variant="secondary" icon="file" external>
              View résumé <span className={styles.pdf}>PDF</span>
            </ButtonLink>
            <ButtonLink href={profile.links.github} variant="secondary" icon="arrow-up-right" external>
              <span className={styles.label}>
                <Icon name="github" size={17} />
                GitHub
              </span>
            </ButtonLink>
          </div>
        </div>

        <StackFigure className={styles.figure} />
      </div>

      <div className="container">
        <dl className={`${styles.facts} ${styles.enter}`} style={{ '--d': '600ms' } as CSSProperties}>
          {profile.heroFacts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.href ? (
                  <a href={fact.href} className={styles.factLink}>
                    {fact.value}
                    <Icon name="arrow-right" size={14} />
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
