# Dr. Hélio Russo — Landing Page

Recriação frontend **pixel-perfect** de uma landing page odontológica, desenvolvida como projeto de portfólio com uma stack React moderna.

> Projeto educacional e de portfólio. Não é o site oficial do Dr. Hélio Russo e não possui vínculo com o profissional ou com o site de referência.

## Stack

- TanStack Start e TanStack Router
- React 19 e TypeScript
- Tailwind CSS v4, com abordagem Tailwind-first
- shadcn/ui e Radix UI
- Motion (`motion/react-mini`) para entrance animations
- Embla Carousel
- Biome
- Playwright e ImageMagick para auditorias visuais

## Principais características

- nove seções responsivas;
- recriação visual validada em desktop, tablet e mobile;
- animações de entrada equivalentes à referência;
- Carousel de depoimentos e FAQ interativa;
- suporte a `prefers-reduced-motion`;
- acessibilidade e navegação por teclado;
- assets locais;
- SSR compatível com TanStack Start;
- estrutura preparada para publicação como Cloudflare Workers Static Assets.

## Resultados visuais

O gate do projeto considera aprovado o RMSE normalizado abaixo de 15%.

| Viewport | RMSE da página completa |
|---|---:|
| Desktop | 8,22% |
| Tablet | 11,18% |
| Mobile | 11,76% |

Todas as nove seções foram aprovadas individualmente.

## Instalação

```bash
npm install
npm run assets:bootstrap
npm run dev
```

Abra `http://127.0.0.1:3000`.

Os assets PNG são baixados da página pública de referência e validados por SHA-256. No GitHub, esse processo também é executado automaticamente pelo workflow `Bootstrap public assets`.

## Comandos

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

As auditorias de RMSE completas dependem das screenshots de referência aprovadas, mantidas fora do repositório público para evitar versionar dezenas de megabytes de artefatos visuais.

## Estrutura

```text
src/
├── components/ui/                 # componentes shadcn/ui locais
├── features/dr-helio-russo/
│   ├── animations/                # infraestrutura Motion
│   ├── components/
│   ├── sections/                  # nove seções da landing page
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

## Política de estilização

O projeto segue **Tailwind-first**:

- estilos dos componentes ficam em classes utilitárias no JSX;
- `src/styles.css` é reservado para infraestrutura global;
- `src/theme.css` contém tokens compartilhados;
- inline styles são permitidos apenas para valores calculados em runtime;
- `npm run audit:css` protege essas regras.

## Licença e referência

O código desta recriação foi escrito para estudo e portfólio. Imagens e identidade visual pertencem aos respectivos titulares e são utilizadas somente como material de demonstração do trabalho de frontend.
