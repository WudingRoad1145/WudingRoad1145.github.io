"use client";
import {
  useRef,
  useId,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
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
  onExplore,
  staticOnMobile = false,
  boundsRef,
}: {
  children: ReactNode;
  label: string;
  x: number;
  y: number;
  angle?: number;
  className?: string;
  onOpen: () => void;
  onExplore?: () => void;
  staticOnMobile?: boolean;
  boundsRef?: RefObject<HTMLElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
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
  const [mobileDragDisabled, setMobileDragDisabled] = useState(false);
  useEffect(() => {
    if (!staticOnMobile) return;
    const media = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const update = () => {
      setMobileDragDisabled(media.matches);
      if (media.matches) {
        drag.current = null;
        suppressClick.current = false;
        setPosition({ x: 0, y: 0 });
      }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [staticOnMobile]);
  useEffect(() => {
    if (Math.hypot(position.x, position.y) >= 64) onExplore?.();
  }, [position, onExplore]);
  const clamp = useCallback(
    (x: number, y: number) => {
      const el = ref.current;
      if (!el?.parentElement) return { x, y };
      if (boundsRef?.current) {
        // A keepsake anchored to the intro can still move across the whole desk.
        const bounds = boundsRef.current.getBoundingClientRect();
        const box = el.getBoundingClientRect();
        const translation = new DOMMatrixReadOnly(
          getComputedStyle(el).transform,
        );
        const left = box.left - translation.m41;
        const top = box.top - translation.m42;
        return {
          x: Math.max(
            bounds.left + 8 - left,
            Math.min(bounds.right - 8 - box.width - left, x),
          ),
          y: Math.max(
            bounds.top + 8 - top,
            Math.min(bounds.bottom - 8 - box.height - top, y),
          ),
        };
      }
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
    },
    [boundsRef],
  );
  useEffect(() => {
    const parent = boundsRef?.current ?? ref.current?.parentElement;
    if (!parent || mobileDragDisabled) return;
    const observer = new ResizeObserver(() =>
      setPosition((p) => clamp(p.x, p.y)),
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, [boundsRef, clamp, mobileDragDisabled]);
  return (
    <div
      ref={ref}
      className={`movable ${staticOnMobile ? "movable-static-mobile" : ""} ${className}`}
      style={
        {
          left: `var(--object-x, ${x}%)`,
          top: `var(--object-y, ${y}%)`,
          transform: `translate(${mobileDragDisabled ? 0 : position.x}px, ${mobileDragDisabled ? 0 : position.y}px) rotate(${angle}deg)`,
          zIndex: z,
        } as CSSProperties
      }
      onFocus={() => setZ(++highest)}
      onPointerDown={(event) => {
        if (event.button !== 0 || mobileDragDisabled) return;
        const button = (event.target as HTMLElement).closest("button");
        // A swipe on the object belongs to the page; only its handle owns touch dragging.
        if (
          event.pointerType === "touch" &&
          !button?.hasAttribute("data-drag-handle")
        )
          return;
        button?.setPointerCapture(event.pointerId);
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
        if (!d || mobileDragDisabled) return;
        const dx = event.clientX - d.x,
          dy = event.clientY - d.y;
        if (Math.hypot(dx, dy) > 5) d.moved = true;
        if (d.moved) setPosition(clamp(d.startX + dx, d.startY + dy));
      }}
      onPointerUp={() => {
        if (!drag.current) return;
        suppressClick.current = drag.current.moved;
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
        suppressClick.current = true;
      }}
      onKeyDown={(event) => {
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [-12, 0],
          ArrowRight: [12, 0],
          ArrowUp: [0, -12],
          ArrowDown: [0, 12],
        };
        if (moves[event.key] && !mobileDragDisabled) {
          event.preventDefault();
          const [dx, dy] = moves[event.key];
          setPosition((p) => clamp(p.x + dx, p.y + dy));
        } else if (event.key === "Enter" || event.key === " ")
          suppressClick.current = false;
      }}
    >
      <button
        type="button"
        className="movable-open"
        aria-label={label}
        aria-describedby={helpId}
        onPointerDown={(event) => {
          if (event.pointerType === "touch") suppressClick.current = false;
        }}
        onClick={() => {
          if (!suppressClick.current) onOpen();
          suppressClick.current = false;
        }}
      >
        {children}
      </button>
      <button
        type="button"
        className="movable-handle"
        data-drag-handle
        aria-label={`Move object: ${label}`}
        aria-describedby={helpId}
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 3v18M3 12h18M8 7l4-4 4 4M8 17l4 4 4-4M7 8l-4 4 4 4M17 8l4 4-4 4" />
        </svg>
      </button>
      <span id={helpId} className="sr-only">
        {mobileDragDisabled
          ? "Swipe to scroll. Tap the object or press Enter to open it."
          : "Swipe the object to scroll. Drag its move handle to reposition it, or use the arrow keys when focused. Tap the object or press Enter to open it."}
      </span>
    </div>
  );
}
