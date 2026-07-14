import { existsSync } from 'node:fs'
import { defineConfig, devices } from '@playwright/test'

const systemChromiumCandidates = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter((candidate): candidate is string => Boolean(candidate))
const systemChromium = systemChromiumCandidates.find((candidate) => existsSync(candidate))

export default defineConfig({
  testDir: './e2e',
  outputDir: '.agent-tmp/playwright/test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: '.agent-tmp/playwright/html-report', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4174',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: systemChromium ? 'off' : 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: systemChromium ? { executablePath: systemChromium } : undefined,
      },
    },
  ],
  webServer: {
    command: 'pnpm run build && pnpm exec vite preview --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
