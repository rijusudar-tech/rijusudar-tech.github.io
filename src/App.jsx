import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

const SECTION_IDS = ['top', 'about', 'skills', 'work', 'experience', 'contact']

export default function App() {
  const [active, setActive] = useState('top')
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openProject = (index) => {
    setOpenIndex(index)
    navigate('work')
  }

  return (
    <>
      <Sidebar active={active} onNavigate={navigate} onOpenProject={openProject} />
      <main className="main-col">
        <div className="inner">
          <Hero />
          <About />
          <Skills />
          <Projects openIndex={openIndex} setOpenIndex={setOpenIndex} />
          <Experience />
          <Contact />
        </div>
      </main>
    </>
  )
}
