"use client";
import { useEffect, useRef, useState } from "react";
import s from "@/app/projects/babymilu/story.module.css";
const asset = (name: string) => `/babymilu/${name}`;

export default function MiluBuddy() {
  const ref = useRef<HTMLButtonElement>(null);
  const [happy, setHappy] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (media.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty(
          "--look-x",
          `${Math.max(-9, Math.min(9, (event.clientX - r.left - r.width / 2) / 35))}px`,
        );
        el.style.setProperty(
          "--look-y",
          `${Math.max(-6, Math.min(6, (event.clientY - r.top - r.height / 3) / 45))}px`,
        );
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className={s.buddyWrap}>
      <span className={s.hello} aria-live="polite">
        {happy ? "happy to see you!" : "oh, hello there."}
      </span>
      <button
        ref={ref}
        type="button"
        className={s.buddy}
        onClick={() => setHappy(!happy)}
        aria-label={happy ? "Let Milu relax" : "Say hello to Milu"}
        aria-pressed={happy}
      >
        <span className={s.face}>
          <svg viewBox="0 0 200 200" role="presentation" aria-hidden="true">
            <circle cx="100" cy="100" r="100" fill="#fff6eb" />
            <path
              d="M35 40 Q100 8 165 40"
              stroke="#e8d1ba"
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            <g className={s.pupils}>
              {happy ? (
                <>
                  <path
                    d="M45 100 Q62 77 79 100 M121 100 Q138 77 155 100"
                    stroke="#4a3442"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <ellipse cx="61" cy="94" rx="14" ry="21" fill="#4a3442" />
                  <ellipse cx="139" cy="94" rx="14" ry="21" fill="#4a3442" />
                  <circle cx="66" cy="87" r="5" fill="white" />
                  <circle cx="144" cy="87" r="5" fill="white" />
                </>
              )}
              <ellipse cx="37" cy="122" rx="16" ry="8" fill="#f7b5cb" />
              <ellipse cx="163" cy="122" rx="16" ry="8" fill="#f7b5cb" />
              <path
                d={
                  happy
                    ? "M83 131 Q100 157 117 131 Z"
                    : "M87 134 Q100 146 113 134"
                }
                fill={happy ? "#d85c89" : "none"}
                stroke="#4a3442"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </span>
        <img
          src={asset("plush-body.webp")}
          alt="BabyMilu in its soft gray and white plush body"
          width="1138"
          height="972"
          fetchPriority="high"
        />
      </button>
      <span className={s.buddyHint}>
        a little company while you read · tap to say hi
      </span>
    </div>
  );
}
