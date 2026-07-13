import type { SVGProps } from 'react'

import type { DrHelioIconName } from './data'
import { ReferenceSvgIcon } from './referenceSvgIcons'

type IconProps = SVGProps<SVGSVGElement>

function OrthodonticsIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 27c6.2 4.2 33.8 4.2 40 0" />
      <path d="M12 39c6.2 4.2 33.8 4.2 40 0" />
      <rect x="17" y="24" width="7" height="8" rx="2" />
      <rect x="28.5" y="25" width="7" height="8" rx="2" />
      <rect x="40" y="24" width="7" height="8" rx="2" />
      <rect x="17" y="36" width="7" height="8" rx="2" />
      <rect x="28.5" y="37" width="7" height="8" rx="2" />
      <rect x="40" y="36" width="7" height="8" rx="2" />
      <path d="M15 19c3.8-5.7 9.6-8.5 17-8.5s13.2 2.8 17 8.5" />
      <path d="M15 49c3.8 5.7 9.6 8.5 17 8.5s13.2-2.8 17-8.5" />
    </svg>
  )
}

function RootCanalIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21.5 7.5c4.2 0 6.4 2.4 10.5 2.4s6.3-2.4 10.5-2.4c7.3 0 11.8 6.7 10.2 15.4-.8 4.8-3.4 8.6-5 13.2-1.4 3.9-1.5 8.9-3.4 13.5-1.7 4.3-4.1 7-7 7-3.4 0-3.7-4.1-4.2-8.5-.5-4.1-1.2-7.6-3.1-7.6s-2.6 3.5-3.1 7.6c-.5 4.4-.8 8.5-4.2 8.5-2.9 0-5.3-2.7-7-7-1.9-4.6-2-9.6-3.4-13.5-1.6-4.6-4.2-8.4-5-13.2C5.7 14.2 10.2 7.5 17.5 7.5h4Z" />
      <path d="M32 22v18" />
      <path d="m26 28 6-6 6 6" />
      <path d="M23 18c2.4 1.1 5.6 1.7 9 1.7s6.6-.6 9-1.7" />
    </svg>
  )
}

function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  )
}
function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 1 511.99995 511" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m510.769531 491.511719-90.347656-210.789063c-2.375-5.535156-7.820313-9.125-13.839844-9.125h-57.378906c23.222656-40.570312 42.320313-85.472656 42.320313-123.464844 0-195.648437-271.046876-198.035156-271.046876 0 0 37.992188 19.097657 82.894532 42.320313 123.464844h-57.378906c-6.023438 0-11.46875 3.589844-13.839844 9.125l-90.347656 210.789063c-4.25 9.914062 3.03125 20.988281 13.839843 20.988281h481.859376c10.785156 0 18.097656-11.050781 13.839843-20.988281zm-114.121093-189.800781 44.582031 104.007812c-1.394531.726562-146.496094 76.074219-147.535157 76.667969h-31.519531c-.796875-.890625 5.976563 5.917969-92.164062-92.210938l54.511719-27.898437c11.113281 14.183594 18.898437 23.195312 20.113281 24.59375 6 6.90625 16.730469 6.894531 22.722656 0 2.519531-2.898438 33.214844-38.464844 63.453125-85.160156zm-140.648438-271.019532c50.765625 0 105.40625 36.753906 105.40625 117.441406 0 67.84375-76.050781 168.808594-105.40625 205.246094-29.355469-36.441406-105.40625-137.402344-105.40625-205.246094 0-81.125 52.9375-117.441406 105.40625-117.441406zm-140.652344 271.019532c72.945313 0 64.65625.011718 65.824219-.023438 8.480469 13.097656 16.996094 25.320312 24.917969 36.195312l-136.101563 69.65625zm-63.933594 149.164062 90.429688-46.28125 77.804688 77.792969h-181.742188zm307.546876 31.511719 94.167968-48.914063 20.964844 48.914063zm0 0" />
      <path d="m301.171875 136.089844c0-24.90625-20.265625-45.171875-45.171875-45.171875-24.910156 0-45.175781 20.265625-45.175781 45.171875s20.265625 45.167968 45.175781 45.167968c24.90625 0 45.171875-20.261718 45.171875-45.167968zm-60.230469 0c0-8.304688 6.753906-15.058594 15.058594-15.058594 8.300781 0 15.058594 6.753906 15.058594 15.058594 0 8.300781-6.757813 15.054687-15.058594 15.054687-8.304688 0-15.058594-6.753906-15.058594-15.054687zm0 0" />
    </svg>
  )
}

function ArrowIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M497.36 69.995c-7.532-7.545-19.753-7.558-27.285-.032L238.582 300.845l-83.522-90.713c-7.217-7.834-19.419-8.342-27.266-1.126-7.841 7.217-8.343 19.425-1.126 27.266l97.126 105.481c3.557 3.866 8.535 6.111 13.784 6.22.141.006.277.006.412.006 5.101 0 10.008-2.026 13.623-5.628L497.322 97.286c7.551-7.525 7.564-19.746.038-27.291z" />
      <path d="M492.703 236.703c-10.658 0-19.296 8.638-19.296 19.297 0 119.883-97.524 217.407-217.407 217.407-119.876 0-217.407-97.524-217.407-217.407 0-119.876 97.531-217.407 217.407-217.407 10.658 0 19.297-8.638 19.297-19.296C275.297 8.638 266.658 0 256 0 114.84 0 0 114.84 0 256c0 141.154 114.84 256 256 256 141.154 0 256-114.846 256-256 0-10.658-8.638-19.297-19.297-19.297z" />
    </svg>
  )
}

export function DrHelioIcon({ name, ...props }: IconProps & { name: DrHelioIconName }) {
  switch (name) {
    case 'cleaning':
      return <ReferenceSvgIcon name="cleaning" {...props} />
    case 'whitening':
      return <ReferenceSvgIcon name="quickWhitening" {...props} />
    case 'quickFacets':
    case 'facets':
      return <ReferenceSvgIcon name="quickFacets" {...props} />
    case 'whyFacets':
      return <ReferenceSvgIcon name="whyFacets" {...props} />
    case 'implant':
      return <ReferenceSvgIcon name="implant" {...props} />
    case 'smile':
      return <ReferenceSvgIcon name="whySmile" {...props} />
    case 'care':
      return <ReferenceSvgIcon name="care" {...props} />
    case 'calendar':
      return <ReferenceSvgIcon name="calendar" {...props} />
    case 'payment':
      return <ReferenceSvgIcon name="payment" {...props} />
    case 'people':
      return <ReferenceSvgIcon name="people" {...props} />
    case 'baby':
      return <ReferenceSvgIcon name="baby" {...props} />
    case 'adult':
      return <ReferenceSvgIcon name="adult" {...props} />
    case 'senior':
      return <ReferenceSvgIcon name="senior" {...props} />
    case 'orthodontics':
      return <OrthodonticsIcon {...props} />
    case 'rootCanal':
      return <RootCanalIcon {...props} />
    case 'whatsapp':
      return <WhatsappIcon {...props} />
    case 'pin':
      return <PinIcon {...props} />
    case 'arrow':
      return <ArrowIcon {...props} />
    case 'check':
      return <CheckIcon {...props} />
    default:
      return <ReferenceSvgIcon name="cleaning" {...props} />
  }
}
