// Renders the app to static HTML after the client and SSR builds finish,
// so the deployed index.html contains real content (fast first paint, crawlable,
// readable without JavaScript). The client bundle then hydrates it.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const templatePath = path.join(root, 'dist', 'index.html')
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js')

const template = await readFile(templatePath, 'utf8')
if (!template.includes('<!--app-html-->')) {
  throw new Error('Prerender placeholder <!--app-html--> not found in dist/index.html')
}

const { render } = await import(pathToFileURL(serverEntry).href)
const appHtml = render()

await writeFile(templatePath, template.replace('<!--app-html-->', appHtml))
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of markup)`)
