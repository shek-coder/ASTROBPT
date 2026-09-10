import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicModal from './cinematic/CinematicModal.jsx'
import { buildHabitatScene } from './cinematic/sceneBuilders.js'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const habitatScenes = buildHabitatScene()

export default function MarsHabitat() {
  const [open, setOpen] = useState(false)

  return (
    <section id="habitat">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">09 &middot; CLOSED-LOOP HABITAT</div>
          <h2 className="sec-title">Nothing is simply waste</h2>
          <p className="sec-desc">
            A single closed-loop view of how astronaut waste feeds back into the systems that keep the
            crew alive. Click the diagram to open the full cinematic walkthrough.
          </p>
        </motion.div>

        <motion.button
          className="glass loop-diagram"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          onClick={() => setOpen(true)}
          aria-label="Open closed-loop habitat animation"
        >
          <svg className="loop-svg" viewBox="0 0 900 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#5c6d82" />
              </marker>
            </defs>

            <rect x="330" y="16" width="240" height="46" rx="10" fill="rgba(255,138,76,0.1)" stroke="#ff8a4c" />
            <text x="450" y="44" fill="#eaf2f6" fontFamily="monospace" fontSize="14" textAnchor="middle">ASTRONAUTS</text>

            <line x1="450" y1="62" x2="450" y2="98" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <rect x="360" y="100" width="180" height="42" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" />
            <text x="450" y="126" fill="#eaf2f6" fontFamily="monospace" fontSize="13" textAnchor="middle">WASTE</text>

            <line x1="450" y1="142" x2="450" y2="176" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <rect x="300" y="178" width="300" height="46" rx="10" fill="rgba(51,215,224,0.1)" stroke="#33d7e0" />
            <text x="450" y="206" fill="#eaf2f6" fontFamily="monospace" fontSize="14" textAnchor="middle">RESOURCE RECOVERY SYSTEM</text>

            <line x1="360" y1="224" x2="200" y2="266" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <line x1="450" y1="224" x2="450" y2="266" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <line x1="540" y1="224" x2="700" y2="266" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />

            <rect x="120" y="268" width="160" height="42" rx="10" fill="rgba(51,215,224,0.08)" stroke="#33d7e0" />
            <text x="200" y="294" fill="#7ff0f5" fontFamily="monospace" fontSize="13" textAnchor="middle">WATER</text>
            <rect x="370" y="268" width="160" height="42" rx="10" fill="rgba(255,176,32,0.08)" stroke="#ffb020" />
            <text x="450" y="294" fill="#ffcf6b" fontFamily="monospace" fontSize="13" textAnchor="middle">ENERGY</text>
            <rect x="620" y="268" width="160" height="42" rx="10" fill="rgba(63,224,138,0.08)" stroke="#3fe08a" />
            <text x="700" y="294" fill="#89f5bb" fontFamily="monospace" fontSize="13" textAnchor="middle">NUTRIENTS</text>

            <line x1="200" y1="310" x2="200" y2="336" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <line x1="450" y1="310" x2="450" y2="336" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />
            <line x1="700" y1="310" x2="700" y2="336" stroke="#5c6d82" strokeWidth="2" markerEnd="url(#arrow)" className="flowline" />

            <text x="200" y="356" fill="#93a4b8" fontFamily="monospace" fontSize="12" textAnchor="middle">ECLSS SYSTEM</text>
            <text x="450" y="356" fill="#93a4b8" fontFamily="monospace" fontSize="12" textAnchor="middle">SENSORS</text>
            <text x="700" y="356" fill="#93a4b8" fontFamily="monospace" fontSize="12" textAnchor="middle">FOOD / GROWTH</text>
          </svg>
          <div className="t-open loop-open">VIEW CINEMATIC WALKTHROUGH &rarr;</div>
        </motion.button>

        <motion.p
          className="loop-tagline"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          &ldquo;Nothing is simply waste in a closed-loop habitat.&rdquo;
        </motion.p>
      </div>

      <AnimatePresence>
        {open && (
          <CinematicModal
            tag="CLOSED-LOOP HABITAT"
            title="Nothing is simply waste"
            accent="#3fe08a"
            scenes={habitatScenes}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
