import type { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  y?: number
}>

export function Reveal({ className, delay = 0, y = 14, children }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

