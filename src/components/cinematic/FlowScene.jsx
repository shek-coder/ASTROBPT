import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import cinematicIconMap from './cinematicIcons.js'

/**
 * Renders a horizontal (wrapping) sequence of nodes representing the stages
 * of a process, with the active node highlighted and glowing energy
 * particles animating along the connecting segments. Reused across every
 * technology / waste stream / roadmap / safety cinematic scene — only the
 * `stages` data and `accent` color change between them.
 */
export default function FlowScene({ stages, activeIndex, accent }) {
  return (
    <div className="cine-flow" style={{ '--accent': accent }}>
      {stages.map((stage, i) => {
        const Icon = cinematicIconMap[stage.icon] || Sparkles
        const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending'
        return (
          <div className="cine-flow-item" key={stage.tag + i}>
            <div className={`cine-node ${state}`}>
              <motion.div
                className="cine-node-ring"
                animate={state === 'active' ? { scale: [1, 1.18, 1], opacity: [0.55, 0.15, 0.55] } : { scale: 1, opacity: 0 }}
                transition={{ duration: 1.6, repeat: state === 'active' ? Infinity : 0, ease: 'easeInOut' }}
              />
              <div className="cine-node-core">
                <Icon size={18} />
              </div>
              <div className="cine-node-tag">{stage.tag}</div>
            </div>
            {i < stages.length - 1 && (
              <div className={`cine-segment ${i < activeIndex ? 'done' : 'pending'}`}>
                <div className="cine-segment-line" />
                {i === activeIndex && (
                  <motion.div
                    className="cine-particle"
                    initial={{ left: '0%', opacity: 0 }}
                    animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
