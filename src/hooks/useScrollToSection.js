import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useSmoothScroll from '@/hooks/useSmoothScroll'

/**
 * Scrolls to a section on the home page. When called from another route,
 * navigates home with the hash and lets the Home page finish the scroll.
 */
export default function useScrollToSection() {
  const { scrollTo } = useSmoothScroll()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return useCallback(
    (id) => {
      if (pathname !== '/') {
        navigate(id === 'home' ? '/' : `/#${id}`)
        return
      }
      if (id === 'home') scrollTo('top')
      else scrollTo(id)
    },
    [pathname, navigate, scrollTo],
  )
}
