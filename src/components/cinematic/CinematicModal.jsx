import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import FlowScene from './FlowScene.jsx'

const AUTO_ADVANCE_MS = 3200

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
}

/**
 * Full-screen cinematic overlay used by every clickable card in the site
 * (technologies, waste streams, waste-flow stages, roadmap stages, safety
 * parameters, challenges, the Mars habitat loop). Content is entirely
 * data-driven via the `scenes` prop so each caller gets a distinct
 * animation without duplicating this engine.
 *
 * scenes: Array<{
 *   key: string,
 *   kind: 'intro' | 'stage' | 'impact',
 *   tag: string,        // short caps label, e.g. 'INPUT'
 *   title: string,
 *   body: string,
 *   icon?: string
 * }>
 */
export default function CinematicModal({
  tag,
  title,
  accent = '#ff8a4c',
  scenes,
  initialSceneIndex = 0,
  onClose,
  // Optional component: (props: { stageIndex, kind, accent }) => JSX.
  // stageIndex is -1 during the intro scene, 0..stages.length-1 during a
  // stage, and stages.length during the impact scene. When provided, the
  // modal expands into a near full-screen cinematic stage and renders this
  // component as the main visual instead of leaning on the icon flow strip.
  visual: Visual
}) {
  const reducedMotion = usePrefersReducedMotion()
  const [sceneIdx, setSceneIdx] = useState(Math.min(initialSceneIndex, scenes.length - 1))
  const [playing, setPlaying] = useState(!reducedMotion)
  const timerRef = useRef(null)
  const modalRef = useRef(null)

  const stages = useMemo(() => scenes.filter((s) => s.kind === 'stage'), [scenes])
  const current = scenes[sceneIdx]
  const activeStageIndex =
    current.kind === 'stage' ? stages.findIndex((s) => s.key === current.key)
    : current.kind === 'impact' ? stages.length
    : -1

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4
      })),
    []
  )
  const dust = useMemo(
    () =>
      Array.from({ length: 5 }, () => ({
        top: 10 + Math.random() * 80,
        left: Math.random() * 100,
        size: 140 + Math.random() * 160,
        delay: Math.random() * 6
      })),
    []
  )

  // Autoplay: advance to the next scene while playing, stop at the end.
  useEffect(() => {
    if (!playing) return undefined
    if (sceneIdx >= scenes.length - 1) {
      setPlaying(false)
      return undefined
    }
    timerRef.current = setTimeout(() => {
      setSceneIdx((i) => Math.min(i + 1, scenes.length - 1))
    }, AUTO_ADVANCE_MS)
    return () => clearTimeout(timerRef.current)
  }, [playing, sceneIdx, scenes.length])

  // ESC to close.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goTo(Math.min(sceneIdx + 1, scenes.length - 1))
      else if (e.key === 'ArrowLeft') goTo(Math.max(sceneIdx - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, scenes.length])

  // Lock background scroll while open, restore on close.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [])

  const goTo = (i) => {
    setPlaying(false)
    setSceneIdx(Math.max(0, Math.min(i, scenes.length - 1)))
  }
  const restart = () => {
    setSceneIdx(0)
    setPlaying(!reducedMotion)
  }

  return (
    <motion.div
      className="cine-backdrop"
      ref={modalRef}
      onClick={(e) => { if (e.target === modalRef.current) onClose() }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="cine-stars" aria-hidden="true">
        {stars.map((s, i) => (
          <span
            key={i}
            className="cine-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`
            }}
          />
        ))}
      </div>
      <div className="cine-dust" aria-hidden="true">
        {dust.map((d, i) => (
          <span
            key={i}
            className="cine-dust-particle"
            style={{
              top: `${d.top}%`,
              left: `${d.left}%`,
              width: d.size,
              height: d.size,
              animationDelay: `${d.delay}s`
            }}
          />
        ))}
      </div>

      <motion.div
        className={`cine-modal ${Visual ? 'cine-modal--wide' : ''}`}
        style={{ '--accent': accent }}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="cine-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="cine-head">
          <div className="cine-tag">{tag}</div>
          <h3 className="cine-title">{title}</h3>
        </div>

        {Visual && (
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              className="cine-visual-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Visual stageIndex={activeStageIndex} kind={current.kind} accent={accent} />
            </motion.div>
          </AnimatePresence>
        )}

        {stages.length > 0 && (
          <FlowScene stages={stages} activeIndex={activeStageIndex} accent={accent} />
        )}

        <div className="cine-scene-label">
          {current.kind === 'intro' ? 'INTRO' : current.kind === 'impact' ? 'IMPACT' : `STAGE ${activeStageIndex + 1} / ${stages.length}`}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            className="cine-scene-text"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="cine-scene-title">{current.title}</div>
            <div className="cine-scene-body">{current.body}</div>
          </motion.div>
        </AnimatePresence>

        <div className="cine-progress">
          {scenes.map((s, i) => (
            <button
              key={s.key}
              className={`cine-dot ${i === sceneIdx ? 'active' : ''} ${i < sceneIdx ? 'past' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </div>

        <div className="cine-controls">
          <button className="cine-btn" onClick={() => goTo(sceneIdx - 1)} disabled={sceneIdx === 0} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button className="cine-btn primary" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button className="cine-btn" onClick={() => goTo(sceneIdx + 1)} disabled={sceneIdx === scenes.length - 1} aria-label="Next">
            <ChevronRight size={18} />
          </button>
          <button className="cine-btn" onClick={restart} aria-label="Restart">
            <RotateCcw size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
