import { Container } from './Container'
import { Reveal } from './Reveal'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

export function Footer() {
  return (
    <footer className="relative z-10 mt-6 rounded-t-[1.75rem] bg-studio-900 py-10 text-studio-50 ring-1 ring-white/10 sm:mt-8 sm:rounded-t-[2rem] sm:py-12">
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
    </footer>
  )
}

