import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  active?: boolean;
  pointerX?: number;
  pointerY?: number;
  title?: string;
  text?: string;
  visualUrl?: string;
  reverse?: boolean;
  accent?: "gold" | "blush";
  children?: ReactNode;
};

export default function Slide({
  active = false,
  pointerX = 0,
  pointerY = 0,
  title,
  text,
  visualUrl,
  reverse,
  accent = "gold",
  children,
}: Props) {
  const decoColor = accent === "gold" ? "#C8A96A" : "#D8A7B1";
  const activeClass = active ? "opacity-100" : "opacity-0";
  const px = active ? pointerX : 0;
  const py = active ? pointerY : 0;

  return (
    <section
      className={cn(
        "relative h-[100svh] w-full overflow-hidden",
        active ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20 blur-2xl transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{
            background: `radial-gradient(60% 60% at 50% 30%, ${decoColor}22 0%, transparent 70%)`,
            transform: active
              ? `translate3d(${Math.round(px * 28)}px, ${Math.round(py * 28)}px, 0)`
              : "translate3d(0,40px,0)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            background: `radial-gradient(70% 70% at 15% 10%, ${decoColor}18 0%, transparent 70%)`,
            transform: `translate3d(${Math.round(px * -18)}px, ${Math.round(py * -18)}px, 0)`,
            transition: "transform 900ms cubic-bezier(0.22,0.61,0.36,1)",
          }}
        />
      </div>
      <div className={cn("container mx-auto grid h-full px-6", "md:grid-cols-2")}>
        <div
          className={cn(
            "self-center transition-all duration-[800ms] will-change-transform",
            activeClass,
            reverse ? "md:order-2" : "",
          )}
          style={{
            transform: active
              ? `translate3d(${Math.round(px * 10)}px, ${Math.round(py * 10)}px, 0)`
              : "translate3d(0, 32px, 0)",
          }}
        >
          {title && <h2 className="font-serif text-4xl sm:text-5xl">{title}</h2>}
          {text && <p className="mt-5 max-w-xl text-ink-100 leading-relaxed">{text}</p>}
          {children}
        </div>
        <div className={cn("relative self-center", reverse ? "md:order-1" : "")}>
          <div
            className={cn(
              "mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-ink-800 shadow-soft",
              "transition-all duration-[800ms] will-change-transform",
              active ? "opacity-100" : "opacity-80",
            )}
            style={{
              transform: active
                ? `translate3d(${Math.round(px * 22)}px, ${Math.round(py * 22)}px, 0) rotate(${px * 1.2}deg) scale(1.01)`
                : "translate3d(0, 14px, 0) scale(0.99)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.10]"
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.22) 20%, transparent 40%)",
                transform: active ? "translate3d(-30%,0,0)" : "translate3d(-60%,0,0)",
                animation: active ? "shimmer 2.4s ease-in-out infinite" : undefined,
              }}
            />
            {visualUrl ? (
              <img src={visualUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-ink-700 to-ink-800" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
