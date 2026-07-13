import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel'

type EmblaListener = (api: unknown) => void

const emblaMock = vi.hoisted(() => {
  const listeners = new Map<string, Set<EmblaListener>>()
  const carouselRef = vi.fn()
  const api = {
    canScrollPrev: vi.fn(() => false),
    canScrollNext: vi.fn(() => true),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    on: vi.fn((event: string, listener: EmblaListener) => {
      const eventListeners = listeners.get(event) ?? new Set<EmblaListener>()
      eventListeners.add(listener)
      listeners.set(event, eventListeners)
    }),
    off: vi.fn((event: string, listener: EmblaListener) => {
      listeners.get(event)?.delete(listener)
    }),
  }
  const useEmblaCarousel = vi.fn(() => [carouselRef, api])

  return { api, carouselRef, listeners, useEmblaCarousel }
})

vi.mock('embla-carousel-react', () => ({
  default: emblaMock.useEmblaCarousel,
}))

function emit(event: 'select' | 'reInit') {
  for (const listener of emblaMock.listeners.get(event) ?? []) {
    listener(emblaMock.api)
  }
}

function renderCarousel(orientation: 'horizontal' | 'vertical' = 'horizontal') {
  return render(
    <Carousel aria-label="Test carousel" orientation={orientation}>
      <CarouselContent>
        <CarouselItem aria-label="1 de 2">First</CarouselItem>
        <CarouselItem aria-label="2 de 2">Second</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

describe('Carousel', () => {
  beforeEach(() => {
    emblaMock.listeners.clear()
    emblaMock.api.canScrollPrev.mockReturnValue(false)
    emblaMock.api.canScrollNext.mockReturnValue(true)
  })

  it('wires controls and keyboard navigation to Embla', async () => {
    renderCarousel()

    const region = screen.getByRole('region', { name: 'Test carousel' })
    const previous = screen.getByRole('button', { name: 'Previous slide' })
    const next = screen.getByRole('button', { name: 'Next slide' })

    await waitFor(() => expect(previous.hasAttribute('disabled')).toBe(true))
    expect(next.hasAttribute('disabled')).toBe(false)

    fireEvent.click(next)
    expect(emblaMock.api.scrollNext).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(region, { key: 'ArrowLeft' })
    expect(emblaMock.api.scrollPrev).toHaveBeenCalledTimes(1)

    fireEvent.keyDown(region, { key: 'ArrowRight' })
    expect(emblaMock.api.scrollNext).toHaveBeenCalledTimes(2)
  })

  it('updates button state after select and reInit events', async () => {
    renderCarousel()

    const previous = screen.getByRole('button', { name: 'Previous slide' })
    const next = screen.getByRole('button', { name: 'Next slide' })

    emblaMock.api.canScrollPrev.mockReturnValue(true)
    emblaMock.api.canScrollNext.mockReturnValue(false)

    act(() => emit('select'))

    await waitFor(() => expect(previous.hasAttribute('disabled')).toBe(false))
    expect(next.hasAttribute('disabled')).toBe(true)

    emblaMock.api.canScrollPrev.mockReturnValue(false)
    emblaMock.api.canScrollNext.mockReturnValue(true)

    act(() => emit('reInit'))

    await waitFor(() => expect(previous.hasAttribute('disabled')).toBe(true))
    expect(next.hasAttribute('disabled')).toBe(false)
  })

  it('registers and removes Embla listeners during the component lifecycle', async () => {
    const { unmount } = renderCarousel()

    await waitFor(() => {
      expect(emblaMock.api.on).toHaveBeenCalledWith('select', expect.any(Function))
      expect(emblaMock.api.on).toHaveBeenCalledWith('reInit', expect.any(Function))
    })

    unmount()

    expect(emblaMock.api.off).toHaveBeenCalledWith('select', expect.any(Function))
    expect(emblaMock.api.off).toHaveBeenCalledWith('reInit', expect.any(Function))
    expect(emblaMock.listeners.get('select')?.size ?? 0).toBe(0)
    expect(emblaMock.listeners.get('reInit')?.size ?? 0).toBe(0)
  })

  it('configures vertical orientation and preserves slide semantics', () => {
    renderCarousel('vertical')

    expect(emblaMock.useEmblaCarousel).toHaveBeenCalledWith(expect.objectContaining({ axis: 'y' }), undefined)

    const content = document.querySelector('[data-slot="carousel-content"]')
    expect(content?.className).toContain('flex-col')

    const slides = screen.getAllByRole('group')
    expect(slides).toHaveLength(2)
    expect(slides[0]?.getAttribute('aria-roledescription')).toBe('slide')
    expect(slides[0]?.getAttribute('aria-label')).toBe('1 de 2')
  })
})
