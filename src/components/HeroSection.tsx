import { ButtonLink } from './Button'
import { Container } from './Container'
import heroRoom from '../assets/mock/room-kitchen.svg'
import facesCollage from '../assets/mock/faces-collage.svg'

const tags = ['Projeto 3D', 'MDF premium', 'Montagem impecável'] as const

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-w-0 scroll-mt-[5.5rem] overflow-x-clip bg-transparent pb-12 pt-24 lg:pb-14 lg:pt-28"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="relative lg:order-1 lg:col-span-5">
            <Container className="py-2 sm:py-8 lg:px-0 lg:py-12">
              <div className="absolute left-0 top-10 hidden h-[calc(100%-5rem)] w-px bg-studio-200/80 lg:block" />

              <h1 className="mt-0 font-display text-[2.05rem] leading-[1.06] tracking-tight text-studio-950 min-[400px]:text-[2.45rem] sm:mt-2 sm:text-6xl lg:mt-0">
                Móveis planejados
                <span className="block text-studio-700/90">& autênticos</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-studio-700 sm:mt-6 sm:text-base">
                Um time familiar com <strong>design</strong>, <strong>arquitetura</strong> e{' '}
                <strong>montagem</strong> — para um resultado clean, com prazo médio de{' '}
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
                  alt="Mock de prova social: avatares e métrica"
                  className="h-[56px] max-w-full object-contain sm:h-[72px]"
                  loading="lazy"
                />
                <p className="hidden max-w-sm text-sm leading-relaxed text-studio-700 sm:block">
                  Mock de confiança para compor o hero (depois você troca por depoimentos reais,
                  logos ou números).
                </p>
              </div>

              {/* Mobile: 2 tags + 1 centralizada (ref. layout desejado); desktop: linha única */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-10 lg:flex lg:flex-wrap lg:justify-start lg:gap-2">
                {tags.map((t, i) => (
                  <span
                    key={t}
                    className={[
                      'rounded-full border border-studio-300/35 bg-studio-200/25 px-3 py-1.5 text-center text-[10px] font-semibold tracking-[0.16em] text-studio-800 shadow-ring sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.18em]',
                      i === 2 ? 'col-span-2 justify-self-center lg:col-span-1 lg:justify-self-auto' : '',
                    ].join(' ')}
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
            </Container>
          </div>

          {/* Só desktop: evita o bloco de foto / “galeria” no celular */}
          <div className="relative hidden min-w-0 lg:order-2 lg:col-span-7 lg:block">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-studio-200/35 to-transparent lg:left-10 lg:right-0" />

            <div className="relative flex min-h-[min(640px,78svh)] max-h-[min(820px,88svh)] flex-col overflow-hidden rounded-none rounded-l-[2.25rem] bg-studio-200/15">
              <div className="relative min-h-0 flex-1">
                <img
                  src={heroRoom}
                  alt="Mock de ambiente: cozinha moderna em tons neutros"
                  className="absolute inset-0 h-full w-full object-contain object-center p-4 sm:p-6 lg:p-8"
                  loading="eager"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-studio-950/40 via-studio-950/5 to-transparent" />
              </div>

              <div className="relative z-20 flex justify-center px-6 pb-8 pt-2 lg:px-10 lg:pb-10">
                <div className="w-full max-w-xl rounded-2xl bg-studio-950/35 p-4 shadow-soft ring-1 ring-white/10 backdrop-blur">
                  <p className="text-xs font-semibold tracking-[0.22em] text-white/70">MOCK DE AMBIENTE</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    Cozinha integrada • tons neutros e luz natural
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
