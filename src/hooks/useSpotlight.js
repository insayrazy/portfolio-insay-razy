import { useCallback } from 'react'

/** Pointer handler that feeds the `.spotlight` CSS class its coordinates. */
export default function useSpotlight() {
  return useCallback((event) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }, [])
}
