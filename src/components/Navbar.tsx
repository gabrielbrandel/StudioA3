import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from './Button'
import { IconInstagram, IconWhatsapp } from './Icons'
import { SITE, buildWhatsAppLink } from '../pages/siteConfig'

type NavItem = { id: string; label: string }

function useScrollState() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: '-20% 0px -70% 0px' },
    )

    elements.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids])

  return active
}

export function Navbar() {
  const items: NavItem[] = useMemo(
    () => [
      { id: 'inicio', label: 'Início' },
      { id: 'pilares', label: 'Serviços' },
      { id: 'portfolio', label: 'Portfólio' },
      { id: 'processo', label: 'Processo' },
      { id: 'provas', label: 'Provas' },
      { id: 'sobre', label: 'Sobre' },
      { id: 'contato', label: 'Orçamento' },
    ],
    [],
  )

  const scrolled = useScrollState()
  const active = useActiveSection(items.map((i) => i.id))

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50',
        'transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-studio-200/45 shadow-ring ring-1 ring-studio-300/35' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-6xl container-px">
        <div className="flex h-16 items-center justify-between">
          <a href="#inicio" className="group inline-flex items-baseline gap-2">
            <span className="font-display text-lg tracking-tight text-studio-900">
              StudioA3
            </span>
            <span className="hidden text-xs text-studio-500 sm:inline">
              móveis planejados
            </span>
            <span className="sr-only">Ir para o início</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {items.map((item) => {
              const isActive = item.id === active
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    'px-3 py-2 text-[11px] font-semibold tracking-[0.22em] transition',
                    isActive
                      ? 'text-studio-950 underline decoration-studio-950/30 decoration-2 underline-offset-8'
                      : 'text-studio-600 hover:text-studio-950',
                  ].join(' ')}
                >
                  {item.label.toUpperCase()}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={buildWhatsAppLink('Olá! Quero solicitar um orçamento para móveis planejados.')}
              target="_blank"
              rel="noreferrer"
              size="sm"
              variant="whatsapp"
              iconOnly
              aria-label="Abrir WhatsApp para solicitar orçamento"
              title="WhatsApp"
              leftIcon={<IconWhatsapp className="h-5 w-5" />}
              className="hidden sm:inline-flex rounded-full"
            />
            <ButtonLink
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              size="sm"
              variant="instagram"
              iconOnly
              aria-label="Abrir Instagram da StudioA3"
              title="Instagram"
              leftIcon={<IconInstagram className="h-5 w-5" />}
              className="hidden sm:inline-flex rounded-full"
            />
            <a
              href="#contato"
              className="inline-flex h-10 items-center justify-center rounded-2xl bg-studio-900 px-4 text-sm font-medium text-white sm:hidden"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

