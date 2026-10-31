import useTilt from '@/hooks/useTilt'
import { cn } from '@/utils/cn'

/** 3D pointer tilt with a soft moving glare. */
export default function TiltCard({ children, className, max = 8, scale = 1.02, glare = true, ...props }) {
  const ref = useTilt({ max, scale })

  return (
    <div ref={ref} className={cn('group relative will-change-transform preserve-3d', className)} {...props}>
      {children}
      {glare ? (
        <div
          aria-hidden="true"
          className="tilt-glare pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      ) : null}
    </div>
  )
}
