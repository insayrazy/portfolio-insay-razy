import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, Send, TriangleAlert } from 'lucide-react'
import { defaultViewport, staggerContainer, staggerItem } from '@/animations/variants'
import Magnetic from '@/components/Magnetic'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { site } from '@/data/site'
import { socials } from '@/data/socials'
import useI18n from '@/hooks/useI18n'
import useSpotlight from '@/hooks/useSpotlight'
import { isEmail } from '@/utils/helpers'

const INITIAL_VALUES = { name: '', email: '', message: '' }
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT

// Errors are stored as translation keys so they follow language changes.
function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'contact.errorName'
  if (!isEmail(values.email)) errors.email = 'contact.errorEmail'
  if (values.message.trim().length < 10) errors.message = 'contact.errorMessage'
  return errors
}

function FieldError({ id, message }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-2 text-xs text-rose-300"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  )
}

export default function Contact() {
  const { t, tr } = useI18n()
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const handleSpotlight = useSpotlight()
  const location = tr(site.location)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
    if (status !== 'idle' && status !== 'sending') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = event.currentTarget.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)
      firstInvalid?.focus()
      return
    }

    setStatus('sending')
    try {
      if (CONTACT_ENDPOINT) {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      } else {
        const subject = encodeURIComponent(t('contact.mailSubject', { name: values.name }))
        const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      }
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch {
      setStatus('error')
    }
  }

  const contactItems = [
    { icon: Mail, label: t('contact.email'), value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: t('contact.location'), value: location },
    { icon: Clock, label: t('contact.timezone'), value: site.timezone },
  ]

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div id="contact-heading">
          <SectionHeading
            index="10"
            eyebrow={t('contact.eyebrow')}
            title={t('contact.title')}
            highlight={t('contact.highlight')}
            description={t('contact.description')}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Info column */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal variant="fadeLeft">
              <div className="glass-strong gradient-border rounded-3xl p-7 sm:p-8">
                <ul className="flex flex-col gap-5">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-glow">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
                        {href ? (
                          <a href={href} className="block break-all font-medium text-white underline-offset-4 hover:text-cyan-200 hover:underline">
                            {value}
                          </a>
                        ) : (
                          <span className="block font-medium text-white">{value}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <motion.ul
              className="grid grid-cols-2 gap-4"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              aria-label={t('a11y.socialMedia')}
            >
              {socials.map(({ id, label, handle, href, icon: Icon, color }) => (
                <motion.li key={id} variants={staggerItem}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseMove={handleSpotlight}
                    style={{ '--brand': color }}
                    className="spotlight glass group flex h-full flex-col gap-4 rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--brand)] hover:shadow-[0_20px_40px_-20px_var(--brand)]"
                  >
                    <span className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-slate-300 transition-colors duration-500 group-hover:text-[color:var(--brand)]" aria-hidden="true" />
                      <ArrowUpRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold text-white">{label}</span>
                      <span className="block truncate text-xs text-slate-400">{handle}</span>
                    </span>
                    <span className="sr-only">{t('a11y.newTab')}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <Reveal variant="maskUp">
              <div className="glass relative h-64 overflow-hidden rounded-3xl">
                <iframe
                  title={t('contact.map', { location })}
                  src={site.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="map-frame h-full w-full border-0 opacity-80"
                />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
                <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-night/80 px-4 py-2 text-xs font-medium backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-cyan-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                  </span>
                  {location}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal variant="fadeRight" className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="glass-strong animated-border relative flex h-full flex-col gap-5 rounded-3xl p-7 sm:p-10"
              aria-describedby="contact-form-note"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold">{t('contact.formTitle')}</h3>
                <p id="contact-form-note" className="mt-1 text-sm text-slate-400">
                  {t('contact.formNote')}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <Input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder=" "
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    required
                  />
                  <Label htmlFor="contact-name">{t('contact.name')}</Label>
                  <FieldError id="contact-name-error" message={errors.name && t(errors.name)} />
                </div>
                <div className="relative">
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder=" "
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    required
                  />
                  <Label htmlFor="contact-email">{t('contact.emailField')}</Label>
                  <FieldError id="contact-email-error" message={errors.email && t(errors.email)} />
                </div>
              </div>

              <div className="relative flex-1">
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder=" "
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className="h-full min-h-[200px]"
                  required
                />
                <Label htmlFor="contact-message">{t('contact.message')}</Label>
                <FieldError id="contact-message-error" message={errors.message && t(errors.message)} />
              </div>

              <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div aria-live="polite" className="min-h-[1.5rem] text-sm">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.p key="success" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        {CONTACT_ENDPOINT ? t('contact.success') : t('contact.successMailto')}
                      </motion.p>
                    ) : null}
                    {status === 'error' ? (
                      <motion.p key="error" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-rose-300">
                        <TriangleAlert className="h-4 w-4" aria-hidden="true" />
                        {t('contact.error')}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>

                <Magnetic>
                  <Button type="submit" size="lg" disabled={status === 'sending'} className="min-w-[180px]">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.send')}
                        <Send className="transition-transform duration-500 ease-out-expo group-hover/button:-translate-y-1 group-hover/button:translate-x-1" />
                      </>
                    )}
                  </Button>
                </Magnetic>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
