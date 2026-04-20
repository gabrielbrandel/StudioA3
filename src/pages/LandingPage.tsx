import { Footer } from '../components/Footer'
import { HeroSection } from '../components/HeroSection'
import { IntroArchitectureSection } from '../components/IntroArchitectureSection'
import { LeadFormSection } from '../components/LeadFormSection'
import { PortfolioSection } from '../components/PortfolioSection'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { WhatsappFloatingButton } from '../components/WhatsappFloatingButton'

export function LandingPage() {
  return (
    <div className="relative min-h-screen min-w-0 overflow-x-clip bg-black text-white">
      <main className="relative z-0 mx-auto min-w-0 w-full">
        <HeroSection />
        <IntroArchitectureSection />
        <PortfolioSection />
        <LeadFormSection />
      </main>
      <Footer />
      <ScrollToTopButton />
      <WhatsappFloatingButton />
    </div>
  )
}
