import { useRef } from "react";

export default function GiftButtonWithFullscreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <button
        className="animate-fadein-up focus:outline-none group"
        style={{animationDelay:'0.3s', animationFillMode:'both'}}
        onClick={onOpen}
        aria-label="Open Gift"
      >
        <span className="block text-[90px] sm:text-[120px] text-purple-400 group-hover:scale-110 transition-transform duration-300">
          🎁
        </span>
        <span className="block mt-2 text-base text-purple-200 group-hover:text-purple-300 transition-colors">Scroll Down</span>
      </button>
    </div>
  );
}