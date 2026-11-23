"use client";

import { useState } from "react";
import Link from "next/link";
import NamePronunciation from "./NamePronunciation";
import styles from "./BeliefOpening.module.css";

const beliefs = [
  {
    word: "Make",
    heading: "play. break things. get dirty.",
    body: "With good intention. Then steadily follow through.",
    // Loose pieces, a messy workbench, and a line that follows through.
    path: "M12 65 L37 59 L45 79 L18 86 Z M17 63 L24 77 L43 73 M50 52 L70 27 L84 56 Z M81 72 L94 63 L100 83 L87 86 Z M15 97 Q48 89 33 102 Q17 112 50 101 Q78 91 57 106 M9 40 L2 34 M26 36 L21 22 M42 38 L48 26 M83 14 C125 -1 130 32 114 48 C99 63 121 76 145 65 M134 58 L146 65 L138 77",
  },
  {
    word: "Good",
    heading: "quality. character. PERMA.",
    body: "To die knowing I was a good person by my own standard is enough.",
    // A flower with five petals, tended from its roots.
    path: "M71 51 C44 65 30 44 48 30 C23 13 51 -5 66 16 C76 -8 102 1 96 23 C124 19 129 46 103 51 C115 77 83 82 77 59 M76 33 C61 30 61 52 77 53 C93 54 93 34 76 33 M77 64 Q68 86 76 103 M75 86 Q47 66 45 85 Q48 96 75 94 M76 82 Q105 66 105 83 Q99 97 75 95 M38 107 Q79 100 116 108 M75 106 L62 118 M78 107 L84 120 M72 111 L47 117 M82 110 L106 118",
  },
  {
    word: "Humans",
    heading: "why we make. pursue. exist.",
    body: "What we’ll always be best at: being human, and loving humanity.",
    // Two people reaching toward the same heart.
    path: "M28 25 C7 19 6 50 26 51 C47 51 48 25 28 25 M27 52 L26 87 L9 113 M26 87 L43 114 M26 65 L4 83 M27 64 L58 48 M121 24 C99 18 99 50 119 50 C140 51 141 24 121 24 M120 51 L121 87 L105 115 M121 87 L139 114 M120 64 L147 83 M120 65 L90 48 M73 51 C61 41 50 32 55 22 C61 12 71 19 74 24 C81 11 96 16 96 27 C95 38 81 46 73 51 M21 37 L21 39 M33 37 L33 39 M21 44 Q28 49 35 43 M113 36 L113 38 M125 36 L125 38 M113 43 Q120 48 128 42",
  },
];

export default function BeliefOpening() {
  const [active, setActive] = useState(0);
  const [drawing, setDrawing] = useState(0);
  return (
    <section className={styles.opening} aria-labelledby="intro-title">
      <p className={styles.hello}>
        hi, I’m Yán Fēng. this is what I believe in.
      </p>
      <div className={styles.manifesto}>
        <h1 id="intro-title" className={styles.title}>
          {beliefs.map(({ word }, index) => (
            <span key={word}>
              <button
                type="button"
                aria-pressed={active === index}
                aria-controls={`belief-${index}`}
                aria-describedby={`belief-${index}`}
                onClick={() => {
                  setActive(index);
                  setDrawing((value) => value + 1);
                }}
              >
                {word}
                <svg viewBox="0 0 390 25" fill="none" aria-hidden="true">
                  <path d="M5 12 Q129 1 383 10 M20 22 Q205 10 361 22" />
                </svg>
              </button>
              {index < 2 ? " " : null}
            </span>
          ))}
        </h1>
        <div className={styles.notes}>
          {beliefs.map(({ word, heading, body, path }, index) => (
            <div
              key={word}
              id={`belief-${index}`}
              className={styles.note}
              data-active={active === index}
            >
              <svg
                key={active === index ? drawing : "still"}
                className={styles.drawing}
                viewBox="0 0 150 125"
                fill="none"
                aria-hidden="true"
              >
                <path d={path} pathLength="1" />
              </svg>
              <div>
                <p className={styles.definition}>{heading}</p>
                <p className={styles.explanation}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <Link href="/about">A little about me</Link>
          <NamePronunciation />
        </div>
        <a className={styles.invitation} href="#my-world">
          a little of my world, below <span aria-hidden="true">↓</span>
        </a>
      </div>
      <span className={styles.hint}>tap a word. follow the doodle.</span>
    </section>
  );
}
