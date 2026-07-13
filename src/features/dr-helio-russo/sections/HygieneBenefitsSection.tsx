import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

const hygieneNumberIconPaths: Record<string, string> = {
  '1': 'm296.45 150v210h-48v-159.3l-37.2 10.2-11.7-41.1 54.9-19.8z',
  '2': 'm184.65 327.3 70.5-73.2c12.3-12.6 21.3-24.9 21.3-37.2 0-13.2-8.4-22.2-22.5-22.2-14.7 0-25.2 9.6-30.9 22.8l-40.5-23.7c13.5-31.2 41.7-45.9 70.8-45.9 37.5 0 71.1 24.6 71.1 66.9 0 25.2-13.5 46.8-32.7 66l-34.75 35.1h70.5v46.2h-142.85z',
  '3': 'm330 291.9c0 46.2-36 70.2-76.5 70.2-31.8 0-60.6-14.1-73.5-45l41.4-24c4.8 13.8 13.8 22.2 32.1 22.2 19.8 0 28.5-10.5 28.5-23.4s-8.7-23.4-28.5-23.4h-9.9l-18.3-27.3 38.1-48.3h-76.8v-45h135v39l-36.3 46.2c25.8 9 44.7 29.7 44.7 58.8z',
  '4': 'm337.5 326.4h-21v33.6h-48.6v-33.6h-95.4v-44.4l66.9-132h51.6l-66.9 132h43.8v-45h48.6v45h21z',
  '5': 'm330.75 291.9c0 46.2-36 70.2-76.5 70.2-33.3 0-62.1-14.1-75-45l41.4-24c4.8 13.8 13.8 22.2 33.6 22.2s28.5-10.5 28.5-23.4-8.7-23.4-27-23.4h-65.7l8.7-120.6h121.5v45h-76.5l-2.1 28.8h17.1c39 0 72 24 72 70.2z',
  '6': 'm333 288c0 43.5-31.8 74.1-78 74.1-46.5 0-78-30.6-78-74.1 0-16.2 4.5-30.9 12.3-42.6l64.2-97.5h55.2l-45.6 66.3c41.7 3.3 69.9 33 69.9 73.8zm-48 0c0-18.3-14.1-29.1-30-29.1-16.2 0-30 10.5-30 29.1s13.8 29.1 30 29.1c15.9 0 30-10.8 30-29.1z',
  '7': 'm324 150v40.2l-68.4 169.8h-51l66-163.8h-84.6v-46.2z',
  '8': 'm331.63 300.9c0 38.4-27.6 63.3-77.1 63.3s-77.1-24.9-77.1-63.3c0-20.7 9.6-39 27.3-50.4-12.3-9.6-20.1-23.4-20.1-42.3 0-40.8 31.2-62.4 69.9-62.4s69.9 21.6 69.9 62.4c0 18.9-7.8 32.7-20.1 42.3 17.67 11.4 27.3 29.7 27.3 50.4zm-48-6.9c0-15.9-12.3-25.2-29.1-25.2s-29.1 9.3-29.1 25.2 12.3 25.2 29.1 25.2 29.1-9.3 29.1-25.2zm-51-82.8c0 11.7 8.4 20.4 21.9 20.4s21.9-8.7 21.9-20.4-8.4-20.4-21.9-20.4-21.9 8.7-21.9 20.4z',
}

const hygieneNumberCirclePath =
  'm255 23a232.07 232.07 0 0 1 90.3 445.78 232.07 232.07 0 0 1 -180.6-427.56 230.57 230.57 0 0 1 90.3-18.22m0-23c-140.83 0-255 114.17-255 255 0 140.83 114.17 255 255 255 140.83 0 255-114.17 255-255 0-140.83-114.17-255-255-255z'

type HygieneNumberIconProps = {
  number: string
}

function HygieneNumberIcon({ number }: HygieneNumberIconProps) {
  const digitPath = hygieneNumberIconPaths[number]

  return (
    <div className="flex size-[60px] shrink-0 items-center justify-center text-[#004374]">
      <svg
        role="img"
        aria-label={`Número ${number}`}
        className="size-[60px] fill-current"
        focusable="false"
        viewBox="0 0 510 510"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={hygieneNumberCirclePath} />
        {digitPath ? <path d={digitPath} /> : null}
      </svg>
    </div>
  )
}

type HygieneBenefitCardProps = {
  number: string
  title: string
  description: string
  index: number
}

