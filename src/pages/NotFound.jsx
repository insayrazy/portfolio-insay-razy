import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Magnetic from '@/components/Magnetic'
import Reveal from '@/components/Reveal'
import SplitText from '@/components/SplitText'
import { Button } from '@/components/ui/button'
import useDocumentMeta from '@/hooks/useDocumentMeta'
import useI18n from '@/hooks/useI18n'

export default function NotFound() {
  const { t } = useI18n()
  useDocumentMeta({ title: t('notFound.metaTitle'), description: t('notFound.metaDescription'), path: '/404' })

  return (
    <section className="relative grid min-h-[100svh] place-items-center px-6 py-32 text-center">
      <div className="flex flex-col items-center gap-6">
        <SplitText
          as="h1"
          by="chars"
          text="404"
          animate="visible"
          stagger={0.12}
          className="text-gradient-animated font-display text-[clamp(7rem,28vw,18rem)] font-bold leading-none tracking-tighter"
        />
        <Reveal variant="blurIn" delay={0.3}>
          <p className="max-w-md text-lg text-slate-400">
            {t('notFound.text')}
          </p>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.5}>
          <Magnetic>
            <Button asChild size="lg">
              <Link to="/">
                <ArrowLeft />
                {t('notFound.back')}
              </Link>
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
