import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/animations/gsap'
import { loaderCharsIn } from '@/animations/textAnimations'
import { LOGO_HEX_PATH, LOGO_MARK_PATH } from '@/components/Logo'
import useI18n from '@/hooks/useI18n'
import useLoader from '@/hooks/useLoader'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { site } from '@/data/site'

const PANELS = 5

/**
 * Intro loading screen: logo stroke draw, brand letters, progress counter,
 * then staggered panels lift away to reveal the site.
 */
export default function Loader() {
  const { completeLoading } = useLoader()
  const { t, tr } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef(null)
  const percentRef = useRef(null)
  const [visible, setVisible] = useState(true)

  useGSAP(
    () => {
      const counter = { value: 0 }
      const timeline = gsap.timeline({ onComplete: () => setVisible(false) })

      timeline
        .fromTo(
          '.loader-hex',
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
          0,
        )
        .fromTo('.loader-e', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.5)
        .add(loaderCharsIn('.loader-char'), 0.25)
        .from('.loader-meta', { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.4)
        .to(
          counter,
          {
            value: 100,
            duration: 1.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (percentRef.current) percentRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
            },
          },
          0,
        )
        .fromTo('.loader-bar', { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
        .to('.loader-content', { yPercent: -30, opacity: 0, duration: 0.6, ease: 'power3.in' }, '+=0.15')
        .add(() => completeLoading(), '-=0.05')
        .to('.loader-panel', { yPercent: -100, duration: 1, ease: 'expo.inOut', stagger: 0.07 }, '-=0.15')

      if (reducedMotion) timeline.timeScale(4)
    },
    { scope: rootRef },
  )

  if (!visible) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]" role="status" aria-live="polite" aria-label={t('a11y.loadingPortfolio')}>
      <div className="absolute inset-0 flex">
        {Array.from({ length: PANELS }, (_, index) => (
          <div key={index} className="loader-panel relative h-full flex-1 bg-night-950">
            <div className="absolute inset-y-0 right-0 w-px bg-white/[0.03]" />
          </div>
        ))}
      </div>

      <div className="loader-content relative flex h-full flex-col items-center justify-center gap-8 px-6">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[100px]" />

        <svg viewBox="0 0 64 64" className="relative h-20 w-20" aria-hidden="true">
          <defs>
            <linearGradient id="loader-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#22D3EE" />
              <stop offset="0.5" stopColor="#6366F1" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
          <path
            className="loader-hex"
            d={LOGO_HEX_PATH}
            fill="none"
            stroke="url(#loader-gradient)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
          />
          <path
            className="loader-e"
            d={LOGO_MARK_PATH}
            fill="none"
            stroke="#fff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            strokeDasharray="1"
          />
        </svg>

        <div className="relative flex overflow-hidden font-display text-4xl font-bold tracking-[0.18em] text-white sm:text-6xl" aria-hidden="true">
          {site.brand.split('').map((char, index) => (
            <span key={index} className="loader-char inline-block">
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </div>

        <div className="relative w-64 sm:w-80">
          <div className="loader-meta mb-3 flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-slate-400">
            <span>{t('loader.loading')}</span>
            <span className="text-white">
              <span ref={percentRef}>000</span>%
            </span>
          </div>
          <div className="loader-meta h-px w-full overflow-hidden bg-white/10">
            <div className="loader-bar h-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
          </div>
          <p className="loader-meta mt-3 text-center text-[11px] uppercase tracking-[0.3em] text-slate-500">
            {tr(site.role)}
          </p>
        </div>
      </div>
    </div>
  )
}
