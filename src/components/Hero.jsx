import { motion } from 'framer-motion'
import { content } from '../data/content'
import CodeWindow from './CodeWindow'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-deco" aria-hidden="true">{'<Riju.Init />'}</div>
      <div className="hero-cols">
        <div className="hero-left">
          <motion.div
            className="hero-avatar"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.monogram}
          </motion.div>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {content.name}
          </motion.h1>
          <motion.div
            className="hero-tagline"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {content.tagline.map((part, i) => (
              <span key={part} style={{ display: 'contents' }}>
                {i > 0 && <span className="pipe">|</span>}
                <span>{part}</span>
              </span>
            ))}
          </motion.div>
          <motion.div
            className="hex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="hex-chip">14+ yrs</span>
            <span className="hex-chip alt">Open to collab</span>
            <span className="hex-chip ghost">{content.location.split(',')[0]}</span>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeWindow />
        </motion.div>
      </div>
      <div className="explore">
        Explore
        <span className="arr" aria-hidden="true">▾</span>
      </div>
    </section>
  )
}
