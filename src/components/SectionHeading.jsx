import Reveal from '@/components/Reveal'
import SplitText from '@/components/SplitText'
import { cn } from '@/utils/cn'

export default function SectionHeading({
  index,
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  as = 'h2',
  className,
}) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'mb-14 flex flex-col gap-5 sm:mb-20',
        centered ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl items-start text-left',
        className,
      )}
    >
      {eyebrow ? (
        <Reveal variant="blurIn">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.7)]" />
            {index ? <span className="text-white/40">{index}</span> : null}
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <SplitText
        as={as}
        className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
        segments={[
          { text: title, className: '' },
          { text: highlight, className: 'text-gradient-animated' },
        ]}
      />

      {description ? (
        <Reveal variant="fadeUp" delay={0.25}>
          <p className="text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
