import { Clock, Cpu, FolderGit2, Rocket } from 'lucide-react'
import { projects } from '@/data/projects'

export const statistics = [
  {
    id: 'experience',
    value: 3,
    suffix: '+',
    label: { en: 'Years Experience', id: 'Tahun Pengalaman' },
    description: { en: 'Building web applications', id: 'Membangun aplikasi web' },
    icon: Rocket,
    progress: 75,
  },
  {
    id: 'projects',
    value: projects.length,
    suffix: '',
    label: { en: 'Projects Completed', id: 'Project Selesai' },
    description: { en: 'Live websites & internal tools', id: 'Website live & tools internal' },
    icon: FolderGit2,
    progress: 85,
  },
  {
    id: 'technologies',
    value: 15,
    suffix: '+',
    label: { en: 'Technologies', id: 'Teknologi' },
    description: { en: 'Across the JavaScript ecosystem', id: 'Di ekosistem JavaScript' },
    icon: Cpu,
    progress: 70,
  },
  {
    id: 'hours',
    value: 1000,
    suffix: '+',
    label: { en: 'Coding Hours', id: 'Jam Ngoding' },
    description: { en: 'And counting, every week', id: 'Dan terus bertambah tiap minggu' },
    icon: Clock,
    progress: 92,
  },
]
