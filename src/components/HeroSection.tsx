import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IconClose, IconInstagram, IconMenu, IconWhatsapp } from './Icons'
import { useActiveSection } from '../hooks/useActiveSection'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { HERO_SLIDES } from '../data/studioMedia'
import facesCollage from '../assets/mock/faces-collage.svg'
import { StudioBrandLogo } from './StudioBrandLogo'

const heroTeam = [
  {
    name: 'Fabiola Soriano Brandel',
    role: 'Designer de Interiores',
    photoObjectPosition: '18% 45%' as const,
  },
  {
    name: 'Gert Brandel Junior',
    role: 'Montador de Móveis',
    photoObjectPosition: '52% 42%' as const,
  },
  {
    name: 'Bruna Soriano Brandel',
    role: 'Arquiteta',
    photoObjectPosition: '82% 48%' as const,
  },
] as const

const NAV_IDS = ['inicio', 'portfolio', 'sobre', 'contato', 'rodape'] as const

type NavItem = { id: (typeof NAV_IDS)[number]; label: string }

export function HeroSection() {
  const reduce = Boolean(useReducedMotion())
  const [index, setIndex] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const items: NavItem[] = useMemo(
    () => [
      { id: 'inicio', label: 'Início' },
      { id: 'portfolio', label: 'Portfólio' },
      { id: 'sobre', label: 'Sobre' },
      { id: 'contato', label: 'Contato' },
      { id: 'rodape', label: 'Rodapé' },
    ],
    [],
  )

  const active = useActiveSection([...NAV_IDS])

  useEffect(() => {
    if (reduce || HERO_SLIDES.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [reduce])

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
    <section
      id="inicio"
      className="relative min-h-[100svh] scroll-mt-0 bg-black text-white"
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => {
          const isActive = i === index
          return (
            <img
              key={slide.src}
              src={slide.src}
              alt={isActive ? slide.alt : ''}
              aria-hidden={!isActive}
              className={[
                'absolute inset-0 h-full w-full object-cover object-[center_30%]',
                'brightness-[1.03] contrast-[1]',
                'transition-opacity duration-[1.2s] ease-in-out',
                isActive ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          )
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/[0.48] to-black/[0.28]" />
        <div className="absolute inset-0 bg-black/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/38" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <header
          className={[
            'relative flex w-full shrink-0 items-center justify-between gap-3 px-5 pb-1 pt-[max(0.75rem,env(safe-area-inset-top))] sm:gap-4 sm:px-8 sm:pb-2 sm:pt-6 lg:z-auto lg:px-12 lg:pb-2 lg:pt-8',
            mobileNavOpen
              ? 'z-[200] max-lg:border-b max-lg:border-white/[0.08] max-lg:bg-studio-950 lg:bg-transparent'
              : 'z-30',
          ].join(' ')}
        >
          <nav
            className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 lg:flex"
            aria-label="Navegação principal"
          >
            {items.map((item) => {
              const isOn = item.id === active
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    'border-b border-transparent pb-0.5 transition-colors hover:text-white',
                    isOn ? 'border-white text-white' : 'text-white/85',
                  ].join(' ')}
                  aria-current={isOn ? 'page' : undefined}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="relative z-10 flex flex-1 items-center justify-end gap-3 lg:flex-none">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram StudioA3"
              title="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:bg-white/10"
            >
              <IconInstagram className="h-5 w-5" />
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp StudioA3"
              title="WhatsApp"
              className="hidden h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:bg-white/10 sm:inline-flex"
            >
              <IconWhatsapp className="h-5 w-5" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/40 text-white transition hover:bg-white/10 lg:hidden"
              aria-expanded={mobileNavOpen}
              aria-controls="hero-menu-mobile"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              <span className="sr-only">{mobileNavOpen ? 'Fechar menu' : 'Abrir menu'}</span>
              {mobileNavOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <AnimatePresence>
          {mobileNavOpen ? (
            <motion.div
              key="hero-mobile-nav"
              id="hero-menu-mobile"
              className="fixed inset-0 z-[150] flex flex-col bg-studio-950 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: reduce ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="absolute inset-0 z-0 cursor-default bg-studio-950"
                aria-label="Fechar menu"
                tabIndex={-1}
                onClick={closeMobileNav}
              />
              <motion.nav
                className="relative z-10 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(6.25rem,calc(env(safe-area-inset-top)+5.25rem))]"
                aria-label="Navegação principal"
                initial="closed"
                animate="open"
                variants={{
                  closed: {},
                  open: {
                    transition: {
                      staggerChildren: reduce ? 0 : 0.055,
                      delayChildren: reduce ? 0 : 0.06,
                    },
                  },
                }}
              >
                {items.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={closeMobileNav}
                    className="rounded-xl px-1 py-4 text-base font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
                    variants={{
                      closed: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 12 },
                      open: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div
          className={[
            'flex flex-1 flex-col justify-end px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-12 sm:pt-8 lg:justify-center lg:px-12 lg:pb-20 lg:pt-10',
            mobileNavOpen ? 'max-lg:pointer-events-none max-lg:invisible max-lg:opacity-0' : '',
          ].join(' ')}
        >
          <div className="w-full max-w-7xl text-left">
            <div className="mb-7 flex w-full max-lg:-translate-y-[275px] lg:-translate-y-[75px] justify-start lg:mb-8">
              <div className="relative">
                <StudioBrandLogo className="mb-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]" />
              </div>
            </div>
            <h1 className="font-display text-[clamp(3.25rem,12vw,7.5rem)] font-normal leading-[0.95] tracking-tight text-white [text-shadow:0_2px_28px_rgba(0,0,0,0.95),0_0_40px_rgba(0,0,0,0.55),0_1px_0_rgba(255,255,255,0.35)]">
              Criar
            </h1>

            <p className="mt-2 font-sans text-xs font-light uppercase tracking-[0.35em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.9),0_0_24px_rgba(0,0,0,0.5)] sm:text-[12px] sm:tracking-[5px]">
              CONFORTO
            </p>
            <p className="mt-8 max-w-md text-sm font-light leading-[1.6] text-[#ddd] [text-shadow:0_2px_16px_rgba(0,0,0,0.92),0_1px_12px_rgba(0,0,0,0.65)] sm:mt-10 sm:max-w-lg">
              Móveis planejados com estética contemporânea e acabamento impecável — da medição à
              montagem, com acompanhamento direto do estúdio.
            </p>

            <div className="mt-8 flex w-full max-w-lg flex-row items-start justify-start gap-3 sm:mt-9 sm:max-w-2xl sm:gap-6 lg:max-w-3xl">
              {heroTeam.map((m) => (
                <div
                  key={m.name}
                  className="flex min-w-0 flex-1 items-start gap-2 text-left sm:gap-2.5"
                >
                  <img
                    src={facesCollage}
                    alt={m.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
                    style={{ objectPosition: m.photoObjectPosition }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0 pt-0.5">
                    <p className="line-clamp-3 min-h-[2.7em] font-display text-[11px] font-medium leading-snug tracking-tight text-white sm:min-h-[2.85em] sm:text-sm">
                      {m.name}
                    </p>
                    <p className="mt-1 text-[10px] font-normal leading-snug text-white/50 sm:text-xs">
                      {m.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
