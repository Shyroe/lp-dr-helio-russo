import { Button } from '@/components/ui/button'

import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoAssets } from '../assets'
import { ReferenceTriangleDivider } from '../components/ReferenceTriangleDivider'
import { ServiceCard } from '../components/ServiceCard'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

export function HeroSection() {
  const { hero, quickServices, whatsappUrl } = drHelioRussoData

  return (
    <section id="topo2" aria-labelledby="dr-helio-hero-title" className="relative isolate overflow-hidden bg-white">
      <div className="relative h-[770px] bg-[url('/assets/landing/dr-helio-russo/hero-bg-mobile.png')] bg-cover bg-top bg-no-repeat md:h-[600px] md:bg-[url('/assets/landing/dr-helio-russo/hero-bg-desktop.png')] md:bg-cover md:bg-top lg:bg-[length:auto_740px] lg:bg-[position:center_center]">
        <div className="mx-auto flex h-full w-full max-w-[1140px] px-0 md:px-10 lg:px-0">
          <div className="flex w-full self-end flex-col items-center gap-5 p-5 text-center md:w-1/2 md:self-center md:items-start md:p-0 md:text-left lg:gap-[30px]">
            <EntranceReveal
              as="img"
              effect="fadeInUp"
              src={drHelioRussoAssets.logoBlue}
              alt="Dr. Hélio Russo Odontologia"
              className="h-auto w-[60%] md:w-1/2"
            />

            <p className="sr-only">{hero.eyebrow}</p>
            <EntranceReveal
              as="h1"
              effect="fadeInUp"
              id="dr-helio-hero-title"
              className="w-full font-serif text-[28px] font-bold uppercase leading-[28px] tracking-normal text-[#004374] md:text-[35px] md:leading-[35px]"
            >
              Tem Vergonha de Sorrir? Isso Pode Acabar Hoje!
            </EntranceReveal>

            <EntranceReveal
              as="p"
              effect="fadeInUp"
              className="mb-[14.4px] w-full text-[15px] font-normal leading-[22.5px] tracking-[-0.045em] text-[#6C6C6C] md:tracking-[-0.035em] lg:tracking-normal"
            >
              Recupere sua autoestima e conquiste um sorriso bonito e saudável com tratamentos modernos, rápidos e{' '}
              <strong className="font-bold text-[#6C6C6C]">sem dor</strong>.{' '}
              <strong className="font-bold text-[#6C6C6C]">Agende agora sua avaliação e transforme seu sorriso!</strong>
            </EntranceReveal>

            <EntranceReveal effect="zoomIn" slow={false} className="-mt-5 w-full md:w-[323px] lg:w-[392px]">
              <Button
                asChild
                className="h-auto min-h-0 w-full rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#0066AF_0%,#004374_100%)] px-[15px] py-[15px] text-[15px] font-bold uppercase leading-[15px] tracking-[-0.5px] text-white shadow-[0_0_23px_-2px_rgba(0,81,140,0.8)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffdc51] lg:px-10 lg:text-[16px] lg:leading-[16px] lg:tracking-[-0.6px]"
              >
                <a href={whatsappUrl} className="gap-[5px]">
                  <span>{hero.cta}</span>
                  <DrHelioIcon name="whatsapp" className="size-[15px] lg:size-4" />
                </a>
              </Button>
            </EntranceReveal>

            <EntranceReveal
              as="p"
              effect="fadeInUp"
              className="inline-flex w-full items-center justify-center gap-[5px] pl-[6.25px] text-[13px] font-normal leading-[19.5px] tracking-[-0.3px] text-[#545454] md:justify-start"
            >
              <DrHelioIcon name="pin" className="size-[25px] shrink-0 text-[#004374]" />
              {hero.location}
            </EntranceReveal>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-[30px] grid w-full max-w-[1140px] grid-cols-1 gap-5 px-[30px] pt-[30px] pb-[28px] md:grid-cols-2 md:px-10 md:pt-0 md:pb-10 lg:-mt-5 lg:grid-cols-4 lg:px-0 lg:pb-20">
        {quickServices.map((service, index) => (
          <EntranceReveal
            key={service.title}
            effect={index === 0 ? 'fadeInLeft' : index === 3 ? 'fadeInRight' : 'zoomIn'}
            className="mx-auto w-full max-w-[330px] md:max-w-none"
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              tone={index % 2 === 0 ? 'primary' : 'secondary'}
              className="mx-auto min-h-[226px] w-full max-w-[330px] gap-[18px] md:min-h-[230px] md:max-w-none lg:min-h-[252px]"
              iconBadgeClassName="size-[83px]"
              iconClassName="size-[50px]"
            />
          </EntranceReveal>
        ))}
      </div>

      <ReferenceTriangleDivider position="bottom" referenceId="elementor-bf1d685-shape-divider-bottom-triangle" />
    </section>
  )
}
