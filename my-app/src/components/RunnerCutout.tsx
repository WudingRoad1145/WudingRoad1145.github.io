"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RunnerCutout() {
  const figure = useRef<HTMLImageElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRunning(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: 0.5 },
    );
    if (figure.current) observer.observe(figure.current);
    const keepsake = figure.current?.closest("button");
    const replay = () => setRunning(true);
    keepsake?.addEventListener("pointerenter", replay);
    keepsake?.addEventListener("focus", replay);
    return () => {
      observer.disconnect();
      keepsake?.removeEventListener("pointerenter", replay);
      keepsake?.removeEventListener("focus", replay);
    };
  }, []);

  return (
    <Image
      ref={figure}
      className={running ? "runner-moving" : undefined}
      onAnimationEnd={() => setRunning(false)}
      src="/images/yan-triathlon-cutout.png"
      alt="Me smiling and making two peace signs during my first IRONMAN 70.3"
      width={1024}
      height={1536}
      sizes="(max-width: 900px) 35vw, 250px"
    />
  );
}
