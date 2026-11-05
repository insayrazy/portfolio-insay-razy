import { useEffect, useRef } from 'react'
import FloatingShapes from '@/components/background/FloatingShapes'
import ParticleField from '@/components/background/ParticleField'
import useFinePointer from '@/hooks/useFinePointer'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * Living background: mesh gradient + aurora blobs + light beams + grid +
 * floating glass shapes + soft particles + film noise.
 * The pointer position is exposed as --mx / --my (-1..1) for parallax layers.
 */
export default function AuroraBackground() {
  const rootRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const finePointer = useFinePointer()

  useEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion || !finePointer) return undefined

    let frame = 0
    const handleMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', ((event.clientX / window.innerWidth) * 2 - 1).toFixed(3))
        root.style.setProperty('--my', ((event.clientY / window.innerHeight) * 2 - 1).toFixed(3))
      })
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
    }
  }, [reducedMotion, finePointer])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night"
      style={{ '--mx': 0, '--my': 0 }}
    >
      {/* Mesh gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 10%, rgba(59,130,246,0.16), transparent 60%), radial-gradient(50% 45% at 85% 20%, rgba(168,85,247,0.14), transparent 60%), radial-gradient(60% 50% at 50% 100%, rgba(6,182,212,0.10), transparent 60%), linear-gradient(180deg, rgb(var(--c-night)) 0%, rgb(var(--c-night-800)) 50%, rgb(var(--c-night)) 100%)',
        }}
      />

      {/* Aurora blobs */}
      <div
        className="absolute inset-0 transition-transform duration-[1.5s] ease-out"
        style={{ transform: 'translate3d(calc(var(--mx) * -30px), calc(var(--my) * -30px), 0)' }}
      >
        <div className="absolute -left-[10%] -top-[15%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.35),transparent_65%)] blur-3xl" />
        <div className="absolute -right-[15%] top-[10%] h-[50vmax] w-[50vmax] animate-aurora-slow rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.28),transparent_65%)] blur-3xl" />
        <div className="absolute -bottom-[25%] left-[20%] h-[55vmax] w-[55vmax] animate-aurora rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22),transparent_65%)] blur-3xl [animation-delay:-8s]" />
        <div className="absolute right-[25%] top-[45%] h-[30vmax] w-[30vmax] animate-aurora-slow rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_65%)] blur-3xl [animation-delay:-14s]" />
      </div>

      {/* Light beams */}
      <div className="absolute -top-1/4 left-[18%] h-[150%] w-[120px] animate-beam bg-gradient-to-b from-transparent via-indigo-400/20 to-transparent blur-2xl [--beam-rotate:22deg]" />
      <div className="absolute -top-1/4 left-[55%] h-[150%] w-[80px] animate-beam bg-gradient-to-b from-transparent via-cyan-300/15 to-transparent blur-2xl [--beam-rotate:-18deg] [animation-delay:-3s]" />
      <div className="absolute -top-1/4 right-[8%] h-[150%] w-[140px] animate-beam bg-gradient-to-b from-transparent via-purple-400/15 to-transparent blur-3xl [--beam-rotate:14deg] [animation-delay:-6s]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid-lines bg-[size:72px_72px] mask-radial opacity-70" />

      <FloatingShapes />

      {!reducedMotion ? <ParticleField /> : null}

      {/* Noise + vignette */}
      <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgb(var(--c-night-950) / 0.85) 100%)' }}
      />
    </div>
  )
}
