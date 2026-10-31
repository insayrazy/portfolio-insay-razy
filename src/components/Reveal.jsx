import { motion } from 'framer-motion'
import { defaultViewport, revealVariants } from '@/animations/variants'

/**
 * Scroll reveal wrapper.
 * variant: fadeUp | fadeDown | fadeLeft | fadeRight | zoomIn | rotateIn | blurIn | maskUp | maskLeft
 */
export default function Reveal({
  as = 'div',
  variant = 'fadeUp',
  delay = 0,
  amount = defaultViewport.amount,
  once = true,
  className,
  children,
  ...props
}) {
  const MotionComponent = motion[as] ?? motion.div

  return (
    <MotionComponent
      className={className}
      variants={revealVariants[variant] ?? revealVariants.fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      custom={delay}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
