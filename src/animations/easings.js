// Cubic-bezier curves shared by Framer Motion and CSS.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT_EXPO = [0.87, 0, 0.13, 1]
export const EASE_OUT_QUART = [0.25, 1, 0.5, 1]
export const EASE_IN_OUT_CIRC = [0.85, 0, 0.15, 1]

// GSAP equivalents.
export const GSAP_EASE = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
  elastic: 'elastic.out(1, 0.35)',
}

export const SPRING_SOFT = { type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }
export const SPRING_SNAPPY = { type: 'spring', stiffness: 380, damping: 30 }
