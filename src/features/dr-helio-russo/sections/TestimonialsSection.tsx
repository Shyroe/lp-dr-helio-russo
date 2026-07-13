import * as React from 'react'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoData } from '../data'

type Testimonial = (typeof drHelioRussoData.testimonials.items)[number]

const testimonialItems = drHelioRussoData.testimonials.items
const desktopTestimonials = [
  testimonialItems[1],
  testimonialItems[2],
  testimonialItems[3],
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
] as const
const tabletTestimonials = [
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
  testimonialItems[1],
  testimonialItems[2],
  testimonialItems[3],
] as const
const mobileTestimonials = [
  testimonialItems[3],
  testimonialItems[4],
  testimonialItems[5],
  testimonialItems[0],
  testimonialItems[1],
  testimonialItems[2],
] as const

function GoogleIcon({ className }: { className?: string }) {
  return (
    <img
      src="/assets/landing/dr-helio-russo/trustindex/google-icon.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={20}
      height={20}
    />
  )
}

function VerifiedIcon() {
  return (
    <img
      src="/assets/landing/dr-helio-russo/trustindex/ti-verified.svg"
      alt="Avaliação verificada"
      className="ml-[7px] size-[15px] shrink-0"
      width={15}
      height={15}
    />
  )
}

function StarRating() {
  return (
    <span role="img" aria-label="5 de 5 estrelas" className="flex h-[17px] items-center">
      {['one', 'two', 'three', 'four', 'five'].map((star) => (
        <img
          key={star}
          src="/assets/landing/dr-helio-russo/trustindex/google-star-full.svg"
          alt=""
          aria-hidden="true"
          className="mr-px size-[17px] last:mr-0"
          width={17}
          height={17}
        />
      ))}
    </span>
  )
}

function TrustindexInfoIcon() {
  return (
    <img
      src="/assets/landing/dr-helio-russo/trustindex/ti-info-regular.svg"
      alt=""
      aria-hidden="true"
      className="size-[12px] shrink-0"
      width={12}
      height={12}
    />
  )
}

function ReviewAvatar({ review }: { review: Testimonial }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex size-10 shrink-0 items-center justify-center rounded-full text-[24px] font-normal leading-none text-white',
        review.avatarClass
      )}
    >
      {review.initial}
    </span>
  )
}

function ReviewCard({ review }: { review: Testimonial }) {
  const reviewTextRef = React.useRef<HTMLDivElement>(null)
  const [scrollThumbTop, setScrollThumbTop] = React.useState(0)
  const hasScrollIndicator = review.text.length > 120
  const scrollThumbHeight = review.text.length > 300 ? 24 : 44

  const syncScrollThumb = React.useCallback(() => {
    const element = reviewTextRef.current
    if (!element || element.scrollHeight <= element.clientHeight) {
      setScrollThumbTop(0)
      return
    }

    const maxScrollTop = element.scrollHeight - element.clientHeight
    const maxThumbTop = element.clientHeight - scrollThumbHeight
    setScrollThumbTop((element.scrollTop / maxScrollTop) * maxThumbTop)
  }, [scrollThumbHeight])

  return (
    <Card
      data-dr-helio-card="testimonial"
      data-review-name={review.name}
      role="article"
      aria-label={`Avaliação de ${review.name}`}
      className="h-[206px] gap-0 rounded-[8px] border border-[#d9d9d9] bg-white p-5 text-left font-[Arial,_sans-serif] text-black shadow-none"
    >
      <div className="flex items-start">
        <ReviewAvatar review={review} />
        <div className="relative top-px ml-[15px] min-w-0 flex-1 sm:ml-[14px]">
          <p className="truncate text-[15.5px] font-bold leading-[18px]">{review.name}</p>
          <p className="text-[13.5px] font-normal leading-4 text-[#8a8a8a] sm:text-xs">{review.date}</p>
        </div>
        <GoogleIcon className="ml-3 size-5 shrink-0" />
      </div>

      <div className="mt-[10px] flex h-[18px] items-center">
        <StarRating />
        <VerifiedIcon />
      </div>

      <div className="relative mt-[11px] h-[87px]">
        <section
          ref={reviewTextRef}
          tabIndex={hasScrollIndicator ? 0 : undefined}
          aria-label={`Texto da avaliação de ${review.name}`}
          data-dr-helio-review-scroll
          className="relative top-0.5 h-[87px] overflow-y-auto pr-[11px] text-[16.5px] font-normal leading-[21.5px] tracking-[0.1px] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0066af] sm:top-px sm:text-base sm:leading-[21px] sm:tracking-normal [&::-webkit-scrollbar]:hidden"
          onScroll={syncScrollThumb}
        >
          {review.text}
        </section>
        {hasScrollIndicator ? (
          <span aria-hidden="true" className="absolute right-0 top-0 h-[87px] w-[4px] bg-[#eeeeee]">
            <span
              className="absolute left-0 top-0 w-[4px] bg-[#9b9b9b]"
              style={{ height: `${scrollThumbHeight}px`, transform: `translateY(${scrollThumbTop}px)` }}
            />
          </span>
        ) : null}
      </div>
    </Card>
  )
}

function CarouselArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" className="size-[14px]" viewBox="0 0 14 14" fill="none">
      <path
        d={direction === 'left' ? 'm8.5 3-4 4 4 4' : 'm5.5 3 4 4-4 4'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type TestimonialsCarouselProps = {
  items: readonly Testimonial[]
  className?: string
  itemClassName: string
  showArrows?: boolean
  setApi?: (api: CarouselApi) => void
}

function TestimonialsCarousel({
  items,
  className,
  itemClassName,
  showArrows = false,
  setApi,
}: TestimonialsCarouselProps) {
  return (
    <Carousel
      aria-label="Avaliações de pacientes"
      tabIndex={0}
      data-dr-helio-testimonials-carousel
      className={cn(
        'mt-[45px] w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066af] sm:mt-[46px]',
        className
      )}
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
        loop: false,
      }}
      setApi={setApi}
    >
      <CarouselContent className="ml-0 gap-[18px]">
        {items.map((review, index) => (
          <CarouselItem
            key={review.name}
            aria-label={`${index + 1} de ${items.length}`}
            className={cn('pl-0', itemClassName)}
          >
            <ReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>

      {showArrows ? (
        <>
          <CarouselPrevious
            aria-label="Avaliação anterior"
            className="-left-[15px] size-[30px] border border-[#d9d9d9] bg-white p-0 text-[#777] shadow-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#0066af] focus-visible:ring-offset-2"
          >
            <CarouselArrowIcon direction="left" />
          </CarouselPrevious>
          <CarouselNext
            aria-label="Próxima avaliação"
            className="-right-[15px] size-[30px] border border-[#d9d9d9] bg-white p-0 text-[#777] shadow-none hover:bg-white focus-visible:ring-2 focus-visible:ring-[#0066af] focus-visible:ring-offset-2"
          >
            <CarouselArrowIcon direction="right" />
          </CarouselNext>
        </>
      ) : null}
    </Carousel>
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
      aria-labelledby="dr-helio-testimonials-title"
      className="bg-[#e8f2fa] px-[30px] pb-[30px] pt-[50px] text-center sm:px-10 sm:py-10 lg:px-20 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col items-center">
        <EntranceReveal
          as="h2"
          effect="fadeInUp"
          id="dr-helio-testimonials-title"
          className="relative -top-px w-full font-serif text-[25px] font-bold leading-[25px] tracking-[-0.4px] text-[#4f4f4f] sm:w-3/4 sm:text-[35px] sm:leading-[35px] lg:w-1/2"
        >
          <span>Veja O que Nossos Pacientes </span>
          <span className="text-[#0066af]">Estão Dizendo</span>
        </EntranceReveal>

        <EntranceReveal effect="fadeInUp" className="w-full sm:hidden">
          <TestimonialsCarousel items={mobileTestimonials} itemClassName="basis-full" setApi={setMobileApi} />
        </EntranceReveal>
        <EntranceReveal effect="fadeInUp" className="hidden w-full sm:block lg:hidden">
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
