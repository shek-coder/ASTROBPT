import { SceneBackdrop, HabitatGlyph, PowerBeam, WasteInflow, Chamber, HeatWaves, GasBubbles, ElectronStream, PowerReadout, VB } from './primitives.jsx'

/**
 * Thermochemical Processing — dedicated process visualization.
 * Stage map (matches technologies.js "thermo" flow array):
 *   0 INPUT      -> dried solid residues fed into the reactor
 *   1 HEATING    -> reactor seals, temperature rises under limited oxygen
 *   2 CONVERSION -> high-temperature thermal decomposition
 *   3 SYNGAS     -> combustible syngas forms, biochar remains
 *   4 ROUTING    -> syngas is piped to the fuel cell
 *   5 ENERGY     -> fuel cell produces auxiliary electricity
 *   6 OUTPUT     -> power reaches the habitat, residue set aside
 */
export default function ThermochemicalAnimation({ stageIndex, accent }) {
  const s = stageIndex
  const temp = s <= 0 ? 20 : s === 1 ? 340 : s === 2 ? 620 : s >= 3 ? 700 : 20

  return (
    <svg viewBox={VB} width="100%" height="100%" role="img" aria-label="Thermochemical processing animation">
      <SceneBackdrop accent={accent} />
      <WasteInflow label="DRIED SOLID RESIDUES" active={s <= 1} solid x1={30} x2={230} y={200} accent={accent} />
      <Chamber x={230} y={90} w={230} h={220} label="PYROLYSIS REACTOR" sealed hot={s >= 1 && s <= 3} accent={accent} />

      {/* Temperature gauge */}
      <g aria-hidden="true" transform="translate(250,300)">
        <rect x="0" y="0" width="150" height="8" rx="4" fill="#141a24" stroke="#232c3a" />
        <rect
          x="0"
          y="0"
          width={Math.min(150, (temp / 750) * 150)}
          height="8"
          rx="4"
          fill={accent}
          style={{ transition: 'width 0.9s ease' }}
        />
        <text x="0" y="-8" fontSize="9.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          REACTOR TEMP · {temp}&#176;C
        </text>
      </g>

      {s >= 1 && s <= 3 && <HeatWaves x={280} y={280} w={140} accent={accent} />}

      {s === 2 && (
        <text x={345} y={110} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          THERMAL DECOMPOSITION
        </text>
      )}

      {s >= 3 && (
        <>
          <GasBubbles x={260} y={200} w={160} accent={accent} count={7} />
          {/* biochar settling at the base of the chamber */}
          <rect x={250} y={286} width={190} height={16} rx="4" fill="#1c1712" opacity="0.85" />
          <text x={345} y={112} textAnchor="middle" fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
            SYNGAS + BIOCHAR
          </text>
        </>
      )}

      {s >= 4 && (
        <ElectronStream
          path="M460,150 C520,130 540,90 600,90 C660,90 660,300 590,300 C540,300 520,270 470,255"
          accent={accent}
          count={s === 4 ? 4 : 6}
        />
      )}
      {s === 4 && (
        <text x={520} y={68} fontSize="10.5" letterSpacing="1" fill="#8fa0b8" fontFamily="var(--mono)">
          SYNGAS ROUTED TO FUEL CELL
        </text>
      )}

      <PowerReadout x={640} y={150} values={[0, 12, 28, 40, 50]} accent={accent} active={s >= 5} />

      <PowerBeam from={{ x: 640, y: 190 }} to={{ x: 655, y: 300 }} accent={accent} active={s >= 6} />
      <HabitatGlyph x={665} y={300} powered={s >= 6} accent={accent} />

      {s === -1 && (
        <text x={400} y={40} textAnchor="middle" fontSize="12" letterSpacing="2" fill="#aab6c8" fontFamily="var(--mono)">
          SOLID RESIDUE STREAM · THERMOCHEMICAL PATHWAY
        </text>
      )}
      {s === 7 && (
        <text x={400} y={40} textAnchor="middle" fontSize="13" letterSpacing="3" fill={accent} fontFamily="var(--mono)" fontWeight="700">
          WASTE → HEAT → SYNGAS → HABITAT
        </text>
      )}
    </svg>
  )
}
