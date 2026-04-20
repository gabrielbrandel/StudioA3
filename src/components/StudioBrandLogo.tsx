/**
 * Logo Studio A3 em tipografia + bloco (equivalente ao HTML/CSS de referência),
 * sem imagem — Montserrat extraleve + caixa A3.
 * Escala ~200% face ao layout base (24/32px no texto, 40/50px na caixa).
 */
export function StudioBrandLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={[
        'flex max-w-full flex-nowrap items-center gap-5 text-[#d6d0c6] md:gap-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Studio A3"
    >
      <div className="shrink-0 font-sans text-5xl font-extralight tracking-[10px] md:text-[64px] md:tracking-[10px]">
        studio
      </div>
      <div className="h-[72px] w-1 shrink-0 bg-[#d6d0c6] opacity-50 md:h-[70px]" aria-hidden />
      <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-[#d6d0c6] md:h-[100px] md:w-[100px]">
        <span className="font-display text-[26px] font-normal leading-none tracking-[4px] text-[#444] md:text-[28px]">
          A3
        </span>
      </div>
    </div>
  )
}
