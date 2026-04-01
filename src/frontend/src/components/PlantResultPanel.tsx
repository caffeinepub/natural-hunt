import {
  AlertTriangle,
  CheckCircle,
  Heart,
  Leaf,
  MessageCircle,
  Stethoscope,
  Volume2,
  VolumeX,
  X,
  XCircle,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useSessionInteraction } from "../contexts/SessionInteractionContext";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import type { AnimationState } from "../hooks/useCharacterAnimation";
import { useCharacterChat } from "../hooks/useCharacterChat";
import {
  getCharacterVoiceConfig,
  useSpeechSynthesis,
} from "../hooks/useSpeechSynthesis";
import type { RealPlantResult } from "../types/identification";
import { generatePlantNarration } from "../utils/generatePlantNarration";
import CharacterChatPanel from "./CharacterChatPanel";

interface PlantResultPanelProps {
  result: RealPlantResult;
  character: AnimeCharacter;
  onClose: () => void;
  onSave: () => void;
  onAnimationStateChange?: (state: AnimationState) => void;
}

export default function PlantResultPanel({
  result,
  character,
  onClose,
  onSave,
  onAnimationStateChange,
}: PlantResultPanelProps) {
  const rawPlant = result.plantData;
  const rawPlantWithId = rawPlant as unknown as { id?: string };
  const plant: PlantData = {
    id: rawPlantWithId.id ?? rawPlant.name.toLowerCase().replace(/\s+/g, "-"),
    name: rawPlant.name,
    scientificName: rawPlant.scientificName,
    emoji: rawPlant.emoji,
    category: rawPlant.category,
    healthBenefits: rawPlant.healthBenefits,
    ecologicalBenefits: rawPlant.ecologicalBenefits,
    funFact: rawPlant.funFact,
    accentColor: rawPlant.accentColor,
    warnings: rawPlant.warnings,
    medicalUses: rawPlant.medicalUses,
  };

  const voiceConfig = getCharacterVoiceConfig(character.id);
  const { speak, stop, isSpeaking, isSupported } =
    useSpeechSynthesis(voiceConfig);
  const { state: sessionState } = useSessionInteraction();
  const [hasNarrated, setHasNarrated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { messages, isResponding, sendMessage } = useCharacterChat({
    plant,
    character,
    sessionInteractions: sessionState.scannedPlants,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount
  useEffect(() => {
    if (!hasNarrated && isSupported) {
      setHasNarrated(true);
      const narration = generatePlantNarration(
        plant,
        character,
        sessionState.scannedPlants,
      );
      if (onAnimationStateChange) onAnimationStateChange("talking");
      speak(narration, () => {
        if (onAnimationStateChange) onAnimationStateChange("idle");
      });
    }
    return () => stop();
  }, []);

  const handleToggleNarration = () => {
    if (isSpeaking) {
      stop();
      if (onAnimationStateChange) onAnimationStateChange("idle");
    } else {
      const narration = generatePlantNarration(
        plant,
        character,
        sessionState.scannedPlants,
      );
      if (onAnimationStateChange) onAnimationStateChange("talking");
      speak(narration, () => {
        if (onAnimationStateChange) onAnimationStateChange("idle");
      });
    }
  };

  const handleChatSend = (text: string) => {
    sendMessage(text);
    if (onAnimationStateChange) onAnimationStateChange("talking");
    setTimeout(() => {
      if (onAnimationStateChange) onAnimationStateChange("idle");
    }, 3000);
  };

  // Build character-specific intro line for speech bubble
  const getCharacterIntro = () => {
    switch (character.id) {
      case "naruto":
        return `Dattebayo! This is ${plant.name}! Here's what I found, believe it!`;
      case "sasuke":
        return `${plant.name}. Analyzing... Don't underestimate what nature reveals.`;
      case "sakura":
        return `As a medical ninja, I can tell you — ${plant.name} is quite remarkable!`;
      case "madara":
        return "...This plant bows to the laws of nature, as all things must. Observe its power.";
      case "obito":
        return "Even this plant... lives and dies as part of an infinite dream. Let me show you its truth.";
      case "itachi":
        return "Study this plant carefully. Knowledge is the only true weapon.";
      case "goku":
        return `Wow! This is ${plant.name}! I bet it makes you way stronger!`;
      case "sailormoon":
        return `In the name of the Moon — ${plant.name} is nature's beautiful gift!`;
      case "luffy":
        return `Shishishi! ${plant.name}! That's so cool! Is it edible?`;
      case "pikachu":
        return `Pika pika! ${plant.name}! This plant is super effective! Chu~!`;
      case "totoro":
        return `Ohhh~ ${plant.name}. The forest knows this one well. Totoro~`;
      default:
        return `I found a ${plant.name}! Ask me anything about it!`;
    }
  };

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0f1a0f 0%, #0a1208 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "none",
          maxHeight: "85vh",
        }}
        data-ocid="plant_result.panel"
      >
        {/* Character accent bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${character.primaryColor}, ${plant.accentColor}, ${character.primaryColor})`,
          }}
        />

        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          {/* Character portrait with glow */}
          <div
            className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2"
            style={{
              borderColor: character.primaryColor,
              boxShadow: `0 0 20px ${character.primaryColor}88, 0 0 40px ${character.primaryColor}44`,
            }}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{plant.emoji}</span>
              <h2 className="text-lg font-bold text-white truncate font-playfair">
                {plant.name}
              </h2>
            </div>
            <p className="text-xs text-white/50 truncate italic">
              {plant.scientificName}
            </p>
            <div
              className="inline-block text-xs px-2 py-0.5 rounded-full mt-1"
              style={{
                background: `${plant.accentColor}22`,
                border: `1px solid ${plant.accentColor}55`,
                color: plant.accentColor,
              }}
            >
              {plant.category}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {isSupported && (
              <button
                type="button"
                onClick={handleToggleNarration}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: isSpeaking
                    ? `${character.primaryColor}33`
                    : "rgba(255,255,255,0.1)",
                  border: `1px solid ${isSpeaking ? character.primaryColor : "rgba(255,255,255,0.2)"}`,
                }}
                data-ocid="plant_result.toggle"
              >
                {isSpeaking ? (
                  <VolumeX size={16} className="text-white" />
                ) : (
                  <Volume2 size={16} className="text-white" />
                )}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)" }}
              data-ocid="plant_result.close_button"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Character speech bubble — personality-driven */}
        <div
          className="mx-4 mb-3 px-4 py-3 rounded-2xl relative"
          style={{
            background: `linear-gradient(135deg, ${character.primaryColor}22, ${character.secondaryColor}11)`,
            border: `1px solid ${character.primaryColor}44`,
            boxShadow: `0 0 16px ${character.primaryColor}22`,
          }}
        >
          {/* Bubble tail */}
          <div
            className="absolute -bottom-2 left-8 w-4 h-4 rotate-45"
            style={{
              background: `${character.primaryColor}22`,
              border: `1px solid ${character.primaryColor}44`,
            }}
          />
          <p className="text-sm text-white/90 leading-relaxed font-nunito">
            <span
              className="font-bold"
              style={{ color: character.primaryColor }}
            >
              {character.name}:
            </span>{" "}
            {isSpeaking ? (
              <span className="italic text-white/60">Speaking...</span>
            ) : (
              getCharacterIntro()
            )}
          </p>
        </div>

        {/* Scrollable content */}
        <div
          className="overflow-y-auto px-4 pb-6"
          style={{ maxHeight: "calc(85vh - 200px)" }}
        >
          {/* ✅ ADVANTAGES Section */}
          {plant.healthBenefits && plant.healthBenefits.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "#22c55e22",
                    border: "1px solid #22c55e44",
                  }}
                >
                  <CheckCircle size={12} style={{ color: "#22c55e" }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#22c55e" }}
                >
                  Advantages
                </span>
              </div>
              <div className="space-y-1.5">
                {plant.healthBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <span className="text-green-400 font-bold text-sm mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span className="text-sm text-white/80 font-nunito">
                      {benefit}
                    </span>
                  </div>
                ))}
                {plant.ecologicalBenefits?.slice(0, 2).map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2">
                    <span className="text-green-400 font-bold text-sm mt-0.5 shrink-0">
                      ✓
                    </span>
                    <span className="text-sm text-white/80 font-nunito">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ❌ DISADVANTAGES Section */}
          {plant.warnings && plant.warnings.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "#ef444422",
                    border: "1px solid #ef444444",
                  }}
                >
                  <XCircle size={12} style={{ color: "#ef4444" }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#ef4444" }}
                >
                  Disadvantages
                </span>
              </div>
              <div className="space-y-1.5">
                {plant.warnings.map((warning) => (
                  <div key={warning} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold text-sm mt-0.5 shrink-0">
                      ✗
                    </span>
                    <span className="text-sm text-white/75 font-nunito">
                      {warning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 💊 MEDICAL USES Section */}
          {plant.medicalUses && plant.medicalUses.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: "#06b6d422",
                    border: "1px solid #06b6d444",
                  }}
                >
                  <Stethoscope size={12} style={{ color: "#06b6d4" }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#06b6d4" }}
                >
                  Medical Uses
                </span>
              </div>
              <div className="space-y-1.5">
                {plant.medicalUses.map((use) => (
                  <div key={use} className="flex items-start gap-2">
                    <span
                      style={{ color: "#06b6d4" }}
                      className="text-sm mt-0.5 shrink-0"
                    >
                      •
                    </span>
                    <span className="text-sm text-white/80 font-nunito">
                      {use}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🌿 Fun Fact */}
          {plant.funFact && (
            <div
              className="mb-4 p-3 rounded-xl"
              style={{
                background: `${plant.accentColor}15`,
                border: `1px solid ${plant.accentColor}33`,
              }}
            >
              <p className="text-xs text-white/60 mb-1 font-bold uppercase tracking-wider">
                ✨ Fun Fact
              </p>
              <p className="text-sm text-white/80 font-nunito">
                {plant.funFact}
              </p>
            </div>
          )}

          {/* Ecological Benefits */}
          {plant.ecologicalBenefits && plant.ecologicalBenefits.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf size={14} style={{ color: "#86efac" }} />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                  Ecological Benefits
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {plant.ecologicalBenefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(134,239,172,0.1)",
                      border: "1px solid rgba(134,239,172,0.3)",
                      color: "#86efac",
                    }}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${character.primaryColor}33, ${character.secondaryColor}22)`,
                border: `1px solid ${character.primaryColor}55`,
                color: character.primaryColor,
              }}
              data-ocid="plant_result.secondary_button"
            >
              <MessageCircle size={16} />
              Chat with {character.name}
            </button>
            <button
              type="button"
              onClick={onSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${plant.accentColor}44, ${plant.accentColor}22)`,
                border: `1px solid ${plant.accentColor}66`,
                color: plant.accentColor,
              }}
              data-ocid="plant_result.primary_button"
            >
              <Heart size={16} />
              Save Plant
            </button>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <CharacterChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        character={character}
        plant={plant}
        messages={messages}
        isResponding={isResponding}
        onSendMessage={handleChatSend}
        onTriggerTalking={() => {
          if (onAnimationStateChange) onAnimationStateChange("talking");
        }}
      />
    </>
  );
}
