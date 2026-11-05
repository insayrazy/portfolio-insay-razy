import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'
import { LANGUAGE_LABELS, LANGUAGES } from '@/utils/i18n'

/** Segmented ID / EN toggle with a sliding pill. */
export default function LanguageSwitcher({ className }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t('a11y.chooseLanguage')}
      className={cn('flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl', className)}
    >
      <Languages className="ml-1.5 hidden h-4 w-4 text-slate-400 sm:block" aria-hidden="true" />
      {LANGUAGES.map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={LANGUAGE_LABELS[code].name}
            lang={code}
            className={cn(
              'relative isolate h-8 min-w-[2.5rem] rounded-full px-2.5 text-xs font-semibold tracking-wider transition-colors duration-300',
              active ? 'text-pure' : 'text-slate-400 hover:text-white',
            )}
          >
            {active ? (
              <motion.span
                layoutId="language-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-primary shadow-glow"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            ) : null}
            {LANGUAGE_LABELS[code].short}
          </button>
        )
      })}
    </div>
  )
}
