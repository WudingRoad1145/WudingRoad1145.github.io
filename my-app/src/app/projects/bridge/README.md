# Bridge 桥

The project route is `/projects/bridge`, linked from the selected projects on `/projects`.

## Content and provenance

- Yan supplied the project draft and confirmed that Bridge began in 2016, during freshman year of high school. The team of five, leadership role, research, booklet, regular community teaching and China Thinks Big gold award come from that draft.
- [Bridge！重阳公益课堂纪实](https://mp.weixin.qq.com/s/5GyBmu4ArQn-YwPtDRxLHQ), published November 4, 2017, supplies the original community photographs, slide overview, preparation quote, venue, nearly 20 participants, two-hour session and quiz details. These are dated 2017, separately from the project's start.
- [你尝试过没有智能手机生活吗？](https://mp.weixin.qq.com/s/kOxKaHi2H6DOwKKgeZRNFQ), published December 3, 2017, is linked as the original project film.
- [Yan's speech](https://www.youtube.com/watch?v=a7z85YHBB2U) is dated November 14, 2020 in its YouTube metadata and identified as 中国少年说, CCTV 少儿. The speech is a later appearance, not a 2016 recording.

`public/bridge/sources.json` records the source image URLs and dimensions. The eight article images were converted to WebP without invented or AI-generated content. Seven appear in the page; `teaching-team.webp` is retained with the archive assets. The slide overview is explicitly labelled as teaching slides, not booklet pages. Original booklet scans have not been supplied.

`speech-thumbnail.jpg` is the video's thumbnail from `https://i.ytimg.com/vi/a7z85YHBB2U/hqdefault.jpg`. `cover.svg` is a contemporary project-card illustration, not an archival artifact.

## Interaction and validation

Photographs open in a native modal dialog with a close button, Escape dismissal and focus restoration. The speech loads its YouTube privacy-enhanced iframe only after a click; an ordinary YouTube link remains available. Actual playback depends on YouTube availability and embedding policy.

Validated with TypeScript and desktop/mobile browser checks: 1314px, 390px and 320px layouts, no horizontal overflow, local image loading, photo enlargement and Escape/focus behavior, Work-card navigation, and click-to-load speech iframe. Regular prose uses punctuation; headings and handwritten captions omit sentence-ending periods.
