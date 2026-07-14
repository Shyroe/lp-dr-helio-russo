import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { TestimonialsSection } from './TestimonialsSection'

type EmblaListener = (api: unknown) => void

const emblaMock = vi.hoisted(() => {
  const listeners = new Map<string, Set<EmblaListener>>()
  const state = { selectedSnap: 0 }
  const api = {
    canScrollPrev: vi.fn(() => false),
    canScrollNext: vi.fn(() => true),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    selectedScrollSnap: vi.fn(() => state.selectedSnap),
    on: vi.fn((event: string, listener: EmblaListener) => {
      const eventListeners = listeners.get(event) ?? new Set<EmblaListener>()
      eventListeners.add(listener)
      listeners.set(event, eventListeners)
    }),
    off: vi.fn((event: string, listener: EmblaListener) => {
      listeners.get(event)?.delete(listener)
    }),
  }
  const carouselRef = vi.fn()
  const useEmblaCarousel = vi.fn(() => [carouselRef, api])

  return { api, carouselRef, listeners, state, useEmblaCarousel }
})

vi.mock('embla-carousel-react', () => ({
  default: emblaMock.useEmblaCarousel,
}))

function emit(event: 'select' | 'reInit') {
  for (const listener of emblaMock.listeners.get(event) ?? []) {
    listener(emblaMock.api)
  }
}

describe('TestimonialsSection', () => {
  beforeEach(() => {
    emblaMock.listeners.clear()
    emblaMock.state.selectedSnap = 0
    emblaMock.api.canScrollPrev.mockReturnValue(false)
    emblaMock.api.canScrollNext.mockReturnValue(true)
  })

  it('renders accessible carousel, slide and review semantics for all responsive variants', () => {
    render(<TestimonialsSection />)

    expect(document.querySelectorAll('[data-dr-helio-testimonials-carousel]')).toHaveLength(3)
    expect(screen.getAllByRole('article')).toHaveLength(18)
    expect(screen.getAllByRole('article', { name: 'Avaliação de Tibery Matinha' })).toHaveLength(3)
    expect(screen.getAllByRole('img', { name: '5 de 5 estrelas' })).toHaveLength(18)
    expect(screen.getAllByRole('button', { name: 'Avaliação anterior' })).toHaveLength(1)
    expect(screen.getAllByRole('button', { name: 'Próxima avaliação' })).toHaveLength(1)

    const slides = screen.getAllByRole('group')
    expect(slides).toHaveLength(18)
    expect(slides.every((slide) => slide.getAttribute('aria-roledescription') === 'slide')).toBe(true)
  })

  it('synchronizes the mobile progress indicator on select and reInit', async () => {
    render(<TestimonialsSection />)

    const progressThumb = document.querySelector('[data-dr-helio-testimonials-progress] > span') as HTMLElement | null
    expect(progressThumb?.style.transform).toBe('translateX(75px)')

    emblaMock.state.selectedSnap = 3
    act(() => emit('select'))
    await waitFor(() => expect(progressThumb?.style.transform).toBe('translateX(0px)'))

    emblaMock.state.selectedSnap = 5
    act(() => emit('reInit'))
    await waitFor(() => expect(progressThumb?.style.transform).toBe('translateX(50px)'))
  })

  it('updates the custom review scrollbar only for long reviews', () => {
    render(<TestimonialsSection />)

    const longReview = screen.getAllByLabelText('Texto da avaliação de daniel Sales Arantes')[0]
    const shortReview = screen.getAllByLabelText('Texto da avaliação de Tibery Matinha')[0]

    expect(longReview?.getAttribute('tabindex')).toBe('0')
    expect(shortReview?.getAttribute('tabindex')).toBeNull()
    expect(shortReview?.nextElementSibling).toBeNull()

    if (!longReview) throw new Error('Expected the long review text area to render')

    Object.defineProperties(longReview, {
      scrollHeight: { configurable: true, value: 300 },
      clientHeight: { configurable: true, value: 87 },
      scrollTop: { configurable: true, writable: true, value: 106.5 },
    })

    fireEvent.scroll(longReview)

    const scrollThumb = longReview.nextElementSibling?.firstElementChild as HTMLElement | null
    expect(scrollThumb?.style.height).toBe('24px')
    expect(scrollThumb?.style.transform).toBe('translateY(31.5px)')
  })

  it('removes section and carousel listeners when unmounted', async () => {
    const { unmount } = render(<TestimonialsSection />)

    await waitFor(() => {
      expect(emblaMock.listeners.get('select')?.size ?? 0).toBeGreaterThan(0)
      expect(emblaMock.listeners.get('reInit')?.size ?? 0).toBeGreaterThan(0)
    })

    unmount()

    expect(emblaMock.listeners.get('select')?.size ?? 0).toBe(0)
    expect(emblaMock.listeners.get('reInit')?.size ?? 0).toBe(0)
  })
})
