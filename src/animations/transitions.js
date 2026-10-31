import { EASE_IN_OUT_EXPO, EASE_OUT_EXPO } from '@/animations/easings'

/**
 * Page transition: the page fades while two curtains sweep across the screen.
 * Only opacity is animated on the page wrapper so GSAP pinning (position: fixed)
 * is never trapped inside a transformed / filtered ancestor.
 */
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, delay: 0.35, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, transition: { duration: 0.35, ease: EASE_OUT_EXPO } },
}

// Curtain that reveals the new page (covers on mount, then slides away upward).
export const curtainOut = {
  initial: { scaleY: 1 },
  animate: { scaleY: 0, transition: { duration: 0.9, delay: 0.15, ease: EASE_IN_OUT_EXPO } },
  exit: { scaleY: 0 },
}

// Curtain that hides the old page (grows from the bottom on exit).
export const curtainIn = {
  initial: { scaleY: 0 },
  animate: { scaleY: 0 },
  exit: { scaleY: 1, transition: { duration: 0.7, ease: EASE_IN_OUT_EXPO } },
}

export const mobileMenuVariants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)',
    transition: { duration: 0.6, ease: EASE_IN_OUT_EXPO },
  },
  open: {
    clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)',
    transition: { duration: 0.8, ease: EASE_IN_OUT_EXPO },
  },
}

export const mobileMenuItem = {
  closed: { opacity: 0, y: 40 },
  open: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + index * 0.06, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
}

export const carouselVariants = {
  enter: (direction) => ({ x: direction > 0 ? 120 : -120, opacity: 0, scale: 0.94, rotateY: direction > 0 ? -12 : 12 }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.94,
    rotateY: direction > 0 ? 12 : -12,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  }),
}
