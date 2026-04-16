import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { MobileSnapCarousel } from './MobileSnapCarousel'
import { Reveal } from './Reveal'

import living from '../assets/mock/room-living.svg'
import bedroom from '../assets/mock/room-bedroom.svg'
import closet from '../assets/mock/room-closet.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

type TeamMember = {
  name: string
  role: string
  /** Mock: use o mesmo collage com recortes diferentes até trocar por fotos reais em /public. */
  photoSrc: string
  photoObjectPosition: string
}

const team: TeamMember[] = [
  {
    name: 'Fabiola Soriano Brandel',
    role: 'Designer de Interiores',
    photoSrc: facesCollage,
    photoObjectPosition: '18% 45%',
  },
  {
    name: 'Gert Brandel Junior',
    role: 'Montador de Móveis',
    photoSrc: facesCollage,
    photoObjectPosition: '52% 42%',
  },
  {
    name: 'Bruna Soriano Brandel',
    role: 'Arquiteta',
    photoSrc: facesCollage,
    photoObjectPosition: '82% 48%',
  },
]

function TeamMemberCard({
  m,
  reduce,
  layout,
}: {
  m: TeamMember
  reduce: boolean
  layout: 'carousel' | 'list'
}) {
  const bodyLayout =
    layout === 'carousel'
      ? 'items-center text-center'
      : 'items-start text-left sm:flex-row sm:items-center'

  return (
    <motion.div
      className={[
        'rounded-2xl bg-studio-200/20 p-5 shadow-ring ring-1 ring-studio-300/30',
      ]
        .filter(Boolean)
        .join(' ')}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={['flex flex-col gap-3', bodyLayout].join(' ')}>
        <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 sm:h-24 sm:w-24">
          <img
            src={m.photoSrc}
            alt={`Retrato de ${m.name} (imagem ilustrativa)`}
            className="h-full w-full rounded-full object-cover shadow-soft ring-2 ring-white/90 ring-offset-2 ring-offset-studio-200/30"
            style={{ objectPosition: m.photoObjectPosition }}
            loading="lazy"
          />
        </div>
        <div className="min-w-0">
          <p className="font-display text-lg font-medium leading-snug tracking-tight text-studio-950 sm:text-xl">
            {m.name}
          </p>
          <p className="mt-1 text-sm font-semibold text-studio-700">{m.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function AboutSection() {
  const reduce = Boolean(useReducedMotion())
  const teamScrollRef = useRef<HTMLDivElement | null>(null)
  const [teamActive, setTeamActive] = useState(0)

  useEffect(() => {
    const root = teamScrollRef.current
    if (!root) return
    const slides = root.querySelectorAll<HTMLElement>('[data-team-slide]')
    if (slides.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            const i = Number(e.target.getAttribute('data-team-idx'))
            if (!Number.isNaN(i)) setTeamActive(i)
          }
        }
      },
      { root, threshold: [0.45, 0.55, 0.65] },
    )

    slides.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="sobre"
      className="relative z-10 -mt-10 overflow-x-hidden py-20 sm:-mt-14 sm:py-24"
    >
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

            <MobileSnapCarousel
              ref={teamScrollRef}
              maxBreakpoint="md"
              aria-label="Equipe StudioA3"
              className="mt-10"
            >
              {team.map((m, idx) => (
                <div
                  key={m.name}
                  data-team-slide
                  data-team-idx={idx}
                  className="w-[82%] max-w-[19rem] shrink-0 snap-start"
                >
                  <TeamMemberCard m={m} reduce={reduce} layout="carousel" />
                </div>
              ))}
            </MobileSnapCarousel>

            <div
              className="mt-2 flex justify-center gap-2 md:hidden"
              role="tablist"
              aria-label="Indicadores do carrossel da equipe"
            >
              {team.map((m, i) => (
                <span
                  key={m.name}
                  role="presentation"
                  className={[
                    'h-2 w-2 rounded-full transition-colors duration-200',
                    i === teamActive ? 'bg-studio-900' : 'bg-studio-300',
                  ].join(' ')}
                />
              ))}
            </div>

            <p className="mt-2 text-center text-xs text-studio-600 md:hidden">
              Deslize para conhecer cada profissional
            </p>

            <div className="mt-10 hidden space-y-4 md:block">
              {team.map((m, idx) => (
                <Reveal key={m.name} delay={0.08 + idx * 0.05}>
                  <TeamMemberCard m={m} reduce={reduce} layout="list" />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal delay={0.05}>
              <div className="relative mx-auto max-w-xl lg:mx-0">
                <motion.div
                  className="relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-studio-200/80 lg:hidden"
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

                <div className="relative hidden overflow-hidden lg:block">
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
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
