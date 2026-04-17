import {
  Children,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Carrossel com crossfade automático.
 * - Todos os slides ficam sobrepostos (`grid-area: 1/1`) e alternam opacidade.
 * - Autoplay respeita `prefers-reduced-motion`.
 * - Indicadores em pílulas: a ativa "estica".
 */
type Props = {
  children: ReactNode
  /** Quando indicado, esconde o carrossel deste breakpoint para cima (para o desktop usar outro layout). */
  maxBreakpoint?: 'sm' | 'md' | 'lg'
  /** Intervalo entre trocas (ms). */
  interval?: number
  ariaLabel: string
  className?: string
  /** Cor dos dots: `dark` sobre fundo claro; `light` sobre fundo escuro. */
  dotTone?: 'dark' | 'light'
}

const hiddenFrom: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
}

export function AutoCarousel({
  children,
  maxBreakpoint,
  interval = 3000,
  ariaLabel,
  className = '',
  dotTone = 'dark',
}: Props) {
  const reduce = Boolean(useReducedMotion())
  const slides = Children.toArray(children).filter(Boolean)
  const [index, setIndex] = useState(0)
  /** Pausa o autoplay enquanto o utilizador interage (hover/drag). */
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || slides.length <= 1 || paused) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [reduce, slides.length, interval, paused])

  /** Gesture (mouse + touch) — `pointer events` cobre ambos. */
  const drag = useRef<{ id: number | null; startX: number; startY: number; active: boolean }>({
    id: null,
    startX: 0,
    startY: 0,
    active: false,
  })
  const SWIPE_THRESHOLD = 50

  function goTo(i: number) {
    if (slides.length === 0) return
    setIndex(((i % slides.length) + slides.length) % slides.length)
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    // Ignora o botão direito / meio do rato
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { id: e.pointerId, startX: e.clientX, startY: e.clientY, active: true }
    setPaused(true)
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d.active || d.id !== e.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    drag.current.active = false
    setPaused(false)
    // Só considera horizontal se o eixo X dominar o Y (evita conflito com scroll vertical).
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      goTo(dx < 0 ? index + 1 : index - 1)
    }
  }

  function onPointerCancel() {
    drag.current.active = false
    setPaused(false)
  }

  const hide = maxBreakpoint ? hiddenFrom[maxBreakpoint] : ''

  const dotIdle =
    dotTone === 'light'
      ? 'bg-white/40 hover:bg-white/70'
      : 'bg-studio-300 hover:bg-studio-500'
  const dotActive = dotTone === 'light' ? 'bg-white' : 'bg-studio-900'

  return (
    <div
      className={[hide, 'relative', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="grid touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerCancel}
      >
        {slides.map((child, i) => {
          const active = i === index
          return (
            <div
              key={i}
              aria-hidden={!active}
              style={{ gridArea: '1 / 1' }}
              className={[
                'transition-opacity duration-700 ease-in-out',
                active ? 'opacity-100' : 'pointer-events-none opacity-0',
              ].join(' ')}
            >
              {child}
            </div>
          )
        })}
      </div>

      {slides.length > 1 ? (
        <div
          className="mt-5 flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Indicadores do carrossel"
        >
          {slides.map((_, i) => {
            const active = i === index
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={[
                  'h-1.5 rounded-full transition-all duration-500 ease-out',
                  active ? `w-6 ${dotActive}` : `w-1.5 ${dotIdle}`,
                ].join(' ')}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
