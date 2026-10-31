import { cn } from '@/utils/cn'

/** Infinite horizontal marquee. Content is duplicated once for a seamless loop. */
export default function Marquee({ children, reverse = false, duration = 40, pauseOnHover = true, className }) {
  const trackClass = cn(
    'flex w-max shrink-0 animate-marquee',
    reverse && '[animation-direction:reverse]',
    pauseOnHover && 'group-hover:[animation-play-state:paused]',
  )

  return (
    <div className={cn('group relative flex overflow-hidden mask-fade-x', className)}>
      <div className={trackClass} style={{ '--marquee-duration': `${duration}s` }}>
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
