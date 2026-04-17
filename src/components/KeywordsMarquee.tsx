const WORDS = [
  'Cozinhas planejadas',
  'Closets',
  'Painéis',
  'Quartos',
  'Banheiros',
  'Montagem',
  'MDF premium',
  'Projeto 3D',
  'Apartamentos novos',
  'Studio A3',
] as const

export function KeywordsMarquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="relative overflow-hidden border-y border-studio-700/35 bg-studio-900/90 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-studio-200/90 sm:text-xs">
      <div className="animate-studio-marquee flex w-max gap-10 pr-10">
        {row.map((w, i) => (
          <span key={`${w}-${i}`} className="shrink-0">
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
