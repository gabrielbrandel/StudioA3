type StudioLogoVariant = 'mark' | 'stacked'

const SRC: Record<StudioLogoVariant, string> = {
  mark: '/brand/logo-mark.png',
  stacked: '/brand/logo-stacked.png',
}

type Props = {
  variant?: StudioLogoVariant
  className?: string
  /** Quando true, trata como puramente visual (ex.: dentro de um link com texto visível). */
  decorative?: boolean
}

export function StudioLogo({ variant = 'stacked', className = '', decorative = false }: Props) {
  const title = 'Studio A3'

  return (
    <img
      src={SRC[variant]}
      alt={decorative ? '' : title}
      aria-hidden={decorative ? true : undefined}
      className={['object-contain', className].filter(Boolean).join(' ')}
      decoding="async"
    />
  )
}
