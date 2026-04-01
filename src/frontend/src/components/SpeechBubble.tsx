import React, { useState, useEffect, useRef } from "react";

interface SpeechBubbleProps {
  text: string;
  isVisible: boolean;
  characterColor: string;
  side?: "left" | "right";
  onTypingComplete?: () => void;
}

const MAX_TEXT_LENGTH = 100;
const TYPING_SPEED_MS = 28;

export default function SpeechBubble({
  text,
  isVisible,
  characterColor,
  side = "right",
  onTypingComplete,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  // Truncate long text
  const fullText =
    text.length > MAX_TEXT_LENGTH
      ? `${text.slice(0, MAX_TEXT_LENGTH)}...`
      : text;

  useEffect(() => {
    if (!isVisible || !text) {
      setDisplayedText("");
      setIsTyping(false);
      indexRef.current = 0;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // Start typewriter effect
    setDisplayedText("");
    setIsTyping(true);
    indexRef.current = 0;

    const typeNext = () => {
      if (indexRef.current < fullText.length) {
        indexRef.current += 1;
        setDisplayedText(fullText.slice(0, indexRef.current));
        timerRef.current = setTimeout(typeNext, TYPING_SPEED_MS);
      } else {
        setIsTyping(false);
        onTypingComplete?.();
      }
    };

    timerRef.current = setTimeout(typeNext, TYPING_SPEED_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, isVisible, fullText, onTypingComplete]);

  if (!isVisible) return null;

  return (
    <div
      data-ocid="shimeji.speech_bubble"
      className="animate-bubble-appear"
      style={{
        position: "absolute",
        bottom: "100%",
        marginBottom: 8,
        ...(side === "right" ? { right: 0 } : { left: 0 }),
        zIndex: 60,
        pointerEvents: "none",
        width: 220,
      }}
    >
      {/* Bubble body */}
      <div
        style={{
          background: "rgba(8, 16, 12, 0.92)",
          border: `1.5px solid ${characterColor}`,
          borderRadius: 14,
          padding: "10px 13px",
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 16px ${characterColor}55, 0 4px 20px rgba(0,0,0,0.6)`,
          position: "relative",
        }}
      >
        {/* Typing indicator dot */}
        {isTyping && (
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: characterColor,
              marginLeft: 2,
              animation: "pulse 0.8s ease-in-out infinite",
              verticalAlign: "middle",
            }}
          />
        )}
        <p
          style={{
            color: "#f0f5f0",
            fontSize: 12,
            lineHeight: 1.55,
            margin: 0,
            fontFamily: "inherit",
            display: "inline",
          }}
        >
          {displayedText}
        </p>
      </div>

      {/* Tail pointing down toward character */}
      <div
        style={{
          position: "absolute",
          bottom: -9,
          ...(side === "right" ? { right: 22 } : { left: 22 }),
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `10px solid ${characterColor}`,
          filter: `drop-shadow(0 2px 4px ${characterColor}44)`,
          animation: "bubble-tail-pulse 1.5s ease-in-out infinite",
        }}
      />
      {/* Inner tail fill */}
      <div
        style={{
          position: "absolute",
          bottom: -7,
          ...(side === "right" ? { right: 24 } : { left: 24 }),
          width: 0,
          height: 0,
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "8px solid rgba(8, 16, 12, 0.92)",
        }}
      />
    </div>
  );
}