const mobileCardHeightClasses = [
  'h-[268px]',
  'h-[269px]',
  'h-[225px]',
  'h-[226px]',
  'h-[246px]',
  'h-[248px]',
  'h-[247px]',
  'h-[246px]',
] as const

function HygieneBenefitCard({ number, title, description, index }: HygieneBenefitCardProps) {
  return (
    <Card
      data-dr-helio-card="hygiene-benefit"
      className={cn(
        'group flex flex-col items-center gap-0 rounded-[20px] border border-[#DBDBDB] bg-white p-5 text-center shadow-[0_0_10px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:shadow-[0_0_15px_10px_rgba(0,67,116,0.24)]',
        mobileCardHeightClasses[index],
        'sm:h-[277.5px] lg:h-[304px]',
        index >= 4 && 'sm:h-[257px] lg:h-[304px]'
      )}
    >
      <HygieneNumberIcon number={number} />
      <h3
        className={cn(
          'mt-[18px] mb-0 w-full font-sans text-[18px] font-bold leading-[21.6px] tracking-[-0.6px] text-[#004374] sm:text-[22px] sm:leading-[26.4px] sm:tracking-[-1px] lg:tracking-normal',
          index === 7 && 'sm:tracking-[-1.1px] lg:tracking-normal'
        )}
      >
        {title}
      </h3>
      <p className="mt-4 w-full font-sans text-[14px] font-normal leading-[21px] tracking-[-0.8px] text-[#545454]">
        {description}
      </p>
    </Card>
  )
}

export function HygieneBenefitsSection() {
  const { cta, hygieneBenefits, whatsappUrl } = drHelioRussoData

  return (
    <section
      aria-labelledby="dr-helio-hygiene-title"
      className="bg-white px-[30px] pt-[30px] pb-[33px] text-center sm:px-10 sm:pt-10 sm:pb-[43.5px] lg:px-20 lg:pt-20 lg:pb-[83.5px]"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col items-center">
        <EntranceReveal
          as="h2"
          effect="fadeInUp"
          id="dr-helio-hygiene-title"
          className="w-full font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#4F4F4F] sm:w-[85%] sm:text-[35px] sm:leading-[35px] lg:w-1/2"
        >
          Sua Higiene Bucal pode Influenciar na sua <span className="text-[#0066AF]">Saúde</span>
        </EntranceReveal>
        <EntranceReveal
          as="p"
          effect="fadeInUp"
          className="mt-5 w-full font-sans text-[15px] font-normal leading-[22.5px] tracking-[-0.5px] text-[#545454] sm:tracking-normal"
        >
          {hygieneBenefits.subtitle}
        </EntranceReveal>

        <div className="mt-[35px] grid w-full grid-cols-1 gap-x-5 gap-y-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {hygieneBenefits.benefits.map((benefit, index) => (
            <EntranceReveal
              key={benefit.number}
              effect={index % 4 === 0 ? 'fadeInLeft' : index % 4 === 3 ? 'fadeInRight' : 'zoomIn'}
              className="h-full"
            >
              <HygieneBenefitCard
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            </EntranceReveal>
          ))}
        </div>

        <EntranceReveal
          as="a"
          effect="zoomIn"
          slow={false}
          href={whatsappUrl}
          className="relative -top-px mt-10 inline-flex h-[60px] w-full items-center justify-center rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#0066AF_0%,#004374_100%)] px-[15px] py-[15px] font-sans text-[15px] font-bold leading-[15px] text-white uppercase shadow-[0_0_23px_-2px_rgba(0,81,140,0.8)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066af] sm:mt-[60px] sm:h-[45px] sm:w-[392px] sm:px-10 lg:h-[46px] lg:w-[412px] lg:text-[16px] lg:leading-[16px]"
        >
          <span className="flex h-full w-full flex-row-reverse justify-center gap-[5px] sm:max-lg:relative sm:max-lg:-top-px">
            <span className="flex h-full w-[15px] shrink-0 items-center lg:w-4">
              <DrHelioIcon name="whatsapp" className="size-[15px] shrink-0 lg:size-4" />
            </span>
            <span className="min-w-0 flex-1 text-center tracking-[-0.5px] whitespace-normal sm:tracking-[-0.47px] lg:tracking-[-0.5px]">
              {cta}
            </span>
          </span>
        </EntranceReveal>
      </div>
    </section>
  )
}
