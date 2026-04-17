import type { ReactNode } from 'react'
import { AboutSection } from '../components/AboutSection'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { KeywordsMarquee } from '../components/KeywordsMarquee'
import { LeadFormSection } from '../components/LeadFormSection'
import { Navbar } from '../components/Navbar'
import { PillarsSection } from '../components/PillarsSection'
import { PortfolioSection } from '../components/PortfolioSection'
import { ProcessSection } from '../components/ProcessSection'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { StudioBackdrop } from '../components/StudioBackdrop'
import { WhatsappProofSection } from '../components/WhatsappProofSection'
import { WhatsappFloatingButton } from '../components/WhatsappFloatingButton'

function LightSectionCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[1.65rem] bg-studio-50 text-studio-900 shadow-[0_24px_70px_-36px_rgba(0,0,0,0.45)] ring-1 ring-studio-200/45 sm:rounded-[2rem]">
      {children}
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="relative min-h-screen min-w-0 overflow-x-clip bg-studio-950 text-studio-100">
      <StudioBackdrop mood="dark" />
      <Navbar />
      <main className="relative z-0 mx-auto min-w-0 max-w-6xl space-y-5 px-4 pb-16 pt-4 sm:space-y-6 sm:px-6 sm:pt-6 lg:px-8">
        <HeroSection />

        <div className="relative -mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)] lg:-mx-8 lg:w-[calc(100%+4rem)]">
          <KeywordsMarquee />
        </div>

        <LightSectionCard>
          <PillarsSection />
        </LightSectionCard>

        <LightSectionCard>
          <PortfolioSection />
        </LightSectionCard>

        <ProcessSection />

        <LightSectionCard>
          <WhatsappProofSection />
        </LightSectionCard>

        <LightSectionCard>
          <AboutSection />
        </LightSectionCard>

        <CtaSection />

        <LightSectionCard>
          <LeadFormSection />
        </LightSectionCard>
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsappFloatingButton />
    </div>
  )
}
