import type { HTMLMotionProps } from 'framer-motion'
import { motion, useReducedMotion } from 'framer-motion'
import { inViewSection, instantTransition, springPop } from '../lib/motionPresets'

type Props = HTMLMotionProps<'section'>

const scrollAnchor = 'scroll-mt-[5.5rem]'

const shown = { opacity: 1, y: 0, scale: 1 }

/**
 * Seção: entra com “pulo” (spring + escala), visível ao rolar ou ao clicar nos links do menu.
 */
export function MotionSection({ className, children, ...rest }: Props) {
  const reduce = useReducedMotion()
  const mergedClass = [scrollAnchor, className].filter(Boolean).join(' ')

  return (
    <motion.section
      className={mergedClass}
      initial={reduce ? shown : { opacity: 0, y: 64, scale: 0.93 }}
      whileInView={shown}
      viewport={inViewSection}
      transition={reduce ? instantTransition() : springPop(320, 0)}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
