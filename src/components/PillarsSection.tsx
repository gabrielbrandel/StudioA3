import { motion, useReducedMotion } from 'framer-motion'
import { Container } from './Container'
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

export function PillarsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="pilares" className="relative z-10 py-20 sm:py-24">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
            O QUE VOCÊ LEVA
          </p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
            Três frentes, um só time familiar
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-studio-700">
            Um fluxo completo para móveis planejados: do olhar de designer à leitura técnica da
            arquiteta, até a execução impecável na montagem.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map((p, idx) => (
            <Reveal key={p.title} delay={0.05 + idx * 0.05}>
              <motion.div
                className={[
                  'group h-full rounded-[28px] bg-studio-200/25 p-7 shadow-soft ring-1 ring-studio-300/35 backdrop-blur',
                  idx === 1 ? 'md:-translate-y-3' : '',
                  idx === 2 ? 'md:translate-y-4' : '',
                ].join(' ')}
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
                    className="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <p className="mt-6 text-xs font-semibold tracking-[0.22em] text-studio-600">
                  {p.subtitle.toUpperCase()}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-studio-950">
                  {p.title}
                </h3>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-studio-700">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-studio-900/35" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
