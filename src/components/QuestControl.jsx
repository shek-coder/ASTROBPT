import { motion } from 'framer-motion'
import { Award, Check, Lock, Target, Zap } from 'lucide-react'
import { scrollToSection } from './Navbar.jsx'

export default function QuestControl({ gameState, missions, badges, onClaimReward }) {
  const levelXp = gameState.xp % 300
  const progress = (levelXp / 300) * 100
  const nextBadge = badges.find((badge) => !gameState.unlockedBadges.includes(badge.id))

  return (
    <section id="quest-log" className="quest-section">
      <div className="wrap">
        <div className="quest-header">
          <div>
            <div className="sec-tag">MISSION LOG // ACTIVE PROGRESSION</div>
            <h2 className="sec-title">Your Mars assignment</h2>
            <p className="sec-desc">Complete field objectives to earn clearance, unlock badges, and advance the habitat mission.</p>
          </div>
          <div className="rank-card glass">
            <div className="rank-kicker">ASTROCADET RANK</div>
            <div className="rank-value">LVL {gameState.level}</div>
            <div className="xp-track"><span style={{ width: `${progress}%` }} /></div>
            <div className="rank-meta"><span>{levelXp} / 300 XP</span><span>{gameState.streak} day streak</span></div>
          </div>
        </div>

        <div className="quest-layout">
          <div className="mission-list">
            {missions.map((mission, index) => {
              const complete = gameState.completedMissions.includes(mission.id)
              return (
                <motion.article className={`glass quest-card ${complete ? 'complete' : ''}`} key={mission.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                  <div className="quest-icon"><Target size={18} /></div>
                  <div className="quest-copy">
                    <div className="quest-label">OBJECTIVE {String(index + 1).padStart(2, '0')}</div>
                    <h3>{mission.name}</h3>
                    <button className="quest-link" onClick={() => scrollToSection(mission.section)}>OPEN SECTOR <span aria-hidden="true">→</span></button>
                  </div>
                  <button className="reward-button" onClick={() => onClaimReward(mission.id)} disabled={complete} aria-label={complete ? `${mission.name} completed` : `Claim ${mission.xp} XP for ${mission.name}`}>
                    {complete ? <Check size={16} /> : <Zap size={16} />}
                    <span>{complete ? 'CLAIMED' : `+${mission.xp} XP`}</span>
                  </button>
                </motion.article>
              )
            })}
          </div>

          <aside className="badge-panel glass">
            <div className="panel-kicker"><Award size={16} /> ACHIEVEMENTS</div>
            <div className="badge-grid">
              {badges.map((badge) => {
                const unlocked = gameState.unlockedBadges.includes(badge.id)
                return <div className={`badge ${unlocked ? 'unlocked' : ''}`} key={badge.id}><div className="badge-mark">{unlocked ? <Award size={19} /> : <Lock size={16} />}</div><span>{badge.name}</span></div>
              })}
            </div>
            {nextBadge && <div className="next-unlock"><div className="quest-label">NEXT UNLOCK</div><strong>{nextBadge.name}</strong><span>{Math.max(0, nextBadge.requirement - gameState.completedMissions.length)} objectives remaining</span></div>}
          </aside>
        </div>
      </div>
    </section>
  )
}
