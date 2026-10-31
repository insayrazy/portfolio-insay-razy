export const LANGUAGES = ['id', 'en']
export const DEFAULT_LANGUAGE = 'id'

export const LANGUAGE_LABELS = {
  id: { short: 'ID', name: 'Bahasa Indonesia' },
  en: { short: 'EN', name: 'English' },
}

const isLocalized = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value) && 'en' in value && 'id' in value

/**
 * Resolve a bilingual value. Data files store translatable fields as
 * `{ en: '...', id: '...' }`; anything else is returned unchanged.
 */
export function localize(value, lang) {
  return isLocalized(value) ? (value[lang] ?? value.en) : value
}

/** Read a dotted key ("hero.viewProjects") from a nested dictionary. */
export function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary)
}

/** Replace {placeholders} in a string. */
export function interpolate(text, vars) {
  if (!vars || typeof text !== 'string') return text
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? String(vars[name]) : match))
}
