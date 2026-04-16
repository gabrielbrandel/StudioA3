import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'

type Chat = {
  title: string
  lines: Array<{ side: 'them' | 'me'; text: string }>
}

const chats: Chat[] = [
  {
    title: 'Cozinha + lavanderia',
    lines: [
      { side: 'me', text: 'Oi! Quero planejar cozinha e lavanderia no apto novo.' },
      { side: 'them', text: 'Perfeito. Me manda medidas e referências de estilo.' },
      { side: 'me', text: 'Quero algo clean, cinza e branco, com muito armário.' },
      { side: 'them', text: 'Fechado. Te mando o 3D em até X dias para alinharmos.' },
    ],
  },
  {
    title: 'Closet',
    lines: [
      { side: 'me', text: 'Preciso de closet compacto, mas bem organizado.' },
      { side: 'them', text: 'Vamos priorizar gavetas + cabideiro e espelho integrado.' },
      { side: 'me', text: 'Show. Quero MDF bom e ferragens silenciosas.' },
      { side: 'them', text: 'Anotado. Na aprovação fechamos marcas e acabamentos.' },
    ],
  },
  {
    title: 'Apartamento completo',
    lines: [
      { side: 'me', text: 'Quero orçamento para apto inteiro (sala, quarto, cozinha).' },
      { side: 'them', text: 'Ótimo. Podemos fazer por etapas ou pacote completo.' },
      { side: 'me', text: 'Prazo médio de 30 dias funciona pra mim.' },
      { side: 'them', text: 'Combinado. Te passo cronograma e próximos passos.' },
    ],
  },
]

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[min(320px,100%)] overflow-hidden">
      <div className="rounded-[2.2rem] bg-studio-950 p-[10px] shadow-soft">
        <div className="rounded-[1.9rem] bg-studio-50">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-studio-200 text-studio-950 ring-1 ring-studio-300/40">
                <span className="text-xs font-semibold tracking-[0.18em]">A3</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-studio-950">StudioA3</p>
                <p className="text-xs text-studio-600">online</p>
              </div>
            </div>
            <div className="h-2 w-10 rounded-full bg-studio-200" />
          </div>
          <div className="px-3 pb-4">{children}</div>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.6rem] bg-gradient-to-b from-studio-200/35 to-transparent blur-2xl" />
    </div>
  )
}

function Bubble({ side, text }: { side: 'them' | 'me'; text: string }) {
  const isMe = side === 'me'
  return (
    <div className={['flex', isMe ? 'justify-end' : 'justify-start'].join(' ')}>
      <div
        className={[
          'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-ring',
          isMe ? 'bg-[#DCF8C6] text-studio-950' : 'bg-white text-studio-900',
        ].join(' ')}
      >
        {text}
      </div>
    </div>
  )
}

export function WhatsappProofSection() {
  const reduce = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const x = el.scrollLeft
    setCanLeft(x > 8)
    setCanRight(x < max - 8)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current
    if (!el) return
    const step = Math.max(280, Math.floor(el.clientWidth * 0.75))
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
    window.setTimeout(updateScrollState, 250)
  }

  return (
    <MotionSection
      id="provas"
      className="relative z-10 -mt-10 overflow-x-hidden py-20 sm:-mt-14 sm:py-24"
    >
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
            PROVA SOCIAL
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
            Conversas reais (mock) — o jeito StudioA3 de atender
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-studio-700">
            Visual inspirado em prints de WhatsApp para transmitir proximidade e velocidade de
            resposta. Você pode trocar por prints verdadeiros depois.
          </p>
        </Reveal>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 block w-14 bg-gradient-to-l from-studio-100/70 to-transparent lg:hidden" />

          <div className="absolute right-0 top-0 z-30 hidden gap-2 sm:flex lg:hidden">
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              disabled={!canLeft}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-semibold leading-none',
                'bg-studio-900 text-white shadow-soft ring-1 ring-studio-950/20',
                'hover:bg-studio-800 disabled:cursor-not-allowed disabled:opacity-40',
              ].join(' ')}
              aria-label="Ver conversas anteriores"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              disabled={!canRight}
              className={[
                'inline-flex h-11 w-11 items-center justify-center rounded-2xl text-lg font-semibold leading-none',
                'bg-studio-900 text-white shadow-soft ring-1 ring-studio-950/20',
                'hover:bg-studio-800 disabled:cursor-not-allowed disabled:opacity-40',
              ].join(' ')}
              aria-label="Ver próximas conversas"
            >
              ›
            </button>
          </div>

          <div
            ref={scrollerRef}
            className={[
              'flex gap-4 pb-2 sm:gap-6',
              'max-lg:snap-x max-lg:snap-mandatory max-lg:overflow-x-auto max-lg:scroll-smooth',
              'max-lg:[-ms-overflow-style:none] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden',
              'lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0',
            ].join(' ')}
            tabIndex={0}
            aria-label="Carrossel de conversas (mock)"
          >
            {chats.map((c, idx) => (
              <Reveal
                key={c.title}
                delay={idx * 0.07}
                className={[
                  'flex w-full min-w-0 flex-col items-center max-lg:max-w-[min(20rem,calc(100%-1rem))] max-lg:shrink-0 max-lg:snap-start',
                  'lg:snap-normal',
                ].join(' ')}
              >
              <motion.div
                className="w-full"
                whileHover={
                  reduce ? undefined : { y: -4, scale: 1.03, boxShadow: '0 16px 32px -18px rgba(37,34,32,0.15)' }
                }
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 text-center text-xs font-semibold tracking-[0.22em] text-studio-600">
                  {c.title.toUpperCase()}
                </p>
                <PhoneFrame>
                  <div className="space-y-3 rounded-2xl bg-[#ECE5DD] p-3">
                    {c.lines.map((l) => (
                      <Bubble key={l.text} side={l.side} text={l.text} />
                    ))}
                  </div>
                </PhoneFrame>
              </motion.div>
              </Reveal>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-studio-600 sm:hidden">
            Dica: deslize horizontalmente para ver o próximo mock.
          </p>
        </div>
      </Container>
    </MotionSection>
  )
}
