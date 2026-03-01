import React from 'react';
import { Trophy, Medal, Star, Crown, ArrowLeft, Loader2 } from 'lucide-react';
import { useGetLeaderboard } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import AnimatedCharacter from './AnimatedCharacter';
import { animeCharacters } from '../data/animeCharacters';

interface LeaderboardScreenProps {
  onBack: () => void;
}

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown size={18} style={{ color: 'oklch(0.72 0.14 75)' }} />;
  if (rank === 2) return <Medal size={18} style={{ color: 'oklch(0.78 0.08 220)' }} />;
  if (rank === 3) return <Medal size={18} style={{ color: 'oklch(0.65 0.14 55)' }} />;
  return <span className="text-sm font-bold" style={{ color: 'oklch(0.55 0.05 145)', fontFamily: 'Nunito, sans-serif' }}>#{rank}</span>;
}

function getRankStyle(rank: number): React.CSSProperties {
  if (rank === 1) return {
    background: 'linear-gradient(135deg, oklch(0.22 0.08 75 / 0.6), oklch(0.18 0.06 150 / 0.8))',
    border: '1px solid oklch(0.72 0.14 75 / 0.5)',
    boxShadow: '0 4px 20px oklch(0.72 0.14 75 / 0.2)',
  };
  if (rank === 2) return {
    background: 'oklch(0.18 0.06 220 / 0.4)',
    border: '1px solid oklch(0.78 0.08 220 / 0.4)',
  };
  if (rank === 3) return {
    background: 'oklch(0.18 0.06 55 / 0.4)',
    border: '1px solid oklch(0.65 0.14 55 / 0.4)',
  };
  return {
    background: 'oklch(0.16 0.05 150 / 0.6)',
    border: '1px solid oklch(0.30 0.07 148 / 0.4)',
  };
}

export default function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const { data: leaderboard = [], isLoading, error } = useGetLeaderboard();
  const { identity } = useInternetIdentity();
  const currentPrincipal = identity?.getPrincipal().toString();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, oklch(0.10 0.05 150), oklch(0.16 0.08 155) 50%, oklch(0.12 0.06 200))',
      }}
    >
      {/* Header */}
      <div className="pt-12 pb-4 px-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95"
            style={{
              color: 'oklch(0.72 0.09 145)',
              background: 'oklch(0.20 0.06 150 / 0.5)',
              fontFamily: 'Nunito, sans-serif',
              fontSize: '0.875rem',
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))' }}
            >
              <Trophy size={20} color="white" />
            </div>
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.97 0.015 90)' }}
              >
                Leaderboard
              </h1>
              <p
                className="text-xs"
                style={{ color: 'oklch(0.58 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
              >
                Top plant hunters ranked by points
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="max-w-md mx-auto">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={32} className="animate-spin" style={{ color: 'oklch(0.72 0.14 75)' }} />
              <p style={{ color: 'oklch(0.58 0.05 140)', fontFamily: 'Nunito, sans-serif', fontSize: '0.875rem' }}>
                Loading rankings...
              </p>
            </div>
          )}

          {error && (
            <div
              className="rounded-2xl p-4 text-center"
              style={{
                background: 'oklch(0.55 0.22 25 / 0.1)',
                border: '1px solid oklch(0.55 0.22 25 / 0.3)',
                color: 'oklch(0.72 0.18 30)',
                fontFamily: 'Nunito, sans-serif',
                fontSize: '0.875rem',
              }}
            >
              Failed to load leaderboard. Please try again.
            </div>
          )}

          {!isLoading && !error && leaderboard.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'oklch(0.20 0.06 150 / 0.6)' }}
              >
                <Star size={36} style={{ color: 'oklch(0.72 0.14 75)' }} />
              </div>
              <div className="text-center">
                <p
                  className="text-lg font-bold mb-1"
                  style={{ color: 'oklch(0.85 0.04 145)', fontFamily: 'Playfair Display, serif' }}
                >
                  No Rankings Yet
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'oklch(0.55 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
                >
                  Start scanning plants to earn points and claim the top spot!
                </p>
              </div>
            </div>
          )}

          {!isLoading && !error && leaderboard.length > 0 && (
            <div className="space-y-3 pt-2">
              {leaderboard.map((entry, index) => {
                const rank = index + 1;
                const principal = entry[0].toString();
                const points = Number(entry[1]);
                const isCurrentUser = principal === currentPrincipal;
                const profile = entry[2];
                const characterId = profile?.character?.id;
                const characterData = characterId
                  ? animeCharacters.find((c) => c.id === characterId)
                  : null;
                const displayName = profile?.name || `Hunter #${rank}`;

                return (
                  <div
                    key={principal}
                    className="flex items-center gap-3 p-3 rounded-2xl transition-all duration-200"
                    style={{
                      ...getRankStyle(rank),
                      outline: isCurrentUser ? '2px solid oklch(0.72 0.14 75 / 0.6)' : 'none',
                      outlineOffset: '2px',
                    }}
                  >
                    {/* Rank */}
                    <div className="w-8 flex items-center justify-center flex-shrink-0">
                      {getRankIcon(rank)}
                    </div>

                    {/* Character avatar */}
                    <div className="flex-shrink-0">
                      {characterData ? (
                        <AnimatedCharacter character={characterData} size={48} />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                          style={{ background: 'oklch(0.25 0.07 148 / 0.8)' }}
                        >
                          🌿
                        </div>
                      )}
                    </div>

                    {/* Name & badge */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className="font-bold truncate text-sm"
                          style={{
                            color: isCurrentUser ? 'oklch(0.72 0.14 75)' : 'oklch(0.92 0.02 100)',
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {displayName}
                        </p>
                        {isCurrentUser && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              background: 'oklch(0.72 0.14 75 / 0.2)',
                              color: 'oklch(0.72 0.14 75)',
                              border: '1px solid oklch(0.72 0.14 75 / 0.4)',
                              fontFamily: 'Nunito, sans-serif',
                            }}
                          >
                            You
                          </span>
                        )}
                      </div>
                      {characterData && (
                        <p
                          className="text-xs truncate"
                          style={{ color: 'oklch(0.55 0.05 140)', fontFamily: 'Nunito, sans-serif' }}
                        >
                          {characterData.name} · {characterData.series}
                        </p>
                      )}
                    </div>

                    {/* Points */}
                    <div className="flex-shrink-0 text-right">
                      <p
                        className="font-bold text-sm"
                        style={{
                          color: rank === 1 ? 'oklch(0.72 0.14 75)' : 'oklch(0.85 0.04 145)',
                          fontFamily: 'Nunito, sans-serif',
                        }}
                      >
                        {points.toLocaleString()}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: 'oklch(0.50 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
                      >
                        pts
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
