import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from './Button'
import { Container } from './Container'
import heroRoom from '../assets/mock/room-kitchen.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section id="inicio" className="relative overflow-hidden bg-transparent pt-24">
      <div className="mx-auto max-w-6xl lg:px-8">
        <div className="grid items-stretch lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="relative order-1 lg:order-2 lg:col-span-7"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
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

              <div className="absolute inset-0 overflow-hidden rounded-none lg:rounded-l-[2.25rem]">
                <motion.img
                  src={heroRoom}
                  alt="Mock de ambiente: cozinha moderna em tons neutros"
                  className="h-full w-full object-cover"
                  initial={reduce ? undefined : { scale: 1.06 }}
                  animate={reduce ? undefined : { scale: 1 }}
                  transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
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
              <div className="hidden lg:block">
                <div className="absolute left-0 top-10 h-[calc(100%-5rem)] w-px bg-studio-200/80" />
                <p className="pl-6 text-[11px] font-semibold tracking-[0.35em] text-studio-600">
                  STUDIOA3
                  <span className="mx-3 text-studio-300">•</span>
                  MÓVEIS PLANEJADOS
                </p>
              </div>

              <motion.p
                className="inline-flex items-center gap-2 rounded-full bg-studio-200/35 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-studio-900 shadow-ring ring-1 ring-studio-300/35 lg:pl-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                APARTAMENTOS NOVOS
              </motion.p>

              <motion.h1
                className="mt-6 font-display text-[2.55rem] leading-[1.02] tracking-tight text-studio-950 sm:text-6xl"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              >
                Móveis planejados
                <span className="block text-studio-700/90">& autênticos</span>
              </motion.h1>

              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-studio-700"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Um time familiar com <strong>design</strong>, <strong>arquitetura</strong> e{' '}
                <strong>montagem</strong> — para um resultado clean, com prazo médio de{' '}
                <strong>30 dias</strong>.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
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

