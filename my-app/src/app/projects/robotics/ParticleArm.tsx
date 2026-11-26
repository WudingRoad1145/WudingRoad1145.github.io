"use client";

import { useEffect, useRef } from "react";
import s from "./robotics.module.css";

type Point = {
  x: number;
  y: number;
  opacity: number;
  radius: number;
  segment: number;
};
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
    const segment =
      shapes.slice(4).some((shape) => inside(x, y, shape)) ||
      joint === joints[3]
        ? 3
        : inside(x, y, shapes[3]) || joint === joints[2]
          ? 2
          : inside(x, y, shapes[2]) || joint === joints[1]
            ? 1
            : 0;
    points.push({
      segment,
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
    const segments = Array.from(
      svg.querySelectorAll<SVGGElement>("g[data-arm-segment]"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shoulder = { x: 77, y: 148 };
    const homeElbow = { x: 62, y: 82 };
    const homeWrist = { x: 148, y: 53 };
    const lowerLength = Math.hypot(
      homeElbow.x - shoulder.x,
      homeElbow.y - shoulder.y,
    );
    const upperLength = Math.hypot(
      homeWrist.x - homeElbow.x,
      homeWrist.y - homeElbow.y,
    );
    const lowerRest = Math.atan2(
      homeElbow.y - shoulder.y,
      homeElbow.x - shoulder.x,
    );
    const upperRest = Math.atan2(
      homeWrist.y - homeElbow.y,
      homeWrist.x - homeElbow.x,
    );
    let current = { ...homeWrist };
    let target = { ...homeWrist };
    let frame = 0;
    let lastTime = 0;
    let returning = false;
    const clamp = (n: number, low: number, high: number) =>
      Math.max(low, Math.min(high, n));

    // Two-link inverse kinematics: rigid particle links share the same joints.
    // The wrist compensates to keep the gripper's orientation steady.
    const pose = (wrist: { x: number; y: number }) => {
      const dx = wrist.x - shoulder.x,
        dy = wrist.y - shoulder.y;
      const distance = Math.hypot(dx, dy);
      const lowerAngle =
        Math.atan2(dy, dx) -
        Math.acos(
          clamp(
            (lowerLength ** 2 + distance ** 2 - upperLength ** 2) /
              (2 * lowerLength * distance),
            -1,
            1,
          ),
        );
      const elbow = {
        x: shoulder.x + Math.cos(lowerAngle) * lowerLength,
        y: shoulder.y + Math.sin(lowerAngle) * lowerLength,
      };
      const upperAngle = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
      const transform = (
        segment: number,
        angle: number,
        from: { x: number; y: number },
        to: { x: number; y: number },
      ) => {
        const c = Math.cos(angle),
          sn = Math.sin(angle);
        const tx = to.x - c * from.x + sn * from.y;
        const ty = to.y - sn * from.x - c * from.y;
        segments[segment].setAttribute(
          "transform",
          `matrix(${c.toFixed(6)} ${sn.toFixed(6)} ${(-sn).toFixed(6)} ${c.toFixed(6)} ${tx.toFixed(4)} ${ty.toFixed(4)})`,
        );
      };
      transform(1, lowerAngle - lowerRest, shoulder, shoulder);
      transform(2, upperAngle - upperRest, homeElbow, elbow);
      transform(3, 0, homeWrist, wrist);
    };
    const animate = (now: number) => {
      const step = lastTime ? Math.min((now - lastTime) / 16.67, 3) : 1;
      lastTime = now;
      const easing = 1 - Math.pow(0.8, step);
      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;
      const settled =
        Math.hypot(target.x - current.x, target.y - current.y) < 0.03;
      if (settled) current = { ...target };
      pose(current);
      if (settled && returning)
        segments.forEach((segment) => segment.removeAttribute("transform"));
      frame = settled ? 0 : requestAnimationFrame(animate);
      if (!frame) lastTime = 0;
    };
    const schedule = () => {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(animate);
    };
    const guide = (x: number, y: number) => {
      returning = false;
      target = { x: clamp(x, 105, 168), y: clamp(y, 35, 95) };
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType === "touch") return;
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const pointer = new DOMPoint(
        event.clientX,
        event.clientY,
      ).matrixTransform(matrix.inverse());
      // Map the small drawing to a bounded, reachable workspace. Nothing
      // outside the illustration moves, and the arm cannot fold into its base.
      guide(
        105 + clamp(pointer.x / 220, 0, 1) * 63,
        35 + clamp(pointer.y / 210, 0, 1) * 60,
      );
    };
    const rest = () => {
      if (reduced.matches) return;
      returning = true;
      target = { ...homeWrist };
      schedule();
    };
    const key = (event: KeyboardEvent) => {
      if (reduced.matches) return;
      const direction: Record<string, [number, number]> = {
        ArrowLeft: [-6, 0],
        ArrowRight: [6, 0],
        ArrowUp: [0, -6],
        ArrowDown: [0, 6],
      };
      if (event.key === "Home" || event.key === "Escape") {
        event.preventDefault();
        rest();
      } else if (direction[event.key]) {
        event.preventDefault();
        const [x, y] = direction[event.key];
        guide(target.x + x, target.y + y);
      }
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      current = { ...homeWrist };
      target = { ...homeWrist };
      segments.forEach((segment) => segment.removeAttribute("transform"));
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", rest);
    svg.addEventListener("keydown", key);
    svg.addEventListener("blur", rest);
    reduced.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reset);
    return () => {
      reset();
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", rest);
      svg.removeEventListener("keydown", key);
      svg.removeEventListener("blur", rest);
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
      tabIndex={0}
      aria-label="A particle robot arm. Move the pointer here or use arrow keys to guide it"
    >
      {["base", "lower", "upper", "gripper"].map((name, segment) => (
        <g key={name} data-arm-segment={name}>
          {points
            .filter((point) => point.segment === segment)
            .map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={point.radius}
                opacity={point.opacity}
                fill="currentColor"
              />
            ))}
        </g>
      ))}
    </svg>
  );
}
