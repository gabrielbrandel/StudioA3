import { motion, useReducedMotion } from 'framer-motion'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

export function Footer() {
  const reduce = useReducedMotion()
  return (
    <motion.footer
      className="relative z-10 bg-black py-10 text-white sm:py-12"
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <Reveal delay={0}>
            <div className="space-y-3">
              <StudioLogo
                variant="stacked"
                className="mx-auto h-[5.75rem] w-auto object-contain object-left sm:mx-0 sm:h-[6.5rem]"
              />
              <p className="text-sm text-white/85">
                Marcenaria familiar com foco em móveis planejados premium.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Contato</p>
              <a
                className="link-underline-grow w-fit text-white/90 transition-colors duration-300 hover:text-white"
                href="#contato"
              >
                Formulário
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Social</p>
              <div className="flex flex-col gap-1.5">
                <a
                  className="link-underline-grow w-fit text-white/90 transition-colors duration-300 hover:text-white"
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="link-underline-grow w-fit text-white/90 transition-colors duration-300 hover:text-white"
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Informações</p>
              <p className="text-white/80">Prazo médio: 30 dias</p>
              <p className="text-white/80">Atendimento: apartamentos novos</p>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.08}
          className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>Site feito com React + Vite.</p>
        </Reveal>
      </Container>
    </motion.footer>
  )
}

