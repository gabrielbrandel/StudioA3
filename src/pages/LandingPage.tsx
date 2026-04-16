import { AboutSection } from '../components/AboutSection'
import { CtaSection } from '../components/CtaSection'
import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { LeadFormSection } from '../components/LeadFormSection'
import { Navbar } from '../components/Navbar'
import { PillarsSection } from '../components/PillarsSection'
import { PortfolioSection } from '../components/PortfolioSection'
import { ProcessSection } from '../components/ProcessSection'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { StudioBackdrop } from '../components/StudioBackdrop'
import { WhatsappProofSection } from '../components/WhatsappProofSection'
import { WhatsappFloatingButton } from '../components/WhatsappFloatingButton'

export function LandingPage() {
  return (
    <div className="relative min-h-dvh min-w-0 overflow-x-hidden bg-transparent">
      <StudioBackdrop />
      <Navbar />
      <main className="min-w-0 overflow-x-hidden">
        <HeroSection />
        <PillarsSection />
        <PortfolioSection />
        <ProcessSection />
        <WhatsappProofSection />
        <AboutSection />
        <CtaSection />
        <LeadFormSection />
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsappFloatingButton />
    </div>
  )
}

