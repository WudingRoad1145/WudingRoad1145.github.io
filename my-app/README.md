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

## Visual direction and components

The current draft is a personal, tactile collection inspired by the object navigation on [Chloe Rastatter’s site](https://www.chloerastatter.com/) and [Natalia Chen’s site](https://www.jnatchen.com/), including her [ongoing useless-inventions notebook](https://www.jnatchen.com/not-work). Reference-site artwork and text are not copied.

- `PersonalDesk.tsx`: movable keepsakes link to BabyMilu, Adventures, Wiser, and Big Woman, in their own section after the opening screen. The summit caption reads “It’s Monkay’s 10 yo summit day!” and the Wiser letter reads “something i’m never forgetting.”
- `BeliefOpening.tsx` follows Yan’s handwritten sketch and the original spacious, single-line landing page. The black headline reads “make good humans.” Handwritten notes sit above “make” and below “humans”; “good” reveals a small anonymous-response form on hover, click, or keyboard activation. Only after a successful save does it reveal Yan’s reflection and actual previous visitor replies. See [the conversation contract and pending shared-store setup](docs/good-responses.md).
- `Monkeydokey.tsx`: the mountain photograph tells the story of Yan’s stuffed travel companion, already ten years old when they summited Kilimanjaro. A hand-drawn circle marks him in the original photograph, with a reversible CSS close-up. The photograph is unaltered and retains its original aspect ratio so the annotation stays aligned at every width. The desk and Adventures captions carry the same context.
- `Movable.tsx`: bounded pointer dragging and arrow-key movement, click-vs-drag detection, resize clamping, and keyboard opening.
- `WiserNotes.tsx`: 13 original handwritten keepsakes scattered on the homepage and Wiser page. Tap opens a native dialog with paging; Escape restores focus. An alternate “read one by one” control makes every letter accessible without dragging. The explicit asset list excludes absent `note9.jpg`.
- `BigWomanPlay.tsx`: a personal strength notebook. The title-spacing slider, photograph reverse, and sports choices use Yan’s existing story; they do not represent new products or achievements.
- `MemoryDrawer.tsx` and `data/memories.ts`: draw from the existing adventure memories, with the complete list still available.
- `SiteChrome.tsx`: shared navigation, mobile menu, skip link, and footer.
- `projects/babymilu/CinemaOpening.tsx`: three original v3 marketing clips in a scroll-driven opening, with manual scene selection, pause, offscreen pausing, and reduced-motion stills. Marketing scenes are identified separately from documentary factory photos.

The custom illustrated Milu face and its cursor tracking have been removed. The homepage and film overlays use the original `og-babymilu.png` asset from the BabyMilu marketing library. Film and brand provenance is documented in [the BabyMilu README](src/app/projects/babymilu/README.md).

`globals.css` contains the shared editorial layout and personal collage styles. The BabyMilu story and opening use CSS modules. Reenie Beanie is from the original marketing repository’s font library; it supplies annotation typography, not a recreation of Yan’s handwriting.

## Review checklist

Check the home, Wiser, Big Woman, Adventures, and BabyMilu pages at desktop, 390px, and 320px. Check all route navigation after shared style changes. Exercise pointer dragging without navigation, arrow-key movement, resize bounds, resetting, dialog paging/Escape/focus return, photo reverse, title slider limits, memory drawing, film selection and pause, scroll-driven film progression, and reduced motion. The earlier daily-life scenes, reminder controls, and archive dialog remain available below the film opening.

On the homepage, check the Good form (hover, click/tap, keyboard, submit, error, and Escape) and the Monkeydokey close-up. Confirm the keepsakes follow the full-height opening, their captions fit at 320px, the yellow circle stays over Monkeydokey, and the zoom can be hidden without removing the original photograph.
