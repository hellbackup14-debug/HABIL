import { useEffect, useState, type RefObject } from "react";

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  opts?: { threshold?: number; rootMargin?: string; once?: boolean },
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (opts?.once !== false) observer.disconnect();
        } else if (opts?.once === false) {
          setInView(false);
        }
      },
      {
        threshold: opts?.threshold ?? 0.2,
        rootMargin: opts?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, opts?.once, opts?.rootMargin, opts?.threshold]);

  return inView;
}
