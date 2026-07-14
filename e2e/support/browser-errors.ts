import type { Page } from '@playwright/test'

export function collectBrowserErrors(page: Page) {
  const errors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
  page.on('requestfailed', (request) => {
    const failure = request.failure()?.errorText ?? 'unknown failure'
    errors.push(`requestfailed: ${request.method()} ${request.url()} (${failure})`)
  })

  return errors
}
