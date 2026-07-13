import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoAssets } from '../assets'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

function splitSpecialty(specialty: string) {
  const separatorIndex = specialty.indexOf(':')
  if (separatorIndex === -1) return { label: specialty, text: '' }

  return {
    label: specialty.slice(0, separatorIndex + 1),
    text: specialty.slice(separatorIndex + 1).trim(),
  }
}

export function ExperiencePreviewSection() {
  const { experience } = drHelioRussoData

  return (
    <section aria-labelledby="dr-helio-experience-title" className="min-h-[1010px] bg-white sm:min-h-0">
      <div className="mx-auto flex max-w-[1140px] flex-col px-5 pt-5 sm:px-10 sm:pt-10 lg:h-[750px] lg:flex-row lg:gap-5 lg:px-0 lg:pt-20">
        <div className="order-2 flex justify-center sm:mt-[30px] sm:px-5 lg:order-1 lg:mt-0 lg:h-[670px] lg:w-[570px] lg:items-start lg:justify-start lg:px-5 lg:pt-5">
          <EntranceReveal
            as="img"
            effect="fadeInLeft"
            src={drHelioRussoAssets.experienceDentist}
            alt="Dr. Hélio Russo segurando escova dental e modelo odontológico"
            width="1080"
            height="1350"
            className="h-auto w-[350px] max-w-none object-contain sm:w-[70%] lg:w-[520px]"
          />
        </div>

        <div className="order-1 sm:px-[10px] sm:pt-[10px] lg:order-2 lg:w-[550px] lg:px-0 lg:pt-[93.95px] lg:pr-[10px]">
          <EntranceReveal
            as="h2"
            effect="fadeInUp"
            id="dr-helio-experience-title"
            className="font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#4F4F4F] sm:text-[35px] sm:leading-[35px]"
          >
            <span className="block">25 Anos de Experiência</span>
            <span className="block text-[#0066AF]">Transformando Sorrisos</span>
          </EntranceReveal>

          <EntranceReveal
            effect="fadeInUp"
            className="mt-5 pb-4 text-[15px] font-normal leading-[22.5px] text-[#545454]"
          >
            <p>
              Com mais de <strong className="font-bold">25 anos de experiência</strong> na área odontológica, o{' '}
              <strong className="font-bold">Dr. Helio Russo</strong> se destaca como um profissional altamente
              qualificado e comprometido com a saúde bucal de seus pacientes. Reconhecido por sua abordagem cuidadosa e
              profissionalismo exemplar, ele se tornou referência na área por oferecer tratamentos eficazes e
              humanizados.
            </p>

            <h3 className="mt-[14.4px] text-[16px] font-bold leading-[19.2px] text-[#545454]">
              {experience.specialtiesTitle}
            </h3>
          </EntranceReveal>

          <EntranceReveal as="ul" effect="fadeInUp" className="mt-5 flex flex-col gap-[10px]">
            {experience.specialties.map((specialty, index) => {
              const { label, text } = splitSpecialty(specialty)

              return (
                <li
                  key={specialty}
                  className="flex items-center gap-[10px] text-[15px] font-normal leading-[22.5px] text-[#545454]"
                >
                  <span className="inline-flex size-5 shrink-0 items-center justify-center text-[#0066AF]">
                    <DrHelioIcon name="check" className="size-5" />
                  </span>
                  <span
                    className={
                      index === 2 ? 'max-sm:tracking-[-0.5px]' : index === 3 ? 'sm:max-lg:tracking-[-0.7px]' : undefined
                    }
                  >
                    <strong className="font-bold text-[#545454]">{label}</strong> {text}
                  </span>
                </li>
              )
            })}
          </EntranceReveal>
        </div>
      </div>
    </section>
  )
}
