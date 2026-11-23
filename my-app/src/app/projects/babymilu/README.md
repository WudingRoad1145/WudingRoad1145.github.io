# BabyMilu portfolio preview

Route: `/projects/babymilu`. This is a portfolio mockup for local review, built on November 22, 2026. The page combines a first-person project narrative, selected archival photographs, and interactive illustrations of the product idea.

## Local preview

From the repository root, using Node.js 20:

```sh
cd my-app
npm ci
npm run dev -- --port 3012
```

Open `http://localhost:3012/projects/babymilu`. The page uses local assets and does not require BabyMilu service credentials.

For validation:

```sh
npx tsc --noEmit --incremental false
npm run build
```

Stop the development server before building: both commands use the same `.next` output directory. A successful local build is not a deployment.

## Asset provenance

Selected web assets live in `public/babymilu/`. Images were resized and encoded as WebP for the preview. Original image content is preserved; composition, cropping, and layering are performed by the page layout.

| Preview assets | Original source | Interpretation |
| --- | --- | --- |
| `logo.svg`, `sneakers-pro-medium.ttf` | BabyMilu website wordmark and Sneakers Pro Medium font | Existing brand assets. |
| `hero.webp` | Website `companion-plushies.webp` | Studio photograph of two plush designs; shoot date is unrecorded. |
| `plush-body.webp`, `day-plush-body.webp` | Archived marketing site `v3/No_Face.png` | Original transparent white/gray plush body with an open face aperture. Used in the daily-life sequence with original character artwork. The former custom illustrated hero face has been removed. |
| `day-morning.webp`, `day-night.webp` | Website `morning-alarm.webp`, `late-night-companion.webp` | Staged use-case photographs. These illustrate early explorations, rather than documenting participant tests. |
| `day-outside.webp` | Website `companion-bag.webp` | Product photograph of the plush with a backpack. |
| `day-face-morning.webp`, `day-face-morning-still.webp` | Website character library `gojo.webp` | Original smiling character animation and its first frame. |
| `day-face-day.webp`, `day-face-day-still.webp` | Archived site `v3/faces/character-5-sylus.webp` | Original speaking character animation and its first frame. |
| `day-face-night-still.webp` | Website character library `xavier.gif` | First frame of the original character animation. |
| `face-smile.webp`, `face-heart.webp` | Website `normal-5-dragged.png`, `heart-start-f01.png` | Original expression artwork retained in the asset collection. |
| `prototype.webp` | Archival `IMG_5385 4.HEIC` | Improvised screen-and-plush prototype; EXIF date July 24, 2025. The GoPro and interview context comes from the creator's recollection. |
| `sketch.webp` | Archival `IMG_5453 4.HEIC` | Dimensioned concept sketch; EXIF date July 27, 2025. |
| `core.webp` | Archival `IMG_6828.jpeg` | Orange plush and separate printed electronic enclosure; EXIF date September 18, 2025. |
| `hanger-sketch.webp`, `hanger-test.webp` | April mounting-trial photographs, `IMG_5156` and `IMG_5158` | April 28, 2026 is the associated discussion date, not a verified photo capture time. These show iteration, not formal durability validation. |
| `factory-people.webp` | Archival `IMG_4718.HEIC` | EXIF April 16, 2026, at 15:57:20 +08:00. A later factory-visit photograph; it does not document the February stay described in the narrative. |
| `factory-batch.webp` | `7279_raw.MP4`, frame at 6.135 seconds | Rows of assembled units. Video creation metadata is June 22, 2026 UTC and may represent export time. The image does not establish an exact batch quantity. |
| `boxes.webp` | Archival `7282.JPG` | Pallet of packaged units. June 21, 2026 is the file modification date; capture date is unavailable. |
| `box.webp` | Archival `IMG_6513.jpeg` | EXIF June 28, 2026. The visible label is BM-DVT-001; this has not been identified as the exact first-box moment recalled in the story. |
| `alarm-app.webp` | Alarm-add screen exported from the BabyMilu Figma app design | App design credit: Tammy Chen. |

The provenance table records source filenames and evidence qualifications. Detailed research notes and source messages remain part of the private research workflow.

## Interaction direction

The original animated BabyMilu homepage is preserved in marketing-site history at commit `78234eb4a2c74b04bec82d39aec507a95c5fef64` (April 27, 2026). It used full-screen scroll snapping, a fixed plush overlay, changing character faces, sticky background video, and an outfit carousel. The homepage was replaced by the later collage design on April 29.

This portfolio adapts the persistent plush and changing expressions into a natural-scroll reading sequence. The stage caption, **Early use-case explorations**, distinguishes the visual scenarios from documented product outcomes. Morning, daytime, and evening have direct button controls; desktop scrolling follows the paragraph being read. Arrow keys, Home, and End operate the controls. On mobile, the controls select one scene and its associated paragraph.

