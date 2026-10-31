import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Magnetic from '@/components/Magnetic'
import ProjectCard from '@/components/ProjectCard'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { featuredProjects, projects } from '@/data/projects'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'

// Bento rhythm on large screens: wide, narrow / narrow, wide.
const WIDE_INDEXES = new Set([0, 3])

export default function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 sm:mb-20 lg:flex-row lg:items-end">
          <div id="projects-heading">
            <SectionHeading
              index="05"
              eyebrow={t('projects.eyebrow')}
              title={t('projects.title')}
              highlight={t('projects.highlight')}
              description={t('projects.description')}
              align="left"
              className="mb-0 sm:mb-0"
            />
          </div>
          <Reveal variant="fadeLeft">
            <Magnetic>
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">
                  {t('projects.allProjects', { count: projects.length })}
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </Link>
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const wide = WIDE_INDEXES.has(index)
            return (
              <Reveal
                as="li"
                key={project.id}
                variant={index % 2 === 0 ? 'fadeUp' : 'zoomIn'}
                delay={(index % 3) * 0.08}
                amount={0.15}
                className={cn(wide && 'lg:col-span-2')}
              >
                <ProjectCard project={project} wide={wide} />
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
