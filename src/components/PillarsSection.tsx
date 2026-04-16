import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { MobileSnapCarousel } from './MobileSnapCarousel'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'

import kitchen from '../assets/mock/room-kitchen.svg'
import living from '../assets/mock/room-living.svg'
import office from '../assets/mock/room-office.svg'

type Pillar = {
  title: string
  subtitle: string
  image: string
  bullets: string[]
}

const pillars: Pillar[] = [
  {
    title: 'Design de Interiores',
    subtitle: 'Estética, materiais e acabamento',
    image: kitchen,
    bullets: [
      'Conceito visual alinhado ao seu estilo',
      'Paleta neutra e elegante (cinza/branco)',
      'Detalhes que elevam o apartamento',
    ],
  },
  {
    title: 'Arquitetura & Planejamento',
    subtitle: 'Funcionalidade e medidas certas',
    image: living,
    bullets: [
      'Distribuição inteligente de módulos',
      'Ergonomia e circulação',
      'Compatível com apartamentos novos',
    ],
  },
  {
    title: 'Montagem & Execução',
    subtitle: 'Precisão no dia da instalação',
    image: office,
    bullets: [
      'Montagem com cuidado e limpeza',
      'Ajustes finos no local',
      'Entrega com padrão premium',
    ],
  },
]

function PillarCard({
  p,
  idx,
  reduce,
  layout,
}: {
  p: Pillar
  idx: number
  reduce: boolean
  layout: 'carousel' | 'grid'
}) {
  const stagger =
    layout === 'grid'
      ? idx === 1
        ? 'md:-translate-y-3'
        : idx === 2
          ? 'md:translate-y-4'
          : ''
      : ''

  const width =
    layout === 'carousel'
      ? 'w-[min(20rem,calc(100%-1rem))] shrink-0 snap-start'
      : 'h-full'

  return (
    <motion.div
      className={[
        'group rounded-[28px] bg-studio-200/25 p-5 shadow-soft ring-1 ring-studio-300/35 backdrop-blur sm:p-7',
        stagger,
        width,
      ]
        .filter(Boolean)
        .join(' ')}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="overflow-hidden shadow-ring"
        style={{
          borderRadius: '24px',
          clipPath:
            idx % 3 === 0
              ? 'polygon(12% 0, 100% 0, 100% 100%, 0 100%, 0 14%)'
              : idx % 3 === 1
                ? 'polygon(0 0, 88% 0, 100% 14%, 100% 100%, 0 100%)'
                : 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)',
        }}
      >
        <img
          src={p.image}
          alt={`Mock de ambiente: ${p.title}`}
          className="img-hover-zoom aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
      </div>

      <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-studio-600">
        {p.subtitle.toUpperCase()}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-studio-950">{p.title}</h3>

      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-studio-700 max-md:space-y-2.5 sm:mt-5 max-md:[&>li:nth-child(3)]:hidden">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-studio-900/35" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export function PillarsSection() {
  const reduce = Boolean(useReducedMotion())
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return

    const slides = root.querySelectorAll<HTMLElement>('[data-pillar-slide]')
    if (slides.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            const i = Number(e.target.getAttribute('data-pillar-idx'))
            if (!Number.isNaN(i)) setActive(i)
          }
        }
      },
      { root, threshold: [0.45, 0.55, 0.65] },
    )

    slides.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <MotionSection id="pilares" className="relative z-10 overflow-x-hidden py-14 sm:py-20 md:py-24">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
            O QUE VOCÊ LEVA
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
            Três frentes, um só time familiar
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-studio-700 sm:text-base">
            <span className="lg:hidden">
              Do conceito à montagem: um time único para móveis planejados.
            </span>
            <span className="hidden lg:inline">
              Um fluxo completo para móveis planejados: do olhar de designer à leitura técnica da
              arquiteta, até a execução impecável na montagem.
            </span>
          </p>
        </Reveal>

        <MobileSnapCarousel
          ref={scrollerRef}
          maxBreakpoint="md"
          aria-label="Pilares do atendimento StudioA3"
          className="mt-8 sm:mt-12"
        >
          {pillars.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.06} className="min-w-0 shrink-0 snap-start">
              <div data-pillar-slide data-pillar-idx={idx}>
                <PillarCard p={p} idx={idx} reduce={reduce} layout="carousel" />
              </div>
            </Reveal>
          ))}
        </MobileSnapCarousel>

        <div
          className="mt-2 flex justify-center gap-2 md:hidden"
          role="tablist"
          aria-label="Indicadores do carrossel"
        >
          {pillars.map((p, i) => (
            <span
              key={p.title}
              role="presentation"
              className={[
                'h-2 w-2 rounded-full transition-colors duration-200',
                i === active ? 'bg-studio-900' : 'bg-studio-300',
              ].join(' ')}
            />
          ))}
        </div>

        <p className="mt-2 text-center text-xs text-studio-600 md:hidden">Deslize para o lado para ver os pilares</p>

        <div className="mt-12 hidden gap-5 md:grid md:grid-cols-3">
          {pillars.map((p, idx) => (
            <Reveal key={p.title} delay={0.05 + idx * 0.05}>
              <PillarCard p={p} idx={idx} reduce={reduce} layout="grid" />
            </Reveal>
          ))}
        </div>
      </Container>
    </MotionSection>
  )
}
