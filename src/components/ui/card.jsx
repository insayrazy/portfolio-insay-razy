import { cn } from '@/utils/cn'

export function Card({ className, ...props }) {
  return <div className={cn('glass relative rounded-3xl', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-2 p-6 sm:p-8', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('font-display text-xl font-semibold text-white', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm leading-relaxed text-slate-400', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0 sm:p-8 sm:pt-0', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('flex items-center gap-3 p-6 pt-0 sm:p-8 sm:pt-0', className)} {...props} />
}
