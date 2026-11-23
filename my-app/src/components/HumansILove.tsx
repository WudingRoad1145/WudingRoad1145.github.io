import Link from "next/link";

export default function HumansILove() {
  return (
    <section
      className="humans-keepsake-section"
      id="humans-i-love"
      aria-labelledby="humans-keepsake-title"
    >
      <div className="humans-keepsake-heading">
        <span className="handwritten">no one becomes themselves alone</span>
        <h2 id="humans-keepsake-title">
          Some humans
          <br />I love <span aria-hidden="true">♡</span>
        </h2>
        <p>
          I’m grateful to the people I’ve felt love from
          <br />
          Some whose names I know, and some whose names I don’t
        </p>
        <Link className="text-link" href="/humans">
          Meet the humans who made me, me <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="humans-thank-you">
        <svg
          className="humans-note-arrow"
          viewBox="0 0 160 100"
          fill="none"
          aria-hidden="true"
        >
          <path d="M8 17 C70 2 137 12 129 49 C124 78 88 72 96 49 C103 32 145 57 140 91 M129 81 L140 92 L151 80" />
        </svg>
        <span className="humans-note-label">starting with these two</span>
        <div className="humans-parent-note">
          <h3>Mum &amp; Dad,</h3>
          <p>Thank you for making me a human to begin with</p>
          <p>And for making me unapologetically myself</p>
          <span className="humans-note-heart" aria-hidden="true">
            ♡
          </span>
        </div>
      </div>
      <p className="humans-section-postscript">
        thank you for making me a better human
      </p>
    </section>
  );
}
