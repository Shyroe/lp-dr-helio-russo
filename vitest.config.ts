import { defineConfig } from 'vitest/config'

const sharedTestConfig = {
  clearMocks: true,
  restoreMocks: true,
  unstubGlobals: true,
} as const

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: [
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          ...sharedTestConfig,
          name: 'components',
          environment: 'jsdom',
          setupFiles: ['./test/setup.ts'],
          include: ['src/**/*.test.{ts,tsx}'],
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          ...sharedTestConfig,
          name: 'infrastructure',
          environment: 'node',
          include: ['scripts/**/*.test.{ts,mts,mjs}'],
        },
      },
    ],
  },
})
