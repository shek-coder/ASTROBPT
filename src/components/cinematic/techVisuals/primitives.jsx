import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Low-level SVG pieces shared by every technology's cinematic process
 * animation (MicrobialFuelCellAnimation, UreaFuelCellAnimation,
 * AnaerobicDigestionAnimation, ThermochemicalAnimation). Each per-tech
 * component composes these into a scientifically distinct sequence — the
 * pieces themselves are just the visual vocabulary (pipes, chambers,
 * bacteria, electrons, gas, heat, a power readout, the habitat).
 *
 * Shared viewBox contract: 0 0 800 420.
 */

export const VB = '0 0 800 420'

export function SceneBackdrop({ accent }) {
  return (
    <g aria-hidden="true">
      <defs>
        <radialGradient id="tv-bg" cx="50%" cy="18%" r="90%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="55%" stopColor="#0a0f18" stopOpacity="0" />
          <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="800" height="420" fill="url(#tv-bg)" />
      {/* faint mars horizon */}
      <path d="M0,392 Q200,376 400,388 T800,382 V420 H0 Z" fill="#160a06" opacity="0.55" />
      <path d="M0,404 Q220,392 460,402 T800,398 V420 H0 Z" fill="#0c0704" opacity="0.7" />
    </g>
  )
}

/** Small habitat dome + antenna, bottom-right. Windows light up once `powered`. */
export function HabitatGlyph({ x = 660, y = 300, powered = false, accent }) {
  return (
    <g transform={`translate(${x},${y})`} aria-hidden="true">
      <path d="M-46,40 h92 v6 h-92 z" fill="#1a1f28" />
      <path d="M-38,40 A38,30 0 0 1 38,40 Z" fill="#141a24" stroke="#2a3340" strokeWidth="1.5" />
      <rect x="-4" y="-46" width="3" height="14" fill="#3a4556" />
      <circle cx="-2.5" cy="-48" r="3" fill={powered ? accent : '#3a4556'} />
      {[-22, -4, 14].map((wx, i) => (
        <rect
          key={i}
          x={wx}
          y="22"
          width="10"
          height="10"
          rx="1.5"
          fill={powered ? accent : '#232b37'}
          opacity={powered ? 0.9 : 0.6}
          className={powered ? 'tv-window-lit' : ''}
          style={powered ? { animationDelay: `${i * 0.35}s` } : undefined}
        />
      ))}
      <text x="0" y="60" textAnchor="middle" fontSize="9" letterSpacing="1.5" fill="#6b7890" fontFamily="var(--mono)">
        MARS HABITAT
      </text>
    </g>
  )
}

/** Beam of energy travelling from a source point to the habitat. */
export function PowerBeam({ from = { x: 500, y: 300 }, to = { x: 630, y: 305 }, accent, active }) {
  if (!active) return null
  return (
    <g aria-hidden="true">
      <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={accent} strokeWidth="2" opacity="0.25" />
      {[0, 0.33, 0.66].map((delay, i) => (
        <motion.circle
          key={i}
          r="3.2"
          fill={accent}
          initial={{ opacity: 0 }}
          animate={{
            cx: [from.x, to.x],
            cy: [from.y, to.y],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 1.1, repeat: Infinity, delay: delay * 1.1, ease: 'linear' }}
        />
      ))}
    </g>
  )
}

/** A pipe carrying liquid or solid waste into the reactor, left edge. */
export function WasteInflow({ label, active, solid = false, x1 = 40, x2 = 210, y = 190, accent }) {
  return (
    <g aria-hidden="true">
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#2b3341" strokeWidth="14" strokeLinecap="round" />
      <line x1={x1} y1={y} x2={x2} y2={y} stroke="#141a22" strokeWidth="8" strokeLinecap="round" />
      {active &&
        Array.from({ length: solid ? 3 : 5 }).map((_, i) => (
          <motion.circle
            key={i}
            r={solid ? 5 : 3}
            fill={solid ? '#8a6a4a' : '#5fb8ff'}
            initial={{ opacity: 0 }}
            animate={{ cx: [x1 + 6, x2 - 6], opacity: [0, 0.95, 0.95, 0] }}
            transition={{ duration: solid ? 1.8 : 1.1, repeat: Infinity, delay: i * (solid ? 0.55 : 0.3), ease: 'linear' }}
            cy={y}
          />
        ))}
      <text x={(x1 + x2) / 2} y={y - 22} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
        {label}
      </text>
    </g>
  )
}

