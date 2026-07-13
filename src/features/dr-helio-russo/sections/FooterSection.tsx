import { EntranceReveal } from '../animations/EntranceReveal'
import { drHelioRussoAssets } from '../assets'
import { drHelioRussoData } from '../data'
import { DrHelioIcon } from '../icons'

function BackToTopIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 90" className="size-[38px] fill-current max-sm:size-[28px]">
      <path d="m45.006 24.052c.713-.025 1.416.219 1.943.744l16.26 16.277c1.135 1.139 1.203 2.9.15 3.953l-2.416 2.42c-1.053 1.053-2.813.984-3.947-.15l-6.793-6.799v24.525c0 1.381-1.025 2.486-2.301 2.486h-5.703c-1.277 0-2.309-1.105-2.309-2.486v-24.525l-6.785 6.799c-1.141 1.135-2.902 1.203-3.953.15l-2.418-2.42c-1.051-1.053-.979-2.814.156-3.953l16.105-16.125c.568-.568 1.298-.871 2.011-.896zm.041-14.198c-9.516 0-18.645 3.785-25.375 10.521-6.729 6.74-10.51 15.875-10.51 25.408 0 9.523 3.781 18.664 10.51 25.4 6.73 6.736 15.859 10.521 25.375 10.521 9.521 0 18.646-3.785 25.375-10.521 6.73-6.736 10.512-15.877 10.512-25.4 0-9.533-3.781-18.668-10.512-25.408-6.729-6.735-15.854-10.521-25.375-10.521z" />
    </svg>
  )
}

export function FooterSection() {
  const { whatsappUrl } = drHelioRussoData

  return (
    <>
      <footer
        data-dr-helio-footer
        className="h-[450.016px] bg-[url('/assets/landing/dr-helio-russo/dark-texture.png')] bg-cover bg-left-top px-[30px] pb-[29.75px] pt-[30px] text-center text-white sm:h-[582.984px] sm:bg-center sm:px-20 sm:pb-0 sm:pt-20 lg:h-[603.047px]"
      >
        <div className="mx-auto flex h-full max-w-[1140px] flex-col items-center">
          <img
            data-dr-helio-footer-logo
            src={drHelioRussoAssets.logoWhite}
            alt="Dr. Hélio Russo Odontologia"
            width={500}
            height={110}
            className="h-auto w-[264px] sm:w-[364.797px] lg:w-[456px]"
          />

          <EntranceReveal
            as="a"
            effect="zoomIn"
            slow={false}
            data-dr-helio-footer-cta
            href={whatsappUrl}
            className="mt-10 inline-flex h-14 w-[330px] flex-row-reverse items-center justify-center gap-[5px] rounded-[0_20px_0_20px] bg-[linear-gradient(360deg,#ad8b00_0%,#ffdc51_100%)] px-5 [font-family:Roboto,sans-serif] text-[16px] font-medium leading-[16px] text-white transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdc51] sm:mt-5 sm:w-[267.812px] sm:px-10"
          >
            <DrHelioIcon name="whatsapp" className="size-[13px] shrink-0" />
            <span>Reserve Sua Avaliação!</span>
          </EntranceReveal>

          <EntranceReveal
            as="p"
            effect="fadeInUp"
            data-dr-helio-footer-tagline
            className="mt-5 h-[59.391px] w-[330px] pb-[14.4px] text-[15px] font-normal leading-[22.5px] sm:h-[68.391px] sm:w-[456px] sm:text-[18px] sm:leading-[27px] lg:w-[570px]"
          >
            Sorria com confiança todos os dias, porque seu sorriso é seu melhor cartão de visita.
          </EntranceReveal>

          <a
            data-dr-helio-footer-privacy
            data-dr-helio-extended-hit-area
            href="https://descomplicandosite.com/drheliorusso/politicas-de-privacidade/"
            target="_blank"
            rel="noreferrer"
            className="relative mt-2 text-[11px] font-medium leading-[11px] tracking-[-0.22px] text-white uppercase underline after:absolute after:-inset-y-[7px] after:inset-x-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdc51] sm:mt-1 sm:text-[16px] sm:leading-[16px] sm:tracking-[-0.33px]"
          >
            Termos de uso e políticas de privacidade
          </a>

          <EntranceReveal
            as="p"
            effect="fadeInUp"
            data-dr-helio-footer-copyright
            className="mt-6 h-[32.391px] pb-[14.4px] text-[12px] font-normal leading-[18px] tracking-[-0.5px] sm:h-[36.891px] sm:text-[15px] sm:leading-[22.5px]"
          >
            <strong className="font-bold">© 2024 Dr Helio Russo – Todos os direitos reservados.</strong>
          </EntranceReveal>

          <a
            data-dr-helio-back-to-top
            href="#topo2"
            aria-label="Voltar ao topo"
            className="mt-5 flex h-[63.406px] flex-col items-center text-[#ffdc51] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdc51] sm:h-[101.203px]"
          >
            <BackToTopIcon />
            <span className="mt-[5px] text-[12px] font-semibold leading-[14.4px] tracking-[-0.5px] text-white uppercase sm:mt-1 sm:text-[16px] sm:leading-[19.2px] sm:tracking-[-0.65px]">
              Voltar ao topo
            </span>
          </a>
        </div>
      </footer>

      <EntranceReveal
        as="a"
        effect="fadeInRight"
        data-dr-helio-floating-whatsapp
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="fixed right-[45px] bottom-[25px] z-50 flex size-[55px] items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]"
      >
        <DrHelioIcon name="whatsapp" className="size-[28px]" />
        <span aria-hidden="true" className="absolute -top-[1px] -right-[1px] size-[14px] rounded-full bg-[#f20d1c]" />
      </EntranceReveal>
    </>
  )
}
