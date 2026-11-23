"use client";
import { useRef, useState } from "react";
export default function NamePronunciation() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  return (
    <span className="name-audio">
      <button
        type="button"
        aria-label="Hear how to pronounce Yán Fēng"
        onClick={() => {
          if (playing) {
            audio.current?.pause();
            setPlaying(false);
          } else {
            void audio.current
              ?.play()
              .then(() => setPlaying(true))
              .catch(() => setPlaying(false));
          }
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          aria-hidden="true"
        >
          <path d="M4 9h4l5-4v14l-5-4H4zM17 8a7 7 0 0 1 0 8M20 5a11 11 0 0 1 0 14" />
        </svg>
        {playing ? "Playing my name" : "Hear my name"}
      </button>
      <audio
        ref={audio}
        src="/pronounce.m4a"
        preload="none"
        onEnded={() => setPlaying(false)}
      />
    </span>
  );
}
