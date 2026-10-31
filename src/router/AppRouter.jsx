import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from '@/components/PageTransition'
import useI18n from '@/hooks/useI18n'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import RootLayout from '@/layouts/RootLayout'
import { Home, NotFound, ProjectsPage, ROUTES } from '@/router/routes'

function PageFallback() {
  const { t } = useI18n()
  return (
    <div className="grid min-h-screen place-items-center" role="status" aria-label={t('a11y.loadingPage')}>
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
    </div>
  )
}

export default function AppRouter() {
  const location = useLocation()
  const { lenis } = useSmoothScroll()

  const handleExitComplete = () => {
    if (location.hash) return
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <RootLayout>
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
          <Routes location={location} key={location.pathname}>
            <Route
              path={ROUTES.home}
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path={ROUTES.projects}
              element={
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </RootLayout>
  )
}
