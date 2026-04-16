import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'

const steps = [
  { n: '01', t: 'Atendimento inicial', d: 'Entendemos seu objetivo, medidas e preferências.' },
  { n: '02', t: 'Projeto 3D', d: 'Visual do ambiente para alinhar estética e funcionalidade.' },
  { n: '03', t: 'Aprovação', d: 'Ajustes finais e definição de materiais e ferragens.' },
  { n: '04', t: 'Produção', d: 'Corte e montagem em MDF com controle de qualidade.' },
  { n: '05', t: 'Montagem', d: 'Instalação no seu apartamento com acabamento e limpeza.' },
]

export function ProcessSection() {
  return (
    <MotionSection
      id="processo"
      className="relative z-10 -mt-10 overflow-hidden rounded-[28px] bg-studio-950 py-12 text-white ring-1 ring-white/10 sm:-mt-14 sm:rounded-[34px] sm:py-16 md:py-20"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <Container className="min-w-0">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.22em] text-white/60">CRONOGRAMA</p>
          <h2 className="mt-4 font-display text-3xl tracking-tight text-white sm:text-4xl">
            Do primeiro contato à montagem — com clareza
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            <span className="lg:hidden">
              Fluxo rápido para apartamentos novos, com acompanhamento direto.
            </span>
            <span className="hidden lg:inline">
              Um fluxo pensado para apartamentos novos: rápido, organizado e com acompanhamento
              direto com especialistas.
            </span>
          </p>
        </Reveal>

        <div className="mt-10 space-y-3 lg:hidden">
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="flex gap-3 rounded-2xl bg-white/6 p-4 ring-1 ring-white/10 backdrop-blur">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-studio-950 shadow-soft ring-1 ring-white/30">
                  {s.n}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold tracking-tight text-white">{s.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 hidden w-full min-w-0 max-w-full overflow-x-auto overscroll-x-contain pb-2 lg:block [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-[980px] px-1">
            <div className="relative">
              <div className="absolute left-10 right-10 top-[22px] h-px bg-white/15" />

              <div className="grid grid-cols-5 gap-6">
                {steps.map((s, idx) => (
                  <Reveal key={s.n} delay={0.05 + idx * 0.04}>
                    <div className="relative pt-2 transition-transform duration-200 hover:-translate-y-0.5">
                      <div className="flex items-start justify-center">
                        <div className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-studio-950 shadow-soft ring-1 ring-white/30">
                          {s.n}
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl bg-white/6 p-5 ring-1 ring-white/10 backdrop-blur">
                        <p className="text-sm font-semibold tracking-tight text-white">{s.t}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </MotionSection>
  )
}

