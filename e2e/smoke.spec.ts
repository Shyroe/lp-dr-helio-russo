import { expect, test } from '@playwright/test'

import { collectBrowserErrors } from './support/browser-errors'

test('renders the complete landing page and primary calls to action', async ({ page }) => {
  await page.goto('/?motion=disabled')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tem Vergonha de Sorrir? Isso Pode Acabar Hoje!')
  await expect(page.getByRole('heading', { name: /Perguntas Frequentes/i })).toBeVisible()
  await expect(page.locator('[data-dr-helio-footer]')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Conversar pelo WhatsApp' })).toHaveAttribute('href', '#')
  await expect(page.locator('a[href^="https://wa.me/"]')).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Termos de uso e políticas de privacidade' })).toHaveAttribute(
    'href',
    '#'
  )
  await expect(page.locator('a[href="#"]')).toHaveCount(7)
  await expect(page.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute('href', '#topo2')
  await expect(page.locator('[data-dr-helio-footer-copyright]')).toContainText(String(new Date().getFullYear()))
})

test('keeps the floating WhatsApp action visible after footer hydration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/?motion=enabled')

  const floatingWhatsapp = page.locator('[data-dr-helio-floating-whatsapp]')
  await expect(floatingWhatsapp).toHaveCSS('position', 'fixed')
  await expect(floatingWhatsapp).toHaveCSS('opacity', '1')

  await page.locator('[data-dr-helio-footer]').scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  await expect(floatingWhatsapp).toHaveCSS('opacity', '1')
  const rect = await floatingWhatsapp.boundingBox()
  expect(rect).not.toBeNull()
  expect(rect?.width).toBeCloseTo(55, 1)
  expect(rect?.height).toBeCloseTo(55, 1)
  expect(rect?.x).toBeCloseTo(290, 1)
  expect(rect?.y).toBeCloseTo(764, 1)
})

test('scrolls placeholder hash links smoothly to the top', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/?motion=disabled')

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')

  const startScrollY = await page.evaluate(() => {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo(0, document.body.scrollHeight)
    const scrollY = window.scrollY
    root.style.scrollBehavior = previousScrollBehavior
    return scrollY
  })

  expect(startScrollY).toBeGreaterThan(100)

  await page.locator('[data-dr-helio-footer-cta]').scrollIntoViewIfNeeded()
  await page.evaluate(
    () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
  )
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100)

  const immediateScrollY = await page.locator('[data-dr-helio-footer-cta]').evaluate((link) => {
    if (!(link instanceof HTMLAnchorElement)) throw new Error('Footer CTA anchor is unavailable')
    link.click()
    return window.scrollY
  })

  expect(immediateScrollY).toBeGreaterThan(0)
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 }).toBeLessThanOrEqual(1)
})

test('loads without browser or network errors', async ({ page }) => {
  const errors = collectBrowserErrors(page)
  await page.goto('/?motion=disabled')
  await page.waitForLoadState('networkidle')

  expect(errors).toEqual([])
})
