import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import safetyParams from '../data/safety.js'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildSafetyScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function SafetyDashboard() {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section id="safety">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">07 &middot; MARS HABITAT SAFETY MONITOR</div>
          <h2 className="sec-title">Monitored parameters</h2>
          <p className="sec-desc">
            Continuous sensing across the processing loop, isolated from primary habitat systems.
            Values shown are simulated for this prototype. Tap a parameter to open its safety response
            sequence.
          </p>
        </motion.div>

        <motion.div
          className="safety-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {safetyParams.map((p, i) => (
            <motion.button
              className="glass safety-item"
              key={p.name}
              variants={fadeUp}
              onClick={() => setActiveIdx(i)}
            >
              <span className="sf-name">{p.name}</span>
              <span className={`sf-status ${p.status}`}>{p.status.toUpperCase()}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="safety-active"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <ShieldCheck size={16} /> SAFETY CONTAINMENT ACTIVE
        </motion.div>

        <motion.div
          className="safety-emph"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          The conversion system must never become a single point of failure for conventional ECLSS
          or primary power.
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <CinematicModal
            tag="SAFETY MONITOR"
            title={safetyParams[activeIdx].name}
            accent={safetyParams[activeIdx].status === 'warning' ? '#ffb020' : '#3fe08a'}
            scenes={buildSafetyScenes(safetyParams[activeIdx])}
            onClose={() => setActiveIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
