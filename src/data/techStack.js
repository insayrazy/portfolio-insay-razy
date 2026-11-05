import { FaCss3Alt, FaHtml5 } from 'react-icons/fa'
import { DiMsqlServer } from 'react-icons/di'
import { VscVscode } from 'react-icons/vsc'
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGreensock,
  SiJavascript,
  SiJsonwebtokens,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNodedotjs,
  SiNpm,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedux,
  SiReactrouter,
  SiSequelize,
  SiTailwindcss,
  SiThreedotjs,
  SiVercel,
  SiVite,
} from 'react-icons/si'

export const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', group: 'Language' },
  { name: 'HTML5', icon: FaHtml5, color: '#E34F26', group: 'Language' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', group: 'Language' },
  { name: 'PHP', icon: SiPhp, color: '#8892BF', group: 'Language' },
  { name: 'React', icon: SiReact, color: '#61DAFB', group: 'Frontend' },
  { name: 'React Router', icon: SiReactrouter, color: '#F44250', group: 'Frontend' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC', group: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', group: 'Frontend' },
  { name: 'Vite', icon: SiVite, color: '#A855F7', group: 'Frontend' },
  { name: 'GSAP', icon: SiGreensock, color: '#88CE02', group: 'Motion' },
  { name: 'Framer Motion', icon: SiFramer, color: 'currentColor', group: 'Motion' },
  { name: 'Three.js', icon: SiThreedotjs, color: 'currentColor', group: 'Motion' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', group: 'Backend' },
  { name: 'Express.js', icon: SiExpress, color: 'currentColor', group: 'Backend' },
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20', group: 'Backend' },
  { name: 'Sequelize', icon: SiSequelize, color: '#52B0E7', group: 'Backend' },
  { name: 'JWT', icon: SiJsonwebtokens, color: '#D63AFF', group: 'Backend' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1', group: 'Database' },
  { name: 'SQL Server', icon: DiMsqlServer, color: '#CC2927', group: 'Database' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', group: 'Database' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248', group: 'Database' },
  { name: 'Git', icon: SiGit, color: '#F05032', group: 'Tools' },
  { name: 'GitHub', icon: SiGithub, color: 'currentColor', group: 'Tools' },
  { name: 'VS Code', icon: VscVscode, color: '#22A6F2', group: 'Tools' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37', group: 'Tools' },
  { name: 'Figma', icon: SiFigma, color: '#A259FF', group: 'Tools' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED', group: 'Tools' },
  { name: 'npm', icon: SiNpm, color: '#CB3837', group: 'Tools' },
  { name: 'Vercel', icon: SiVercel, color: 'currentColor', group: 'Deploy' },
  { name: 'Netlify', icon: SiNetlify, color: '#32E6E2', group: 'Deploy' },
]

const half = Math.ceil(techStack.length / 2)
export const techMarqueeRows = [techStack.slice(0, half), techStack.slice(half)]

export const coreStack = techStack.filter((tech) =>
  ['JavaScript', 'React', 'Tailwind CSS', 'Node.js', 'Express.js', 'Laravel', 'MySQL', 'SQL Server', 'Git', 'Vite', 'GSAP', 'Figma'].includes(
    tech.name,
  ),
)
