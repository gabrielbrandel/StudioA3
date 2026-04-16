import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from './Button'
import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'
import { StudioLogo } from './StudioLogo'

export function CtaSection() {
  const reduce = useReducedMotion()
  return (
    <MotionSection className="relative z-10 -mt-12 overflow-x-hidden py-10 sm:-mt-16 sm:py-12">
      <Container>
        <motion.div
          className="relative overflow-hidden rounded-[34px] bg-studio-900 p-8 shadow-soft ring-1 ring-white/10 transition-shadow duration-300 sm:p-10"
          whileHover={
            reduce ? undefined : { y: -3, scale: 1.02, boxShadow: '0 20px 44px -24px rgba(0,0,0,0.35)' }
          }
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <StudioLogo
            variant="mark"
            decorative
            className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 opacity-[0.12] sm:h-36 sm:w-36"
          />
          <div className="absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <Reveal delay={0} y={16}>
              <div>
                <p className="text-sm font-medium text-white/80">CTA</p>
                <h3 className="mt-3 font-display text-3xl tracking-tight text-white sm:text-4xl">
                  Transforme seu apartamento com móveis planejados
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
                  Chame no WhatsApp para um primeiro atendimento ou envie o formulário com
                  seu ambiente e objetivo. A StudioA3 responde rápido.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} y={16}>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <ButtonLink href="#contato" variant="secondary" size="lg">
                  Ir para formulário
                </ButtonLink>
                <ButtonLink
                  href="#portfolio"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Ver portfólio
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </Container>
    </MotionSection>
  )
}

