import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
  },
})
