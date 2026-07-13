import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoData } from '../data'

function AccordionStateIcon() {
  return (
    <span aria-hidden="true" className="relative block h-[15px] shrink-0">
      <svg
        aria-hidden="true"
        className="block h-[15px] w-[9.375px] fill-current group-data-[state=open]:hidden"
        viewBox="0 0 320 512"
      >
        <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
      </svg>
      <svg
        aria-hidden="true"
        className="hidden h-[15px] w-[5.625px] fill-current group-data-[state=open]:block"
        viewBox="0 0 192 512"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
      </svg>
    </span>
  )
}

export function FaqSection() {
  const { faq } = drHelioRussoData

  return (
    <section
      aria-labelledby="dr-helio-faq-title"
      className="min-h-[1230px] bg-[#e8f2fa] px-[30px] pb-[29px] pt-[30px] sm:min-h-0 sm:px-10 sm:pb-0 sm:pt-10 lg:px-20 lg:pb-[2.5px] lg:pt-20"
    >
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 lg:grid-cols-[570px_540px] lg:gap-5">
        <div className="order-2 mt-10 flex justify-center lg:order-1 lg:mt-0 lg:justify-start">
          <EntranceReveal
            as="img"
            effect="fadeInLeft"
            data-dr-helio-faq-image
            src="/assets/landing/dr-helio-russo/tooth-mirror.png"
            alt="Modelo de dente com implante e espelho odontológico"
            width={1080}
            height={1350}
            className="h-auto w-full max-w-[330px] object-contain sm:max-w-[386.38px] lg:max-w-none lg:w-[570px]"
          />
        </div>

        <div className="order-1 w-full lg:order-2 lg:w-[540px]">
          <EntranceReveal
            as="h2"
            effect="fadeInUp"
            id="dr-helio-faq-title"
            className="relative top-[13px] w-full text-center font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#4f4f4f] sm:top-6 sm:text-[35px] sm:leading-[35px] lg:text-left"
          >
            <span>Perguntas </span>
            <span className="text-[#0066af]">Frequentes</span>
          </EntranceReveal>

          <EntranceReveal effect="fadeInRight">
            <Accordion
              type="single"
              collapsible
              data-dr-helio-faq-accordion
              className="mt-[55px] flex w-full flex-col gap-[10px] font-[Arial,_sans-serif] sm:mx-[10px] sm:mt-[65px] sm:w-[calc(100%-20px)] lg:mx-0 lg:w-full"
            >
              {faq.items.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index + 1}`}
                  data-dr-helio-faq-item
                  className="rounded-[20px] border border-[#d9d9d9] bg-white text-black transition-colors duration-[400ms] data-[state=open]:bg-[#0066af] data-[state=open]:text-white"
                >
                  <AccordionTrigger className="group min-h-[44px] gap-[10px] px-[10px] py-[10px] text-[16px] font-normal leading-[24px] hover:no-underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0066af] data-[state=open]:focus-visible:ring-[#ffdc51]">
                    <AccordionStateIcon />
                    <span className="min-w-0 flex-1">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-[10px] pb-[10px] text-[16px] [animation-duration:400ms] font-normal leading-[24px]">
                    <EntranceReveal effect="fadeInUp" trigger="mount">
                      {item.answer}
                    </EntranceReveal>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </EntranceReveal>
        </div>
      </div>
    </section>
  )
}
