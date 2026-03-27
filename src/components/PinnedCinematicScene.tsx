import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  text: string;
  imageUrl: string;
  reverse?: boolean;
};

export default function PinnedCinematicScene({ title, subtitle, text, imageUrl, reverse }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      if (frame.current != null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = Math.max(1, rect.height - vh);
        const raw = -rect.top;
        setProgress(clamp(raw / total, 0, 1));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  const eased = ease(progress);
  const textOpacity = clamp(eased * 1.3, 0, 1);
  const textY = lerp(36, 0, eased) + mouse.y * 12;
  const visualY = lerp(24, -8, eased) + mouse.y * 16;
  const visualX = mouse.x * 18;
  const visualScale = lerp(1.08, 1.02, eased);
  const bgY = lerp(18, -16, eased) + mouse.y * 20;

  return (
    <section
      ref={ref}
      className="relative h-[210svh]"
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setMouse({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
      }}
      onTouchMove={(e) => {
        const t = e.touches[0];
        const el = ref.current;
        if (!t || !el) return;
        const r = el.getBoundingClientRect();
        const x = (t.clientX - r.left) / r.width - 0.5;
        const y = (t.clientY - r.top) / r.height - 0.5;
        setMouse({ x: clamp(x, -0.5, 0.5), y: clamp(y, -0.5, 0.5) });
      }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ transform: `translate3d(0, ${Math.round(bgY)}px, 0)` }}
        >
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover opacity-45"
            style={{ transform: `scale(${visualScale})` }}
          />
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay grain" />
        <div className={cn("container relative z-10 mx-auto grid h-full px-6", "md:grid-cols-2")}>
          <div className={cn("self-center", reverse ? "md:order-2" : "")}>
            {subtitle && (
              <p className="mb-3 text-xs uppercase tracking-[0.26em] text-gold-300/90">{subtitle}</p>
            )}
            <h2
              className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
              style={{
                opacity: textOpacity,
                transform: `translate3d(${Math.round(mouse.x * 10)}px, ${Math.round(textY)}px, 0)`,
              }}
            >
              {title}
            </h2>
            <p
              className="mt-5 max-w-xl text-sm leading-relaxed text-ink-100 sm:text-base"
              style={{
                opacity: clamp(textOpacity * 0.96, 0, 1),
                transform: `translate3d(${Math.round(mouse.x * 8)}px, ${Math.round(textY + 10)}px, 0)`,
              }}
            >
              {text}
            </p>
          </div>
          <div className={cn("relative self-center", reverse ? "md:order-1" : "")}>
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-soft"
              style={{
                transform: `translate3d(${Math.round(visualX)}px, ${Math.round(visualY)}px, 0)`,
                opacity: clamp(textOpacity, 0.65, 1),
              }}
            >
              <img src={imageUrl} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.24) 20%, transparent 40%)",
                  animation: "shimmer 2.6s ease-in-out infinite",
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
