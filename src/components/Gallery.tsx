import { useState } from "react";
import { cn } from "@/lib/utils";
 

type Item = { src: string; alt?: string };

type Props = {
  items: Item[];
};

export default function Gallery({ items }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 md:py-32">
        <h3 className="font-serif text-2xl">Moments</h3>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it, idx) => (
            <Card key={idx} index={idx} onOpen={() => setActive(idx)} {...it} />
          ))}
        </div>
      </div>

      {active != null && (
        <div
          className="fixed inset-0 z-50 bg-ink-900/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div className="flex h-full items-center justify-center p-6">
            <div className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-xl bg-ink-800 shadow-soft">
              <img
                src={items[active].src}
                alt={items[active].alt ?? ""}
                className="h-full w-full object-contain"
              />
              <button
                className="absolute right-3 top-3 rounded-full bg-ink-800/80 px-3 py-1 text-sm"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Card({ src, alt, index, onOpen }: Item & { index: number; onOpen: () => void }) {
  const id = `gallery-${index}`;
  return (
    <button
      id={id}
      onClick={onOpen}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-lg bg-ink-800 shadow-soft",
        "focus:outline-none focus:ring-2 focus:ring-gold-300/60",
      )}
    >
      <img src={src} alt={alt ?? ""} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
    </button>
  );
}
