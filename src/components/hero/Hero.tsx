import type { CSSProperties } from 'react'
import { caseStudyId, featuredProject, profile } from '../../content'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { RequestDiagram } from './RequestDiagram'
import styles from './Hero.module.css'

export function Hero() {
  const layers = featuredProject?.caseStudy?.architecture.layers

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={`${styles.status} ${styles.enter}`} style={{ '--d': '0ms' } as CSSProperties}>
            <span className={styles.statusDot} aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-name" className={styles.name}>
            <span className={styles.line}>
              <span>{profile.firstName}</span>
            </span>{' '}
            <span className={styles.line}>
              <span className={styles.italic}>{profile.lastName}</span>
            </span>
          </h1>

          <p className={`${styles.role} ${styles.enter}`} style={{ '--d': '420ms' } as CSSProperties}>
            <span>{profile.title}</span>
            <span className={styles.roleRule} aria-hidden="true" />
            <span className={styles.roleFocus}>Full-stack &amp; Backend</span>
          </p>

          <p className={`${styles.intro} ${styles.enter}`} style={{ '--d': '520ms' } as CSSProperties}>
            {profile.heroIntro}
          </p>

          <div className={`${styles.actions} ${styles.enter}`} style={{ '--d': '620ms' } as CSSProperties}>
            <ButtonLink href="#work" icon="arrow-down">
              View selected work
            </ButtonLink>
            <ButtonLink href={profile.links.resume} variant="secondary" icon="file" external>
              Résumé <span className={styles.pdf}>PDF</span>
            </ButtonLink>
            <ButtonLink href={profile.links.github} variant="ghost" icon="arrow-up-right" external>
              <span className={styles.ghLabel}>
                <Icon name="github" size={17} />
                GitHub
              </span>
            </ButtonLink>
            {profile.links.linkedin && (
              <ButtonLink href={profile.links.linkedin} variant="ghost" icon="arrow-up-right" external>
                <span className={styles.ghLabel}>
                  <Icon name="linkedin" size={16} />
                  LinkedIn
                </span>
              </ButtonLink>
            )}
          </div>
        </div>

        {featuredProject && layers && (
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <span className={styles.corner} data-pos="tl" aria-hidden="true" />
              <span className={styles.corner} data-pos="tr" aria-hidden="true" />
              <span className={styles.corner} data-pos="bl" aria-hidden="true" />
              <span className={styles.corner} data-pos="br" aria-hidden="true" />
              <RequestDiagram layers={layers} />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.figNo}>Fig. 01</span>
              <span>
                How a request moves through{' '}
                <a href={`#${caseStudyId(featuredProject)}`} className={styles.captionLink}>
                  {featuredProject.title}
                  <Icon name="arrow-right" size={14} />
                </a>
              </span>
            </figcaption>
          </figure>
        )}
      </div>

      <div className="container">
        <dl className={`${styles.facts} ${styles.enter}`} style={{ '--d': '760ms' } as CSSProperties}>
          {profile.heroFacts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.href ? (
                  <a href={fact.href} className={styles.factLink}>
                    {fact.value}
                    <Icon name="arrow-down" size={14} />
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
