import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

class ResizeObserverMock implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  configurable: true,
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(window, 'matchMedia', {
  configurable: true,
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  }),
})

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  configurable: true,
  writable: true,
  value: () => {},
})

Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  configurable: true,
  writable: true,
  value: () => false,
})

Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', {
  configurable: true,
  writable: true,
  value: () => {},
})

Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', {
  configurable: true,
  writable: true,
  value: () => {},
})
