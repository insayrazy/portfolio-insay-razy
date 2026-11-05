import { useState } from 'react'
import { ArrowUpRight, Images, Lock } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import ProjectThumbnail from '@/components/ProjectThumbnail'
import ScreenshotGallery from '@/components/ScreenshotGallery'
import TiltCard from '@/components/TiltCard'
import { Badge } from '@/components/ui/badge'
import useI18n from '@/hooks/useI18n'
import useSpotlight from '@/hooks/useSpotlight'
import { cn } from '@/utils/cn'

export default function ProjectCard({ project, wide = false, className }) {
  const handleSpotlight = useSpotlight()
  const { t, tr } = useI18n()
  const title = tr(project.title)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const images = project.images ?? []

  return (
    <TiltCard max={wide ? 4 : 7} className={cn('h-full rounded-[1.75rem]', className)}>
      <article
        onMouseMove={handleSpotlight}
        className="spotlight animated-border animated-border-hover glass flex h-full flex-col gap-6 rounded-[1.75rem] p-4 transition-shadow duration-500 hover:shadow-glow-lg sm:p-5"
      >
        <ProjectThumbnail project={project} className={cn('w-full', wide ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[16/10]')} />

        <div className="flex flex-1 flex-col gap-4 px-2 pb-2">
          <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            <span className="text-cyan-300/90">{project.category}</span>
            <span className="truncate">{project.year ?? project.company}</span>
          </div>

          {project.internal ? (
            <Badge className="w-fit border-amber-400/25 bg-amber-400/10 text-amber-200">
              <Lock className="h-3 w-3" aria-hidden="true" />
              {t('projects.internal')}
            </Badge>
          ) : null}

          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h3>
            <span
              aria-hidden="true"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-gradient-primary"
            >
              {project.liveUrl ? <ArrowUpRight className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">{tr(project.description)}</p>

          {project.role || project.outcome || project.stack ? (
            <dl className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm">
              {project.role ? (
                <div>
                  <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan-300/90">{t('projects.role')}</dt>
                  <dd className="leading-relaxed text-slate-300">{tr(project.role)}</dd>
                </div>
              ) : null}
              {project.stack
                ? Object.entries(project.stack).map(([layer, items]) => (
                    <div key={layer}>
                      <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300/90">{t(`projects.${layer}`)}</dt>
                      <dd className="leading-relaxed text-slate-300">{items.join(' · ')}</dd>
                    </div>
                  ))
                : null}
              {project.outcome ? (
                <div>
                  <dt className="mb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300/90">{t('projects.outcome')}</dt>
                  <dd className="leading-relaxed text-slate-300">{tr(project.outcome)}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}

          <ul className="flex flex-wrap gap-2" aria-label={t('a11y.techStackOf', { name: title })}>
            {project.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-30 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-night transition-all duration-300 hover:opacity-90 hover:shadow-glow-cyan"
              aria-label={`${t('projects.liveDemoLabel', { name: title })} ${t('a11y.newTab')}`}
            >
              {t('projects.liveDemo')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-4 py-2 text-sm text-amber-100">
                <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t('projects.demoOnRequest')}
              </p>
            )}
            {images.length > 0 ? (
              <button
                type="button"
                onClick={() => setGalleryOpen(true)}
                className="relative z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-cyan-300/50 hover:bg-white/[0.08]"
              >
                <Images className="h-4 w-4" aria-hidden="true" />
                {t('projects.viewScreenshots', { count: images.length })}
              </button>
            ) : null}
            {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08]"
              aria-label={`${t('projects.sourceLabel', { name: title })} ${t('a11y.newTab')}`}
            >
              <FaGithub className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
            ) : null}
          </div>
        </div>
      </article>
      {images.length > 0 ? (
        <ScreenshotGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} images={images} title={title} />
      ) : null}
    </TiltCard>
  )
}
