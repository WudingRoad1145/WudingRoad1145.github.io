"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import s from "./RoborockRescue.module.css";

const steps = [
  {
    time: 0,
    title: "open it up",
    note: "let’s see what’s in here",
    path: "M698 390 C650 370 660 470 581 489 M593 472 L577 491 L601 497",
  },
  {
    time: 7,
    title: "keep track of the little things",
    note: "a floor full of parts",
    path: "M571 284 C659 252 703 347 683 521 C679 623 576 642 556 535 C535 404 544 306 595 288 M545 513 Q510 535 476 509 M482 495 L473 509 L489 519",
  },
  {
    time: 14,
    title: "ask for a little help",
    note: "the laptop is part of the toolkit",
    path: "M266 36 Q343 6 420 66 L468 199 Q382 264 285 201 Z M275 51 L294 194 M429 112 Q475 81 508 105 M495 91 L510 106 L494 117",
  },
  {
    time: 20,
    title: "back to the screws",
    note: "one small piece at a time",
    path: "M690 560 C620 602 550 560 493 512 M501 534 L489 508 L516 510",
  },
];

export default function RoborockRescue() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const seekWhenReady = useRef<number | null>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [saveData, setSaveData] = useState(false);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(27.3);
  const [failed, setFailed] = useState(false);
  const load = manual || (near && !reduced && !saveData);
  const active = Math.max(
    0,
    steps.findLastIndex((step) => time >= step.time),
  );

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    setSaveData(
      !!(navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData,
    );
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" },
    );
    const visibilityObserver = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2] },
    );
    if (root.current) {
      preloadObserver.observe(root.current);
      visibilityObserver.observe(root.current);
    }
    return () => {
      preference.removeEventListener("change", update);
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const allowed =
        visible &&
        !paused &&
        ((!reduced && !saveData) || manual) &&
        document.visibilityState === "visible";
      if (allowed && load)
        void video.current?.play().catch(() => setPlaying(false));
      else video.current?.pause();
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [visible, paused, reduced, saveData, manual, load]);

  function seek(seconds: number) {
    setManual(true);
    setPaused(false);
    seekWhenReady.current = seconds;
    if (video.current && video.current.readyState >= 1) {
      video.current.currentTime = seconds;
      seekWhenReady.current = null;
    }
    setTime(seconds);
  }

  return (
    <section
      ref={root}
      className={s.rescue}
      id="lately"
      aria-labelledby="rescue-title"
    >
      <div className={s.layout}>
        <div className={s.intro}>
          <span className={s.handwritten}>what I’ve been up to lately</span>
          <h2 id="rescue-title">
            a robot
            <br />
            rescue
          </h2>
          <p>
            Me, a Roborock Qrevo Pro,
            <br />
            and a floor full of parts
          </p>
          <span className={s.marginNote}>some taking-apart required</span>
        </div>
        <div className={s.filmColumn}>
          <div className={s.film}>
            <video
              ref={video}
              src={load ? "/roborock/rescue.mp4" : undefined}
              poster="/roborock/poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              aria-label="A silent timelapse of Yan taking apart and working on a Roborock Qrevo Pro"
              onLoadedMetadata={() => {
                if (video.current) {
                  setDuration(video.current.duration);
                  if (seekWhenReady.current !== null) {
                    video.current.currentTime = seekWhenReady.current;
                    seekWhenReady.current = null;
                  }
                }
              }}
              onTimeUpdate={() => setTime(video.current?.currentTime || 0)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setFailed(true)}
            />
            <svg
              className={s.doodle}
              viewBox="0 0 720 840"
              fill="none"
              aria-hidden="true"
            >
              <path d={steps[active].path} />
            </svg>
            <span className={s.filmLabel}>a small repair diary</span>
          </div>
          <div className={s.controls}>
            <button
              type="button"
              onClick={() => {
                if (playing) setPaused(true);
                else {
                  setManual(true);
                  setPaused(false);
                }
              }}
            >
              {playing ? "Pause film" : "Play film"}
            </button>
            <progress
              value={time}
              max={duration}
              aria-label="Repair film progress"
            />
            <button type="button" onClick={() => seek(0)}>
              Start again
            </button>
          </div>
          {failed && (
            <p className={s.fallback}>
              The film couldn’t load — the repair notes are still here
            </p>
          )}
        </div>
        <div className={s.notes}>
          <span className={s.chapterHint}>follow the little things</span>
          <div className={s.steps}>
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-pressed={index === active}
                onClick={() => seek(step.time)}
              >
                <span className={s.stepMark} aria-hidden="true">
                  {index === active ? "✳" : "·"}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  <small>{step.note}</small>
                </span>
              </button>
            ))}
          </div>
          <Link className={s.bigWoman} href="/projects/big-woman">
            <svg viewBox="0 0 100 85" fill="none" aria-hidden="true">
              <path d="M9 5 C83 0 82 51 42 49 C6 48 36 22 49 42 C64 65 40 70 76 74 M64 61 L79 75 L61 81" />
            </svg>
            <span>what it means I want to be a</span>
            <strong>BIG WOMAN!</strong>
          </Link>
        </div>
      </div>
    </section>
  );
}
