import { cn } from '@/utils/cn'

export function Input({ className, type = 'text', ref, ...props }) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'peer h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 pt-5 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-transparent hover:border-white/20 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/15 aria-[invalid=true]:border-rose-400/60',
        className,
      )}
      {...props}
    />
  )
}

export default Input
