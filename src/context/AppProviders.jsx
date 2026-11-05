import { MotionConfig } from 'framer-motion'
import LanguageProvider from '@/context/LanguageProvider'
import LoaderProvider from '@/context/LoaderProvider'
import SmoothScrollProvider from '@/context/SmoothScrollProvider'
import ThemeProvider from '@/context/ThemeProvider'

export default function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <LoaderProvider>
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </LoaderProvider>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
