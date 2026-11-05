import { FaCss3Alt, FaHtml5 } from 'react-icons/fa'
import { DiMsqlServer } from 'react-icons/di'
import { VscVscode } from 'react-icons/vsc'
import {
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostman,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: { en: 'Interfaces that feel fast, fluid and accessible.', id: 'Antarmuka yang cepat, halus, dan aksesibel.' },
    skills: [
      { name: 'HTML5', level: 95, icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', level: 85, icon: FaCss3Alt, color: '#1572B6' },
      { name: 'JavaScript', level: 92, icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React', level: 85, icon: SiReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', level: 87, icon: SiTailwindcss, color: '#38BDF8' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: { en: 'Robust APIs, authentication and business logic.', id: 'API yang andal, autentikasi, dan logika bisnis.' },
    skills: [
      { name: 'Node.js', level: 88, icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', level: 85, icon: SiExpress, color: 'currentColor' },
      { name: 'Laravel', level: 80, icon: SiLaravel, color: '#FF2D20' },
      { name: 'PHP', level: 80, icon: SiPhp, color: '#8892BF' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    description: { en: 'Well-modelled relational data and fast queries.', id: 'Model data relasional yang rapi dan query yang cepat.' },
    skills: [
      { name: 'MySQL', level: 90, icon: SiMysql, color: '#4479A1' },
      { name: 'SQL Server', level: 90, icon: DiMsqlServer, color: '#CC2927' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    description: { en: 'A workflow tuned for collaboration and speed.', id: 'Alur kerja yang mendukung kolaborasi dan kecepatan.' },
    skills: [
      { name: 'Git', level: 99, icon: SiGit, color: '#F05032' },
      { name: 'GitHub', level: 99, icon: SiGithub, color: 'currentColor' },
      { name: 'VS Code', level: 99, icon: VscVscode, color: '#22A6F2' },
      { name: 'Postman', level: 75, icon: SiPostman, color: '#FF6C37' },
      { name: 'Figma', level: 40, icon: SiFigma, color: '#A259FF' },
    ],
  },
]

export const allSkills = skillCategories.flatMap((category) =>
  category.skills.map((skill) => ({ ...skill, category: category.id })),
)
