import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '@/animations/gsap'
import useDocumentMeta from '@/hooks/useDocumentMeta'
import useLoader from '@/hooks/useLoader'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import About from '@/sections/About'
import Certificates from '@/sections/Certificates'
import Contact from '@/sections/Contact'
import Experience from '@/sections/Experience'
import FAQ from '@/sections/FAQ'
import Hero from '@/sections/Hero'
import Projects from '@/sections/Projects'
import Services from '@/sections/Services'
import Skills from '@/sections/Skills'
import Statistics from '@/sections/Statistics'
import TechStack from '@/sections/TechStack'
import Testimonials from '@/sections/Testimonials'

export default function Home() {
  useDocumentMeta({ path: '/' })
  const { hash } = useLocation()
  const { isLoaded } = useLoader()
  const { scrollTo } = useSmoothScroll()

  // Support deep links such as /#projects (also used when navigating from other pages).
  useEffect(() => {
    if (!isLoaded || !hash) return undefined
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
      requestAnimationFrame(() => scrollTo(hash.slice(1)))
    }, 700)
    return () => clearTimeout(timeout)
  }, [isLoaded, hash, scrollTo])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <TechStack />
      <Experience />
      <Projects />
      <Certificates />
      <Services />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  )
}
