import { About } from './components/about/About'
import { AiExperience } from './components/ai/AiExperience'
import { Contact } from './components/contact/Contact'
import { Education } from './components/education/Education'
import { Experience } from './components/experience/Experience'
import { Hero } from './components/hero/Hero'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Projects } from './components/projects/Projects'
import { Skills } from './components/skills/Skills'
import { useHashScroll } from './hooks/useHashScroll'
import { useReveal } from './hooks/useReveal'

export function App() {
  useReveal()
  useHashScroll()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <AiExperience />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
