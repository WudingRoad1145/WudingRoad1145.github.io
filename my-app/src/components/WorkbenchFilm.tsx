"use client";

import { useEffect, useRef, useState } from "react";

export default function WorkbenchFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(true);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const load = manual || (near && !still);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setStill(
        motion.matches ||
          !!(navigator as Navigator & { connection?: { saveData?: boolean } })
            .connection?.saveData,
      );
    update();
    motion.addEventListener("change", update);
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "200px" },
    );
    const visibility = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2] },
    );
    if (video.current) {
      preload.observe(video.current);
      visibility.observe(video.current);
    }
    return () => {
      motion.removeEventListener("change", update);
      preload.disconnect();
      visibility.disconnect();
    };
  }, []);

  useEffect(() => {
    const update = () => {
      if (
        load &&
        visible &&
        !paused &&
        (!still || manual) &&
        document.visibilityState === "visible"
      ) {
        void video.current?.play().catch(() => setPlaying(false));
      } else video.current?.pause();
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [load, visible, paused, still, manual]);

  return (
    <>
      <video
        ref={video}
        src={load ? "/robotics/workbench.mp4" : undefined}
        poster="/robotics/workbench.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label="The pink SO101 arm moving on my workbench"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      />
      <span className="workbench-film-label" aria-hidden="true">
        a little work in progress
      </span>
      {!failed && (
        <button
          className="workbench-film-toggle"
          type="button"
          aria-label={playing ? "Pause workbench film" : "Play workbench film"}
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
    </>
  );
}
