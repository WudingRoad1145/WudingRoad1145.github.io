"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import s from "./RoborockRescue.module.css";

const steps = [
  {
    time: 0,
    title: "start underneath",
    note: "the bottom cover and its screws",
    path: "M610 293 Q536 310 443 408 M452 389 L439 411 L464 407",
  },
  {
    time: 6,
    title: "make room for the parts",
    note: "the bumper and covers, laid out beside me",
    path: "M578 365 C674 353 691 650 601 675 C526 687 500 411 578 365",
  },
  {
    time: 16,
    title: "past the outer shell",
    note: "getting inside to reach the radar assembly",
    path: "M454 441 Q518 417 550 385 M537 387 L552 381 L548 397",
  },
  {
    time: 22,
    title: "back to the housing",
    note: "lining up the casing and its screws",
    path: "M618 300 Q545 333 456 425 M462 405 L451 430 L476 422",
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
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
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
  }, [visible, paused, reduced, saveData, manual, load, attempt]);

  function retry() {
    setFailed(false);
    setManual(true);
    setPaused(false);
    if (load) video.current?.load();
    setAttempt((value) => value + 1);
  }

  function seek(seconds: number) {
    setManual(true);
    setPaused(false);
    seekWhenReady.current = seconds;
    if (!failed && video.current && video.current.readyState >= 1) {
      video.current.currentTime = seconds;
      seekWhenReady.current = null;
    }
    setTime(seconds);
    if (failed) retry();
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
            The radar servo in my Roborock Qrevo Pro broke, so I took the whole
            device apart and replaced the radar.
          </p>
          <span className={s.marginNote}>
            one broken part, a whole robot in pieces
          </span>
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
                  if (seekWhenReady.current !== null) {
                    video.current.currentTime = seekWhenReady.current;
                    seekWhenReady.current = null;
                  }
                }
              }}
              onLoadedData={() => setFailed(false)}
              onPlaying={() => {
                setFailed(false);
                setPlaying(true);
              }}
              onTimeUpdate={() => setTime(video.current?.currentTime || 0)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={(event) => {
                if (load && event.currentTarget.error) {
                  setFailed(true);
                  setPlaying(false);
                }
              }}
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
            {!failed && (
              <button
                className={s.filmToggle}
                data-playing={playing}
                type="button"
                aria-label={playing ? "Pause repair film" : "Play repair film"}
                onClick={() => {
                  if (playing) setPaused(true);
                  else {
                    setManual(true);
                    setPaused(false);
                  }
                }}
              >
                <span aria-hidden="true">{playing ? "Ⅱ" : "▷"}</span>
              </button>
            )}
          </div>
          {failed && (
            <button className={s.retry} type="button" onClick={retry}>
              Give the film another try <span aria-hidden="true">↻</span>
            </button>
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
          <a
            className={s.reference}
            href="https://www.ifixit.com/Teardown/Roborock+Q+Revo:+Teardown/177533"
            target="_blank"
            rel="noreferrer"
          >
            Q Revo teardown reference ↗
          </a>
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
