import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

type Props = {
  active?: boolean;
  pointerX?: number;
  pointerY?: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items?: string[];
  note?: string;
  children?: ReactNode;
};

export default function CarouselPanel({
  active = false,
  pointerX = 0,
  pointerY = 0,
  eyebrow,
  title,
  subtitle,
  items,
  note,
  children,
}: Props) {
  const px = active ? pointerX : 0;
  const py = active ? pointerY : 0;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!active && sectionRef.current) {
      sectionRef.current.scrollTo({ top: 0 });
    }
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center",
        active ? "pointer-events-auto" : "pointer-events-none"
      )}
      style={{
        background:
          "radial-gradient(40% 40% at 20% 20%, rgba(200,169,106,0.18) 0%, transparent 70%), radial-gradient(35% 35% at 80% 70%, rgba(90,110,160,0.14) 0%, transparent 70%), linear-gradient(180deg, #040406 0%, #08080d 48%, #020204 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 20%, rgba(200,169,106,0.18) 0%, transparent 70%), radial-gradient(35% 35% at 80% 70%, rgba(90,110,160,0.14) 0%, transparent 70%), linear-gradient(180deg, #040406 0%, #08080d 48%, #020204 100%)",
          transform: `translate3d(${Math.round(px * -24)}px, ${Math.round(py * -24)}px, 0)`,
          transition: "transform 700ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay grain" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-black/70" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-black/80" />

      <div className="relative z-10 w-full max-w-2xl px-4 text-center select-none">
        {eyebrow && (
          <CinematicLine
            text={eyebrow}
            as="p"
            className="text-xs sm:text-sm uppercase tracking-[0.32em] text-gold-300/95 drop-shadow-md mb-2"
            active={active}
            delay={0.1}
            parallax={px * 10}
          />
        )}
        <CinematicLine
          text={title}
          as="h2"
          className="mt-2 font-serif text-5xl sm:text-6xl md:text-7xl leading-tight text-white drop-shadow-[0_2px_16px_rgba(200,169,106,0.18)]"
          active={active}
          delay={0.3}
          parallax={py * 18}
        />
        {subtitle && (
          <CinematicLine
            text={subtitle}
            as="p"
            className="mt-7 text-xl sm:text-2xl font-light leading-relaxed text-ink-100/90 italic drop-shadow-md"
            active={active}
            delay={0.7}
            parallax={px * 8}
          />
        )}
        {children}
        {note && (
          <CinematicLine
            text={note}
            as="p"
            className="mt-10 text-lg sm:text-xl text-gold-300/80 italic font-serif drop-shadow-md"
            active={active}
            delay={1.1}
            parallax={py * 6}
          />
        )}
      </div>
    </section>
  );
}


type CinematicLineProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  active: boolean;
  delay?: number;
  parallax?: number;
};

function CinematicLine({ text, as = "p", className = "", active, delay = 0, parallax = 0 }: CinematicLineProps) {
  const Tag = as as any;
  return (
    <Tag
      className={cn(
        className,
        "transition-all duration-1000 will-change-transform",
        active ? "opacity-100 blur-0" : "opacity-0 blur-[2px]",
      )}
      style={{
        transitionDelay: `${delay}s`,
        transform: active
          ? `translate3d(0,${Math.round(parallax)}px,0)`
          : `translate3d(0,32px,0)`,
      }}
    >
      {text}
    </Tag>
  );
}
