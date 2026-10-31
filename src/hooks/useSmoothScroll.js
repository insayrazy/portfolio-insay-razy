import { useContext } from 'react'
import { SmoothScrollContext } from '@/context/contexts'

export default function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}
