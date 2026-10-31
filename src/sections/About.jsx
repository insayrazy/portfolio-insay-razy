import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { useGSAP } from '@/animations/gsap'
import { parallax, scrubWordHighlight } from '@/animations/scrollAnimations'
import { defaultViewport, staggerContainer, staggerItemZoom } from '@/animations/variants'
import Magnetic from '@/components/Magnetic'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { aboutFacts, aboutHighlights, aboutHighlightWords, aboutIntro, aboutParagraphs } from '@/data/about'
import { site } from '@/data/site'
import useI18n from '@/hooks/useI18n'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/utils/cn'

export default function About() {
  const scopeRef = useRef(null)
  const { t, tr, lang } = useI18n()
  const reducedMotion = usePrefersReducedMotion()
  const goToSection = useScrollToSection()
  const handleSpotlight = useSpotlight()
  const highlighted = new Set(tr(aboutHighlightWords))

  // Re-created when the language changes because the intro words are re-rendered.
  useGSAP(
    () => {
      if (reducedMotion) return
      scrubWordHighlight('.about-word', '.about-intro')
      parallax('.about-orb', scopeRef.current, -40)
    },
    { scope: scopeRef, dependencies: [reducedMotion, lang], revertOnUpdate: true },
  )

  return (
    <section id="about" ref={scopeRef} className="section" aria-labelledby="about-heading">
      <div aria-hidden="true" className="about-orb pointer-events-none absolute right-[5%] top-1/3 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="container">
        <div id="about-heading">
          <SectionHeading index="01" eyebrow={t('about.eyebrow')} title={t('about.title')} highlight={t('about.highlight')} align="left" />
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="about-intro mb-10 font-display text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-[2.6rem] lg:leading-[1.2]">
              {tr(aboutIntro)
                .split(' ')
                .map((word, index) => (
                  <span
                    key={`${lang}-${word}-${index}`}
                    className={cn('about-word inline-block', highlighted.has(word) && 'text-gradient')}
                  >
                    {word}&nbsp;
                  </span>
                ))}
            </p>

            <div className="flex flex-col gap-5">
              {aboutParagraphs.map((paragraph, index) => (
                <Reveal key={index} variant="fadeUp" delay={index * 0.1}>
                  <p className="text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">{tr(paragraph)}</p>
                </Reveal>
              ))}
            </div>

            <Reveal variant="fadeUp" delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <Button size="lg" onClick={() => goToSection('contact')}>
                  {t('about.workTogether')}
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline">
                  <a href={site.cvUrl} target="_blank" rel="noopener noreferrer">
                    <Download />
                    {t('about.resume')}
                  </a>
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal variant="fadeRight">
              <dl className="glass-strong gradient-border divide-y divide-white/5 rounded-3xl px-6 py-2 sm:px-8">
                {aboutFacts.map((fact) => (
                  <div key={fact.label.en} className="flex items-center justify-between gap-6 py-4">
                    <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">{tr(fact.label)}</dt>
                    <dd className={cn('text-right text-sm font-medium text-white', fact.highlight && 'text-emerald-300')}>
                      {fact.href ? (
                        <a href={fact.href} className="break-all underline-offset-4 hover:text-cyan-200 hover:underline">
                          {tr(fact.value)}
                        </a>
                      ) : (
                        tr(fact.value)
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <motion.ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              variants={staggerContainer(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
            >
              {aboutHighlights.map(({ icon: Icon, title, description }) => (
                <motion.li
                  key={title.en}
                  variants={staggerItemZoom}
                  onMouseMove={handleSpotlight}
                  className="spotlight glass group rounded-3xl p-5 transition-colors duration-500 hover:border-white/20"
                >
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-primary shadow-glow transition-transform duration-500 ease-out-expo group-hover:-rotate-12 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mb-1 font-display text-base font-semibold">{tr(title)}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{tr(description)}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
