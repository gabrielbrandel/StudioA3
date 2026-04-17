import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from './Button'
import { IconClose, IconInstagram, IconMenu, IconWhatsapp } from './Icons'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

type NavItem = { id: string; label: string }

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

const NAV_BG = '#4b423b'

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

  const active = useActiveSection(items.map((i) => i.id))
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!mobileNavOpen) return

    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyPosition = body.style.position
    const prevBodyTop = body.style.top
    const prevBodyWidth = body.style.width

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.position = prevBodyPosition
      body.style.top = prevBodyTop
      body.style.width = prevBodyWidth
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileNavOpen])

  function closeMobileNav() {
    setMobileNavOpen(false)
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className="pointer-events-auto relative flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-4 py-2 text-studio-50 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] ring-1 ring-black/10 transition-all duration-300 ease-out sm:gap-4 sm:px-6 sm:py-2 lg:grid lg:min-h-[5rem] lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-10 lg:py-2"
          style={{ backgroundColor: NAV_BG }}
        >
          {/* ——— Esquerda: logo + tagline ——— */}
          <a
            href="#inicio"
            className={[
              'group inline-flex min-w-0 shrink-0 items-center justify-center',
              'max-lg:absolute max-lg:left-1/2 max-lg:top-1/2 max-lg:z-[1] max-lg:max-w-[min(19rem,calc(100%-6rem))] max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 sm:max-lg:max-w-[min(22rem,calc(100%-6.5rem))]',
              'lg:justify-self-center',
              'rounded-full transition-opacity duration-300 ease-out hover:opacity-90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#4b423b]',
            ].join(' ')}
            onClick={closeMobileNav}
            aria-label="Studio A3 — Ir para o início"
          >
            <StudioLogo
              variant="stacked"
              decorative
              className="h-[3.5rem] w-auto max-w-full object-contain object-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:h-[3.85rem] lg:h-[3.85rem]"
            />
          </a>

          {/* ——— Centro: menu ——— */}
          <nav
            className="hidden items-center justify-center lg:flex lg:justify-self-center lg:gap-6 xl:gap-8"
            aria-label="Navegação principal"
          >
            {items.map((item) => {
              const isActive = item.id === active
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    'relative px-0.5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em]',
                    'transition-colors duration-300 ease-out',
                    'after:pointer-events-none after:absolute after:-bottom-0.5 after:left-0 after:right-0 after:mx-auto after:h-[2px] after:w-full after:origin-center after:rounded-full after:bg-white after:transition-transform after:duration-300 after:ease-out',
                    isActive
                      ? 'text-white after:scale-x-100'
                      : 'text-studio-100/85 hover:text-white after:scale-x-0 hover:after:scale-x-100',
                  ].join(' ')}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label.toUpperCase()}
                </a>
              )
            })}
          </nav>

          {/* ——— Direita: ações ——— */}
          <div className="relative z-[2] flex shrink-0 items-center gap-2 lg:justify-self-end">
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
              className="hidden h-10 w-10 rounded-full ring-1 ring-white/25 transition-transform duration-300 ease-out hover:-translate-y-0.5 lg:inline-flex"
            />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition-all duration-300 ease-out hover:bg-white/25 lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="menu-mobile"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              <span className="sr-only">{mobileNavOpen ? 'Fechar menu' : 'Abrir menu de navegação'}</span>
              {mobileNavOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileNavOpen ? (
        <>
          <button
            type="button"
            className="fixed bottom-0 left-0 right-0 top-[5.25rem] z-[100] bg-studio-950/70 backdrop-blur-sm lg:hidden"
            aria-label="Fechar menu"
            onClick={closeMobileNav}
          />
          <div
            id="menu-mobile"
            className="fixed inset-x-0 bottom-0 top-[5.25rem] z-[110] flex max-h-[min(100dvh,100svh)] flex-col border-t border-studio-700/40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-studio-50 shadow-2xl lg:hidden"
            style={{ backgroundColor: NAV_BG }}
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
                      'rounded-2xl px-4 py-3.5 text-[13px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ease-out',
                      isActive ? 'bg-white text-studio-950' : 'text-studio-50 hover:bg-white/10',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
            <div className="mt-2 flex shrink-0 flex-col items-center gap-3 border-t border-white/10 pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-studio-50/70">
                Fale com a StudioA3
              </p>
              <div className="flex items-center justify-center gap-4">
                <ButtonLink
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  variant="instagram"
                  iconOnly
                  aria-label="Instagram StudioA3"
                  title="Instagram"
                  leftIcon={<IconInstagram className="h-6 w-6" />}
                  className="inline-flex h-12 w-12 rounded-full ring-1 ring-white/20 shadow-[0_18px_40px_-22px_rgba(214,36,159,0.55)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
                />
                <ButtonLink
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  variant="whatsapp"
                  iconOnly
                  aria-label="WhatsApp StudioA3"
                  title="WhatsApp"
                  leftIcon={<IconWhatsapp className="h-6 w-6" />}
                  className="inline-flex h-12 w-12 rounded-full ring-1 ring-white/20 shadow-[0_18px_40px_-22px_rgba(37,211,102,0.55)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
