import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
  const reduceMotion = useReducedMotion()
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

  /* Overlay do menu fica FORA do motion.header: Framer Motion aplica transform no header,
   * e fixed dentro de ancestral com transform fica preso ao header — o painel não cobre a página. */
  return (
    <>
      <motion.header
        className={[
          'fixed inset-x-0 top-0 z-50',
          'transition-all duration-300',
          scrolled ? 'backdrop-blur-md bg-studio-200/45 shadow-ring ring-1 ring-studio-300/35' : 'bg-transparent',
        ].join(' ')}
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        <div className="mx-auto w-full min-w-0 max-w-6xl px-4 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
          <div className="flex h-20 min-w-0 max-w-full items-center justify-between gap-3 overflow-visible sm:h-[5.25rem]">
            <a
              href="#inicio"
              className="group inline-flex max-w-[calc(100%-3.75rem)] min-w-0 items-center gap-2 sm:gap-3 max-lg:shrink-0 lg:max-w-[min(380px,56%)]"
              onClick={closeMobileNav}
            >
              <StudioLogo
                variant="stacked"
                decorative
                className="h-[3.45rem] w-auto shrink-0 object-contain object-left drop-shadow-sm sm:h-[4.1rem] lg:h-[4.45rem]"
              />
              <span className="min-w-0 text-[9px] font-semibold leading-tight tracking-[0.24em] text-studio-600 sm:text-[11px] sm:leading-none sm:tracking-[0.32em]">
                <span className="block sm:inline">MÓVEIS</span>{' '}
                <span className="block sm:inline">PLANEJADOS</span>
              </span>
              <span className="sr-only">Studio A3 — Ir para o início</span>
            </a>

            <nav className="hidden items-center gap-1 lg:flex">
              {items.map((item) => {
                const isActive = item.id === active
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      'px-3 py-2 text-[11px] font-semibold tracking-[0.22em] transition-colors duration-300',
                      isActive
                        ? 'text-studio-950 underline decoration-studio-950/30 decoration-2 underline-offset-8'
                        : 'link-underline-grow text-studio-600 hover:text-studio-950',
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
      </motion.header>

      {mobileNavOpen ? (
        <>
          <button
            type="button"
            className="fixed bottom-0 left-0 right-0 top-20 z-[100] bg-white/80 backdrop-blur-sm sm:top-[5.25rem] lg:hidden"
            aria-label="Fechar menu"
            onClick={closeMobileNav}
          />
          <div
            id="menu-mobile"
            className="fixed inset-x-0 bottom-0 top-20 z-[110] flex max-h-[min(100dvh,100svh)] flex-col border-t border-studio-200/60 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-2xl backdrop-blur-md sm:top-[5.25rem] lg:hidden"
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
    </>
  )
}
