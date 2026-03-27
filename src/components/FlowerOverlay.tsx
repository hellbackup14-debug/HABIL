const PETALS = ["✿", "❀", "❁", "✾", "✽", "✤"];

export default function FlowerOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => {
        const left = (i * 13 + 7) % 100;
        const duration = 10 + (i % 7) * 1.3;
        const delay = (i % 9) * 0.9;
        const size = 12 + (i % 5) * 4;
        const symbol = PETALS[i % PETALS.length];
        return (
          <span
            key={i}
            className="flower-petal absolute top-[-12%] text-gold-300/60"
            style={{
              left: `${left}%`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              fontSize: `${size}px`,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </div>
  );
}
