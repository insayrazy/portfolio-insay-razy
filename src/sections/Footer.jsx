import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/animations/easings'
import Logo from '@/components/Logo'
import Magnetic from '@/components/Magnetic'
import SocialLinks from '@/components/SocialLinks'
import { footerLinks } from '@/data/navigation'
import { site } from '@/data/site'
import useI18n from '@/hooks/useI18n'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSmoothScroll from '@/hooks/useSmoothScroll'

export default function Footer() {
  const { scrollTo } = useSmoothScroll()
  const { t, tr } = useI18n()
  const goToSection = useScrollToSection()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden pb-10 pt-20" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        {t('a11y.footer')}
      </h2>

      {/* Animated line */}
      <div className="container">
        <div className="relative h-px w-full overflow-hidden bg-white/5">
          <motion.div
            className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE_OUT_EXPO }}
          />
          <span className="absolute inset-y-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
        </div>
      </div>

      <div className="container flex flex-col gap-12 pt-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex max-w-sm flex-col gap-4">
            <Logo />
            <p className="text-sm leading-relaxed text-slate-400">
              {t('footer.about', { role: tr(site.role) })}
            </p>
          </div>

          <nav aria-label={t('a11y.footerNav')}>
            <ul className="flex max-w-md flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      goToSection(link.id)
                    }}
                    className="group relative text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {tr(link.label)}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="text-outline select-none text-center font-display whitespace-nowrap text-[clamp(2.75rem,12.5vw,11rem)] font-bold leading-none tracking-tight"
        >
          {site.brand}
        </p>

        <div className="flex flex-col-reverse items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-center text-sm text-slate-500 sm:text-left">
            © {year} {site.name}. {t('footer.rights')}
          </p>

          <div className="flex items-center gap-4">
            <SocialLinks size="sm" />
            <Magnetic strength={0.5}>
              <button
                type="button"
                onClick={() => scrollTo('top')}
                aria-label={t('a11y.backToTop')}
                className="group grid h-12 w-12 place-items-center rounded-full bg-gradient-primary shadow-glow transition-shadow duration-300 hover:shadow-glow-lg"
              >
                <ArrowUp className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" aria-hidden="true" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  )
}
