import { MessageCircle } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { AnimationState } from "../hooks/useCharacterAnimation";
import {
  type ShimejiState,
  useShimejiMovement,
} from "../hooks/useShimejiMovement";
import ShimejiChatInput from "./ShimejiChatInput";
import SpeechBubble from "./SpeechBubble";

interface ShimejiCharacterProps {
  character: AnimeCharacter;
  animationState?: AnimationState;
  onTap?: () => void;
  speechText?: string;
  isSpeaking?: boolean;
  onChat?: (text: string) => void;
  isResponding?: boolean;
}

function getAnimationClass(state: ShimejiState): string {
  switch (state) {
    case "walkLeft":
    case "walkRight":
      return "animate-shimeji-walk";
    case "jump":
    case "falling":
      return "animate-shimeji-jump";
    case "celebrating":
      return "animate-shimeji-celebrate";
    case "talking":
      return "animate-shimeji-talk";
    case "sit":
      return "animate-shimeji-sit";
    default:
      return "animate-shimeji-idle";
  }
}

function getGlowIntensity(state: ShimejiState): number {
  switch (state) {
    case "celebrating":
      return 1.0;
    case "talking":
      return 0.85;
    case "jump":
    case "falling":
      return 0.7;
    case "walkLeft":
    case "walkRight":
      return 0.5;
    default:
      return 0.4;
  }
}

export default function ShimejiCharacter({
  character,
  animationState,
  onTap,
  speechText = "",
  isSpeaking = false,
  onChat,
  isResponding = false,
}: ShimejiCharacterProps) {
  const {
    position,
    shimejiState,
    facingRight,
    setPosition,
    triggerTalking,
    triggerCelebrating,
    triggerIdle,
  } = useShimejiMovement();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync external animation state with shimeji movement
  useEffect(() => {
    if (!animationState) return;
    if (animationState === "talking") {
      triggerTalking();
    } else if (animationState === "celebrating") {
      triggerCelebrating();
    } else {
      triggerIdle();
    }
  }, [animationState, triggerTalking, triggerCelebrating, triggerIdle]);

  // Resolve display state: external override wins
  const displayState: ShimejiState = (() => {
    if (animationState === "talking") return "talking";
    if (animationState === "celebrating") return "celebrating";
    return shimejiState;
  })();

  const animClass = getAnimationClass(displayState);
  const glowIntensity = getGlowIntensity(displayState);
  const glowAlpha = Math.round(glowIntensity * 255)
    .toString(16)
    .padStart(2, "0");

  // Horizontal flip: walkLeft flips, walkRight/default stays
  const shouldFlip =
    displayState === "walkLeft" ||
    (!facingRight && displayState !== "walkRight");

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      setHasMoved(false);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        posX: position.x,
        posY: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        setHasMoved(true);
      }
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    },
    [isDragging, setPosition],
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    if (!hasMoved) {
      onTap?.();
    }
  }, [hasMoved, onTap]);

  const handleChatButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleChatSend = useCallback(
    (text: string) => {
      onChat?.(text);
      setIsChatOpen(false);
    },
    [onChat],
  );

  // Is bubble showing?
  const showBubble = (isSpeaking || !!speechText) && !!speechText;

  // Determine bubble side based on character x position
  const bubbleSide: "left" | "right" =
    position.x > window.innerWidth / 2 ? "left" : "right";

  const shimejImageUrl =
    (character as AnimeCharacter & { shimejImageUrl?: string })
      .shimejImageUrl ?? character.imageUrl;

  return (
    <>
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
          width: 96,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Speech bubble above character */}
        <SpeechBubble
          text={speechText}
          isVisible={showBubble}
          characterColor={character.primaryColor}
          side={bubbleSide}
        />

        {/* Character sprite container */}
        <div
          className={animClass}
          style={{
            width: 96,
            height: 144,
            position: "relative",
            transform: shouldFlip ? "scaleX(-1)" : "scaleX(1)",
            filter: `drop-shadow(0 0 ${6 + glowIntensity * 10}px ${character.primaryColor}${glowAlpha})`,
            transition: "filter 0.3s ease",
          }}
        >
          <img
            src={shimejImageUrl}
            alt={character.name}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              pointerEvents: "none",
              imageRendering: "pixelated",
            }}
            onError={(e) => {
              // Fallback to avatar image
              (e.target as HTMLImageElement).src = character.imageUrl;
            }}
          />

          {/* Subtle ground shadow */}
          <div
            style={{
              position: "absolute",
              bottom: -4,
              left: "50%",
              transform: "translateX(-50%)",
              width: 60,
              height: 8,
              borderRadius: "50%",
              background: `radial-gradient(ellipse, ${character.primaryColor}44 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Character name badge */}
        <div
          style={{
            position: "absolute",
            bottom: -20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.75)",
            color: character.primaryColor,
            fontSize: 9,
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: 8,
            whiteSpace: "nowrap",
            border: `1px solid ${character.primaryColor}55`,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          {character.name}
        </div>

        {/* Chat trigger button */}
        <button
          type="button"
          data-ocid="shimeji.chat_button"
          onClick={handleChatButtonClick}
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${character.primaryColor}, ${character.secondaryColor})`,
            border: "2px solid rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 52,
            boxShadow: `0 0 12px ${character.primaryColor}88`,
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <MessageCircle size={12} style={{ color: "#fff" }} />
        </button>

        {/* Responding indicator */}
        {isResponding && (
          <div
            style={{
              position: "absolute",
              top: 48,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 4,
              pointerEvents: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: character.primaryColor,
                  animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating chat input */}
      <ShimejiChatInput
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onSend={handleChatSend}
        character={character}
        position={position}
        isResponding={isResponding}
      />
    </>
  );
}
