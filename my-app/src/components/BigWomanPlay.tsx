"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./BigWomanPlay.module.css";

export default function BigWomanPlay() {
  const [room, setRoom] = useState(40);
  const [maxFont, setMaxFont] = useState<number | null>(null);
  const [turned, setTurned] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const measure = useRef<HTMLSpanElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let mounted = true;
    const resize = () => {
      if (!mounted || !stage.current || !measure.current) return;
      const wordWidth = measure.current.getBoundingClientRect().width;
      if (wordWidth) setMaxFont((stage.current.clientWidth / wordWidth) * 100);
    };
    const observer = new ResizeObserver(resize);
    if (stage.current) observer.observe(stage.current);
    document.fonts.ready.then(resize);
    resize();
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = film.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause();
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, []);

  return (
    <main className="big-woman-play">
      <header className={`big-opening ${styles.opening}`}>
        <Link href="/projects" className="text-link">
          A personal pursuit
        </Link>
        <p className="handwritten">a lifelong work in progress</p>
        <span ref={measure} className={styles.measure} aria-hidden="true">
          WOMAN
        </span>
        <div
          ref={stage}
          className={styles.titleStage}
          style={maxFont ? { height: maxFont * 1.7 } : undefined}
        >
          <h1
            className={styles.title}
            style={
              maxFont
                ? { fontSize: maxFont * (0.36 + (0.64 * room) / 100) }
                : undefined
            }
          >
            BIG
            <br />
            <span>WOMAN</span>
          </h1>
        </div>
        <div className={styles.openingBottom}>
          <div className="room-control">
            <label htmlFor="make-room">Make a little room for yourself</label>
            <input
              id="make-room"
              type="range"
              min="0"
              max="100"
              value={room}
              aria-valuetext={
                room === 100
                  ? "A lot — filling the page"
                  : `${room} percent — ${room < 40 ? "a little" : "getting bigger"}`
              }
              onChange={(event) => setRoom(Number(event.target.value))}
            />
            <span aria-hidden="true">a little / a lot</span>
          </div>
          <p className="big-dek">
            Aesthetics are learned.
            <br />
            I’m still unlearning a few things.
          </p>
        </div>
      </header>

      <section
        className={`strength-desk ${styles.essayDesk}`}
        aria-labelledby="strong-title"
      >
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
        <div className={`strength-copy ${styles.essay}`}>
          <span className="handwritten">
            a little appreciation for this body
          </span>
          <h2 id="strong-title">
            Strong, capable,
            <br />
            and free
          </h2>
          <p className={styles.appreciation}>
            For every shot, every swim, every mountain, and my first IRONMAN
            70.3 — thank you
          </p>
          <p>
            Growing up in China as a naturally athletic girl who loved movement,
            I was often called “boyish” or “壮” (big). Remarks that were meant
            as harmless jokes became things I wanted to change about myself.
          </p>
          <p>
            Over time, I came to appreciate my body for what it could do. During
            my gap year, I began introducing strength training to my mother’s
            life. Together, we discovered the freedom and confidence that comes
            with building strength.
          </p>
          <p>
            To me, strength is beauty. I want to redefine femininity for myself,
            and share the joy of being strong with others.
          </p>
        </div>
      </section>

      <section className={styles.fixing} aria-labelledby="girls-fixing-title">
        <header className={styles.fixingHeading}>
          <span className="handwritten">
            and these hands can do more than lift
          </span>
          <h2 id="girls-fixing-title">
            Girls fixing
            <br />
            <span>it all!</span>
          </h2>
        </header>
        <div className={styles.origin}>
          <div>
            <p>
              While building BabyMilu, I grew close to some of our earliest
              supporters. They weren’t just backing a little AI companion. They
              wanted to support girls being techy, doing the hardcore things.
            </p>
            <p>
              One supporter shared that she had grown up discouraged from
              electronics, and it had left her feeling unsure of herself around
              technology.
            </p>
            <p className="handwritten">
              What if seeing another girl take it apart made it easier to try?
            </p>
          </div>
          <figure className={styles.messagePlaceholder}>
            <figcaption>A message that stayed with me</figcaption>
            <p>Space for the original Discord screenshot</p>
            <small>From an early BabyMilu supporter</small>
          </figure>
        </div>
        <div className={styles.repairDesk}>
          <figure className={styles.repairFilm}>
            <video
              ref={film}
              controls
              playsInline
              preload="none"
              poster="/roborock/poster.jpg"
              aria-label="Taking apart my Roborock Qrevo Pro to replace its broken radar"
            >
              <source src="/roborock/rescue.mp4" type="video/mp4" />
              Your browser cannot play this repair video
            </video>
            <figcaption>one broken radar, a whole robot in pieces</figcaption>
          </figure>
          <div className={styles.repairCopy}>
            <span className="handwritten">
              starting at home, one thing at a time
            </span>
            <h3>We can do it all!</h3>
            <p>
              I’ve been setting up a TikTok account to share videos of fixing
              everyday electronics at home. Taking things apart, figuring them
              out, and showing the process.
            </p>
            <p>
              Here’s my Roborock Qrevo Pro. The radar servo broke, so I took the
              whole device apart and replaced the radar.
            </p>
            <p className="handwritten">
              It is not that hard at all
              <br />
              We can learn how!
            </p>
            <div
              className={styles.repairList}
              aria-label="Things to figure out together"
            >
              <a href="#dryer-repair">a dryer</a>
              <span>a sink</span>
              <span>a dripping fountain head</span>
              <span>a robot cleaner</span>
            </div>
            <p>For anyone wondering where to start — this is for you.</p>
          </div>
        </div>
        <section
          id="dryer-repair"
          className={styles.dryerStory}
          aria-labelledby="dryer-title"
        >
          <header className={styles.dryerHeading}>
            <div>
              <span className="handwritten">a household effort</span>
              <h3 id="dryer-title">A dryer, a few roommates</h3>
              <p>
                My roommates and I took apart a dryer and fixed it together.
              </p>
            </div>
            <span className={styles.comingSoon}>photos and videos to come</span>
          </header>
          {/* Replace these reserved frames with the original media when supplied.
              No stock imagery, fake playback controls or invented repair steps. */}
          <div
            className={styles.dryerAlbum}
            aria-label="Space for our dryer repair film and photographs"
          >
            <div className={styles.dryerFilmSpace}>
              <span>the repair film</span>
              <span className={styles.frameCorner} aria-hidden="true">
                01
              </span>
            </div>
            <div className={styles.dryerPhotoStack} aria-hidden="true">
              <div className={styles.dryerPhotoSpace}>
                <span>a few moments along the way</span>
                <span className={styles.frameCorner}>02</span>
              </div>
              <div className={styles.dryerPhotoSpace}>
                <span>figuring it out together</span>
                <span className={styles.frameCorner}>03</span>
              </div>
            </div>
          </div>
        </section>
        <p className={styles.signoff}>
          Strong enough to try
          <br />
          Curious enough to figure it out
        </p>
      </section>
    </main>
  );
}
