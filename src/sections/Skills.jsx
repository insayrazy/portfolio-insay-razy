import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { EASE_OUT_EXPO } from '@/animations/easings'
import CircularProgress from '@/components/CircularProgress'
import Counter from '@/components/Counter'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { allSkills, skillCategories } from '@/data/skills'
import useI18n from '@/hooks/useI18n'
import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/utils/cn'

const tabs = [
  {
    id: 'all',
    label: { en: 'All', id: 'Semua' },
    description: {
      en: 'The full toolkit I use to design, build and ship products.',
      id: 'Seluruh perangkat yang saya gunakan untuk merancang, membangun, dan merilis produk.',
    },
  },
  ...skillCategories.map(({ id, label, description }) => ({ id, label, description })),
]

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, delay: index * 0.05, ease: EASE_OUT_EXPO },
  }),
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.25 } },
}

export default function Skills() {
  const [active, setActive] = useState('all')
  const { t, tr } = useI18n()
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, amount: 0.15 })
  const handleSpotlight = useSpotlight()
  const tabRefs = useRef([])

  const items = active === 'all' ? allSkills : skillCategories.find((category) => category.id === active).skills
  const activeTab = tabs.find((tab) => tab.id === active)

  const handleKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setActive(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <div id="skills-heading">
          <SectionHeading
            index="02"
            eyebrow={t('skills.eyebrow')}
            title={t('skills.title')}
            highlight={t('skills.highlight')}
            description={t('skills.description')}
          />
        </div>

        <Reveal variant="blurIn" className="mb-6 flex justify-center">
          <div role="tablist" aria-label={t('skills.tabsLabel')} className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1.5">
            {tabs.map((tab, index) => {
              const selected = active === tab.id
              return (
                <button
                  key={tab.id}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  type="button"
                  role="tab"
                  id={`skills-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    'relative isolate rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300',
                    selected ? 'text-pure' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="skills-tab-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-primary shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {tr(tab.label)}
                </button>
              )
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeTab.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mb-12 text-center text-sm text-slate-400"
          >
            {tr(activeTab.description)}
          </motion.p>
        </AnimatePresence>

        <motion.ul
          ref={gridRef}
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${active}`}
          layout
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {items.map((skill, index) => {
              const Icon = skill.icon
              return (
                <motion.li
                  key={skill.name}
                  layout
                  custom={index}
                  variants={cardVariants}
                  exit="exit"
                  onMouseMove={handleSpotlight}
                  className="spotlight glass group flex flex-col items-center gap-4 rounded-3xl px-4 py-6 transition-colors duration-500 hover:border-white/20"
                >
                  <CircularProgress value={skill.level} color={skill.color} label={t('a11y.proficiency', { name: skill.name })} delay={index * 0.04}>
                    <Icon
                      className="h-8 w-8 transition-transform duration-500 ease-out-expo group-hover:scale-125"
                      style={{ color: skill.color }}
                      aria-hidden="true"
                    />
                  </CircularProgress>
                  <div className="text-center">
                    <p className="font-display text-base font-semibold text-white">{skill.name}</p>
                    <Counter value={skill.level} suffix="%" className="text-sm text-slate-400" />
                  </div>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
