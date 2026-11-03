import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Injects the public site URL (VITE_SITE_URL) into index.html so canonical,
 * Open Graph, and Twitter tags get absolute URLs. Tags marked with
 * `data-site-url` are removed entirely when no URL is configured, because
 * relative canonical/og:url values are invalid.
 */
function siteUrl(url: string): Plugin {
  const base = url.replace(/\/+$/, '')
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      const withTags = base
        ? html.replace(/\s+data-site-url/g, '')
        : html.replace(/^\s*<[^>]*data-site-url[^>]*>\s*$/gm, '')
      return withTags.replaceAll('%SITE_URL%', base)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // Served from the root of https://wmarietta.github.io (a GitHub Pages user site).
    base: '/',
    plugins: [react(), siteUrl(env.VITE_SITE_URL ?? '')],
    define: {
      __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
    },
  }
})
