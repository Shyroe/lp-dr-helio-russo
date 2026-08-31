import { CriticalReveal } from '../animations/CriticalReveal'
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
  const specialtyTracking = [
    'max-[767px]:tracking-[-0.75px] min-[1025px]:tracking-[-0.7px]',
    'max-[767px]:tracking-[-0.73px] min-[627px]:max-[767px]:!tracking-[-0.78px] min-[1025px]:tracking-[-0.7px]',
    'max-[767px]:tracking-[-0.56px] min-[647px]:max-[767px]:!tracking-[-0.6px] min-[1025px]:tracking-[-0.3px]',
    'max-[767px]:tracking-[-0.64px] min-[702px]:max-[767px]:!tracking-[-0.71px] min-[768px]:max-[1024px]:tracking-[-0.7px] min-[1025px]:tracking-[-0.5px]',
  ] as const

  return (
    <section
      aria-labelledby="dr-helio-experience-title"
      className="bg-white [contain-intrinsic-size:auto_1010px] [content-visibility:auto] md:[contain-intrinsic-size:auto_1017px] lg:px-20 lg:[contain-intrinsic-size:auto_750px]"
    >
      <div className="mx-auto flex max-w-[1140px] flex-col px-5 pt-5 md:px-10 md:pt-10 lg:grid lg:grid-cols-2 lg:gap-5 lg:px-0 lg:pt-20">
        <div className="order-2 flex flex-col items-center justify-end md:px-5 md:pt-5 lg:order-1 lg:w-full">
          <CriticalReveal
            as="img"
            effect="fadeInLeft"
            slow
            src={drHelioRussoAssets.experienceDentist}
            srcSet={`${drHelioRussoAssets.experienceDentist720} 720w, ${drHelioRussoAssets.experienceDentist} 1080w`}
            sizes="(min-width: 1025px) 570px, (min-width: 768px) 70vw, calc(100vw - 40px)"
            alt="Dr. Hélio Russo segurando escova dental e modelo odontológico"
            width="1080"
            height="1350"
            loading="lazy"
            decoding="async"
            className="h-auto w-full object-contain md:w-[70%] lg:w-full"
          />
        </div>

        <div className="order-1 flex flex-col justify-center md:p-[10px] lg:order-2 lg:w-full">
          <CriticalReveal
            as="h2"
            effect="fadeInUp"
            slow
            id="dr-helio-experience-title"
            className="font-serif text-[25px] font-bold leading-[25px] tracking-normal text-[#4F4F4F] md:text-[35px] md:leading-[35px]"
          >
            <span className="block">25 Anos de Experiência</span>
            <span className="block whitespace-nowrap text-[#0066AF]">Transformando Sorrisos</span>
          </CriticalReveal>

          <CriticalReveal
            effect="fadeInUp"
            slow
            className="mt-5 pb-4 text-[15px] font-normal leading-[22.5px] text-[#545454]"
          >
            <p className="max-[767px]:tracking-[-0.8px] max-[323px]:!tracking-[-0.89px] min-[446px]:max-[455px]:!tracking-[-0.95px] min-[512px]:max-[520px]:!tracking-[-0.93px] min-[640px]:max-[647px]:!tracking-[-0.72px] min-[768px]:max-[1024px]:tracking-[-0.5px] min-[1025px]:max-[1034px]:tracking-[-0.695px] min-[1035px]:max-[1059px]:tracking-[-1px] min-[1060px]:tracking-[-0.695px]">
              Com mais de <strong className="font-bold">25 anos de experiência</strong> na área odontológica, o{' '}
              <strong className="font-bold">Dr. Helio Russo</strong> se destaca como um profissional altamente
              qualificado e comprometido com a saúde bucal de seus pacientes. Reconhecido por sua abordagem cuidadosa e
              profissionalismo exemplar, ele se tornou referência na área por oferecer tratamentos eficazes e
              humanizados.
            </p>

            <h3 className="mt-[14.4px] text-[16px] font-bold leading-[19.2px] text-[#545454] max-[349px]:tracking-[-0.73px]">
              {experience.specialtiesTitle}
            </h3>
          </CriticalReveal>

          <CriticalReveal as="ul" effect="fadeInUp" slow className="mt-5 flex flex-col gap-[10px]">
            {experience.specialties.map((specialty, index) => {
              const { label, text } = splitSpecialty(specialty)

              return (
                <li
                  key={specialty}
                  className="flex items-center gap-[5px] text-[15px] font-normal leading-[22.5px] text-[#545454]"
                >
                  <span className="inline-flex size-5 shrink-0 items-center justify-center text-[#0066AF]">
                    <DrHelioIcon name="check" className="size-5" />
                  </span>
                  <span className={specialtyTracking[index]}>
                    <strong className="font-bold text-[#545454]">{label}</strong> {text}
                  </span>
                </li>
              )
            })}
          </CriticalReveal>
        </div>
      </div>
    </section>
  )
}
