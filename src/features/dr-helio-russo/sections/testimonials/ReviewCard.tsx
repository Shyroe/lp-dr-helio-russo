import * as React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import type { Testimonial } from './testimonials-data'

function GoogleIcon({ className }: { className?: string }) {
  return (
    <img
      src="/assets/landing/dr-helio-russo/trustindex/google-icon.svg"
      alt=""
      aria-hidden="true"
      className={className}
      width={20}
      height={20}
      loading="lazy"
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
      loading="lazy"
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
          loading="lazy"
        />
      ))}
    </span>
  )
}

function ReviewAvatar({ review }: { review: Testimonial }) {
  if (review.avatar) {
    return (
      <img
        data-dr-helio-review-avatar
        src={review.avatar}
        alt=""
        aria-hidden="true"
        className="size-10 shrink-0 rounded-full object-cover"
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <span
      data-dr-helio-review-avatar
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

export function ReviewCard({ review }: { review: Testimonial }) {
  const reviewTextRef = React.useRef<HTMLElement>(null)
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
        <div className="relative top-px ml-[15px] min-w-0 flex-1 md:ml-[14px]">
          <p className="truncate text-[15.5px] font-bold leading-[18px]">{review.name}</p>
          <p className="text-[13.5px] font-normal leading-4 text-[#767676] md:text-xs">{review.date}</p>
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
          className="relative top-0.5 h-[87px] overflow-y-auto pr-[11px] text-[16.5px] font-normal leading-[21.5px] tracking-[0.1px] [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0066af] md:top-px md:text-base md:leading-[21px] md:tracking-normal [&::-webkit-scrollbar]:hidden"
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
