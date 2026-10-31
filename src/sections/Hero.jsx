import { lazy, Suspense, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, FolderGit2, GraduationCap, Mail } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { SiLaravel, SiNodedotjs, SiReact, SiTailwindcss } from 'react-icons/si'
import { gsap, useGSAP } from '@/animations/gsap'
import { fadeUpSequence, heroCharsIn } from '@/animations/textAnimations'
import Magnetic from '@/components/Magnetic'
import TypingText from '@/components/TypingText'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { site, typingRoles } from '@/data/site'
import useFinePointer from '@/hooks/useFinePointer'
import useI18n from '@/hooks/useI18n'
import useLoader from '@/hooks/useLoader'
import useMediaQuery from '@/hooks/useMediaQuery'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import useScrollToSection from '@/hooks/useScrollToSection'
import { BREAKPOINTS } from '@/utils/constants'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

const orbitIcons = [
  { icon: SiReact, color: '#61DAFB', label: 'React' },
  { icon: SiNodedotjs, color: '#5FA04E', label: 'Node.js' },
  { icon: SiLaravel, color: '#FF2D20', label: 'Laravel' },
  { icon: SiTailwindcss, color: '#38BDF8', label: 'Tailwind CSS' },
]

// Name split into lines for the hero title; character index runs across both lines
// so the gradient flows continuously.
const nameLines = site.brand.split(' ')
const totalChars = nameLines.join('').length

