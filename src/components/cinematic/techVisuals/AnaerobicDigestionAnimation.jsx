import { AnimatePresence, motion } from 'framer-motion'
import { SceneBackdrop, HabitatGlyph, PowerBeam, WasteInflow, Chamber, Microbes, GasBubbles, ElectronStream, PowerReadout, VB } from './primitives.jsx'

/**
 * Anaerobic Digestion + Fuel Cell — dedicated process visualization.
 * Stage map (matches technologies.js "adfc" flow array):
 *   0 INPUT    -> solid organic waste is collected
 *   1 DIGESTER -> waste loaded into a sealed, oxygen-free digester
 *   2 MICROBES -> anaerobic microbes break down the organic matter
 *   3 BIOGAS   -> biogas bubbles rise through the chamber
 *   4 METHANE  -> methane-rich gas is routed toward the fuel cell
 *   5 ENERGY   -> fuel cell converts methane to electric current
 *   6 OUTPUT   -> power and nutrient-rich digestate are recovered
 */
export default function AnaerobicDigestionAnimation({ stageIndex, accent }) {
  const s = stageIndex

  return (
    <svg viewBox={VB} width="100%" height="100%" role="img" aria-label="Anaerobic digestion process animation">
      <SceneBackdrop accent={accent} />
      <WasteInflow label="SOLID ORGANIC WASTE" active={s <= 1} solid x1={30} x2={230} y={200} accent={accent} />
      <Chamber x={230} y={90} w={230} h={220} label="SEALED DIGESTER" sealed accent={accent} />

      <AnimatePresence mode="popLayout">
        {s === 2 && (
          <motion.g key="microbes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Microbes cx={330} cy={230} count={7} accent={accent} feeding />
            <text x={345} y={300} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
              ANAEROBIC DIGESTION
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {s >= 3 && s <= 4 && <GasBubbles x={260} y={260} w={160} accent={accent} count={9} />}
      {s === 3 && (
        <text x={345} y={110} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          BIOGAS FORMING
        </text>
      )}

      {s >= 4 && (
        <ElectronStream
          path="M460,140 C520,120 540,90 600,90 C660,90 660,300 590,300 C540,300 520,270 470,255"
          accent="#ffb020"
          count={s === 4 ? 4 : 6}
        />
      )}
      {s === 4 && (
        <text x={520} y={68} fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          METHANE-RICH BIOGAS → FUEL CELL
        </text>
      )}

      <PowerReadout x={640} y={150} values={[0, 15, 30, 42, 50]} accent={accent} active={s >= 5} />

      <PowerBeam from={{ x: 640, y: 190 }} to={{ x: 655, y: 300 }} accent={accent} active={s >= 6} />
      <HabitatGlyph x={665} y={300} powered={s >= 6} accent={accent} />

      {s === 6 && (
        <text x={230} y={340} fontSize="9.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          + NUTRIENT-RICH DIGESTATE RECOVERED
        </text>
      )}
      {s === -1 && (
        <text x={400} y={40} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#aab6c8" fontFamily="var(--mono)">
          SOLID WASTE STREAM · ANAEROBIC PATHWAY
        </text>
      )}
      {s === 7 && (
        <text x={400} y={40} textAnchor="middle" fontSize="13" letterSpacing="3" fill={accent} fontFamily="var(--mono)" fontWeight="700">
          WASTE → BIOGAS → ENERGY → HABITAT
        </text>
      )}
    </svg>
  )
}
