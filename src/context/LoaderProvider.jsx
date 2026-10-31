import { useCallback, useEffect, useMemo, useState } from 'react'
import { LoaderContext } from '@/context/contexts'

export default function LoaderProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false)

  const completeLoading = useCallback(() => setIsLoaded(true), [])

  // Lock native scrolling while the intro plays.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-loading', !isLoaded)
    return () => root.classList.remove('is-loading')
  }, [isLoaded])

  const value = useMemo(() => ({ isLoaded, completeLoading }), [isLoaded, completeLoading])

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
}
