# Dr. Hélio Russo — Landing Page

Landing page odontológica responsiva desenvolvida como projeto de portfólio com uma stack frontend moderna, foco em fidelidade visual, acessibilidade, desempenho e qualidade de implementação.

## Stack

- TanStack Start e TanStack Router
- React 19 e TypeScript
- Tailwind CSS v4 com abordagem Tailwind-first
- shadcn/ui e Radix UI
- Motion (`motion/react-mini`)
- Embla Carousel
- Biome
- Playwright e ImageMagick para auditorias visuais

## Recursos

- nove seções responsivas;
- layouts específicos para desktop, tablet e mobile;
- entrance animations com suporte a `prefers-reduced-motion`;
- Carousel de depoimentos;
- FAQ interativa;
- navegação por teclado e melhorias de acessibilidade;
- assets locais;
- SSR com TanStack Start;
- estrutura preparada para Cloudflare Workers Static Assets;
- validações automatizadas de CSS, bundle, interações e renderização visual.

## Qualidade visual

O projeto utiliza um gate de RMSE normalizado abaixo de 15%.

| Viewport | RMSE da página completa |
|---|---:|
| Desktop | 8,22% |
| Tablet | 11,18% |
| Mobile | 11,76% |

Todas as nove seções foram aprovadas individualmente.

## Instalação

```bash
npm install
npm run dev
```

A aplicação ficará disponível em:

```text
http://127.0.0.1:3000
```

## Comandos principais

```bash
npm run dev
npm run build
npm run validate
npm run audit:css
npm run audit:bundle
npm run audit:motion
npm run audit:interaction
npm run audit:a11y
```

## Estrutura

```text
src/
├── components/ui/
├── features/dr-helio-russo/
│   ├── animations/
│   ├── components/
│   ├── sections/
│   ├── DrHelioRussoPage.tsx
│   ├── assets.ts
│   └── data.ts
├── routes/
├── styles.css
└── theme.css

public/assets/landing/dr-helio-russo/
scripts/
docs/
```

## Estilização

O projeto segue uma política **Tailwind-first**:

- estilos dos componentes ficam em classes utilitárias no JSX;
- `src/styles.css` é reservado para infraestrutura global;
- `src/theme.css` contém tokens compartilhados;
- inline styles são permitidos apenas para valores calculados em runtime;
- `npm run audit:css` protege essas regras.

## Deploy

O projeto está preparado para publicação estática no Cloudflare Workers Static Assets.
