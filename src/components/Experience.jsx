import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { content } from '../data/content'

function fakeHash(seed) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

export default function Experience() {
  const wrapRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.72', 'end 0.38'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  useEffect(() => {
    const items = wrapRef.current?.querySelectorAll('.xp-item')
    if (!items?.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveIdx(Number(entry.target.dataset.idx))
        })
      },
      { rootMargin: '-40% 0px -52% 0px' }
    )
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        experience.md
      </motion.p>
      <motion.h2
        className="display"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        Where I&apos;ve been
      </motion.h2>
      <p className="section-sub">From Trivandrum classrooms to leading AI-first engineering teams.</p>
      <div className="xp-wrap" ref={wrapRef}>
        <div className="xp-line" aria-hidden="true">
          <motion.div className="xp-line-fill" style={{ scaleY: fill }} />
        </div>
        {content.experience.map((job, i) => (
          <motion.div
            className={`xp-item ${i === activeIdx ? 'is-active' : ''}`}
            data-idx={i}
            key={job.company}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
