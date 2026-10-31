import { useCallback, useContext } from 'react'
import { LanguageContext } from '@/context/contexts'
import { translations } from '@/data/translations'
import { interpolate, localize, lookup } from '@/utils/i18n'

/**
 * t('section.key', vars)  → UI string from src/data/translations.js
 * tr({ en, id })          → bilingual value from any data file
 */
export default function useI18n() {
  const { lang, setLang } = useContext(LanguageContext)

  const t = useCallback(
    (key, vars) => {
      const value = lookup(translations[lang], key) ?? lookup(translations.en, key) ?? key
      return interpolate(value, vars)
    },
    [lang],
  )

  const tr = useCallback((value) => localize(value, lang), [lang])

  return { lang, setLang, t, tr }
}
