import { motion } from 'framer-motion'
import { content } from '../data/content'

function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, Math.min(255, (n >> 16) + amount))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amount))
  const b = Math.max(0, Math.min(255, (n & 0xff) + amount))
  return `rgb(${r}, ${g}, ${b})`
}

function Book({ project, open, onOpen }) {
  const bg = `linear-gradient(155deg, ${shade(project.spine, 24)}, ${project.spine} 45%, ${shade(project.spine, -28)})`
  return (
    <button
      type="button"
      className={`book ${open ? 'open' : ''}`}
      style={{ background: bg }}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onOpen}
      aria-expanded={open}
      aria-label={`${project.title} — ${project.client}`}
    >
      <span className="spine-face" aria-hidden={open}>
        <span className="spine-lines" />
        <span className="spine-title">{project.title}</span>
        <span className="spine-badge">{project.status}</span>
      </span>
      <span className="cover-face" aria-hidden={!open}>
        <span className="cover-status">
          <span className="ok" /> {project.status}
        </span>
        <span className="cover-client">{project.client}</span>
        <span className="cover-title">{project.title}</span>
        <span className="cover-sub">— {project.subtitle} —</span>
        <span className="cover-desc">{project.description}</span>
        <span className="cover-tags">
          {project.tags.map((tag) => (
            <span className="ctag" key={tag}>
              {tag}
            </span>
          ))}
        </span>
      </span>
    </button>
  )
}

export default function Projects({ openIndex, setOpenIndex }) {
  return (
    <section id="work">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        projects /
      </motion.p>
      <motion.h2
        className="display"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        What I&apos;ve built
      </motion.h2>
      <p className="section-sub">Hover to explore — every spine is a shipped system.</p>
      <motion.div
        className="systems-pill"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <span className="ok" /> {content.projects.length}/{content.projects.length} systems shipped
      </motion.div>
      <motion.div
        className="shelf"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {content.projects.map((project, i) => (
          <Book key={project.id} project={project} open={openIndex === i} onOpen={() => setOpenIndex(i)} />
        ))}
      </motion.div>
    </section>
  )
}
