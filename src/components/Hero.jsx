import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from './Navbar.jsx'

const FLOW = ['ASTRONAUT', 'WASTE', 'PROCESSING', 'ENERGY + WATER + NUTRIENTS', 'MARS HABITAT']

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % FLOW.length)
    }, 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="grid-backdrop" />
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        MISSION CONCEPT &middot; CLOSED-LOOP LIFE SUPPORT
      </motion.div>

      <motion.h1
        className="headline"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        ASTRONAUT WASTE
        <span className="arrow">&darr;</span>
        <span className="resource">RESOURCE</span>
      </motion.h1>

      <motion.p
        className="sub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Closed-Loop Energy Recovery for Long-Duration Mars Habitats
      </motion.p>

      <motion.div
        className="flowchain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        {FLOW.map((item, i) => (
          <span key={item}>
            <span className={`fc-item ${i === activeIdx ? 'active' : ''}`}>{item}</span>
            {i < FLOW.length - 1 && <span className="fc-arrow"> &rarr; </span>}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="hero-ctas"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <button className="btn btn-primary" onClick={() => scrollToSection('mission-control')}>
          ENTER MISSION CONTROL
        </button>
        <button className="btn btn-ghost" onClick={() => scrollToSection('system')}>
          EXPLORE THE SYSTEM
        </button>
      </motion.div>

      <div className="scroll-cue">
        <span>SCROLL</span>
        <span className="line"></span>
      </div>
    </section>
  )
}
