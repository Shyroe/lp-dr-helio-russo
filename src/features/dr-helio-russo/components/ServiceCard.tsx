import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import type { DrHelioIconName } from '../data'
import { IconBadge } from './IconBadge'

type ServiceCardTone = 'primary' | 'secondary'

type ServiceCardProps = {
  icon: DrHelioIconName
  title: string
  description: string
  tone?: ServiceCardTone
  className?: string
  iconBadgeClassName?: string
  iconClassName?: string
}

const cardToneClasses: Record<
  ServiceCardTone,
  {
    border: string
    icon: string
    title: string
  }
> = {
  primary: {
    border: 'border-b-[#0A3D62]',
    icon: 'border-[#004374] text-[#004374]',
    title: 'text-[#004374]',
  },
  secondary: {
    border: 'border-b-[#0066AF]',
    icon: 'border-[#0066AF] text-[#0066AF]',
    title: 'text-[#0066AF]',
  },
}

export function ServiceCard({
  icon,
  title,
  description,
  tone = 'primary',
  className,
  iconBadgeClassName,
  iconClassName,
}: ServiceCardProps) {
  const toneClasses = cardToneClasses[tone]

  return (
    <Card
      data-dr-helio-card="service"
      data-dr-helio-card-tone={tone}
      className={cn(
        'group min-h-[220px] gap-[10px] rounded-[20px] border-0 border-b-[5px] bg-white px-5 py-5 text-center shadow-[0_0_10px_2px_rgba(0,0,0,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,52,94,0.16)]',
        toneClasses.border,
        className
      )}
    >
      <div className="flex justify-center">
        <IconBadge
          icon={icon}
          className={cn('size-[75px] border-2 bg-white shadow-none', toneClasses.icon, iconBadgeClassName)}
          iconClassName={cn('size-[45px]', iconClassName)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h2
          className={cn(
            'text-[18px] font-bold leading-[21.6px] tracking-[-0.01em] md:text-[22px] md:leading-[26.4px]',
            toneClasses.title
          )}
        >
          {title}
        </h2>
        <p className="mx-auto max-w-[18.5rem] text-[14px] font-normal leading-[21px] tracking-[-0.5px] text-[#545454] md:tracking-[-0.4px] lg:tracking-[-0.3px]">
          {description}
        </p>
      </div>
    </Card>
  )
}
