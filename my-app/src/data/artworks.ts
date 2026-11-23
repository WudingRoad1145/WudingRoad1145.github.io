import dimensions from "./art-images.json";

const picture = (file: keyof typeof dimensions, alt: string) => ({
  src: `/art/${file}`,
  ...dimensions[file],
  alt,
});

export const artworks = [
  {
    id: "artist-v0",
    title: "Artist V0",
    year: "2019",
    date: "August 2019",
    medium: "Electrical circuits, Arduino, code, paper and pen",
    size: "35 × 48 cm",
    feature: true,
    note: "mum, my model",
    story: [
      "Can a computer be an artist? I used a neural network to process portraits and built a drawing machine with Arduino, circuits, paper and pen — my mum sat for it",
      "If people learn to make art by copying, what separates our learning from a computer’s? This experiment put that question on a drawing board",
    ],
    images: [
      picture(
        "p06-02.webp",
        "My mum sitting beside Artist V0 as the machine draws her portrait",
      ),
      picture(
        "p06-01.webp",
        "The black-and-white computer-processed portrait of my mum",
      ),
    ],
  },
  {
    id: "tag-c",
    title: "TAG-C",
    year: "2019",
    date: "July 2019",
    medium: "Maya 3D modelling and PLA 3D printing",
    size: "10 × 15 × 24 cm",
    story: [
      "Are we our genetic code, or something more? I built a rabbit whose surface is made from A, T, C and G, then brought it into the world as a hollow PLA print",
      "The letters describe a body, but leave an open question about what is inside — and what genes alone can explain",
    ],
    images: [
      picture(
        "p02-02.webp",
        "A white 3D-printed rabbit made from interlocking genetic-code letters",
      ),
      picture("p02-01.webp", "The blue Maya model of the letter-built rabbit"),
    ],
  },
  {
    id: "coding-buddha",
    title: "Coding Buddha",
    year: "2019",
    date: "October 2019",
    medium: "Mixed media · acrylic on canvas, sculpture and paper",
    size: "Sculpture 10 × 4 × 30 cm · painting 60 × 80 cm",
    story: [
      "A friend put a Buddha in his code comments to wish for a bug-free program — that small ritual became the starting point for this piece",
      "Typing hands and strands of zeros and ones surround the seated Buddha, asking how technology changes the ways we hold on to belief",
    ],
    images: [
      picture(
        "p03-01.webp",
        "A Buddha sculpture above typing hands in front of an acrylic Buddha painting",
      ),
      picture("p03-02.webp", "Another view of the Coding Buddha installation"),
    ],
  },
  {
    id: "millionaire",
    title: "Millionaire",
    year: "2019",
    date: "September 2019",
    medium: "Photography, installation, plastic paper and correction pen",
    size: "Three panels · 21 × 30 cm each",
    feature: true,
    note: "one street away",
    story: [
      "Growing up in Shanghai, I noticed the older streets just one road away from the bright, busy Nanjing Road — Tianjin Road, Niuzhuang Road and Ningbo Road",
      "I called this work Millionaire for the contradiction I saw: homes valued at millions, yet residents living with difficult conditions and memories they could not simply exchange for a better life",
      "Photographs and layered drawings bring those streets into view, alongside the city’s more familiar skyline",
    ],
    images: [
      picture(
        "p04-01.webp",
        "Three layers of Millionaire: the Shanghai skyline, neighbourhood photographs and a red street drawing",
      ),
      picture("p04-02.webp", "Layered red and black drawings from Millionaire"),
      picture(
        "p04-03.webp",
        "The red drawing and neighbourhood photography panels",
      ),
      picture(
        "p04-04.webp",
        "Layers of the Millionaire installation seen at an angle",
      ),
      picture("p04-05.webp", "The red drawing panel in Millionaire"),
      picture(
        "p04-06.webp",
        "A collage of photographs of older Shanghai streets",
      ),
    ],
  },
  {
    id: "humans-of-shanghai",
    title: "Humans of Shanghai",
    year: "2013–2018",
    date: "2013–2018",
    medium: "Portrait sketches",
    size: "Six drawings · 30 × 42 cm each",
    images: [
      picture(
        "p05-01.webp",
        "Six hand-drawn portrait studies in Humans of Shanghai",
      ),
    ],
  },
  {
    id: "still-life",
    title: "Still Life",
    year: "2018",
    date: "May 2018",
    medium: "Gouache",
    size: "30 × 42 cm",
    images: [
      picture(
        "p09-01.webp",
        "A gouache still life of a leafy plant, fruit, a cup and draped fabric",
      ),
    ],
  },
  {
    id: "emotion",
    title: "Emotion",
    year: "2019",
    date: "February 2019",
    medium: "Iron wire",
    size: "22 × 25 × 23 cm",
    feature: true,
    note: "same face, another feeling",
    story: [
      "Following Alexander Calder’s idea of drawing in space, I bent iron wire into an angry face — a set of lines with a three-dimensional presence",
      "Changing the light gives the same face different expressions in shadow, a small way of exploring how many feelings one face can hold",
    ],
    images: [
      picture(
        "p11-01.webp",
        "A suspended iron-wire face with layered eyes, nose and an open mouth",
      ),
      picture(
        "p11-02.webp",
        "The wire face lit from above, casting another expression in shadow",
      ),
    ],
  },
  {
    id: "2017208",
    title: "2017208",
    year: "2017",
    date: "2017",
    medium: "Digital art, stencil and graffiti",
    size: "Stencil and graffiti 70 × 120 cm · 15 digital studies",
    images: [
      picture(
        "p08-01.webp",
        "Overlapping multicoloured faces in the finished stencil and graffiti work",
      ),
      ...(
        [
          "p08-02.webp",
          "p08-03.webp",
          "p08-04.webp",
          "p08-05.webp",
          "p08-06.webp",
          "p08-07.webp",
          "p08-08.webp",
          "p08-09.webp",
          "p08-10.webp",
          "p08-11.webp",
          "p08-12.webp",
          "p08-13.webp",
          "p08-14.webp",
          "p08-15.webp",
          "p08-16.webp",
        ] as const
      ).map((file, index) =>
        picture(file, `Colour study ${index + 1} for 2017208`),
      ),
    ],
  },
  {
    id: "shan-shui",
    title: "Shan Shui",
    year: "circa 2018",
    date: "circa 2018",
    medium: "VR art · Tilt Brush",
    size: "Digital view · 1920 × 1080 px",
    images: [
      picture(
        "p07-01.webp",
        "A virtual landscape painted in Tilt Brush, with luminous white strokes and dark mountain-like forms",
      ),
    ],
  },
  {
    id: "plant-transportation",
    title: "Plant Transportation",
    year: "2018–2019",
    date: "2018–2019",
    story: [
      "We made this cartoon series to help our biology classmates review plant biology together",
    ],
    medium: "Digital illustration · biology cartoons",
    size: "From Enzyme Bio-chemistry Cartoon – Plant Transportation",
    images: [
      picture(
        "p10-02.webp",
        "A hand-drawn digital biology cartoon explaining water transport through plant cells",
      ),
      picture(
        "p10-01.webp",
        "Characters and annotated diagrams in the plant transportation cartoon",
      ),
      picture("p10-03.webp", "A tall annotated plant transport diagram"),
    ],
  },
];
export type Artwork = (typeof artworks)[number];
