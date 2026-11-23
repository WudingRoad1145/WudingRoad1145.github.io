"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function RunnerCutout() {
  const figure = useRef<HTMLImageElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setRunning(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (figure.current) observer.observe(figure.current);
    return () => {
      observer.disconnect();
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
