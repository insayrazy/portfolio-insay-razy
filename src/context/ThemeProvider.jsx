import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/context/contexts'

const STORAGE_KEY = 'portfolio-theme'
const THEME_COLORS = { dark: '#050816', light: '#F1F5FB' }

/**
 * Dark is the default. The saved choice is applied by an inline script in
 * index.html before first paint, so this only reads the result.
 */
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage failures — the choice still applies for this visit.
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
