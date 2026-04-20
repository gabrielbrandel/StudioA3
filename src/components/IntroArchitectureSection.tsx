import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'
import {
  PORTFOLIO_COZINHA_ILHA_IMAGE,
  PORTFOLIO_LIVING_PAINEL_TV_IMAGE,
  PORTFOLIO_QUARTO_CABECEIRA_IMAGE,
} from '../data/studioMedia'

export function IntroArchitectureSection() {
  return (
    <MotionSection
      id="sobre"
      className="relative z-10 scroll-mt-24 bg-black py-16 text-white sm:scroll-mt-28 sm:py-20 md:py-28"
    >
      <Container className="max-w-7xl">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
          <Reveal className="min-w-0">
            <h2 className="max-w-xl font-sans text-xl font-semibold uppercase leading-snug tracking-[0.12em] text-white/95 sm:text-2xl md:text-[1.35rem] md:leading-tight lg:text-[1.65rem]">
              Somos referência em marcenaria planejada e ambientes sob medida
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              A StudioA3 une design, execução e montagem em um fluxo direto — menos etapas, mais
              precisão no detalhe. Trabalhamos com apartamentos novos e reformas, com prazo médio
              de entrega em torno de 30 dias.
            </p>
            <a
              href="#portfolio"
              className="mt-8 inline-flex border border-white/80 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
            >
              Ver projetos
            </a>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            {/* Mobile: imagens empilhadas */}
            <div className="flex flex-col gap-3 lg:hidden">
              <div className="overflow-hidden bg-neutral-900">
                <img
                  src={PORTFOLIO_COZINHA_ILHA_IMAGE}
                  alt="Cozinha planejada com ilha e iluminação quente"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden bg-neutral-900">
                <img
                  src={PORTFOLIO_LIVING_PAINEL_TV_IMAGE}
                  alt="Living com painel de TV e marcenaria sob medida"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden bg-neutral-900">
                <img
                  src={PORTFOLIO_QUARTO_CABECEIRA_IMAGE}
                  alt="Quarto com cabeceira e marcenaria integrada"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Desktop: colagem assimétrica */}
            <div className="relative hidden lg:block">
              <div className="relative grid min-h-[28rem] grid-cols-12 grid-rows-6 gap-3">
                <div className="relative col-span-7 row-span-6 overflow-hidden bg-neutral-900">
                  <img
                    src={PORTFOLIO_COZINHA_ILHA_IMAGE}
                    alt="Cozinha planejada com ilha e iluminação quente"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative col-span-5 col-start-8 row-span-3 row-start-1 overflow-hidden bg-neutral-900">
                  <img
                    src={PORTFOLIO_LIVING_PAINEL_TV_IMAGE}
                    alt="Living com painel de TV e marcenaria sob medida"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="relative col-span-5 col-start-8 row-span-3 row-start-4 overflow-hidden bg-neutral-900">
                  <img
                    src={PORTFOLIO_QUARTO_CABECEIRA_IMAGE}
                    alt="Quarto com cabeceira e marcenaria integrada"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </MotionSection>
  )
}
