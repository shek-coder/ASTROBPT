import { motion } from 'framer-motion'
import { Droplet, Zap, Activity, Gauge } from 'lucide-react'

const statuses = [
  { label: 'MARS HABITAT', value: 'ONLINE', type: 'online' },
  { label: 'WASTE PROCESSING', value: 'ACTIVE', type: 'active' },
  { label: 'RESOURCE RECOVERY', value: 'ACTIVE', type: 'active' },
  { label: 'ENERGY RECOVERY', value: 'AUXILIARY', type: 'aux' }
]

const metrics = [
  {
    icon: Droplet,
    label: 'URINE STREAM',
    value: '~1.5',
    unit: 'L / astronaut / day',
    note: 'Nominal daily excretion rate used for sizing.'
  },
  {
    icon: Zap,
    label: 'THEORETICAL ENERGY',
    value: '48\u201349',
    unit: 'Wh / astronaut / day',
    note: 'Theoretical urine chemical energy \u2014 not a guaranteed real-world yield.'
  },
  {
    icon: Activity,
    label: 'MFC PEAK POWER DENSITY',
    value: '~1300',
    unit: 'mW / m\u00b2',
    note: 'Reported peak power density in one urine-fed MFC configuration.'
  },
  {
    icon: Gauge,
    label: 'DUFC MAXIMUM',
    value: '0.19',
    unit: 'mW / cm\u00b2',
    note: 'Reported maximum with real urine in DUFC experiments.'
  }
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function MissionDashboard() {
  return (
    <section id="mission-control">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="sec-tag">01 &middot; MISSION CONTROL DASHBOARD</div>
          <h2 className="sec-title">Mars Habitat &mdash; Mission Control</h2>
          <p className="sec-desc">
            Live-format readouts for the habitat&rsquo;s waste-to-resource loop. Figures marked
            theoretical or reported are drawn from literature values, not measured hardware output.
          </p>
        </motion.div>

        <motion.div
          className="status-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {statuses.map((s) => (
            <motion.div className="glass status-row" key={s.label} variants={fadeUp}>
              <span className="label">{s.label}</span>
              <span className={`status-pill ${s.type}`}>
                <span className="dot"></span>
                {s.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="metric-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {metrics.map((m) => (
            <motion.div className="glass metric-card" key={m.label} variants={fadeUp}>
              <m.icon size={22} className="m-icon" />
              <div className="m-label">{m.label}</div>
              <div className="m-value">
                {m.value}
                <span className="m-unit">{m.unit}</span>
              </div>
              <div className="m-note">{m.note}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
