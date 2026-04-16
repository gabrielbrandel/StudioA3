import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from './Button'
import { Container } from './Container'
import { inViewHero, instantTransition, springPop } from '../lib/motionPresets'
import heroRoom from '../assets/mock/room-kitchen.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

const shown = { opacity: 1, y: 0, scale: 1 }

export function HeroSection() {
  const reduce = useReducedMotion()
  const heroSpring = (delay: number) => (reduce ? instantTransition() : springPop(380, delay))

  return (
    <section
      id="inicio"
      className="relative min-w-0 scroll-mt-[5.5rem] overflow-hidden bg-transparent pt-28"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl lg:px-8">
        <div className="grid items-stretch lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative order-1 lg:order-2 lg:col-span-7"
            initial={reduce ? shown : { opacity: 0, y: 56, scale: 0.9 }}
            whileInView={shown}
            viewport={inViewHero}
            transition={heroSpring(0.02)}
          >
            <div className="relative h-[420px] sm:h-[520px] lg:h-[min(720px,calc(100svh-5rem)))]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-studio-200/35 to-transparent lg:left-10 lg:right-0" />

              <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-6 pb-10 lg:px-10">
                <div className="w-full max-w-xl rounded-2xl bg-studio-950/35 p-4 shadow-soft ring-1 ring-white/10 backdrop-blur">
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/70">
                    MOCK DE AMBIENTE
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Cozinha integrada • tons neutros e luz natural
                  </p>
                </div>
              </div>

              <div className="group absolute inset-0 overflow-hidden rounded-none lg:rounded-l-[2.25rem]">
                <motion.img
                  src={heroRoom}
                  alt="Mock de ambiente: cozinha moderna em tons neutros"
                  className="img-hover-zoom h-full w-full object-cover"
                  initial={reduce ? { scale: 1 } : { scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={inViewHero}
                  transition={
                    reduce ? instantTransition() : { type: 'spring', stiffness: 280, damping: 28, delay: 0.12 }
                  }
                  style={{
                    clipPath: 'ellipse(140% 85% at 50% 18%)',
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-950/35 via-studio-950/10 to-transparent" />
              </div>
            </div>
          </motion.div>

          <div className="relative order-2 lg:order-1 lg:col-span-5">
            <Container className="py-10 sm:py-12 lg:px-0">
              <div className="absolute left-0 top-10 hidden h-[calc(100%-5rem)] w-px bg-studio-200/80 lg:block" />

              <motion.h1
                className="mt-0 font-display text-[2.55rem] leading-[1.02] tracking-tight text-studio-950 sm:mt-2 sm:text-6xl lg:mt-0"
                initial={reduce ? shown : { opacity: 0, y: 44, scale: 0.92 }}
                whileInView={shown}
                viewport={inViewHero}
                transition={heroSpring(0.06)}
              >
                Móveis planejados
                <span className="block text-studio-700/90">& autênticos</span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-studio-700"
                initial={reduce ? shown : { opacity: 0, y: 40, scale: 0.94 }}
                whileInView={shown}
                viewport={inViewHero}
                transition={heroSpring(0.11)}
              >
                Um time familiar com <strong>design</strong>, <strong>arquitetura</strong> e{' '}
                <strong>montagem</strong> — para um resultado clean, com prazo médio de{' '}
                <strong>30 dias</strong>.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                initial={reduce ? shown : { opacity: 0, y: 36, scale: 0.92 }}
                whileInView={shown}
                viewport={inViewHero}
                transition={heroSpring(0.16)}
              >
                <ButtonLink href="#contato" size="lg" variant="primary">
                  Solicitar orçamento
                </ButtonLink>
                <ButtonLink href="#portfolio" variant="secondary" size="lg">
                  Ver portfólio
                </ButtonLink>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
                initial={reduce ? shown : { opacity: 0, y: 32, scale: 0.95 }}
                whileInView={shown}
                viewport={inViewHero}
                transition={heroSpring(0.2)}
              >
                <img
                  src={facesCollage}
                  alt="Mock de prova social: avatares e métrica"
                  className="h-[72px] w-[min(420px,100%)] object-contain"
                  loading="lazy"
                />
                <p className="max-w-sm text-sm leading-relaxed text-studio-700">
                  Mock de confiança para compor o hero (depois você troca por depoimentos reais,
                  logos ou números).
                </p>
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap gap-2"
                initial={reduce ? shown : { opacity: 0, y: 28, scale: 0.92 }}
                whileInView={shown}
                viewport={inViewHero}
                transition={heroSpring(0.24)}
              >
                {['Projeto 3D', 'MDF premium', 'Montagem impecável'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-studio-300/35 bg-studio-200/25 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-studio-800 shadow-ring"
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </motion.div>
            </Container>
          </div>
        </div>
      </div>
    </section>
  )
}
