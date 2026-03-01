import { useEffect, useState } from 'react';
import { X, Leaf, Heart, Globe, Lightbulb, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { PlantData } from '../hooks/usePlantIdentification';
import PlantInfoBoard from './PlantInfoBoard';
import DraggableMascot from './DraggableMascot';

interface PlantResultPanelProps {
  plant: PlantData;
  capturedImageUrl: string | null;
  onClose: () => void;
  onViewDiscoveries: () => void;
}

function ConfettiParticle({ index }: { index: number }) {
  const colors = [
    'oklch(0.72 0.14 75)',
    'oklch(0.52 0.12 148)',
    'oklch(0.65 0.18 25)',
    'oklch(0.62 0.15 200)',
    'oklch(0.82 0.12 80)',
  ];
  const color = colors[index % colors.length];
  const left = `${10 + (index * 17) % 80}%`;
  const delay = `${(index * 0.08) % 0.6}s`;
  const size = 6 + (index % 4) * 2;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left,
        top: '-10px',
        width: size,
        height: size,
        background: color,
        borderRadius: index % 2 === 0 ? '50%' : '2px',
        animation: `confetti-fall 0.8s ease-out ${delay} forwards`,
      }}
    />
  );
}

export default function PlantResultPanel({
  plant,
  capturedImageUrl,
  onClose,
  onViewDiscoveries,
}: PlantResultPanelProps) {
  const [showPoints, setShowPoints] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [boardDismissed, setBoardDismissed] = useState(false);
  const [mascotMode, setMascotMode] = useState<'free' | 'standBeside'>('free');

  // Board position (center-ish of screen)
  const boardPosition = {
    x: Math.min(window.innerWidth * 0.35, window.innerWidth - 300),
    y: window.innerHeight * 0.25,
  };

  useEffect(() => {
    // Trigger slide-up
    requestAnimationFrame(() => setVisible(true));

    // Delay points badge
    const t1 = setTimeout(() => {
      setShowPoints(true);
      setShowConfetti(true);
    }, 600);

    const t2 = setTimeout(() => setShowConfetti(false), 1500);

    // Show board after panel slides in
    const t3 = setTimeout(() => {
      setShowBoard(true);
      setMascotMode('standBeside');
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleBoardDismiss = () => {
    setBoardDismissed(true);
    setMascotMode('free');
  };

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col justify-end"
      style={{ background: 'oklch(0.08 0.04 150 / 0.5)', backdropFilter: 'blur(4px)' }}
    >
      {/* Mascot overlay — visible on result screen */}
      <DraggableMascot
        animationMode={mascotMode}
        boardPosition={boardPosition}
        visible={true}
      />

      {/* Plant Info Board */}
      {showBoard && !boardDismissed && (
        <PlantInfoBoard
          plantName={plant.name}
          benefits={plant.benefits}
          onComplete={() => {}}
          onDismiss={handleBoardDismiss}
        />
      )}

      {/* Slide-up panel */}
      <div
        className="relative rounded-t-3xl overflow-hidden transition-transform duration-500 ease-out"
        style={{
          background: 'linear-gradient(180deg, oklch(0.14 0.06 150) 0%, oklch(0.12 0.04 150) 100%)',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          maxHeight: '88vh',
          overflowY: 'auto',
          zIndex: 41,
        }}
      >
        {/* Hero image section */}
        <div className="relative h-52 overflow-hidden">
          {capturedImageUrl ? (
            <img
              src={capturedImageUrl}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-7xl"
              style={{ background: `linear-gradient(135deg, ${plant.color}33, ${plant.color}11)` }}
            >
              {plant.emoji}
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, oklch(0.12 0.04 150 / 0.5) 60%, oklch(0.12 0.04 150) 100%)',
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'oklch(0.08 0.04 150 / 0.7)',
              border: '1px solid oklch(0.99 0.008 100 / 0.2)',
              backdropFilter: 'blur(8px)',
              color: 'oklch(0.85 0.04 140)',
            }}
          >
            <X size={18} />
          </button>

          {/* Emoji overlay */}
          <div className="absolute bottom-4 left-4 text-4xl">{plant.emoji}</div>

          {/* Confidence badge */}
          <div
            className="absolute bottom-4 right-4 px-2 py-1 rounded-full text-xs font-bold"
            style={{
              background: 'oklch(0.52 0.12 148 / 0.8)',
              color: 'oklch(0.95 0.015 90)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {Math.round(plant.confidence * 100)}% match
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-8">
          {/* Plant name & scientific name */}
          <div className="mt-4 mb-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h2
                  className="text-3xl font-black leading-tight mb-1"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: 'oklch(0.97 0.015 90)',
                  }}
                >
                  {plant.name}
                </h2>
                <p
                  className="text-base italic"
                  style={{
                    color: 'oklch(0.65 0.06 145)',
                    fontFamily: 'Playfair Display, serif',
                  }}
                >
                  {plant.scientificName}
                </p>
                <div
                  className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'oklch(0.52 0.12 148 / 0.2)',
                    color: 'oklch(0.72 0.09 145)',
                    border: '1px solid oklch(0.52 0.12 148 / 0.3)',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  <Leaf size={10} />
                  {plant.category}
                </div>
              </div>

              {/* Points badge with confetti */}
              <div className="relative flex-shrink-0">
                {showConfetti && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 overflow-visible pointer-events-none">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ConfettiParticle key={i} index={i} />
                    ))}
                  </div>
                )}
                {showPoints && (
                  <div
                    className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl animate-bounce-in"
                    style={{
                      background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
                      boxShadow: '0 4px 20px oklch(0.72 0.14 75 / 0.5)',
                    }}
                  >
                    <Star
                      size={14}
                      style={{ color: 'oklch(0.18 0.06 150)' }}
                      fill="oklch(0.18 0.06 150)"
                    />
                    <span
                      className="text-lg font-black leading-none"
                      style={{ color: 'oklch(0.18 0.06 150)', fontFamily: 'Nunito, sans-serif' }}
                    >
                      +10
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'oklch(0.25 0.08 150)', fontFamily: 'Nunito, sans-serif' }}
                    >
                      pts
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, oklch(0.52 0.09 145 / 0.4), transparent)',
            }}
          />

          {/* Fun Fact */}
          <div
            className="flex gap-3 p-3 rounded-2xl mb-4"
            style={{
              background: 'oklch(0.72 0.14 75 / 0.1)',
              border: '1px solid oklch(0.72 0.14 75 / 0.2)',
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'oklch(0.72 0.14 75 / 0.2)',
                border: '1px solid oklch(0.72 0.14 75 / 0.3)',
              }}
            >
              <Lightbulb size={16} style={{ color: 'oklch(0.72 0.14 75)' }} />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: 'oklch(0.72 0.14 75)', fontFamily: 'Nunito, sans-serif' }}
              >
                Fun Fact
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'oklch(0.78 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
              >
                {plant.funFact}
              </p>
            </div>
          </div>

          {/* Health Benefits */}
          <div
            className="flex gap-3 p-3 rounded-2xl mb-4"
            style={{
              background: 'oklch(0.65 0.18 25 / 0.08)',
              border: '1px solid oklch(0.65 0.18 25 / 0.2)',
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'oklch(0.65 0.18 25 / 0.15)',
                border: '1px solid oklch(0.65 0.18 25 / 0.3)',
              }}
            >
              <Heart size={16} style={{ color: 'oklch(0.65 0.18 25)' }} />
            </div>
            <div className="flex-1">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'oklch(0.65 0.18 25)', fontFamily: 'Nunito, sans-serif' }}
              >
                Health Benefits
              </p>
              <ul className="space-y-1">
                {plant.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: 'oklch(0.65 0.18 25)' }}
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'oklch(0.75 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ecological Benefits */}
          <div
            className="flex gap-3 p-3 rounded-2xl mb-6"
            style={{
              background: 'oklch(0.52 0.12 148 / 0.1)',
              border: '1px solid oklch(0.52 0.12 148 / 0.25)',
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: 'oklch(0.52 0.12 148 / 0.2)',
                border: '1px solid oklch(0.52 0.12 148 / 0.3)',
              }}
            >
              <Globe size={16} style={{ color: 'oklch(0.62 0.12 148)' }} />
            </div>
            <div className="flex-1">
              <p
                className="text-xs font-bold uppercase tracking-wider mb-2"
                style={{ color: 'oklch(0.62 0.12 148)', fontFamily: 'Nunito, sans-serif' }}
              >
                Ecological Role
              </p>
              <ul className="space-y-1">
                {plant.ecologicalBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2
                      size={13}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: 'oklch(0.62 0.12 148)' }}
                    />
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: 'oklch(0.75 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
                    >
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onViewDiscoveries}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all"
              style={{
                background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
                color: 'oklch(0.97 0.015 90)',
                border: '1px solid oklch(0.72 0.14 75 / 0.3)',
                boxShadow: '0 4px 16px oklch(0.28 0.12 150 / 0.4)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              View Collection
              <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 rounded-2xl font-bold text-sm transition-all"
              style={{
                background: 'oklch(0.22 0.06 148)',
                color: 'oklch(0.75 0.06 145)',
                border: '1px solid oklch(0.32 0.08 148)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              Scan More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
