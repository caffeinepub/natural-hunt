import { Mic, MicOff, Send, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { AnimeCharacter } from "../data/animeCharacters";

interface ShimejiChatInputProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  character: AnimeCharacter;
  position: { x: number; y: number };
  isResponding: boolean;
}

// Web Speech API type augmentation
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}
interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
}

export default function ShimejiChatInput({
  isOpen,
  onClose,
  onSend,
  character,
  position,
  isResponding,
}: ShimejiChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const speechSupported =
    typeof window !== "undefined" &&
    (!!window.SpeechRecognition || !!window.webkitSpeechRecognition);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  // Calculate popup position to stay in viewport
  const POPUP_WIDTH = 280;
  const POPUP_HEIGHT = 64;
  const MARGIN = 12;

  let popupX = position.x - POPUP_WIDTH / 2 + 48; // center on character
  let popupY = position.y - POPUP_HEIGHT - 170; // above character and bubble

  // Clamp to viewport
  popupX = Math.max(
    MARGIN,
    Math.min(window.innerWidth - POPUP_WIDTH - MARGIN, popupX),
  );
  popupY = Math.max(
    MARGIN,
    Math.min(window.innerHeight - POPUP_HEIGHT - MARGIN, popupY),
  );

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isResponding) return;
    setInputText("");
    onSend(trimmed);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  const toggleListening = () => {
    if (!speechSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setInputText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: click-stop only, no nav needed
    <div
      role="presentation"
      style={{
        position: "fixed",
        left: popupX,
        top: popupY,
        zIndex: 65,
        width: POPUP_WIDTH,
        animation:
          "bubble-appear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          background: "rgba(8, 16, 12, 0.95)",
          border: `1.5px solid ${character.primaryColor}88`,
          borderRadius: 32,
          padding: "8px 10px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 20px ${character.primaryColor}44, 0 8px 32px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Voice button */}
        {speechSupported && (
          <button
            type="button"
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            onClick={toggleListening}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: isListening
                ? character.primaryColor
                : "rgba(255,255,255,0.1)",
              border: `1px solid ${isListening ? character.primaryColor : "rgba(255,255,255,0.2)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
          >
            {isListening ? (
              <MicOff size={14} style={{ color: "#fff" }} />
            ) : (
              <Mic size={14} style={{ color: character.primaryColor }} />
            )}
          </button>
        )}

        {/* Text input */}
        <input
          ref={inputRef}
          data-ocid="shimeji.chat_input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask ${character.name}...`}
          disabled={isResponding}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f0f5f0",
            fontSize: 13,
            fontFamily: "inherit",
          }}
        />

        {/* Send button */}
        <button
          type="button"
          data-ocid="shimeji.chat_submit_button"
          onClick={handleSend}
          disabled={isResponding || !inputText.trim()}
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: inputText.trim()
              ? character.primaryColor
              : "rgba(255,255,255,0.1)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: inputText.trim() ? "pointer" : "default",
            flexShrink: 0,
            transition: "all 0.2s ease",
            opacity: isResponding ? 0.5 : 1,
          }}
        >
          <Send size={14} style={{ color: "#fff" }} />
        </button>

        {/* Close */}
        <button
          type="button"
          aria-label="Close chat"
          onClick={onClose}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <X size={12} style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>
      </div>
    </div>
  );
}
