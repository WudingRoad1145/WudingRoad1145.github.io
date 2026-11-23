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

- `PersonalDesk.tsx`: Yan’s introduction sits centrally, with movable keepsakes around it and an invitation to click and play. On narrower screens the introduction comes first and the objects follow below. Captions link to BabyMilu, the ongoing MuJoCo/SO101 robotics notebook, Wiser, and Big Woman. The introduction starts with prototyping and links Interact and SPC to their supplied sites, and Koret, TC Fitness, and Aquatic Park to maps. The IRONMAN 70.3 milestone reflects Yan’s first finish. Her supplied race photo is a transparent cutout paired with the BIG WOMAN tag, star, and handwritten caption; it shakes three times on its first appearance, then stays still without replaying on hover, focus, or scrolling back; see [the edit prompt and asset provenance](public/images/triathlon-cutout.md). The play prompt hints at the hidden invitation, and the robotics caption includes what the arm cannot do. The desktop desk grows with the introduction to avoid overlapping reset controls.
- `DeskInvitation.tsx`: move BIG WOMAN at least 64px (pointer or arrow keys) to uncover a blue invitation beneath it. Click the note to choose an activity and open a prefilled email. Nothing sends automatically. Escape/backdrop/close dismisses the native dialog and restores focus; resetting the desk hides the note again. This optional callback leaves other draggable objects unchanged.
- `projects/robotics`: an ongoing notebook using authentic simulation and workbench images, with bounded findings and credits documented in [the artifact README](public/robotics/README.md).
- `RoborockRescue.tsx`: a full-screen repair-diary section follows the introduction. A small, monochrome, 15 fps timelapse has four seekable doodle notes and a link to Big Woman. The MP4 loads only nearby, pauses offscreen/in a hidden tab, and requires manual play for reduced-motion/data-saver visitors. Source, encoding, file size, and caption limits are documented in [the media README](public/roborock/README.md).
- `BeliefOpening.tsx` follows Yan’s handwritten sketch and the original spacious, single-line landing page. The black headline reads “make good humans.” Handwritten notes sit above “make” and below “humans”; “good” reveals a small anonymous-response form on hover, click, or keyboard activation. If the opening is scrolled past without discovery, the same question appears once per tab session beneath “good” in the opening, without following the viewport, stealing focus, or scrolling back. Only after a successful save does it reveal Yan’s reflection and actual previous visitor replies. See [the conversation contract and pending shared-store setup](docs/good-responses.md).
- `Monkay.tsx`: the mountain photograph tells the story of Yan’s stuffed travel companion, already ten years old when they summited Kilimanjaro. A hand-drawn circle marks him in the original photograph, with an always-visible CSS close-up. The photograph is unaltered and retains its original aspect ratio so the annotation stays aligned at every width. The main copy celebrates courage and a beginner’s mind under “Always day one”, linking to the quiet Courage journal; Monkay’s age and 定心石 note sit in the photograph caption
- `HumansILove.tsx`: a dedicated homepage gratitude section with Yan’s thank-you to Mum and Dad and a prominent link to the Humans page. The homepage project grid and Wiser letter spread are removed; project subpages remain accessible.
- `Movable.tsx`: bounded pointer dragging and arrow-key movement, click-vs-drag detection, resize clamping, and keyboard opening. On the homepage, focused or dragged keepsakes rise above the introduction; the shared desk wrapper contains their stacking order.
- `WiserNotes.tsx`: 13 original handwritten keepsakes scattered on the Wiser subpage, reached from the green letter in the homepage desk. Tap opens a native dialog with paging; Escape restores focus. An alternate “read one by one” control makes every letter accessible without dragging. The explicit asset list excludes absent `note9.jpg`.
- `BigWomanPlay.tsx`: a personal strength notebook. The title-size slider grows BIG WOMAN to almost the full viewport width using measured typography, with a stable slider position. The Duke photograph flips, with “there’s a story on the back” inviting visitors to discover the personal note on its reverse. A short appreciation leads directly into the body/strength essay alongside the photo. The subsequent Girls fixing it all section connects early BabyMilu supporters to Yan’s repair videos; it includes the real Roborock clip (manual play, no preload, offscreen/hidden-tab pause) and an explicit placeholder for her forthcoming Discord screenshot. The other repair subjects are invitations to learn, not fabricated completed tutorials. No TikTok account URL or supporter quote is invented.
- `adventures/page.tsx` and `data/memories.ts`: “on courage” is a plain HTML-style note with a small sans-serif heading, compact black bullet points, and casually worded personal memories in a fixed, mixed order — no random draw, hidden list, decorative cards, or repeated Monkay photograph
- `data/projects.ts`: selected work excludes rabbit r1; Porton Wallet is listed as a quiet text link under Archive on the project index. Existing direct project URLs remain available.
- `projects/miscellaneous`: a native gallery of 11 original artworks, with title, year, medium, documented stories, alternate views and an accessible zoom viewer — see [art provenance and interactions](public/art/README.md)
- `ProjectCard.tsx`: the four selected projects use individual hover/focus invitations: “wanna collab?”, “greet milu”, “a formative story”, and “let’s brainstorm”
- `SiteChrome.tsx`: shared navigation, mobile menu, skip link, and footer.
- `projects/babymilu/CinemaOpening.tsx`: three original v3 marketing clips in a scroll-driven opening, with manual scene selection, pause, offscreen pausing, and reduced-motion stills. Marketing scenes are identified separately from documentary factory photos.

