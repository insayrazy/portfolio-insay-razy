import useMagnetic from '@/hooks/useMagnetic'
import { cn } from '@/utils/cn'

/** Wrap any element to give it a magnetic hover pull. */
export default function Magnetic({ children, strength = 0.35, className }) {
  const ref = useMagnetic(strength)
  return (
    <div ref={ref} className={cn('inline-block will-change-transform', className)}>
      {children}
    </div>
  )
}
