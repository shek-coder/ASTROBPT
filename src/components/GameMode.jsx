import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, BatteryCharging, Beaker, Droplets, Gauge, LockKeyhole, Pickaxe, Play, RotateCcw, ShieldCheck, Sparkles, Trophy, Wind, Wrench, Zap } from 'lucide-react'

const technologies = [
  { id: 'separation', name: 'Waste Separation', unlockDay: 1, input: 'mixed', output: 'sorted batches', color: 'cyan' },
  { id: 'mfc', name: 'Microbial Fuel Cell', unlockDay: 3, input: 'urine', output: 'energy + water', color: 'green' },
  { id: 'urea', name: 'Direct Urea Fuel Cell', unlockDay: 5, input: 'urine', output: 'energy', color: 'amber' },
  { id: 'digester', name: 'Anaerobic Digestion', unlockDay: 8, input: 'solid waste', output: 'biogas + nutrients', color: 'mars' },
  { id: 'thermal', name: 'Thermochemical Reactor', unlockDay: 12, input: 'dry waste', output: 'syngas + energy', color: 'red' },
]

const starterMissions = [
  { id: 'first-waste', title: 'First Waste', detail: 'Sort and process your first waste batch.', target: 1, key: 'processed', reward: 100 },
  { id: 'first-power', title: 'First Power', detail: 'Generate 50 energy for the habitat.', target: 50, key: 'generatedEnergy', reward: 150 },
  { id: 'water-life', title: 'Water Is Life', detail: 'Recover 100 units of water.', target: 100, key: 'recoveredWater', reward: 200 },
  { id: 'gas-problem', title: 'Gas Problem', detail: 'Process solid waste safely.', target: 1, key: 'digesterRuns', reward: 300 },
]

const initialCampaign = {
  commander: '', mission: 'ARES-01', crew: 4, difficulty: 'NORMAL', day: 1, energy: 72, water: 81, oxygen: 89, food: 76, safety: 93,
  credits: 650, score: 0, xp: 0, level: 1, urine: 12, solidWaste: 8, foodWaste: 10, dryWaste: 6, nutrients: 0, biogas: 0, processed: 0, generatedEnergy: 0, recoveredWater: 0, digesterRuns: 0,
  sorted: false, selectedWaste: 'urine', selectedTech: 'mfc', processing: false, progress: 0, event: null, achievements: [], techLevels: {}, setupComplete: false, gameOver: false, complete: false,
}

function clamp(value) { return Math.max(0, Math.min(100, Math.round(value))) }

