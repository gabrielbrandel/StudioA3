import { motion, useReducedMotion } from 'framer-motion'
import { Container } from './Container'
import { Reveal } from './Reveal'

import living from '../assets/mock/room-living.svg'
import bedroom from '../assets/mock/room-bedroom.svg'
import closet from '../assets/mock/room-closet.svg'

const team = [
  {
    name: 'Fabiola Soriano Brandel',
    role: 'Designer de Interiores',
    desc: 'Projeto, estética e escolhas de acabamento para um resultado elegante e atemporal.',
  },
  {
    name: 'Gert Brandel Junior',
    role: 'Montador de Móveis',
    desc: 'Execução e montagem com precisão, cuidado e acabamento impecável no dia a dia.',
  },
  {
    name: 'Bruna Soriano Brandel',
    role: 'Arquiteta',
    desc: 'Planejamento técnico e funcional: ergonomia, medidas e aproveitamento do espaço.',
  },
]

export function AboutSection() {
  const reduce = useReducedMotion()
  return (
    <section id="sobre" className="relative z-10 -mt-10 py-20 sm:-mt-14 sm:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
                SOBRE
              </p>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-studio-950 sm:text-4xl">
                Três profissionais, uma mesma obsessão: acabamento
              </h2>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-studio-700">
                A StudioA3 é uma marcenaria familiar para móveis planejados sob medida. Você
                conversa com quem projeta e executa — isso reduz ruído, acelera decisões e
                mantém o padrão visual do início ao fim.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              {team.map((m, idx) => (
                <Reveal key={m.role} delay={0.08 + idx * 0.05}>
                  <motion.div
                    className="rounded-2xl bg-studio-200/20 p-5 shadow-ring ring-1 ring-studio-300/30"
                    whileHover={reduce ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
                          {m.name.toUpperCase()}
                        </p>
                        <p className="mt-2 text-base font-semibold text-studio-950">{m.role}</p>
                        <p className="mt-2 text-sm leading-relaxed text-studio-700">{m.desc}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-studio-700 shadow-ring">
                        A3
                      </span>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal delay={0.05}>
              <div className="relative mx-auto max-w-xl lg:mx-0">
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-studio-200/80"
                  whileHover={reduce ? undefined : { y: -3 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={living}
                    alt="Mock de ambiente: sala integrada"
                    className="aspect-[4/5] w-full object-cover grayscale"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-950/35 via-transparent to-transparent" />
                </motion.div>

                <motion.div
                  className="absolute -left-4 top-10 hidden w-[44%] overflow-hidden rounded-2xl shadow-soft ring-1 ring-studio-300/35 sm:block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                >
                  <img
                    src={closet}
                    alt="Mock de ambiente: closet"
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-8 hidden w-[46%] overflow-hidden rounded-2xl shadow-soft ring-1 ring-studio-300/35 sm:block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <img
                    src={bedroom}
                    alt="Mock de ambiente: quarto"
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

