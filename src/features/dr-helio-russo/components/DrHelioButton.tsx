import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { DrHelioIcon } from '../icons'

type DrHelioButtonProps = {
  href: string
  children: string
  className?: string
  compact?: boolean
}

export function DrHelioButton({ href, children, className, compact = false }: DrHelioButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        'group rounded-full bg-[var(--dr-helio-blue)] font-black uppercase tracking-[0.02em] text-white shadow-[0_10px_22px_rgba(0,91,148,0.28)] ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:bg-[var(--dr-helio-blue-dark)] hover:shadow-[0_14px_28px_rgba(0,91,148,0.35)] focus-visible:ring-2 focus-visible:ring-[var(--dr-helio-blue)] focus-visible:ring-offset-2',
        compact
          ? 'h-8 px-5 text-[0.58rem] sm:h-9 sm:px-6 sm:text-[0.66rem]'
          : 'h-9 px-6 text-[0.64rem] sm:h-10 sm:px-7 sm:text-xs',
        className
      )}
    >
      <a href={href}>
        <span>{children}</span>
        <DrHelioIcon name="arrow" className="ml-2 size-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </Button>
  )
}
