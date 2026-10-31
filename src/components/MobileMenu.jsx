import { AnimatePresence, motion } from 'framer-motion'
import { mobileMenuItem, mobileMenuVariants } from '@/animations/transitions'
import SocialLinks from '@/components/SocialLinks'
import { navLinks } from '@/data/navigation'
import { site } from '@/data/site'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'
import { padIndex } from '@/utils/helpers'

export default function MobileMenu({ open, active, onNavigate }) {
  const { t, tr } = useI18n()

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t('a11y.siteNav')}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          variants={mobileMenuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          data-lenis-prevent
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-indigo-600/30 blur-[100px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />

          <nav aria-label={t('a11y.mobileNav')} className="relative">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.li key={link.id} custom={index} variants={mobileMenuItem}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(link.id)
                    }}
                    className={cn(
                      'group flex items-baseline gap-4 border-b border-white/5 py-4 font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl',
                      active === link.id ? 'text-white' : 'text-white/60 hover:text-white',
                    )}
                  >
                    <span className="font-mono text-xs text-cyan-300/80">{padIndex(index + 1)}</span>
                    <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-2">{tr(link.label)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div custom={navLinks.length} variants={mobileMenuItem} className="relative mt-auto flex flex-col gap-5 pt-10">
            <a href={`mailto:${site.email}`} className="text-lg text-slate-300 underline-offset-4 hover:text-white hover:underline">
              {site.email}
            </a>
            <SocialLinks size="sm" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
