import { expect, test } from '@playwright/test'

test('navigates the desktop testimonials carousel with accessible controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/?motion=disabled')

  const previous = page.getByRole('button', { name: 'Avaliação anterior' })
  const next = page.getByRole('button', { name: 'Próxima avaliação' })

  await expect(previous).toBeDisabled()
  await expect(next).toBeEnabled()
  await next.click()
  await expect(previous).toBeEnabled()
})

test('updates the mobile progress indicator through keyboard navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?motion=disabled')

  const carousel = page.locator('[data-dr-helio-testimonials-carousel]:visible')
  const progress = page.locator('[data-dr-helio-testimonials-progress] > span')

  await expect(carousel).toHaveCount(1)
  await expect(progress).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 75, 0)')
  await carousel.focus()
  await page.keyboard.press('ArrowRight')
  await expect(progress).not.toHaveCSS('transform', 'matrix(1, 0, 0, 1, 75, 0)')
})
