import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, BadgeCheck, FileText, GraduationCap } from 'lucide-react'
import { gsap, ScrollTrigger, useGSAP } from '@/animations/gsap'
import { horizontalPinScroll } from '@/animations/scrollAnimations'
import { revealVariants } from '@/animations/variants'
import Magnetic from '@/components/Magnetic'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { curriculum, hacktiv8Credential } from '@/data/certificates'
import useI18n from '@/hooks/useI18n'

function CredentialCard() {
  const { t, tr } = useI18n()
  const credential = hacktiv8Credential
  const [from, to] = credential.accent

  return (
    <article className="glass-strong animated-border group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] p-7 sm:p-8 lg:w-[34rem] lg:shrink-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
        style={{ background: `radial-gradient(circle, ${from}, transparent 70%)` }}
      />

      <div className="relative mb-6 flex items-start justify-between gap-4">
        <span
          className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          aria-hidden="true"
        >
          <GraduationCap className="h-8 w-8" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {tr(credential.status)}
        </span>
      </div>

      <p className="relative mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
        <Award className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
        {t('certificates.credential')} · {credential.issuer}
      </p>
      <h3 className="relative mb-3 font-display text-2xl font-semibold leading-snug text-white sm:text-3xl">
        {tr(credential.program)}
      </h3>
      <p className="relative mb-6 text-sm leading-relaxed text-slate-400 sm:text-base">{tr(credential.description)}</p>

      <ul className="relative mb-8 flex flex-wrap gap-2" aria-label={t('a11y.skillsCovered')}>
        {credential.skills.map((skill) => (
          <li key={skill}>
            <Badge>{skill}</Badge>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto border-t border-white/5 pt-6">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-slate-500">{t('certificates.documents')}</p>
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <Button asChild>
              <a href={credential.certificateUrl} target="_blank" rel="noopener noreferrer">
                <Award />
                {t('certificates.viewCertificate')}
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild variant="outline">
              <a href={credential.transcriptUrl} target="_blank" rel="noopener noreferrer">
                <FileText />
                {t('certificates.viewTranscript')}
                <span className="sr-only">{t('a11y.newTab')}</span>
              </a>
            </Button>
          </Magnetic>
        </div>
      </div>
    </article>
  )
}

function CurriculumCard({ item }) {
  const { t, tr } = useI18n()
  const [from, to] = item.accent
  const Icon = item.icon

  return (
    <article className="glass-strong gradient-border group relative flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-glow-lg lg:w-[22rem] lg:shrink-0">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-700 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle, ${from}, transparent 70%)` }}
      />

      <div className="relative mb-8 flex items-start justify-between">
        <span
          className="grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-500 ease-out-expo group-hover:rotate-[-10deg] group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-outline font-display text-4xl font-bold">{item.phase.replace('Phase ', '0')}</span>
      </div>

      <p className="relative mb-2 text-xs uppercase tracking-[0.2em] text-cyan-300/90">
        {t('certificates.curriculum')} · {item.phase}
      </p>
      <h3 className="relative mb-3 font-display text-xl font-semibold text-white">{tr(item.title)}</h3>
      <p className="relative mb-6 text-sm leading-relaxed text-slate-400">{tr(item.description)}</p>

      <ul className="relative mt-auto flex flex-wrap gap-2" aria-label={t('a11y.skillsCovered')}>
        {item.topics.map((topic) => (
          <li key={topic}>
            <Badge>{topic}</Badge>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Certificates() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const { t, lang } = useI18n()
  // Cards move horizontally inside a pinned track, so reveal them when the section
  // itself enters the viewport rather than relying on each card's intersection.
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Desktop: pin the section and scroll the cards horizontally.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const tween = horizontalPinScroll(sectionRef.current, trackRef.current)
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { ...tween.scrollTrigger.vars, pin: false, trigger: sectionRef.current } },
        )
        ScrollTrigger.refresh()
      })
      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true },
  )

  const cards = [
    { id: 'credential', node: <CredentialCard /> },
    ...curriculum.map((item) => ({ id: item.id, node: <CurriculumCard item={item} /> })),
  ]

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="relative overflow-hidden">
      <div ref={sectionRef} className="relative flex min-h-screen flex-col justify-center py-24 sm:py-28 lg:py-0">
        <div
          ref={trackRef}
          className="container flex flex-col gap-6 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16"
        >
          <div id="certificates-heading" className="flex flex-col justify-center lg:w-[30rem] lg:shrink-0 lg:pr-8">
            <SectionHeading
              index="06"
              eyebrow={t('certificates.eyebrow')}
              title={t('certificates.title')}
              highlight={t('certificates.highlight')}
              description={t('certificates.description')}
              align="left"
              className="mb-8 sm:mb-10"
            />
            <Reveal variant="fadeUp" delay={0.3} className="hidden items-center gap-3 text-sm text-slate-500 lg:flex">
              <motion.span
                aria-hidden="true"
                className="inline-block h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent"
                animate={{ scaleX: [1, 1.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {t('certificates.hint')}
            </Reveal>
          </div>

          <ul className="contents">
            {cards.map((card, index) => (
              <motion.li
                key={card.id}
                className="lg:flex"
                variants={revealVariants.maskUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                custom={index * 0.08}
              >
                {card.node}
              </motion.li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="container mt-12 hidden lg:block">
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div ref={progressRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
