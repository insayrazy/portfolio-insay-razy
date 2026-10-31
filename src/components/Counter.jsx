import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { formatNumber } from '@/utils/helpers'

/** Animated number that counts up once it scrolls into view. */
export default function Counter({ value, prefix = '', suffix = '', duration = 2.2, delay = 0, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !inView) return undefined

    const render = (current) => {
      element.textContent = `${prefix}${formatNumber(current)}${suffix}`
    }

    if (reducedMotion) {
      render(value)
      return undefined
    }

    const controls = animate(0, value, { duration, delay, ease: EASE_OUT_EXPO, onUpdate: render })
    return () => controls.stop()
  }, [inView, value, prefix, suffix, duration, delay, reducedMotion])

  return (
    <span className={className}>
      <span className="sr-only">{`${prefix}${formatNumber(value)}${suffix}`}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {`${prefix}0${suffix}`}
      </span>
    </span>
  )
}
