import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onEnter: () => void;
};

export default function CinematicOverlay({ onEnter }: Props) {
  const [closing, setClosing] = useState(false);

  const handleEnter = () => {
    setClosing(true);
    window.setTimeout(() => onEnter(), 680);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[120] overflow-hidden bg-black transition-all duration-700",
        closing ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1920&auto=format&fit=crop"
        alt=""
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          "scale-110 transition-transform duration-[2600ms] ease-out",
          closing ? "scale-105" : "scale-110",
        )}
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/75" />
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay grain" />
      <div className="absolute inset-x-0 top-0 h-20 bg-black/70" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-black/75" />

      <div className="relative flex h-full items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.32em] text-ink-100/85">Sebuah Cerita Ulang Tahun Sinematik</p>
          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
            Untuk Muthia,
            <br />
            dengan seluruh cintaku
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-100/90 sm:text-base">
            Sebuah film kecil yang lembut dari kenangan, kehangatan, dan satu kejutan spesial di akhir.
          </p>
          <div className="mt-9 flex items-center justify-center gap-3">
            <button
              onClick={handleEnter}
              className={cn(
                "rounded-full bg-gold-400 px-8 py-3 text-sm font-medium tracking-wide text-ink-900 shadow-soft",
                "transition-transform hover:-translate-y-0.5 active:translate-y-0",
              )}
            >
              Enter Experience
            </button>
          </div>
          <p className="mt-4 text-xs tracking-[0.2em] text-ink-100/65">BEST WITH SOUND ON</p>
        </div>
      </div>
    </div>
  );
}
