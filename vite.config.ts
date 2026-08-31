import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const modulePreloadLinkPattern = /<link\b(?=[^>]*\brel=(?:"modulepreload"|'modulepreload'))[^>]*>\s*/gi
const hydrationScriptPattern = /<script type="module" async="" src="([^"]+)"><\/script>/

async function optimizeStaticDocument({ page, html }: { page: { path: string }; html: string }) {
  if (page.path !== '/') return

  const hydrationSource = html.match(hydrationScriptPattern)?.[1]
  if (!hydrationSource) {
    throw new Error('Could not locate the prerender hydration entry for /.')
  }

  const optimizedHtml = html
    .replace(modulePreloadLinkPattern, '')
    .replace(hydrationScriptPattern, `<script type="module" fetchpriority="low" src="${hydrationSource}"></script>`)

  await writeFile(path.resolve('dist/client/index.html'), optimizedHtml, 'utf8')
}

export default defineConfig({
  build: {
    target: 'baseline-widely-available',
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      pages: [{ path: '/' }],
      prerender: {
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: false,
        concurrency: 1,
        crawlLinks: false,
        enabled: true,
        failOnError: true,
        onSuccess: optimizeStaticDocument,
      },
      server: {
        build: {
          inlineCss: true,
        },
      },
    }),
    viteReact(),
  ],
})
