# Petal landing

A story-led landing page using React, TypeScript, Vite, Tailwind CSS v4, and Shadcnspace with shadcn/ui Base UI primitives.

## Documents and routes

- `/`: The Story, Document 01.
- `/maya-mvp-scope`: Maya MVP Scope, Document 02, including the complete scope text and all three original diagrams.
- `/petal-mvp-scope`: Petal Product Requirements and MVP Scope, Document 03, including its three diagrams.
- `/technical-architecture`: Technical Architecture and Engineering Guidelines, Document 04, including three generated diagrams, tables, and expandable editable Mermaid source.
- `/implementation-roadmap`: Implementation Roadmap, Pilot Plan, and Launch Criteria, Document 05, including three generated diagrams and expandable editable Mermaid source. The website edition omits pilot calendar dates and the dated week-by-week baseline; the workspace planning document retains them.
- `/system-design`: System Design Document, Document 06, including the complete design text, three existing diagrams, and three new diagrams for ownership transitions, correction/deletion, and bounded improvement. Mermaid source blocks have been removed from this document.
- `/self-improving-loop`: Self-Improving Loop: Design and MVP Scope, Document 07, including three generated diagrams at the marked architecture, privacy, and evaluation illustration points. Its Mermaid flow is replaced by an image diagram.

All seven pages share document navigation, a section contents menu, and reading progress. The Maya scope page has a companion botanical cover generated with the built-in ImageGen tool; its prompt is saved in `docs/assets/maya-mvp-cover-prompt.md`. Documents 03–07 reuse this existing image as a temporary fallback cover. Diagrams link to their full-size images for reading on smaller screens. Tables scroll within their container on narrow screens. `vercel.json` provides direct access and refresh support for all document routes on Vercel.

Document 04 illustration prompts are saved in `docs/assets/technical-architecture-diagram-prompts.md`. Documents 03 and 04 import their full Markdown sources; links to Documents 02 and 07 use their page routes.

Document 05 illustration prompts are saved in `docs/assets/implementation-roadmap-diagram-prompts.md`. Its page imports the website edition of its Markdown source. Calendar dates in the workspace original should not be copied into this edition.

Document 06 imports `docs/06-system-design-document.md`. Its new assets and exact built-in ImageGen prompts are saved in `docs/assets/system-design-*.png` and `docs/assets/system-design-diagram-prompts.md`. Linked reviews and diagram specifications are bundled as Markdown downloads. The roadmap links forward to System Design, and cross-document links resolve to the new page.

Document 07 imports `docs/07-self-improving-loop-design-and-mvp-scope.md`. Its three marked figures and exact built-in ImageGen prompts are saved in `docs/assets/self-improving-loop-*.png` and `docs/assets/self-improving-loop-diagram-prompts.md`. System Design links forward to this page. The full source, linked integration review, and historical conversation notes are bundled with the site.

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
