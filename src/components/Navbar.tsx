import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from './Button'
import { IconClose, IconInstagram, IconMenu } from './Icons'
import { SITE } from '../pages/siteConfig'

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!mobileNavOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileNavOpen])

  function closeMobileNav() {
    setMobileNavOpen(false)
  }

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50',
        'transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-studio-200/45 shadow-ring ring-1 ring-studio-300/35' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl container-px">
        <div className="flex h-16 min-w-0 max-w-full items-center justify-between gap-2">
          <a href="#inicio" className="group inline-flex min-w-0 items-baseline gap-2" onClick={closeMobileNav}>
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

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
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
              className="hidden rounded-full sm:inline-flex"
            />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-studio-900 text-white shadow-soft ring-1 ring-studio-950/15 transition hover:bg-studio-800 lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="menu-mobile"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              <span className="sr-only">{mobileNavOpen ? 'Fechar menu' : 'Abrir menu de navegação'}</span>
              {mobileNavOpen ? (
                <IconClose className="h-5 w-5" />
              ) : (
                <IconMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileNavOpen ? (
        <>
          <button
            type="button"
            className="fixed bottom-0 left-0 right-0 top-16 z-[48] bg-studio-950/40 backdrop-blur-[2px] lg:hidden"
            aria-label="Fechar menu"
            onClick={closeMobileNav}
          />
          <div
            id="menu-mobile"
            className="fixed inset-x-0 bottom-0 top-16 z-[55] flex max-h-[min(100dvh,100svh)] flex-col border-t border-studio-300/35 bg-studio-100/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-2xl backdrop-blur-md lg:hidden"
          >
            <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-2">
              {items.map((item) => {
                const isActive = item.id === active
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMobileNav}
                    className={[
                      'rounded-2xl px-4 py-3.5 text-[13px] font-semibold tracking-[0.2em] transition',
                      isActive
                        ? 'bg-studio-900 text-white'
                        : 'text-studio-800 hover:bg-studio-200/60',
                    ].join(' ')}
                  >
                    {item.label.toUpperCase()}
                  </a>
                )
              })}
            </nav>
            <div className="mt-2 flex shrink-0 items-center justify-center gap-3 border-t border-studio-300/30 pt-4 sm:hidden">
              <ButtonLink
                href={SITE.instagramUrl}
                target="_blank"
                rel="noreferrer"
                size="sm"
                variant="instagram"
                iconOnly
                aria-label="Instagram StudioA3"
                title="Instagram"
                leftIcon={<IconInstagram className="h-5 w-5" />}
                className="inline-flex rounded-full"
              />
            </div>
          </div>
        </>
      ) : null}
    </header>
  )
}
