import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const losses = ['Pumping', 'Heating', 'Pretreatment', 'Controls', 'Gas handling', 'Conversion losses']

const applications = [
  'Environmental sensors',
  'Low-power instrumentation',
  'Monitoring nodes',
  'Small pumps',
  'Battery charging'
]

export default function EnergySection() {
  return (
    <section id="energy">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">05 &middot; WHAT CAN WE REALISTICALLY DELIVER?</div>
          <h2 className="sec-title">Feasibility &ne; primary power</h2>
          <p className="sec-desc">
            Theoretical chemical energy is not the same as usable electricity delivered to a bus bar.
          </p>
        </motion.div>

        <motion.div
          className="compare-wrap"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="compare-row" variants={fadeUp}>
            <div className="cr-label">
              <span>THEORETICAL URINE ENERGY</span>
              <span>&asymp; 48&ndash;49 Wh / day / astronaut</span>
            </div>
            <div className="compare-bar theory"><div className="fill"></div></div>
          </motion.div>
          <motion.div className="compare-row" variants={fadeUp}>
            <div className="cr-label">
              <span>ACTUAL NET USEFUL ELECTRICITY</span>
              <span>lower, after losses</span>
            </div>
            <div className="compare-bar real"><div className="fill"></div></div>
          </motion.div>
        </motion.div>

        <motion.div
          className="loss-chain"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          {losses.map((l, i) => (
            <span key={l}>
              <span className="loss-item">{l}</span>
              {i < losses.length - 1 && <span className="loss-arrow"> &rarr; </span>}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="callout"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          AUXILIARY POWER + RESOURCE RECOVERY &mdash; NOT PRIMARY POWER
        </motion.div>

        <motion.div
          className="applist"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {applications.map((a) => (
            <motion.div className="glass app-item" key={a} variants={fadeUp}>
              <CheckCircle2 size={16} />
              {a}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
