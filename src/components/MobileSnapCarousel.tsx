import { forwardRef, type PropsWithChildren } from 'react'

/** `snap-proximity` evita o carrossel “segurar” a rolagem vertical no celular. */
const mobileSnapTrackClass =
  'flex w-full min-w-0 max-w-full touch-pan-x gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-3 snap-x snap-proximity [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

type Props = PropsWithChildren<{
  'aria-label': string
  /** Carrossel visível só abaixo deste breakpoint. */
  maxBreakpoint: 'sm' | 'md' | 'lg'
  className?: string
}>

const hiddenFrom: Record<NonNullable<Props['maxBreakpoint']>, string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
}

export const MobileSnapCarousel = forwardRef<HTMLDivElement, Props>(function MobileSnapCarousel(
  { children, 'aria-label': ariaLabel, maxBreakpoint, className },
  ref,
) {
  const hide = hiddenFrom[maxBreakpoint]
  return (
    <div className={`relative max-w-full min-w-0 ${hide} ${className ?? ''}`}>
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-studio-100 to-transparent"
        aria-hidden
      />
      <div
        ref={ref}
        className={mobileSnapTrackClass}
        tabIndex={0}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  )
})
