import { motion } from 'framer-motion'
import { curtainIn, curtainOut, pageVariants } from '@/animations/transitions'

/** Wraps a routed page with a fade and a two-curtain sweep. */
export default function PageTransition({ children }) {
  return (
    <>
      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
        {children}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-night"
        variants={curtainOut}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-primary" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-gradient-primary"
        variants={curtainIn}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </>
  )
}
