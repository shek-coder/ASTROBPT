import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import challenges from '../data/challenges.js'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildChallengeScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Challenges({ onChallengeView }) {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <section id="challenges">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">06 &middot; MISSION RISKS</div>
          <h2 className="sec-title">Engineering challenges</h2>
          <p className="sec-desc">Tap a challenge to open a cinematic breakdown.</p>
        </motion.div>

        <motion.div
          className="risk-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {challenges.map((r, i) => (
            <motion.button
              key={r.name}
              className="glass risk-card"
              variants={fadeUp}
              onClick={() => { setActiveIdx(i); onChallengeView?.() }}
            >
              <div className="r-num">0{i + 1}</div>
              <div className="r-name">{r.name}</div>
              <div className="t-open">VIEW BREAKDOWN &rarr;</div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="glass energy-eq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          NET ENERGY&nbsp; = &nbsp;CHEMICAL ENERGY CONVERTED&nbsp; &minus; &nbsp;AUXILIARY ENERGY
        </motion.div>
      </div>

      <AnimatePresence>
        {activeIdx !== null && (
          <CinematicModal
            tag="MISSION RISK"
            title={challenges[activeIdx].name}
            accent="#ff4d5e"
            scenes={buildChallengeScenes(challenges[activeIdx])}
            onClose={() => setActiveIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
