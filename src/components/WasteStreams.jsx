import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildStreamScenes } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const urineSteps = ['URINE', 'FILTRATION', 'MFC / DUFC', 'ELECTRICAL CONDITIONING', 'WATER + NUTRIENT RECOVERY']
const solidSteps = ['FECES + FOOD RESIDUES', 'DIGESTION / THERMOCHEMICAL CONVERSION', 'METHANE / SYNGAS', 'FUEL CELL', 'AUXILIARY ENERGY']

const urineNote = 'Microbial Fuel Cell: electroactive microorganisms oxidize biodegradable material, combining wastewater treatment with small-scale electricity generation and nutrient recovery. Direct Urea Fuel Cell: generates current through direct electrochemical oxidation of urea.'
const solidNote = "Residual solids become treated water and nutrient-rich material, which is routed back into ECLSS (Environmental Control and Life Support System) rather than discarded."

export default function WasteStreams() {
  const [activeStream, setActiveStream] = useState(null)

  return (
    <section id="streams">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">03 &middot; WASTE STREAMS</div>
          <h2 className="sec-title">Two paths, two chemistries</h2>
          <p className="sec-desc">
            Liquid and solid waste are handled separately, each with its own conversion pathway.
            Open a stream to watch it move through the system.
          </p>
        </motion.div>

        <motion.div
          className="streams-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.button
            className="glass stream-card urine"
            variants={fadeUp}
            onClick={() => setActiveStream('urine')}
          >
            <h3><span className="swatch"></span>Urine stream</h3>
            <div className="mini-flow">
              {urineSteps.map((s, i) => (
                <div key={s} className={`mf-step ${i === urineSteps.length - 2 ? 'energy' : ''}`}>{s}</div>
              ))}
            </div>
            <div className="energy-indicator"><div className="bolt"></div></div>
            <div className="stream-note">
              <strong>Microbial Fuel Cell:</strong> electroactive microorganisms oxidize biodegradable
              material, combining wastewater treatment with small-scale electricity generation and
              nutrient recovery.
              <br /><br />
              <strong>Direct Urea Fuel Cell:</strong> generates current through direct electrochemical
              oxidation of urea.
            </div>
            <div className="t-open">VIEW ANIMATION &rarr;</div>
          </motion.button>

          <motion.button
            className="glass stream-card solid"
            variants={fadeUp}
            onClick={() => setActiveStream('solid')}
          >
            <h3><span className="swatch"></span>Solid organic stream</h3>
            <div className="mini-flow">
              {solidSteps.map((s, i) => (
                <div key={s} className={`mf-step ${i === solidSteps.length - 2 ? 'energy' : ''}`}>{s}</div>
              ))}
            </div>
            <div className="energy-indicator"><div className="bolt"></div></div>
            <div className="stream-note">
              Residual solids become treated water and nutrient-rich material, which is routed back
              into <strong>ECLSS</strong> (Environmental Control and Life Support System) rather than
              discarded.
            </div>
            <div className="t-open">VIEW ANIMATION &rarr;</div>
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeStream === 'urine' && (
          <CinematicModal
            tag="WASTE STREAM \u00b7 LIQUID"
            title="Urine stream"
            accent="#33d7e0"
            scenes={buildStreamScenes('Urine stream', urineSteps, urineNote)}
            onClose={() => setActiveStream(null)}
          />
        )}
        {activeStream === 'solid' && (
          <CinematicModal
            tag="WASTE STREAM \u00b7 SOLID"
            title="Solid organic stream"
            accent="#ffb020"
            scenes={buildStreamScenes('Solid organic stream', solidSteps, solidNote)}
            onClose={() => setActiveStream(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
