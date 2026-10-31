import useTypewriter from '@/hooks/useTypewriter'
import { cn } from '@/utils/cn'

export default function TypingText({ words, enabled = true, className }) {
  const { text } = useTypewriter(words, { enabled })

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">{text || ' '}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1.05em] w-[3px] translate-y-[1px] animate-blink rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
      />
    </span>
  )
}
