import { useEffect, useRef } from 'react'

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let stars = []
    let raf

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = document.body.scrollHeight
      const count = Math.floor((canvas.width * canvas.height) / 9000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        tw: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005
      }))
    }

    function draw(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#04060c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const alpha = 0.35 + 0.65 * Math.abs(Math.sin(s.tw + t * s.speed))
        ctx.beginPath()
        ctx.fillStyle = `rgba(210,230,245,${alpha})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(document.body)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  )
}
