const STATS = [
  { value: '30', label: 'Dias em média' },
  { value: '3', label: 'Especialistas' },
  { value: '100%', label: 'Acompanhamento' },
  { value: '1', label: 'Time familiar' },
] as const

export function HeroStatsStrip() {
  return (
    <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-3 px-1 sm:mt-8 sm:grid-cols-4 sm:gap-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-studio-600/40 bg-studio-900/60 px-4 py-4 text-center shadow-inner backdrop-blur-sm sm:rounded-3xl sm:py-5"
        >
          <p className="font-display text-2xl tracking-tight text-studio-50 sm:text-3xl">{s.value}</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-studio-300 sm:text-[11px]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
