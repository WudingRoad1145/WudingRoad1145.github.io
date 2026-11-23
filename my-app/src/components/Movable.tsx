"use client";
import {
  useRef,
  useId,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from "react";
let highest = 20;
/** Pointer and keyboard movement share the same bounds. A drag never follows a link. */
export default function Movable({
  children,
  label,
  x,
  y,
  angle = 0,
  className = "",
  onOpen,
}: {
  children: ReactNode;
  label: string;
  x: number;
  y: number;
  angle?: number;
  className?: string;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const helpId = useId();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [z, setZ] = useState(1);
  const drag = useRef<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const clamp = useCallback((x: number, y: number) => {
    const el = ref.current;
    if (!el?.parentElement) return { x, y };
    return {
      x: Math.max(
        8 - el.offsetLeft,
        Math.min(
          el.parentElement.clientWidth - el.offsetWidth - el.offsetLeft - 8,
          x,
        ),
      ),
      y: Math.max(
        8 - el.offsetTop,
        Math.min(
          el.parentElement.clientHeight - el.offsetHeight - el.offsetTop - 8,
          y,
        ),
      ),
    };
  }, []);
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver(() =>
      setPosition((p) => clamp(p.x, p.y)),
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [clamp]);
  return (
    <button
      ref={ref}
      type="button"
      className={`movable ${className}`}
      aria-label={label}
      aria-describedby={helpId}
      style={
        {
          left: `${x}%`,
          top: `${y}%`,
          transform: `translate(${position.x}px, ${position.y}px) rotate(${angle}deg)`,
          zIndex: z,
        } as CSSProperties
      }
      onFocus={() => setZ(++highest)}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        suppressClick.current = false;
        drag.current = {
          x: event.clientX,
          y: event.clientY,
          startX: position.x,
          startY: position.y,
          moved: false,
        };
        setZ(++highest);
      }}
      onPointerMove={(event) => {
        const d = drag.current;
        if (!d) return;
        const dx = event.clientX - d.x,
          dy = event.clientY - d.y;
        if (Math.hypot(dx, dy) > 5) d.moved = true;
        if (d.moved) setPosition(clamp(d.startX + dx, d.startY + dy));
      }}
      onPointerUp={() => {
        suppressClick.current = !!drag.current?.moved;
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
        suppressClick.current = true;
      }}
      onClick={() => {
        if (!suppressClick.current) onOpen();
        suppressClick.current = false;
      }}
      onKeyDown={(event) => {
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [-12, 0],
          ArrowRight: [12, 0],
          ArrowUp: [0, -12],
          ArrowDown: [0, 12],
        };
        if (moves[event.key]) {
          event.preventDefault();
          const [dx, dy] = moves[event.key];
          setPosition((p) => clamp(p.x + dx, p.y + dy));
        } else if (event.key === "Enter" || event.key === " ")
          suppressClick.current = false;
      }}
    >
      {children}
      <span id={helpId} className="sr-only">
        Drag to move. Arrow keys move the object. Enter opens it.
      </span>
    </button>
  );
}
