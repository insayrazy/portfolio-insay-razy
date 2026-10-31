import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Briefcase, Calendar, CheckCircle2, GraduationCap, MapPin } from 'lucide-react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { experiences } from '@/data/experience'
import useI18n from '@/hooks/useI18n'
import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/utils/cn'

export default function Experience() {
  const timelineRef = useRef(null)
  const { t, tr } = useI18n()
  const handleSpotlight = useSpotlight()
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 })

  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <div className="container">
        <div id="experience-heading">
          <SectionHeading
            index="04"
            eyebrow={t('experience.eyebrow')}
            title={t('experience.title')}
            highlight={t('experience.highlight')}
            description={t('experience.description')}
          />
        </div>

        <div ref={timelineRef} className="relative mx-auto max-w-5xl">
          {/* Track + animated progress line */}
          <div aria-hidden="true" className="absolute bottom-0 left-[19px] top-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[19px] top-0 w-[2px] origin-top bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_16px_rgba(99,102,241,0.8)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="flex flex-col gap-12 md:gap-20">
            {experiences.map((item, index) => {
              const onLeft = index % 2 === 0
              const isEducation = item.kind === 'education'
              const Icon = isEducation ? GraduationCap : Briefcase
              const period = tr(item.period)
              return (
                <li key={item.id} className="relative grid pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
                  {/* Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-6 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/15 bg-night shadow-glow md:left-1/2"
                  >
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-indigo-400/40" />
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </span>

                  {/* Period (opposite side on desktop) */}
                  <Reveal
                    variant={onLeft ? 'fadeRight' : 'fadeLeft'}
                    className={cn(
                      'hidden items-start pt-7 md:flex',
                      onLeft ? 'md:order-2 md:justify-start' : 'md:order-1 md:justify-end',
                    )}
                  >
                    <span className="font-display text-2xl font-semibold text-white/80">{period}</span>
                  </Reveal>

                  <Reveal variant={onLeft ? 'fadeLeft' : 'fadeRight'} className={cn(onLeft ? 'md:order-1' : 'md:order-2')}>
                    <article
                      onMouseMove={handleSpotlight}
                      className={cn(
                        'spotlight glass group rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-glow sm:p-8',
                        isEducation && 'animated-border',
                      )}
                    >
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <Badge
                          className={cn(
                            isEducation ? 'border-orange-400/30 bg-orange-400/10 text-orange-200' : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
                          )}
                        >
                          {tr(item.type)}
                        </Badge>
                        <span className="flex items-center gap-1.5 text-xs text-slate-400 md:hidden">
                          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                          {period}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{tr(item.role)}</h3>
                      <p className="text-gradient mb-1 mt-1 text-base font-medium">{tr(item.company)}</p>
                      <p className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {tr(item.location)}
                      </p>

                      <p className="mb-5 text-sm leading-relaxed text-slate-400">{tr(item.description)}</p>

                      <ul className="mb-6 flex flex-col gap-2.5">
                        {tr(item.achievements).map((achievement) => (
                          <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      {item.tech?.length ? (
                        <ul className="flex flex-wrap gap-2" aria-label={t('a11y.techUsed')}>
                          {item.tech.map((tech) => (
                            <li key={tech}>
                              <Badge>{tech}</Badge>
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.links ? (
                        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/5 pt-5">
                          {item.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-orange-300/50 hover:bg-white/[0.08]"
                            >
                              {tr(link.label)}
                              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              <span className="sr-only">{t('a11y.newTab')}</span>
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
