import { motion } from 'framer-motion'
import { content } from '../data/content'

function fakeHash(seed) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

export default function Experience() {
  return (
    <section id="experience">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        experience.md
      </motion.p>
      <motion.h2
        className="display"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        Where I&apos;ve been
      </motion.h2>
      <p className="section-sub">From Trivandrum classrooms to leading AI-first engineering teams.</p>
      <div className="xp-wrap">
        {content.experience.map((job, i) => (
          <motion.div
            className="xp-item"
            key={job.company}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
          >
            <span className={`xp-node ${job.kind === 'education' ? 'education' : ''}`} aria-hidden="true" />
            <div className={`xp-card ${job.kind === 'education' ? 'education' : ''}`}>
              <div className="xp-period">
                {job.period}
                <span className="xp-hash">#{fakeHash(job.company)}</span>
              </div>
              <h3 className="xp-company">{job.company}</h3>
              <div className="xp-role">{job.role}</div>
              <p className="xp-note">{job.note}</p>
              <div className="xp-tags">
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
