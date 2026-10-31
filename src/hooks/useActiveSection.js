import { useEffect, useState } from 'react'

/** Returns the id of the section currently crossing the middle of the viewport. */
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return undefined
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids, enabled])

  return active
}
