import type { Transition } from 'framer-motion'

/** Dispara assim que qualquer parte do elemento cruza a área útil (bom com scroll suave + #âncoras). */
export const inViewSection = {
  once: true as const,
  amount: 'some' as const,
  margin: '-70px 0px -35% 0px' as const,
}

export const inViewReveal = {
  once: true as const,
  amount: 0.12 as const,
  margin: '0px 0px -10% 0px' as const,
}

export const inViewHero = {
  once: true as const,
  amount: 0.25,
  margin: '-80px 0px' as const,
}

export function springPop(stiffness: number, delay = 0): Transition {
  return {
    type: 'spring',
    stiffness,
    damping: 22,
    mass: 0.92,
    delay,
  }
}

export function instantTransition(): Transition {
  return { duration: 0.01 }
}
