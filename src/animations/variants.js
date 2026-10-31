import { EASE_OUT_EXPO, EASE_OUT_QUART } from '@/animations/easings'

const base = (delay = 0, duration = 0.9) => ({ duration, delay, ease: EASE_OUT_EXPO })

/**
 * Reveal variants used by <Reveal variant="..." />.
 * Each variant has a `hidden` and `visible` state; `visible` accepts a delay via `custom`.
 */
export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 48 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: base(delay) }),
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40 },
    visible: (delay = 0) => ({ opacity: 1, y: 0, transition: base(delay) }),
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -64 },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: base(delay, 1) }),
  },
  fadeRight: {
    hidden: { opacity: 0, x: 64 },
    visible: (delay = 0) => ({ opacity: 1, x: 0, transition: base(delay, 1) }),
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.82 },
    visible: (delay = 0) => ({ opacity: 1, scale: 1, transition: base(delay, 1) }),
  },
  rotateIn: {
    hidden: { opacity: 0, rotateX: -35, rotateZ: -4, y: 60, transformPerspective: 1000 },
    visible: (delay = 0) => ({
      opacity: 1,
      rotateX: 0,
      rotateZ: 0,
      y: 0,
      transformPerspective: 1000,
      transition: base(delay, 1.1),
    }),
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(16px)', y: 20 },
    visible: (delay = 0) => ({ opacity: 1, filter: 'blur(0px)', y: 0, transition: base(delay, 1.1) }),
  },
  maskUp: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 24 },
    visible: (delay = 0) => ({
      clipPath: 'inset(0% 0% 0% 0%)',
      y: 0,
      transition: { duration: 1.1, delay, ease: EASE_OUT_QUART },
    }),
  },
  maskLeft: {
    hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
    visible: (delay = 0) => ({
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 1.2, delay, ease: EASE_OUT_QUART },
    }),
  },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export const staggerItemZoom = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
}

export const staggerItemRotate = {
  hidden: { opacity: 0, rotate: -12, scale: 0.7 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
}

/** Word / character mask reveal used by <SplitText />. */
export const splitParent = (stagger = 0.04, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const splitChild = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  visible: {
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.95, ease: EASE_OUT_EXPO },
  },
}

export const defaultViewport = { once: true, amount: 0.25 }
