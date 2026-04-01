import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface SessionPlantScan {
  plantName: string;
  timestamp: number;
  topics: string[];
}

export interface SessionInteractionState {
  scannedPlants: SessionPlantScan[];
  conversationTopics: string[];
}

interface SessionInteractionContextValue {
  state: SessionInteractionState;
  addPlantScan: (plantName: string, topics?: string[]) => void;
  addConversationTopic: (topic: string) => void;
  getScannedPlants: () => SessionPlantScan[];
  clearSession: () => void;
}

const SessionInteractionContext =
  createContext<SessionInteractionContextValue | null>(null);

export function SessionInteractionProvider({
  children,
}: { children: ReactNode }) {
  const [state, setState] = useState<SessionInteractionState>({
    scannedPlants: [],
    conversationTopics: [],
  });

  const addPlantScan = useCallback(
    (plantName: string, topics: string[] = []) => {
      setState((prev) => {
        const alreadyScanned = prev.scannedPlants.some(
          (p) => p.plantName === plantName,
        );
        if (alreadyScanned) {
          return prev;
        }
        return {
          ...prev,
          scannedPlants: [
            ...prev.scannedPlants,
            { plantName, timestamp: Date.now(), topics },
          ],
        };
      });
    },
    [],
  );

  const addConversationTopic = useCallback((topic: string) => {
    setState((prev) => ({
      ...prev,
      conversationTopics: [...prev.conversationTopics, topic],
    }));
  }, []);

  const getScannedPlants = useCallback(() => {
    return state.scannedPlants;
  }, [state.scannedPlants]);

  const clearSession = useCallback(() => {
    setState({ scannedPlants: [], conversationTopics: [] });
  }, []);

  return (
    <SessionInteractionContext.Provider
      value={{
        state,
        addPlantScan,
        addConversationTopic,
        getScannedPlants,
        clearSession,
      }}
    >
      {children}
    </SessionInteractionContext.Provider>
  );
}

export function useSessionInteraction() {
  const ctx = useContext(SessionInteractionContext);
  if (!ctx)
    throw new Error(
      "useSessionInteraction must be used within SessionInteractionProvider",
    );
  return ctx;
}
