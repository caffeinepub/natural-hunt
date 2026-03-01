import React, { useState } from 'react';
import { Check, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { animeCharacters, seriesBadgeColors, type AnimeCharacterData } from '../data/animeCharacters';
import AnimatedCharacter from './AnimatedCharacter';
import { useSelectCharacter } from '../hooks/useQueries';

interface CharacterSelectionScreenProps {
  onComplete: () => void;
}

const seriesOrder = ['Naruto', 'One Piece', 'Bleach', 'Dragon Ball'];

export default function CharacterSelectionScreen({ onComplete }: CharacterSelectionScreenProps) {
  const [selected, setSelected] = useState<AnimeCharacterData | null>(null);
  const selectCharacter = useSelectCharacter();

  const handleConfirm = async () => {
    if (!selected) return;
    try {
      await selectCharacter.mutateAsync({
        id: selected.id,
        name: selected.name,
        series: selected.series,
        imageUrl: selected.imageUrl,
      });
      onComplete();
    } catch {
      // error shown via mutation state
    }
  };

  const groupedByFranchise = seriesOrder.map((series) => ({
    series,
    characters: animeCharacters.filter((c) => c.series === series),
  }));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(160deg, oklch(0.10 0.05 150), oklch(0.16 0.08 155) 50%, oklch(0.12 0.06 200))',
      }}
    >
      {/* Header */}
      <div className="pt-12 pb-6 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={20} style={{ color: 'oklch(0.72 0.14 75)' }} />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'oklch(0.72 0.14 75)', fontFamily: 'Nunito, sans-serif' }}
          >
            Choose Your Fighter
          </span>
          <Sparkles size={20} style={{ color: 'oklch(0.72 0.14 75)' }} />
        </div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.97 0.015 90)' }}
        >
          Select Your Character
        </h1>
        <p
          className="text-sm"
          style={{ color: 'oklch(0.65 0.06 145)', fontFamily: 'Nunito, sans-serif' }}
        >
          Your character will represent you on the leaderboard
        </p>
      </div>

      {/* Character Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {groupedByFranchise.map(({ series, characters }) => {
          const badge = seriesBadgeColors[series];
          return (
            <div key={series} className="mb-6">
              {/* Franchise header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: badge.bg,
                    color: badge.text,
                    border: `1px solid ${badge.border}`,
                    fontFamily: 'Nunito, sans-serif',
                  }}
                >
                  {series}
                </div>
                <div className="flex-1 h-px" style={{ background: badge.border }} />
              </div>

              {/* Characters row */}
              <div className="grid grid-cols-2 gap-3">
                {characters.map((char) => {
                  const isSelected = selected?.id === char.id;
                  return (
                    <button
                      key={char.id}
                      onClick={() => setSelected(char)}
                      className="relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 active:scale-95"
                      style={{
                        background: isSelected
                          ? `${char.color}22`
                          : 'oklch(0.18 0.06 150 / 0.6)',
                        border: isSelected
                          ? `2px solid ${char.color}`
                          : '2px solid oklch(0.35 0.08 148 / 0.5)',
                        boxShadow: isSelected
                          ? `0 0 20px ${char.color}44, 0 4px 16px oklch(0.05 0.02 150 / 0.5)`
                          : '0 2px 8px oklch(0.05 0.02 150 / 0.3)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      {/* Selected checkmark */}
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center animate-bounce-in"
                          style={{ background: char.color }}
                        >
                          <Check size={14} color="white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Animated character */}
                      <AnimatedCharacter character={char} size={80} />

                      {/* Name */}
                      <div className="text-center">
                        <p
                          className="text-sm font-bold leading-tight"
                          style={{
                            color: isSelected ? 'oklch(0.97 0.015 90)' : 'oklch(0.85 0.04 145)',
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {char.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm button - fixed bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{
          background: 'linear-gradient(to top, oklch(0.10 0.05 150) 60%, transparent)',
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-md mx-auto">
          {selectCharacter.error && (
            <p
              className="text-xs text-center mb-2"
              style={{ color: 'oklch(0.65 0.20 25)', fontFamily: 'Nunito, sans-serif' }}
            >
              {selectCharacter.error.message}
            </p>
          )}
          <button
            onClick={handleConfirm}
            disabled={!selected || selectCharacter.isPending}
            className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: selected
                ? `linear-gradient(135deg, ${selected.color}, ${selected.color}cc)`
                : 'oklch(0.28 0.08 148)',
              color: 'white',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: selected ? `0 4px 20px ${selected.color}55` : 'none',
            }}
          >
            {selectCharacter.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                {selected ? `Choose ${selected.name.split(' ')[0]}!` : 'Select a Character'}
                {selected && <ChevronRight size={18} />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
