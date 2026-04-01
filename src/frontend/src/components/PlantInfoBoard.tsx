import {
  AlertTriangle,
  Leaf,
  Stethoscope,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { animeCharacters } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { generatePlantNarration } from "../utils/generatePlantNarration";

interface PlantInfoBoardProps {
  plant: PlantData;
  onClose: () => void;
}

export default function PlantInfoBoard({
  plant,
  onClose,
}: PlantInfoBoardProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const { data: userProfile } = useGetCallerUserProfile();
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const fullText = plant.funFact;

  const character = userProfile?.character
    ? animeCharacters.find((c) => c.id === userProfile.character.id) ||
      animeCharacters[0]
    : animeCharacters[0];

  // biome-ignore lint/correctness/useExhaustiveDependencies: reset typewriter on plant change
  useEffect(() => {
    setDisplayedText("");
    setCharIndex(0);
  }, [plant.name]);

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [charIndex, fullText]);

  const handleSpeak = useCallback(() => {
    const script = generatePlantNarration(plant, character);
    speak(script);
  }, [plant, character, speak]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      />

      <div
        className="relative rounded-2xl w-full max-w-sm max-h-[80vh] overflow-y-auto"
        style={{
          background: "oklch(0.14 0.03 145 / 0.97)",
          backdropFilter: "blur(20px)",
          border: "1px solid oklch(0.30 0.04 145 / 0.4)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{plant.emoji}</span>
            <div>
              <h2 className="font-bold text-white">{plant.name}</h2>
              <p className="text-white/50 text-xs italic">
                {plant.scientificName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Narration */}
        {isSupported && (
          <div className="px-4 pt-4">
            <div
              className="flex items-center gap-2 rounded-xl p-3"
              style={{
                background: "oklch(0.18 0.04 145 / 0.6)",
                border: "1px solid oklch(0.35 0.05 145 / 0.3)",
              }}
            >
              {isSpeaking ? (
                <div className="flex gap-0.5 items-end h-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-yellow-400 rounded-full animate-pulse"
                      style={{ height: `${8 + i * 3}px` }}
                    />
                  ))}
                </div>
              ) : (
                <Volume2 className="w-4 h-4 text-yellow-400" />
              )}
              <span className="text-white/70 text-xs flex-1">
                {isSpeaking ? "Speaking..." : `${character.name} narration`}
              </span>
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={stop}
                  className="px-2 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs"
                >
                  <VolumeX className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="px-2 py-1 rounded-lg text-xs"
                  style={{
                    background: "oklch(0.72 0.12 85 / 0.2)",
                    color: "oklch(0.72 0.12 85)",
                  }}
                >
                  Play
                </button>
              )}
            </div>
          </div>
        )}

        {/* Fun Fact Typewriter */}
        <div className="px-4 pt-4">
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
            ✨ Fun Fact
          </p>
          <p className="text-white/80 text-sm leading-relaxed">
            {displayedText}
            {charIndex < fullText.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
        </div>

        {/* Health Benefits */}
        {plant.healthBenefits && plant.healthBenefits.length > 0 && (
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-xs font-semibold uppercase tracking-wider">
                Health Benefits
              </p>
            </div>
            <ul className="space-y-1">
              {plant.healthBenefits.map((b) => (
                <li
                  key={b}
                  className="text-white/70 text-sm flex items-start gap-2"
                >
                  <span className="text-green-400 mt-0.5">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Warnings */}
        {plant.warnings && plant.warnings.length > 0 && (
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Warnings
              </p>
            </div>
            <ul className="space-y-1">
              {plant.warnings.map((w) => (
                <li
                  key={w}
                  className="text-white/70 text-sm flex items-start gap-2"
                >
                  <span className="text-amber-400 mt-0.5">⚠</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Medical Uses */}
        {plant.medicalUses && plant.medicalUses.length > 0 && (
          <div className="px-4 pt-4 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-blue-400" />
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Medical Uses
              </p>
            </div>
            <ul className="space-y-1">
              {plant.medicalUses.map((m) => (
                <li
                  key={m}
                  className="text-white/70 text-sm flex items-start gap-2"
                >
                  <span className="text-blue-400 mt-0.5">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
