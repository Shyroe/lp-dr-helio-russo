import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FaqSection } from './FaqSection'

describe('FaqSection', () => {
  it('starts closed, keeps a single item open and allows collapse', async () => {
    render(<FaqSection />)

    const triggers = screen.getAllByRole('button')
    expect(triggers).toHaveLength(9)
    expect(triggers.every((trigger) => trigger.getAttribute('aria-expanded') === 'false')).toBe(true)

    const first = triggers[0]
    const second = triggers[1]

    fireEvent.click(first)
    await waitFor(() => expect(first.getAttribute('aria-expanded')).toBe('true'))

    const firstContentId = first.getAttribute('aria-controls')
    expect(firstContentId).not.toBeNull()
    const firstContent = document.getElementById(firstContentId ?? '')
    expect(firstContent?.textContent).toContain('Utilizamos técnicas modernas e anestesias eficazes')

    fireEvent.click(second)
    await waitFor(() => expect(second.getAttribute('aria-expanded')).toBe('true'))
    expect(first.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(second)
    await waitFor(() => expect(second.getAttribute('aria-expanded')).toBe('false'))
  })

  it('supports the Radix roving-focus keyboard contract', () => {
    render(<FaqSection />)

    const triggers = screen.getAllByRole('button')
    const first = triggers[0]
    const second = triggers[1]
    const last = triggers.at(-1)

    if (!last) throw new Error('Expected FAQ triggers to render')

    first.focus()
    expect(document.activeElement).toBe(first)

    fireEvent.keyDown(first, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(second)

    fireEvent.keyDown(second, { key: 'End' })
    expect(document.activeElement).toBe(last)

    fireEvent.keyDown(last, { key: 'Home' })
    expect(document.activeElement).toBe(first)

    fireEvent.keyDown(first, { key: 'ArrowUp' })
    expect(document.activeElement).toBe(last)
  })

  it('exposes an accessible relationship for every active trigger and panel', async () => {
    render(<FaqSection />)

    for (const trigger of screen.getAllByRole('button')) {
      fireEvent.click(trigger)
      await waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'))

      const controls = trigger.getAttribute('aria-controls')
      expect(controls).not.toBeNull()
      expect(document.getElementById(controls ?? '')).not.toBeNull()
    }
  })
})
