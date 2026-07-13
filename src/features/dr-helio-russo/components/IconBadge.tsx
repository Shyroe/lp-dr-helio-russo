import { cn } from '@/lib/utils'

import type { DrHelioIconName } from '../data'
import { DrHelioIcon } from '../icons'

type IconBadgeProps = {
  icon: DrHelioIconName
  className?: string
  iconClassName?: string
}

export function IconBadge({ icon, className, iconClassName }: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex size-12 items-center justify-center rounded-full border border-[var(--dr-helio-blue)] bg-white text-[var(--dr-helio-blue)] shadow-[0_7px_16px_rgba(0,91,148,0.08)]',
        className
      )}
    >
      <DrHelioIcon name={icon} className={cn('size-7', iconClassName)} />
    </span>
  )
}
