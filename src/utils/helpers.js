export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export const lerp = (start, end, amount) => start + (end - start) * amount

export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Math.round(value))

export const padIndex = (index) => String(index).padStart(2, '0')

export const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim())

/** Split a string into words while keeping spacing information. */
export const splitWords = (text) => text.split(' ').filter((word) => word.length > 0)

/** Split a string into characters, mapping spaces to non-breaking spaces. */
export const splitChars = (text) => Array.from(text).map((char) => (char === ' ' ? ' ' : char))
