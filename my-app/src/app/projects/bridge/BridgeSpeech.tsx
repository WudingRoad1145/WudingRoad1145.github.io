"use client";

import { useState } from "react";
import s from "./bridge.module.css";

export default function BridgeSpeech() {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={s.speech}>
      <div className={s.speechFrame}>
        {playing ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/a7z85YHBB2U?autoplay=1"
            title="Yan Feng speaking about Bridge on 中国少年说, CCTV 少儿"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play my Bridge speech on 中国少年说"
          >
            <img
              src="/bridge/speech-thumbnail.jpg"
              alt="Thumbnail from Yan’s televised Bridge speech"
              loading="lazy"
            />
            <span>▶ Watch my speech</span>
          </button>
        )}
      </div>
      <figcaption>
        <span>中国少年说 · CCTV 少儿 · November 14, 2020</span>
        <a
          href="https://www.youtube.com/watch?v=a7z85YHBB2U"
          target="_blank"
          rel="noreferrer"
        >
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
