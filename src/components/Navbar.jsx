import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EASE_OUT_EXPO } from '@/animations/easings'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Logo from '@/components/Logo'
import Magnetic from '@/components/Magnetic'
import MobileMenu from '@/components/MobileMenu'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { navLinks, navSectionIds } from '@/data/navigation'
import { site } from '@/data/site'
import useActiveSection from '@/hooks/useActiveSection'
import useI18n from '@/hooks/useI18n'
import useLoader from '@/hooks/useLoader'
import useScrollToSection from '@/hooks/useScrollToSection'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import { cn } from '@/utils/cn'

export default function Navbar() {
  const { isLoaded } = useLoader()
  const { lenis, scrollTo } = useSmoothScroll()
  const { t, tr } = useI18n()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const goToSection = useScrollToSection()
  const active = useActiveSection(navSectionIds, isHome)
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 40)
    setHidden(latest > previous && latest > 480)
  })

  // Freeze page scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [menuOpen, lenis])

  const handleNavigate = (id) => {
    setMenuOpen(false)
    goToSection(id)
  }

  const handleLogoClick = (event) => {
    if (isHome) {
      event.preventDefault()
      scrollTo('top')
    }
    setMenuOpen(false)
  }

  const visible = isLoaded && (!hidden || menuOpen)

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : { y: -120, opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
      >
        <nav
          aria-label={t('a11y.primaryNav')}
          className={cn(
            'flex w-full max-w-6xl items-center justify-between gap-2 rounded-full py-2 pl-3 pr-2 transition-all duration-500 ease-out-expo sm:pl-4',
            scrolled || menuOpen ? 'glass-strong' : 'border border-transparent bg-transparent',
          )}
        >
          <Link to="/" onClick={handleLogoClick} aria-label={t('a11y.backHome', { name: site.name })} className="min-w-0 rounded-full">
            <Logo className="[&>span]:hidden min-[400px]:[&>span]:inline" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = isHome && active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavigate(link.id)
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative isolate block rounded-full px-3 py-2 text-sm transition-colors duration-300 xl:px-4',
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white',
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {tr(link.label)}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />

            <Magnetic className="hidden md:inline-block lg:hidden xl:inline-block">
              <Button size="sm" onClick={() => handleNavigate('contact')}>
                {t('nav.letsTalk')}
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:rotate-45" />
              </Button>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-500 ease-out-expo',
                    menuOpen ? 'top-[5px] rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-0.5 rounded-full bg-white transition-all duration-500 ease-out-expo',
                    menuOpen ? 'top-[5px] w-5 -rotate-45' : 'top-[10px] w-3',
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} active={isHome ? active : null} onNavigate={handleNavigate} />
    </>
  )
}
