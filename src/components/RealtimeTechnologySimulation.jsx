import { useEffect, useMemo, useState } from 'react'

const clamp = (n, min, max) => Math.min(max, Math.max(min, n))
const fmt = (n, d = 1) => Number(n).toFixed(d)

function Slider({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <label className="rt-slider">
      <span><b>{label}</b><em>{value}{unit}</em></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
    </label>
  )
}

function Metric({ label, value, unit = '' }) {
  return <div className="rt-metric"><small>{label}</small><strong>{value}</strong><span>{unit}</span></div>
}

function CloseButton({ onClose }) {
  return <button className="rt-close" onClick={onClose} aria-label="Close simulation">×</button>
}

function Habitat({ power }) {
  return (
    <div className="rt-habitat-node">
      <div className="rt-dome" />
      <div className="rt-lights"><i /><i /><i /></div>
      <b>MARS HABITAT</b>
      <small>{fmt(power, 1)} W SIMULATED OUTPUT</small>
    </div>
  )
}

function ParticleStream({ count = 8, kind = 'electron' }) {
  return <div className={`rt-particle-stream ${kind}`}>{Array.from({ length: count }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
}

function ProcessArrow({ label, kind = '' }) {
  return <div className={`rt-process-arrow ${kind}`}><ParticleStream count={7} kind={kind || 'electron'} /><strong>{label}</strong></div>
}

function MFC({ v }) {
  // Simplified educational model: biodegradable organics + biofilm activity drive anodic current.
  const organicLoad = v.flow * (v.cod / 100) * 0.65
  const current = clamp(organicLoad * (v.microbes / 100) * (v.efficiency / 100) * 1.45, 0, 50)
  const voltage = clamp(0.22 + 0.0045 * v.microbes + 0.002 * v.efficiency, 0.22, 0.78)
  const power = current * voltage
  const treated = clamp(v.flow * (v.cod / 100) * (v.microbes / 100) * 0.72, 0, v.flow)

  return (
    <div className="rt-scene rt-mfc">
      <div className="rt-scene-title"><span>01</span> MICROBIAL FUEL CELL</div>
      <p className="rt-scene-subtitle">Biological oxidation at the anode → external electron circuit → cathodic reduction</p>
      <div className="rt-mfc-diagram">
        <div className="rt-chamber rt-feed-chamber">
          <div className="liquid-fill" style={{ height: `${clamp(v.flow * 2.2, 15, 92)}%` }} />
          <div className="waste-molecules">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <b>FILTERED WASTEWATER</b><small>biodegradable organics</small>
        </div>
        <div className="rt-chamber rt-anode">
          <div className="biofilm" />
          <div className="geobacter">{Array.from({ length: Math.round(8 + v.microbes / 9) }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <div className="anode-plate">ANODE</div>
          <b>ANODE CHAMBER</b><small>Geobacter biofilm • oxidation</small>
        </div>
        <div className="rt-membrane"><span>PROTON<br />EXCHANGE<br />MEMBRANE</span><i /></div>
        <div className="rt-chamber rt-cathode">
          <div className="oxygen">O₂</div>
          <div className="cathode-plate">CATHODE</div>
          <b>CATHODE CHAMBER</b><small>oxygen reduction</small>
        </div>
        <div className="rt-circuit">
          <div className="wire wire-top"><ParticleStream count={Math.round(5 + current / 10)} /><span>e⁻ → EXTERNAL CIRCUIT</span></div>
          <div className="load-icon">⚡<small>LOAD</small></div>
          <div className="wire wire-bottom" />
        </div>
      </div>
      <div className="rt-output-row"><div><strong>{fmt(current, 1)} mA</strong><small>estimated current</small></div><div><strong>{fmt(voltage, 2)} V</strong><small>estimated cell voltage</small></div><div><strong>{fmt(power, 1)} W</strong><small>simulated electrical power</small></div><Habitat power={power} /></div>
      <p className="rt-equation">Organic matter → Geobacter oxidation → anode → e⁻ through external circuit → cathode → electricity</p>
    </div>
  )
}

function DUFC({ v }) {
  // Simplified educational model for direct urea electro-oxidation. No bacteria are used.
  const reaction = clamp((v.urea / 100) * (v.catalyst / 100) * (v.condition / 100), 0, 1)
  const current = clamp(v.volume * v.urea * v.catalyst * v.condition / 5200, 0, 42)
  const voltage = clamp(0.31 + v.condition * 0.0024, 0.31, 0.55)
  const power = current * voltage

  return (
    <div className="rt-scene rt-dufc">
      <div className="rt-scene-title"><span>02</span> DIRECT UREA FUEL CELL</div>
      <p className="rt-scene-subtitle">Urea-rich urine → catalytic anode oxidation → electron flow → cathode reaction</p>
      <div className="rt-dufc-stage">
        <div className="urea-feed">
          <b>UREA-RICH URINE</b>
          <div className="molecule-cloud">{Array.from({ length: Math.round(8 + v.urea / 7) }, (_, i) => <i key={i} style={{ '--i': i }}>CO(NH₂)₂</i>)}</div>
          <small>{v.urea} g/L urea • {v.volume} mL feed</small>
        </div>
        <div className="catalyst-electrode">
          <div className="catalyst-grid" style={{ '--activity': reaction }} />
          <div className="oxidation-burst">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <b>CATALYTIC ANODE</b><small>direct urea electro-oxidation</small>
        </div>
        <ProcessArrow label="e⁻" />
        <div className="dufc-membrane"><span>ION<br />TRANSPORT</span></div>
        <div className="dufc-cathode"><div className="oxygen-cloud">O₂</div><b>CATHODE</b><small>cathodic reduction</small></div>
        <div className="dufc-load"><strong>⚡</strong><b>POWER CONDITIONER</b><small>to habitat auxiliary load</small></div>
      </div>
      <div className="rt-output-row"><div><strong>{fmt(reaction * 100, 1)}%</strong><small>relative reaction activity</small></div><div><strong>{fmt(current, 1)} mA</strong><small>estimated current</small></div><div><strong>{fmt(power, 1)} W</strong><small>simulated electrical power</small></div><Habitat power={power} /></div>
      <p className="rt-equation">Urea + catalyst → electrochemical oxidation → electrons → external circuit → cathode → electricity</p>
      <div className="rt-warning">NO MICROBES / NO GEobacter — this is a direct electrochemical route.</div>
    </div>
  )
}

function ADFC({ v }) {
  // Simplified mass-balance model: organic solids are biologically converted to methane-rich biogas.
  const organicMass = v.mass * v.organic / 100
  const conversion = (v.digestibility / 100) * clamp(v.retention / 20, 0.35, 1.45)
  const biogas = clamp(organicMass * conversion * 0.035, 0, 2.4)
  const methane = biogas * (v.methane / 100)
  const power = methane * (v.fuelCell / 100) * 11.5

  return (
    <div className="rt-scene rt-adfc">
      <div className="rt-scene-title"><span>03</span> ANAEROBIC DIGESTION + FUEL CELL</div>
      <p className="rt-scene-subtitle">Solid organic waste → oxygen-free digestion → methane-rich biogas → fuel-cell electricity</p>
      <div className="rt-adfc-stage">
        <div className="solid-feed"><b>FECES + FOOD RESIDUES</b><div>{Array.from({ length: Math.round(7 + v.mass / 4) }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div><small>{v.mass} kg wet feed</small></div>
        <div className="digester-vessel">
          <div className="digester-liquid" style={{ height: `${clamp(20 + v.mass * 1.8, 20, 88)}%` }} />
          <div className="digester-microbes">{Array.from({ length: 10 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <div className="gas-bubbles">{Array.from({ length: Math.round(5 + biogas * 5) }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
          <b>SEALED ANAEROBIC DIGESTER</b><small>NO O₂ • microbial decomposition</small>
        </div>
        <div className="gas-pipe"><ParticleStream count={Math.round(6 + methane * 4)} kind="methane" /><strong>BIOGAS →</strong><small>{fmt(methane, 2)} m³ CH₄-equivalent</small></div>
        <div className="gas-cleaner"><div>H₂S / H₂O</div><b>GAS CLEAN-UP</b><small>condition gas before conversion</small></div>
        <div className="biogas-fuelcell"><div className="fuelcell-stack" /><b>FUEL CELL</b><small>methane-rich gas → electricity</small></div>
      </div>
      <div className="rt-output-row"><div><strong>{fmt(biogas, 2)} m³</strong><small>estimated biogas</small></div><div><strong>{fmt(methane, 2)} m³</strong><small>estimated methane-rich fraction</small></div><div><strong>{fmt(power, 1)} W</strong><small>simulated electrical power</small></div><Habitat power={power} /></div>
      <div className="rt-side-output"><span>DIGESTATE</span><b>nutrient-rich residual slurry</b><small>recovered separately from the gas stream</small></div>
      <p className="rt-equation">Organic solids → anaerobic microbes → biogas → gas conditioning → fuel cell → electricity</p>
    </div>
  )
}

function Thermochemical({ v }) {
  // Simplified educational model for high-temperature gasification/pyrolysis-like conversion.
  const dryMass = v.mass * (1 - v.moisture / 100)
  const thermalFactor = clamp((v.temperature - 450) / 350, 0, 1)
  const syngas = clamp(dryMass * thermalFactor * (v.conversion / 100) * 0.12, 0, 5)
  const power = syngas * (v.energyRecovery / 100) * 9.2

  return (
    <div className="rt-scene rt-thermal">
      <div className="rt-scene-title"><span>04</span> THERMOCHEMICAL PROCESSING</div>
      <p className="rt-scene-subtitle">Dried solids + heat + limited oxygen → thermochemical conversion → syngas → energy recovery</p>
      <div className="rt-thermal-stage">
        <div className="thermal-feed"><b>DRIED SOLID RESIDUES</b><div>{Array.from({ length: Math.round(7 + v.mass / 3) }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div><small>{fmt(dryMass, 1)} kg dry matter</small></div>
        <div className="thermal-reactor">
          <div className="reactor-shell"><div className="hot-zone" style={{ opacity: 0.25 + thermalFactor * 0.75 }} /><div className="thermal-particles">{Array.from({ length: Math.round(7 + thermalFactor * 10) }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div><strong>{v.temperature}°C</strong></div>
          <b>THERMOCHEMICAL REACTOR</b><small>limited O₂ • gasification / pyrolysis-like conversion</small>
        </div>
        <div className="syngas-pipe"><ParticleStream count={Math.round(5 + syngas * 2)} kind="syngas" /><strong>SYNGAS →</strong><small>CO + H₂ + light hydrocarbons</small></div>
        <div className="syngas-cleaner"><div>PARTICULATE<br />REMOVAL</div><b>GAS CONDITIONING</b><small>prepare syngas for conversion</small></div>
        <div className="thermal-generator"><div className="generator-wheel" /><b>ENERGY CONVERTER</b><small>syngas → electrical output</small></div>
      </div>
      <div className="rt-output-row"><div><strong>{fmt(dryMass, 1)} kg</strong><small>dry feed</small></div><div><strong>{fmt(syngas, 2)} m³</strong><small>estimated syngas</small></div><div><strong>{fmt(power, 1)} W</strong><small>simulated electrical power</small></div><Habitat power={power} /></div>
      <div className="rt-heat-note"><span>THERMAL LOAD</span><b>{v.temperature}°C</b><small>High-temperature operation requires heat management in a closed habitat.</small></div>
      <p className="rt-equation">Dried solids → heat + limited O₂ → thermochemical conversion → syngas → energy recovery → electricity</p>
    </div>
  )
}

const defaults = {
  mfc: { flow: 30, cod: 55, microbes: 70, efficiency: 65 },
  dufc: { urea: 45, volume: 25, catalyst: 65, condition: 80 },
  adfc: { mass: 20, organic: 70, digestibility: 65, retention: 15, methane: 62, fuelCell: 55 },
  thermo: { mass: 20, moisture: 20, temperature: 700, conversion: 70, energyRecovery: 55 },
}

const titles = {
  mfc: 'Microbial Fuel Cell',
  dufc: 'Direct Urea Fuel Cell',
  adfc: 'Anaerobic Digestion + Fuel Cell',
  thermo: 'Thermochemical Processing',
}

export default function RealtimeTechnologySimulation({ method = 'mfc', onClose }) {
  const [values, setValues] = useState(defaults[method] || defaults.mfc)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    setValues(defaults[method] || defaults.mfc)
    setRunning(true)
  }, [method])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = old }
  }, [onClose])

  const set = (key, value) => setValues(prev => ({ ...prev, [key]: value }))
  const title = titles[method] || titles.mfc
  const Scene = useMemo(() => ({ mfc: MFC, dufc: DUFC, adfc: ADFC, thermo: Thermochemical }[method] || MFC), [method])

  return (
    <div className={`rt-overlay ${running ? '' : 'rt-paused'}`}>
      <header className="rt-header"><span>● LIVE EDUCATIONAL SIMULATION / {title.toUpperCase()}</span><CloseButton onClose={onClose} /></header>
      <div className="rt-layout">
        <aside className="rt-controls">
          <div className="rt-control-kicker">MISSION CONTROL</div>
          <h2>{title}</h2>
          <p>Change the process inputs. The diagram and deterministic model outputs update immediately.</p>

          {method === 'mfc' && <>
            <Slider label="Wastewater Flow" value={values.flow} min={5} max={50} unit=" mL" onChange={x => set('flow', x)} />
            <Slider label="Biodegradable Organics" value={values.cod} min={10} max={100} unit=" %" onChange={x => set('cod', x)} />
            <Slider label="Geobacter Activity" value={values.microbes} min={10} max={100} unit=" %" onChange={x => set('microbes', x)} />
            <Slider label="Cell Efficiency" value={values.efficiency} min={20} max={90} unit=" %" onChange={x => set('efficiency', x)} />
          </>}
          {method === 'dufc' && <>
            <Slider label="Urea Concentration" value={values.urea} min={5} max={100} unit=" g/L" onChange={x => set('urea', x)} />
            <Slider label="Fuel Volume" value={values.volume} min={5} max={50} unit=" mL" onChange={x => set('volume', x)} />
            <Slider label="Catalyst Activity" value={values.catalyst} min={20} max={90} unit=" %" onChange={x => set('catalyst', x)} />
            <Slider label="Operating Condition" value={values.condition} min={30} max={100} unit=" %" onChange={x => set('condition', x)} />
          </>}
          {method === 'adfc' && <>
            <Slider label="Wet Waste Mass" value={values.mass} min={5} max={40} unit=" kg" onChange={x => set('mass', x)} />
            <Slider label="Organic Fraction" value={values.organic} min={20} max={90} unit=" %" onChange={x => set('organic', x)} />
            <Slider label="Digestibility" value={values.digestibility} min={30} max={90} unit=" %" onChange={x => set('digestibility', x)} />
            <Slider label="Retention Time" value={values.retention} min={5} max={30} unit=" d" onChange={x => set('retention', x)} />
            <Slider label="Methane Fraction" value={values.methane} min={45} max={75} unit=" %" onChange={x => set('methane', x)} />
            <Slider label="Fuel Cell Efficiency" value={values.fuelCell} min={20} max={80} unit=" %" onChange={x => set('fuelCell', x)} />
          </>}
          {method === 'thermo' && <>
            <Slider label="Solid Waste Mass" value={values.mass} min={5} max={40} unit=" kg" onChange={x => set('mass', x)} />
            <Slider label="Moisture" value={values.moisture} min={5} max={60} unit=" %" onChange={x => set('moisture', x)} />
            <Slider label="Reactor Temperature" value={values.temperature} min={450} max={800} step={10} unit=" °C" onChange={x => set('temperature', x)} />
            <Slider label="Conversion Efficiency" value={values.conversion} min={30} max={90} unit=" %" onChange={x => set('conversion', x)} />
            <Slider label="Energy Recovery" value={values.energyRecovery} min={20} max={80} unit=" %" onChange={x => set('energyRecovery', x)} />
          </>}

          <div className="rt-actions"><button onClick={() => setRunning(x => !x)}>{running ? 'Ⅱ  Pause Motion' : '▶  Play Motion'}</button><button onClick={() => setValues(defaults[method] || defaults.mfc)}>↻ Reset</button></div>
          <div className="rt-accuracy-note"><b>SIMULATION NOTE</b> Values are deterministic educational estimates, not laboratory measurements. The 48–49 Wh figure in the reference paper is a theoretical chemical-energy estimate for about 1.5 L urine/day, not a guaranteed electrical output. Each technology uses its own process units and limits.</div>
        </aside>
        <main className="rt-main"><Scene v={values} /></main>
      </div>
    </div>
  )
}
