import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Accordion(props) {
  return <AccordionPrimitive.Root {...props} />
}

export function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'group/item glass relative overflow-hidden rounded-3xl transition-colors duration-500 data-[state=open]:border-indigo-400/30 data-[state=open]:bg-white/[0.05]',
        className,
      )}
      {...props}
    />
  )
}

export function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-medium text-white transition-colors hover:text-cyan-200 sm:px-8 sm:py-6 sm:text-lg',
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition-all duration-500 ease-out-expo group-hover:border-white/25 group-data-[state=open]:rotate-[135deg] group-data-[state=open]:border-transparent group-data-[state=open]:bg-gradient-primary group-data-[state=open]:shadow-glow"
        >
          <Plus className="h-4 w-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('px-6 pb-6 pr-16 text-sm leading-relaxed text-slate-300 sm:px-8 sm:pb-7 sm:text-base', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}
