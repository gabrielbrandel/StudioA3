import { Container } from './Container'
import { Reveal } from './Reveal'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

export function Footer() {
  return (
    <footer
      id="rodape"
      className="relative z-10 scroll-mt-24 border-t border-white/10 bg-black py-12 text-white sm:scroll-mt-28 sm:py-14"
    >
      <Container className="max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          <Reveal delay={0}>
            <div className="space-y-3">
              <StudioLogo
                variant="stacked"
                className="mx-auto h-[5.75rem] w-auto object-contain object-left sm:mx-0 sm:h-[6.5rem]"
              />
              <p className="text-sm text-white/70">
                Marcenaria familiar com foco em móveis planejados premium.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Contato</p>
              <a
                className="link-underline-grow w-fit text-white/75 transition-colors duration-300 hover:text-white"
                href="#contato"
              >
                Formulário
              </a>
              <div className="pt-4">
                <p className="font-semibold text-white">Endereço</p>
                <address className="mt-2 max-w-xs not-italic leading-relaxed text-white/70">
                  R. Galáxia, 420 - Jardim Universo
                  <br />
                  Maringá - PR, 87060-430
                </address>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-white">Social</p>
              <div className="flex flex-col gap-1.5">
                <a
                  className="link-underline-grow w-fit text-white/75 transition-colors duration-300 hover:text-white"
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  className="link-underline-grow w-fit text-white/75 transition-colors duration-300 hover:text-white"
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
              <p className="text-white/65">Prazo médio: 30 dias</p>              
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.08}
          className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p>Desenvolvido por Gabriel Brandel.</p>
        </Reveal>
      </Container>
    </footer>
  )
}

