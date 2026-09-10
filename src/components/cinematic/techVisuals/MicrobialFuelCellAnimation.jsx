import { AnimatePresence, motion } from 'framer-motion'
import { SceneBackdrop, HabitatGlyph, PowerBeam, WasteInflow, Chamber, Microbes, ElectronStream, PowerReadout, VB } from './primitives.jsx'

/**
 * Microbial Fuel Cell — dedicated process visualization.
 * Stage map (matches technologies.js "mfc" flow array):
 *   0 INPUT     -> urine/wastewater flows into the cell
 *   1 PROCESS   -> stream enters the anode chamber
 *   2 MICROBES  -> electroactive bacteria oxidize organic matter
 *   3 ELECTRONS -> electrons are released, collect at the anode
 *   4 CIRCUIT   -> electrons travel through the external circuit
 *   5 ENERGY    -> steady current registers on the power meter
 *   6 OUTPUT    -> conditioned electricity reaches the habitat
 */
export default function MicrobialFuelCellAnimation({ stageIndex, accent }) {
  const s = stageIndex // -1 intro, 0..6 stage, 7 impact

  return (
    <svg viewBox={VB} width="100%" height="100%" role="img" aria-label="Microbial fuel cell process animation">
      <SceneBackdrop accent={accent} />
      <WasteInflow label="ORGANIC WASTE / URINE" active={s <= 1} x1={30} x2={230} y={200} accent={accent} />
      <Chamber x={230} y={90} w={230} h={220} label="ANODE CHAMBER" sealed accent={accent} hot={false} />

      <AnimatePresence mode="popLayout">
        {s >= 2 && s <= 3 && (
          <motion.g key="microbes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Microbes cx={340} cy={200} count={8} accent={accent} feeding={s === 2} />
            {s === 2 && (
              <text x={345} y={295} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
                MICROBIAL OXIDATION
              </text>
            )}
          </motion.g>
        )}
      </AnimatePresence>

      {s >= 3 && (
        <ElectronStream
          path="M420,150 C500,150 480,90 560,90 C640,90 620,300 560,300 C500,300 520,255 460,250"
          accent={accent}
          count={s === 3 ? 3 : 6}
          fast={s >= 4}
        />
      )}

      {s === 3 && (
        <text x={480} y={120} fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          ELECTRONS RELEASED
        </text>
      )}
      {s === 4 && (
        <text x={520} y={70} fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          ELECTRON FLOW · EXTERNAL CIRCUIT
        </text>
      )}

      <PowerReadout x={630} y={150} values={[0, 10, 22, 35, 48]} accent={accent} active={s >= 5} />

      <PowerBeam from={{ x: 630, y: 190 }} to={{ x: 650, y: 300 }} accent={accent} active={s >= 6} />
      <HabitatGlyph x={660} y={300} powered={s >= 6} accent={accent} />

      {s === -1 && (
        <text x={400} y={40} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#aab6c8" fontFamily="var(--mono)">
          MARS HABITAT · WASTE-TO-ENERGY LOOP
        </text>
      )}
      {s === 7 && (
        <text x={400} y={40} textAnchor="middle" fontSize="13" letterSpacing="3" fill={accent} fontFamily="var(--mono)" fontWeight="700">
          WASTE → ENERGY → HABITAT
        </text>
      )}
    </svg>
  )
}
