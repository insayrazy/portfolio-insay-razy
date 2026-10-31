import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/animations/gsap'
import AuroraBackground from '@/components/background/AuroraBackground'
import ScrollBackground from '@/components/background/ScrollBackground'
import CursorEffects from '@/components/CursorEffects'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import useI18n from '@/hooks/useI18n'
import useLoader from '@/hooks/useLoader'
import Footer from '@/sections/Footer'

export default function RootLayout({ children }) {
  const { isLoaded } = useLoader()
  const { t, lang } = useI18n()
  const { pathname } = useLocation()

  // Re-measure scroll-driven animations whenever layout may have shifted.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const timeout = setTimeout(refresh, 900)
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', refresh)
    }
  }, [isLoaded, pathname, lang])

  return (
    <>
      <a href="#main" className="skip-link">
        {t('a11y.skipToContent')}
      </a>
      <Loader />
      <AuroraBackground />
      <ScrollBackground />
      <CursorEffects />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative overflow-x-clip outline-none">
        {children}
      </main>
      <Footer />
    </>
  )
}
