import { Slot } from '@radix-ui/react-slot'
import { buttonVariants } from '@/components/ui/button-variants'
import { cn } from '@/utils/cn'

/** shadcn/ui Button (JavaScript). React 19 passes `ref` as a regular prop. */
export function Button({ className, variant, size, asChild = false, ref, ...props }) {
  const Component = asChild ? Slot : 'button'
  return <Component ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export default Button
