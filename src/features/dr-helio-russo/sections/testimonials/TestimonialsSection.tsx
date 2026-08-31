import * as React from 'react'
import type { CarouselApi } from '@/components/ui/carousel'

import { EntranceReveal } from '../../animations/EntranceReveal'
import { TestimonialsCarousel } from './TestimonialsCarousel'
import { desktopTestimonials, mobileTestimonials, tabletTestimonials, testimonialItems } from './testimonials-data'

function TrustindexInfoIcon() {
  return (
    <img
      src="/assets/landing/dr-helio-russo/trustindex/ti-info-regular.svg"
      alt=""
      aria-hidden="true"
      className="size-[12px] shrink-0"
      width={12}
      height={12}
      loading="lazy"
    />
  )
}

export function TestimonialsSection() {
  const [mobileApi, setMobileApi] = React.useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = React.useState(3)

  React.useEffect(() => {
    if (!mobileApi) return

    const syncSelectedIndex = () => {
      const selectedReview = mobileTestimonials[mobileApi.selectedScrollSnap()]
      const originalIndex = testimonialItems.indexOf(selectedReview)
      setSelectedIndex(originalIndex >= 0 ? originalIndex : 0)
    }

    syncSelectedIndex()
    mobileApi.on('select', syncSelectedIndex)
    mobileApi.on('reInit', syncSelectedIndex)

    return () => {
      mobileApi.off('select', syncSelectedIndex)
      mobileApi.off('reInit', syncSelectedIndex)
    }
  }, [mobileApi])

  return (
    <section
      data-section="testimonials"
      aria-labelledby="dr-helio-testimonials-title"
      className="bg-[#e8f2fa] px-[30px] pb-[30px] pt-[50px] text-center [contain-intrinsic-size:auto_373px] [content-visibility:auto] md:px-10 md:py-10 md:[contain-intrinsic-size:auto_362px] lg:px-20 lg:py-20 lg:[contain-intrinsic-size:auto_362px]"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col items-center">
        <EntranceReveal
          as="h2"
          effect="fadeInUp"
          id="dr-helio-testimonials-title"
          className="relative -top-px w-full font-serif text-[25px] font-bold leading-[25px] tracking-[-0.4px] text-[#4f4f4f] md:w-3/4 md:text-[35px] md:leading-[35px] lg:w-1/2"
        >
          <span>Veja O que Nossos Pacientes </span>
          <span className="text-[#0066af]">Estão Dizendo</span>
        </EntranceReveal>

        <EntranceReveal effect="fadeInUp" className="w-full md:hidden">
          <TestimonialsCarousel items={mobileTestimonials} itemClassName="basis-full" setApi={setMobileApi} />
        </EntranceReveal>
        <EntranceReveal effect="fadeInUp" className="hidden w-full md:block lg:hidden">
          <TestimonialsCarousel items={tabletTestimonials} itemClassName="basis-[calc((100%-18px)/2)]" />
        </EntranceReveal>
        <EntranceReveal effect="fadeInUp" className="hidden w-full lg:block">
          <TestimonialsCarousel
            items={desktopTestimonials}
            className="mx-auto max-w-[1106px]"
            itemClassName="basis-[calc((100%-36px)/3)]"
            showArrows
          />
        </EntranceReveal>

        <div
          aria-hidden="true"
          data-dr-helio-testimonials-progress
          className="relative mt-[23px] hidden h-[3px] w-[150px] bg-[#b8bfc4] max-[767px]:block"
        >
          <span
            className="absolute left-0 top-0 h-[3px] w-[25px] bg-[#5e5e5e] transition-transform"
            style={{ transform: `translateX(${Math.min(selectedIndex, 5) * 25}px)` }}
          />
        </div>

        <div
          data-dr-helio-testimonials-badge
          className="mt-[14px] flex h-[26px] w-[183px] self-end items-center justify-center gap-[3px] rounded-[2px] bg-[#d6f3e6] font-[Arial,_sans-serif] text-xs font-bold leading-[14px] tracking-[0.3px] text-black max-[767px]:mt-[20px] max-[767px]:self-center"
        >
          <span>Certificado: Trustindex</span>
          <TrustindexInfoIcon />
        </div>
      </div>
    </section>
  )
}
