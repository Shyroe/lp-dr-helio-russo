import { ExperiencePreviewSection } from './sections/ExperiencePreviewSection'
import { FaqSection } from './sections/FaqSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { HygieneBenefitsSection } from './sections/HygieneBenefitsSection'
import { LifeStagesSection } from './sections/LifeStagesSection'
import { TreatmentsSection } from './sections/TreatmentsSection'
import { TestimonialsSection } from './sections/testimonials/TestimonialsSection'
import { WhyChoosePreviewSection } from './sections/WhyChoosePreviewSection'

export function DrHelioRussoPage() {
  return (
    <div className="dr-helio-shell min-h-svh overflow-x-clip bg-white font-sans text-[var(--dr-helio-ink)] antialiased">
      <main>
        <HeroSection />
        <ExperiencePreviewSection />
        <WhyChoosePreviewSection />
        <LifeStagesSection />
        <HygieneBenefitsSection />
        <TreatmentsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </div>
  )
}
