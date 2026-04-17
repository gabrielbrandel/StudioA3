type StudioBackdropProps = {
  /** `dark`: fundo para shell Creatix (cartões claros sobre escuro). */
  mood?: 'light' | 'dark'
}

export function StudioBackdrop({ mood = 'light' }: StudioBackdropProps) {
  if (mood === 'dark') {
    return (
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-studio-950">
        <div
          className="absolute -left-[18%] top-[6%] h-[640px] w-[920px] rotate-[-7deg] bg-studio-900/55"
          style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 82%, 72% 100%, 0 90%)' }}
        />
        <div
          className="absolute -right-[14%] top-[32%] h-[680px] w-[900px] rotate-[9deg] bg-studio-800/35"
          style={{ clipPath: 'polygon(0 0, 90% 0, 100% 16%, 100% 100%, 8% 100%, 0 88%)' }}
        />
        <div className="absolute -left-32 top-[-10%] h-[480px] w-[480px] rounded-full bg-studio-800/30 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-[560px] w-[560px] rounded-full bg-studio-700/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(980px_520px_at_50%_0%,rgba(239,234,229,.07),transparent_58%)]" />
        <div className="studio-noise absolute inset-0 opacity-[0.14] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
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
