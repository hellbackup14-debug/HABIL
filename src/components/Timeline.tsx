import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Item = { title: string; date?: string; text?: string };
type Props = { items: Item[] };

export default function Timeline({ items }: Props) {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <h3 className="font-serif text-2xl">Little Highlights</h3>
        <div className="mt-10">
          <div className="relative">
            <div className="absolute left-3 top-0 h-full w-px bg-ink-700" />
            <ul className="space-y-10">
              {items.map((it, idx) => (
                <TimelineItem key={idx} {...it} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ title, date, text }: Item) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-10",
        "transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      )}
    >
      <span className="absolute left-0 top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gold-300" />
      <div className="text-sm text-ink-100">{date}</div>
      <div className="mt-1 font-medium">{title}</div>
      {text && <p className="mt-2 max-w-2xl text-ink-100">{text}</p>}
    </li>
  );
}
