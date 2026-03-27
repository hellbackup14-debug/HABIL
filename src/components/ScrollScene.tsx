import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  text: string;
  visualUrl?: string;
  accent?: "gold" | "blush";
  reverse?: boolean;
  heightVh?: number;
};

export default function ScrollScene({
  title,
  text,
  visualUrl,
  accent = "gold",
  reverse,
  heightVh = 220,
}: Props) {
  const decoColor = accent === "gold" ? "#C8A96A" : "#D8A7B1";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      if (frame.current != null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = Math.max(1, rect.height - vh);
        const raw = -rect.top;
        const p = clamp(raw / total, 0, 1);
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const px = progress > 0 ? pointer.x : 0;
  const py = progress > 0 ? pointer.y : 0;

  const titleY = lerp(24, 0, ease(progress));
  const textY = lerp(36, 0, ease(progress));
  const imgY = lerp(28, 0, ease(progress));
  const imgScale = lerp(1.06, 1.0, ease(progress));
  const bgX = lerp(-22, 0, ease(progress)) + px * 24;
  const bgY = lerp(10, 0, ease(progress)) + py * 24;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `min(${heightVh}svh, ${heightVh}vh)` }}
      onMouseMove={(e) => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setPointer({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        const el = sectionRef.current;
        if (!t || !el) return;
        const r = el.getBoundingClientRect();
        const x = (t.clientX - r.left) / r.width - 0.5;
        const y = (t.clientY - r.top) / r.height - 0.5;
        setPointer({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
      }}
    >
      <div className="sticky top-0 h-[100svh]">
        <div className="absolute inset-0">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 blur-2xl"
            style={{
              background: `radial-gradient(60% 60% at 50% 30%, ${decoColor}22 0%, transparent 70%)`,
              transform: `translate3d(${Math.round(bgX)}px, ${Math.round(bgY)}px, 0)`,
              transition: "transform 900ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              background: `radial-gradient(70% 70% at 15% 10%, ${decoColor}18 0%, transparent 70%)`,
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay grain" />
        </div>
        <div className={cn("container mx-auto grid h-full px-6", "md:grid-cols-2")}>
          <div
            className={cn("self-center transition-all duration-[700ms]", reverse ? "md:order-2" : "")}
            style={{
              opacity: clamp(ease(progress) * 1.15, 0, 1),
              transform: `translate3d(${Math.round(px * 10)}px, ${Math.round(titleY + py * 10)}px, 0)`,
            }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl">{title}</h2>
            <p
              className="mt-5 max-w-xl text-ink-100 leading-relaxed transition-all duration-[700ms]"
              style={{
                transform: `translate3d(${Math.round(px * 8)}px, ${Math.round(textY + py * 8)}px, 0)`,
              }}
            >
              {text}
            </p>
          </div>
          <div className={cn("relative self-center", reverse ? "md:order-1" : "")}>
            <div
              className={cn(
                "mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-ink-800 shadow-soft transition-all duration-[700ms]",
              )}
              style={{
                transform: `translate3d(${Math.round(px * 18)}px, ${Math.round(imgY + py * 18)}px, 0) scale(${imgScale})`,
                opacity: clamp(ease(progress) * 1.15, 0.85, 1),
              }}
            >
              {visualUrl ? (
                <img src={visualUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-ink-700 to-ink-800" />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.10]"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 20%, transparent 40%)",
                  transform: "translate3d(-35%,0,0)",
                  animation: "shimmer 2.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ease(t: number) {
  return Math.max(0, Math.min(1, t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t));
}
