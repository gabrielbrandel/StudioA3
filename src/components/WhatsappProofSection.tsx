import type { ReactNode } from 'react'
import { AutoCarousel } from './AutoCarousel'
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
  return (
    <MotionSection
      id="provas"
      className="relative z-10 overflow-x-hidden py-14 sm:py-20 md:py-24"
    >
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
            PROVA SOCIAL
          </p>
          <h2 className="mt-4 font-display text-[1.65rem] leading-snug tracking-tight text-studio-950 sm:text-3xl sm:leading-none md:text-4xl">
            <span className="lg:hidden">Atendimento no estilo WhatsApp (mock)</span>
            <span className="hidden lg:inline">
              Conversas reais (mock) — o jeito StudioA3 de atender
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-studio-700 sm:mt-4 sm:text-base">
            <span className="lg:hidden">Inspirado em conversas reais — substitua por prints depois.</span>
            <span className="hidden lg:inline">
              Visual inspirado em prints de WhatsApp para transmitir proximidade e velocidade de
              resposta. Você pode trocar por prints verdadeiros depois.
            </span>
          </p>
        </Reveal>

        {/* Mobile / tablet: carrossel com crossfade automático. */}
        <AutoCarousel
          maxBreakpoint="lg"
          ariaLabel="Conversas ilustrativas StudioA3"
          className="mt-10"
        >
          {chats.map((c) => (
            <div key={c.title} className="flex w-full flex-col items-center">
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
            </div>
          ))}
        </AutoCarousel>

        {/* Desktop: grid 3 colunas. */}
        <div className="mt-10 hidden gap-6 lg:grid lg:grid-cols-3">
          {chats.map((c, idx) => (
            <Reveal
              key={c.title}
              delay={idx * 0.07}
              className="flex w-full min-w-0 flex-col items-center"
            >
              <div className="w-full transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_16px_32px_-18px_rgba(37,34,32,0.15)]">
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
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </MotionSection>
  )
}
