import { useEffect, useMemo, useState, type ComponentType, type SVGProps } from 'react'
import { ButtonLink } from './Button'
import {
  IconChevronLeft,
  IconDocument,
  IconGrid,
  IconHome,
  IconInstagram,
  IconListCheck,
  IconSparkles,
  IconStar,
  IconUser,
  IconWhatsapp,
} from './Icons'
import { useActiveSection } from '../hooks/useActiveSection'
import { buildWhatsAppLink, SITE } from '../pages/siteConfig'
import { StudioLogo } from './StudioLogo'

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { title?: string }>

type NavItem = { id: string; label: string; Icon: IconComponent }

/** Mesma cor de fundo do Footer (`bg-studio-900`) para padronizar. */
const NAV_BG = '#252220'
const WIDTH_EXPANDED = '18rem'
const WIDTH_COLLAPSED = '5rem'

export function Sidebar() {
  const items: NavItem[] = useMemo(
    () => [
      { id: 'inicio', label: 'Início', Icon: IconHome },
      { id: 'pilares', label: 'Serviços', Icon: IconSparkles },
      { id: 'portfolio', label: 'Portfólio', Icon: IconGrid },
      { id: 'processo', label: 'Processo', Icon: IconListCheck },
      { id: 'provas', label: 'Provas', Icon: IconStar },
      { id: 'sobre', label: 'Sobre', Icon: IconUser },
      { id: 'contato', label: 'Orçamento', Icon: IconDocument },
    ],
    [],
  )

  const active = useActiveSection(items.map((i) => i.id))
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const close = () => setOpen(false)

  /** Mantém o `<main>` alinhado à largura atual do sidebar (via CSS variable). */
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--sidebar-w', collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED)
    return () => {
      root.style.removeProperty('--sidebar-w')
    }
  }, [collapsed])

  /** Lock scroll enquanto drawer mobile aberto. */
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      body.style.position = prev.bodyPosition
      body.style.top = prev.bodyTop
      body.style.width = prev.bodyWidth
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function SidebarContent({
    isCollapsed,
    mobileOpen = true,
  }: {
    isCollapsed: boolean
    mobileOpen?: boolean
  }) {
    return (
      <div
        className="relative flex h-full w-full flex-col text-studio-50 ring-1 ring-white/5 transition-all duration-300 ease-out"
        style={{ backgroundColor: NAV_BG }}
      >
        {/* ——— Topo: logo ——— */}
        <div className={['flex items-center border-b border-white/10 transition-all duration-300', isCollapsed ? 'justify-center px-3 py-5' : 'justify-center px-5 py-6'].join(' ')}>
          <a
            href="#inicio"
            onClick={close}
            aria-label="Studio A3 — Ir para o início"
            className="inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
          >
            {isCollapsed ? (
              <StudioLogo
                variant="mark"
                decorative
                className="h-10 w-10 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
              />
            ) : (
              <StudioLogo
                variant="stacked"
                decorative
                className="h-[4.75rem] w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            )}
          </a>
        </div>

        {/* ——— Itens ——— */}
        <nav
          className={['flex-1 overflow-y-auto py-5 transition-all duration-300', isCollapsed ? 'px-2' : 'px-3'].join(' ')}
          aria-label="Navegação principal"
        >
          <ul className="flex flex-col gap-1.5">
            {items.map(({ id, label, Icon }, idx) => {
              const isActive = id === active
              return (
                <li
                  key={id}
                  className="transform transition-[transform,opacity] duration-500 ease-out"
                  style={{
                    transitionDelay: mobileOpen ? `${80 + idx * 40}ms` : '0ms',
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-12px)',
                  }}
                >
                  <a
                    href={`#${id}`}
                    onClick={close}
                    title={isCollapsed ? label : undefined}
                    className={[
                      'group flex items-center rounded-2xl text-[13px] font-semibold transition-all duration-300 ease-out',
                      isCollapsed
                        ? 'justify-center h-11 w-11 mx-auto px-0 py-0'
                        : 'gap-3 px-3.5 py-3',
                      isActive
                        ? 'bg-studio-950/70 text-white shadow-inner ring-1 ring-white/5'
                        : 'text-studio-100/85 hover:bg-white/5 hover:text-white hover:translate-x-0.5',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      className={[
                        'h-5 w-5 shrink-0 transition-colors duration-300',
                        isActive ? 'text-white' : 'text-studio-200/80 group-hover:text-white',
                      ].join(' ')}
                    />
                    {!isCollapsed && <span>{label}</span>}
                    {!isCollapsed && isActive ? (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white/70" aria-hidden />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ——— Rodapé: só ícones ——— */}
        <div className={['border-t border-white/10 py-4 transition-all duration-300', isCollapsed ? 'px-2' : 'px-4'].join(' ')}>
          <div className={['flex items-center gap-3', isCollapsed ? 'flex-col' : 'justify-center'].join(' ')}>
            <ButtonLink
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              size="sm"
              variant="whatsapp"
              iconOnly
              aria-label="WhatsApp StudioA3"
              title="WhatsApp"
              leftIcon={<IconWhatsapp className="h-5 w-5" />}
              className="inline-flex h-11 w-11 rounded-full ring-1 ring-white/20 shadow-[0_12px_28px_-18px_rgba(37,211,102,0.65)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            />
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
              className="inline-flex h-11 w-11 rounded-full ring-1 ring-white/20 shadow-[0_12px_28px_-18px_rgba(214,36,159,0.55)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ——— Topbar mobile ——— */}
      <header
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 py-2.5 text-studio-50 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.55)] sm:px-5 sm:py-3 lg:hidden"
        style={{ backgroundColor: NAV_BG }}
      >
        <a
          href="#inicio"
          className="inline-flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
          onClick={close}
          aria-label="Studio A3 — Ir para o início"
        >
          <StudioLogo
            variant="stacked"
            decorative
            className="h-[3.4rem] w-auto object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] sm:h-[3.85rem]"
          />
        </a>
        <HamburgerButton open={open} onClick={() => setOpen((v) => !v)} />
      </header>

      {/* ——— Sidebar desktop ——— */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden flex-col transition-[width] duration-300 ease-out lg:flex"
        style={{ width: collapsed ? WIDTH_COLLAPSED : WIDTH_EXPANDED }}
        aria-label="Menu lateral"
        data-collapsed={collapsed || undefined}
      >
        <SidebarContent isCollapsed={collapsed} />

        {/* Botão para ocultar/mostrar o menu */}
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-pressed={collapsed}
          aria-label={collapsed ? 'Expandir menu' : 'Ocultar menu'}
          title={collapsed ? 'Expandir menu' : 'Ocultar menu'}
          className="absolute top-20 -right-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-studio-950 text-studio-50 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/15 transition-transform duration-300 ease-out hover:bg-studio-900 hover:scale-105"
        >
          <IconChevronLeft
            className={['h-4 w-4 transition-transform duration-300 ease-out', collapsed ? 'rotate-180' : ''].join(' ')}
          />
        </button>
      </aside>

      {/* ——— Drawer mobile (sempre montado, animado) ——— */}
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={close}
        tabIndex={open ? 0 : -1}
        className={[
          'fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />
      <aside
        id="sidebar-mobile"
        aria-hidden={!open}
        className={[
          'fixed inset-y-0 left-0 z-[110] w-[min(20rem,86vw)] transform transition-transform duration-300 ease-out will-change-transform lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <SidebarContent isCollapsed={false} mobileOpen={open} />
      </aside>
    </>
  )
}

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="sidebar-mobile"
      aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 transition-all duration-300 ease-out hover:bg-white/25 active:scale-95"
    >
      <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
      <span className="relative block h-4 w-5">
        <span
          aria-hidden
          className={[
            'absolute left-0 right-0 top-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out',
            open ? 'top-1/2 -translate-y-1/2 rotate-45' : '',
          ].join(' ')}
        />
        <span
          aria-hidden
          className={[
            'absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out',
            open ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100',
          ].join(' ')}
        />
        <span
          aria-hidden
          className={[
            'absolute left-0 right-0 bottom-0 h-[2px] rounded-full bg-current transition-all duration-300 ease-out',
            open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : '',
          ].join(' ')}
        />
      </span>
    </button>
  )
}
