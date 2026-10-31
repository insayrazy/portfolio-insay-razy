import { useContext } from 'react'
import { LoaderContext } from '@/context/contexts'

export default function useLoader() {
  return useContext(LoaderContext)
}
