import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/useParallax";

type Props = {
  onStart?: () => void;
};

export default function Hero({ onStart }: Props) {
  const decoRef = useRef<HTMLDivElement | null>(null);
  const { transform } = useParallax(decoRef, 0.08);

  return (
    <section
      className={cn(
        "relative min-h-[100svh] overflow-hidden",
        "bg-gradient-to-b from-ink-900 via-ink-900 to-ink-800",
      )}
    >
      <div
        aria-hidden
        ref={decoRef}
        style={{ transform }}
        className="pointer-events-none absolute inset-x-0 top-[-20%] h-[60vh]"
      >
        <div className="mx-auto h-full max-w-3xl opacity-20 blur-2xl"
             style={{ background: "radial-gradient(60% 60% at 50% 30%, #C8A96A22 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl tracking-tight sm:text-6xl lg:text-7xl">
            Happy Birthday, <span className="text-gold-300">Muthia</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-100">
            On this gentle day, I celebrate you—your laughter, your light, and the way
            you turn simple moments into something beautiful. Thank you for being my favorite chapter.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={onStart}
              className={cn(
                "rounded-full bg-gold-400 px-7 py-3 text-ink-900 font-medium shadow-soft",
                "transition-transform hover:-translate-y-0.5 active:translate-y-0",
              )}
            >
              Start
            </button>
            <span className="text-sm text-ink-100">Scroll for a little story</span>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="h-16 w-px rounded-full bg-gradient-to-b from-gold-300/30 to-gold-300/0" />
          </div>
        </div>
      </div>
    </section>
  );
}
