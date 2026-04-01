import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { AnimationState } from "../hooks/useCharacterAnimation";

interface DraggableMascotProps {
  character: AnimeCharacter;
  onTap?: () => void;
  animationState?: AnimationState;
}

export default function DraggableMascot({
  character,
  onTap,
  animationState = "idle",
}: DraggableMascotProps) {
  const [position, setPosition] = useState({ x: 20, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prevCharacterId = useRef(character.id);

  // Animate on character change
  useEffect(() => {
    if (prevCharacterId.current !== character.id) {
      prevCharacterId.current = character.id;
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  }, [character.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasMoved(true);
    }
    setPosition({
      x: dragStart.current.posX + dx,
      y: dragStart.current.posY + dy,
    });
  };

  const handlePointerUp = (_e: React.PointerEvent) => {
    setIsDragging(false);
    if (!hasMoved && onTap) {
      onTap();
    }
  };

  // Glow color based on animation state
  const glowColor = character.primaryColor;
  const glowSize =
    animationState === "alert"
      ? "20px"
      : animationState === "celebrating"
        ? "24px"
        : animationState === "talking"
          ? "16px"
          : "10px";
  const glowOpacity =
    animationState === "alert"
      ? "0.9"
      : animationState === "celebrating"
        ? "1.0"
        : animationState === "talking"
          ? "0.8"
          : "0.6";

  // Alert state: add a pulsing ring
  const showAlertRing = animationState === "alert";

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          boxShadow: `0 0 ${glowSize} ${glowColor}${Math.round(
            Number.parseFloat(glowOpacity) * 255,
          )
            .toString(16)
            .padStart(2, "0")}`,
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          transform: isAnimating
            ? "scale(1.2) rotate(10deg)"
            : animationState === "alert"
              ? "scale(1.08)"
              : "scale(1)",
        }}
      >
        <img
          src={character.imageUrl}
          alt={character.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          }}
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback emoji */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            background: `linear-gradient(135deg, ${character.primaryColor}33, ${character.secondaryColor}33)`,
          }}
        >
          {character.emoji}
        </div>
      </div>

      {/* Alert pulsing ring */}
      {showAlertRing && (
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: `3px solid ${glowColor}`,
            animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
            opacity: 0.75,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Character name tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: -22,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          fontSize: 10,
          padding: "2px 6px",
          borderRadius: 8,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {character.name}
      </div>
    </div>
  );
}
