import { cn } from "@/lib/utils";

type Item = { src: string; title?: string; desc?: string };
type Props = { items: Item[]; title?: string };

export default function SceneCardGrid({ items, title = "Moments" }: Props) {
  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-24 md:py-36">
        <h3 className="font-serif text-2xl">{title}</h3>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((it, idx) => (
            <Card key={idx} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ src, title, desc }: Item) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-800 shadow-soft",
        "ring-0 transition-all duration-300 hover:scale-[1.02] hover:ring-1 hover:ring-gold-300/60",
      )}
    >
      <img src={src} alt={title ?? ""} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {(title || desc) && (
        <div className="absolute inset-x-0 bottom-0 p-4 text-ink-50">
          {title && <div className="font-medium">{title}</div>}
          {desc && <div className="mt-1 text-sm text-ink-100">{desc}</div>}
        </div>
      )}
    </div>
  );
}
