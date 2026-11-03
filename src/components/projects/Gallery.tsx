import type { Screenshot } from '../../content/types'
import styles from './Gallery.module.css'

/** Horizontally scrolling strip of real project screenshots. */
export function Gallery({ title, screenshots }: { title: string; screenshots: Screenshot[] }) {
  return (
    <div className={styles.gallery}>
      <ul className={styles.strip} aria-label={`${title} screenshots`} tabIndex={0}>
        {screenshots.map((shot) => (
          <li key={shot.src} className={styles.item}>
            <figure>
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
      </ul>
    </div>
  )
}
