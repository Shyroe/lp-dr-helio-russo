import { createMemoryHistory, createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const shouldUseAuditHistory = typeof window !== 'undefined' && window.__DR_HELIO_INTERACTION_AUDIT__ === true

  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    ...(shouldUseAuditHistory ? { history: createMemoryHistory({ initialEntries: ['/'] }) } : {}),
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
