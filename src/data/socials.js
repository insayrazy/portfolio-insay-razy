import { FaGithub, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { site } from '@/data/site'

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@insayrazy',
    href: site.socials.github,
    icon: FaGithub,
    color: 'currentColor',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/insayrazy',
    href: site.socials.linkedin,
    icon: FaLinkedinIn,
    color: '#0A66C2',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@raaaaazyy',
    href: site.socials.instagram,
    icon: FaInstagram,
    color: '#E1306C',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: site.phone,
    href: site.socials.whatsapp,
    icon: FaWhatsapp,
    color: '#25D366',
  },
]
