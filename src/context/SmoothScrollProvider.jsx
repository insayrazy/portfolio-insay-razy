import { useCallback, useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { SmoothScrollContext } from '@/context/contexts'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import useLoader from '@/hooks/useLoader'
import { NAV_OFFSET } from '@/utils/constants'

export default function SmoothScrollProvider({ children }) {
  const [lenis, setLenis] = useState(null)
  const reducedMotion = usePrefersReducedMotion()
  const { isLoaded } = useLoader()

  useEffect(() => {
    if (reducedMotion) return undefined

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    // Keep GSAP ScrollTrigger in sync with Lenis' virtual scroll.
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reducedMotion])

  // Pause smooth scroll while the loader is visible.
  useEffect(() => {
    if (!lenis) return
    if (isLoaded) lenis.start()
    else lenis.stop()
  }, [lenis, isLoaded])

  const scrollTo = useCallback(
    (target, options = {}) => {
      const element =
        typeof target === 'string' && target !== 'top'
          ? document.querySelector(target.startsWith('#') ? target : `#${target}`)
          : null

      if (lenis) {
        // Pinned sections change the document height; make sure Lenis' limits are fresh.
        lenis.resize()
        if (target === 'top' || target === 0) lenis.scrollTo(0, { duration: 1.6, ...options })
        else if (element) lenis.scrollTo(element, { offset: NAV_OFFSET, duration: 1.4, ...options })
        else if (typeof target === 'number') lenis.scrollTo(target, options)
        return
      }

      const behavior = reducedMotion ? 'auto' : 'smooth'
      if (target === 'top' || target === 0) window.scrollTo({ top: 0, behavior })
      else if (element) element.scrollIntoView({ behavior, block: 'start' })
    },
    [lenis, reducedMotion],
  )

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo])

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}
