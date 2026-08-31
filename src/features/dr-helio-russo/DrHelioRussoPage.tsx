import { Hydrate } from '@tanstack/react-start'
import { visible } from '@tanstack/react-start/hydration'

import { ExperiencePreviewSection } from './sections/ExperiencePreviewSection'
import { FaqSection } from './sections/FaqSection'
import { FooterSection } from './sections/FooterSection'
import { HeroSection } from './sections/HeroSection'
import { HygieneBenefitsSection } from './sections/HygieneBenefitsSection'
import { LifeStagesSection } from './sections/LifeStagesSection'
import { TreatmentsSection } from './sections/TreatmentsSection'
import { TestimonialsSection } from './sections/testimonials/TestimonialsSection'
import { WhyChoosePreviewSection } from './sections/WhyChoosePreviewSection'

const belowFoldHydration = visible({ rootMargin: '250px 0px' })

export function DrHelioRussoPage() {
  return (
    <div className="dr-helio-shell min-h-svh overflow-x-clip bg-white font-sans text-[var(--dr-helio-ink)] antialiased">
      <main>
        <HeroSection />

        <Hydrate when={belowFoldHydration}>
          <ExperiencePreviewSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <WhyChoosePreviewSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <LifeStagesSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <HygieneBenefitsSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <TreatmentsSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <TestimonialsSection />
        </Hydrate>

        <Hydrate when={belowFoldHydration}>
          <FaqSection />
        </Hydrate>
      </main>

      <Hydrate when={belowFoldHydration}>
        <FooterSection />
      </Hydrate>
    </div>
  )
}
