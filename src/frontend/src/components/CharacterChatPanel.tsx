import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import type { ConversationMessage } from "../utils/generateCharacterResponse";

interface CharacterChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  character: AnimeCharacter;
  plant: PlantData;
  messages: ConversationMessage[];
  isResponding: boolean;
  onSendMessage: (text: string) => void;
  onTriggerTalking?: () => void;
}

const QUICK_REPLIES = [
  "Tell me more",
  "Is it safe?",
  "How do I grow it?",
  "Any tips?",
];

export default function CharacterChatPanel({
  isOpen,
  onClose,
  character,
  plant,
  messages,
  isResponding,
  onSendMessage,
  onTriggerTalking,
}: CharacterChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isResponding) return;
    setInputText("");
    onSendMessage(trimmed);
    if (onTriggerTalking) onTriggerTalking();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputText);
    }
  };

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop dismiss only
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stop propagation only */}
      <div
        role="presentation"
        className="w-full max-w-lg rounded-t-3xl flex flex-col"
        style={{
          background: "linear-gradient(180deg, #0f1a0f 0%, #0a1208 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "none",
          maxHeight: "80vh",
          animation: "slideUp 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-t-3xl shrink-0"
          style={{
            background: `linear-gradient(135deg, ${character.primaryColor}22, ${character.secondaryColor}22)`,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="w-10 h-10 rounded-full overflow-hidden shrink-0"
            style={{ boxShadow: `0 0 12px ${character.primaryColor}88` }}
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
            <div className="font-bold text-white text-sm">{character.name}</div>
            <div className="text-xs" style={{ color: character.primaryColor }}>
              Talking about {plant.name} {plant.emoji}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <X size={16} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          style={{ minHeight: 0 }}
        >
          {messages.length === 0 && (
            <div className="text-center py-8">
              <MessageCircle
                size={32}
                className="mx-auto mb-2 opacity-30 text-white"
              />
              <p className="text-sm text-white/40">
                Ask {character.name} anything about {plant.name}!
              </p>
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={`${msg.role}-${msg.timestamp}`}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {msg.role === "character" && (
                <div
                  className="w-8 h-8 rounded-full overflow-hidden shrink-0 self-end"
                  style={{ boxShadow: `0 0 8px ${character.primaryColor}66` }}
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
              )}
              <div
                className="max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed"
                style={
                  msg.role === "character"
                    ? {
                        background: `linear-gradient(135deg, ${character.primaryColor}33, ${character.secondaryColor}22)`,
                        border: `1px solid ${character.primaryColor}44`,
                        color: "#fff",
                        borderBottomLeftRadius: 4,
                      }
                    : {
                        background: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        borderBottomRightRadius: 4,
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isResponding && (
            <div className="flex gap-2">
              <div
                className="w-8 h-8 rounded-full overflow-hidden shrink-0 self-end"
                style={{ boxShadow: `0 0 8px ${character.primaryColor}66` }}
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
              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  background: `linear-gradient(135deg, ${character.primaryColor}33, ${character.secondaryColor}22)`,
                  border: `1px solid ${character.primaryColor}44`,
                  borderBottomLeftRadius: 4,
                }}
              >
                <div className="flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`dot-${i}`}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: character.primaryColor,
                        animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick replies */}
        <div
          className="px-4 py-2 flex gap-2 overflow-x-auto shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => handleSend(reply)}
              disabled={isResponding}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-40"
              style={{
                background: `${character.primaryColor}22`,
                border: `1px solid ${character.primaryColor}55`,
                color: character.primaryColor,
                whiteSpace: "nowrap",
              }}
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input */}
        <div
          className="px-4 py-3 flex gap-2 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${character.name}...`}
            disabled={isResponding}
            className="flex-1 rounded-full px-4 py-2 text-sm text-white outline-none disabled:opacity-50"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
          <button
            type="button"
            onClick={() => handleSend(inputText)}
            disabled={isResponding || !inputText.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-40"
            style={{
              background: character.primaryColor,
            }}
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
