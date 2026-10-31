import useMediaQuery from '@/hooks/useMediaQuery'
import { MEDIA } from '@/utils/constants'

export default function usePrefersReducedMotion() {
  return useMediaQuery(MEDIA.reducedMotion)
}
