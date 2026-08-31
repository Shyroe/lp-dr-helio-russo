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
      className="bg-[rgba(0,113,196,0.09)] px-[30px] py-[30px] text-center [contain-intrinsic-size:auto_1577px] [content-visibility:auto] md:px-10 md:pt-10 md:pb-[39px] md:[contain-intrinsic-size:auto_829px] lg:px-20 lg:pt-20 lg:pb-[81px] lg:[contain-intrinsic-size:auto_774px]"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col items-center gap-[30px]">
        <EntranceReveal
          as="h2"
          effect="fadeInUp"
          id="dr-helio-why-title"
          className="w-full max-w-full font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#004374] md:max-w-[73%] md:text-[35px] md:leading-[35px] lg:max-w-[43%]"
        >
          Por Que Escolher Nosso Consultório?
        </EntranceReveal>

        <div className="mt-5 grid w-full grid-cols-1 gap-5 md:grid-cols-3 min-[768px]:max-[771px]:auto-rows-[287px] min-[772px]:max-[823px]:auto-rows-[281px] min-[824px]:max-[1024px]:auto-rows-[259px] min-[1025px]:max-[1089px]:auto-rows-[281px] min-[1025px]:max-w-[80%] min-[1090px]:auto-rows-[259px]">
          {whyChoose.map((item, index) => {
            const tone = cardTones[index] ?? cardTones[0]

            return (
              <EntranceReveal
                key={item.title}
                effect={index % 3 === 0 ? 'fadeInLeft' : index % 3 === 2 ? 'fadeInRight' : 'zoomIn'}
              >
                <Card
                  data-dr-helio-card="why-choose"
                  className={cn(
                    'gap-0 rounded-[20px] border-0 border-b-[5px] bg-white p-5 text-center shadow-[0_0_10px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:shadow-[0_0_15px_10px_rgba(255,255,255,0.5)] md:h-full',
                    tone.border
                  )}
                >
                  <div className="flex h-[75px] justify-center">
                    <DrHelioIcon name={item.icon} className={cn('size-[60px]', tone.icon)} />
                  </div>

                  <h3
                    className={cn(
                      'mx-auto mt-2 mb-4 text-[18px] font-bold leading-[21.6px] tracking-normal md:text-[22px] md:leading-[26.4px]',
                      index === 2 && 'max-md:max-w-[150px]',
                      tone.title
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mx-auto text-[14px] font-normal leading-[21px] tracking-[-0.6px] text-[#545454] md:tracking-[-0.5px] lg:tracking-normal">
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
          className="mt-5 inline-flex h-[60px] w-full items-center justify-center gap-[5px] rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#0066AF_0%,#004374_100%)] px-[15px] py-[15px] text-center font-sans text-[15px] font-bold leading-[15px] whitespace-normal text-white uppercase shadow-[0_0_23px_-2px_rgba(0,81,140,0.8)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066af] max-[389px]:h-auto max-[389px]:min-h-[60px] md:mt-10 md:h-[45px] md:w-[392px] md:px-10 md:whitespace-nowrap lg:h-[46px] lg:w-[412px] lg:text-[16px] lg:leading-[16px]"
        >
          <span>{cta}</span>
          <DrHelioIcon name="whatsapp" className="size-[15px] shrink-0 lg:size-4" />
        </EntranceReveal>
      </div>
    </section>
  )
}