The custom illustrated Milu face and its cursor tracking have been removed. The homepage and film overlays use the original `og-babymilu.png` asset from the BabyMilu marketing library. Film and brand provenance is documented in [the BabyMilu README](src/app/projects/babymilu/README.md).

`globals.css` contains the shared editorial layout and personal collage styles. The BabyMilu story and opening use CSS modules. Reenie Beanie is from the original marketing repository’s font library; it supplies annotation typography, not a recreation of Yan’s handwriting.

## Review checklist

Check the home, Wiser, Big Woman, Adventures, and BabyMilu pages at desktop, 390px, and 320px. Check all route navigation after shared style changes. Exercise pointer dragging without navigation, arrow-key movement, resize bounds, resetting, dialog paging/Escape/focus return, photo reverse, title slider limits and viewport-width fit, the plain Courage memory list, film selection and pause, scroll-driven film progression, and reduced motion. The earlier daily-life scenes, reminder controls, and archive dialog remain available below the film opening.

On the homepage, check the Good form (hover, click/tap, keyboard, submit, error, and Escape) and the Monkay close-up. Confirm the keepsakes follow the full-height opening, their captions fit at 320px, the yellow circle stays over Monkay, and the close-up is always visible without a zoom control.

## Copy preference

Keep the family-name-first display name Yán Fēng, with the homepage explanation that readers may know her as Feng Yan in English
Decorative heart glyphs are removed from UI and authored captions across the site; original photographed artifacts remain intact

Yan prefers no periods in authored visible prose. Sentence-ending dots and ellipses have been removed from page copy, captions, UI messages, and metadata, including project pages. Keep functional punctuation in URLs, email addresses, file names, code, and numbers. Original photographs/handwritten artifacts and visitor-submitted responses retain their original content.

For the rescue section, check lazy loading, automatic offscreen pause, manual play/pause/restart, chapter seeking, reduced-motion and data-saver stills, and the Big Woman link. Check that keepsakes initially avoid the introduction, then remain visible and draggable above it when moved into the center. Uncovered intro links remain clickable.

## Personal introduction

The introduction lives on the homepage at `/#my-world`. There is no separate About page or About navigation item. Old `/about` URLs redirect permanently to the homepage introduction via `next.config.mjs`.
