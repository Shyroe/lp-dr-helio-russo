import { expect, test } from '@playwright/test'

import { collectBrowserErrors } from './support/browser-errors'

test('renders the complete landing page and primary calls to action', async ({ page }) => {
  await page.goto('/?motion=disabled')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tem Vergonha de Sorrir? Isso Pode Acabar Hoje!')
  await expect(page.getByRole('heading', { name: /Perguntas Frequentes/i })).toBeVisible()
  await expect(page.locator('[data-dr-helio-footer]')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Conversar pelo WhatsApp' })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\//
  )
  await expect(page.getByRole('link', { name: 'Voltar ao topo' })).toHaveAttribute('href', '#topo2')
})

test('loads without browser or network errors', async ({ page }) => {
  const errors = collectBrowserErrors(page)
  await page.goto('/?motion=disabled')
  await page.waitForLoadState('networkidle')

  expect(errors).toEqual([])
})
