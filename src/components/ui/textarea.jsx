import { cn } from '@/utils/cn'

export function Textarea({ className, ref, ...props }) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'peer min-h-[160px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 pb-4 pt-7 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-transparent hover:border-white/20 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:ring-4 focus:ring-indigo-500/15 aria-[invalid=true]:border-rose-400/60',
        className,
      )}
      {...props}
    />
  )
}

export default Textarea
