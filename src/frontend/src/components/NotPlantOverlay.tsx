import { RotateCcw, X } from "lucide-react";
import React from "react";

interface NotPlantOverlayProps {
  category: string;
  emoji: string;
  onRetry: () => void;
}

export default function NotPlantOverlay({
  category,
  emoji,
  onRetry,
}: NotPlantOverlayProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative glass-card rounded-t-3xl w-full p-6 pb-10 animate-slide-up">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="text-6xl">{emoji}</div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-cream-light mb-1">
              Not a Plant
            </h2>
            <p className="text-cream-light/60 text-sm">
              That looks like{" "}
              <span className="text-cream-light font-semibold">{category}</span>
              . Try pointing at a plant!
            </p>
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.12 85), oklch(0.60 0.14 145))",
              color: "#fff",
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
