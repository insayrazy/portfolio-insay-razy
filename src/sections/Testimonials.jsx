import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { carouselVariants } from '@/animations/transitions'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { testimonials } from '@/data/testimonials'
import useI18n from '@/hooks/useI18n'
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/utils/cn'
import { getInitials } from '@/utils/helpers'

const AUTOPLAY_MS = 6000
const SWIPE_THRESHOLD = 80
const AVATAR_GRADIENTS = [
  'from-cyan-400 to-blue-600',
  'from-indigo-400 to-purple-600',
  'from-fuchsia-400 to-indigo-600',
  'from-emerald-400 to-cyan-600',
  'from-blue-400 to-violet-600',
]

export default function Testimonials() {
  const { t, tr } = useI18n()
  const total = testimonials.length
  const [[index, direction], setSlide] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const regionRef = useRef(null)
  const inView = useInView(regionRef, { amount: 0.4 })
  const reducedMotion = usePrefersReducedMotion()

  const paginate = useCallback((step) => {
    setSlide(([current]) => [(current + step + total) % total, step])
  }, [total])

  const goTo = (target) => setSlide(([current]) => [target, target > current ? 1 : -1])

  const autoplay = !paused && inView && !reducedMotion

  useEffect(() => {
    if (!autoplay) return undefined
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [autoplay, paginate, index])

  const active = testimonials[index]

  return (
    <section id="testimonials" className="section overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container">
        <div id="testimonials-heading">
          <SectionHeading
            index="08"
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            highlight={t('testimonials.highlight')}
            description={t('testimonials.description')}
          />
        </div>

        <Reveal variant="blurIn">
          <div
            ref={regionRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('testimonials.carousel')}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mx-auto max-w-4xl"
          >
            <div className="relative min-h-[26rem] [perspective:1400px] sm:min-h-[22rem]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.figure
                  key={active.id}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1)
                    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1)
                  }}
                  aria-roledescription="slide"
                  aria-label={t('testimonials.slide', { current: index + 1, total })}
                  className="glass-strong gradient-border relative cursor-grab overflow-hidden rounded-[2rem] p-8 active:cursor-grabbing sm:p-12"
                >
                  <div aria-hidden="true" className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-[80px]" />
                  <Quote className="relative mb-6 h-10 w-10 text-indigo-400/70" aria-hidden="true" />

                  <div className="relative mb-6 flex gap-1" aria-label={t('testimonials.rated', { rating: active.rating })} role="img">
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        className={cn('h-4 w-4', star < active.rating ? 'fill-amber-300 text-amber-300' : 'text-white/20')}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="relative mb-10 font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
                    &ldquo;{tr(active.quote)}&rdquo;
                  </blockquote>

                  <figcaption className="relative flex items-center gap-4">
                    <span
                      className={cn(
                        'grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br font-display text-lg font-bold text-pure shadow-glow',
                        AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length],
                      )}
                      aria-hidden="true"
                    >
                      {getInitials(active.name)}
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold text-white">{active.name}</span>
                      <span className="block text-sm text-slate-400">
                        {tr(active.role)} · {active.company}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-6">
              <div className="flex items-center gap-2" role="group" aria-label={t('testimonials.choose')}>
                {testimonials.map((item, dot) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(dot)}
                    aria-label={t('testimonials.show', { index: dot + 1, name: item.name })}
                    aria-current={dot === index ? 'true' : undefined}
                    className="group relative h-2.5 overflow-hidden rounded-full bg-white/10 transition-all duration-500"
                    style={{ width: dot === index ? 44 : 10 }}
                  >
                    {dot === index ? (
                      <motion.span
                        key={`${index}-${autoplay}`}
                        className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                        initial={{ scaleX: autoplay ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoplay ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label={t('testimonials.previous')}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label={t('testimonials.next')}
                  className="grid h-12 w-12 place-items-center rounded-full bg-gradient-primary shadow-glow transition-all duration-300 hover:shadow-glow-lg"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
