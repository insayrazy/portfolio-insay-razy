import { useEffect, useRef } from 'react'
import useFinePointer from '@/hooks/useFinePointer'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * 3D tilt that follows the pointer. Writes CSS variables so styling stays in CSS:
 *  --glare-x / --glare-y : pointer position for the glare highlight
 */
export default function useTilt({ max = 10, scale = 1.02 } = {}) {
  const ref = useRef(null)
  const finePointer = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !finePointer || reducedMotion) return undefined

    let frame = 0

    const handleMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        const rotateY = (px - 0.5) * max * 2
        const rotateX = (0.5 - py) * max * 2
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
        element.style.setProperty('--glare-x', `${px * 100}%`)
        element.style.setProperty('--glare-y', `${py * 100}%`)
      })
    }

    const handleEnter = () => {
      element.style.transition = 'transform 0.15s ease-out'
    }

    const handleLeave = () => {
      cancelAnimationFrame(frame)
      element.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    element.addEventListener('mouseenter', handleEnter)
    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('mouseenter', handleEnter)
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
    }
  }, [max, scale, finePointer, reducedMotion])

  return ref
}
