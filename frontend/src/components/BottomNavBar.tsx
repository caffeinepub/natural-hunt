import { Camera, BookOpen, Leaf, Trophy } from 'lucide-react';
import { useGetPoints } from '../hooks/useQueries';

interface BottomNavBarProps {
  currentView: 'camera' | 'discoveries' | 'leaderboard';
  onNavigate: (view: 'camera' | 'discoveries' | 'leaderboard') => void;
}

export default function BottomNavBar({ currentView, onNavigate }: BottomNavBarProps) {
  const { data: points = 0 } = useGetPoints();

  const tabs = [
    { id: 'camera' as const, label: 'Scan', icon: Camera },
    { id: 'leaderboard' as const, label: 'Ranks', icon: Trophy },
    { id: 'discoveries' as const, label: 'Discoveries', icon: BookOpen },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div
        className="glass-forest border-t border-white/10 px-4 pt-2 pb-safe"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-md mx-auto flex items-center justify-around relative">
          {/* Points badge - centered floating */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
                color: 'oklch(0.18 0.06 150)',
                boxShadow: '0 2px 12px oklch(0.72 0.14 75 / 0.5)',
              }}
            >
              <Leaf size={10} />
              <span>{Number(points)} pts</span>
            </div>
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-300 relative group"
                style={{
                  color: isActive
                    ? 'oklch(0.72 0.14 75)'
                    : 'oklch(0.75 0.06 145)',
                }}
              >
                {/* Active background pill */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'oklch(0.72 0.14 75 / 0.15)',
                      border: '1px solid oklch(0.72 0.14 75 / 0.3)',
                    }}
                  />
                )}

                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                />
                <span
                  className="text-xs font-semibold relative z-10 tracking-wide"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {tab.label}
                </span>

                {/* Active dot indicator */}
                {isActive && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: 'oklch(0.72 0.14 75)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
