import { cn } from '@/utils/cn'

export function Badge({ className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md transition-colors',
        className,
      )}
      {...props}
    />
  )
}

export default Badge
