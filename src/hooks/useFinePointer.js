import useMediaQuery from '@/hooks/useMediaQuery'
import { MEDIA } from '@/utils/constants'

/** True on devices with a precise hovering pointer (mouse / trackpad). */
export default function useFinePointer() {
  return useMediaQuery(MEDIA.finePointer)
}