export default function GameMode({ onScienceMode }) {
  const [game, setGame] = useState(() => {
    try { return { ...initialCampaign, ...JSON.parse(localStorage.getItem('astro-bpt-campaign') || '{}') } } catch { return initialCampaign }
  })
  const [screen, setScreen] = useState('command')
  const [setup, setSetup] = useState({ commander: '', mission: 'ARES-01', crew: 4, difficulty: 'NORMAL' })
  const [notice, setNotice] = useState('Awaiting commander input.')

  useEffect(() => { localStorage.setItem('astro-bpt-campaign', JSON.stringify(game)) }, [game])

  const unlocked = useMemo(() => technologies.filter((tech) => game.day >= tech.unlockDay), [game.day])
  const levelName = ['Trainee', 'Engineer', 'System Operator', 'Mission Engineer', 'Habitat Commander', 'Mars System Architect'][Math.min(5, game.level - 1)]
  const activeMission = starterMissions.find((mission) => !game.achievements.includes(mission.id)) || starterMissions[starterMissions.length - 1]

  const startMission = () => setGame((prev) => ({ ...prev, ...setup, commander: setup.commander || 'Commander Vega', setupComplete: true }))
  const reset = () => { localStorage.removeItem('astro-bpt-campaign'); setGame(initialCampaign); setScreen('command'); setNotice('Campaign reset. New mission awaiting.') }

  const notify = (message) => { setNotice(message); window.setTimeout(() => setNotice('Awaiting commander input.'), 3500) }
  const earn = (xp, score, credits = 0) => ({ xp: game.xp + xp, score: game.score + score, credits: game.credits + credits, level: Math.floor((game.xp + xp) / 300) + 1 })

  const sortWaste = (correct = true) => setGame((prev) => ({ ...prev, sorted: true, score: prev.score + (correct ? 25 : -20), safety: clamp(prev.safety + (correct ? 1 : -6)), xp: Math.max(0, prev.xp + (correct ? 20 : -15)) }))

  const processWaste = () => {
    if (game.processing) return
    const tech = unlocked.find((item) => item.id === game.selectedTech)
    if (!tech) return notify('Technology locked. Advance the mission day to unlock it.')
    if (!game.sorted) return notify('Separate the waste batch before processing.')
    if (game.energy < 8) return notify('Insufficient energy. Run the oxygen or water system first.')
    const amountKey = game.selectedWaste === 'urine' ? 'urine' : game.selectedWaste === 'solidWaste' ? 'solidWaste' : game.selectedWaste === 'dryWaste' ? 'dryWaste' : 'foodWaste'
    if (game[amountKey] < 2) return notify('That waste stream is empty.')
    setGame((prev) => ({ ...prev, processing: true, progress: 0 }))
    let progress = 0
    const timer = window.setInterval(() => {
      progress += 25
      setGame((prev) => ({ ...prev, progress }))
      if (progress >= 100) {
        window.clearInterval(timer)
        setGame((prev) => {
          const amountKey = prev.selectedWaste === 'urine' ? 'urine' : prev.selectedWaste === 'solidWaste' ? 'solidWaste' : prev.selectedWaste === 'dryWaste' ? 'dryWaste' : 'foodWaste'
          const isDigester = prev.selectedTech === 'digester'
          const bonus = prev.selectedTech === 'mfc' ? { energy: clamp(prev.energy + 12), water: clamp(prev.water + 8) } : prev.selectedTech === 'urea' ? { energy: clamp(prev.energy + 16) } : isDigester ? { nutrients: prev.nutrients + 4, biogas: prev.biogas + 5, safety: clamp(prev.safety + 1) } : { energy: clamp(prev.energy + 18), safety: clamp(prev.safety - 2) }
          const progressState = { ...prev, ...bonus, [amountKey]: prev[amountKey] - 2, processed: prev.processed + 1, generatedEnergy: prev.generatedEnergy + (bonus.energy ? 12 : 0), recoveredWater: prev.recoveredWater + (bonus.water ? 8 : 0), digesterRuns: prev.digesterRuns + (isDigester ? 1 : 0), processing: false, progress: 100, sorted: false, ...earn(25, 60, 0) }
          const completed = starterMissions.filter((mission) => progressState[mission.key] >= mission.target).map((mission) => mission.id)
          const newAchievements = [...new Set([...prev.achievements, ...completed])]
          return { ...progressState, achievements: newAchievements }
        })
        notify('Process complete. Outputs transferred to habitat storage.')
      }
    }, 350)
  }

  const advanceDay = () => {
    setGame((prev) => {
      const next = { ...prev, day: prev.day + 1, oxygen: clamp(prev.oxygen - prev.crew * 2), water: clamp(prev.water - prev.crew * 2), food: clamp(prev.food - prev.crew), energy: clamp(prev.energy - 8), urine: prev.urine + prev.crew, solidWaste: prev.solidWaste + Math.ceil(prev.crew / 2), foodWaste: prev.foodWaste + prev.crew, dryWaste: prev.dryWaste + 1 }
      const event = next.day % 4 === 0 ? (next.day % 8 === 0 ? 'METHANE LEAK' : 'DUST STORM') : null
      return { ...next, event, safety: clamp(next.safety + (event ? -12 : 0)), gameOver: [next.oxygen, next.water, next.food, next.safety].some((value) => value <= 0), complete: next.day >= 30 && [next.energy, next.water, next.oxygen, next.food, next.safety].every((value) => value > 50) }
    })
    notify('One sol elapsed. Crew consumption and waste generation recorded.')
  }

  const repair = () => setGame((prev) => prev.credits >= 75 ? { ...prev, credits: prev.credits - 75, safety: clamp(prev.safety + 18), event: null, score: prev.score + 40 } : prev)
  const upgrade = () => setGame((prev) => prev.credits >= 120 ? { ...prev, credits: prev.credits - 120, techLevels: { ...prev.techLevels, [prev.selectedTech]: (prev.techLevels[prev.selectedTech] || 1) + 1 }, score: prev.score + 80, xp: prev.xp + 30 } : prev)

  if (!game.setupComplete) return <section className="game-start"><div className="game-start-orbit" /><div className="game-kicker">ASTRO BPT // SURVIVAL PROTOCOL 01</div><h1> MARS: <span>WASTE TO RESOURCE</span></h1><p>Mars has no room for waste. Every drop matters. Every watt matters. Keep the crew alive.</p><div className="setup-grid"><label>Commander Name<input value={setup.commander} onChange={(e) => setSetup({ ...setup, commander: e.target.value })} placeholder="Commander Vega" /></label><label>Mission Name<input value={setup.mission} onChange={(e) => setSetup({ ...setup, mission: e.target.value })} /></label><label>Crew Size<select value={setup.crew} onChange={(e) => setSetup({ ...setup, crew: Number(e.target.value) })}><option value="2">2 astronauts</option><option value="4">4 astronauts</option><option value="6">6 astronauts</option></select></label><label>Difficulty<select value={setup.difficulty} onChange={(e) => setSetup({ ...setup, difficulty: e.target.value })}><option>EASY</option><option>NORMAL</option><option>HARD</option><option>EXTREME</option></select></label></div><button className="game-primary" onClick={startMission}><Play size={16} /> Start Mission</button><button className="game-secondary" onClick={onScienceMode}>Science Mode</button></section>

  const nav = [['command', 'Command Center'], ['waste', 'Waste Control'], ['tech', 'Technology'], ['habitat', 'Habitat'], ['missions', 'Missions'], ['science', 'Science']]
  const resource = (label, value, icon) => <div className="resource-chip"><span>{icon} {label}</span><strong>{value}%</strong><i><b style={{ width: `${value}%` }} /></i></div>

  return <section className="game-shell"><header className="game-header"><div><div className="game-kicker">MARS COMMAND CENTER</div><h2>{game.mission} <span>// {game.commander}</span></h2></div><div className="header-stats"><b>DAY {String(game.day).padStart(2, '0')} / 30</b><b>LVL {game.level} {levelName}</b><b>{game.credits} CREDITS</b></div></header><div className="resource-grid">{resource('ENERGY', game.energy, <Zap size={14} />)}{resource('WATER', game.water, <Droplets size={14} />)}{resource('OXYGEN', game.oxygen, <Wind size={14} />)}{resource('FOOD', game.food, <Sparkles size={14} />)}{resource('SAFETY', game.safety, <ShieldCheck size={14} />)}</div><div className="game-layout"><aside className="game-nav">{nav.map(([id, label]) => <button className={screen === id ? 'active' : ''} key={id} onClick={() => id === 'science' ? onScienceMode() : setScreen(id)}>{label}</button>)}<button onClick={advanceDay}><Gauge size={15} /> Advance Sol</button><button onClick={reset}><RotateCcw size={15} /> Reset Campaign</button></aside><main className="game-panel"><div className="notice"><AlertTriangle size={15} /> {game.event || notice}</div>{screen === 'command' && <CommandCenter game={game} activeMission={activeMission} onNavigate={setScreen} onProcess={processWaste} onAdvance={advanceDay} />}{screen === 'waste' && <WasteControl game={game} unlocked={unlocked} onSort={sortWaste} onProcess={processWaste} onWaste={(selectedWaste) => setGame({ ...game, selectedWaste })} onTech={(selectedTech) => setGame({ ...game, selectedTech })} />}{screen === 'tech' && <TechPanel game={game} unlocked={unlocked} onUpgrade={upgrade} onTech={(selectedTech) => setGame({ ...game, selectedTech })} />}{screen === 'habitat' && <Habitat game={game} onRepair={repair} onAdvance={advanceDay} />}{screen === 'missions' && <MissionPanel game={game} missions={starterMissions} />}</main></div>{(game.gameOver || game.complete) && <div className="mission-overlay"><Trophy size={34} /><h2>{game.complete ? 'MISSION COMPLETE' : 'MISSION FAILED'}</h2><p>{game.complete ? 'Mars Habitat Master protocol achieved.' : 'A critical habitat resource reached zero.'}</p><strong>Score {game.score} // Day {game.day}</strong><button className="game-primary" onClick={reset}>Retry Mission</button></div>}</section>
}

