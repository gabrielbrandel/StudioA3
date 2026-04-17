import { useState } from 'react'
import { ButtonLink } from './Button'
import { HeroStatsStrip } from './HeroStatsStrip'
import { HERO_DESKTOP_IMAGE, HERO_FEATURE_CAPTION } from '../data/studioMedia'
import heroRoom from '../assets/mock/room-kitchen.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

const tags = ['Projeto 3D', 'MDF premium', 'Montagem impecável'] as const

export function HeroSection() {
  const [heroSrc, setHeroSrc] = useState(HERO_DESKTOP_IMAGE)

  return (
    <section
      id="inicio"
      className="relative min-w-0 scroll-mt-24 overflow-x-clip pb-4 sm:scroll-mt-28 sm:pb-6"
    >
      <div className="overflow-hidden rounded-[1.65rem] bg-studio-50 text-studio-900 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.55)] ring-1 ring-studio-200/50 max-lg:p-0 sm:rounded-[2rem] lg:p-7 xl:p-10">
        <div className="grid max-lg:grid-cols-1 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Mobile: destaque em cima, largura total; desktop: coluna direita */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-6 lg:self-stretch">
            <div
              className={[
                'relative isolate w-full overflow-hidden',
                'min-h-[min(52svh,28rem)] sm:min-h-[min(50svh,30rem)]',
                'max-lg:rounded-t-[1.65rem] sm:max-lg:rounded-t-[2rem]',
                'lg:min-h-[min(560px,72vh)] lg:rounded-3xl lg:bg-studio-200/20 lg:ring-1 lg:ring-studio-300/25',
              ].join(' ')}
            >
              <img
                src={heroSrc}
                alt={HERO_FEATURE_CAPTION}
                className="absolute inset-0 h-full w-full object-cover object-[center_26%] lg:object-[center_24%]"
                loading="eager"
                decoding="async"
                onError={() => setHeroSrc(heroRoom)}
              />

              {/* Faixa branca translúcida — do topo da imagem até o fim da logo. */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-center bg-white/45 px-4 py-4 backdrop-blur-[2px] sm:py-5 lg:py-6"
                aria-hidden
              >
                <img
                  src="/brand/logo-framed-white.png"
                  alt=""
                  aria-hidden
                  className="w-[min(78%,21rem)] max-w-full opacity-[0.85] drop-shadow-[0_6px_20px_rgba(0,0,0,0.18)] sm:w-[min(70%,24rem)] lg:w-[min(68%,26rem)]"
                />
              </div>

              {/* Gradient subtil na base para legibilidade da legenda DESTAQUE. */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-950/55 via-transparent to-transparent"
                aria-hidden
              />

              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-5 lg:p-6 lg:pb-6">
                <div className="rounded-2xl border border-white/15 bg-studio-950/35 p-3.5 shadow-lg backdrop-blur-xl sm:p-4 lg:max-w-xl lg:bg-studio-950/30">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] sm:text-xs">
                    DESTAQUE
                  </p>
                  <p className="mt-2 text-[13px] font-medium leading-snug text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] sm:text-sm sm:leading-relaxed">
                    {HERO_FEATURE_CAPTION}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col justify-center max-lg:px-5 max-lg:pb-6 max-lg:pt-6 sm:max-lg:px-6 sm:max-lg:pb-7 sm:max-lg:pt-7 lg:order-1 lg:col-span-6 lg:px-0 lg:pb-0 lg:pt-0">
            <h1 className="text-center font-display text-[2rem] leading-[1.06] tracking-tight min-[400px]:text-[2.35rem] sm:text-5xl lg:text-left lg:text-[2.85rem] xl:text-6xl">
              Móveis planejados
              <span className="block text-studio-700/90">& autênticos</span>
            </h1>

            <p className="mt-4 max-w-xl text-center text-sm leading-relaxed text-studio-700 sm:mt-6 sm:text-base lg:text-left">
              Um time familiar com <strong>design</strong>, <strong>arquitetura</strong> e{' '}
              <strong>montagem</strong> — resultado clean, com prazo médio de{' '}
              <strong>30 dias</strong>.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 lg:justify-start">
              <ButtonLink href="#contato" size="lg" variant="primary" className="max-sm:py-3 max-sm:text-[0.9rem]">
                Solicitar orçamento
              </ButtonLink>
              <ButtonLink
                href="#portfolio"
                variant="secondary"
                size="lg"
                className="max-sm:py-3 max-sm:text-[0.9rem]"
              >
                Ver portfólio
              </ButtonLink>
            </div>

            <div className="mt-6 flex max-w-full flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center lg:items-start lg:justify-start">
              <img
                src={facesCollage}
                alt="Clientes e equipe Studio A3"
                className="h-[52px] max-w-full object-contain sm:h-[68px]"
                loading="lazy"
              />
              <p className="max-w-sm text-center text-xs leading-relaxed text-studio-600 sm:text-sm lg:text-left">
                Atendimento próximo, do primeiro contato à montagem no seu apartamento.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-8 lg:justify-start">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-studio-300/40 bg-studio-200/35 px-3 py-1.5 text-center text-[10px] font-semibold tracking-[0.16em] text-studio-800 shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HeroStatsStrip />
    </section>
  )
}