With reduced motion enabled, the daily-life scene loads static first frames, removes crossfades, and navigates without smooth scrolling. The evening face is static for all visitors. The custom illustrated hero face has been removed; the opening now uses the original marketing film and original plush artwork.

Original franchise-character artwork appears as part of the historical BabyMilu marketing asset library. The portfolio's authorship claims concern product, interaction, hardware, and system design.

## Design system reference

The published [BabyMilu Design System](https://www.figma.com/design/ZRg0xeGk0mnDXyi4F40V5n/Design-System?node-id=1-7), including [Color System, node 8011:1058](https://www.figma.com/design/ZRg0xeGk0mnDXyi4F40V5n/Design-System?node-id=8011-1058), was inspected in Figma. Its indigo, slate, cream, white and pale lavender surfaces guide the delivery interaction. The exact inspected `container/default` token is `#FFFFFF`.

Exact implementation values come from the app's `constants/Colors.ts` and bundled fonts: primary `#555992`, input text `#5C5D72`, cream `#FFF1E1`, Poltawski Nowy and Open Sans. Figma's structured API was quota-limited, so these are not represented as an exported token set. The portfolio's editorial shell retains the older web wordmark, Sneakers Pro lettering, and pink `#DA659D`.

The daily-life stage offers a Pause/Play control for repeating faces. Reduced-motion preferences always select still frames and omit animation controls. The archive dialog supports Escape and restores focus to the opening artifact.

## V3 film opening and original artwork

The November 23 revision removes the custom illustrated Milu face entirely. The opening now adapts the historical section-based film sequence from `Good-Humans-Inc/babymilu-marketing-website`, pinned to February 27, 2026 commit `3dbc38dd3056`. The source files inspected were `src/routes/index.tsx`, `src/components/types/types.ts`, and the `public/v3/` tree. `dev-v3` was also inspected, but the February main revision is the media source for this adaptation.

| Local asset | Original source | Use |
| --- | --- | --- |
| `cinema/landing.mp4` | `public/v3/videos/00_1.mp4` at `3dbc38dd3056` | Original lavender title film, including its original animated character. |
| `cinema/train.mp4` | `public/v3/videos/02.mp4` at the same revision | Original moving train-window background. |
| `cinema/garden.mp4` | `public/v3/videos/03.mp4` at the same revision | Original garden background. |
| `cinema/*.jpg` | One-second frames extracted from the corresponding clips | Posters and reduced-motion stills. |
| `original-plush.png` | Existing marketing library `plushie/og-babymilu.png` | Unmodified original character/plush artwork, used on the homepage and in the train/garden scenes. |
| `/personal/ReenieBeanie.ttf` | Marketing repo `public/fonts/ReenieBeanie-Regular.ttf` | Existing annotation font. |

The [requested Website v3 canvas](https://www.figma.com/design/zpqkQTMVaesnnxu3RD8pKc/Website?node-id=764-532) was inspected in the browser, including the landing, bag charm, character switch, speaking scenes, outfit, and preorder frames. The Figma connector remained quota-limited; this is a source-based portfolio adaptation, not a claimed pixel-exact Figma export.

The three scenes are tied to ordinary document scrolling, with direct scene buttons and a skip-to-story link. Only the selected video plays, films pause offscreen, and the pause preference persists across scenes. Reduced motion renders still images and disables animated scrolling. Films are silent; no soundtrack starts automatically. The train and garden scenes illustrate the historical product invitation and are not documentary footage or claimed user research.

The original daily-life sequence and documentary chapters remain. The factory chapter uses a darker background as a visual transition into the making process. Existing dates, evidence qualifications, and Tammy Chen’s app-design credit are preserved.

## Team and supporter credits

The footer lists Lanruo Xie first as Cofounder & CEO, then Yán Fēng as Cofounder & CTO, Tammy Chen for App design, Jackson Xie for Engineering, and Blossom Okonkwo for Marketing
The supporter thank-you names Gopal, Evan, Lizz, Joy, Miffy, Jiayue, Aaron, Anwei, Charlotte, David, and Elaina as supplied by Yan
The display name follows the homepage’s family-name-first order consistently

## Opening name story

The opening introduces “Milu — To see, to wonder”, followed by the question of how AI could understand everyday consumers and help in everyday life. It describes an echo between Japanese *miru* (to see) and Latin *mirari* (to wonder at), not a claim that Milu literally means “to see” in both languages. References: [Japanese dictionary](https://www.romajidesu.com/dictionary/meaning-of-%E8%A6%8B%E3%82%8B.html) and [Lewis & Short via Logeion](https://logeion.org/miror).

The opening stacks below 900px and uses content-sized rows so the longer introduction and controls remain accessible. Compact desktop spacing applies to short viewports.
