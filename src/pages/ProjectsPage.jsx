import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/animations/easings'
import ProjectCard from '@/components/ProjectCard'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { projectCategories, projects } from '@/data/projects'
import useDocumentMeta from '@/hooks/useDocumentMeta'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'

export default function ProjectsPage() {
  const { t, tr } = useI18n()
  useDocumentMeta({
    title: t('projectsPage.metaTitle'),
    description: t('projectsPage.metaDescription'),
    path: '/projects',
  })

  const [filter, setFilter] = useState('All')
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section className="section pt-36 sm:pt-40" aria-labelledby="projects-page-title">
      <div className="container">
        <div className="mb-10">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft />
              {t('projectsPage.back')}
            </Link>
          </Button>
        </div>

        <div id="projects-page-title">
          <SectionHeading
            as="h1"
            eyebrow={t('projectsPage.eyebrow')}
            title={t('projectsPage.title')}
            highlight={t('projectsPage.highlight')}
            description={t('projectsPage.description')}
          />
        </div>

        <div role="group" aria-label={t('projectsPage.filterLabel')} className="mb-12 flex flex-wrap justify-center gap-2">
          {projectCategories.map((category) => {
            const active = filter === category.id
            const count =
              category.id === 'All' ? projects.length : projects.filter((project) => project.category === category.id).length
            if (count === 0) return null
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={active}
                className={cn(
                  'relative isolate rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300',
                  active ? 'text-pure' : 'text-slate-400 hover:text-white',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="projects-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-primary shadow-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {tr(category.label)}
                <span className="ml-2 text-xs opacity-60">{count}</span>
              </button>
            )
          })}
        </div>

        <motion.ul layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.li
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, delay: index * 0.05, ease: EASE_OUT_EXPO } }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
