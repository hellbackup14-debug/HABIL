import { useEffect, useState } from "react";

export default function SectionIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? Math.min(100, Math.max(0, (scrollTop / height) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="rounded-full bg-ink-800/80 px-4 py-2 text-sm shadow-soft backdrop-blur">
        <span>Scroll</span>
        <span className="ml-2 text-gold-300">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}
