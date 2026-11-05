import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import useI18n from '@/hooks/useI18n'
import useTheme from '@/hooks/useTheme'

/** Sun / moon button that switches between the dark and light themes. */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  const Icon = isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('a11y.switchToLight') : t('a11y.switchToDark')}
      className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition-colors duration-300 hover:border-white/25 hover:text-white"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 16, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -16, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
