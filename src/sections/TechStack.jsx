import { motion } from 'framer-motion'
import { defaultViewport, staggerContainer, staggerItemRotate } from '@/animations/variants'
import Marquee from '@/components/Marquee'
import SectionHeading from '@/components/SectionHeading'
import { coreStack, techMarqueeRows } from '@/data/techStack'
import useI18n from '@/hooks/useI18n'

function TechPill({ tech }) {
  const Icon = tech.icon
  return (
    <div
      style={{ '--brand': tech.color }}
      className="group/pill flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 backdrop-blur-xl transition-all duration-500 hover:border-[color:var(--brand)] hover:bg-white/[0.06] hover:shadow-[0_0_30px_-8px_var(--brand)]"
    >
      <Icon
        className="h-6 w-6 text-slate-400 transition-all duration-500 group-hover/pill:scale-110 group-hover/pill:text-[color:var(--brand)]"
        aria-hidden="true"
      />
      <span className="whitespace-nowrap text-sm font-medium text-slate-200">{tech.name}</span>
    </div>
  )
}

export default function TechStack() {
  const { t } = useI18n()
  return (
    <section id="tech-stack" className="section overflow-hidden" aria-labelledby="tech-heading">
      <div className="container">
        <div id="tech-heading">
          <SectionHeading
            index="03"
            eyebrow={t('tech.eyebrow')}
            title={t('tech.title')}
            highlight={t('tech.highlight')}
            description={t('tech.description')}
          />
        </div>
      </div>

      <div className="mb-20 flex flex-col gap-4" aria-label={t('a11y.technologies')} role="region">
        <Marquee duration={50}>
          {techMarqueeRows[0].map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
        <Marquee duration={55} reverse>
          {techMarqueeRows[1].map((tech) => (
            <TechPill key={tech.name} tech={tech} />
          ))}
        </Marquee>
      </div>

      <div className="container">
        <motion.ul
          className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {coreStack.map((tech) => {
            const Icon = tech.icon
            return (
              <motion.li key={tech.name} variants={staggerItemRotate}>
                <div
                  style={{ '--brand': tech.color }}
                  className="group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:border-[color:var(--brand)] hover:shadow-[0_20px_50px_-20px_var(--brand)]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--brand) 22%, transparent), transparent 70%)' }}
                  />
                  <Icon
                    className="relative h-9 w-9 text-slate-300 transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:rotate-[8deg] group-hover:scale-125 group-hover:text-[color:var(--brand)] sm:h-11 sm:w-11"
                    aria-hidden="true"
                  />
                  <span className="relative text-center text-xs font-medium text-slate-400 transition-colors group-hover:text-white sm:text-sm">
                    {tech.name}
                  </span>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
