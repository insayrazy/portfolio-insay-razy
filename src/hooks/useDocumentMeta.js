import { useEffect } from 'react'
import { site } from '@/data/site'
import useI18n from '@/hooks/useI18n'

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

/** Updates title, description, locale and canonical URL for the current route and language. */
export default function useDocumentMeta({ title, description, path = '/' } = {}) {
  const { lang, tr } = useI18n()
  const role = tr(site.role)
  const fallbackDescription = tr(site.description)

  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} — ${role}`
    const url = new URL(path, site.url).toString()
    const metaDescription = description ?? fallbackDescription
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', metaDescription)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', metaDescription)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', metaDescription)
    setMeta('meta[property="og:locale"]', 'content', lang === 'id' ? 'id_ID' : 'en_US')
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [title, description, path, lang, role, fallbackDescription])
}
