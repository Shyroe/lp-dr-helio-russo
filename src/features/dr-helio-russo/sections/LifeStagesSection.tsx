import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoAssets } from '../assets'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

const cardHeights = [
  'h-[244px] sm:h-[126px] lg:h-[147px]',
  'h-[224px] sm:h-[126px] lg:h-[127px]',
  'h-[223px] sm:h-[127px] lg:h-[126px]',
] as const

const paragraphTracking = [
  'tracking-[-0.2px] sm:tracking-[-0.1px] lg:tracking-normal',
  'tracking-[-0.3px] sm:tracking-normal lg:tracking-[-0.1px]',
  'tracking-[-0.1px] sm:tracking-normal',
] as const

export function LifeStagesSection() {
  const { lifeStages } = drHelioRussoData

  return (
    <section
      aria-labelledby="dr-helio-life-stages-title"
      className="relative min-h-[1494px] overflow-hidden bg-[#003a5c] bg-cover bg-left-top text-white sm:min-h-0 sm:bg-center"
      style={{ backgroundImage: `url(${drHelioRussoAssets.darkTexture})` }}
    >
      <div className="mx-auto flex max-w-[1140px] flex-col sm:px-10 sm:pt-10 lg:flex-row lg:px-0 lg:pt-20">
        <div className="flex w-full flex-col px-[30px] pt-[30px] pb-[30px] sm:h-[636px] sm:px-0 sm:pt-0 sm:pb-[60px] lg:h-[712.5px] lg:w-[570px] lg:justify-center">
          <EntranceReveal
            as="h2"
            effect="fadeInUp"
            id="dr-helio-life-stages-title"
            className="font-serif text-[25px] font-bold leading-[25px] text-white text-center sm:text-left sm:text-[35px] sm:leading-[35px]"
          >
            {lifeStages.title}
          </EntranceReveal>

          <EntranceReveal
            as="p"
            effect="fadeInUp"
            className="mt-5 font-sans text-[15px] font-normal leading-[22.5px] text-white text-center sm:text-left sm:tracking-[-0.4px] lg:tracking-normal"
          >
            {lifeStages.description}
            <br />
            <strong className="font-bold tracking-[-0.5px] sm:tracking-[inherit]">{lifeStages.helper}</strong>
          </EntranceReveal>

          <div className="mt-[35px] flex w-full flex-col gap-5 sm:mt-[34.5px] lg:mt-[26px] lg:w-[570px]">
            {lifeStages.stages.map((stage, index) => (
              <EntranceReveal
                as="article"
                effect="fadeInUp"
                key={stage.title}
                data-dr-helio-card="life-stage"
                className={`rounded-[20px] border-0 border-b-[5px] border-b-[#0066AF] bg-white p-5 text-[#545454] ${cardHeights[index]}`}
              >
                <div className="flex flex-col items-center gap-[15px] text-center sm:flex-row sm:gap-[5px] sm:text-left">
                  <span className="flex size-[70px] shrink-0 items-center justify-center text-[#004374]">
                    <DrHelioIcon name={stage.icon} className="size-[70px]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
                    <h3 className="font-sans text-[18px] font-bold leading-[21.6px] text-[#004374] sm:text-[22px] sm:leading-[26.4px]">
                      {stage.title}
                    </h3>
                    <p
                      className={`font-sans text-[14px] font-normal leading-[21px] text-[#545454] ${paragraphTracking[index]}`}
                    >
                      {stage.description}
                    </p>
                  </div>
                </div>
              </EntranceReveal>
            ))}
          </div>
        </div>

        <div className="flex w-full items-end justify-center lg:w-[570px]">
          <EntranceReveal
            as="img"
            effect="fadeInRight"
            src={drHelioRussoAssets.childDental}
            alt="Criança sorrindo segurando uma escova e um modelo de dente"
            width="1080"
            height="1350"
            loading="lazy"
            className="h-auto w-full object-contain sm:w-[70%] lg:w-[570px]"
          />
        </div>
      </div>
    </section>
  )
}
