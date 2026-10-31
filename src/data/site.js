import profileImage from '@/assets/images/profile.svg';

/**
 * Global site configuration. Update personal links here — every component
 * (hero, contact, footer, SEO helpers) reads from this single source.
 * Translatable fields use `{ en, id }`.
 */
export const site = {
  name: 'Insay Razy',
  brand: 'INSAY RAZY',
  role: { en: 'Fullstack JavaScript Developer', id: 'Fullstack JavaScript Developer' },
  url: 'https://insayrazy.vercel.app',
  description: {
    en: 'Insay Razy is a Fullstack JavaScript Developer and Hacktiv8 graduate building fast, scalable, and beautifully crafted web applications with React, Node.js, Express, and Laravel.',
    id: 'Insay Razy adalah Fullstack JavaScript Developer lulusan Hacktiv8 yang membangun aplikasi web cepat, scalable, dan dirancang dengan cermat menggunakan React, Node.js, Express, dan Laravel.',
  },
  tagline: {
    en: 'Hacktiv8 Fullstack JavaScript graduate. I design and engineer fast, accessible, and scalable web applications — from pixel-perfect interfaces to robust REST APIs.',
    id: 'Lulusan Fullstack JavaScript Hacktiv8. Saya merancang dan membangun aplikasi web yang cepat, aksesibel, dan scalable — dari antarmuka yang presisi hingga REST API yang andal.',
  },
  location: { en: 'Tegal, Indonesia', id: 'Tegal, Indonesia' },
  timezone: 'GMT+7 (WIB)',
  email: 'razy.razz8@gmail.com',
  phone: '+62 877-9478-9598',
  availability: { en: 'freelance roles', id: 'freelance' },
  cvUrl: 'https://drive.google.com/file/d/18rwLVPbCCI21hYiNQUTievdLFQtfG-y6/view?usp=sharing',
  profileImage,
  mapEmbedUrl: 'https://www.google.com/maps?q=Jakarta%2C%20Indonesia&z=11&output=embed',
  socials: {
    github: 'https://github.com/insayrazy',
    linkedin: 'https://www.linkedin.com/in/insayrazy',
    instagram: 'https://www.instagram.com/raaaaazyy',
    whatsapp: 'https://wa.me/6287794789598',
  },
};

export const typingRoles = {
  en: [
    'Fullstack JavaScript Developer',
    'Hacktiv8 Graduate',
  ],
  id: [
    'Fullstack JavaScript Developer',
    'Lulusan Hacktiv8',
  ],
};
