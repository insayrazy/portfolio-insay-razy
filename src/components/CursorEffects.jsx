import { useEffect, useRef } from 'react'
import useFinePointer from '@/hooks/useFinePointer'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { lerp } from '@/utils/helpers'

const TRAIL_LENGTH = 14
const TRAIL_COLORS = ['#22D3EE', '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7']

/** Cursor glow + trail. Rendered only for fine pointers without reduced motion. */
export default function CursorEffects() {
  const finePointer = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()
  if (!finePointer || reducedMotion) return null
  return <CursorLayer />
}

function CursorLayer() {
  const rootRef = useRef(null)
  const glowRef = useRef(null)
  const dotsRef = useRef([])

  useEffect(() => {
    const root = rootRef.current
    const glow = glowRef.current
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const glowPos = { ...mouse }
    const points = Array.from({ length: TRAIL_LENGTH }, () => ({ ...mouse }))
    let frame = 0
    let visible = false

    const handleMove = (event) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
      if (!visible) {
        visible = true
        root.style.opacity = '1'
      }
    }

    const handleLeave = () => {
      visible = false
      root.style.opacity = '0'
    }

    const loop = () => {
      glowPos.x = lerp(glowPos.x, mouse.x, 0.08)
      glowPos.y = lerp(glowPos.y, mouse.y, 0.08)
      glow.style.transform = `translate3d(${glowPos.x - 300}px, ${glowPos.y - 300}px, 0)`

      let leaderX = mouse.x
      let leaderY = mouse.y
      points.forEach((point, index) => {
        point.x = lerp(point.x, leaderX, 0.42)
        point.y = lerp(point.y, leaderY, 0.42)
        const dot = dotsRef.current[index]
        if (dot) {
          const scale = 1 - index / TRAIL_LENGTH
          dot.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${scale})`
        }
        leaderX = point.x
        leaderY = point.y
      })

      frame = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-0 transition-opacity duration-500"
    >
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[600px] w-[600px] rounded-full mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(34,211,238,0.06) 35%, transparent 65%)',
        }}
      />
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <span
          key={index}
          ref={(element) => {
            dotsRef.current[index] = element
          }}
          className="absolute left-0 top-0 h-2 w-2 rounded-full"
          style={{
            background: TRAIL_COLORS[index % TRAIL_COLORS.length],
            opacity: 0.7 * (1 - index / TRAIL_LENGTH),
            boxShadow: `0 0 10px ${TRAIL_COLORS[index % TRAIL_COLORS.length]}`,
          }}
        />
      ))}
    </div>
  )
}
