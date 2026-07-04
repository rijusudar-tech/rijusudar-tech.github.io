import { motion } from 'framer-motion'
import { content } from '../data/content'

function CubeGlyph({ glyph }) {
  if (glyph === 'github') return <i className="devicon-github-original" aria-hidden="true" />
  if (glyph === 'so') return <span aria-hidden="true">{'{ }'}</span>
  return <span aria-hidden="true">@</span>
}

function IsoCube({ social }) {
  return (
    <a
      className="iso"
      href={social.link}
      target={social.link.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={social.label}
    >
      <span className="iso-cube" aria-hidden="true">
        <span className="iso-face f">
          <CubeGlyph glyph={social.glyph} />
        </span>
        <span className="iso-face b">
          <CubeGlyph glyph={social.glyph} />
        </span>
        <span className="iso-face r" />
        <span className="iso-face l" />
        <span className="iso-face t" />
      </span>
      <span className="iso-label">{social.label}</span>
    </a>
  )
}

export default function Contact() {
  return (
    <>
      <section id="contact" className="contact">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          contact.jsx
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          Let&apos;s build
          <br />
          something
        </motion.h2>
        <p className="section-sub">Reach out — always up for a good collab. Based in {content.location}.</p>
        <motion.div
          className="cubes"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {content.socials.map((social) => (
            <IsoCube key={social.label} social={social} />
          ))}
        </motion.div>
      </section>
      <footer className="footer">
        <span className="f-item">
          <span className="f-dot" /> main
        </span>
        <span className="f-item">Built with React + Vite</span>
        <span className="f-item">
          © {new Date().getFullYear()} {content.name}
        </span>
      </footer>
    </>
  )
}
