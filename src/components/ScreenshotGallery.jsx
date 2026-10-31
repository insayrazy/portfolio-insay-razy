import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/animations/easings'
import useI18n from '@/hooks/useI18n'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import { cn } from '@/utils/cn'

/**
 * Full-screen screenshot viewer. Keyboard: ← → to navigate, Esc to close.
 * Rendered in a portal so tilted / transformed cards cannot clip it.
 */
export default function ScreenshotGallery({ open, onClose, images, title }) {
  const { t, tr } = useI18n()
  const { lenis } = useSmoothScroll()
  const [index, setIndex] = useState(0)
  const total = images.length

  const go = useCallback((step) => setIndex((current) => (current + step + total) % total), [total])

  useEffect(() => {
    if (!open) return undefined
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [open, onClose, go, lenis])

  const image = images[index]

  return createPortal(
    <AnimatePresence onExitComplete={() => setIndex(0)}>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('projects.galleryLabel', { name: title })}
          className="fixed inset-0 z-[120] flex flex-col bg-night/95 p-4 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="mb-4 flex items-center justify-between gap-4" onClick={(event) => event.stopPropagation()}>
            <p className="min-w-0 truncate font-display text-base font-semibold text-white sm:text-lg">
              {title}
              <span className="ml-3 font-sans text-sm font-normal text-slate-400">
                {index + 1} / {total}
              </span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('projects.galleryClose')}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06] transition-colors hover:bg-white/[0.12]"
              autoFocus
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="flex max-h-full max-w-full flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
                <img
                  src={image.src}
                  alt={image.caption ? tr(image.caption) : title}
                  className="max-h-[72vh] w-auto max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
                />
                {image.caption ? <figcaption className="text-center text-sm text-slate-300">{tr(image.caption)}</figcaption> : null}
              </motion.figure>
            </AnimatePresence>

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label={t('projects.galleryPrev')}
                  className="absolute left-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-night/80 backdrop-blur transition-colors hover:bg-white/[0.12] sm:left-2"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label={t('projects.galleryNext')}
                  className="absolute right-0 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-gradient-primary shadow-glow transition-shadow hover:shadow-glow-lg sm:right-2"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>

          {total > 1 ? (
            <div className="mt-4 flex justify-center gap-3" onClick={(event) => event.stopPropagation()}>
              {images.map((item, thumbIndex) => (
                <button
                  key={thumbIndex}
                  type="button"
                  onClick={() => setIndex(thumbIndex)}
                  aria-label={item.caption ? tr(item.caption) : `${thumbIndex + 1}`}
                  aria-current={thumbIndex === index ? 'true' : undefined}
                  className={cn(
                    'h-14 w-24 overflow-hidden rounded-lg border-2 transition-all sm:h-16 sm:w-28',
                    thumbIndex === index ? 'border-cyan-300 opacity-100' : 'border-transparent opacity-50 hover:opacity-80',
                  )}
                >
                  <img src={item.src} alt="" className="h-full w-full object-cover object-left-top" />
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
