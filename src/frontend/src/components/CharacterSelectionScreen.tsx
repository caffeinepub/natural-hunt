import { Check, Sparkles, Star } from "lucide-react";
import React, { useState } from "react";
import type { AnimeCharacter as BackendAnimeCharacter } from "../backend";
import {
  type AnimeCharacter,
  animeCharacters,
  seriesBadgeColors,
} from "../data/animeCharacters";

interface CharacterSelectionScreenProps {
  onSelect: (character: BackendAnimeCharacter) => void;
  currentCharacterId?: string;
}

export default function CharacterSelectionScreen({
  onSelect,
  currentCharacterId,
}: CharacterSelectionScreenProps) {
  const [selected, setSelected] = useState<AnimeCharacter | null>(
    animeCharacters.find((c) => c.id === currentCharacterId) || null,
  );
  const [confirmed, setConfirmed] = useState(false);

  const groupedBySeries = animeCharacters.reduce(
    (acc, char) => {
      if (!acc[char.series]) acc[char.series] = [];
      acc[char.series].push(char);
      return acc;
    },
    {} as Record<string, AnimeCharacter[]>,
  );

  const handleConfirm = () => {
    if (!selected) return;
    setConfirmed(true);
    const backendChar: BackendAnimeCharacter = {
      id: selected.id,
      name: selected.name,
      series: selected.series,
      imageUrl: selected.imageUrl,
      idleAnimation: selected.idleAnimation,
    };
    setTimeout(() => {
      onSelect(backendChar);
    }, 600);
  };

  return (
    <div
      className="min-h-screen text-cream overflow-y-auto pb-36"
      style={{ background: "oklch(0.10 0.02 240)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-md border-b px-4 py-4"
        style={{
          background: "oklch(0.10 0.02 240 / 0.92)",
          borderColor: "oklch(0.72 0.12 85 / 0.2)",
        }}
      >
        <div className="flex items-center gap-2">
          <Sparkles
            className="w-5 h-5"
            style={{ color: "oklch(0.72 0.12 85)" }}
          />
          <h1 className="font-playfair text-xl font-bold text-gradient-gold">
            Choose Your Guide
          </h1>
        </div>
        <p className="text-cream/50 text-sm mt-1 font-nunito">
          Select your anime companion for plant adventures
        </p>
      </div>

      {/* Character Groups */}
      <div className="px-4 py-6 space-y-8">
        {Object.entries(groupedBySeries).map(([series, chars]) => {
          const badge = seriesBadgeColors[series] || {
            bg: "bg-white/10",
            text: "text-white",
            border: "border-white/20",
          };
          return (
            <div key={series}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.bg} ${badge.text} ${badge.border} font-nunito`}
                >
                  {series}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "oklch(0.72 0.12 85 / 0.1)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {chars.map((char) => {
                  const isSelected = selected?.id === char.id;
                  return (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => setSelected(char)}
                      className="relative rounded-3xl overflow-hidden border-2 transition-all duration-300 text-left group aspect-[3/4] flex flex-col"
                      style={{
                        borderColor: isSelected
                          ? "oklch(0.72 0.12 85)"
                          : "oklch(1 0 0 / 0.1)",
                        background: isSelected
                          ? `linear-gradient(135deg, ${char.primaryColor}28, ${char.secondaryColor}18)`
                          : "oklch(1 0 0 / 0.04)",
                        boxShadow: isSelected
                          ? `0 0 24px ${char.primaryColor}55, 0 0 8px ${char.primaryColor}33`
                          : "none",
                        transform: isSelected ? "scale(1.02)" : undefined,
                      }}
                      data-ocid={`char.item.${chars.indexOf(char) + 1}`}
                    >
                      {/* Portrait */}
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={char.imageUrl}
                          alt={char.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-5xl">${getCharacterEmoji(char.id)}</div>`;
                            }
                          }}
                        />
                        {/* Color overlay */}
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            background: `radial-gradient(circle at 50% 80%, ${char.primaryColor}, transparent 70%)`,
                          }}
                        />
                        {/* Selection check */}
                        {isSelected && (
                          <div
                            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                            style={{ background: "oklch(0.72 0.12 85)" }}
                          >
                            <Check
                              className="w-4 h-4"
                              style={{ color: "oklch(0.10 0.02 240)" }}
                              strokeWidth={3}
                            />
                          </div>
                        )}
                        {/* Hover glow */}
                        <div
                          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                          style={{
                            boxShadow: `inset 0 0 24px ${char.primaryColor}28`,
                          }}
                        />
                      </div>

                      {/* Info */}
                      <div className="p-3 shrink-0">
                        <p className="font-semibold text-sm text-cream font-nunito leading-tight">
                          {char.name}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: char.primaryColor }}
                          />
                          <span className="text-xs text-cream/50 font-nunito">
                            {char.series}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirm Panel */}
      {selected && (
        <div
          className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-xl border-t px-4 py-4"
          style={{
            background: "oklch(0.10 0.02 240 / 0.95)",
            borderColor: "oklch(0.72 0.12 85 / 0.2)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0"
              style={{
                borderColor: "oklch(0.72 0.12 85 / 0.6)",
                background: `linear-gradient(135deg, ${selected.primaryColor}33, ${selected.secondaryColor}22)`,
              }}
            >
              <img
                src={selected.imageUrl}
                alt={selected.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-cream text-sm truncate font-nunito">
                {selected.name}
              </p>
              <p className="text-cream/50 text-xs font-nunito">
                {selected.series}
              </p>
            </div>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={confirmed}
              data-ocid="char.confirm_button"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all active:scale-95 disabled:opacity-60 font-nunito"
              style={{
                background: "oklch(0.72 0.12 85)",
                color: "oklch(0.10 0.02 240)",
                boxShadow: "0 4px 16px oklch(0.72 0.12 85 / 0.4)",
              }}
            >
              {confirmed ? (
                <>
                  <Check className="w-4 h-4" />
                  Selected!
                </>
              ) : (
                <>
                  <Star className="w-4 h-4" />
                  Choose Guide
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getCharacterEmoji(id: string): string {
  const map: Record<string, string> = {
    naruto: "🍥",
    sasuke: "⚡",
    sakura: "🌸",
    goku: "🐉",
    sailormoon: "🌙",
    luffy: "🏴‍☠️",
    pikachu: "⚡",
    totoro: "🌿",
  };
  return map[id] || "✨";
}
