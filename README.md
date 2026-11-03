# William Marietta — Portfolio

Personal portfolio and résumé site, live at **https://wmarietta.github.io**. It's a static React + TypeScript app built with Vite and prerendered to HTML at build time. There's no backend, database, or tracking.

**Design concept:** a "technical drawing" look. Deep ink background, warm paper-colored type, one brass accent, an editorial serif (Fraunces) paired with Geist and Geist Mono, and real system diagrams in place of stock imagery. The hero diagram is built from the same data as the Duelist Kingdom case study, so the two always agree.

---

## Quick start

Requires Node.js 20.19+ (22 recommended, see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Dev server with hot reload                                          |
| `npm run typecheck` | Type-check the project                                              |
| `npm run build`     | Type-check, build, and prerender to static HTML in `dist/`          |
| `npm run preview`   | Serve the production build locally (http://localhost:4173)          |

### How the build works

1. `vite build` produces the client bundle in `dist/`.
2. `vite build --ssr src/entry-server.tsx` builds a server-render entry.
3. `scripts/prerender.mjs` renders `<App />` to HTML and injects it into `dist/index.html`.

The deployed page therefore contains real content for fast first paint, search engines, and visitors without JavaScript. React then hydrates it.

---

## Project structure

```
.github/workflows/deploy.yml           ← build + deploy to GitHub Pages on push to main
public/
  resume/William-Marietta-Resume.pdf   ← the résumé the site links to
  og-image.png                         ← social sharing preview (1200×630)
  404.html, sitemap.xml, robots.txt    ← GitHub Pages / SEO extras
  favicon.svg
scripts/
  prerender.mjs                        ← build-time static rendering
  og-image.html                        ← source for og-image.png
src/
  content/                             ← ALL site copy lives here
    profile.ts       name, links, hero, about, contact
    projects.ts      projects + Duelist Kingdom case study
    skills.ts        core stack + skill inventory
    experience.ts    experience + education
    ai.ts            AI tools section (Claude, ChatGPT)
    navigation.ts    header nav items
    types.ts         content types
    index.ts         derived helpers (featured project, "used in", …)
  components/
    layout/          Header, Footer, Section, Monogram
    hero/            Hero, RequestDiagram (animated SVG)
    projects/        FeaturedProject, CaseStudy, ProjectCard, Gallery, visuals/
    about/ skills/ ai/ experience/ education/ contact/
    ui/              Button, Tag, Status, Icon, emphasize()
  hooks/             useReveal, useActiveSection, useScrolled
  styles/global.css  design tokens, base styles, utilities
```

Styling uses CSS Modules per component, with shared design tokens (colors, type scale, spacing, easing) defined as CSS variables at the top of `src/styles/global.css`.

---

## Customizing

Almost every change is a content edit in `src/content/`. Components rarely need to be touched.

### Update the résumé

Replace `public/resume/William-Marietta-Resume.pdf` with a new PDF of the same name. If you rename it, update `links.resume` in `src/content/profile.ts`.

### LinkedIn and other profiles

The LinkedIn URL is set in `links.linkedin` in `src/content/profile.ts`. It appears in the hero, contact section, mobile menu, and footer. Remove the line to hide it everywhere.

### Edit the AI tools section

All of its text lives in `src/content/ai.ts`: the intro, a card per tool with work and everyday uses, the four-step workflow, the ground rules, and an optional note about how this site was built. Add another tool by appending to `tools`. Delete `siteNote` to remove the note.

### Add a project

Append an object to `projects` in `src/content/projects.ts`:

```ts
{
  slug: 'my-project',                 // used as the page anchor (#my-project)
  title: 'My Project',
  category: 'Backend service',
  context: 'Course project',          // optional
  status: 'completed',                // or 'in-development'
  summary: 'One or two sentences on what it is.',
  highlights: ['Concrete thing I built…', 'Another…'],
  stack: ['Go', 'PostgreSQL'],
  links: { repo: 'https://github.com/wmarietta/my-project' }, // only real links
  visual: 'mapreduce',                // pick an existing illustration
}
```

- **Visuals:** the options are `duelist`, `mapreduce`, `fighter`, `radio`, and `robotics`. To create a new one, add a component in `src/components/projects/visuals/ProjectVisual.tsx` and add its name to the `ProjectVisual` type.
- **Featured project:** the first project with a `caseStudy` is featured. All others render as cards in a two-column grid.
- **Small projects:** add them to `otherProjects` to list them compactly under "Also built".
- **Skills "Used in" links:** these are computed from each project's `stack`. Keep technology names spelled the same across `projects.ts` and `skills.ts`.

### Add Duelist Kingdom screenshots

1. Put image files in `public/projects/duelist-kingdom/`.
2. In `projects.ts`, uncomment the `screenshots` array on Duelist Kingdom and list each image with `src`, `alt`, `width`, `height`, and an optional `caption`.

A scrollable gallery then appears in the featured panel. Without screenshots, nothing placeholder-like is shown.

### Add a repository or live link

Set `links.repo` and/or `links.live` on a project. Buttons render only when a link exists, so no button ever points nowhere.

### Emphasize part of a heading

In `profile.ts` headings, wrap a phrase in asterisks to render it as brass italic. For example: `'Looking for my *first software engineering role.*'`.

### Change colors or fonts

Edit the tokens at the top of `src/styles/global.css`, such as `--brass`, `--ink-950`, and `--paper`. Fonts are self-hosted through Fontsource and imported in `src/main.tsx`.

### Regenerate the social preview image

Open `scripts/og-image.html` in Chrome, set the viewport to 1200×630 (DevTools → device toolbar), and capture a screenshot to `public/og-image.png`. You can also replace that file with any 1200×630 PNG.

---

## Deployment (GitHub Pages)

The site is hosted at **https://wmarietta.github.io**. Every push to `main` builds and deploys it automatically through GitHub Actions (`.github/workflows/deploy.yml`).

### How it's configured

- **Base path.** `base: '/'` in `vite.config.ts`. A GitHub Pages *user site* is served from the domain root, so every asset path such as `/assets/…`, `/resume/…`, and `/og-image.png` resolves correctly.
- **Single page, anchor navigation.** All navigation uses `#section` links on one page. There's no client-side router, so there are no deep links that GitHub Pages could 404 on refresh.
- **Site URL.** The workflow sets `VITE_SITE_URL=https://wmarietta.github.io` during the build. That produces the canonical tag, `og:url`, and an absolute social preview image URL, which LinkedIn and other platforms need.
- **Extras.** `public/404.html` is a branded "page not found" screen that links home. `public/sitemap.xml` and `public/robots.txt` help search engines find the site.

### One-time setup

1. **Create the repository.** On GitHub, create a new **public** repository named exactly **`wmarietta.github.io`**. That name is what makes GitHub serve it at the root domain. Don't add a README, license, or .gitignore, since this project already has them.

2. **Push this project to it** from this folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial portfolio site"
   git remote add origin https://github.com/wmarietta/wmarietta.github.io.git
   git push -u origin main
   ```

3. **Turn on GitHub Actions deployments.** In the repository, open **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.

4. **Run the first deployment.** The push in step 2 already started the workflow. If it ran before step 3 and failed, open the **Actions** tab, select **Deploy to GitHub Pages**, and choose **Run workflow**. The site goes live at https://wmarietta.github.io within a minute or two of a green run.

### Day-to-day updates

Edit, commit, and push to `main`. The workflow type-checks, builds, prerenders, and publishes automatically:

```bash
git add .
git commit -m "Update projects"
git push
```

Watch progress in the repository's **Actions** tab. A failed type-check or build stops the deploy, so a broken build never replaces the live site.

To test the production build locally before pushing:

```bash
npm run build
npm run preview    # http://localhost:4173
```

### Using a custom domain later

Add the domain under **Settings → Pages → Custom domain** and follow GitHub's DNS instructions. Then update three things: `VITE_SITE_URL` in the workflow, the URL in `public/sitemap.xml`, and the URL in `public/robots.txt`. Keep `base: '/'`.

### Other hosts

The output in `dist/` is plain static files, so it works anywhere. `vercel.json` and `netlify.toml` are included if you ever move to Vercel or Netlify. Set `VITE_SITE_URL` in that host's environment variables.

---

## Accessibility & performance notes

- Semantic landmarks, a single `h1`, logical heading order, a skip link, and visible focus styles.
- The mobile menu traps focus, closes on Escape, and returns focus to its button.
- The case study is `inert` while collapsed. Any link to it, such as the hero figure caption, opens it.
- All motion respects `prefers-reduced-motion`. Scroll reveals only hide content when JavaScript is running, so prerendered HTML is always readable.
- External links open in a new tab with `rel="noopener noreferrer"` and announce that to screen readers.
- The only runtime dependencies are React and self-hosted fonts. Fonts are split by unicode range, so browsers download only the Latin subsets.

---

## Content to review

The case study describes Duelist Kingdom's architecture, authentication flow, and data model at a high level, based on the project description. Skim `caseStudy` in `src/content/projects.ts` to confirm it matches your implementation, and adjust as the project evolves. Move items from `inProgress` to `built` as you finish them.
