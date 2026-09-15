import { useState, useEffect } from 'react'
import Starfield from './components/Starfield.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import QuestControl from './components/QuestControl.jsx'
import MissionDashboard from './components/MissionDashboard.jsx'
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
import RewardToast from './components/RewardToast.jsx'

const INITIAL_STATE = {
  xp: 0,
  level: 1,
  streak: 0,
  completedMissions: [],
  claimedRewards: [],
  unlockedBadges: [],
  lastActivityTime: null
}

const MISSIONS = [
  { id: 'scan-dashboard', name: 'Scan Mission Control', xp: 100, section: 'mission-control' },
  { id: 'explore-system', name: 'Explore the System', xp: 150, section: 'system' },
  { id: 'inspect-tech', name: 'Inspect a Technology', xp: 120, section: 'technologies' },
  { id: 'review-safety', name: 'Review Safety Risks', xp: 140, section: 'challenges' },
  { id: 'run-simulation', name: 'Complete Simulation', xp: 200, section: 'simulation' },
  { id: 'study-roadmap', name: 'Study Development Path', xp: 130, section: 'roadmap' }
]

const BADGES = [
  { id: 'pioneer', name: 'Pioneer', requirement: 5, xp: 250 },
  { id: 'explorer', name: 'Explorer', requirement: 250, xp: 500 },
  { id: 'engineer', name: 'Chief Engineer', requirement: 500, xp: 750 },
  { id: 'commander', name: 'Mission Commander', requirement: 1000, xp: 1000 }
]

export default function App() {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('astro-game-state')
    if (!saved) return INITIAL_STATE
    try { return { ...INITIAL_STATE, ...JSON.parse(saved) } } catch { return INITIAL_STATE }
  })
  const [toast, setToast] = useState(null)

  useEffect(() => {
    localStorage.setItem('astro-game-state', JSON.stringify(gameState))
  }, [gameState])

  const awardXP = (missionId, amount) => {
    if (gameState.completedMissions.includes(missionId)) return
    
    setGameState(prev => {
      const newXp = prev.xp + amount
      const newLevel = Math.floor(newXp / 300) + 1
      const newCompleted = [...prev.completedMissions, missionId]
      
      // Check for new badges
      const newBadges = [...prev.unlockedBadges]
      BADGES.forEach(badge => {
        if (!newBadges.includes(badge.id) && newCompleted.length >= badge.requirement) {
          newBadges.push(badge.id)
        }
      })

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedMissions: newCompleted,
        unlockedBadges: newBadges,
        lastActivityTime: Date.now()
      }
    })

    setToast({ type: 'xp', amount, missionId })
    setTimeout(() => setToast(null), 2000)
  }

  const claimReward = (missionId) => {
    const mission = MISSIONS.find(m => m.id === missionId)
    if (!mission || gameState.completedMissions.includes(missionId)) return
    awardXP(missionId, mission.xp)
  }

  const completeMission = (missionId) => {
    const mission = MISSIONS.find(m => m.id === missionId)
    if (!mission || gameState.completedMissions.includes(missionId)) return
    claimReward(missionId)
  }

  return (
    <>
      <Starfield />
      <Navbar gameState={gameState} />
      <main>
        <Hero gameState={gameState} />
        <QuestControl 
          gameState={gameState} 
          missions={MISSIONS}
          badges={BADGES}
          onClaimReward={claimReward}
          completedMissions={gameState.completedMissions}
        />
        <MissionDashboard onInteract={() => completeMission('scan-dashboard')} />
        <WasteFlow />
        <WasteStreams />
        <TechnologyCards onTechInspect={() => completeMission('inspect-tech')} />
        <EnergySection />
        <Challenges onChallengeView={() => completeMission('review-safety')} />
        <SafetyDashboard />
        <Roadmap onRoadmapView={() => completeMission('study-roadmap')} />
        <MarsHabitat />
        <Simulation onSimulationComplete={() => completeMission('run-simulation')} />
      </main>
      <Footer />
      {toast && <RewardToast toast={toast} />}
    </>
  )
}
