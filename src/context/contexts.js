import { createContext } from 'react'

/** Holds the Lenis instance and a `scrollTo` helper. */
export const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: () => {},
})

/** Tracks whether the intro loading screen has finished. */
export const LoaderContext = createContext({
  isLoaded: false,
  completeLoading: () => {},
})

/** Active UI language ('en' | 'id'). */
export const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
})
