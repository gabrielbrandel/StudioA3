import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'section'>

const scrollAnchor = 'scroll-mt-28 sm:scroll-mt-32'

/** Seção com âncora de scroll; sem animação de entrada. */
export function MotionSection({ className, children, ...rest }: Props) {
  const mergedClass = [scrollAnchor, className].filter(Boolean).join(' ')
  return (
    <section className={mergedClass} {...rest}>
      {children}
    </section>
  )
}
