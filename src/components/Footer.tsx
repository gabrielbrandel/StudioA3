import { Container } from './Container'
import { SITE } from '../pages/siteConfig'

export function Footer() {
  return (
    <footer className="relative z-10 py-12">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="font-display text-lg text-studio-900">{SITE.name}</p>
            <p className="text-sm text-studio-600">
              Marcenaria familiar com foco em móveis planejados premium.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-studio-900">Contato</p>
            <a className="block text-studio-700 hover:text-studio-900" href="#contato">
              Formulário
            </a>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-studio-900">Social</p>
            <a
              className="block text-studio-700 hover:text-studio-900"
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>

          <div className="space-y-2 text-sm">
            <p className="font-semibold text-studio-900">Informações</p>
            <p className="text-studio-600">Prazo médio: 30 dias</p>
            <p className="text-studio-600">Atendimento: apartamentos novos</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 pt-6 text-xs text-studio-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <p className="text-studio-500">Site feito com React + Vite.</p>
        </div>
      </Container>
    </footer>
  )
}

