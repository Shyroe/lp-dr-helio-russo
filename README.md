# Dr. Hélio Russo — Desafio Técnico Frontend

Desafio técnico frontend voltado ao desenvolvimento de uma landing page odontológica production-grade, com foco em **qualidade visual, responsividade contínua, acessibilidade, performance e engenharia de frontend**.

O projeto combina uma interface de alto nível de acabamento com uma arquitetura moderna em React e TanStack Start, priorizando comportamento responsivo consistente, carregamento eficiente, interações acessíveis e uma base de código testável e preparada para produção.

## Demonstração

- Produção: https://dr-helio-russo.leonardocamargo.dev.br/

## O desafio

A implementação foi conduzida como um problema real de engenharia frontend, com objetivos simultâneos de qualidade visual e técnica:

- implementar nove seções com alto nível de consistência visual;
- manter comportamento consistente de `320px` a `2336px`, incluindo tablet, desktop e ultrawide;
- garantir sobreposições, grids, proporções, crops de imagens, tipografia e espaçamentos corretos em diferentes breakpoints;
- adotar uma stack moderna baseada em React e TanStack Start;
- eliminar Bootstrap, jQuery, Owl Carousel, assets via CDN e downloads externos em runtime;
- servir fontes, imagens e ícones localmente;
- garantir navegação por teclado, semântica adequada e contraste compatível com WCAG AA;
- reduzir custo do carregamento inicial sem comprometer o visual ou a funcionalidade;
- criar testes automatizados capazes de detectar regressões de layout, responsividade e interação.

## Decisões de engenharia

### Renderização e performance

- prerenderização da rota principal com TanStack Start;
- Hero e cards iniciais mantidos na região crítica de renderização;
- hidratação das seções abaixo da dobra adiada até proximidade da viewport;
- preload dos assets responsivos do Hero que participam do LCP;
- imagens locais otimizadas em WebP e entregues de forma responsiva;
- uso controlado de `content-visibility` e dimensões intrínsecas em conteúdo abaixo da dobra;
- entrega estática pelo Cloudflare Workers, sem recriar a infraestrutura existente.

### Arquitetura de interface

- organização por feature em `src/features/dr-helio-russo/`;
- componentes reutilizáveis para cards, CTAs, ícones e elementos visuais;
- Tailwind CSS v4 como camada principal de styling;
- shadcn/ui e Radix UI para primitivas acessíveis;
- Motion usado apenas em efeitos de entrada controlados;
- Embla Carousel para depoimentos responsivos;
- assets e fontes mantidos dentro do próprio projeto.

### Qualidade e regressão

- testes de componentes com Vitest e React Testing Library;
- suíte E2E com Playwright cobrindo smoke, FAQ, Carousel, acessibilidade e responsividade;
- validações específicas para overflow horizontal, grids, tamanho de imagens, CTAs e cards sobrepostos ao Hero;
- auditorias de TypeScript, Biome, bundle e CSS integradas ao workflow de validação;
- matriz responsiva automatizada cobrindo larguras entre `320px` e `2336px`.

## Stack

- TanStack Start e TanStack Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui e Radix UI
- Motion
- Embla Carousel
- Vitest e React Testing Library
- Playwright Test
- Biome
- Cloudflare Workers e Wrangler

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

O workflow público executa os principais gates em Pull Requests e pushes na branch principal.

## Deploy

O projeto utiliza Wrangler para validar e publicar a versão prerenderizada no Cloudflare Workers:

```bash
pnpm run cf:dry-run
pnpm run deploy
```

Credenciais e secrets permanecem fora do repositório e devem ser configurados no Cloudflare ou em um ambiente local autenticado.

## Sobre o projeto

Este é um **desafio técnico frontend independente**. Não é o site oficial do Dr. Hélio Russo e não representa parceria, endosso, contratação ou vínculo comercial.

O código-fonte autoral deste projeto é distribuído sob a [Licença MIT](LICENSE). Nomes, marcas, fotografias, textos, depoimentos, identidade visual e outros materiais de terceiros não são relicenciados pela MIT. Consulte [`NOTICE.md`](NOTICE.md) para os limites de uso e atribuição.

## Escopo do repositório público

Este repositório contém o código necessário para executar, estudar e validar a implementação técnica. Artefatos internos de desenvolvimento, QA, relatórios, prompts e evidências de validação permanecem fora da versão pública.
