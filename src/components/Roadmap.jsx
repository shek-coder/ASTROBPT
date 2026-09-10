import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import roadmap from '../data/roadmap.js'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildRoadmapScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const roadmapScenes = buildRoadmapScenes(roadmap)

export default function Roadmap() {
  const [selected, setSelected] = useState(0)
  const [cinematicOpenAt, setCinematicOpenAt] = useState(null)

  const openStage = (i) => {
    setSelected(i)
    setCinematicOpenAt(i + 1)
  }

  return (
    <section id="roadmap">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">08 &middot; DEVELOPMENT ROADMAP</div>
          <h2 className="sec-title">From lab bench to habitat</h2>
          <p className="sec-desc">Click a stage to open a cinematic walkthrough.</p>
        </motion.div>

        <div className="timeline">
          <div className="tl-line"></div>
          <div
            className="tl-fill"
            style={{ height: `${(selected / (roadmap.length - 1)) * 100}%` }}
          ></div>
          {roadmap.map((r, i) => (
            <motion.div
              key={r.stage}
              className={`tl-item ${selected === i ? 'sel' : ''}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => openStage(i)}
            >
              <div className="tl-dot"></div>
              <div className="tl-stage">{r.stage}</div>
              <div className="tl-title">{r.title}</div>
              <div className="tl-desc">{r.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cinematicOpenAt !== null && (
          <CinematicModal
            tag="DEVELOPMENT ROADMAP"
            title="From lab bench to habitat"
            accent="#ff8a4c"
            scenes={roadmapScenes}
            initialSceneIndex={cinematicOpenAt}
            onClose={() => setCinematicOpenAt(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
