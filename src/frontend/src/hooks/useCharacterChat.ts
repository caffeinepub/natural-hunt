import { useCallback, useState } from "react";
import type { SessionPlantScan } from "../contexts/SessionInteractionContext";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import {
  type ConversationMessage,
  generateCharacterResponse,
} from "../utils/generateCharacterResponse";

const MAX_HISTORY = 10; // 5 exchanges = 10 messages

interface UseCharacterChatOptions {
  plant: PlantData | null;
  character: AnimeCharacter | null;
  sessionInteractions?: SessionPlantScan[];
}

export function useCharacterChat({
  plant,
  character,
  sessionInteractions,
}: UseCharacterChatOptions) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);
  const togglePanel = useCallback(() => setIsPanelOpen((prev) => !prev), []);

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!plant || !character || isResponding) return;

      const userMsg: ConversationMessage = {
        role: "user",
        text: userText,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, userMsg];
        return updated.slice(-MAX_HISTORY);
      });

      setIsResponding(true);

      // Simulate a brief "thinking" delay for realism
      await new Promise((resolve) => setTimeout(resolve, 600));

      const history = messages.slice(-MAX_HISTORY);
      const response = generateCharacterResponse(
        userText,
        plant,
        character,
        history,
        sessionInteractions,
      );

      const charMsg: ConversationMessage = {
        role: "character",
        text: response,
        timestamp: Date.now(),
      };

      setMessages((prev) => {
        const updated = [...prev, charMsg];
        return updated.slice(-MAX_HISTORY);
      });

      setIsResponding(false);
    },
    [plant, character, isResponding, messages, sessionInteractions],
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isPanelOpen,
    isResponding,
    openPanel,
    closePanel,
    togglePanel,
    sendMessage,
    clearHistory,
  };
}
