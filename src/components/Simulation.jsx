import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import wasteFlow from '../data/wasteFlow.js'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildWasteFlowScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const STEPS = [
  { tag: 'STEP 01', text: 'Waste collection', wasteFlowIdx: 0 },
  { tag: 'STEP 02', text: 'Waste separation', wasteFlowIdx: 1 },
  { tag: 'STEP 03', text: 'Pretreatment', wasteFlowIdx: 2 },
  { tag: 'STEP 04', text: 'Energy conversion', wasteFlowIdx: 3 },
  { tag: 'STEP 05', text: 'Power conditioning', wasteFlowIdx: 4 },
  { tag: 'STEP 06', text: 'Water recovery', wasteFlowIdx: 5 },
  { tag: 'STEP 07', text: 'Nutrient recovery', wasteFlowIdx: 5 },
  { tag: 'STEP 08', text: 'Mission complete', wasteFlowIdx: 5 }
]

const STEP_DELAY = 550
const wasteFlowScenes = buildWasteFlowScenes(wasteFlow)

export default function Simulation({ onSimulationComplete }) {
  const [running, setRunning] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)
  const [cinematicOpenAt, setCinematicOpenAt] = useState(null)
  const timers = useRef([])

  const runSimulation = () => {
    if (running) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRunning(true)
    setDone(false)
    setVisibleCount(0)

    STEPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
        if (i === STEPS.length - 1) {
          const finishT = setTimeout(() => {
            setDone(true)
            setRunning(false)
            onSimulationComplete?.()
          }, 400)
          timers.current.push(finishT)
        }
      }, i * STEP_DELAY)
      timers.current.push(t)
    })
  }

  const openStep = (step) => {
    if (running) return
    setCinematicOpenAt(step.wasteFlowIdx + 1)
  }

  const progressPct = (visibleCount / STEPS.length) * 100

  return (
    <section id="simulation">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">10 &middot; CONCEPTUAL SYSTEM SIMULATION</div>
          <h2 className="sec-title">Run mission simulation</h2>
          <p className="sec-desc">
            Steps the interface through one conceptual processing cycle. Click any logged step to open
            its cinematic detail. Not a claim of validated Mars performance.
          </p>
        </motion.div>

        <motion.div
          className="glass sim-panel"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <button className="btn btn-primary" onClick={runSimulation} disabled={running}>
            <PlayCircle size={16} />
            {running ? 'SIMULATION RUNNING...' : 'RUN MISSION SIMULATION'}
          </button>

          <div className="sim-progress">
            <div className="fill" style={{ width: `${progressPct}%` }}></div>
          </div>

          <div className="sim-log">
            {STEPS.slice(0, visibleCount).map((s) => (
              <motion.button
                className="log-line"
                key={s.tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => openStep(s)}
              >
                <span className="tag">[{s.tag}]</span>
                <span>{s.text}</span>
              </motion.button>
            ))}
          </div>

          {done && (
            <motion.div
              className="sim-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="r1">RESOURCE RECOVERY COMPLETE</div>
              <div className="r2">WASTE &rarr; RESOURCE &rarr; CLOSED-LOOP HABITAT</div>
            </motion.div>
          )}

          <div className="sim-tag">CONCEPTUAL SYSTEM SIMULATION &mdash; illustrative only</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {cinematicOpenAt !== null && (
          <CinematicModal
            tag="MISSION SIMULATION"
            title="Processing cycle detail"
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
