import { cn } from '@/lib/utils'

type ReferenceTriangleDividerProps = {
  position: 'top' | 'bottom'
  referenceId: string
}

export function ReferenceTriangleDivider({ position, referenceId }: ReferenceTriangleDividerProps) {
  return (
    <div
      aria-hidden="true"
      data-reference-shape={referenceId}
      className={cn(
        'pointer-events-none absolute left-0 h-[5px] w-full overflow-hidden text-left [direction:ltr] leading-[0]',
        position === 'top' ? 'top-[-1px]' : 'bottom-[-1px] [transform:rotate(180deg)]'
      )}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="relative left-1/2 inline h-px w-[calc(80%+1.3px)] overflow-hidden fill-[#0066AF] align-baseline [transform:translateX(-50%)]"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M500,98.9L0,6.1V0h1000v6.1L500,98.9z" />
      </svg>
    </div>
  )
}
