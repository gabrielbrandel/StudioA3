import type { PropsWithChildren } from 'react'

type RevealProps = PropsWithChildren<{
  className?: string
  /** Mantido por compatibilidade; sem animação. */
  delay?: number
  y?: number
  stiffness?: number
}>

/** Wrapper estável: conteúdo visível no primeiro paint (sem entrada ao scroll). */
export function Reveal({ className, children }: RevealProps) {
  return <div className={className}>{children}</div>
}
