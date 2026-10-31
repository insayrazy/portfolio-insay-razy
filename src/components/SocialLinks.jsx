import Magnetic from '@/components/Magnetic'
import { socials } from '@/data/socials'
import useI18n from '@/hooks/useI18n'
import { cn } from '@/utils/cn'

export default function SocialLinks({ only, className, size = 'md' }) {
  const { t } = useI18n()
  const items = only ? socials.filter((social) => only.includes(social.id)) : socials
  const dimension = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12'

  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map(({ id, label, href, icon: Icon, color }) => (
        <li key={id}>
          <Magnetic strength={0.4}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} ${t('a11y.newTab')}`}
              style={{ '--brand': color }}
              className={cn(
                'group grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-xl transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:text-white hover:shadow-[0_0_30px_-6px_var(--brand)]',
                dimension,
              )}
            >
              <Icon className="h-[18px] w-[18px] transition-transform duration-500 group-hover:scale-110" />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  )
}
