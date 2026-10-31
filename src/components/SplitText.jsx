import { motion } from 'framer-motion'
import { splitChild, splitParent } from '@/animations/variants'
import { cn } from '@/utils/cn'
import { splitChars, splitWords } from '@/utils/helpers'

/**
 * Masked word / character reveal.
 * Pass `text` for a single style or `segments` ([{ text, className }]) to mix styles,
 * e.g. a plain title followed by a gradient highlight.
 */
export default function SplitText({
  as = 'span',
  text,
  segments,
  by = 'words',
  className,
  delay = 0,
  stagger = 0.05,
  amount = 0.5,
  animate,
}) {
  const MotionTag = motion[as] ?? motion.span
  const parts = (segments ?? [{ text, className: '' }]).filter((segment) => segment.text)
  const label = parts.map((segment) => segment.text).join(' ')

  const items = parts.flatMap((segment, segmentIndex) => {
    const pieces = by === 'chars' ? splitChars(segment.text) : splitWords(segment.text)
    return pieces.map((piece, pieceIndex) => ({
      key: `${segmentIndex}-${pieceIndex}`,
      text: piece,
      className: segment.className,
    }))
  })

  const trigger = animate
    ? { animate }
    : { whileInView: 'visible', viewport: { once: true, amount } }

  return (
    <MotionTag
      className={className}
      variants={splitParent(stagger, delay)}
      initial="hidden"
      aria-label={label}
      {...trigger}
    >
      {items.map((item) => (
        <span key={item.key} aria-hidden="true">
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span className={cn('inline-block will-change-transform', item.className)} variants={splitChild}>
              {item.text}
            </motion.span>
          </span>
          {by === 'words' ? ' ' : null}
        </span>
      ))}
    </MotionTag>
  )
}
