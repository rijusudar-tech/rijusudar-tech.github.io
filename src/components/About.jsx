import { motion } from 'framer-motion'
import { content } from '../data/content'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
}

export default function About() {
  return (
    <section id="about">
      <motion.p className="eyebrow" {...fadeUp}>
        about.md
      </motion.p>
      <motion.h2 className="display" {...fadeUp}>
        Who I am
      </motion.h2>
      <div className="about-grid">
        <motion.div className="about-text" {...fadeUp}>
          <p>
            UI Architect by title, <span className="hl red">craftsman by habit</span>. I&apos;ve been
            working on the web since 2012 — hand-coding HTML and CSS to W3C standards, and shaping
            user experiences with a <span className="hl blue">data-driven design</span> approach
            backed by real user research.
          </p>
          <p>
            Today I lead <span className="hl purple">AI-first UI engineering</span> at Prevalent AI —
            architecting intelligent platforms with LLMs, copilots and agents. Before that I headed
            40+ engineers at Quest Global and shipped enterprise software for{' '}
            <span className="hl green">Philips, ABB, EY, Uniqlo and Expedia</span>.
          </p>
          <p>
            If it involves React, Angular, Node.js or Large Language Models, I&apos;m in my element.
          </p>
        </motion.div>
        <motion.div className="about-card" {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <div className="big-mono">14 yrs</div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', margin: '4px 0 16px' }}>
            on the web
          </p>
          <div className="row">
            <div className="cell">
              <b>40+</b>
              <span>Engineers led</span>
            </div>
            <div className="cell">
              <b>13</b>
              <span>Flagship builds</span>
            </div>
            <div className="cell">
              <b>8</b>
              <span>Companies</span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div className="quote-block" {...fadeUp}>
        <div className="qmark" aria-hidden="true">“</div>
        <p>{content.quote}</p>
      </motion.div>
    </section>
  )
}
