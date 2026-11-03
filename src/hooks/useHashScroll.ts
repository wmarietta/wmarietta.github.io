import { useEffect } from 'react'

/**
 * When the page is opened with a hash (e.g. a shared link to /#experience),
 * the browser jumps to the anchor before web fonts load. The font swap then
 * shifts the layout, so re-align to the anchor once fonts are ready.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    let cancelled = false
    const align = () => {
      if (cancelled) return
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    // Stop if the visitor starts scrolling on their own.
    const cancel = () => {
      cancelled = true
    }
    window.addEventListener('wheel', cancel, { passive: true, once: true })
    window.addEventListener('touchstart', cancel, { passive: true, once: true })
    window.addEventListener('keydown', cancel, { once: true })

    document.fonts.ready.then(() => requestAnimationFrame(align))
    return () => {
      cancelled = true
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('keydown', cancel)
    }
  }, [])
}
