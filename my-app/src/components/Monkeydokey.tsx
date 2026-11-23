"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Monkeydokey() {
  const [spotlight, setSpotlight] = useState(true);
  return (
    <section
      className="life-section monkey-section"
      id="monkeydokey"
      aria-labelledby="monkey-title"
    >
      <figure className="monkey-keepsake">
        <span className="monkey-tape" aria-hidden="true" />
        <div className="monkey-photo">
          <Image
            src="/images/hiking.jpg"
            alt="Me holding Monkeydokey, my stuffed monkey travel companion, at the summit of Mount Kilimanjaro"
            width={2274}
            height={1280}
            sizes="(max-width: 700px) 90vw, 52vw"
          />
          <svg
            className="monkey-mark"
            viewBox="0 0 1000 563"
            fill="none"
            aria-hidden="true"
          >
            <path d="M614 442 C647 409 726 436 731 473 C736 513 622 524 608 481 C597 451 631 423 681 429 M611 449 C633 421 714 425 730 461" />
            <path d="M343 286 C373 334 369 392 450 391 C533 390 532 443 591 455 M577 438 L595 457 L570 466" />
            <path d="M747 432 L767 414 M752 453 L779 447 M742 413 L751 391" />
          </svg>
          <div
            className="monkey-closeup"
            id="monkey-closeup"
            hidden={!spotlight}
          >
            <div className="monkey-lens">
              {/* A CSS close-up of the same, unaltered photograph. */}
              <img
                src="/images/hiking.jpg"
                alt="A closer look at Monkeydokey’s smiling face"
              />
            </div>
            <span>the real star!!</span>
          </div>
        </div>
        <figcaption>two very happy explorers one is a monkey</figcaption>
        <button
          type="button"
          className="monkey-toggle"
          aria-expanded={spotlight}
          aria-controls="monkey-closeup"
          onClick={() => setSpotlight((value) => !value)}
        >
          {spotlight ? "Zoom back out" : "A closer look at Monkeydokey"}
        </button>
      </figure>
      <div className="life-copy monkey-copy">
        <span className="handwritten">meet Monkeydokey!</span>
        <h2 id="monkey-title">
          He was ten
          <br />
          He made it, too
        </h2>
        <p>
          That’s Monkeydokey in my arms He was already ten years old when we
          made it to the top of Kilimanjaro
        </p>
        <p>
          He comes on almost every adventure with me This is our summit photo
        </p>
        <span className="monkey-postscript">of course he came along :)</span>
        <div className="life-links">
          <Link href="/adventures">More of our adventures</Link>
          <Link href="/humans">And some humans I love</Link>
        </div>
      </div>
    </section>
  );
}
