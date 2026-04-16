import { useMemo, useState } from 'react'
import { buildWhatsAppLink } from '../pages/siteConfig'
import { Button } from './Button'
import { Container } from './Container'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'
import { StudioLogo } from './StudioLogo'

type FormState = {
  nome: string
  telefone: string
  ambiente: string
  mensagem: string
}

function formatToWhatsAppMessage(s: FormState) {
  return [
    'Olá! Quero um orçamento para móveis planejados.',
    '',
    `Nome: ${s.nome}`,
    `Telefone: ${s.telefone}`,
    `Tipo de ambiente: ${s.ambiente || '-'}`,
    '',
    `Mensagem: ${s.mensagem || '-'}`,
  ].join('\n')
}

export function LeadFormSection() {
  const ambientes = useMemo(
    () => [
      'Cozinha',
      'Lavanderia / área de serviço',
      'Sala / painel',
      'Quarto',
      'Banheiro',
      'Closet',
      'Home office',
      'Apartamento completo',
      'Outro',
    ],
    [],
  )

  const [state, setState] = useState<FormState>({
    nome: '',
    telefone: '',
    ambiente: '',
    mensagem: '',
  })
  const [sent, setSent] = useState(false)

  const canSubmit = state.nome.trim().length >= 2 && state.telefone.trim().length >= 8

  return (
    <MotionSection
      id="contato"
      className="relative z-10 -mt-10 overflow-x-hidden pb-24 pt-10 sm:-mt-14 sm:pb-28 sm:pt-12"
    >
      <Container className="min-w-0">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
          <div className="min-w-0">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.22em] text-studio-600">
                ORÇAMENTO
              </p>
              <h2 className="mt-4 text-balance font-display text-2xl tracking-tight text-studio-950 sm:text-4xl">
                Solicite seu orçamento
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-studio-700">
                Preencha os dados e envie. Para acelerar o retorno, o envio já abre o
                WhatsApp com a mensagem pronta.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 rounded-2xl bg-studio-50 p-4 shadow-ring sm:p-6">
                <p className="text-sm font-semibold text-studio-900">
                  Dica para maior precisão
                </p>
                <p className="mt-2 text-sm leading-relaxed text-studio-700">
                  Se já tiver medidas aproximadas ou planta do apartamento, mencione na
                  mensagem. Isso ajuda a equipe a estimar melhor o projeto.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="min-w-0">
            <form
              className="relative min-w-0 overflow-hidden rounded-2xl bg-studio-200/25 p-4 shadow-soft ring-1 ring-studio-300/35 backdrop-blur sm:rounded-[28px] sm:p-6"
              onSubmit={(e) => {
                e.preventDefault()
                if (!canSubmit) return
                const msg = formatToWhatsAppMessage(state)
                window.open(buildWhatsAppLink(msg), '_blank', 'noreferrer')
                setSent(true)
                setState({ nome: '', telefone: '', ambiente: '', mensagem: '' })
                window.setTimeout(() => setSent(false), 6000)
              }}
            >
              <StudioLogo
                variant="mark"
                decorative
                className="pointer-events-none absolute right-3 top-3 h-11 w-11 opacity-[0.22] sm:hidden"
              />
              <StudioLogo
                variant="stacked"
                decorative
                className="pointer-events-none absolute -right-1 top-1 hidden h-[4.25rem] w-auto max-w-[4.75rem] opacity-[0.28] sm:block sm:h-[4.75rem] sm:max-w-[5.25rem]"
              />
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <div className="min-w-0 sm:col-span-1">
                  <label className="text-sm font-medium text-studio-900" htmlFor="nome">
                    Nome
                  </label>
                  <input
                    id="nome"
                    value={state.nome}
                    onChange={(e) => setState((s) => ({ ...s, nome: e.target.value }))}
                    className="mt-2 box-border h-11 w-full max-w-full min-w-0 rounded-2xl border border-studio-200 bg-white px-3 text-sm text-studio-900 shadow-[0_1px_0_rgba(0,0,0,.03)] outline-none transition focus:border-studio-900/30 focus:ring-2 focus:ring-studio-900/10 sm:px-4"
                    placeholder="Seu nome"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="min-w-0 sm:col-span-1">
                  <label
                    className="text-sm font-medium text-studio-900"
                    htmlFor="telefone"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    value={state.telefone}
                    onChange={(e) =>
                      setState((s) => ({ ...s, telefone: e.target.value }))
                    }
                    className="mt-2 box-border h-11 w-full max-w-full min-w-0 rounded-2xl border border-studio-200 bg-white px-3 text-sm text-studio-900 shadow-[0_1px_0_rgba(0,0,0,.03)] outline-none transition focus:border-studio-900/30 focus:ring-2 focus:ring-studio-900/10 sm:px-4"
                    placeholder="(DDD) número"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="min-w-0 sm:col-span-2">
                  <label
                    className="text-sm font-medium text-studio-900"
                    htmlFor="ambiente"
                  >
                    Tipo de ambiente
                  </label>
                  <select
                    id="ambiente"
                    value={state.ambiente}
                    onChange={(e) =>
                      setState((s) => ({ ...s, ambiente: e.target.value }))
                    }
                    className="mt-2 box-border h-11 w-full max-w-full min-w-0 rounded-2xl border border-studio-200 bg-white px-3 text-sm text-studio-900 outline-none transition focus:border-studio-900/30 focus:ring-2 focus:ring-studio-900/10 sm:px-4"
                  >
                    <option value="">Selecione</option>
                    {ambientes.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="min-w-0 sm:col-span-2">
                  <label
                    className="text-sm font-medium text-studio-900"
                    htmlFor="mensagem"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    value={state.mensagem}
                    onChange={(e) =>
                      setState((s) => ({ ...s, mensagem: e.target.value }))
                    }
                    className="mt-2 box-border min-h-24 w-full max-w-full min-w-0 resize-y rounded-2xl border border-studio-200 bg-white px-3 py-3 text-sm text-studio-900 outline-none transition focus:border-studio-900/30 focus:ring-2 focus:ring-studio-900/10 sm:min-h-28 sm:px-4"
                    placeholder="Conte um pouco sobre o que você precisa."
                  />
                </div>
              </div>

              <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-balance text-xs text-studio-600 sm:max-w-[55%]">
                  Ao enviar, você será redirecionado para o WhatsApp.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={!canSubmit}
                  className={[
                    'disabled:cursor-not-allowed disabled:opacity-60',
                    'w-full sm:w-auto',
                  ].join(' ')}
                >
                  Enviar
                </Button>
              </div>

              {sent ? (
                <div className="mt-4 rounded-2xl bg-studio-50 p-4 text-sm text-studio-700">
                  Mensagem preparada. Se o WhatsApp não abriu, verifique bloqueios de pop-up.
                </div>
              ) : null}
            </form>
          </Reveal>
        </div>
      </Container>
    </MotionSection>
  )
}

