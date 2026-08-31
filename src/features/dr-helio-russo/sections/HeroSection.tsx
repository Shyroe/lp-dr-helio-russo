import { Button } from '@/components/ui/button'

import { drHelioRussoAssets } from '../assets'
import { ReferenceTriangleDivider } from '../components/ReferenceTriangleDivider'
import { ServiceCard } from '../components/ServiceCard'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

export function HeroSection() {
  const { hero, quickServices, whatsappUrl } = drHelioRussoData

  return (
    <>
      <section id="topo2" aria-labelledby="dr-helio-hero-title" className="relative isolate overflow-hidden bg-white">
        <div data-hero-background className="relative h-[770px] overflow-hidden md:h-[600px] lg:px-20">
          <picture className="pointer-events-none absolute inset-0 block">
            <source media="(max-width: 767px)" srcSet={drHelioRussoAssets.heroBgMobileLcp} type="image/webp" />
            <source media="(min-width: 768px)" srcSet={drHelioRussoAssets.heroBgDesktop} type="image/webp" />
            <img
              data-hero-lcp-image
              src={drHelioRussoAssets.heroBgDesktop}
              alt=""
              width="3840"
              height="700"
              decoding="sync"
              className="absolute inset-0 size-full object-cover object-top lg:inset-auto lg:left-1/2 lg:top-1/2 lg:h-[740px] lg:w-auto lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2"
            />
          </picture>

          <div className="relative mx-auto flex h-full w-full max-w-[1140px] px-0 md:px-10 lg:px-0">
            <div className="flex w-full self-end flex-col items-center gap-5 p-5 text-center md:w-1/2 md:self-center md:items-start md:p-0 md:text-left lg:gap-[30px]">
              <img
                data-dr-helio-hero-logo-reveal
                src={drHelioRussoAssets.logoBlue}
                alt="Dr. Hélio Russo Odontologia"
                width={500}
                height={110}
                decoding="async"
                className="relative -top-[46.187px] h-auto w-[60%] md:-top-[37.689px] md:w-1/2 lg:-top-[62.688px]"
              />

              <p className="sr-only">{hero.eyebrow}</p>
              <h1
                data-dr-helio-hero-critical-content
                id="dr-helio-hero-title"
                className="w-full font-serif text-[28px] font-bold uppercase leading-[28px] tracking-normal text-[#004374] md:text-[35px] md:leading-[35px]"
              >
                Tem Vergonha de Sorrir? Isso Pode Acabar Hoje!
              </h1>

              <p
                data-dr-helio-hero-critical-content
                className="mb-[14.4px] w-full text-[15px] font-normal leading-[22.5px] tracking-[-0.045em] text-[#6C6C6C] md:tracking-[-0.035em] lg:tracking-normal"
              >
                Recupere sua autoestima e conquiste um sorriso bonito e saudável com tratamentos modernos, rápidos e{' '}
                <strong className="font-bold text-[#6C6C6C]">sem dor</strong>.{' '}
                <strong className="font-bold text-[#6C6C6C]">
                  Agende agora sua avaliação e transforme seu sorriso!
                </strong>
              </p>

              <div data-dr-helio-hero-critical-content className="-mt-5 w-full md:w-[323px] lg:w-[392px]">
                <Button
                  asChild
                  className="h-auto min-h-0 w-full rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#0066AF_0%,#004374_100%)] px-[15px] py-[15px] text-[15px] font-bold uppercase leading-[15px] tracking-[-0.5px] text-white shadow-[0_0_23px_-2px_rgba(0,81,140,0.8)] transition max-[389px]:min-h-[60px] max-[389px]:whitespace-normal max-[389px]:has-[>svg]:px-[15px] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffdc51] lg:px-10 lg:text-[16px] lg:leading-[16px] lg:tracking-[-0.6px]"
                >
                  <a href={whatsappUrl} className="gap-[5px] max-[389px]:text-center max-[389px]:whitespace-normal">
                    <span>{hero.cta}</span>
                    <DrHelioIcon name="whatsapp" className="size-[15px] lg:size-4" />
                  </a>
                </Button>
              </div>

              <p
                data-dr-helio-hero-critical-content
                className="inline-flex w-full items-center justify-center gap-[5px] pl-[6.25px] text-[13px] font-normal leading-[19.5px] tracking-[-0.3px] text-[#545454] md:justify-start"
              >
                <DrHelioIcon name="pin" className="size-[25px] shrink-0 text-[#004374]" />
                {hero.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Tratamentos em destaque" className="relative isolate flow-root bg-white">
        <div className="relative z-20 mx-auto -mt-[30px] grid w-full max-w-[1300px] grid-cols-1 gap-5 px-[30px] py-[30px] md:grid-cols-2 md:px-10 md:pt-0 md:pb-10 lg:-mt-5 lg:grid-cols-4 lg:px-20 lg:pb-20">
          {quickServices.map((service, index) => (
            <div key={service.title} data-dr-helio-hero-critical-content className="mx-auto w-full md:h-full">
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                tone={index % 2 === 0 ? 'primary' : 'secondary'}
                className="mx-auto w-full gap-[18px] md:h-full md:min-h-[230px] lg:min-h-[252px]"
                iconBadgeClassName="size-[83px]"
                iconClassName="size-[50px]"
              />
            </div>
          ))}
        </div>

        <ReferenceTriangleDivider position="bottom" referenceId="elementor-bf1d685-shape-divider-bottom-triangle" />
      </section>
    </>
  )
}
