import { motion } from 'framer-motion'
import { EASE_OUT_QUART } from '@/animations/easings'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'

/**
 * Project preview with an image-reveal mask. Uses the first of `project.images`
 * when provided, otherwise renders a generated "app window" preview from the
 * project's palette.
 */
export default function ProjectThumbnail({ project, className }) {
  const { t, tr } = useI18n()
  const title = tr(project.title)
  const label = t('projects.preview', { name: title })
  const cover = project.images?.[0]
  const [from, to] = project.gradient
  const Icon = project.icon

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-white/10 bg-night-700', className)}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: EASE_OUT_QUART }}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110">
          {cover ? (
            <img
              src={cover.src}
              alt={cover.caption ? tr(cover.caption) : label}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-left-top"
            />
          ) : (
            <GeneratedPreview from={from} to={to} Icon={Icon} label={label} />
          )}
        </div>
      </motion.div>

      {/* Mask reveal curtain */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 origin-top"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE_OUT_QUART, delay: 0.1 }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent"
      />
    </div>
  )
}

function GeneratedPreview({ from, to, Icon, label }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `radial-gradient(120% 80% at 0% 0%, ${from}55, transparent 60%), radial-gradient(120% 80% at 100% 100%, ${to}55, transparent 60%), #0B1023`,
      }}
      role="img"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-grid-lines bg-[size:28px_28px] opacity-60" />

      {/* Window chrome */}
      <div className="absolute inset-x-[6%] top-[9%] bottom-0 overflow-hidden rounded-t-xl border border-white/10 bg-night/70 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="ml-3 h-2.5 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="flex h-full gap-3 p-3">
          <div className="hidden w-1/5 flex-col gap-2 sm:flex">
            {[70, 55, 80, 45, 60].map((width, index) => (
              <span key={index} className="h-2 rounded-full bg-white/10" style={{ width: `${width}%` }} />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex gap-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-10 flex-1 rounded-lg border border-white/5 bg-white/[0.04] p-2">
                  <span className="block h-1.5 w-1/2 rounded-full bg-white/15" />
                  <span
                    className="mt-1.5 block h-2 w-3/4 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex h-20 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-2">
              {[40, 65, 50, 80, 60, 95, 70, 85, 55, 75].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-sm opacity-80"
                  style={{ height: `${height}%`, background: `linear-gradient(180deg, ${to}, ${from})` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating icon tile */}
      <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/20 bg-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-transform duration-700 ease-out-expo group-hover:-translate-y-[60%] group-hover:rotate-6">
        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
      </div>
    </div>
  )
}
