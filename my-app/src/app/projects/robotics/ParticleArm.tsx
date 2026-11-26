"use client";

import { useEffect, useRef } from "react";
import s from "./robotics.module.css";

type Point = { x: number; y: number; opacity: number; radius: number };
type Polygon = [number, number][];

// An original, small side-view drawing. Deterministic sampling keeps the
// server-rendered illustration visible without JavaScript or animation.
const shapes: Polygon[] = [
  [
    [43, 176],
    [112, 176],
    [125, 189],
    [31, 189],
  ],
  [
    [59, 146],
    [94, 146],
    [101, 176],
    [52, 176],
  ],
  [
    [65, 150],
    [86, 146],
    [73, 81],
    [52, 85],
  ],
  [
    [56, 73],
    [64, 92],
    [153, 62],
    [146, 42],
  ],
  [
    [139, 54],
    [155, 48],
    [177, 95],
    [160, 103],
  ],
  [
    [158, 98],
    [175, 95],
    [181, 108],
    [163, 115],
  ],
  [
    [164, 112],
    [169, 115],
    [160, 130],
    [170, 138],
    [166, 143],
    [152, 131],
  ],
  [
    [177, 108],
    [182, 106],
    [191, 122],
    [184, 138],
    [179, 136],
    [185, 122],
  ],
];
const joints = [
  [77, 148, 14],
  [62, 82, 15],
  [148, 53, 13],
  [167, 100, 10],
];

function inside(x: number, y: number, polygon: Polygon) {
  let hit = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      hit = !hit;
  }
  return hit;
}

const points: Point[] = [];
for (let y = 35; y <= 190; y += 2.5) {
  for (let x = 28; x <= 196; x += 2.5) {
    const joint = joints.find(([cx, cy, r]) => Math.hypot(x - cx, y - cy) < r);
    if (!joint && !shapes.some((shape) => inside(x, y, shape))) continue;
    // Integer hashing avoids engine-specific Math.sin rounding during hydration.
    const seed =
      ((Math.imul(Math.round(x * 2), 374761393) ^
        Math.imul(Math.round(y * 2), 668265263)) >>>
        0) /
        4294967295 -
      0.5;
    const noise = Math.abs(seed) * 2;
    const ring =
      joint &&
      Math.abs(Math.hypot(x - joint[0], y - joint[1]) - joint[2] * 0.7) < 1.8;
    points.push({
      x: x + seed * 0.55,
      y: y + noise * 0.55,
      opacity: ring ? 0.95 : 0.3 + noise * 0.55,
      radius: 0.55 + noise * 0.35,
    });
  }
}

export default function ParticleArm() {
  const drawing = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = drawing.current;
    if (!svg) return;
    const circles = Array.from(svg.querySelectorAll("circle"));
    const offsets = points.map(() => ({ x: 0, y: 0 }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastTime = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const animate = (now: number) => {
      const step = lastTime ? Math.min((now - lastTime) / 16.67, 3) : 1;
      lastTime = now;
      const easing = 1 - Math.pow(0.8, step);
      let moving = false;
      points.forEach((point, i) => {
        const dx = pointer ? point.x - pointer.x : 0;
        const dy = pointer ? point.y - pointer.y : 0;
        const distance = Math.hypot(dx, dy);
        const force = pointer && distance < 34 ? (1 - distance / 34) * 4 : 0;
        const targetX = (dx / Math.max(distance, 1)) * force;
        const targetY = (dy / Math.max(distance, 1)) * force;
        const offset = offsets[i];
        offset.x += (targetX - offset.x) * easing;
        offset.y += (targetY - offset.y) * easing;
        if (Math.abs(targetX - offset.x) + Math.abs(targetY - offset.y) > 0.015)
          moving = true;
        if (!pointer && Math.abs(offset.x) + Math.abs(offset.y) < 0.015) {
          offset.x = offset.y = 0;
          circles[i].removeAttribute("transform");
        } else {
          circles[i].setAttribute(
            "transform",
            `translate(${offset.x.toFixed(3)} ${offset.y.toFixed(3)})`,
          );
        }
      });
      frame = moving ? requestAnimationFrame(animate) : 0;
      if (!frame) lastTime = 0;
    };
    const schedule = () => {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(animate);
    };
    const settle = () => {
      pointer = null;
      clearTimeout(settleTimer);
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      pointer = new DOMPoint(event.clientX, event.clientY).matrixTransform(
        matrix.inverse(),
      );
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 220);
      schedule();
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      frame = 0;
      lastTime = 0;
      pointer = null;
      offsets.forEach((offset, i) => {
        offset.x = offset.y = 0;
        circles[i].removeAttribute("transform");
      });
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", settle);
    reduced.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      reset();
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", settle);
      reduced.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reset);
    };
  }, []);

  return (
    <svg
      ref={drawing}
      className={s.particleArm}
      viewBox="0 0 220 210"
      role="img"
      aria-label="A tabletop robot arm drawn with fine white and gray particles"
    >
      {points.map((point, i) => (
        <circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={point.radius}
          opacity={point.opacity}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
