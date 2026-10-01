# Petal landing

A story-led landing page using React, TypeScript, Vite, Tailwind CSS v4, and Shadcnspace with shadcn/ui Base UI primitives.

## Documents and routes

- `/`: The Story, Document 01.
- `/maya-mvp-scope`: Maya MVP Scope, Document 02, including the complete scope text and all three original diagrams.

Both pages share document navigation, a section contents menu, and reading progress. The Maya scope page has a companion botanical cover generated with the built-in ImageGen tool; its prompt is saved in `docs/assets/maya-mvp-cover-prompt.md`. Diagrams link to their full-size images for reading on smaller screens. `vercel.json` provides direct access and refresh support for the new route on Vercel.

## Story content

The page imports `docs/01-the-story.md` directly. All story headings and paragraphs remain verbatim and in source order; only the Author's preface is excluded. The cover and three story illustrations are imported from `docs/assets/` with their original alt text. All required content is included in this repository; the production `dist/` output is self-contained.

The opening hero introduces Maya, followed by ten chapters with varied layouts, a conversation timeline, scroll reveals, and a contents menu. Motion respects the system's reduced-motion preference. All content is rendered immediately; scrolling controls its visual reveal without fetching or truncating the story.

## Development

Requires Node.js 22.12+ (Node.js 24 recommended) and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL (normally http://localhost:5173).

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

The build checks TypeScript and writes the production bundle to `dist/`.

An independent content checker compares text and image descriptions extracted from the browser with the original Markdown:

```sh
node scripts/verify-story.mjs output/playwright/rendered-story.json
```

The browser evidence JSON contains `blocks` (nonempty text from `[data-story-copy]`), `images` (`alt` and absolute `src` from `[data-story-image]`), `hasPreface`, `horizontalOverflow`, and `viewport`. Local screenshots and browser evidence live in the ignored `output/playwright/` directory. The current page was checked at desktop and mobile widths.

For Document 02, `node scripts/verify-scope.mjs output/playwright/rendered-scope.json` checks all headings, paragraphs, captions, list items, and diagrams against the Markdown. Its browser evidence uses `[data-scope-copy]`, `[data-scope-image]`, `horizontalOverflow`, `sectionCount`, and `viewport`.

## Add components

The free Shadcnspace registry is configured in `components.json`:

```sh
npx shadcn@latest add @shadcn-space/button-06
npx shadcn@latest add @shadcn-space/hero-01
```

Standard shadcn/ui components are also available:

```sh
npx shadcn@latest add card
```

Shadcnspace distributes editable source files rather than an npm UI package. The hero uses its animated-border button, adapted to accept normal button props and children.

- `src/App.tsx`: page layout, chapters, and contents navigation
- `src/content/story.ts`: document sections and illustration URLs
- `src/components/story/StoryContent.tsx`: Markdown rendering
- `src/hooks/use-story-motion.ts`: progressive reveals and reading progress
- `src/story.css`: landing-page design and responsive layouts
- `src/index.css`: Tailwind imports and shadcn theme tokens
- `src/components/shadcn-space/`: Shadcnspace components
- `src/components/ui/`: shadcn/ui primitives
- `src/lib/utils.ts`: class-name helper
- `components.json`: CLI configuration and registry

Imports using `@/` resolve to `src/` in both TypeScript and Vite. Dependencies are locked in `package-lock.json`; use `npm ci` for reproducible installs.

[Shadcnspace CLI documentation](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli)
