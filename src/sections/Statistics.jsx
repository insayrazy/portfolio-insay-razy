import { motion } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'
import Counter from '@/components/Counter'
import Reveal from '@/components/Reveal'
import { statistics } from '@/data/statistics'
import useI18n from '@/hooks/useI18n'

export default function Statistics() {
  const { t, tr } = useI18n()
  return (
    <section id="statistics" className="section py-16 sm:py-20 lg:py-24" aria-label={t('a11y.statistics')}>
      <div className="container">
        <Reveal variant="zoomIn" amount={0.3}>
          <div className="glass-strong animated-border relative overflow-hidden rounded-[2rem] p-2">
            <div aria-hidden="true" className="absolute -left-20 top-0 h-60 w-60 rounded-full bg-indigo-600/25 blur-[90px]" />
            <div aria-hidden="true" className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-cyan-500/20 blur-[90px]" />

            <dl className="relative grid grid-cols-1 divide-y divide-white/5 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {statistics.map(({ id, value, suffix, label, description, icon: Icon, progress }, index) => (
                <div key={id} className="group flex flex-col gap-4 p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:bg-gradient-primary">
                      <Icon className="h-5 w-5 text-cyan-300 transition-colors group-hover:text-pure" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
                  </div>

                  <dt className="order-3 -mt-2">
                    <span className="block font-display text-lg font-semibold text-white">{tr(label)}</span>
                    <span className="block text-sm text-slate-400">{tr(description)}</span>
                  </dt>
                  <dd className="order-2 font-display text-5xl font-bold tracking-tight sm:text-6xl">
                    <Counter value={value} suffix={suffix} delay={index * 0.15} className="text-gradient" />
                  </dd>

                  <div aria-hidden="true" className="order-4 mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full origin-left rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: progress / 100 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 2, delay: 0.2 + index * 0.15, ease: EASE_OUT_EXPO }}
                    />
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
