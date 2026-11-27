"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";

type HomeSpot = { url: string; y: number; section?: string; offset?: number };
const homeKey = "portfolioHomeSpot";
const originKey = "portfolioHomeOrigin";
const ReturnContext = createContext<{
  origin: HomeSpot | null;
  restore: (spot: HomeSpot) => void;
}>({ origin: null, restore: () => {} });

/** Keep return points on history entries, so direct visits and other tabs stay independent. */
export function HomeReturnProvider({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const previousPath = useRef<string | null>(null);
  const homeSpot = useRef<HomeSpot | null>(null);
  const pendingReturn = useRef<HomeSpot | null>(null);
  const popped = useRef(false);
  const [origin, setOrigin] = useState<HomeSpot | null>(null);

  useEffect(() => {
    const remember = () => {
      if (window.location.pathname !== "/") return;
      const section = Array.from(
        document.querySelectorAll<HTMLElement>("main section[id]"),
      )
        .reverse()
        .find((element) => element.getBoundingClientRect().top <= 1);
      const spot: HomeSpot = {
        url:
          window.location.pathname +
          window.location.search +
          window.location.hash,
        y: window.scrollY,
        section: section?.id,
        offset: section ? -section.getBoundingClientRect().top : undefined,
      };
      homeSpot.current = spot;
      window.history.replaceState(
        { ...window.history.state, [homeKey]: spot },
        "",
      );
    };
    const onPop = () => {
      popped.current = window.location.pathname !== previousPath.current;
    };
    document.addEventListener("click", remember, true);
    window.addEventListener("pagehide", remember);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", remember, true);
      window.removeEventListener("pagehide", remember);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useLayoutEffect(() => {
    const previous = previousPath.current;
    previousPath.current = path;
    const isHistoryVisit = popped.current;
    popped.current = false;
    if (path !== "/") {
      const fromHome: HomeSpot | null =
        previous === null || previous === path || isHistoryVisit
          ? (window.history.state?.[originKey] ?? null)
          : previous === "/"
            ? homeSpot.current
            : null;
      window.history.replaceState(
        {
          ...window.history.state,
          [homeKey]: null,
          [originKey]: fromHome,
        },
        "",
      );
      setOrigin(fromHome);
      return;
    }

    const spot: HomeSpot | null =
      pendingReturn.current ?? window.history.state?.[homeKey] ?? null;
    pendingReturn.current = null;
    setOrigin(null);
    window.history.replaceState(
      { ...window.history.state, [homeKey]: spot, [originKey]: null },
      "",
    );
    if (!spot) return;
    homeSpot.current = spot;
    // Next scrolls after committing a route. Restore after that, and accommodate
    // late image/font layout without fighting any new scrolling by the visitor.
    let stopped = false;
    const restore = () => {
      if (stopped) return;
      const section = spot.section
        ? document.getElementById(spot.section)
        : null;
      const y =
        section && spot.offset !== undefined
          ? window.scrollY + section.getBoundingClientRect().top + spot.offset
          : spot.y;
      window.scrollTo({ top: y, behavior: "instant" });
    };
    const observer = new ResizeObserver(restore);
    const stop = () => {
      stopped = true;
      observer.disconnect();
    };
    const frame = requestAnimationFrame(restore);
    observer.observe(document.body);
    const timeout = window.setTimeout(stop, 1500);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", stop);
    return () => {
      stop();
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [path]);

  return (
    <ReturnContext.Provider
      value={{
        origin,
        restore: (spot) => {
          pendingReturn.current = spot;
          router.push(spot.url, { scroll: false });
        },
      }}
    >
      {children}
    </ReturnContext.Provider>
  );
}

export function HomeLink(props: Omit<ComponentProps<typeof Link>, "href">) {
  const { origin, restore } = useContext(ReturnContext);
  return (
    <Link
      {...props}
      href={origin?.url ?? "/"}
      onClick={(event) => {
        props.onClick?.(event);
        if (
          !origin ||
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          props.target === "_blank"
        )
          return;
        event.preventDefault();
        restore(origin);
      }}
    />
  );
}

export function ReturnLink({
  children,
  className,
  onlyFromHome = false,
}: {
  children?: ReactNode;
  className?: string;
  onlyFromHome?: boolean;
}) {
  const { origin } = useContext(ReturnContext);
  if (origin) return <HomeLink className={className}>← Back to home</HomeLink>;
  if (onlyFromHome) return null;
  return (
    <Link href="/projects" className={className}>
      {children ?? "← Back to work"}
    </Link>
  );
}
