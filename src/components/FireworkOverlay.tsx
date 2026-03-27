import { useEffect } from "react";

const COLORS = ["#FFD700", "#FF69B4", "#00E5FF", "#FF6347", "#7CFC00", "#FFF" ];

function randomBetween(a: number, b: number) {
  return Math.random() * (b - a) + a;
}

function createFireworkBurst(idx: number) {
  const count = 12 + Math.floor(Math.random() * 8);
  const angleStep = (2 * Math.PI) / count;
  const color = COLORS[idx % COLORS.length];
  return Array.from({ length: count }).map((_, i) => {
    const angle = i * angleStep;
    const x = Math.cos(angle) * randomBetween(40, 70);
    const y = Math.sin(angle) * randomBetween(40, 70);
    const delay = randomBetween(0, 0.7);
    return (
      <span
        key={i}
        className="firework-particle"
        style={{
          background: color,
          animationDelay: `${delay}s`,
          transform: `translate(-50%, -50%) translate(0, 0)`
        }}
        data-x={x}
        data-y={y}
      />
    );
  });
}

export default function FireworkOverlay({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (!trigger) return;
    const audio = new Audio("/audio/firework.mp3");
    audio.volume = 0.5;
    audio.play();
  }, [trigger]);

  if (!trigger) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="firework-burst"
          style={{
            left: `${randomBetween(20, 80)}vw`,
            top: `${randomBetween(20, 60)}vh`,
            animationDelay: `${idx * 0.5}s`,
          }}
        >
          {createFireworkBurst(idx)}
        </div>
      ))}
    </div>
  );
}
