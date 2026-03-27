import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import FlowerOverlay from "./FlowerOverlay";
import FireworkOverlay from "./FireworkOverlay";

type Props = {
  onStart: () => void;
};


export default function WelcomeGate({ onStart }: Props) {
  const [closing, setClosing] = useState(false);
  const [showFirework, setShowFirework] = useState(false);

  // Show firework after fade-in
  useEffect(() => {
    if (!closing) {
      const t = setTimeout(() => setShowFirework(true), 900);
      return () => clearTimeout(t);
    } else {
      setShowFirework(false);
    }
  }, [closing]);

  const start = () => {
    setClosing(true);
    window.setTimeout(() => onStart(), 760);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[140] flex items-center justify-center overflow-hidden bg-black px-6",
        "transition-opacity duration-700",
        closing ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      {/* Animated flower overlay, like the reference */}
      <FlowerOverlay />
      {/* Firework celebration overlay with sound */}
      <FireworkOverlay trigger={showFirework} />
      <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-black/80" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-black/80" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-5 text-xs uppercase tracking-[0.34em] text-gold-300/85 opacity-0 animate-fadein-up" style={{animationDelay:'0.25s', animationFillMode:'both'}}>Private Birthday Web</p>
        <h1 className="font-serif text-5xl text-white sm:text-6xl">
          {"HAI MUTHIA".split("").map((ch, idx) => (
            <span
              key={`${ch}-${idx}`}
              className={cn("inline-block cinematic-letter", ch === " " ? "w-[0.38em]" : "")}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ink-100/90 sm:text-base opacity-0 animate-fadein-up" style={{animationDelay:'0.5s', animationFillMode:'both'}}>
          Aku membuat sesuatu untuk mu hari ini.
        </p>
        <button
          onClick={start}
          className={cn(
            "mt-9 rounded-full bg-gold-400 px-8 py-3 text-sm font-medium text-ink-900 shadow-soft opacity-0 animate-fadein-up",
            "transition-transform hover:-translate-y-0.5 active:translate-y-0",
          )}
          style={{animationDelay:'1.1s', animationFillMode:'both'}}
        >
          Klik Ini Yaa
        </button>
      </div>
    </div>
  );
}
