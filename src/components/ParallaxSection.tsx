import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";

type Props = {
  id?: string;
  title: string;
  text: string;
  visualUrl?: string;
  reverse?: boolean;
};

export default function ParallaxSection({ id, title, text, visualUrl, reverse }: Props) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const { transform: bgTransform } = useParallax(bgRef, 0.06);
  const { transform: imgTransform } = useParallax(imgRef, 0.12);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(contentRef, { threshold: 0.35 });

  return (
    <section id={id} className="relative overflow-hidden">
      <div aria-hidden ref={bgRef} style={{ transform: bgTransform }} className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.065]"
             style={{ background: "radial-gradient(70% 70% at 10% 10%, #C8A96A 0%, transparent 70%)" }} />
      </div>
      <div className={cn("container mx-auto grid gap-10 px-6 py-28 md:py-36",
        "md:grid-cols-2", reverse ? "md:[&>*:first-child]:order-2" : "")}>
        <div ref={contentRef}
             className={cn(
               "max-w-xl self-center",
               "transition-all duration-700",
               inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
             )}>
          <h2 className="font-serif text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-5 text-ink-100 leading-relaxed">{text}</p>
        </div>
        <div className="relative">
          <div
            ref={imgRef}
            style={{ transform: imgTransform }}
            className="mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-ink-800 shadow-soft"
          >
            {visualUrl ? (
              <img
                src={visualUrl}
                alt=""
                className="h-full w-full object-cover opacity-90"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-ink-700 to-ink-800" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
