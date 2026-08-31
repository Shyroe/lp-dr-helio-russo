# Landing Page — Dr. Hélio Russo

Landing page odontológica responsiva construída como projeto de portfólio e estudo de reconstrução frontend pixel-perfect, com foco em fidelidade visual, componentização, acessibilidade e entrega em produção.

> Este é um projeto independente de portfólio. Não é o site oficial do Dr. Hélio Russo e não representa parceria, endosso ou vínculo comercial.

## Demonstração

- Produção: https://dr-helio-russo.leonardocamargo.dev.br/

## Stack

- TanStack Start e TanStack Router
- React 19 e TypeScript
- Tailwind CSS v4
- shadcn/ui e Radix UI
- Motion
- Embla Carousel
- Vitest e React Testing Library
- Playwright Test
- Biome
- Cloudflare Workers

## Destaques técnicos

- nove seções responsivas para desktop, tablet e mobile;
- componentes reutilizáveis e arquitetura orientada por features;
- Carousel de depoimentos com Embla;
- FAQ acessível com Radix Accordion;
- testes de componente para Accordion, Carousel e depoimentos;
- testes E2E de smoke, responsividade, acessibilidade e interações;
- assets, fontes e ícones servidos localmente;
- navegação por teclado e suporte a `prefers-reduced-motion`;
- política Tailwind-first protegida por auditoria automatizada;
- orçamento de bundle validado no CI;
- prerenderização estática com entrega via Cloudflare Workers.

## Estrutura

```text
src/
├── components/ui/
├── features/dr-helio-russo/
│   ├── animations/
│   ├── components/
│   ├── generated/
│   └── sections/
├── routes/
├── router.tsx
├── styles.css
└── theme.css

test/
e2e/
public/assets/landing/dr-helio-russo/
scripts/audits/build/
```

## Executar localmente

Requisitos:

- Node.js 24+
- pnpm 11+

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run dev
```

A aplicação ficará disponível em `http://127.0.0.1:3000`.

## Validação

```bash
pnpm run typecheck
pnpm run test:run
pnpm run test:e2e
pnpm run check:biome
pnpm run build
pnpm run audit:css
pnpm run audit:bundle
```

O workflow público executa esses gates em Pull Requests e pushes na branch principal.

## Deploy

O projeto utiliza o plugin oficial do Cloudflare para Vite e Wrangler:

```bash
pnpm run cf:dry-run
pnpm run deploy
```

Credenciais e secrets devem permanecer fora do repositório e ser configurados no Cloudflare ou no ambiente local autenticado.

## Licença e materiais de terceiros

O código-fonte autoral deste projeto é distribuído sob a [Licença MIT](LICENSE).

Nomes, marcas, fotografias, textos, depoimentos, identidade visual e outros materiais derivados da página de referência não são relicenciados pela MIT. Consulte [`NOTICE.md`](NOTICE.md) para os limites de uso e atribuição.

## Escopo deste repositório

Este repositório contém somente o código, os testes de componente/E2E e os assets necessários para executar e validar a landing page pública. Referências visuais, crops, relatórios internos, prompts e artefatos do laboratório de reconstrução não fazem parte desta versão.
