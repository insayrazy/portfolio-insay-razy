import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/utils/cn'

/**
 * Floating label — place it *after* an <Input /> or <Textarea /> with the `peer`
 * class so it can react to focus and placeholder-shown states.
 */
export function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'pointer-events-none absolute left-5 top-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 transition-all duration-300 peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-cyan-300',
        className,
      )}
      {...props}
    />
  )
}

export default Label
