import { RotateCcw, Camera } from 'lucide-react';

interface NotRealOverlayProps {
  reason: string;
  capturedImageUrl: string | null;
  onTryAgain: () => void;
}

export default function NotRealOverlay({
  reason,
  capturedImageUrl,
  onTryAgain,
}: NotRealOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-8 animate-fade-in"
      style={{
        background: 'oklch(0.12 0.06 20 / 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Blurred background image */}
      {capturedImageUrl && (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={capturedImageUrl}
            alt="Captured"
            className="w-full h-full object-cover opacity-10"
            style={{ filter: 'blur(6px) saturate(0.3)' }}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Red warning badge */}
        <div
          className="mb-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{
            background: 'oklch(0.55 0.22 25 / 0.2)',
            border: '1px solid oklch(0.65 0.20 25 / 0.5)',
            color: 'oklch(0.75 0.18 30)',
            fontFamily: 'Nunito, sans-serif',
          }}
        >
          Not a Real Photo
        </div>

        {/* Camera icon with X overlay */}
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center mb-6 animate-bounce-in relative"
          style={{
            background: 'linear-gradient(135deg, oklch(0.45 0.20 25 / 0.3), oklch(0.35 0.18 20 / 0.2))',
            border: '2px solid oklch(0.60 0.20 25 / 0.5)',
            boxShadow: '0 8px 32px oklch(0.45 0.20 25 / 0.35)',
          }}
        >
          <Camera size={48} style={{ color: 'oklch(0.75 0.18 30)' }} />
          {/* X badge */}
          <div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
            style={{
              background: 'oklch(0.55 0.22 25)',
              color: 'oklch(0.97 0.015 90)',
              boxShadow: '0 2px 8px oklch(0.45 0.20 25 / 0.5)',
            }}
          >
            ✕
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl font-black mb-2 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: 'oklch(0.97 0.015 90)',
          }}
        >
          Real Photo{' '}
          <span style={{ color: 'oklch(0.75 0.18 30)' }}>Required</span>
        </h2>

        {/* Reason */}
        <p
          className="text-base mb-2 leading-relaxed"
          style={{ color: 'oklch(0.72 0.06 40)', fontFamily: 'Nunito, sans-serif' }}
        >
          {reason}
        </p>
        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: 'oklch(0.58 0.05 40)', fontFamily: 'Nunito, sans-serif' }}
        >
          Please use your camera to take a real photo of a plant — not a screenshot, drawing, or digital image.
        </p>

        {/* Instructions strip */}
        <div
          className="w-full flex flex-col gap-2 px-4 py-3 rounded-2xl mb-8"
          style={{
            background: 'oklch(0.55 0.22 25 / 0.12)',
            border: '1px solid oklch(0.55 0.22 25 / 0.25)',
          }}
        >
          {[
            { icon: '📷', text: 'Use your device camera directly' },
            { icon: '🌱', text: 'Point at a real plant in your environment' },
            { icon: '☀️', text: 'Ensure good lighting for best results' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-lg">{icon}</span>
              <p
                className="text-xs text-left"
                style={{ color: 'oklch(0.70 0.06 40)', fontFamily: 'Nunito, sans-serif' }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Try Again button */}
        <button
          onClick={onTryAgain}
          className="flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
          style={{
            background: 'linear-gradient(135deg, oklch(0.45 0.20 25), oklch(0.58 0.22 28))',
            color: 'oklch(0.97 0.015 90)',
            boxShadow: '0 4px 20px oklch(0.45 0.20 25 / 0.5)',
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
