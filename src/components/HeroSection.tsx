import { useState } from 'react'
import { ButtonLink } from './Button'
import { HeroStatsStrip } from './HeroStatsStrip'
import { HERO_DESKTOP_IMAGE } from '../data/studioMedia'
import heroRoom from '../assets/mock/room-kitchen.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

const tags = ['Projeto 3D', 'MDF premium', 'Montagem impecável'] as const

export function HeroSection() {
  const [heroSrc, setHeroSrc] = useState(HERO_DESKTOP_IMAGE)

  return (
    <section
      id="inicio"
      className="relative min-w-0 scroll-mt-28 overflow-x-clip pb-4 pt-24 sm:scroll-mt-32 sm:pb-6 sm:pt-28"
    >
      <div className="overflow-hidden rounded-[1.65rem] bg-studio-50 p-5 text-studio-900 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.55)] ring-1 ring-studio-200/50 sm:rounded-[2rem] sm:p-7 md:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="flex flex-col justify-center lg:col-span-6">
            <h1 className="font-display text-[2rem] leading-[1.06] tracking-tight min-[400px]:text-[2.35rem] sm:text-5xl lg:text-[2.85rem] xl:text-6xl">
              Móveis planejados
              <span className="block text-studio-700/90">& autênticos</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-studio-700 sm:mt-6 sm:text-base">
              Um time familiar com <strong>design</strong>, <strong>arquitetura</strong> e{' '}
              <strong>montagem</strong> — resultado clean, com prazo médio de{' '}
              <strong>30 dias</strong>.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
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

            <div className="mt-6 flex max-w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
              <img
                src={facesCollage}
                alt="Clientes e equipe Studio A3"
                className="h-[52px] max-w-full object-contain sm:h-[68px]"
                loading="lazy"
              />
              <p className="max-w-sm text-xs leading-relaxed text-studio-600 sm:text-sm">
                Atendimento próximo, do primeiro contato à montagem no seu apartamento.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 lg:flex lg:flex-wrap lg:gap-2">
              {tags.map((t, i) => (
                <span
                  key={t}
                  className={[
                    'rounded-full border border-studio-300/40 bg-studio-200/35 px-3 py-1.5 text-center text-[10px] font-semibold tracking-[0.16em] text-studio-800 shadow-sm sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]',
                    i === 2 ? 'col-span-2 justify-self-center lg:col-span-1 lg:justify-self-auto' : '',
                  ].join(' ')}
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-0 lg:col-span-6">
            <div className="relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl bg-studio-200/25 ring-1 ring-studio-300/30 sm:min-h-[280px] lg:rounded-3xl lg:min-h-[min(560px,70vh)]">
              <div className="relative min-h-0 flex-1">
                <img
                  src={heroSrc}
                  alt="Ambiente com móveis planejados Studio A3"
                  className="absolute inset-0 h-full w-full object-contain object-center p-3 sm:p-5 lg:p-7"
                  loading="eager"
                  decoding="async"
                  onError={() => setHeroSrc(heroRoom)}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-950/35 via-transparent to-studio-950/5" />
              </div>
              <div className="relative z-10 px-4 pb-4 pt-1 sm:px-6 sm:pb-5">
                <div className="rounded-2xl bg-studio-950/40 p-3 shadow-soft ring-1 ring-white/10 backdrop-blur-md sm:p-4">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-white/75 sm:text-xs">
                    DESTAQUE
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-white sm:text-sm">
                    Cozinha e ambientes integrados • tons neutros e acabamento premium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroStatsStrip />
    </section>
  )
}
