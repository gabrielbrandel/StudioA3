type StudioBackdropProps = {
  /** `dark`: fundo para shell Creatix (cartões claros sobre escuro). */
  mood?: 'light' | 'dark'
}

export function StudioBackdrop({ mood = 'light' }: StudioBackdropProps) {
  if (mood === 'dark') {
    /**
     * Fundo escuro com variação: base `studio-950` + halos radiais em tons
     * taupe/marrom da paleta (studio-700/800 e `a3-taupe-deep`) para evitar
     * um preto chapado. Mantém-se fixo para não competir com o scroll.
     */
    return (
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-studio-950">
        {/* Halo superior centralizado (atrás do hero) — tom taupe quente */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 700px at 50% -8%, rgba(122,112,104,0.35), transparent 62%)',
          }}
        />
        {/* Halo direito mid — tom marrom médio */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 720px at 108% 38%, rgba(92,81,73,0.35), transparent 58%)',
          }}
        />
        {/* Halo inferior-esquerda — tom taupe escuro, baixa opacidade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 620px at 6% 108%, rgba(122,112,104,0.3), transparent 60%)',
          }}
        />
        {/* Slab diagonal suave para criar linhas diagonais na composição */}
        <div
          className="absolute left-[-6%] top-[14%] h-[620px] w-[900px] rotate-[-6deg] bg-studio-800/25"
          style={{ clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 92%)' }}
        />
        <div
          className="absolute -right-[10%] bottom-[6%] h-[540px] w-[780px] rotate-[8deg] bg-studio-900/70"
          style={{ clipPath: 'polygon(0 8%, 92% 0, 100% 100%, 6% 100%)' }}
        />

        {/* Gradiente vertical discreto para profundidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />

        {/* Micro-textura */}
        <div className="studio-noise absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* slabs com “recorte” (cinza) */}
      <div
        className="absolute -left-[18%] top-[8%] h-[720px] w-[980px] rotate-[-8deg] bg-studio-200/35"
        style={{ clipPath: 'polygon(12% 0, 100% 0, 100% 78%, 78% 100%, 0 92%)' }}
      />
      <div
        className="absolute -right-[16%] top-[34%] h-[760px] w-[980px] rotate-[10deg] bg-studio-300/25"
        style={{ clipPath: 'polygon(0 0, 92% 0, 100% 18%, 100% 100%, 10% 100%, 0 86%)' }}
      />
      <div
        className="absolute left-[8%] bottom-[-18%] h-[820px] w-[1100px] rotate-[3deg] bg-studio-200/30"
        style={{ clipPath: 'polygon(0 10%, 18% 0, 100% 0, 100% 100%, 0 100%)' }}
      />

      {/* blobs suaves (menos branco) */}
      <div className="absolute -left-44 top-[-12%] h-[560px] w-[560px] rounded-full bg-studio-200/35 blur-3xl" />
      <div className="absolute left-[16%] top-[16%] h-[560px] w-[560px] rounded-full bg-studio-300/25 blur-3xl" />
      <div className="absolute right-[-12%] top-[10%] h-[680px] w-[680px] rounded-full bg-studio-200/30 blur-3xl" />
      <div className="absolute right-[12%] bottom-[-14%] h-[760px] w-[760px] rounded-full bg-studio-100/35 blur-3xl" />
      <div className="absolute left-[-14%] bottom-[6%] h-[620px] w-[620px] rounded-full bg-studio-200/28 blur-3xl" />

      {/* vinheta leve + micro-textura */}
      <div className="absolute inset-0 bg-[radial-gradient(980px_620px_at_50%_0%,rgba(255,255,255,.22),transparent_62%)]" />
      <div className="studio-noise absolute inset-0 opacity-[0.35]" />

      <div className="absolute inset-0 bg-gradient-to-b from-studio-950/10 via-transparent to-studio-950/10" />
    </div>
  )
}
