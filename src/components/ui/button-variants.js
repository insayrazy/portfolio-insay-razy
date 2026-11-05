import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'group/button relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-primary bg-[length:200%_auto] text-pure shadow-glow hover:bg-[position:100%_0] hover:shadow-glow-lg',
        outline:
          'border border-white/15 bg-white/[0.04] text-white backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.08]',
        secondary: 'bg-white text-night hover:opacity-90',
        ghost: 'text-white/80 hover:bg-white/[0.06] hover:text-white',
        link: 'rounded-none px-0 text-cyan-300 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 text-sm',
        sm: 'h-10 px-4 text-sm',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
