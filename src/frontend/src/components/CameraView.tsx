import { BookOpen, Camera, RotateCcw, Zap } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSessionInteraction } from "../contexts/SessionInteractionContext";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { PlantData } from "../data/plantDatabase";
import type { AnimationState } from "../hooks/useCharacterAnimation";
import { useCharacterChat } from "../hooks/useCharacterChat";
import { usePlantIdentification } from "../hooks/usePlantIdentification";
import { useAddIdentification } from "../hooks/useQueries";
import type {
  ClassificationResult,
  RealPlantResult,
} from "../types/identification";
import NotPlantOverlay from "./NotPlantOverlay";
import NotRealOverlay from "./NotRealOverlay";
import PlantResultPanel from "./PlantResultPanel";
import PointsCounter from "./PointsCounter";
import ShimejiCharacter from "./ShimejiCharacter";

interface CameraViewProps {
  character: AnimeCharacter;
  onViewDiscoveries: () => void;
}

type ScanState = "idle" | "scanning" | "result" | "not_plant" | "not_real";

export default function CameraView({
  character,
  onViewDiscoveries,
}: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [scanState, setScanState] = useState<ScanState>("idle");
  const [identificationResult, setIdentificationResult] =
    useState<ClassificationResult | null>(null);
  const [mascotAnimationState, setMascotAnimationState] =
    useState<AnimationState>("idle");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [currentSpeechText, setCurrentSpeechText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const { identify, isIdentifying } = usePlantIdentification();
  const addIdentification = useAddIdentification();
  const { addPlantScan } = useSessionInteraction();

  const currentPlant: PlantData | null = React.useMemo(() => {
    if (!identificationResult || identificationResult.type !== "real_plant")
      return null;
    const p = identificationResult.plantData;
    const pAny = p as unknown as { id?: string };
    return {
      id: pAny.id ?? p.name.toLowerCase().replace(/\s+/g, "-"),
      name: p.name,
      scientificName: p.scientificName,
      emoji: p.emoji,
      category: p.category,
      healthBenefits: p.healthBenefits,
      ecologicalBenefits: p.ecologicalBenefits,
      funFact: p.funFact,
      accentColor: p.accentColor,
      warnings: p.warnings,
      medicalUses: p.medicalUses,
    };
  }, [identificationResult]);

  const { state: sessionState } = useSessionInteraction();
  const { isResponding: chatIsResponding, sendMessage: chatSendMessage } =
    useCharacterChat({
      plant: currentPlant,
      character,
      sessionInteractions: sessionState.scannedPlants,
    });

  // Start camera
  useEffect(() => {
    let mounted = true;
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        if (!mounted) {
          for (const t of stream.getTracks()) t.stop();
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = async () => {
            if (!mounted) return;
            try {
              await videoRef.current?.play();
            } catch {
              // autoplay may be blocked, that's ok
            }
            if (mounted) setCameraReady(true);
          };
        }
      } catch {
        // Try front camera as fallback
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
          });
          if (!mounted) {
            for (const t of fallbackStream.getTracks()) t.stop();
            return;
          }
          streamRef.current = fallbackStream;
          if (videoRef.current) {
            videoRef.current.srcObject = fallbackStream;
            videoRef.current.onloadedmetadata = async () => {
              if (!mounted) return;
              try {
                await videoRef.current?.play();
              } catch {
                /* ok */
              }
              if (mounted) setCameraReady(true);
            };
          }
        } catch {
          if (mounted)
            setCameraError(
              "Unable to access camera. Please check permissions.",
            );
        }
      }
    };
    startCamera();
    return () => {
      mounted = false;
      if (streamRef.current) {
        for (const t of streamRef.current.getTracks()) t.stop();
      }
    };
  }, []);

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.85);
  }, []);

  const showSpeech = useCallback((text: string, durationMs = 5000) => {
    if (speechClearTimerRef.current) clearTimeout(speechClearTimerRef.current);
    setCurrentSpeechText(text);
    setIsSpeaking(true);
    speechClearTimerRef.current = setTimeout(() => {
      setCurrentSpeechText("");
      setIsSpeaking(false);
    }, durationMs);
  }, []);

  useEffect(() => {
    return () => {
      if (speechClearTimerRef.current)
        clearTimeout(speechClearTimerRef.current);
    };
  }, []);

  const handleCapture = useCallback(async () => {
    if (!cameraReady || isIdentifying || scanState !== "idle") return;
    setScanState("scanning");
    setMascotAnimationState("idle");
    showSpeech(
      `I'm scanning... let me identify this plant! ${character.personality.interjections[0]}`,
    );

    const imageDataUrl = capturePhoto();
    if (!imageDataUrl) {
      setScanState("idle");
      return;
    }

    const result = await identify(imageDataUrl);
    if (!result) {
      setScanState("idle");
      return;
    }

    setIdentificationResult(result);

    if (result.type === "real_plant") {
      addPlantScan(
        result.plantData.name,
        result.plantData.healthBenefits || [],
      );
      showSpeech(
        `${character.personality.interjections[0]} I found a ${result.plantData.name}! ${character.personality.catchphrases[0]}`,
      );
      setMascotAnimationState("alert");
      setTimeout(() => {
        setScanState("result");
        setMascotAnimationState("talking");
      }, 800);
    } else if (result.type === "not_plant") {
      setScanState("not_plant");
      setMascotAnimationState("idle");
      showSpeech(
        "Hmm, that doesn't look like a plant to me! Try pointing at a real plant.",
      );
    } else {
      setScanState("not_real");
      setMascotAnimationState("idle");
      showSpeech("I need a real photo to analyze. Please use your camera!");
    }
  }, [
    cameraReady,
    isIdentifying,
    scanState,
    capturePhoto,
    identify,
    addPlantScan,
    showSpeech,
    character.personality.interjections,
    character.personality.catchphrases,
  ]);

  const handleSavePlant = useCallback(async () => {
    if (!identificationResult || identificationResult.type !== "real_plant")
      return;
    const plant = identificationResult.plantData;
    setMascotAnimationState("celebrating");
    showSpeech(
      `${character.personality.catchphrases[1] ?? character.personality.catchphrases[0]} Plant saved to your collection!`,
    );
    try {
      await addIdentification.mutateAsync({
        plantName: plant.name,
        imageUrl: plant.emoji,
        identificationDate: BigInt(Date.now()),
      });
    } catch {
      /* non-critical */
    }
    setTimeout(() => setMascotAnimationState("idle"), 2000);
  }, [identificationResult, addIdentification, character, showSpeech]);

  const handleReset = useCallback(() => {
    setScanState("idle");
    setIdentificationResult(null);
    setMascotAnimationState("idle");
    setCurrentSpeechText("");
    setIsSpeaking(false);
  }, []);

  const handleAnimationStateChange = useCallback((state: AnimationState) => {
    setMascotAnimationState(state);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera error */}
      {cameraError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-10"
          data-ocid="camera.error_state"
        >
          <div className="text-center text-white p-6">
            <Camera size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-bold mb-2">Camera Error</p>
            <p className="text-sm text-white/60 mb-4">{cameraError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-full text-white font-medium"
              style={{ background: character.primaryColor }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Scan overlay corners (idle) — thicker, rounded-2xl */}
      {scanState === "idle" && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[
            {
              cls: "top-16 left-8 border-t-4 border-l-4 rounded-tl-2xl",
              id: "tl",
            },
            {
              cls: "top-16 right-8 border-t-4 border-r-4 rounded-tr-2xl",
              id: "tr",
            },
            {
              cls: "bottom-32 left-8 border-b-4 border-l-4 rounded-bl-2xl",
              id: "bl",
            },
            {
              cls: "bottom-32 right-8 border-b-4 border-r-4 rounded-br-2xl",
              id: "br",
            },
          ].map(({ cls, id }) => (
            <div
              key={id}
              className={`absolute w-10 h-10 ${cls}`}
              style={{ borderColor: character.primaryColor }}
            />
          ))}
        </div>
      )}

      {/* Scanning animation with scan-line sweep */}
      {scanState === "scanning" && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Spinning ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full border-4 border-t-transparent animate-spin"
              style={{
                borderColor: `${character.primaryColor} transparent transparent transparent`,
              }}
            />
            <div
              className="absolute text-white text-sm font-medium font-nunito"
              style={{ marginTop: 160 }}
            >
              Identifying...
            </div>
          </div>
          {/* Green scan-line sweep */}
          <div
            className="absolute left-0 right-0 h-0.5 animate-scan-line"
            style={{
              background: `linear-gradient(90deg, transparent, ${character.primaryColor}cc, ${character.primaryColor}, ${character.primaryColor}cc, transparent)`,
              boxShadow: `0 0 12px ${character.primaryColor}88`,
            }}
          />
        </div>
      )}

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-12 pb-4">
        <div className="glass-card rounded-xl px-3 py-1.5">
          <span className="text-cream/70 text-xs font-semibold font-nunito">
            Natural Hunt
          </span>
        </div>
        <PointsCounter />
        <button
          type="button"
          onClick={onViewDiscoveries}
          className="glass-card rounded-xl p-2.5 text-cream/70 hover:text-cream transition-colors"
          data-ocid="camera.secondary_button"
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>

      {/* Shimeji character */}
      <ShimejiCharacter
        character={character}
        animationState={mascotAnimationState}
        onTap={() => {
          if (scanState === "idle") {
            setMascotAnimationState("celebrating");
            showSpeech(
              character.personality.catchphrases[
                Math.floor(
                  Math.random() * character.personality.catchphrases.length,
                )
              ],
            );
            setTimeout(() => setMascotAnimationState("idle"), 1500);
          }
        }}
        speechText={currentSpeechText}
        isSpeaking={isSpeaking}
        onChat={(text) => {
          chatSendMessage(text);
          setMascotAnimationState("talking");
          setTimeout(() => setMascotAnimationState("idle"), 3000);
        }}
        isResponding={chatIsResponding}
      />

      {/* Capture button with scan-pulse rings */}
      {(scanState === "idle" || scanState === "scanning") && (
        <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-12 gap-4">
          <button
            type="button"
            onClick={handleCapture}
            disabled={!cameraReady || isIdentifying || scanState === "scanning"}
            className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 disabled:opacity-50"
            style={{
              background: `radial-gradient(circle, ${character.primaryColor}, ${character.secondaryColor})`,
              boxShadow: `0 0 30px ${character.primaryColor}88, 0 4px 20px rgba(0,0,0,0.4)`,
            }}
            data-ocid="camera.primary_button"
          >
            {/* Pulse rings when idle */}
            {scanState === "idle" && cameraReady && (
              <>
                <span
                  className="absolute inset-0 rounded-full animate-scan-pulse"
                  style={{ border: `3px solid ${character.primaryColor}66` }}
                />
                <span
                  className="absolute inset-0 rounded-full animate-scan-pulse"
                  style={{
                    border: `3px solid ${character.primaryColor}44`,
                    animationDelay: "0.5s",
                  }}
                />
              </>
            )}
            {isIdentifying ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Zap className="w-10 h-10 text-white" />
            )}
          </button>
          {!cameraReady && (
            <p className="text-cream/50 text-xs font-nunito">
              Initializing camera...
            </p>
          )}
        </div>
      )}

      {/* Reset button */}
      {scanState !== "idle" &&
        scanState !== "scanning" &&
        scanState !== "result" && (
          <div className="absolute bottom-24 left-0 right-0 flex justify-center z-20">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium font-nunito"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              data-ocid="camera.secondary_button"
            >
              <RotateCcw size={16} />
              Scan Again
            </button>
          </div>
        )}

      {/* Result overlays */}
      {scanState === "result" &&
        identificationResult?.type === "real_plant" && (
          <PlantResultPanel
            result={identificationResult as RealPlantResult}
            character={character}
            onClose={handleReset}
            onSave={handleSavePlant}
            onAnimationStateChange={handleAnimationStateChange}
          />
        )}

      {scanState === "not_plant" &&
        identificationResult?.type === "not_plant" && (
          <NotPlantOverlay
            category={identificationResult.detectedCategory}
            emoji={identificationResult.emoji}
            onRetry={handleReset}
          />
        )}

      {scanState === "not_real" &&
        identificationResult?.type === "not_real" && (
          <NotRealOverlay
            reason={identificationResult.reason}
            onRetry={handleReset}
          />
        )}
    </div>
  );
}
