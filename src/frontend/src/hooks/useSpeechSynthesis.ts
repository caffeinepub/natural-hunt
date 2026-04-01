import { useCallback, useRef } from "react";

export interface VoiceConfig {
  pitch: number;
  rate: number;
  lang: string;
}

export function getCharacterVoiceConfig(characterId: string): VoiceConfig {
  const configs: Record<string, VoiceConfig> = {
    naruto: { pitch: 1.3, rate: 1.1, lang: "en-US" },
    sasuke: { pitch: 0.8, rate: 0.9, lang: "en-US" },
    sakura: { pitch: 1.4, rate: 1.0, lang: "en-US" },
    madara: { pitch: 0.5, rate: 0.8, lang: "en-US" },
    obito: { pitch: 0.7, rate: 0.85, lang: "en-US" },
    itachi: { pitch: 0.75, rate: 0.8, lang: "en-US" },
    goku: { pitch: 1.1, rate: 1.2, lang: "en-US" },
    sailormoon: { pitch: 1.5, rate: 1.0, lang: "en-US" },
    luffy: { pitch: 1.2, rate: 1.3, lang: "en-US" },
    pikachu: { pitch: 1.8, rate: 1.1, lang: "en-US" },
    totoro: { pitch: 0.6, rate: 0.7, lang: "en-US" },
  };
  return configs[characterId] ?? { pitch: 1.0, rate: 1.0, lang: "en-US" };
}

export function useSpeechSynthesis(
  config: VoiceConfig = { pitch: 1.0, rate: 1.0, lang: "en-US" },
) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeakingRef = useRef(false);

  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      isSpeakingRef.current = false;
    }
  }, [isSupported]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!isSupported) return;
      stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;
      utterance.lang = config.lang;

      utterance.onstart = () => {
        isSpeakingRef.current = true;
      };
      utterance.onend = () => {
        isSpeakingRef.current = false;
        onEnd?.();
      };
      utterance.onerror = () => {
        isSpeakingRef.current = false;
        onEnd?.();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [config, isSupported, stop],
  );

  return {
    speak,
    stop,
    isSpeaking: isSpeakingRef.current,
    isSupported,
  };
}
