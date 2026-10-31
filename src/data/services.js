import { Code2, Database, Layers, MonitorSmartphone, Server, Wrench } from 'lucide-react'

export const services = [
  {
    id: 'frontend',
    icon: Code2,
    title: { en: 'Frontend Development', id: 'Frontend Development' },
    description: {
      en: 'Pixel-perfect, accessible React interfaces with smooth motion, reusable components and lightning-fast load times.',
      id: 'Antarmuka React yang presisi dan aksesibel dengan animasi halus, komponen reusable, dan waktu muat super cepat.',
    },
    features: {
      en: ['React & Tailwind CSS', 'Design-system components', 'Animation & micro-interactions'],
      id: ['React & Tailwind CSS', 'Komponen design system', 'Animasi & micro-interaction'],
    },
  },
  {
    id: 'backend',
    icon: Server,
    title: { en: 'Backend Development', id: 'Backend Development' },
    description: {
      en: 'Secure, well-structured server applications with Node.js, Express and Laravel, designed for reliability and growth.',
      id: 'Aplikasi server yang aman dan terstruktur dengan Node.js, Express, dan Laravel, dirancang andal dan siap berkembang.',
    },
    features: {
      en: ['Node.js / Express / Laravel', 'Auth & role management', 'Validation & error handling'],
      id: ['Node.js / Express / Laravel', 'Autentikasi & manajemen role', 'Validasi & error handling'],
    },
  },
  {
    id: 'fullstack',
    icon: Layers,
    title: { en: 'Fullstack Development', id: 'Fullstack Development' },
    description: {
      en: 'End-to-end product delivery — from database schema and APIs to polished UI, testing and deployment.',
      id: 'Pengembangan produk end-to-end — dari skema database dan API hingga UI yang rapi, testing, dan deployment.',
    },
    features: {
      en: ['Architecture & planning', 'Database design', 'CI/CD & deployment'],
      id: ['Arsitektur & perencanaan', 'Desain database', 'CI/CD & deployment'],
    },
  },
  {
    id: 'api',
    icon: Database,
    title: { en: 'REST API Development', id: 'REST API Development' },
    description: {
      en: 'Documented, versioned RESTful APIs with pagination, rate limiting and automated tests ready for any client.',
      id: 'RESTful API terdokumentasi dan berversi dengan pagination, rate limiting, dan automated test untuk klien apa pun.',
    },
    features: {
      en: ['OpenAPI / Swagger docs', 'JWT & OAuth security', 'Automated testing'],
      id: ['Dokumentasi OpenAPI / Swagger', 'Keamanan JWT & OAuth', 'Automated testing'],
    },
  },
  {
    id: 'responsive',
    icon: MonitorSmartphone,
    title: { en: 'Responsive Website', id: 'Website Responsif' },
    description: {
      en: 'Websites that look and feel premium on every screen, optimised for Core Web Vitals and SEO from day one.',
      id: 'Website yang tampil premium di setiap layar, dioptimalkan untuk Core Web Vitals dan SEO sejak awal.',
    },
    features: {
      en: ['Mobile-first layouts', 'SEO & Open Graph', 'Lighthouse 90+'],
      id: ['Layout mobile-first', 'SEO & Open Graph', 'Lighthouse 90+'],
    },
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: { en: 'Website Maintenance', id: 'Maintenance Website' },
    description: {
      en: 'Ongoing updates, bug fixes, performance tuning and security patches to keep your product healthy.',
      id: 'Pembaruan rutin, perbaikan bug, optimasi performa, dan patch keamanan agar produk tetap sehat.',
    },
    features: {
      en: ['Bug fixing & refactoring', 'Performance audits', 'Dependency updates'],
      id: ['Perbaikan bug & refactoring', 'Audit performa', 'Update dependency'],
    },
  },
]
