import { motion, useReducedMotion } from 'framer-motion'
import { ButtonLink } from './Button'
import { Container } from './Container'
import { Reveal } from './Reveal'

export function CtaSection() {
  const reduce = useReducedMotion()
  return (
    <section className="relative z-10 -mt-12 py-10 sm:-mt-16 sm:py-12">
      <Container>
        <Reveal>
          <motion.div
            className="relative overflow-hidden rounded-[34px] bg-studio-900 p-8 shadow-soft ring-1 ring-white/10 sm:p-10"
            whileHover={reduce ? undefined : { y: -2 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 opacity-70">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
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
            </div>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  )
}

