import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { defaultViewport, revealVariants, staggerContainer } from '@/animations/variants'
import Magnetic from '@/components/Magnetic'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faqs } from '@/data/faq'
import useI18n from '@/hooks/useI18n'
import useScrollToSection from '@/hooks/useScrollToSection'

const itemVariants = {
  hidden: revealVariants.blurIn.hidden,
  visible: revealVariants.blurIn.visible(0),
}

export default function FAQ() {
  const goToSection = useScrollToSection()
  const { t, tr } = useI18n()

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div id="faq-heading">
              <SectionHeading
                index="09"
                eyebrow={t('faq.eyebrow')}
                title={t('faq.title')}
                highlight={t('faq.highlight')}
                description={t('faq.description')}
                align="left"
                className="mb-10 sm:mb-12"
              />
            </div>

            <Reveal variant="fadeUp" delay={0.2}>
              <div className="glass-strong gradient-border rounded-3xl p-7">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-accent">
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold">{t('faq.ctaTitle')}</h3>
                <p className="mb-6 text-sm text-slate-400">{t('faq.ctaText')}</p>
                <Magnetic>
                  <Button onClick={() => goToSection('contact')}>
                    {t('faq.ctaButton')}
                    <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue={faqs[0].id}>
            <motion.div
              className="flex flex-col gap-4"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ ...defaultViewport, amount: 0.1 }}
            >
              {faqs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants}>
                  <AccordionItem value={faq.id}>
                    <AccordionTrigger>{tr(faq.question)}</AccordionTrigger>
                    <AccordionContent>{tr(faq.answer)}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </motion.div>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
