import type React from "react";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { AnimationState } from "../hooks/useCharacterAnimation";
import Character3D from "./Character3D";

interface AnimatedCharacterProps {
  character: AnimeCharacter;
  size?: "sm" | "md" | "lg";
  animationState?: AnimationState;
  showGlow?: boolean;
}

export default function AnimatedCharacter({
  character,
  size = "md",
  animationState = "idle",
  showGlow = true,
}: AnimatedCharacterProps) {
  const sizeMap = {
    sm: { container: "w-16 h-16", canvas: 64 },
    md: { container: "w-24 h-24", canvas: 96 },
    lg: { container: "w-32 h-32", canvas: 128 },
  };

  const { container } = sizeMap[size];

  const glowColor = character.primaryColor;

  const glowStyle: React.CSSProperties = showGlow
    ? {
        filter: `drop-shadow(0 0 ${animationState === "alert" ? "16px" : animationState === "celebrating" ? "20px" : "8px"} ${glowColor})`,
        transition: "filter 0.3s ease",
      }
    : {};

  return (
    <div className={`relative ${container} flex items-center justify-center`}>
      <div
        className={`${container} rounded-full overflow-hidden`}
        style={glowStyle}
      >
        <Character3D character={character} animationState={animationState} />
      </div>
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor}${animationState === "alert" ? "40" : "20"} 0%, transparent 70%)`,
            transition: "background 0.3s ease",
          }}
        />
      )}
    </div>
  );
}
