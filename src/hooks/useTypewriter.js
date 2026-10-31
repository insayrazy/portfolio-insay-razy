import { useEffect, useState } from 'react'

/**
 * Cycles through `words`, typing and deleting each one.
 * `words` must be a stable reference (e.g. imported from src/data).
 */
export default function useTypewriter(
  words,
  { typeSpeed = 70, deleteSpeed = 38, pause = 1800, enabled = true } = {},
) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!enabled || words.length === 0) return undefined

    const current = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((index) => (index + 1) % words.length)
      }, 280)
    } else {
      timeout = setTimeout(
        () => setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
        isDeleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pause, enabled])

  return { text, wordIndex, isDeleting }
}
