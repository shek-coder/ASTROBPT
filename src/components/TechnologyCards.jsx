import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Droplets, Flame, Thermometer } from 'lucide-react'
import technologies from '../data/technologies.js'
import TechnologyModal from './TechnologyModal.jsx'

const iconMap = { Zap, Droplets, Flame, Thermometer }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function TechnologyCards() {
  const [activeTech, setActiveTech] = useState(null)

  return (
    <section id="technologies">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">04 &middot; ENERGY RECOVERY TECHNOLOGIES</div>
          <h2 className="sec-title">Four conversion technologies</h2>
          <p className="sec-desc">
            Open a card for how each technology works, its inputs and outputs, and its role in the habitat.
          </p>
        </motion.div>

        <motion.div
          className="tech-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {technologies.map((t) => {
            const Icon = iconMap[t.icon]
            return (
              <motion.button
                key={t.id}
                className="glass tech-card"
                variants={fadeUp}
                onClick={() => setActiveTech(t)}
              >
                <Icon size={24} className="t-icon" />
                <div className="t-num">{t.num}</div>
                <div className="t-name">{t.name}</div>
                <div className="t-blurb">{t.blurb}</div>
                <div className="t-open">VIEW DETAILS &rarr;</div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeTech && <TechnologyModal tech={activeTech} onClose={() => setActiveTech(null)} />}
      </AnimatePresence>
    </section>
  )
}
