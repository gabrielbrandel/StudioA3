import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'section'>

const scrollAnchor = 'scroll-mt-[5.5rem]'

/** Seção com âncora de scroll; sem animação de entrada. */
export function MotionSection({ className, children, ...rest }: Props) {
  const mergedClass = [scrollAnchor, className].filter(Boolean).join(' ')
  return (
    <section className={mergedClass} {...rest}>
      {children}
    </section>
  )
}
