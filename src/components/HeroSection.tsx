import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ButtonLink } from './Button'
import { HeroStatsStrip } from './HeroStatsStrip'
import { HERO_SLIDES } from '../data/studioMedia'
import facesCollage from '../assets/mock/faces-collage.svg'

const tags = ['Projeto 3D', 'MDF premium', 'Montagem impecável'] as const

/** Intervalo entre trocas automáticas do carrossel (ms). */
const AUTOPLAY_INTERVAL = 3000

export function HeroSection() {
  const reduce = Boolean(useReducedMotion())
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce || HERO_SLIDES.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, AUTOPLAY_INTERVAL)
    return () => window.clearInterval(id)
  }, [reduce])

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
              {/* Carrossel: slides sobrepostos com crossfade. */}
              {HERO_SLIDES.map((slide, i) => {
                const isActive = i === index
                return (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={isActive ? slide.alt : ''}
                    aria-hidden={!isActive}
                    className={[
                      'absolute inset-0 h-full w-full object-cover object-[center_26%] transition-opacity duration-1000 ease-in-out lg:object-[center_24%]',
                      isActive ? 'opacity-100' : 'opacity-0',
                    ].join(' ')}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )
              })}

              {/* Indicadores do carrossel */}
              {HERO_SLIDES.length > 1 ? (
                <div
                  className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-studio-950/35 px-2 py-1 backdrop-blur-md sm:bottom-4"
                  role="tablist"
                  aria-label="Navegar slides do hero"
                >
                  {HERO_SLIDES.map((_, i) => {
                    const isActive = i === index
                    return (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Ir para slide ${i + 1}`}
                        onClick={() => setIndex(i)}
                        className={[
                          'h-1.5 rounded-full transition-all duration-500 ease-out',
                          isActive ? 'w-6 bg-white' : 'w-1.5 bg-white/55 hover:bg-white/80',
                        ].join(' ')}
                      />
                    )
                  })}
                </div>
              ) : null}

              {/* Faixa branca translúcida com a logo, centralizada vertical e horizontalmente. */}
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center bg-white/65 px-4 py-4 backdrop-blur-[3px] sm:py-5 lg:py-6"
                aria-hidden
              >
                <img
                  src="/brand/logo-framed-white.png"
                  alt=""
                  aria-hidden
                  className="w-[min(78%,21rem)] max-w-full opacity-100 brightness-90 contrast-150 saturate-110 drop-shadow-[0_6px_22px_rgba(0,0,0,0.3)] sm:w-[min(70%,24rem)] lg:w-[min(68%,26rem)]"
                />
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
