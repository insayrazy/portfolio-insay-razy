import { useContext } from 'react'
import { ThemeContext } from '@/context/contexts'

export default function useTheme() {
  return useContext(ThemeContext)
}
