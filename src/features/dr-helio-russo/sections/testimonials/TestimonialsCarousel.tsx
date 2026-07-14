import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { ReviewCard } from './ReviewCard'
import type { Testimonial } from './testimonials-data'

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

export function TestimonialsCarousel({
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
