import { useAnimate } from 'motion/react-mini'
import * as React from 'react'

export type EntranceEffect = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn'

type SupportedTag = 'div' | 'span' | 'section' | 'article' | 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'li' | 'a' | 'img'

type EntranceRevealProps = {
  as?: SupportedTag
  effect: EntranceEffect
  slow?: boolean
  once?: boolean
  amount?: number
  trigger?: 'inView' | 'mount'
  className?: string
  children?: React.ReactNode
  [key: string]: unknown
}

const hiddenTransform: Record<EntranceEffect, string> = {
  fadeInUp: 'translate3d(0, 100%, 0)',
  fadeInLeft: 'translate3d(-100%, 0, 0)',
  fadeInRight: 'translate3d(100%, 0, 0)',
  zoomIn: 'scale3d(0.3, 0.3, 0.3)',
}

const isomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type ObserverPool = {
  observer: IntersectionObserver
  callbacks: Map<Element, Set<() => void>>
}

const observerPools = new Map<string, ObserverPool>()
// Horizontal margins keep translated entrance elements observable while the viewport is resized.
const observerRootMargin = '0px 100% -10% 100%'

function observeInView(element: Element, amount: number, callback: () => void) {
  const key = `${amount}:${observerRootMargin}`
  let pool = observerPools.get(key)

  if (!pool) {
    const callbacks = new Map<Element, Set<() => void>>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          callbacks.get(entry.target)?.forEach((registeredCallback) => {
            registeredCallback()
          })
        }
      },
      { threshold: amount, rootMargin: observerRootMargin }
    )
    pool = { observer, callbacks }
    observerPools.set(key, pool)
  }

  const elementCallbacks = pool.callbacks.get(element) ?? new Set<() => void>()
  elementCallbacks.add(callback)
  pool.callbacks.set(element, elementCallbacks)
  pool.observer.observe(element)

  return () => {
    const activePool = observerPools.get(key)
    if (!activePool) return

    const activeCallbacks = activePool.callbacks.get(element)
    activeCallbacks?.delete(callback)
    if (activeCallbacks?.size === 0) {
      activePool.callbacks.delete(element)
      activePool.observer.unobserve(element)
    }
    if (activePool.callbacks.size === 0) {
      activePool.observer.disconnect()
      observerPools.delete(key)
    }
  }
}

function motionIsDisabled() {
  if (typeof document === 'undefined') return true
  const query = new URLSearchParams(window.location.search)
  const mode = document.documentElement.dataset.drHelioMotion
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  if (reduceMotion || typeof IntersectionObserver === 'undefined') return true
  if (mode === 'enabled' || query.get('motion') === 'enabled') return false
  return mode === 'disabled' || query.get('motion') === 'disabled' || navigator.webdriver
}

function layoutVisibilityRatio(element: HTMLElement, effect: EntranceEffect) {
  const rect = element.getBoundingClientRect()
  let layoutTop = rect.top
  let layoutHeight = rect.height

  if (effect === 'fadeInUp') {
    layoutTop -= rect.height
  } else if (effect === 'zoomIn' && rect.height > 0) {
    layoutHeight = rect.height / 0.3
    layoutTop -= (layoutHeight - rect.height) / 2
  }

  if (layoutHeight <= 0) return 0

  const viewportTop = 0
  const viewportBottom = window.innerHeight * 0.9
  const visibleHeight = Math.max(
    0,
    Math.min(layoutTop + layoutHeight, viewportBottom) - Math.max(layoutTop, viewportTop)
  )

  return visibleHeight / layoutHeight
}

export function EntranceReveal({
  as = 'div',
  effect,
  slow = true,
  once = true,
  amount = 0.12,
  trigger = 'inView',
  ...props
}: EntranceRevealProps) {
  const [scope, animate] = useAnimate()
  const disabled = motionIsDisabled()
  const observerAmount = effect === 'fadeInLeft' || effect === 'fadeInRight' ? 0 : amount

  isomorphicLayoutEffect(() => {
    const element = scope.current as HTMLElement | null
    if (!element || disabled) return

    element.style.opacity = '0'
    element.style.transform = hiddenTransform[effect]
    element.style.willChange = 'opacity, transform'
  }, [disabled, effect, scope])

  React.useEffect(() => {
    const element = scope.current as HTMLElement | null
    if (!element || disabled) return

    let played = false
    let stopObserving: () => void = () => {}
    const play = () => {
      if (once && played) return
      played = true
      if (once) stopObserving()

      const duration = slow ? 2 : 1.25
      const keyframes =
        effect === 'zoomIn'
          ? { opacity: [0, 1, 1], transform: [hiddenTransform.zoomIn, 'scale3d(0.65, 0.65, 0.65)', 'none'] }
          : { opacity: [0, 1], transform: [hiddenTransform[effect], 'none'] }

      animate(element, keyframes, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        times: effect === 'zoomIn' ? [0, 0.5, 1] : undefined,
      }).then(() => {
        element.style.willChange = 'auto'
      })
    }

    if (trigger === 'mount') {
      play()
      return
    }

    stopObserving = observeInView(element, observerAmount, () => {
      play()
    })

    const playIfLayoutIsInView = () => {
      if (!played && layoutVisibilityRatio(element, effect) >= amount) play()
    }

    playIfLayoutIsInView()
    window.addEventListener('resize', playIfLayoutIsInView, { passive: true })

    return () => {
      stopObserving()
      window.removeEventListener('resize', playIfLayoutIsInView)
    }
  }, [amount, animate, disabled, effect, observerAmount, once, scope, slow, trigger])

  return React.createElement(as, {
    ...props,
    ref: scope,
    'data-dr-helio-entrance': effect,
  })
}
