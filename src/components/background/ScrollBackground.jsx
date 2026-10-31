import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useLoader from '@/hooks/useLoader'
import useMediaQuery from '@/hooks/useMediaQuery'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/utils/cn'
import { BREAKPOINTS } from '@/utils/constants'

const BackgroundScene = lazy(() => import('@/components/three/BackgroundScene'))

/** True once the hero has mostly scrolled away (or when the page has no hero). */
function usePastHero() {
  const { pathname } = useLocation()
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const hero = document.getElementById('home')
      setPastHero(hero ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.55 : true)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    // Routes mount after the page transition, so check again once it settles.
    const settle = setTimeout(update, 1200)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  return pastHero
}

/**
 * Full-screen 3D background that fades in from the About section onward.
 * Desktop only; phones and reduced-motion users keep the lighter aurora layer.
 */
export default function ScrollBackground() {
  const { isLoaded } = useLoader()
  const isDesktop = useMediaQuery(BREAKPOINTS.lg)
  const reducedMotion = usePrefersReducedMotion()
  const pastHero = usePastHero()

  if (!isLoaded || !isDesktop || reducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-[5] transition-opacity duration-[1.2s] ease-out',
        pastHero ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Suspense fallback={null}>
        <BackgroundScene active={pastHero} />
      </Suspense>
    </div>
  )
}
