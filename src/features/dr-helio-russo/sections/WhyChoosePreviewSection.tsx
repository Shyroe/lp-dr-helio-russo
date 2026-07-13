import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

const cardTones = [
  {
    border: 'border-b-[#0A3D62]',
    icon: 'text-[#004374]',
    title: 'text-[#004374]',
  },
  {
    border: 'border-b-[#0066AF]',
    icon: 'text-[#0066AF]',
    title: 'text-[#0066AF]',
  },
  {
    border: 'border-b-[#004374]',
    icon: 'text-[#004374]',
    title: 'text-[#004374]',
  },
  {
    border: 'border-b-[#0066AF]',
    icon: 'text-[#0066AF]',
    title: 'text-[#0066AF]',
  },
  {
    border: 'border-b-[#004374]',
    icon: 'text-[#004374]',
    title: 'text-[#004374]',
  },
  {
    border: 'border-b-[#0066AF]',
    icon: 'text-[#0066AF]',
    title: 'text-[#0066AF]',
  },
] as const

export function WhyChoosePreviewSection() {
  const { whyChoose, cta, whatsappUrl } = drHelioRussoData

  return (
    <section
      aria-labelledby="dr-helio-why-title"
      className="bg-[rgba(0,113,196,0.09)] px-[30px] py-[30px] text-center sm:px-10 sm:pt-10 sm:pb-[39px] lg:px-20 lg:pt-20 lg:pb-[81px]"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-[30px]">
        <EntranceReveal
          as="h2"
          effect="fadeInUp"
          id="dr-helio-why-title"
          className="w-full max-w-full font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#004374] sm:max-w-[73%] sm:text-[35px] sm:leading-[35px] lg:max-w-[43%]"
        >
          Por Que Escolher Nosso Consultório?
        </EntranceReveal>

        <div className="mt-5 grid w-full grid-cols-1 gap-5 sm:auto-rows-[287px] sm:grid-cols-3 lg:max-w-[80%] lg:auto-rows-[259px]">
          {whyChoose.map((item, index) => {
            const tone = cardTones[index] ?? cardTones[0]

            return (
              <EntranceReveal
                key={item.title}
                effect={index % 3 === 0 ? 'fadeInLeft' : index % 3 === 2 ? 'fadeInRight' : 'zoomIn'}
                className="h-full"
              >
                <Card
                  data-dr-helio-card="why-choose"
                  className={cn(
                    'gap-0 rounded-[20px] border-0 border-b-[5px] bg-white p-5 text-center shadow-[0_0_10px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:shadow-[0_0_15px_10px_rgba(255,255,255,0.5)] sm:h-full',
                    ['h-[208px]', 'h-[207px]', 'h-[229px]', 'h-[208px]', 'h-[208px]', 'h-[207px]'][index],
                    tone.border
                  )}
                >
                  <div className="flex h-[75px] justify-center">
                    <DrHelioIcon name={item.icon} className={cn('size-[60px]', tone.icon)} />
                  </div>

                  <h3
                    className={cn(
                      'mx-auto mt-2 mb-4 text-[18px] font-bold leading-[21.6px] tracking-normal sm:text-[22px] sm:leading-[26.4px]',
                      index === 2 && 'max-sm:max-w-[150px]',
                      tone.title
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mx-auto text-[14px] font-normal leading-[21px] tracking-[-0.6px] text-[#545454] sm:tracking-[-0.5px] lg:tracking-normal">
                    {item.description}
                  </p>
                </Card>
              </EntranceReveal>
            )
          })}
        </div>

        <EntranceReveal
          as="a"
          effect="zoomIn"
          slow={false}
          href={whatsappUrl}
          className="mt-5 inline-flex h-[60px] w-full items-center justify-center gap-[5px] rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#0066AF_0%,#004374_100%)] px-[15px] py-[15px] font-sans text-[15px] font-bold leading-[15px] whitespace-nowrap text-white uppercase shadow-[0_0_23px_-2px_rgba(0,81,140,0.8)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066af] sm:mt-10 sm:h-[45px] sm:w-[392px] sm:px-10 lg:h-[46px] lg:w-[412px] lg:text-[16px] lg:leading-[16px]"
        >
          <span>{cta}</span>
          <DrHelioIcon name="whatsapp" className="size-[15px] shrink-0 lg:size-4" />
        </EntranceReveal>
      </div>
    </section>
  )
}
