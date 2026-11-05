import { useId } from 'react'
import { cn } from '@/utils/cn'
import { site } from '@/data/site'

export const LOGO_HEX_PATH = 'M32 5 55.4 18.5v27L32 59 8.6 45.5v-27Z'
export const LOGO_MARK_PATH = 'M26 43V21h8.5a6.5 6.5 0 0 1 0 13H26M34 34l7.5 9'

/** Animated brand mark: hexagon outline draws itself on hover. */
export default function Logo({ className, showText = true }) {
  const gradientId = `logo-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <span className={cn('group/logo inline-flex items-center gap-3', className)}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0 text-white" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22D3EE" />
            <stop offset="0.5" stopColor="#6366F1" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <path
          d={LOGO_HEX_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeLinejoin="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
          className="transition-[stroke-dashoffset] duration-1000 ease-out-expo group-hover/logo:[stroke-dashoffset:2]"
        />
        <path
          d={LOGO_MARK_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="origin-center transition-transform duration-500 ease-out-expo group-hover/logo:scale-110"
        />
      </svg>
      {showText ? (
        <span className="whitespace-nowrap font-display text-base font-semibold tracking-[0.16em] text-white sm:text-lg">
          {site.brand}
          <span className="text-cyan-300">.</span>
        </span>
      ) : null}
    </span>
  )
}
