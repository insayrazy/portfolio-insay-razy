import { useId, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'

/** Animated circular progress ring with a gradient stroke. */
export default function CircularProgress({
  value,
  size = 120,
  stroke = 8,
  color = '#6366F1',
  label,
  delay = 0,
  children,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const gradientId = `ring-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const radius = (size - stroke) / 2
  const center = size / 2

  return (
    <div
      ref={ref}
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="55%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? value / 100 : 0 }}
          transition={{ duration: 1.8, delay, ease: EASE_OUT_EXPO }}
          style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
