import { useEffect, useRef, useState, type RefObject } from "react";

export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  speed = 0.15,
) {
  const frame = useRef<number | null>(null);
  const [transform, setTransform] = useState<string>("translate3d(0,0,0)");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 0;
        const center = rect.top + rect.height / 2;
        const distanceFromCenter = center - vh / 2;
        const delta = distanceFromCenter * speed;
        setTransform(`translate3d(0, ${Math.round(delta)}px, 0)`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current != null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, [ref, speed]);

  return { transform };
}
