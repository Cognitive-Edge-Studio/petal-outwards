# Eudora case-study assets

The original dotLottie illustrations come from `C:/shibly/eudora_v2/client/public/lottie/`; seven are used in the case-study sections. Fredoka is the Eudora public landing page's body and display font, as defined by `.font-landing` in that project's `src/app/globals.css`. Its local Latin font and OFL license are included under `fonts/`.

The active hero photo, `src/assets/eudora/teachers-preparing-lessons.png`, was generated with the built-in image generation tool for this case study. It depicts three teachers collaborating on lesson materials in a naturally lit workroom. The generation prompt is saved alongside the image. Importing the photo through Vite ensures it is bundled with a versioned URL in production and supports deployment base paths.

The earlier generated transparent illustration remains under `illustrations/teachers-creating-education.png` with its original prompt, but is no longer used on the page.

The scoped case-study palette follows `eudora-professional-preset.ts`: cool near-white surfaces, dark blue-gray text, and muted indigo actions. Rounded cards and supporting tints follow the public landing sections.

`npm run dev` and `npm run build` synchronize the self-hosted WASM binary from the installed dotLottie React player's matching dependency. The case study loads its animation files and runtime locally, pauses offscreen players, respects reduced motion, and offers a page-wide pause control.
