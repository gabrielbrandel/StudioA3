import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { title?: string }

export function IconSparkles(props: IconProps) {
  const { title = 'Destaque', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.5 13.2l.6 2.6 2.4.9-2.4.9-.6 2.6-.6-2.6-2.4-.9 2.4-.9.6-2.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function IconClock(props: IconProps) {
  const { title = 'Prazo', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconRuler(props: IconProps) {
  const { title = 'Sob medida', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M4 8.5 8.5 4 20 15.5 15.5 20 4 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7 7l2 2M9 5l1 1M11 9l1 1M13 11l2 2M15 13l1 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconChat(props: IconProps) {
  const { title = 'Atendimento', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M7 18l-3 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 8h8M8 12h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconBuilding(props: IconProps) {
  const { title = 'Apartamento', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M6 22V3h12v19"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 6h2M9 10h2M9 14h2M13 6h2M13 10h2M13 14h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10 22v-4h4v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconWhatsapp(props: IconProps) {
  const { title = 'WhatsApp', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M12 21a9 9 0 0 0 7.8-13.5A9 9 0 0 0 3.9 18.8L3 22l3.3-.9A8.9 8.9 0 0 0 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.7c.2-.5.4-.6.7-.6h.5c.2 0 .4 0 .6.5l.7 1.6c.1.3.1.5-.1.7l-.4.4c-.2.2-.2.4 0 .7.4.7 1.3 1.6 2.1 2 .3.2.5.2.7 0l.5-.4c.2-.2.4-.2.7-.1l1.6.7c.5.2.5.4.5.6v.5c0 .3-.1.5-.6.7-.7.3-1.7.2-2.9-.4-1.3-.6-2.7-1.8-3.7-3.1-1-1.3-1.5-2.4-1.3-3.2Z"
        fill="currentColor"
        opacity=".9"
      />
    </svg>
  )
}

export function IconInstagram(props: IconProps) {
  const { title = 'Instagram', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M7.2 3h9.6A4.2 4.2 0 0 1 21 7.2v9.6A4.2 4.2 0 0 1 16.8 21H7.2A4.2 4.2 0 0 1 3 16.8V7.2A4.2 4.2 0 0 1 7.2 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.2A4.2 4.2 0 1 0 12 7.8a4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.4 6.6h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconArrowUpRight(props: IconProps) {
  const { title = 'Abrir', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconHome(props: IconProps) {
  const { title = 'Início', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path d="M3 11.5 12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5 10v10h14V10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

export function IconGrid(props: IconProps) {
  const { title = 'Portfólio', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export function IconListCheck(props: IconProps) {
  const { title = 'Processo', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path d="M9 6h12M9 12h12M9 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 5.5l1.6 1.6L7 5M3 11.5l1.6 1.6L7 11M3 17.5l1.6 1.6L7 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconStar(props: IconProps) {
  const { title = 'Provas', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="m12 3 2.6 5.7L21 9.6l-4.7 4.1 1.3 6.3L12 17l-5.6 3 1.3-6.3L3 9.6l6.4-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconUser(props: IconProps) {
  const { title = 'Sobre', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconDocument(props: IconProps) {
  const { title = 'Orçamento', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function IconHeart(props: IconProps) {
  const { title = 'Curtir', ...rest } = props
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-label={title} {...rest}>
      <path
        d="M12 20.6s-7-4.1-9.3-8.3C.9 8.8 3 6 6.2 6c1.8 0 3.2 1 3.8 2.1C10.6 7 12 6 13.8 6 17 6 19.1 8.8 21.3 12.3 19 16.5 12 20.6 12 20.6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

