import { expect, test } from '@playwright/test'

const ultrawideViewport = { name: 'ultrawide', width: 2560, height: 1440 } as const

for (const viewport of [
  { name: 'small-mobile', width: 320, height: 844 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
  ultrawideViewport,
]) {
  test(`does not create horizontal overflow on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/?motion=disabled')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(overflow).toBeLessThanOrEqual(1)
    await expect(page.locator('[data-dr-helio-footer]')).toBeVisible()
  })
}

test('hero background canvas covers an ultrawide viewport without stretching the composition', async ({ page }) => {
  await page.setViewportSize(ultrawideViewport)
  await page.goto('/?motion=disabled')

  const heroBackground = page.locator('[data-hero-background]')
  const heroImage = page.locator('[data-hero-lcp-image]')
  const backgroundMetrics = await heroBackground.evaluate((element) => ({
    width: element.getBoundingClientRect().width,
  }))
  const metrics = await heroImage.evaluate((image) => {
    if (!(image instanceof HTMLImageElement)) throw new Error('Hero LCP image is unavailable')
    const rect = image.getBoundingClientRect()
    return {
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      renderedWidth: rect.width,
      renderedHeight: rect.height,
      renderedCenterX: rect.left + rect.width / 2,
    }
  })

  expect(backgroundMetrics.width).toBe(ultrawideViewport.width)
  expect(metrics.naturalWidth).toBe(3840)
  expect(metrics.naturalHeight).toBe(700)
  expect(metrics.renderedWidth).toBeGreaterThanOrEqual(backgroundMetrics.width)
  expect(metrics.renderedHeight).toBeCloseTo(740, 0)
  expect(metrics.renderedWidth / metrics.renderedHeight).toBeCloseTo(metrics.naturalWidth / metrics.naturalHeight, 3)
  expect(metrics.renderedCenterX).toBeCloseTo(ultrawideViewport.width / 2, 0)
})

// Cover the one-pixel Elementor desktop boundary and continuous viewport transitions.
test.describe('continuous responsive behavior', () => {
  const widths = [2336, 1920, 1440, 1200, 1100, 1046, 1025, 1024, 960, 820, 768, 767, 640, 600, 430, 390, 389, 360, 320]

  for (const width of widths) {
    test(`keeps layout and images healthy at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width <= 430 ? 844 : 1000 })
      await page.goto('/?motion=disabled')

      await page.evaluate(async () => {
        const pageHeight = document.documentElement.scrollHeight
        for (let y = 0; y < pageHeight; y += 700) {
          window.scrollTo(0, y)
          await new Promise((resolve) => window.setTimeout(resolve, 15))
        }
        window.scrollTo(0, 0)
      })

      const health = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        brokenImages: [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect()
            return rect.width > 0 && rect.height > 0 && image.complete && image.naturalWidth === 0
          })
          .map((image) => image.currentSrc || image.src),
        unexpectedlyPendingImages: [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect()
            return rect.width > 0 && rect.height > 0 && !image.complete && image.loading !== 'lazy'
          })
          .map((image) => image.currentSrc || image.src),
      }))

      expect(health.overflow).toBeLessThanOrEqual(1)
      expect(health.brokenImages).toEqual([])
      expect(health.unexpectedlyPendingImages).toEqual([])
    })
  }

  test('uses the expected section grids across the 1024/1025 transition', async ({ page }) => {
    const assertColumns = async (
      width: number,
      expectedColumns: Record<'service' | 'whyChoose' | 'hygiene', number>
    ) => {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      for (const [key, selector] of Object.entries({
        service: '[data-dr-helio-card="service"]',
        whyChoose: '[data-dr-helio-card="why-choose"]',
        hygiene: '[data-dr-helio-card="hygiene-benefit"]',
      })) {
        const columns = await page.locator(selector).evaluateAll((elements) => {
          const tops = elements.map((element) => Math.round(element.getBoundingClientRect().top / 4) * 4)
          return Math.max(...[...new Set(tops)].map((top) => tops.filter((value) => value === top).length))
        })
        expect(columns).toBe(expectedColumns[key as keyof typeof expectedColumns])
      }
    }

    await assertColumns(1024, { service: 2, whyChoose: 3, hygiene: 2 })
    await assertColumns(1025, { service: 4, whyChoose: 3, hygiene: 4 })
  })

  test('keeps desktop-transition content inset from the viewport edges', async ({ page }) => {
    for (const width of [1025, 1046, 1100, 1139, 1200]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/?motion=disabled')

      const gutters = await page.evaluate(() => {
        const sectionFor = (selector: string) => document.querySelector(selector)?.closest('section')
        const targets = {
          hero: document.querySelector('#topo2 [data-hero-background] > div'),
          experience: sectionFor('#dr-helio-experience-title')?.firstElementChild,
          lifeStages: sectionFor('#dr-helio-life-stages-title')?.querySelector(':scope > div'),
          faq: sectionFor('#dr-helio-faq-title')?.firstElementChild,
        }

        return Object.fromEntries(
          Object.entries(targets).map(([name, element]) => {
            if (!(element instanceof HTMLElement)) throw new Error(`${name} responsive container is unavailable`)
            const rect = element.getBoundingClientRect()
            return [name, { left: rect.left, right: window.innerWidth - rect.right }]
          })
        )
      })

      for (const gutter of Object.values(gutters)) {
        expect(gutter.left).toBeGreaterThanOrEqual(79)
        expect(gutter.right).toBeGreaterThanOrEqual(79)
      }

      const experienceOverflow = await page.locator('#dr-helio-experience-title').evaluate((title) => {
        const container = title.closest('section')?.firstElementChild
        if (!(container instanceof HTMLElement)) throw new Error('Experience responsive container is unavailable')
        return container.scrollHeight - container.clientHeight
      })
      expect(experienceOverflow).toBeLessThanOrEqual(1)
    }
  })

  test('keeps desktop-transition content clear of the next section boundary', async ({ page }) => {
    for (const width of [1025, 1046, 1050, 1100, 1139, 1200, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/?motion=disabled')

      const measureBottomGap = async (sectionAnchor: string, contentSelector: string, useLast = false) => {
        const anchor = page.locator(sectionAnchor).first()
        await anchor.scrollIntoViewIfNeeded()

        return anchor.evaluate(
          (element, options) => {
            const section = element.closest('section')
            const contents = section?.querySelectorAll(options.contentSelector)
            const content = options.useLast ? contents?.[contents.length - 1] : contents?.[0]
            if (!(section instanceof HTMLElement) || !(content instanceof HTMLElement)) {
              throw new Error(`${options.contentSelector} visual spacing target is unavailable`)
            }

            const sectionRect = section.getBoundingClientRect()
            const contentRect = content.getBoundingClientRect()
            return sectionRect.bottom - contentRect.bottom
          },
          { contentSelector, useLast }
        )
      }

      const gaps = {
        hero: await measureBottomGap('[aria-label="Tratamentos em destaque"]', '[data-dr-helio-card="service"]', true),
        experience: await measureBottomGap('#dr-helio-experience-title', 'li', true),
        whyChoose: await measureBottomGap('#dr-helio-why-title', 'a[href="#"]'),
        lifeStages: await measureBottomGap('#dr-helio-life-stages-title', '[data-dr-helio-card="life-stage"]', true),
        hygiene: await measureBottomGap('#dr-helio-hygiene-title', 'a[href="#"]'),
        treatments: await measureBottomGap('#dr-helio-treatments-title', 'a[href="#"]'),
        testimonials: await measureBottomGap('#dr-helio-testimonials-title', '[data-dr-helio-testimonials-badge]'),
        faq: await measureBottomGap('#dr-helio-faq-title', '[data-dr-helio-faq-accordion]'),
      }

      const minimumGaps = {
        hero: 79,
        // The reference Experience layout intentionally tightens to ~10px at
        // the 1025–1046 desktop transition while the image stays bottom-anchored.
        experience: 9,
        whyChoose: 79,
        lifeStages: 65,
        hygiene: 79,
        treatments: 79,
        testimonials: 79,
        faq: 79,
      }

      for (const [section, gap] of Object.entries(gaps)) {
        expect(gap, `${section} bottom spacing at ${width}px`).toBeGreaterThanOrEqual(
          minimumGaps[section as keyof typeof minimumGaps]
        )
      }
    }
  })

  test('keeps the Experience image inside its narrow-mobile gutter', async ({ page }) => {
    for (const width of [320, 360]) {
      await page.setViewportSize({ width, height: 844 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/?motion=disabled')

      const title = page.locator('#dr-helio-experience-title')
      await title.scrollIntoViewIfNeeded()
      const imageGutters = await title.evaluate((title) => {
        const image = title.closest('section')?.querySelector('img')
        if (!(image instanceof HTMLImageElement)) throw new Error('Experience image is unavailable')
        const rect = image.getBoundingClientRect()
        return { left: rect.left, right: window.innerWidth - rect.right }
      })

      expect(imageGutters.left).toBeGreaterThanOrEqual(19)
      expect(imageGutters.right).toBeGreaterThanOrEqual(19)
    }
  })

  test('matches the reference FAQ image sizing without stretching it', async ({ page }) => {
    for (const width of [320, 360, 390, 430, 600, 767, 768, 820, 960, 1024, 1025, 1200, 1440]) {
      await page.setViewportSize({ width, height: 1400 })
      await page.goto('/?motion=disabled')

      const metrics = await page.locator('[data-dr-helio-faq-image]').evaluate((image) => {
        const rect = image.getBoundingClientRect()
        return {
          x: rect.x,
          width: rect.width,
          height: rect.height,
        }
      })

      let expectedWidth: number
      let expectedX: number

      if (width <= 767) {
        expectedWidth = width - 60
        expectedX = 30
      } else if (width <= 1024) {
        const contentWidth = width - 80
        expectedWidth = contentWidth * 0.55
        expectedX = 40 + (contentWidth - expectedWidth) / 2
      } else {
        const contentWidth = Math.min(width - 160, 1140)
        expectedWidth = (contentWidth - 20) / 2
        expectedX = Math.max(80, (width - 1140) / 2)
      }

      expect(metrics.width, `FAQ image width at ${width}px`).toBeCloseTo(expectedWidth, 0)
      expect(metrics.x, `FAQ image x-position at ${width}px`).toBeCloseTo(expectedX, 0)
      expect(metrics.height / metrics.width, `FAQ image aspect ratio at ${width}px`).toBeCloseTo(1.25, 2)
    }
  })

  test('matches the reference Experience image sizing and bottom anchoring across responsive widths', async ({
    page,
  }) => {
    const referenceGeometry = {
      320: { sectionHeight: 1056.3, imageTop: 706.3, imageWidth: 280 },
      340: { sectionHeight: 1037.1, imageTop: 662.1, imageWidth: 300 },
      360: { sectionHeight: 994.6, imageTop: 594.6, imageWidth: 320 },
      390: { sectionHeight: 1009.6, imageTop: 572.1, imageWidth: 350 },
      430: { sectionHeight: 1037.1, imageTop: 549.6, imageWidth: 390 },
      480: { sectionHeight: 1054.6, imageTop: 504.6, imageWidth: 440 },
      600: { sectionHeight: 1159.6, imageTop: 459.6, imageWidth: 560 },
      768: { sectionHeight: 1016.6, imageTop: 449.6, imageWidth: 453.6 },
      820: { sectionHeight: 1062.1, imageTop: 449.6, imageWidth: 490 },
      960: { sectionHeight: 1162.1, imageTop: 427.1, imageWidth: 588 },
      1024: { sectionHeight: 1218.1, imageTop: 427.1, imageWidth: 632.8 },
      1025: { sectionHeight: 662.1, imageTop: 183.6, imageWidth: 382.8 },
      1046: { sectionHeight: 604.6, imageTop: 113, imageWidth: 393.2 },
      1100: { sectionHeight: 625.3, imageTop: 100, imageWidth: 420.2 },
      1200: { sectionHeight: 687.8, imageTop: 100, imageWidth: 470.2 },
      1440: { sectionHeight: 750.2, imageTop: 100, imageWidth: 520.2 },
    } as const

    for (const [widthText, reference] of Object.entries(referenceGeometry)) {
      const width = Number(widthText)
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const metrics = await page.locator('#dr-helio-experience-title').evaluate((title) => {
        const section = title.closest('section')
        const image = section?.querySelector('img')
        const imageColumn = image?.parentElement
        if (
          !(section instanceof HTMLElement) ||
          !(image instanceof HTMLImageElement) ||
          !(imageColumn instanceof HTMLElement)
        ) {
          throw new Error('Experience image geometry is unavailable')
        }

        const sectionRect = section.getBoundingClientRect()
        const imageRect = image.getBoundingClientRect()
        const columnRect = imageColumn.getBoundingClientRect()

        return {
          sectionHeight: sectionRect.height,
          imageWidth: imageRect.width,
          imageHeight: imageRect.height,
          imageTop: imageRect.top - sectionRect.top,
          imageBottomGap: sectionRect.bottom - imageRect.bottom,
          columnHeight: columnRect.height,
        }
      })

      // Chromium headless shell and full Chrome can differ by one wrapped text line
      // even with the same local font assets. Keep this structural guard tolerant to
      // that single-line engine variance; exact reference geometry is enforced by
      // the canonical section visual audit running in full Chrome.
      expect(
        Math.abs(metrics.sectionHeight - reference.sectionHeight),
        `Experience section height drift at ${width}px`
      ).toBeLessThanOrEqual(23)
      expect(
        Math.abs(metrics.imageTop - reference.imageTop),
        `Experience image vertical position drift at ${width}px`
      ).toBeLessThanOrEqual(23)
      expect(metrics.imageWidth, `Experience image width at ${width}px`).toBeCloseTo(reference.imageWidth, 0)

      if (width < 768) {
        expect(metrics.imageWidth, `Experience mobile image width at ${width}px`).toBeCloseTo(width - 40, 0)
      } else if (width <= 1024) {
        const expectedTabletWidth = (width - 80 - 40) * 0.7
        expect(metrics.imageWidth, `Experience tablet image width at ${width}px`).toBeCloseTo(expectedTabletWidth, 0)
      } else {
        expect(metrics.imageBottomGap, `Experience desktop image bottom anchoring at ${width}px`).toBeLessThanOrEqual(1)
        expect(metrics.columnHeight, `Experience desktop image column height at ${width}px`).toBeGreaterThanOrEqual(
          metrics.imageHeight
        )
      }

      if (width === 1025) expect(metrics.imageTop).toBeGreaterThan(150)
      if (width === 1046) expect(metrics.imageTop).toBeGreaterThan(105)
    }
  })

  test('centers primary CTA labels vertically across responsive widths', async ({ page }) => {
    for (const width of [320, 360, 390, 430, 768, 1025, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const metrics = await page.locator('a[href="#"]:not([data-dr-helio-footer-privacy])').evaluateAll((links) =>
        links
          .filter((link) => link.textContent?.trim())
          .map((link) => {
            const linkRect = link.getBoundingClientRect()
            const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT)
            let textNode = walker.nextNode()

            while (textNode && !textNode.textContent?.trim()) {
              textNode = walker.nextNode()
            }

            if (!textNode) throw new Error('CTA text node is unavailable')

            const range = document.createRange()
            range.selectNodeContents(textNode)
            const textRect = range.getBoundingClientRect()

            return {
              centerDelta: textRect.top + textRect.height / 2 - (linkRect.top + linkRect.height / 2),
              textHeight: textRect.height,
            }
          })
      )

      expect(metrics).toHaveLength(5)
      for (const metric of metrics) {
        expect(Math.abs(metric.centerDelta)).toBeLessThanOrEqual(1)
        if (width >= 430) expect(metric.textHeight).toBeLessThanOrEqual(20)
      }
    }
  })

  test('keeps the Hygiene CTA WhatsApp icon grouped with its label', async ({ page }) => {
    for (const width of [430, 600, 645, 768, 1025, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const metrics = await page.locator('[data-dr-helio-hygiene-cta]').evaluate((link) => {
        const label = [...link.querySelectorAll('span')].find(
          (span) => span.children.length === 0 && (span.textContent?.trim().length ?? 0) > 10
        )
        const icon = link.querySelector('svg')
        if (!(label instanceof HTMLSpanElement) || !(icon instanceof SVGElement)) {
          throw new Error('Hygiene CTA label/icon are unavailable')
        }

        const range = document.createRange()
        range.selectNodeContents(label)
        const textRect = range.getBoundingClientRect()
        const iconRect = icon.getBoundingClientRect()
        const linkRect = link.getBoundingClientRect()

        return {
          gap: iconRect.left - textRect.right,
          groupCenterDelta: (textRect.left + iconRect.right) / 2 - (linkRect.left + linkRect.width / 2),
        }
      })

      expect(metrics.gap, `Hygiene CTA text/icon gap at ${width}px`).toBeGreaterThanOrEqual(4)
      expect(metrics.gap, `Hygiene CTA text/icon gap at ${width}px`).toBeLessThanOrEqual(6)
      expect(Math.abs(metrics.groupCenterDelta), `Hygiene CTA group centering at ${width}px`).toBeLessThanOrEqual(1)
    }
  })

  test('lets mobile marketing cards size to content and keeps Hero cards full width', async ({ page }) => {
    const cardSelectors = [
      '[data-dr-helio-card="service"]',
      '[data-dr-helio-card="why-choose"]',
      '[data-dr-helio-card="life-stage"]',
      '[data-dr-helio-card="hygiene-benefit"]',
      '[data-dr-helio-card="treatment"]',
    ]

    for (const width of [390, 430, 480, 600, 767]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const heroWidths = await page
        .locator('[data-dr-helio-card="service"]')
        .evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().width))
      for (const cardWidth of heroWidths) {
        expect(cardWidth, `Hero service card width at ${width}px`).toBeCloseTo(width - 60, 0)
      }

      for (const selector of cardSelectors) {
        const bottomGaps = await page.locator(selector).evaluateAll((cards) =>
          cards.map((card) => {
            const paragraphs = card.querySelectorAll('p')
            const paragraph = paragraphs[paragraphs.length - 1]
            if (!(paragraph instanceof HTMLParagraphElement)) {
              throw new Error(`Card paragraph is unavailable for ${card.getAttribute('data-dr-helio-card')}`)
            }

            const cardRect = card.getBoundingClientRect()
            const paragraphRect = paragraph.getBoundingClientRect()
            return cardRect.bottom - paragraphRect.bottom
          })
        )

        for (const gap of bottomGaps) {
          expect(gap, `${selector} bottom content spacing at ${width}px`).toBeGreaterThanOrEqual(19)
          const maximumGap = selector.includes('treatment') && width === 390 ? 33 : 26
          expect(gap, `${selector} bottom content spacing at ${width}px`).toBeLessThanOrEqual(maximumGap)
        }
      }
    }
  })

  test('keeps overlapping Hero service cards visible above the section boundary', async ({ page }) => {
    for (const width of [768, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const overlap = await page.locator('section[aria-label="Tratamentos em destaque"]').evaluate((section) => {
        const card = section.querySelector('[data-dr-helio-card="service"]')
        if (!(card instanceof HTMLElement)) {
          throw new Error('Hero service card is unavailable')
        }

        const sectionRect = section.getBoundingClientRect()
        const cardRect = card.getBoundingClientRect()
        const overlapHeight = sectionRect.top - cardRect.top
        const sampleX = cardRect.left + cardRect.width / 2
        const sampleY = cardRect.top + overlapHeight / 2
        const hit = document.elementFromPoint(sampleX, sampleY)

        return {
          overlapHeight,
          visibleAboveBoundary: hit?.closest('[data-dr-helio-card="service"]') === card,
        }
      })

      expect(overlap.overlapHeight, `Hero service card overlap at ${width}px`).toBeGreaterThan(0)
      expect(overlap.visibleAboveBoundary, `Hero service card clipping at ${width}px`).toBe(true)
    }
  })

  test('keeps cards equal within each responsive row and contains their content', async ({ page }) => {
    for (const width of [2336, 1440, 1200, 1100, 1046, 1025, 1024, 960, 820, 768, 767, 640, 600, 390, 389, 360, 320]) {
      await page.setViewportSize({ width, height: width <= 430 ? 844 : 1000 })
      await page.goto('/?motion=disabled')

      for (const selector of ['[data-dr-helio-card="service"]', '[data-dr-helio-card="hygiene-benefit"]']) {
        const rows = await page.locator(selector).evaluateAll((elements) => {
          const metrics = elements.map((element) => {
            const rect = element.getBoundingClientRect()
            return {
              top: Math.round(rect.top / 4) * 4,
              height: rect.height,
              clientHeight: element.clientHeight,
              scrollHeight: element.scrollHeight,
            }
          })
          return [...new Set(metrics.map((metric) => metric.top))].map((top) =>
            metrics.filter((metric) => metric.top === top)
          )
        })

        for (const row of rows) {
          const heights = row.map((metric) => metric.height)
          expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1)
          for (const metric of row) {
            expect(metric.scrollHeight - metric.clientHeight).toBeLessThanOrEqual(1)
          }
        }
      }
    }
  })

  test('keeps Why Choose copy visually clear of the card bottom border', async ({ page }) => {
    for (const width of [768, 771, 772, 823, 824, 900, 1024, 1025, 1046, 1089, 1090, 1100, 1200, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/?motion=disabled')

      const bottomGaps = await page.locator('[data-dr-helio-card="why-choose"]').evaluateAll((cards) =>
        cards.map((card) => {
          const paragraph = card.querySelector('p')
          if (!(paragraph instanceof HTMLParagraphElement)) throw new Error('Why Choose paragraph is unavailable')

          const cardRect = card.getBoundingClientRect()
          const paragraphRect = paragraph.getBoundingClientRect()
          return cardRect.bottom - paragraphRect.bottom
        })
      )

      for (const gap of bottomGaps) {
        expect(gap, `Why Choose paragraph bottom spacing at ${width}px`).toBeGreaterThanOrEqual(10)
      }
    }
  })

  test('reveals lateral content after resizing the same document', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/?motion=enabled')
    await page.setViewportSize({ width: 1024, height: 1000 })

    const serviceCards = page.locator('[data-dr-helio-card="service"]')
    await serviceCards.first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(2300)
    await expect(serviceCards).toHaveCount(4)
    for (const card of await serviceCards.all()) {
      await expect(card).toBeVisible()
      await expect(card.locator('..')).toHaveCSS('opacity', '1')
    }

    const accordion = page.locator('[data-dr-helio-faq-accordion]')
    await accordion.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2300)
    await expect(accordion).toBeVisible()
    await expect(accordion.locator('..')).toHaveCSS('opacity', '1')

    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(300)
    await expect(accordion).toBeVisible()
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.waitForTimeout(300)
    await expect(accordion).toBeVisible()
  })
})
