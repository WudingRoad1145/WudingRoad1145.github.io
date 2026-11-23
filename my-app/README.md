# Yán Fēng’s portfolio

Next.js 14 / React 18 / TypeScript. Use Node.js 20 or newer.

## Local review

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3012
```

Open http://127.0.0.1:3012/. All project and personal pages are available through the shared navigation. No BabyMilu service credentials are required.

Before validating a production build, stop the development server: both use `.next`.

```sh
npx tsc --noEmit --incremental false
npm run build
```

The existing Vercel integration handles deployment after a merge to the production branch. A local preview or build does not update production.

## Visual system

The editorial direction draws on [ShaoBo’s portfolio](https://portfolio.shaobo.co/) for typographic restraint and [bo.haus](https://www.bo.haus/) for an object-led, lightly tactile presentation. All images and project content are from this portfolio’s own archive; no reference-site assets are copied.

- `src/app/globals.css`: shared typography, spacing, responsive layouts, focus states, and reduced-motion behavior.
- `src/components/SiteChrome.tsx`: shared navigation, mobile menu, skip link, and footer.
- `src/data/projects.ts`: project index and homepage captions.
- `src/components/MiluBuddy.tsx`: shared interactive companion. Tap or use the keyboard to change expression; pointer tracking respects reduced motion.
- `src/components/WiserNotes.tsx`: native-dialog keepsake viewer. The explicit asset list excludes `note9.jpg`, which is absent from the archive. Escape closes and restores focus.
- `src/app/projects/babymilu/`: the longer BabyMilu story, scenes, artifact archive, and [asset provenance](src/app/projects/babymilu/README.md).

The homepage uses ordinary document scrolling. Project cards lead to their local case studies. Existing essay prose remains in each route; sparse stories are presented honestly without invented project details.

## Review checklist

Check all 14 routes at desktop and phone widths. Exercise the mobile menu, name pronunciation, Milu expression, Wiser keepsake viewer, wallet gallery, BabyMilu scene controls, reminder choices, and archive dialog. Check reduced motion and keyboard focus. Scroll through lazy-loaded imagery before checking for broken assets or capturing full-page screenshots.
