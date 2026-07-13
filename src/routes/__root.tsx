import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '../styles.css?url'

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
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
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
