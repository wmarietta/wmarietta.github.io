import type { Screenshot, ScreenshotSlot } from '../../content/types'
import styles from './Gallery.module.css'

/**
 * Screenshots in a project's detail view. Real screenshots always render.
 * Screenshots the project still needs render as labelled placeholders in
 * development only, so a production build never ships an empty frame.
 */
export function Gallery({
  title,
  screenshots = [],
  needed = [],
}: {
  title: string
  screenshots?: Screenshot[]
  needed?: ScreenshotSlot[]
}) {
  const slots = import.meta.env.DEV ? needed : []
  if (screenshots.length + slots.length === 0) return null

  return (
    <section className={styles.gallery} aria-labelledby={`${title}-shots`.replace(/\s+/g, '-')}>
      <h3 id={`${title}-shots`.replace(/\s+/g, '-')} className={styles.heading}>
        Screenshots
      </h3>
      <ul className={styles.grid}>
        {screenshots.map((shot) => (
          <li key={shot.src}>
            <figure className={styles.shot}>
              <img
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                decoding="async"
                className={styles.image}
              />
              {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
            </figure>
          </li>
        ))}
        {slots.map((slot) => (
          <li key={slot.file}>
            <figure className={styles.shot}>
              <div className={styles.slot} role="note">
                <p className={styles.slotLabel}>Screenshot needed · dev only</p>
                <p className={styles.slotCaption}>{slot.caption}</p>
                <code className={styles.slotFile}>public{slot.file}</code>
                {slot.note && <p className={styles.slotNote}>{slot.note}</p>}
              </div>
              <figcaption className={styles.caption}>{slot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
