import { useEffect } from 'react'

const CASE_STUDY_SUFFIX = '-case-study'

/**
 * Opens each project's detail dialog from its hash (`#duelist-kingdom`), so
 * project links stay shareable and the browser's back button closes the
 * dialog. Any same-page link to a project hash opens its dialog, including
 * links elsewhere on the page (hero facts, "Used in" skills) and the older
 * `#<slug>-case-study` anchors.
 *
 * Dialogs are rendered closed by the components; this hook only drives them.
 */
export function useProjectRouting(slugs: readonly string[]) {
  useEffect(() => {
    const dialogs = new Map<string, HTMLDialogElement>()
    for (const slug of slugs) {
      const el = document.getElementById(`${slug}-dialog`)
      if (el instanceof HTMLDialogElement) dialogs.set(slug, el)
    }
    if (dialogs.size === 0 || typeof HTMLDialogElement.prototype.showModal !== 'function') return

    const root = document.documentElement
    let openedWithPush = false

    const slugFromHash = (hash: string): string | null => {
      const id = decodeURIComponent(hash.replace(/^#/, ''))
      if (dialogs.has(id)) return id
      if (id.endsWith(CASE_STUDY_SUFFIX)) {
        const base = id.slice(0, -CASE_STUDY_SUFFIX.length)
        if (dialogs.has(base)) return base
      }
      return null
    }

    const open = (slug: string, scrollToId?: string) => {
      const dialog = dialogs.get(slug)
      if (!dialog) return
      for (const [other, d] of dialogs) if (other !== slug && d.open) d.close()
      if (!dialog.open) {
        root.classList.add('dialog-open')
        dialog.showModal()
      }
      dialog.scrollTop = 0
      if (scrollToId) requestAnimationFrame(() => document.getElementById(scrollToId)?.scrollIntoView({ block: 'start' }))
    }

    const closeAll = () => {
      for (const d of dialogs.values()) if (d.open) d.close()
    }

    // Same-page links to a project open its dialog instead of jumping.
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = (anchor.getAttribute('href') ?? '').slice(1)
      const slug = slugFromHash(id)
      if (!slug) return
      event.preventDefault()
      history.pushState({ project: slug }, '', `#${slug}`)
      openedWithPush = true
      open(slug, id !== slug ? id : undefined)
    }

    // Closing (button, Escape, backdrop) leaves the project hash behind.
    const onDialogClose = (event: Event) => {
      const dialog = event.currentTarget as HTMLDialogElement
      if (![...dialogs.values()].some((d) => d.open)) root.classList.remove('dialog-open')
      const slug = dialog.dataset.project
      if (!slug || slugFromHash(location.hash) !== slug) return
      if (openedWithPush && history.state?.project === slug) {
        openedWithPush = false
        history.back()
      } else {
        history.replaceState(null, '', `${location.pathname}${location.search}#work`)
      }
    }

    const onDialogClick = (event: MouseEvent) => {
      const dialog = event.currentTarget as HTMLDialogElement
      const target = event.target as Element
      // A click on the dialog element itself is a click on the backdrop area.
      if (target === dialog || target.closest('[data-close]')) dialog.close()
    }

    const onPopState = () => {
      const slug = slugFromHash(location.hash)
      if (slug) open(slug)
      else closeAll()
    }

    document.addEventListener('click', onDocumentClick)
    window.addEventListener('popstate', onPopState)
    for (const d of dialogs.values()) {
      d.addEventListener('close', onDialogClose)
      d.addEventListener('click', onDialogClick)
    }

    // Shared deep link: open the project over its section.
    const initial = slugFromHash(location.hash)
    if (initial) {
      document.getElementById('work')?.scrollIntoView({ block: 'start' })
      const id = location.hash.slice(1)
      open(initial, id !== initial ? id : undefined)
    }

    return () => {
      document.removeEventListener('click', onDocumentClick)
      window.removeEventListener('popstate', onPopState)
      for (const d of dialogs.values()) {
        d.removeEventListener('close', onDialogClose)
        d.removeEventListener('click', onDialogClick)
      }
    }
  }, [slugs])
}
