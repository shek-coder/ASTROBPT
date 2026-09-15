import { useState } from 'react'
import Starfield from './components/Starfield.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WasteFlow from './components/WasteFlow.jsx'
import WasteStreams from './components/WasteStreams.jsx'
import TechnologyCards from './components/TechnologyCards.jsx'
import EnergySection from './components/EnergySection.jsx'
import Challenges from './components/Challenges.jsx'
import SafetyDashboard from './components/SafetyDashboard.jsx'
import Roadmap from './components/Roadmap.jsx'
import MarsHabitat from './components/MarsHabitat.jsx'
import Simulation from './components/Simulation.jsx'
import Footer from './components/Footer.jsx'
import GameMode from './components/GameMode.jsx'

export default function App() {
  const [mode, setMode] = useState('game')
  if (mode === 'game') return <><Starfield /><GameMode onScienceMode={() => setMode('science')} /></>
  return <><Starfield /><Navbar /><main><Hero /><WasteFlow /><WasteStreams /><TechnologyCards /><EnergySection /><Challenges /><SafetyDashboard /><Roadmap /><MarsHabitat /><Simulation /></main><Footer /><button className="mode-switch" onClick={() => setMode('game')}>Game Mode</button></>
}
