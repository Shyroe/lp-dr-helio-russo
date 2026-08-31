import { expect, test } from '@playwright/test'

test('exposes the expected landmark, heading and image semantics', async ({ page }) => {
  await page.goto('/?motion=disabled')

  await expect(page.getByRole('main')).toHaveCount(1)
  await expect(page.getByRole('contentinfo')).toHaveCount(1)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('img:not([alt])')).toHaveCount(0)

  const duplicateIds = await page.evaluate(() => {
    const counts = new Map<string, number>()
    for (const element of document.querySelectorAll('[id]')) {
      const id = element.id
      counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return [...counts.entries()].filter(([, count]) => count > 1)
  })
  expect(duplicateIds).toEqual([])
})

test('keeps testimonial metadata at WCAG AA text contrast', async ({ page }) => {
  await page.goto('/?motion=disabled')

  const contrastRatio = await page
    .locator('[data-review-name="Lara Garcia"] p')
    .nth(1)
    .evaluate((element) => {
      const parseRgb = (value: string) => {
        const channels = value
          .match(/[\d.]+/g)
          ?.slice(0, 3)
          .map(Number)
        if (channels?.length !== 3) {
          throw new Error(`Unable to parse RGB color: ${value}`)
        }
        return channels
      }

      const luminance = (rgb: number[]) => {
        const [red, green, blue] = rgb.map((channel) => {
          const normalized = channel / 255
          return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * red + 0.7152 * green + 0.0722 * blue
      }

      const card = element.closest('[data-dr-helio-card="testimonial"]')
      if (!card) {
        throw new Error('Unable to find testimonial card background')
      }

      const foreground = luminance(parseRgb(getComputedStyle(element).color))
      const background = luminance(parseRgb(getComputedStyle(card).backgroundColor))
      const lighter = Math.max(foreground, background)
      const darker = Math.min(foreground, background)

      return (lighter + 0.05) / (darker + 0.05)
    })

  expect(contrastRatio).toBeGreaterThanOrEqual(4.5)
})
