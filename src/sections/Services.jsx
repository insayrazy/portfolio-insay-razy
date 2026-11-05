import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { defaultViewport, revealVariants, staggerContainer } from '@/animations/variants'
import SectionHeading from '@/components/SectionHeading'
import { services } from '@/data/services'
import useI18n from '@/hooks/useI18n'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSpotlight from '@/hooks/useSpotlight'
import { padIndex } from '@/utils/helpers'

const itemVariants = {
  hidden: revealVariants.rotateIn.hidden,
  visible: revealVariants.rotateIn.visible(0),
}

export default function Services() {
  const handleSpotlight = useSpotlight()
  const { t, tr } = useI18n()
  const goToSection = useScrollToSection()

  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <div id="services-heading">
          <SectionHeading
            index="07"
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            highlight={t('services.highlight')}
            description={t('services.description')}
          />
        </div>

        <motion.ul
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ ...defaultViewport, amount: 0.1 }}
        >
          {services.map(({ id, icon: Icon, title, description, features }, index) => (
            <motion.li key={id} variants={itemVariants} className="h-full">
              <article
                onMouseMove={handleSpotlight}
                className="spotlight animated-border animated-border-hover glass group flex h-full flex-col rounded-[1.75rem] p-7 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:bg-white/[0.05] sm:p-8"
              >
                <div className="mb-8 flex items-start justify-between">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-700 ease-out-expo group-hover:rotate-[360deg] group-hover:border-transparent group-hover:bg-gradient-primary group-hover:shadow-glow">
                    <Icon className="h-6 w-6 text-cyan-300 transition-colors duration-500 group-hover:text-pure" aria-hidden="true" />
                  </span>
                  <span className="text-outline font-display text-5xl font-bold transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(129,140,248,0.6)]">
                    {padIndex(index + 1)}
                  </span>
                </div>

                <h3 className="mb-3 font-display text-xl font-semibold text-white sm:text-2xl">{tr(title)}</h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-400">{tr(description)}</p>

                <ul className="mb-8 flex flex-col gap-2.5">
                  {tr(features).map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15">
                        <Check className="h-3 w-3 text-emerald-300" aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => goToSection('contact')}
                  className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-cyan-200"
                >
                  {t('services.discuss')}
                  <span className="sr-only"> {tr(title)}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                </button>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
