import { gsap, ScrollTrigger } from '@/animations/gsap'

/**
 * Scroll-scrubbed word highlight: words go from dim to bright as the
 * paragraph travels through the viewport.
 */
export function scrubWordHighlight(words, trigger) {
  return gsap.fromTo(
    words,
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.08,
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'bottom 45%',
        scrub: 0.8,
      },
    },
  )
}

/**
 * Horizontal pinned scroll — translates `track` while `section` is pinned.
 * Returns the tween so callers can clean it up (useGSAP does it automatically).
 */
export function horizontalPinScroll(section, track) {
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)
  return gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
}

/** Parallax a set of elements by a fraction of the scroll distance. */
export function parallax(targets, trigger, yPercent = -20) {
  return gsap.to(targets, {
    yPercent,
    ease: 'none',
    scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
  })
}

/** Refresh every ScrollTrigger (after fonts / images / route changes). */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh()
}
