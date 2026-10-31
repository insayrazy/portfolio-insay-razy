import { gsap } from '@/animations/gsap'

/** 3D character rise used by the hero title. */
export function heroCharsIn(chars, options = {}) {
  return gsap.fromTo(
    chars,
    { yPercent: 120, rotateX: -90, opacity: 0, transformOrigin: '50% 100%' },
    {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.07,
      ...options,
    },
  )
}

/** Loader brand letters sliding up. */
export function loaderCharsIn(chars, options = {}) {
  return gsap.from(chars, {
    yPercent: 110,
    opacity: 0,
    duration: 0.8,
    stagger: 0.06,
    ease: 'expo.out',
    ...options,
  })
}

/** Generic fade-up sequence. */
export function fadeUpSequence(targets, options = {}) {
  return gsap.fromTo(
    targets,
    { y: 30, opacity: 0, filter: 'blur(6px)' },
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'expo.out',
      stagger: 0.08,
      ...options,
    },
  )
}
