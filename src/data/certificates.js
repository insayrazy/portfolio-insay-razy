import { Blocks, Code2, Rocket, Server } from 'lucide-react'

/**
 * Hacktiv8 credential. Links point to Google Drive — make sure each file is
 * shared as "Anyone with the link can view" so visitors can open it.
 */
export const hacktiv8Credential = {
  id: 'hacktiv8-fsjs',
  program: {
    en: 'Fullstack JavaScript Immersive Bootcamp',
    id: 'Bootcamp Fullstack JavaScript Immersive',
  },
  issuer: 'Hacktiv8 Indonesia',
  status: { en: 'Graduate', id: 'Lulus' },
  description: {
    en: 'An intensive, full-time and project-based program to become a professional fullstack JavaScript developer — from fundamentals and algorithms to REST APIs, React applications, testing and team collaboration.',
    id: 'Program intensif, full-time, dan berbasis project untuk menjadi fullstack JavaScript developer profesional — dari fundamental dan algoritma hingga REST API, aplikasi React, testing, dan kolaborasi tim.',
  },
  skills: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'React', 'REST API', 'Jest'],
  certificateUrl: 'https://drive.google.com/file/d/1qVzTce9X-tnhJUfyQ55fvDKM2VxAmKYp/view',
  transcriptUrl: 'https://drive.google.com/file/d/1KABn4fY_ySebBa8So343-gvKMzpxote7/view',
  accent: ['#F97316', '#EF4444'],
}

/** Curriculum highlights shown as cards in the horizontal scroll. */
export const curriculum = [
  {
    id: 'phase-0',
    phase: 'Phase 0',
    icon: Code2,
    title: { en: 'Foundations', id: 'Fondasi' },
    description: {
      en: 'Programming fundamentals and the developer workflow.',
      id: 'Dasar pemrograman dan alur kerja developer.',
    },
    topics: ['JavaScript Fundamentals', 'HTML & CSS', 'Git & GitHub', 'Problem Solving'],
    accent: ['#3B82F6', '#22D3EE'],
  },
  {
    id: 'phase-1',
    phase: 'Phase 1',
    icon: Server,
    title: { en: 'Backend Fundamentals', id: 'Dasar Backend' },
    description: {
      en: 'Algorithms, OOP and server-side applications with a relational database.',
      id: 'Algoritma, OOP, dan aplikasi server-side dengan database relasional.',
    },
    topics: ['Algorithms', 'OOP', 'Node.js', 'Express', 'PostgreSQL', 'Sequelize'],
    accent: ['#6366F1', '#A855F7'],
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    icon: Blocks,
    title: { en: 'Fullstack Applications', id: 'Aplikasi Fullstack' },
    description: {
      en: 'REST APIs, authentication, testing and modern client-side apps.',
      id: 'REST API, autentikasi, testing, dan aplikasi client-side modern.',
    },
    topics: ['REST API', 'JWT & OAuth', 'TDD with Jest', 'React', 'Deployment'],
    accent: ['#8B5CF6', '#EC4899'],
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    icon: Rocket,
    title: { en: 'Advanced & Final Project', id: 'Lanjutan & Final Project' },
    description: {
      en: 'Scalable architecture and a team capstone project presented on demo day.',
      id: 'Arsitektur scalable dan capstone project tim yang dipresentasikan saat demo day.',
    },
    topics: ['State Management', 'Microservices', 'Team Project', 'Agile / Scrum'],
    accent: ['#22D3EE', '#10B981'],
  },
]
