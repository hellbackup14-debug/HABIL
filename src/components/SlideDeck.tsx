import { Children, ReactElement, cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import FlowerOverlay from "@/components/FlowerOverlay";

type InjectedProps = {
  active?: boolean;
  pointerX?: number;
  pointerY?: number;
};

type DeckProps = {
  children: ReactNode;
  initialIndex?: number;
  duration?: number;
};

export default function SlideDeck({ children, initialIndex = 0, duration = 800 }: DeckProps) {
  const slides = useMemo(() => Children.toArray(children) as ReactElement[], [children]);
  const [index, setIndex] = useState(initialIndex);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const touchStart = useRef<number | null>(null);
  const lastNavAt = useRef<number>(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const pointerFrame = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const total = slides.length;

  const goTo = useCallback((next: number) => {
    if (animating) return;
    const now = Date.now();
    if (now - lastNavAt.current < duration - 100) return;
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    setAnimating(true);
    setIndex(clamped);
    lastNavAt.current = now;
    window.setTimeout(() => setAnimating(false), duration);
  }, [animating, index, total, duration]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) next();
      else prev();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") next();
      if (e.key === "ArrowUp" || e.key === "PageUp") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const startY = touchStart.current;
      const endY = e.changedTouches[0]?.clientY ?? null;
      touchStart.current = null;
      if (startY == null || endY == null) return;
      const diff = endY - startY;
      if (Math.abs(diff) < 40) return;
      if (diff < 0) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  return (
    <div
      ref={rootRef}
      className="relative h-[100svh] w-full overflow-hidden bg-ink-900"
      onMouseMove={(e) => {
        const el = rootRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        if (pointerFrame.current != null) return;
        pointerFrame.current = window.requestAnimationFrame(() => {
          pointerFrame.current = null;
          setPointer({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
        });
      }}
      onTouchMove={(e) => {
        const el = rootRef.current;
        const t = e.touches[0];
        if (!el || !t) return;
        const r = el.getBoundingClientRect();
        const x = (t.clientX - r.left) / r.width - 0.5;
        const y = (t.clientY - r.top) / r.height - 0.5;
        setPointer({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 opacity-[0.055] mix-blend-overlay grain" />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/[0.02] via-transparent to-black/30" />
      <FlowerOverlay />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 z-[35] bg-gradient-to-b from-black/20 via-transparent to-black/20 transition-opacity duration-500",
          animating ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `translate3d(0, ${direction * -6}px, 0)`,
        }}
      />
      <div
        className={cn("absolute inset-0 z-20 will-change-transform")}
        style={{
          transform: `translate3d(0, calc(-100svh * ${index}), 0)`,
          transition: `transform ${duration}ms cubic-bezier(0.19, 0.9, 0.22, 1)`,
          filter: animating ? "blur(0.2px)" : "blur(0px)",
        }}
      >
        {slides.map((child, i) => {
          if (!isValidElement(child)) return child;
          return cloneElement(child as ReactElement<InjectedProps>, {
            active: i === index,
            pointerX: pointer.x,
            pointerY: pointer.y,
          });
        })}
      </div>

      {/* Slide indicator removed for cinematic mystery */}

      <div className="absolute right-4 top-4 z-40 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              i === index ? "w-7 bg-gold-300" : "w-2.5 bg-white/35 hover:bg-white/60",
            )}
            aria-label={`Go to scene ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation buttons removed for surprise cinematic effect */}
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
