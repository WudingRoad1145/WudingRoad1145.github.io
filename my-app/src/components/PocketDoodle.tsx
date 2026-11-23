"use client";

import { useState } from "react";

const drawings = [
  {
    name: "a flower",
    path: "M52 56 C17 68 15 38 36 37 C15 13 43 4 51 25 C61 1 86 14 71 34 C97 27 102 55 76 57 C88 81 59 89 54 66 M54 67 Q47 89 55 111 M53 93 Q27 77 31 96 Q39 105 53 101 M56 87 Q78 68 80 87 Q72 99 55 98 M57 40 C43 35 40 54 53 58 C68 63 72 43 57 40",
  },
  {
    name: "a little star",
    path: "M54 12 L63 44 L96 39 L73 62 L87 94 L55 77 L25 98 L33 65 L8 46 L42 43 Z M43 58 L44 62 M62 55 L63 59 M47 68 Q55 75 63 66 M9 16 L19 26 M87 13 L82 26 M98 112 L88 102 M9 107 L19 94",
  },
  {
    name: "two humans holding hands",
    path: "M23 16 C3 15 5 44 22 44 C43 44 41 17 23 16 M22 44 L20 83 L7 110 M20 83 L34 110 M21 54 L4 73 M21 56 L51 68 M78 15 C59 12 58 42 76 43 C97 43 98 16 78 15 M77 43 L79 83 L65 111 M79 83 L94 110 M78 56 L51 68 M78 55 L99 71 M17 28 L17 30 M28 28 L28 30 M17 35 Q23 39 29 34 M71 27 L71 30 M83 27 L83 30 M70 35 Q77 40 85 34",
  },
];

export default function PocketDoodle() {
  const [drawing, setDrawing] = useState(0);
  return (
    <button
      className="pocket-doodle"
      type="button"
      onClick={() => setDrawing((value) => (value + 1) % drawings.length)}
      aria-label={`Draw another doodle; currently ${drawings[drawing].name}`}
    >
      <svg key={drawing} viewBox="0 0 110 120" fill="none" aria-hidden="true">
        <path d={drawings[drawing].path} pathLength="1" />
      </svg>
      <span>click to doodle</span>
    </button>
  );
}
