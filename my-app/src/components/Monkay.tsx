import Image from "next/image";
import Link from "next/link";

export default function Monkay() {
  return (
    <section
      className="life-section monkey-section"
      id="monkay"
      aria-labelledby="monkey-title"
    >
      <figure className="monkey-keepsake">
        <span className="monkey-tape" aria-hidden="true" />
        <div className="monkey-photo">
          <Image
            src="/images/hiking.jpg"
            alt="Me holding Monkay, my stuffed monkey travel companion, at the summit of Mount Kilimanjaro"
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
          <div className="monkey-closeup">
            <div className="monkey-lens">
              {/* A CSS close-up of the same, unaltered photograph. */}
              <img
                src="/images/hiking.jpg"
                alt="A closer look at Monkay’s smiling face"
              />
            </div>
            <span>the real star!!</span>
          </div>
        </div>
        <figcaption>
          meet Monkay — ten years old on top of Kilimanjaro
          <small>
            my <span lang="zh">定心石</span> through the wild things
          </small>
        </figcaption>
      </figure>
      <div className="life-copy monkey-copy">
        <h2 id="monkey-title">
          Always
          <br />
          day one
        </h2>
        <p>
          I cherish courage and a beginner’s mind — staying curious, trying
          things, and being willing to begin again
        </p>
        <span className="monkey-postscript">
          set yourself free as if it is day one, always
        </span>
        <div className="life-links">
          <Link href="/adventures">
            A few wild memories we’ve made together ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
