import { type CSSProperties, type ReactNode, useEffect, useRef } from 'react'

export type CriticalRevealEffect = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'

type CriticalRevealProps = {
  as?: 'div' | 'span' | 'section' | 'article' | 'h2' | 'h3' | 'p' | 'ul' | 'li' | 'a' | 'img'
  effect: CriticalRevealEffect
  slow?: boolean
  viewportAmount?: number
  id?: string
  className?: string
  style?: CSSProperties
  children?: ReactNode
  [key: string]: unknown
}

export function CriticalReveal({
  as: Tag = 'div',
  effect,
  slow = false,
  viewportAmount = 0.12,
  ...props
}: CriticalRevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.dataset.criticalRevealEntered = 'true'
      return
    }

    if (!('IntersectionObserver' in window)) {
      element.dataset.criticalRevealEntered = 'true'
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return

        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
        const requiredPixels = Math.min(entry.boundingClientRect.height, viewportHeight) * viewportAmount
        if (entry.intersectionRect.height < requiredPixels) return

        element.dataset.criticalRevealEntered = 'true'
        observer.disconnect()
      },
      {
        threshold: viewportAmount === 0 ? 0 : [0, viewportAmount],
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [viewportAmount])

  return (
    <Tag
      ref={ref as never}
      data-critical-reveal={effect}
      data-critical-reveal-duration={slow ? 'slow' : 'normal'}
      {...props}
    />
  )
}
