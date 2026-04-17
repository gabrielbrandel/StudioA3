import { useEffect, useMemo, useState } from 'react'
import { ButtonLink } from './Button'
import { IconClose, IconInstagram, IconMenu } from './Icons'
import { SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

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

  const pill = scrolled
    ? 'border-studio-300/55 bg-studio-100/95 text-studio-900 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.35)] ring-1 ring-studio-300/35'
    : 'border-white/12 bg-studio-950/55 text-studio-50 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-md'

  const linkBase = 'px-2.5 py-2 text-[10px] font-semibold tracking-[0.2em] transition-colors duration-300 sm:px-3 sm:text-[11px]'

  const linkIdle = scrolled
    ? 'link-underline-grow text-studio-600 hover:text-studio-950'
    : 'link-underline-grow text-studio-200/90 hover:text-white'

  const linkActive = scrolled
    ? 'text-studio-950 underline decoration-studio-950/30 decoration-2 underline-offset-8'
    : 'text-white underline decoration-white/35 decoration-2 underline-offset-8'

  const menuBtn = scrolled
    ? 'bg-studio-900 text-white ring-studio-950/15 hover:bg-studio-800'
    : 'bg-white/15 text-white ring-white/15 hover:bg-white/25'

  /** Em mobile/tablet (abaixo de `lg`), com pílula escura: realça o PNG da marca. */
  const logoMobilePop =
    scrolled ? '' : 'max-lg:[filter:brightness(1.22)_contrast(1.12)_saturate(1.05)] max-lg:drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]'

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={[
            'pointer-events-auto relative flex w-full max-w-5xl min-h-[3.15rem] items-center justify-end gap-1.5 rounded-full border px-2 py-2 transition-all duration-300 sm:min-h-0 sm:gap-2 sm:px-3 sm:py-2.5 lg:justify-between',
            pill,
          ].join(' ')}
        >
          <a
            href="#inicio"
            className={[
              'group absolute left-1/2 top-1/2 z-[1] inline-flex min-w-0 max-w-[min(19rem,calc(100%-5.75rem))] -translate-x-1/2 -translate-y-1/2 shrink-0 items-center justify-center gap-1.5 sm:max-w-[min(22rem,calc(100%-6.5rem))] lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:translate-y-0 lg:justify-start lg:pl-1',
              'max-lg:py-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              scrolled
                ? 'focus-visible:ring-studio-500/40 focus-visible:ring-offset-studio-100'
                : 'max-lg:focus-visible:ring-white/35 max-lg:focus-visible:ring-offset-studio-950/60 lg:focus-visible:ring-studio-500/40 lg:focus-visible:ring-offset-studio-100',
            ].join(' ')}
            onClick={closeMobileNav}
          >
            <StudioLogo
              variant="stacked"
              decorative
              className={[
                'h-[3.75rem] w-auto max-w-full object-contain object-center sm:h-[4rem] lg:h-[3.65rem] lg:object-left',
                logoMobilePop,
                scrolled ? 'drop-shadow-sm' : 'lg:drop-shadow-sm',
              ].join(' ')}
            />
            <span className="hidden min-w-0 text-[10px] font-semibold leading-tight tracking-[0.26em] text-current/90 lg:inline xl:text-[11px]">
              <span className="inline">MÓVEIS</span> <span className="inline">PLANEJADOS</span>
            </span>
            <span className="sr-only">Studio A3 — Ir para o início</span>
          </a>

          <nav className="mx-auto hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
            {items.map((item) => {
              const isActive = item.id === active
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[linkBase, isActive ? linkActive : linkIdle].join(' ')}
                >
                  {item.label.toUpperCase()}
                </a>
              )
            })}
          </nav>

          <div className="relative z-[2] ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 sm:pr-0.5">
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
              className={[
                'hidden rounded-full sm:inline-flex',
                scrolled ? '' : 'ring-1 ring-white/20',
              ].join(' ')}
            />
            <button
              type="button"
              className={[
                'inline-flex h-10 w-10 items-center justify-center rounded-full shadow-soft ring-1 transition lg:hidden',
                menuBtn,
              ].join(' ')}
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
            className="fixed inset-x-0 bottom-0 top-[5.25rem] z-[110] flex max-h-[min(100dvh,100svh)] flex-col border-t border-studio-700/40 bg-studio-900 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 text-studio-50 shadow-2xl backdrop-blur-md lg:hidden"
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
                      isActive ? 'bg-studio-100 text-studio-950' : 'text-studio-100 hover:bg-white/10',
                    ].join(' ')}
                  >
                    {item.label.toUpperCase()}
                  </a>
                )
              })}
            </nav>
            <div className="mt-2 flex shrink-0 items-center justify-center gap-3 border-t border-white/10 pt-4 sm:hidden">
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
    </>
  )
}
