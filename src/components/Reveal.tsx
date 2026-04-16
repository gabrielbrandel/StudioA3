import type { PropsWithChildren } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { inViewReveal, instantTransition, springPop } from '../lib/motionPresets'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
  stiffness?: number
}>

const shown = { opacity: 1, y: 0, scale: 1 }

/**
 * Bloco com entrada marcante (fade + deslize + leve escala) ao entrar no viewport.
 */
export function Reveal({
  className,
  delay = 0,
  y = 48,
  stiffness = 420,
  children,
}: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? shown : { opacity: 0, y, scale: 0.88 }}
      whileInView={shown}
      viewport={inViewReveal}
      transition={reduce ? instantTransition() : springPop(stiffness, delay)}
    >
      {children}
    </motion.div>
  )
}
