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
