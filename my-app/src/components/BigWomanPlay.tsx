"use client";
import { useState } from "react";
import Link from "next/link";
const strengths = [
  {
    label: "On the court",
    part: "Biceps",
    line: "For raining shots on the court",
    note: "I appreciate my biceps for helping me rain shots on the court",
    symbol: "◎",
  },
  {
    label: "In the pool",
    part: "Lats",
    line: "For pulling myself through the water",
    note: "I appreciate my lats for powering me through the butterfly stroke",
    symbol: "≈",
  },
  {
    label: "On the trail",
    part: "Quads",
    line: "For getting to the next mountain",
    note: "I appreciate my quads for propelling me across trails and finish lines",
    symbol: "△",
  },
  {
    label: "Everywhere",
    part: "Core",
    line: "For holding my own",
    note: "I appreciate my core for grounding me, physically and mentally",
    symbol: "✳",
  },
];
export default function BigWomanPlay() {
  const [active, setActive] = useState(0);
  const [room, setRoom] = useState(65);
  const [turned, setTurned] = useState(false);
  return (
    <main className="big-woman-play">
      <header className="big-opening">
        <Link href="/projects" className="text-link">
          A personal pursuit
        </Link>
        <p className="handwritten">a lifelong work in progress</p>
        <h1 style={{ letterSpacing: `${-0.06 + room * 0.0006}em` }}>
          BIG
          <br />
          <span>WOMAN</span>
        </h1>
        <div className="room-control">
          <label htmlFor="make-room">Make a little room for yourself</label>
          <input
            id="make-room"
            type="range"
            min="0"
            max="100"
            value={room}
            onChange={(event) => setRoom(Number(event.target.value))}
          />
          <span aria-hidden="true">a little / a lot</span>
        </div>
        <p className="big-dek">
          Aesthetics are learned
          <br />
          I’m still unlearning a few things
        </p>
      </header>
      <section className="strength-desk">
        <button
          type="button"
          className={`strength-photo ${turned ? "is-turned" : ""}`}
          onClick={() => setTurned(!turned)}
          aria-pressed={turned}
          aria-label="Turn over my strength photograph"
        >
          {turned ? (
            <span className="photo-back">
              “Your biceps scared me”
              <br />
              <br />I spent years wanting to change how my body looked
              <br />
              <em>Fortunately, I never succeeded</em>
            </span>
          ) : (
            <img
              src="/images/flex.jpg"
              alt="Yan flexing in front of Duke Chapel"
            />
          )}
          <small>
            {turned ? "turn it back over" : "there’s a story on the back"}
          </small>
        </button>
        <div className="strength-copy">
          <span className="handwritten">
            a few very good uses for this body
          </span>
          <h2>
            Look what it
            <br />
            lets me do
          </h2>
          <div
            className="strength-tabs"
            role="group"
            aria-label="Explore what strength makes possible"
          >
            {strengths.map((s, i) => (
              <button
                type="button"
                key={s.part}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="strength-result" aria-live="polite">
            <span aria-hidden="true">{strengths[active].symbol}</span>
            <h3>{strengths[active].line}</h3>
            <p>{strengths[active].note}</p>
          </div>
        </div>
      </section>
      <section className="big-notebook">
        <span className="handwritten">notes to myself</span>
        <h2>
          Strong, capable,
          <br />
          and free
        </h2>
        <p>
          Growing up in China, I was often called “boyish” or “壮” Remarks that
          were meant as harmless jokes became things I wanted to change about
          myself
        </p>
        <p>
          Over time, I came to appreciate my body for what it could do During my
          gap year, I began introducing strength training to my mother’s life
          Together, we discovered the freedom and confidence that comes with
          building strength
        </p>
        <p>
          To me, strength is beauty I want to redefine femininity for myself,
          and share the joy of being strong with others
        </p>
        <details>
          <summary>A few things I’m still figuring out</summary>
          <p>
            Anatomy, kinesiology, and how to build a long, healthy, athletic
            life This is an ongoing notebook, not a finished manifesto
          </p>
        </details>
        <p className="handwritten big-signoff">
          More living More learning More room
        </p>
      </section>
    </main>
  );
}
