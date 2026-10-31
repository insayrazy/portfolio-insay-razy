import { MotionConfig } from 'framer-motion'
import LanguageProvider from '@/context/LanguageProvider'
import LoaderProvider from '@/context/LoaderProvider'
import SmoothScrollProvider from '@/context/SmoothScrollProvider'

export default function AppProviders({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <LoaderProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LoaderProvider>
      </LanguageProvider>
    </MotionConfig>
  )
}
