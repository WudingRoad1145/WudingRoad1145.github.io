# Artwork provenance

These are web copies of the original embedded images in `public/Feng_Yan_Portfolio.pdf`, supplied by Yán Fēng

Run `scripts/extract-art-portfolio.py` with pypdf and Pillow installed to reproduce them
The script preserves transparency and original compositions, corrects four photograph orientations to match the PDF, and encodes WebP at quality 88 with a maximum side of 1600 pixels
No artwork was generated or retouched
The complete set is about 4.2 MB, with images loaded on demand by Next Image

| PDF page | Artwork | Date | Medium in the source |
| --- | --- | --- | --- |
| 1 | Trampoline | October 2019 | Collage |
| 2 | TAG-C | July 2019 | Maya 3D modelling and PLA 3D printing |
| 3 | Coding Buddha | October 2019 | Acrylic on canvas, sculpture, organic glass and paper |
| 4 | Millionaire | September 2019 | Photography, installation, plastic paper and correction pen |
| 5 | Humans of Shanghai | July 2017 | Portrait sketches |
| 6 | Artist V0 | August 2019 | Electrical circuit, Arduino, code, paper and pen |
| 7 | Shan Shui | August 2019 | VR art, with Tilt Brush visible in the image |
| 8 | 2017208 | October 2019 | Digital art, stencil and graffiti |
| 9 | Still Life | May 2018 | Gouache |
| 10 | Enzyme Bio-chemistry Cartoon – Plant Transportation | March 2019 | Digital |
| 11 | Emotion | February 2019 | Iron wire |

The table above records the original PDF dates, not the corrected website dates
Yan’s later corrections take precedence: `2017208` is from 2017, Humans of Shanghai spans 2013–2018, Shan Shui is circa 2018, and Plant Transportation spans 2018–2019
The page’s overall date range is therefore 2013–2019
The PDF uses the ambiguous material word “fatlute” for Coding Buddha; the page uses the broader documented category of mixed media instead of guessing a material

Stories for TAG-C, Coding Buddha, Millionaire, Artist V0 and Emotion are edited from the artist statements in the PDF
Emotion retains its attribution to Alexander Calder
Plant Transportation now includes Yan’s supplied story about making a serial cartoon to help biology classmates review plant biology
The other five pieces intentionally have no invented backstory, following the artist's clarification
The website presents title, year and documented medium for those works
All alternate images, including 15 digital studies for 2017208, are available in the native viewer

## Interaction contract

The artwork page is `/projects/miscellaneous`
The gallery and modal share the selected alternate view for each artwork
The native modal supports Escape, returns focus to its opener, and locks body scrolling only while open
Left and right arrows change views of the current artwork
Trampoline appears once in the opening with its title, year and medium
Previous and next piece controls move through the 10 remaining gallery artworks
Zoom stays inside the image area on desktop and mobile
Reduced-motion preferences disable image transitions
