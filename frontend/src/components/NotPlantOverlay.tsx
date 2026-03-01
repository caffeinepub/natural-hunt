import { RotateCcw } from 'lucide-react';

interface NotPlantOverlayProps {
  detectedCategory: string;
  categoryEmoji: string;
  capturedImageUrl: string | null;
  onTryAgain: () => void;
}

export default function NotPlantOverlay({
  detectedCategory,
  categoryEmoji,
  capturedImageUrl,
  onTryAgain,
}: NotPlantOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 animate-fade-in"
      style={{
        background: 'oklch(0.14 0.06 55 / 0.94)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Blurred background image */}
      {capturedImageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={capturedImageUrl}
            alt="Captured"
            className="w-full h-full object-cover opacity-15"
            style={{ filter: 'blur(4px) saturate(0.5)' }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Amber warning badge */}
        <div
          className="mb-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: 'oklch(0.72 0.18 65 / 0.2)',
            border: '1px solid oklch(0.72 0.18 65 / 0.5)',
            color: 'oklch(0.82 0.16 70)',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Not a Plant
        </div>

        {/* Large emoji icon */}
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 animate-bounce-in"
          style={{
            background: 'linear-gradient(135deg, oklch(0.62 0.18 65 / 0.25), oklch(0.52 0.16 60 / 0.15))',
            border: '2px solid oklch(0.72 0.18 65 / 0.45)',
            boxShadow: '0 8px 32px oklch(0.62 0.18 65 / 0.3)',
          }}
        >
          <span className="text-5xl" role="img" aria-label={detectedCategory}>
            {categoryEmoji}
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl font-black mb-2 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: 'oklch(0.97 0.015 90)',
          }}
        >
          Looks like{' '}
          <span style={{ color: 'oklch(0.82 0.16 70)' }}>{detectedCategory}</span>!
        </h2>

        {/* Subtext */}
        <p
          className="text-base mb-2 leading-relaxed"
          style={{ color: 'oklch(0.78 0.06 80)', fontFamily: 'Nunito, sans-serif' }}
        >
          That doesn't appear to be a plant.
        </p>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: 'oklch(0.60 0.05 80)', fontFamily: 'Nunito, sans-serif' }}
        >
          Point your camera at leaves, flowers, trees, or other vegetation and try again.
        </p>

        {/* Tip strip */}
        <div
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-8"
          style={{
            background: 'oklch(0.72 0.18 65 / 0.12)',
            border: '1px solid oklch(0.72 0.18 65 / 0.25)',
          }}
        >
          <span className="text-2xl">🌿</span>
          <p
            className="text-xs text-left leading-snug"
            style={{ color: 'oklch(0.75 0.08 80)', fontFamily: 'Nunito, sans-serif' }}
          >
            <strong style={{ color: 'oklch(0.85 0.10 75)' }}>Tip:</strong> Get close to a plant and make sure it fills most of the frame for best results.
          </p>
        </div>

        {/* Try Again button */}
        <button
          onClick={onTryAgain}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.18 65))',
            color: 'oklch(0.12 0.04 150)',
            boxShadow: '0 4px 20px oklch(0.62 0.18 65 / 0.45)',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}
