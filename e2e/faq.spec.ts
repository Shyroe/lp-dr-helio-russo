import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/?motion=disabled')
})

test('opens one FAQ answer at a time and allows collapse', async ({ page }) => {
  const first = page.getByRole('button', { name: 'O tratamento odontológico é doloroso?' })
  const second = page.getByRole('button', { name: 'Com que frequência devo ir ao dentista?' })

  await expect(first).toHaveAttribute('aria-expanded', 'false')
  await first.click()
  await expect(first).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText(/Utilizamos técnicas modernas e anestesias eficazes/)).toBeVisible()

  await second.click()
  await expect(second).toHaveAttribute('aria-expanded', 'true')
  await expect(first).toHaveAttribute('aria-expanded', 'false')

  await second.click()
  await expect(second).toHaveAttribute('aria-expanded', 'false')
})

test('supports the Radix roving-focus keyboard contract', async ({ page }) => {
  const triggers = page.locator('[data-dr-helio-faq-accordion] button')
  const first = triggers.first()
  const second = triggers.nth(1)
  const last = triggers.last()

  await first.focus()
  await expect(first).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(second).toBeFocused()
  await page.keyboard.press('End')
  await expect(last).toBeFocused()
  await page.keyboard.press('Home')
  await expect(first).toBeFocused()
  await page.keyboard.press('ArrowUp')
  await expect(last).toBeFocused()
})