export default function Hero() {
  const scopeRef = useRef(null)
  const visualRef = useRef(null)
  const { isLoaded } = useLoader()
  const { t, tr } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const isDesktop = useMediaQuery(BREAKPOINTS.lg)
  const goToSection = useScrollToSection()

  // Mouse parallax for the profile visual.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18 })
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18 })
  const visualX = useTransform(springX, (value) => value * 24)
  const visualY = useTransform(springY, (value) => value * 24)
  const badgeX = useTransform(springX, (value) => value * -40)
  const badgeY = useTransform(springY, (value) => value * -40)

  const handlePointerMove = (event) => {
    if (!finePointer || reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }

  useGSAP(
    () => {
      if (!isLoaded) {
        gsap.set('.hero-char', { yPercent: 120, rotateX: -90, opacity: 0 })
        gsap.set('.hero-fade', { y: 30, opacity: 0 })
        gsap.set('.hero-visual', { scale: 0.8, opacity: 0 })
        return
      }

      const timeline = gsap.timeline({ delay: 0.1 })
      timeline
        .add(heroCharsIn('.hero-char', { stagger: 0.05 }), 0)
        .add(fadeUpSequence('.hero-fade', { stagger: 0.07 }), 0.3)
        .fromTo('.hero-visual', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' }, 0.15)
    },
    { scope: scopeRef, dependencies: [isLoaded], revertOnUpdate: true },
  )

  const showScene = isLoaded && isDesktop && !reducedMotion
  const role = tr(site.role)
  let charIndex = -1

  return (
    <section
      id="home"
      ref={scopeRef}
      onPointerMove={handlePointerMove}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 lg:pt-28"
    >
      {/* Full-bleed 3D layer so the orb, wireframe and rings are never clipped;
          the orb follows the profile photo's position (visualRef). */}
      {showScene ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene anchorRef={visualRef} />
          </Suspense>
        </div>
      ) : null}

      <div className="container relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 flex flex-col items-start">
          <div className="hero-fade mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] py-1.5 pl-2 pr-4 text-xs font-medium text-emerald-200 backdrop-blur-md sm:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {tr(site.availability)}
          </div>

          <p className="hero-fade mb-3 font-mono text-sm uppercase tracking-[0.35em] text-slate-400">{t('hero.greeting')}</p>

          <h1
            id="hero-title"
            aria-label={`${site.name} — ${role}`}
            className="mb-6 flex flex-col font-display text-[clamp(3.6rem,15vw,8.75rem)] font-bold leading-[0.88] tracking-tight [perspective:800px]"
          >
            {nameLines.map((word) => (
              <span key={word} aria-hidden="true" className="flex">
                {word.split('').map((char) => {
                  charIndex += 1
                  return (
                    <span key={`${word}-${charIndex}`} className="inline-block overflow-hidden pb-[0.06em]">
                      <span
                        className="hero-char text-gradient inline-block will-change-transform"
                        style={{
                          backgroundSize: `${totalChars * 100}% 100%`,
                          backgroundPosition: `${(charIndex / (totalChars - 1)) * 100}% 50%`,
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <p className="hero-fade mb-6 flex min-h-[2.2em] flex-wrap items-center gap-x-2 font-display text-xl font-medium text-white sm:text-2xl lg:text-3xl">
            <span className="text-slate-400">{t('hero.iAm')}</span>
            <TypingText words={tr(typingRoles)} enabled={isLoaded && !reducedMotion} className="text-cyan-200" />
          </p>

          <p className="hero-fade mb-10 max-w-xl text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">
            {tr(site.tagline)}
          </p>

          <div className="hero-fade mb-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <Button size="lg" onClick={() => goToSection('projects')}>
                {t('hero.viewProjects')}
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button asChild size="lg" variant="outline" className="animated-border">
                <a href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="transition-transform duration-300 group-hover/button:translate-y-0.5" />
                  {t('hero.downloadCv')}
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="ghost" onClick={() => goToSection('contact')}>
                <Mail />
                {t('hero.contactMe')}
              </Button>
            </Magnetic>
          </div>

          <div className="hero-fade flex flex-wrap items-center gap-4">
            <Magnetic strength={0.5}>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:text-white"
              >
                <FaGithub className="h-4 w-4" aria-hidden="true" />
                GitHub
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-300 backdrop-blur-xl transition-all duration-300 hover:border-[#0A66C2] hover:text-white hover:shadow-[0_0_24px_-6px_#0A66C2]"
              >
                <FaLinkedinIn className="h-4 w-4" aria-hidden="true" />
                LinkedIn
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </Magnetic>
            <span className="hidden text-sm text-slate-500 sm:inline">{tr(site.location)}</span>
          </div>
        </div>

        {/* Visual */}
        <motion.div style={{ x: visualX, y: visualY }} className="relative mx-auto w-full max-w-[30rem]">
          <div ref={visualRef} className="hero-visual relative aspect-square w-full">
            {showScene ? null : (
              <div aria-hidden="true" className="absolute -inset-[4%] animate-pulse rounded-full bg-gradient-primary opacity-40 blur-3xl" />
            )}

            {/* Rotating conic ring */}
            <div
              aria-hidden="true"
              className="absolute inset-[9%] animate-spin-slow rounded-full p-[2px]"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, #22D3EE 20%, #6366F1 45%, #A855F7 70%, transparent 85%)',
              }}
            >
              <div className="h-full w-full rounded-full bg-night" />
            </div>

            {/* Photo */}
            <div className="absolute inset-[12%] overflow-hidden rounded-full border border-white/10 bg-night-700 shadow-glow-lg">
              <img
                src={site.profileImage}
                alt={t('a11y.portrait', { name: site.name })}
                width="600"
                height="600"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full scale-105 object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(5,8,22,0.8)]" />
            </div>

            {/* Orbiting tech icons */}
            <div aria-hidden="true" className="absolute inset-[2%] animate-spin-slower">
              {orbitIcons.map(({ icon: Icon, color, label }, index) => {
                const angle = (index / orbitIcons.length) * Math.PI * 2 - Math.PI / 4
                return (
                  <div
                    key={label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
                  >
                    <div className="glass-strong grid h-12 w-12 animate-spin-slower place-items-center rounded-2xl [animation-direction:reverse] sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6" style={{ color }} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Floating glass badges */}
            <motion.div style={{ x: badgeX, y: badgeY }} className="absolute -left-2 top-[14%] sm:-left-8">
              <div className="glass-strong flex animate-float items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary">
                  <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block font-display text-lg font-semibold leading-none">{projects.length}</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">{t('hero.projectsShipped')}</span>
                </span>
              </div>
            </motion.div>

            <motion.div style={{ x: badgeX, y: badgeY }} className="absolute -right-2 bottom-[12%] sm:-right-6">
              <div className="glass-strong flex animate-float-delayed items-center gap-3 rounded-2xl px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-left">
                  <span className="block font-display text-sm font-semibold leading-tight">{t('hero.graduateTitle')}</span>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400">{t('hero.graduateSub')}</span>
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mouse scroll indicator */}
      <button
        type="button"
        onClick={() => goToSection('about')}
        className="hero-fade group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-white sm:flex"
        aria-label={t('a11y.scrollToAbout')}
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border-2 border-white/25 pt-2 transition-colors group-hover:border-white/60">
          <span className="h-2 w-1 animate-scroll-wheel rounded-full bg-cyan-300" />
        </span>
        <span className="flex items-center gap-1">
          {t('hero.scroll')}
          <ArrowDown className="h-3 w-3" aria-hidden="true" />
        </span>
      </button>
    </section>
  )
}
