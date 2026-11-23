"use client";
import { useEffect, useRef, useState } from "react";
import s from "./cinema.module.css";
const scenes = [
  {
    clip: "landing",
    title: "What if a character\ncould come home?",
    caption: "The invitation",
    body: "We wanted AI to feel delightful and helpful in everyday life.",
  },
  {
    clip: "train",
    title: "Someone to take\nalong with you",
    caption: "The possibility",
    body: "A familiar character. A voice. A little company through an ordinary day.",
  },
  {
    clip: "garden",
    title: "Then we had to\nmake it real",
    caption: "The work behind it",
    body: "A GoPro in a plushie. Five prototypes. A hundred beta units. Many trips to the factory.",
  },
];
export default function CinemaOpening() {
  const root = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const markers = root.current?.querySelectorAll<HTMLElement>(
      "[data-cinema-scene]",
    );
    if (!markers) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.cinemaScene));
      },
      { rootMargin: "-35% 0px -35% 0px" },
    );
    markers.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !paused && !reduced) void v.play().catch(() => {});
      else v.pause();
    });
  }, [active, paused, reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) videos.current.forEach((v) => v?.pause());
      else if (!paused && !reduced)
        void videos.current[active]?.play().catch(() => {});
    });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, [active, paused, reduced]);
  const choose = (i: number) => {
    setActive(i);
    root.current
      ?.querySelector<HTMLElement>(`[data-cinema-scene="${i}"]`)
      ?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
  };
  return (
    <section
      ref={root}
      className={s.opening}
      aria-label="BabyMilu opening sequence"
    >
      <div className={s.stage}>
        <div className={s.media}>
          {scenes.map((scene, i) => (
            <div
              key={scene.clip}
              className={s.scene}
              data-active={active === i}
              aria-hidden={active !== i}
            >
              {reduced ? (
                <img src={`/babymilu/cinema/${scene.clip}.jpg`} alt="" />
              ) : (
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={`/babymilu/cinema/${scene.clip}.mp4`}
                  poster={`/babymilu/cinema/${scene.clip}.jpg`}
                  muted
                  loop
                  playsInline
                  preload={i === active ? "auto" : "none"}
                  aria-label={`Original BabyMilu ${scene.clip} marketing film`}
                />
              )}
              {i > 0 && (
                <img
                  className={s.originalPlush}
                  src="/babymilu/original-plush.png"
                  alt="Original BabyMilu character artwork"
                />
              )}
            </div>
          ))}
        </div>
        <div className={s.words}>
          <span className={s.kicker}>BabyMilu · A story of making</span>
          {scenes.map((scene, i) => (
            <div
              key={scene.title}
              className={s.titleFrame}
              hidden={active !== i}
            >
              <span>{scene.caption}</span>
              {i === 0 ? (
                <h1 id="story-title">
                  What if a character
                  <br />
                  <em>could come home?</em>
                </h1>
              ) : (
                <h2>
                  {scene.title.split("\n").map((line, j) => (
                    <span key={line}>
                      {j > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h2>
              )}
              <p>{scene.body}</p>
            </div>
          ))}
          <div className={s.controls}>
            <div role="group" aria-label="Opening film scenes">
              {scenes.map((scene, i) => (
                <button
                  type="button"
                  key={scene.clip}
                  aria-label={scene.caption}
                  aria-pressed={active === i}
                  onClick={() => choose(i)}
                >
                  <span />
                  {scene.caption}
                </button>
              ))}
            </div>
            {!reduced && (
              <button type="button" onClick={() => setPaused(!paused)}>
                {paused ? "Play films" : "Pause films"}
              </button>
            )}
          </div>
          <a className={s.skip} href="#beginning">
            Skip to the making of
          </a>
          <small className={s.source}>
            Original v3 marketing films · February 2026 archive
            <br />
            Scroll to move through the opening
          </small>
        </div>
      </div>
      <div className={s.markers} aria-hidden="true">
        {scenes.map((scene, i) => (
          <div key={scene.clip} data-cinema-scene={i} />
        ))}
      </div>
    </section>
  );
}
