import { motion } from 'framer-motion'
import SkillsGlobe from './SkillsGlobe'

export default function Skills() {
  return (
    <section id="skills">
      <motion.p
        className="eyebrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        skills / skills.json
      </motion.p>
      <motion.h2
        className="display"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        The toolkit
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <SkillsGlobe />
      </motion.div>
    </section>
  )
}
