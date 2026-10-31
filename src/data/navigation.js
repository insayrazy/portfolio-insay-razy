export const navLinks = [
  { id: 'about', label: { en: 'About', id: 'Tentang' } },
  { id: 'skills', label: { en: 'Skills', id: 'Keahlian' } },
  { id: 'experience', label: { en: 'Experience', id: 'Pengalaman' } },
  { id: 'projects', label: { en: 'Projects', id: 'Project' } },
  { id: 'services', label: { en: 'Services', id: 'Layanan' } },
  { id: 'contact', label: { en: 'Contact', id: 'Kontak' } },
]

export const footerLinks = [
  { id: 'about', label: { en: 'About', id: 'Tentang' } },
  { id: 'skills', label: { en: 'Skills', id: 'Keahlian' } },
  { id: 'tech-stack', label: { en: 'Tech Stack', id: 'Tech Stack' } },
  { id: 'experience', label: { en: 'Experience', id: 'Pengalaman' } },
  { id: 'projects', label: { en: 'Projects', id: 'Project' } },
  { id: 'certificates', label: { en: 'Certificates', id: 'Sertifikat' } },
  { id: 'services', label: { en: 'Services', id: 'Layanan' } },
  { id: 'faq', label: { en: 'FAQ', id: 'FAQ' } },
  { id: 'contact', label: { en: 'Contact', id: 'Kontak' } },
]

// 'home' is tracked too so no link is highlighted while the hero is in view.
export const navSectionIds = ['home', ...navLinks.map((link) => link.id)]