function CommandCenter({ game, activeMission, onNavigate, onProcess, onAdvance }) { return <><div className="panel-heading"><div><div className="game-kicker">LIVE OPERATIONS</div><h3>Keep the habitat alive.</h3></div><button className="game-primary" onClick={onAdvance}>Advance Sol</button></div><div className="command-grid"><article className="reactor-card"><div className="reactor-ring"><span>{game.processing ? 'PROCESSING' : 'STANDBY'}</span><strong>{game.progress || 0}%</strong></div><div><p>Selected stream: <b>{game.selectedWaste.toUpperCase()}</b></p><button className="game-secondary" onClick={() => onNavigate('waste')}><Beaker size={15} /> Open Waste Control</button></div></article><article className="mission-card"><div className="game-kicker">ACTIVE OBJECTIVE</div><h4>{activeMission.title}</h4><p>{activeMission.detail}</p><div className="mission-progress"><span style={{ width: `${Math.min(100, (game[activeMission.key] / activeMission.target) * 100)}%` }} /></div><small>{game[activeMission.key]} / {activeMission.target} complete</small><button className="game-secondary" onClick={onProcess}><Pickaxe size={15} /> Process Batch</button></article></div><div className="quick-grid"><button onClick={() => onNavigate('waste')}><Beaker /> Sort and process waste</button><button onClick={() => onNavigate('habitat')}><Wind /> Stabilize habitat</button><button onClick={() => onNavigate('tech')}><Zap /> Upgrade systems</button></div></> }

