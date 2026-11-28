# Bridge 桥

The project route is `/projects/bridge`, linked from the selected projects on `/projects`.

## Content and provenance

- Yan supplied the project draft and confirmed that Bridge began in 2016, during freshman year of high school. The team of five, leadership role, research, booklet, regular community teaching and China Thinks Big gold award come from that draft.
- [Bridge！重阳公益课堂纪实](https://mp.weixin.qq.com/s/5GyBmu4ArQn-YwPtDRxLHQ), published November 4, 2017, supplies the original community photographs, slide overview, preparation quote, venue, nearly 20 participants, two-hour session and quiz details. These are dated 2017, separately from the project's start.
- [你尝试过没有智能手机生活吗？](https://mp.weixin.qq.com/s/kOxKaHi2H6DOwKKgeZRNFQ), published December 3, 2017, is linked as the original project film.
- [Yan's speech](https://www.youtube.com/watch?v=a7z85YHBB2U) is dated November 14, 2020 in its YouTube metadata and identified as 中国少年说, CCTV 少儿. The speech is a later appearance, not a 2016 recording.

`public/bridge/sources.json` records the source image URLs and dimensions. The eight article images were converted to WebP without invented or AI-generated content. Five appear in the page. `at-the-laptop.webp`, `team-outside.webp`, and `teaching-team.webp` remain in the archive but are not displayed. Yan clarified that the person in the laptop portrait is not her. The slide overview is explicitly labelled as teaching slides, not booklet pages. Original booklet scans have not been supplied.

`speech-thumbnail.jpg` is the video's thumbnail from `https://i.ytimg.com/vi/a7z85YHBB2U/hqdefault.jpg`. `cover.svg` is a contemporary project-card illustration, not an archival artifact.

## Interaction and validation

Photographs open in a native modal dialog with a close button, Escape dismissal and focus restoration. The speech loads its YouTube privacy-enhanced iframe only after a click; an ordinary YouTube link remains available. Actual playback depends on YouTube availability and embedding policy.

Validated with TypeScript and desktop/mobile browser checks: 1314px, 390px and 320px layouts, no horizontal overflow, local image loading, photo enlargement and Escape/focus behavior, Work-card navigation, and click-to-load speech iframe. Regular prose and handwritten captions use sentence punctuation; headings omit sentence-ending periods. The homepage Bridge sticker uses Yan’s supplied circular black-and-white logo, `public/bridge/logo.jpg`, and links into this project. Home-origin return links restore the introduction’s saved position.

## November 2026 corrections from Yan

- `logo.jpg` and `community-group.jpg` are unmodified copies of the two supplied attachments (JPEG data despite their clipboard `.png` names). Dimensions and provenance are in `sources.json`. The group photograph replaces the small closing team photo; no capture year is inferred.
- The hero laptop portrait was replaced with Yan’s recollection of a grandmother interrupting a class after skipping her grocery shopping. The memory is her account, not an identification of anyone in the remaining hero photograph.
- Yan supplied the comparison to an early version of “computer use,” guiding older adults through on-screen steps; the prose frames it as a human-led analogy, not an automated system.
- Yan confirmed that Bridge became a school club and continued with her peers after she graduated four years after its 2016 start.
