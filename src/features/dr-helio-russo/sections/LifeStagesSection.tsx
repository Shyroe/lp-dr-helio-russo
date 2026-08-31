import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoAssets } from '../assets'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

const cardHeights = ['md:h-[126px] lg:h-[147px]', 'md:h-[126px] lg:h-[127px]', 'md:h-[127px] lg:h-[126px]'] as const

const paragraphTracking = [
  'tracking-[-0.2px] md:tracking-[-0.1px] lg:tracking-normal',
  'tracking-[-0.3px] md:tracking-normal lg:tracking-[-0.1px]',
  'tracking-[-0.1px] md:tracking-normal',
] as const

export function LifeStagesSection() {
  const { lifeStages } = drHelioRussoData

  return (
    <section
      aria-labelledby="dr-helio-life-stages-title"
      className="relative min-h-[1494px] overflow-hidden bg-[#003a5c] bg-cover bg-left-top text-white [content-visibility:auto] md:min-h-0 md:bg-center md:[contain-intrinsic-size:auto_1278px] lg:px-20 lg:[contain-intrinsic-size:auto_793px]"
    >
      <img
        aria-hidden="true"
        src={drHelioRussoAssets.darkTexture}
        alt=""
        width="1920"
        height="700"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-cover object-left-top md:object-center"
      />

      <div className="relative mx-auto flex max-w-[1140px] flex-col md:px-10 md:pt-10 lg:flex-row lg:px-0 lg:pt-20">
        <div className="flex w-full flex-col px-[30px] pt-[30px] pb-[30px] md:h-[636px] md:px-0 md:pt-0 md:pb-[60px] lg:h-[712.5px] lg:w-1/2 lg:justify-center">
          <EntranceReveal
            as="h2"
            effect="fadeInUp"
            id="dr-helio-life-stages-title"
            className="font-serif text-[25px] font-bold leading-[25px] text-white text-center md:text-left md:text-[35px] md:leading-[35px]"
          >
            {lifeStages.title}
          </EntranceReveal>

          <EntranceReveal
            as="p"
            effect="fadeInUp"
            className="mt-5 font-sans text-[15px] font-normal leading-[22.5px] text-white text-center md:text-left md:tracking-[-0.4px] lg:tracking-normal"
          >
            {lifeStages.description}
            <br />
            <strong className="font-bold tracking-[-0.5px] md:tracking-[inherit]">{lifeStages.helper}</strong>
          </EntranceReveal>

          <div className="mt-[35px] flex w-full flex-col gap-5 md:mt-[34.5px] lg:mt-[26px] lg:w-full">
            {lifeStages.stages.map((stage, index) => (
              <EntranceReveal
                as="article"
                effect="fadeInUp"
                key={stage.title}
                data-dr-helio-card="life-stage"
                className={`rounded-[20px] border-0 border-b-[5px] border-b-[#0066AF] bg-white p-5 text-[#545454] ${cardHeights[index]}`}
              >
                <div className="flex flex-col items-center gap-[5px] text-center md:flex-row md:text-left">
                  <span className="flex h-[76px] w-[70px] shrink-0 items-center justify-center text-[#004374] md:size-[70px]">
                    <DrHelioIcon name={stage.icon} className="size-[70px]" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
                    <h3 className="mt-2 font-sans text-[18px] font-bold leading-[21.6px] text-[#004374] md:mt-0 md:text-[22px] md:leading-[26.4px]">
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

        <div className="flex w-full items-end justify-center lg:w-1/2">
          <EntranceReveal
            as="img"
            effect="fadeInRight"
            src={drHelioRussoAssets.childDental}
            alt="Criança sorrindo segurando uma escova e um modelo de dente"
            width="1080"
            height="1350"
            loading="lazy"
            className="h-auto w-full object-contain md:w-[70%] lg:w-full"
          />
        </div>
      </div>
    </section>
  )
}