/** The main reactor / chamber cutaway box. */
export function Chamber({ x = 230, y = 90, w = 260, h = 220, label, sealed = false, hot = false, accent }) {
  return (
    <g aria-hidden="true">
      <rect x={x} y={y} width={w} height={h} rx="14" fill="#0c1119" stroke="#232c3a" strokeWidth="2" />
      <rect
        x={x + 4}
        y={y + 4}
        width={w - 8}
        height={h - 8}
        rx="10"
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {sealed && (
        <>
          <rect x={x - 6} y={y + h / 2 - 34} width="10" height="68" rx="3" fill="#1c232f" stroke="#333f50" />
          <circle cx={x - 1} cy={y + h / 2} r="3" fill={accent} opacity="0.7" />
        </>
      )}
      {hot && (
        <motion.rect
          x={x + 4}
          y={y + 4}
          width={w - 8}
          height={h - 8}
          rx="10"
          fill={accent}
          initial={{ opacity: 0.06 }}
          animate={{ opacity: [0.06, 0.18, 0.06] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <text x={x + w / 2} y={y - 12} textAnchor="middle" fontSize="10.5" letterSpacing="1.5" fill="#aab6c8" fontFamily="var(--mono)">
        {label}
      </text>
    </g>
  )
}

/** Wiggling microorganism blobs inside a chamber. */
export function Microbes({ cx = 300, cy = 200, count = 7, accent, feeding = false }) {
  const blobs = Array.from({ length: count }, (_, i) => ({
    dx: ((i * 37) % 140) - 70,
    dy: ((i * 53) % 90) - 45,
    r: 7 + (i % 3) * 2.4,
    delay: (i % 5) * 0.24
  }))
  return (
    <g aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.ellipse
          key={i}
          cx={cx + b.dx}
          cy={cy + b.dy}
          rx={b.r}
          ry={b.r * 0.72}
          fill={accent}
          fillOpacity="0.55"
          stroke={accent}
          strokeOpacity="0.8"
          animate={{
            scale: [1, feeding ? 1.35 : 1.12, 1],
            rotate: [0, 12, -8, 0]
          }}
          transition={{ duration: 1.6 + (i % 3) * 0.3, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
        />
      ))}
    </g>
  )
}

/** Glowing electrons streaming along a path from source to drain. */
export function ElectronStream({ path, accent, count = 6, fast = false }) {
  return (
    <g aria-hidden="true">
      <path d={path} fill="none" stroke="#2b3341" strokeWidth="3" />
      <path d={path} fill="none" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" />
      {Array.from({ length: count }).map((_, i) => (
        <circle key={i} r="3.4" fill={accent}>
          <animateMotion
            dur={`${fast ? 1.1 : 1.8}s`}
            repeatCount="indefinite"
            begin={`${(i * (fast ? 1.1 : 1.8)) / count}s`}
            path={path}
          />
        </circle>
      ))}
    </g>
  )
}

/** Rising gas bubbles inside a sealed vessel. */
export function GasBubbles({ x = 260, y = 260, w = 160, accent, count = 8 }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const bx = x + ((i * 41) % w)
        return (
          <motion.circle
            key={i}
            cx={bx}
            r={2.5 + (i % 3)}
            fill={accent}
            fillOpacity="0.6"
            initial={{ cy: y + 30, opacity: 0 }}
            animate={{ cy: [y + 30, y - 90], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.4 + (i % 4) * 0.3, repeat: Infinity, delay: (i * 0.28) % 2.4, ease: 'easeIn' }}
          />
        )
      })}
    </g>
  )
}

/** Wavy heat lines rising off a hot surface. */
export function HeatWaves({ x = 300, y = 300, w = 140, accent }) {
  return (
    <g aria-hidden="true" opacity="0.75">
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={i}
          d={`M${x + i * (w / 3)},${y} q10,-18 0,-36 q-10,-18 0,-36`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0.15, y: 0 }}
          animate={{ opacity: [0.15, 0.55, 0.15], y: [0, -8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </g>
  )
}

/** Small hexagon molecules being broken apart at an electrode surface. */
export function MoleculeBreak({ cx = 300, cy = 200, count = 5, accent, breaking = false }) {
  const hexPath = (r) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2
      return `${r * Math.cos(a)},${r * Math.sin(a)}`
    })
    return `M${pts.join('L')}Z`
  }
  return (
    <g aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const dx = ((i * 44) % 130) - 65
        const dy = ((i * 31) % 70) - 35
        return (
          <motion.g
            key={i}
            transform={`translate(${cx + dx},${cy + dy})`}
            animate={
              breaking
                ? { scale: [1, 1.2, 0.3], opacity: [0.9, 0.9, 0] }
                : { scale: [1, 1.08, 1], opacity: [0.75, 0.95, 0.75] }
            }
            transition={{ duration: breaking ? 1.3 : 1.8, repeat: Infinity, delay: (i % 4) * 0.3, ease: 'easeInOut' }}
          >
            <path d={hexPath(11)} fill="none" stroke={accent} strokeWidth="1.8" />
            <circle r="2" fill={accent} />
          </motion.g>
        )
      })}
    </g>
  )
}

/** Rising numeric power readout that ticks up through `values` while active. */
export function PowerReadout({ x = 560, y = 150, values = [0, 10, 25, 50], accent, active, unit = 'W' }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!active) {
      setI(0)
      return undefined
    }
    setI(0)
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % values.length)
    }, 650)
    return () => clearInterval(id)
  }, [active, values.length])

  const display = active ? values[i] : 0

  return (
    <g aria-hidden="true" transform={`translate(${x},${y})`}>
      <rect x="-58" y="-34" width="116" height="70" rx="10" fill="#0c1119" stroke="#232c3a" strokeWidth="1.5" />
      <text x="0" y="-14" textAnchor="middle" fontSize="8.5" letterSpacing="1.5" fill="#8fa0b8" fontFamily="var(--mono)">
        POWER OUTPUT
      </text>
      <text
        x="0"
        y="18"
        textAnchor="middle"
        fontSize="24"
        fontFamily="var(--mono)"
        fill={active ? accent : '#4a5568'}
        fontWeight="700"
      >
        {display} {unit}
      </text>
    </g>
  )
}
