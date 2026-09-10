import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import wasteFlow from '../data/wasteFlow.js'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildWasteFlowScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const wasteFlowScenes = buildWasteFlowScenes(wasteFlow)

export default function WasteFlow() {
  const [selected, setSelected] = useState(null)
  const [cinematicOpenAt, setCinematicOpenAt] = useState(null)

  const openStage = (i) => {
    setSelected(i)
    // +1 to skip the intro scene and land directly on the clicked stage
    setCinematicOpenAt(i + 1)
  }

  return (
    <section id="system">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">02 &middot; SYSTEM OVERVIEW</div>
          <h2 className="sec-title">Interactive waste flow</h2>
          <p className="sec-desc">
            Select a stage to open a cinematic walkthrough of what happens to astronaut waste as it
            moves through the recovery system.
          </p>
        </motion.div>

        <motion.div
          className="stage-track"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {wasteFlow.map((stage, i) => (
            <motion.div key={stage.name} style={{ display: 'contents' }} variants={fadeUp}>
              <button
                className={`glass stage-node ${selected === i ? 'sel' : ''}`}
                onClick={() => openStage(i)}
              >
                <div className="s-num">
                  <span>0{i + 1}</span>
                </div>
                <div className="s-name">{stage.name}</div>
              </button>
              {i < wasteFlow.length - 1 && <div className="track-arrow">&rarr;</div>}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="glass info-panel"
          key={selected === null ? 'default' : selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selected === null ? (
            <>
              <div className="ip-title">Select a stage above</div>
              <div className="ip-body">
                Click any stage in the sequence to open a cinematic walkthrough of how it processes
                astronaut waste into recoverable resources.
              </div>
            </>
          ) : (
            <>
              <div className="ip-title">{wasteFlow[selected].title}</div>
              <div className="ip-body">{wasteFlow[selected].body}</div>
            </>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {cinematicOpenAt !== null && (
          <CinematicModal
            tag="SYSTEM OVERVIEW \u00b7 WASTE FLOW"
            title="Interactive waste flow"
            accent="#33d7e0"
            scenes={wasteFlowScenes}
            initialSceneIndex={cinematicOpenAt}
            onClose={() => setCinematicOpenAt(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
