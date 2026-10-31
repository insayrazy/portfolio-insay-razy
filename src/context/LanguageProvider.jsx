import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext } from '@/context/contexts'
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/utils/i18n'

const STORAGE_KEY = 'portfolio-lang'

function detectLanguage() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.includes(stored)) return stored
  } catch {
    // Storage can be unavailable (private mode); fall back to the browser language.
  }
  const browser = (navigator.language || '').toLowerCase()
  if (browser.startsWith('id') || browser.startsWith('ms')) return 'id'
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LANGUAGE
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage)

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Ignore storage failures — the choice still applies for this visit.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
