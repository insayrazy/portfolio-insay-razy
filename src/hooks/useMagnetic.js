import { useEffect, useRef } from 'react'
import { gsap } from '@/animations/gsap'
import useFinePointer from '@/hooks/useFinePointer'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'

/**
 * Magnetic hover: the element is pulled towards the cursor and springs back on leave.
 * Returns a ref to attach to the element.
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const finePointer = useFinePointer()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !finePointer || reducedMotion) return undefined

    const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'power3.out' })

    const handleMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      xTo(x * strength)
      yTo(y * strength)
    }

    const handleLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' })
    }

    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mouseleave', handleLeave)
    return () => {
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mouseleave', handleLeave)
      gsap.killTweensOf(element)
      gsap.set(element, { x: 0, y: 0 })
    }
  }, [strength, finePointer, reducedMotion])

  return ref
}
