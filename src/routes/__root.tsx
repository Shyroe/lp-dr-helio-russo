import fraunces700Url from '@fontsource/fraunces/files/fraunces-latin-700-normal.woff2?url'
import montserrat400Url from '@fontsource/montserrat/files/montserrat-latin-400-normal.woff2?url'
import montserrat700Url from '@fontsource/montserrat/files/montserrat-latin-700-normal.woff2?url'
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      {
        name: 'description',
        content:
          'Tratamentos odontológicos modernos, rápidos e sem dor com o Dr. Hélio Russo. Agende sua avaliação e transforme seu sorriso.',
      },
      { name: 'theme-color', content: '#0066af' },
      { property: 'og:title', content: 'Dr. Hélio Russo | Odontologia' },
      {
        property: 'og:description',
        content: 'Recupere sua autoestima com tratamentos odontológicos modernos e atendimento sem dor.',
      },
      { title: 'Dr. Hélio Russo | Odontologia' },
    ],
    links: [
      { rel: 'preload', href: montserrat400Url, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: montserrat700Url, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'preload', href: fraunces700Url, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      {
        rel: 'preload',
        href: '/assets/landing/dr-helio-russo/hero-bg-mobile-lcp.webp',
        as: 'image',
        type: 'image/webp',
        media: '(max-width: 767px)',
        fetchPriority: 'high',
      },
      {
        rel: 'preload',
        href: '/assets/landing/dr-helio-russo/hero-bg-desktop.webp',
        as: 'image',
        type: 'image/webp',
        media: '(min-width: 768px)',
        fetchPriority: 'high',
      },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth motion-reduce:scroll-auto">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
