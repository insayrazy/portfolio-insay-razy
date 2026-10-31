import { useEffect, useRef } from 'react'

const COLORS = ['165, 180, 252', '34, 211, 238', '192, 132, 252', '255, 255, 255']

/** Lightweight 2D-canvas particle field (soft, slowly rising, twinkling). */
export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let frame = 0
    let particles = []

    const createParticle = (randomY = true) => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : height + 10,
      radius: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      drift: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = width < 768 ? 35 : 80
      particles = Array.from({ length: count }, () => createParticle(true))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      particles.forEach((particle, index) => {
        particle.y -= particle.speed
        particle.x += particle.drift
        particle.twinkle += 0.02
        if (particle.y < -10 || particle.x < -10 || particle.x > width + 10) {
          particles[index] = createParticle(false)
          return
        }
        const alpha = particle.alpha * (0.6 + Math.sin(particle.twinkle) * 0.4)
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(${particle.color}, ${alpha})`
        context.shadowBlur = 8
        context.shadowColor = `rgba(${particle.color}, ${alpha})`
        context.fill()
      })
      frame = requestAnimationFrame(draw)
    }

    const handleVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-80" />
}
