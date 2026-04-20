import { useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { buildWhatsAppLink } from '../pages/siteConfig'
import { MotionSection } from './MotionSection'
import { Reveal } from './Reveal'
import { PORTFOLIO_HOME_OFFICE_IMAGE } from '../data/studioMedia'

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

const fieldClass =
  'mt-2 w-full border-0 border-b border-white/35 bg-transparent py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white'

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
      className="relative z-10 scroll-mt-24 overflow-x-hidden bg-black pb-20 pt-0 text-white sm:scroll-mt-28 sm:pb-28"
    >
      <div className="grid min-h-0 grid-cols-1 lg:min-h-[min(38rem,72svh)] lg:grid-cols-2">
        <div className="relative h-[min(14rem,42svh)] min-h-[12rem] sm:h-[min(18rem,38svh)] lg:h-auto lg:min-h-full">
          <img
            src={PORTFOLIO_HOME_OFFICE_IMAGE}
            alt="Ambiente de escritório planejado com marcenaria e iluminação"
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/35 lg:bg-gradient-to-r lg:from-black/50 lg:via-black/15 lg:to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col justify-center bg-black px-5 py-12 sm:px-8 sm:py-14 lg:bg-black/82 lg:px-10 lg:py-14 lg:backdrop-blur-[3px] xl:px-14">
          <div className="mx-auto w-full max-w-lg lg:max-w-md">
            <Reveal>
              <h2 className="text-center font-sans text-lg font-semibold uppercase leading-snug tracking-[0.14em] text-white sm:text-xl xl:text-[1.35rem]">
                Deixe seus contatos
              </h2>
              <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/60">
                Retornamos pelo WhatsApp com orientação e próximos passos.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              <LeadFormFields
                ambientes={ambientes}
                state={state}
                setState={setState}
                canSubmit={canSubmit}
                sent={sent}
                setSent={setSent}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </MotionSection>
  )
}

function LeadFormFields({
  ambientes,
  state,
  setState,
  canSubmit,
  sent,
  setSent,
}: {
  ambientes: string[]
  state: FormState
  setState: Dispatch<SetStateAction<FormState>>
  canSubmit: boolean
  sent: boolean
  setSent: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <form
      className="space-y-6"
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
      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55" htmlFor="nome">
          Como podemos te chamar?
        </label>
        <input
          id="nome"
          value={state.nome}
          onChange={(e) => setState((s) => ({ ...s, nome: e.target.value }))}
          className={fieldClass}
          placeholder="Seu nome"
          autoComplete="name"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55" htmlFor="telefone">
          Seu telefone
        </label>
        <input
          id="telefone"
          value={state.telefone}
          onChange={(e) => setState((s) => ({ ...s, telefone: e.target.value }))}
          className={fieldClass}
          placeholder="(DDD) número"
          autoComplete="tel"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55" htmlFor="ambiente">
          Tipo de ambiente
        </label>
        <select
          id="ambiente"
          value={state.ambiente}
          onChange={(e) => setState((s) => ({ ...s, ambiente: e.target.value }))}
          className={`${fieldClass} cursor-pointer appearance-none bg-[length:0.65rem] bg-[right_0_top_50%] bg-no-repeat pr-8 text-white`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='rgba(255,255,255,0.55)' stroke-width='1.5' d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E")`,
          }}
        >
          <option value="" className="bg-black text-white">
            Selecione
          </option>
          {ambientes.map((a) => (
            <option key={a} value={a} className="bg-black text-white">
              {a}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55" htmlFor="mensagem">
          Resumo do projeto
        </label>
        <textarea
          id="mensagem"
          value={state.mensagem}
          onChange={(e) => setState((s) => ({ ...s, mensagem: e.target.value }))}
          className={`${fieldClass} min-h-[5.5rem] resize-y`}
          placeholder="Metragem, prazo desejado, referências…"
        />
      </div>

      <div className="flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full max-w-xs border border-white px-8 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition enabled:hover:bg-white enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-45"
        >
          Enviar solicitação
        </button>
        <p className="text-center text-xs text-white/45">
          Ao enviar, o WhatsApp abre com a mensagem pronta.
        </p>
      </div>

      {sent ? (
        <p className="text-center text-sm text-white/70">
          Pronto. Se o WhatsApp não abriu, verifique bloqueios de pop-up.
        </p>
      ) : null}
    </form>
  )
}