function WasteControl({ game, unlocked, onSort, onProcess, onWaste, onTech }) { const streams = [['urine', 'Urine', game.urine], ['solidWaste', 'Solid Waste', game.solidWaste], ['foodWaste', 'Food Waste', game.foodWaste], ['dryWaste', 'Dry Waste', game.dryWaste]]; return <><div className="panel-heading"><div><div className="game-kicker">WASTE CONTROL</div><h3>Separate. Decide. Recover.</h3></div><span className="status-pill">{game.sorted ? 'BATCH SORTED' : 'SEPARATION REQUIRED'}</span></div><div className="stream-grid">{streams.map(([id, label, amount]) => <button key={id} className={game.selectedWaste === id ? 'selected' : ''} onClick={() => onWaste(id)}><span>{label}</span><strong>{amount} kg</strong><small>capacity 40 kg</small></button>)}</div><div className="control-card"><div className="field-row"><label>Technology<select value={game.selectedTech} onChange={(e) => onTech(e.target.value)}>{technologies.map((tech) => <option key={tech.id} value={tech.id} disabled={!unlocked.some((item) => item.id === tech.id)}>{unlocked.some((item) => item.id === tech.id) ? tech.name : `${tech.name} — locked day ${tech.unlockDay}`}</option>)}</select></label><label>Batch status<div className="fake-input">{game.selectedWaste.toUpperCase()} / 2 kg</div></label></div><div className="action-row"><button className="game-secondary" onClick={() => onSort(true)}>Confirm Separation</button><button className="game-primary" onClick={onProcess}>Start Processing</button></div></div></> }

function TechPanel({ game, unlocked, onUpgrade, onTech }) { return <><div className="panel-heading"><div><div className="game-kicker">TECHNOLOGY TREE</div><h3>Unlock the closed loop.</h3></div><span className="status-pill">{unlocked.length} / {technologies.length} ONLINE</span></div><div className="tech-list">{technologies.map((tech) => { const open = unlocked.some((item) => item.id === tech.id); return <button key={tech.id} className={game.selectedTech === tech.id ? 'selected' : ''} onClick={() => open && onTech(tech.id)}><span>{open ? <Zap size={15} /> : <LockKeyhole size={15} />}</span><div><b>{tech.name}</b><small>{open ? `${tech.input} to ${tech.output}` : `Unlocks on day ${tech.unlockDay}`}</small></div><strong>LVL {game.techLevels[tech.id] || 1}</strong></button> })}</div><button className="game-primary" onClick={onUpgrade}><Sparkles size={15} /> Upgrade selected system — 120 credits</button></> }

function Habitat({ game, onRepair, onAdvance }) { const rooms = ['Crew Quarters', 'Waste Center', 'MFC Reactor', 'Water Recovery', 'Oxygen System', 'Food Grow Room', 'Energy Storage', 'Control Room']; return <><div className="panel-heading"><div><div className="game-kicker">HABITAT STATUS</div><h3>Every room is a life-support system.</h3></div><button className="game-primary" onClick={onAdvance}>Run habitat cycle</button></div><div className="habitat-grid">{rooms.map((room, index) => <div className={`habitat-room ${game.event && index === 2 ? 'warning' : ''}`} key={room}><span>{String(index + 1).padStart(2, '0')}</span><b>{room}</b><small>{game.event && index === 2 ? 'WARNING' : 'NOMINAL'}</small></div>)}</div>{game.event && <div className="failure-card"><div><div className="game-kicker">SYSTEM FAILURE</div><h4>{game.event}</h4><p>Safety margin reduced. Isolate the affected system or spend credits to repair.</p></div><button className="game-primary" onClick={onRepair}><Wrench size={15} /> Repair for 75 credits</button></div>}</> }

function MissionPanel({ game, missions }) { return <><div className="panel-heading"><div><div className="game-kicker">MISSION LOG</div><h3>Build a 30-day survival run.</h3></div><Trophy /></div><div className="mission-list">{missions.map((mission) => { const current = game[mission.key]; const done = current >= mission.target; return <div className={done ? 'done' : ''} key={mission.id}><span>{done ? 'COMPLETE' : 'ACTIVE'}</span><div><b>{mission.title}</b><p>{mission.detail}</p></div><strong>{current} / {mission.target}</strong><small>+{mission.reward} credits</small></div> })}</div></> }
