# Petal landing

A story-led landing page using React, TypeScript, Vite, Tailwind CSS v4, and Shadcnspace with shadcn/ui Base UI primitives.

## Documents and routes

- `/case-study/juriva`: Juriva concept case study for independent lawyers and law firms. Its navy, ivory, and brass identity uses editorial serif headings and an original generated consultation photo. Covers individual and organizational personas, client preparation, relationship continuity, and professional handoff.
- `/case-study/wellora`: Wellora concept case study for doctors and clinics. Its sage, teal, and warm-white identity uses soft shapes and an original generated consultation photo. Covers visit preparation, approved education, private continuity, and care-team follow-up.

Both pages use `src/ProfessionalCaseStudyPage.tsx`, distinct scoped themes in `src/professional-case-studies.css`, and Markdown manuscripts under `docs/case-studies/`. Their photos and exact built-in ImageGen prompts live in `src/assets/juriva/` and `src/assets/wellora/`; Vite bundles the photos into production URLs. Illustrative conversations and handoffs are labeled as concepts.

- `/case-study/buzybuzz`: BuzyBuzz concept case study for busy influencers. Imports `docs/case-studies/buzybuzz.md` and covers audience questions, private relationship continuity, collaboration briefs, creator control, and reviewed improvements. Its original pink/cyan styling is informed by TRIBE's airy layout; no TRIBE branding or media is copied. The generated creator photo and prompt live in `src/assets/buzybuzz/` and are bundled through Vite.

- `/case-study/eudora`: Eudora concept case study, describing education created and curated by actual human teachers, Maya-powered teacher personas, Clio's distinct assistant role, interactive learning, teacher and guardian insights, and the educator review loop. Imports `docs/case-studies/eudora.md`; manuscript metadata and internal discussion questions stay in the source document. Shares the site's navigation, contents, and reading progress.

Case studies are grouped in the shared header dropdown. Add future entries to `src/content/case-studies.ts` and implement their routes in `src/App.tsx`. Eudora uses its original project's self-hosted Fredoka font, cool Eudora Professional palette, rounded cards, a generated realistic teacher photo in the hero, and seven original local dotLottie illustrations across its sections. The hero photo is imported from `src/assets/eudora/` so Vite bundles it with a versioned production URL. Animation players pause offscreen, respect reduced motion, and share a page-wide pause control. Asset provenance is recorded in `public/eudora/README.md`; the matching local player WASM is synchronized before development and production builds.
- `/`: The Story, Document 01.
- `/maya-mvp-scope`: Maya MVP Scope, Document 02, including the complete scope text and all three original diagrams.
- `/petal-mvp-scope`: Petal Product Requirements and MVP Scope, Document 03, including its three diagrams.
- `/technical-architecture`: Technical Architecture and Engineering Guidelines, Document 04, including two generated diagrams, tables, and expandable editable Mermaid source.
- `/implementation-roadmap`: Implementation Roadmap, Pilot Plan, and Launch Criteria, Document 05, including two generated diagrams and expandable editable Mermaid source. The website edition omits pilot calendar dates and the dated week-by-week baseline; the workspace planning document retains them.
- `/system-design`: System Design Document, Document 06, including the complete design text, three existing diagrams, and three new diagrams for ownership transitions, correction/deletion, and bounded improvement. Mermaid source blocks have been removed from this document.
- `/self-improving-loop`: Self-Improving Loop: Design and MVP Scope, Document 07, including three generated diagrams at the marked architecture, privacy, and evaluation illustration points. Its Mermaid flow is replaced by an image diagram.

- `/developer-docs`: Maya Developer Docs, Document 08, for applications integrating Maya. Covers use cases, integration flow, authentication and scope, proposed API operations, request/response contracts, cURL and TypeScript examples, continuity, handoff, and errors. It imports `docs/08-maya-developer-docs.md`, with a searchable section index and responsive code blocks. Endpoint paths and wire schemas are explicitly draft examples pending a finalized OpenAPI contract.

All document pages share navigation, a section contents menu, and reading progress. The Maya scope page has a companion botanical cover generated with the built-in ImageGen tool; its prompt is saved in `docs/assets/maya-mvp-cover-prompt.md`. Documents 04–07 reuse this existing image as a temporary fallback cover; Petal scope uses its own cover. Diagrams link to their full-size images for reading on smaller screens. Tables scroll within their container on narrow screens. `vercel.json` provides direct access and refresh support for all document routes on Vercel.

The website editions consolidate overlapping explanations through links: product boundaries live in the scope pages, technology selections in Architecture, runtime contracts and the shared decision register in System Design, delivery gates in Roadmap, and candidate evaluation/review in Self-Improving Loop. Security invariants, examples, and acceptance checks remain where they support the reader's task. Workspace manuscripts retain their planning history.

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
