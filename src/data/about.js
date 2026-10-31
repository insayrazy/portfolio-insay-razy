import { Gauge, Layers, MonitorSmartphone, Sparkles } from 'lucide-react'
import { site } from '@/data/site'

export const aboutIntro = {
  en: 'I am a Fullstack JavaScript Developer and Hacktiv8 graduate with a passion for building modern, responsive, scalable, and user-friendly web applications.',
  id: 'Saya adalah Fullstack JavaScript Developer lulusan Hacktiv8 yang bersemangat membangun aplikasi web yang modern, responsif, scalable, dan user-friendly.',
}

// Words rendered with the gradient in the scroll-highlighted intro.
export const aboutHighlightWords = {
  en: ['Fullstack', 'JavaScript', 'Developer', 'Hacktiv8', 'modern,', 'scalable,', 'user-friendly'],
  id: ['Fullstack', 'JavaScript', 'Developer', 'Hacktiv8', 'modern,', 'scalable,', 'user-friendly.'],
}

export const aboutParagraphs = [
  {
    en: 'I enjoy both sides of the stack — crafting fluid, accessible interfaces with React and Tailwind CSS, and designing reliable back-end services with Node.js, Express, and Laravel backed by well-structured MySQL and SQL Server databases.',
    id: 'Saya menyukai Frontend maupun Backend Development — membangun antarmuka yang halus dan aksesibel dengan React dan Tailwind CSS, serta merancang layanan backend yang andal dengan Node.js, Express, dan Laravel di atas database MySQL dan SQL Server yang terstruktur.',
  },
  {
    en: 'I always prioritise clean code, application performance, maintainability, and a great user experience. Every feature I ship is built to be readable for the next engineer and delightful for the end user.',
    id: 'Saya selalu mengutamakan clean code, performa aplikasi, maintainability, dan pengalaman pengguna. Setiap fitur yang saya bangun dibuat agar mudah dibaca oleh engineer berikutnya dan menyenangkan bagi pengguna.',
  },
  {
    en: 'I love learning new technologies and continuously sharpening my craft as a software engineer — from architecture patterns and testing to motion design and web performance.',
    id: 'Saya senang mempelajari teknologi baru dan terus meningkatkan kemampuan sebagai software engineer — dari pola arsitektur dan testing hingga motion design dan performa web.',
  },
]

export const aboutFacts = [
  { label: { en: 'Name', id: 'Nama' }, value: site.name },
  { label: { en: 'Role', id: 'Peran' }, value: site.role },
  { label: { en: 'Education', id: 'Pendidikan' }, value: { en: 'Hacktiv8 FSJS Graduate', id: 'Lulusan Hacktiv8 FSJS' } },
  { label: { en: 'Location', id: 'Lokasi' }, value: site.location },
  { label: { en: 'Email', id: 'Email' }, value: site.email, href: `mailto:${site.email}` },
  { label: { en: 'Status', id: 'Status' }, value: site.availability, highlight: true },
]

export const aboutHighlights = [
  {
    icon: Sparkles,
    title: { en: 'Clean Code', id: 'Clean Code' },
    description: {
      en: 'Readable, modular and tested code that scales with the team.',
      id: 'Kode yang rapi, modular, dan teruji sehingga mudah dikembangkan tim.',
    },
  },
  {
    icon: Gauge,
    title: { en: 'Performance', id: 'Performa' },
    description: {
      en: 'Lighthouse-driven builds, lazy loading and lean bundles.',
      id: 'Build berbasis Lighthouse, lazy loading, dan bundle yang ringan.',
    },
  },
  {
    icon: Layers,
    title: { en: 'Scalable Architecture', id: 'Arsitektur Scalable' },
    description: {
      en: 'Clear layers, reusable components and maintainable APIs.',
      id: 'Lapisan yang jelas, komponen reusable, dan API yang mudah dirawat.',
    },
  },
  {
    icon: MonitorSmartphone,
    title: { en: 'User Experience', id: 'Pengalaman Pengguna' },
    description: {
      en: 'Responsive, accessible interfaces with meaningful motion.',
      id: 'Antarmuka responsif dan aksesibel dengan animasi yang bermakna.',
    },
  },
]
