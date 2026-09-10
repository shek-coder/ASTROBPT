import { SceneBackdrop, HabitatGlyph, PowerBeam, WasteInflow, Chamber, MoleculeBreak, GasBubbles, ElectronStream, PowerReadout, VB } from './primitives.jsx'

/**
 * Direct Urea Fuel Cell — dedicated process visualization.
 * Stage map (matches technologies.js "dufc" flow array):
 *   0 INPUT      -> urea-rich urine enters the cell
 *   1 CONTACT    -> urine contacts the catalytic anode surface
 *   2 OXIDATION  -> urea molecules are oxidized directly (no microbes)
 *   3 CIRCUIT    -> released electrons flow through the external circuit
 *   4 BYPRODUCT  -> nitrogen-containing byproducts are released
 *   5 ENERGY     -> a fast-responding current is produced
 *   6 OUTPUT     -> auxiliary power delivered to the habitat
 */
export default function UreaFuelCellAnimation({ stageIndex, accent }) {
  const s = stageIndex

  return (
    <svg viewBox={VB} width="100%" height="100%" role="img" aria-label="Direct urea fuel cell process animation">
      <SceneBackdrop accent={accent} />
      <WasteInflow label="UREA-RICH URINE" active={s <= 1} x1={30} x2={230} y={200} accent={accent} />
      <Chamber x={230} y={90} w={230} h={220} label="CATALYTIC ANODE" accent={accent} />

      {s === 1 && (
        <>
          <rect x={250} y={180} width={190} height={6} rx="3" fill={accent} opacity="0.5" />
          <text x={345} y={165} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
            CATALYTIC CONTACT
          </text>
        </>
      )}

      {s === 2 && (
        <>
          <MoleculeBreak cx={345} cy={210} count={6} accent={accent} breaking />
          <text x={345} y={300} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
            DIRECT ELECTROCHEMICAL OXIDATION
          </text>
        </>
      )}

      {s >= 3 && (
        <ElectronStream
          path="M460,150 C520,130 540,90 600,90 C660,90 660,300 590,300 C540,300 520,270 470,255"
          accent={accent}
          count={s === 3 ? 4 : 7}
          fast
        />
      )}
      {s === 3 && (
        <text x={520} y={68} fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          FAST ELECTRON FLOW · NO BIOLOGICAL LAG
        </text>
      )}

      {s === 4 && (
        <>
          <GasBubbles x={280} y={160} w={120} accent="#7ff0f5" count={6} />
          <text x={345} y={110} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
            NITROGEN BYPRODUCTS RELEASED
          </text>
        </>
      )}

      <PowerReadout x={640} y={150} values={[0, 8, 14, 19]} unit="mW/cm²" accent={accent} active={s >= 5} />

      <PowerBeam from={{ x: 640, y: 190 }} to={{ x: 655, y: 300 }} accent={accent} active={s >= 6} />
      <HabitatGlyph x={665} y={300} powered={s >= 6} accent={accent} />

      {s === -1 && (
        <text x={400} y={40} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#aab6c8" fontFamily="var(--mono)">
          URINE STREAM · DIRECT ELECTROCHEMICAL PATHWAY
        </text>
      )}
      {s === 7 && (
        <text x={400} y={40} textAnchor="middle" fontSize="13" letterSpacing="3" fill={accent} fontFamily="var(--mono)" fontWeight="700">
          UREA → ELECTRONS → HABITAT
        </text>
      )}
    </svg>
  )
}
