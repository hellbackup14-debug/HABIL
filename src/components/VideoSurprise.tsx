import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Props = {
  src?: string;
  compact?: boolean;
};

export default function VideoSurprise({ src = "/surprise.mp4", compact }: Props) {
  const gateRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(gateRef, { threshold: 0.5 });
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ended, setEnded] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setEnded(false);
  }, [open]);

  const onPlay = async () => {
    setOpen(true);
    setError(false);
    setTimeout(async () => {
      const v = videoRef.current;
      if (!v) return;
      // Only use standard requestFullscreen for modern browsers
      if (typeof v.requestFullscreen === 'function') {
        v.requestFullscreen();
      }
      try {
        await v.play();
        setCanPlay(true);
      } catch {
        setCanPlay(false);
        setError(true);
      }
    }, 100);
  };

  const gate = (
    <div
      ref={gateRef}
      className={cn(
        "mx-auto max-w-xl text-center px-0 py-0",
        "transition-all duration-900",
        inView ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-[2px]",
        "shadow-soft"
      )}
      style={{
        background: "linear-gradient(120deg, rgba(20,18,30,0.98) 60%, rgba(40,32,60,0.92) 100%)",
        borderRadius: "2.2rem",
        border: "1.5px solid rgba(200,169,106,0.13)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.45), 0 0 0 2px rgba(200,169,106,0.08)",
        padding: "2.8rem 2.2rem 2.2rem 2.2rem"
      }}
    >
      <p className="mb-2 text-xs uppercase tracking-[0.28em] text-gold-300/90 font-semibold drop-shadow-sm animate-fadein-up" style={{animationDelay:'0.1s', animationFillMode:'both'}}>Sedikit Kejutan</p>
      <h3 className="font-serif text-5xl sm:text-6xl text-white drop-shadow-md mb-3 animate-fadein-up" style={{animationDelay:'0.25s', animationFillMode:'both'}}>Hampir sampai…</h3>
      <p className="mt-3 text-lg sm:text-xl text-ink-100/90 font-light italic animate-fadein-up" style={{animationDelay:'0.5s', animationFillMode:'both'}}>Satu langkah lagi. Tekan play saat kamu siap.</p>
      <button
        className={cn(
          "mt-10 rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-12 py-3 font-serif text-lg font-semibold text-ink-900 shadow-lg shadow-gold-300/10",
          "transition-all duration-500 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-gold-300/40 animate-fadein-up",
        )}
        style={{animationDelay:'0.9s', animationFillMode:'both'}}
        onClick={onPlay}
      >
        <span className="inline-block transition-transform group-hover:scale-110 tracking-wide">Click Me</span>
      </button>
    </div>
  );

  return (
    <>
      {compact ? gate : <section className="relative"><div className="container mx-auto px-6 py-24 md:py-36">{gate}</div></section>}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay grain" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-black/80" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-black/85" />
          <div className="flex h-full items-center justify-center p-6">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-soft">
              <video
                ref={videoRef}
                controls
                playsInline
                onEnded={() => setEnded(true)}
                onError={() => setError(true)}
                className="aspect-video h-full w-full bg-black"
              >
                <source src={src} type="video/mp4" />
              </video>
              {(!canPlay || error) && (
                <div className="absolute inset-0 grid place-items-center bg-black/60">
                  {error ? (
                    <div className="text-center">
                      <div className="mb-3 text-lg text-gold-300 font-serif">Video cannot be played.</div>
                      <div className="mb-4 text-ink-100">Please check the file format or try a different browser.</div>
                      <button
                        onClick={() => {
                          setError(false);
                          const v = videoRef.current;
                          if (v) {
                            v.load();
                            v.play().then(() => setCanPlay(true)).catch(() => setError(true));
                          }
                        }}
                        className="rounded-full bg-gold-400 px-6 py-2 text-ink-900 shadow-soft"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const v = videoRef.current;
                        if (v) {
                          v.play().then(() => setCanPlay(true)).catch(() => setError(true));
                        }
                      }}
                      className="rounded-full bg-gold-400 px-6 py-2 text-ink-900 shadow-soft"
                    >
                      Tap to play
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1 text-sm text-ink-50"
              >
                Close
              </button>

              {ended && (
                <div className="absolute inset-0 grid place-items-center bg-black/82 p-6 text-center">
                  <div className="max-w-md">
                    <h4 className="font-serif text-3xl text-white">Happy Birthday, Muthia</h4>
                    <p className="mt-2 text-ink-100 leading-relaxed">
                      You are loved—deeply, softly, and always. Happy Birthday, Muthia.
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <button
                        className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-ink-100"
                        onClick={() => {
                          const v = videoRef.current;
                          if (v) {
                            v.currentTime = 0;
                            v.play();
                            setEnded(false);
                          }
                        }}
                      >
                        Play again
                      </button>
                      <button
                        className="rounded-full bg-gold-400 px-4 py-2 text-ink-900"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href).catch(() => {});
                        }}
                      >
                        Copy link
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
