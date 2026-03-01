import { useEffect, useState } from 'react';
import { ArrowLeft, Leaf, Grid3X3, Star, Calendar, Sparkles } from 'lucide-react';
import { useGetDiscoveries, useGetPoints } from '../hooks/useQueries';
import { plantDatabase } from '../data/plantDatabase';

interface DiscoveriesListProps {
  onBack: () => void;
}

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const count = useCountUp(value);

  return (
    <div
      className="flex-1 flex flex-col items-center gap-1 p-3 rounded-2xl animate-fade-in-up"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
        animationDelay: `${delay}s`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
        style={{ background: `${color}25` }}
      >
        <Icon size={18} style={{ color }} />
      </div>
      <span
        className="text-2xl font-black"
        style={{ color: 'oklch(0.95 0.015 90)', fontFamily: 'Nunito, sans-serif' }}
      >
        {count}
      </span>
      <span
        className="text-xs font-semibold text-center leading-tight"
        style={{ color: 'oklch(0.65 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
      >
        {label}
      </span>
    </div>
  );
}

export default function DiscoveriesList({ onBack }: DiscoveriesListProps) {
  const { data: discoveries = [], isLoading } = useGetDiscoveries();
  const { data: points = 0 } = useGetPoints();

  const uniqueSpecies = new Set(discoveries.map((d) => d.plantName)).size;
  const totalPoints = Number(points);

  const getPlantData = (plantName: string) => {
    return plantDatabase.find(
      (p) => p.name.toLowerCase() === plantName.toLowerCase()
    );
  };

  const formatDate = (timestamp: bigint | number) => {
    const ms = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
    const date = new Date(ms);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, oklch(0.14 0.06 150) 0%, oklch(0.12 0.04 150) 100%)',
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4"
        style={{
          background: 'oklch(0.14 0.06 150 / 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid oklch(0.28 0.08 148 / 0.5)',
        }}
      >
        <div className="flex items-center gap-3 py-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{
              background: 'oklch(0.22 0.06 148)',
              border: '1px solid oklch(0.32 0.08 148)',
              color: 'oklch(0.75 0.06 145)',
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1
              className="text-xl font-black leading-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'oklch(0.97 0.015 90)',
              }}
            >
              My Collection
            </h1>
            <p
              className="text-xs"
              style={{ color: 'oklch(0.60 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
            >
              Your botanical discoveries
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-6">
        {/* Stats Bar */}
        <div className="flex gap-3">
          <StatCard
            icon={Leaf}
            label="Plants Found"
            value={discoveries.length}
            color="oklch(0.52 0.12 148)"
            delay={0.1}
          />
          <StatCard
            icon={Star}
            label="Total Points"
            value={totalPoints}
            color="oklch(0.72 0.14 75)"
            delay={0.2}
          />
          <StatCard
            icon={Grid3X3}
            label="Species"
            value={uniqueSpecies}
            color="oklch(0.62 0.15 200)"
            delay={0.3}
          />
        </div>

        {/* Discoveries Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: 'oklch(0.20 0.06 148)', height: '180px' }}
              />
            ))}
          </div>
        ) : discoveries.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
            <div className="relative mb-6">
              <img
                src="/assets/generated/empty-state-illustration.dim_400x300.png"
                alt="No discoveries yet"
                className="w-48 h-36 object-contain opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div
              className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4 animate-float"
              style={{
                background: 'linear-gradient(135deg, oklch(0.28 0.12 150), oklch(0.38 0.10 148))',
                border: '2px solid oklch(0.52 0.09 145 / 0.4)',
              }}
            >
              <Sparkles size={28} style={{ color: 'oklch(0.72 0.14 75)' }} />
            </div>

            <h3
              className="text-2xl font-bold mb-2"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'oklch(0.90 0.015 90)',
              }}
            >
              Start Exploring
            </h3>
            <p
              className="text-sm max-w-xs leading-relaxed"
              style={{ color: 'oklch(0.60 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
            >
              Scan plants around you to build your botanical collection and earn points!
            </p>

            <button
              onClick={onBack}
              className="mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
                color: 'oklch(0.97 0.015 90)',
                border: '1px solid oklch(0.72 0.14 75 / 0.3)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              <Leaf size={16} />
              Start Scanning
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'oklch(0.90 0.015 90)',
                }}
              >
                Recent Finds
              </h2>
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full"
                style={{
                  background: 'oklch(0.52 0.12 148 / 0.2)',
                  color: 'oklch(0.72 0.09 145)',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                {discoveries.length} total
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[...discoveries].reverse().map((discovery, index) => {
                const plantData = getPlantData(discovery.plantName);
                const emoji = plantData?.emoji ?? '🌿';
                // Use the plant's color field (hex) for accent
                const accentHex = plantData?.color ?? '#4a7c59';

                return (
                  <div
                    key={index}
                    className="discovery-card rounded-2xl overflow-hidden animate-fade-in-up"
                    style={{
                      background: 'oklch(0.18 0.06 148)',
                      border: '1px solid oklch(0.28 0.08 148 / 0.6)',
                      animationDelay: `${0.05 * index}s`,
                      opacity: 0,
                      animationFillMode: 'forwards',
                    }}
                  >
                    {/* Card image / emoji area */}
                    <div
                      className="relative h-28 flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${accentHex}33, ${accentHex}11)`,
                      }}
                    >
                      {discovery.imageUrl && discovery.imageUrl.startsWith('data:') ? (
                        <img
                          src={discovery.imageUrl}
                          alt={discovery.plantName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl">{emoji}</span>
                      )}

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, transparent 50%, oklch(0.18 0.06 148) 100%)',
                        }}
                      />

                      {/* Points badge */}
                      <div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{
                          background:
                            'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
                          color: 'oklch(0.18 0.06 150)',
                          fontFamily: 'Nunito, sans-serif',
                        }}
                      >
                        +10
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-3">
                      <h3
                        className="text-sm font-bold leading-tight mb-1 truncate"
                        style={{
                          color: 'oklch(0.92 0.015 90)',
                          fontFamily: 'Nunito, sans-serif',
                        }}
                      >
                        {discovery.plantName}
                      </h3>
                      {plantData && (
                        <p
                          className="text-xs italic truncate mb-2"
                          style={{
                            color: 'oklch(0.55 0.06 145)',
                            fontFamily: 'Playfair Display, serif',
                          }}
                        >
                          {plantData.scientificName}
                        </p>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar size={10} style={{ color: 'oklch(0.50 0.04 140)' }} />
                        <span
                          className="text-xs"
                          style={{
                            color: 'oklch(0.50 0.04 140)',
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {formatDate(discovery.identificationDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-6 text-center">
        <p className="text-xs" style={{ color: 'oklch(0.38 0.04 140)' }}>
          © {new Date().getFullYear()} Natural Hunt · Built with{' '}
          <span style={{ color: 'oklch(0.65 0.18 25)' }}>♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'oklch(0.72 0.14 75)' }}
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
