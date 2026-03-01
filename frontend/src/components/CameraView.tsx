import { useRef, useEffect, useState, useCallback } from 'react';
import { X, Zap, RotateCcw, BookOpen, AlertTriangle } from 'lucide-react';
import { usePlantIdentification } from '../hooks/usePlantIdentification';
import { useAddIdentification, useGetPoints } from '../hooks/useQueries';
import PlantResultPanel from './PlantResultPanel';
import NotPlantOverlay from './NotPlantOverlay';
import NotRealOverlay from './NotRealOverlay';
import DraggableMascot from './DraggableMascot';

interface CameraViewProps {
  onViewDiscoveries: () => void;
}

type ScanState = 'idle' | 'scanning' | 'result' | 'not-plant' | 'not-real';

export default function CameraView({ onViewDiscoveries }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [scanState, setScanState] = useState<ScanState>('idle');
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  // Store extra info for overlays
  const [notPlantCategory, setNotPlantCategory] = useState<{ category: string; emoji: string } | null>(null);
  const [notRealReason, setNotRealReason] = useState<string>('');

  const { identify, result, plantResult, isIdentifying, reset } = usePlantIdentification();
  const addIdentification = useAddIdentification();
  const { data: points = 0 } = useGetPoints();

  // Start camera
  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (mounted) setCameraReady(true);
          };
        }
      } catch {
        if (mounted) setCameraError('Unable to access camera. Please check permissions.');
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const capturePhoto = useCallback((): string | null => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.85);
  }, []);

  const handleScan = useCallback(async () => {
    if (!cameraReady || scanState !== 'idle') return;

    const imageUrl = capturePhoto();
    if (!imageUrl) return;

    setCapturedImageUrl(imageUrl);
    setScanState('scanning');

    const classification = await identify(imageUrl);

    if (!classification) {
      setScanState('idle');
      return;
    }

    if (classification.type === 'not-real') {
      setNotRealReason(classification.reason);
      setScanState('not-real');
      return;
    }

    if (classification.type === 'not-plant') {
      setNotPlantCategory({ category: classification.detectedCategory, emoji: classification.categoryEmoji });
      setScanState('not-plant');
      return;
    }

    // real-plant
    setScanState('result');

    // Save to backend
    try {
      await addIdentification.mutateAsync({
        plantName: classification.plantData.name,
        imageUrl: imageUrl,
        identificationDate: BigInt(Date.now()),
      });
    } catch {
      // Silently handle - points may use localStorage fallback
    }
  }, [cameraReady, scanState, capturePhoto, identify, addIdentification]);

  const handleReset = useCallback(() => {
    setScanState('idle');
    setCapturedImageUrl(null);
    setNotPlantCategory(null);
    setNotRealReason('');
    reset();
  }, [reset]);

  if (cameraError) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: 'linear-gradient(180deg, oklch(0.12 0.06 150), oklch(0.18 0.08 155))' }}
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
          style={{ background: 'oklch(0.55 0.22 25 / 0.2)', border: '1px solid oklch(0.55 0.22 25 / 0.4)' }}
        >
          <AlertTriangle size={36} style={{ color: 'oklch(0.75 0.18 30)' }} />
        </div>
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.95 0.015 90)' }}
        >
          Camera Unavailable
        </h2>
        <p className="text-sm mb-6" style={{ color: 'oklch(0.70 0.04 140)' }}>
          {cameraError}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-2xl font-semibold text-sm"
          style={{
            background: 'linear-gradient(135deg, oklch(0.32 0.10 150), oklch(0.42 0.12 148))',
            color: 'oklch(0.97 0.015 90)',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const isOverlayActive = scanState === 'result' || scanState === 'not-plant' || scanState === 'not-real';

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Camera Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isOverlayActive ? 0.3 : 1, transition: 'opacity 0.4s ease' }}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Draggable Mascot — always visible on camera screen (not during result panel) */}
      {scanState !== 'result' && (
        <DraggableMascot animationMode="free" visible={true} />
      )}

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-safe">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: 'linear-gradient(180deg, oklch(0.08 0.04 150 / 0.85) 0%, transparent 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'oklch(0.72 0.14 75 / 0.2)', border: '1px solid oklch(0.72 0.14 75 / 0.4)' }}
            >
              <Zap size={16} style={{ color: 'oklch(0.72 0.14 75)' }} />
            </div>
            <span
              className="text-sm font-bold"
              style={{ fontFamily: 'Playfair Display, serif', color: 'oklch(0.95 0.015 90)' }}
            >
              Natural Hunt
            </span>
          </div>

          {/* Points display */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: 'oklch(0.72 0.14 75 / 0.15)',
              border: '1px solid oklch(0.72 0.14 75 / 0.4)',
            }}
          >
            <span className="text-xs" style={{ color: 'oklch(0.72 0.14 75)' }}>⭐</span>
            <span
              className="text-sm font-bold"
              style={{ color: 'oklch(0.72 0.14 75)', fontFamily: 'Nunito, sans-serif' }}
            >
              {Number(points)}
            </span>
          </div>
        </div>
      </div>

      {/* Viewfinder Overlay — idle only */}
      {scanState === 'idle' && cameraReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64">
            <div className="viewfinder-corner viewfinder-corner-tl animate-corner-pulse" />
            <div className="viewfinder-corner viewfinder-corner-tr animate-corner-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="viewfinder-corner viewfinder-corner-bl animate-corner-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="viewfinder-corner viewfinder-corner-br animate-corner-pulse" style={{ animationDelay: '0.6s' }} />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-6 h-6 rounded-full border-2 opacity-60"
                style={{ borderColor: 'oklch(0.72 0.14 75)' }}
              />
            </div>
          </div>

          <div className="absolute bottom-32 left-0 right-0 text-center">
            <p
              className="text-sm font-semibold px-4 py-2 rounded-full inline-block"
              style={{
                background: 'oklch(0.12 0.04 150 / 0.6)',
                color: 'oklch(0.85 0.04 140)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              Tap the button to identify a plant
            </p>
          </div>
        </div>
      )}

      {/* Scanning Animation */}
      {scanState === 'scanning' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          {capturedImageUrl && (
            <div className="absolute inset-0">
              <img src={capturedImageUrl} alt="Captured" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0" style={{ background: 'oklch(0.08 0.04 150 / 0.5)' }} />
            </div>
          )}

          <div className="relative w-64 h-64 z-10">
            <div className="viewfinder-corner viewfinder-corner-tl animate-corner-pulse" />
            <div className="viewfinder-corner viewfinder-corner-tr animate-corner-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="viewfinder-corner viewfinder-corner-bl animate-corner-pulse" style={{ animationDelay: '0.4s' }} />
            <div className="viewfinder-corner viewfinder-corner-br animate-corner-pulse" style={{ animationDelay: '0.6s' }} />

            <div
              className="absolute left-0 right-0 h-0.5 animate-scan-line"
              style={{
                background: 'linear-gradient(90deg, transparent, oklch(0.72 0.14 75), oklch(0.82 0.12 80), oklch(0.72 0.14 75), transparent)',
                boxShadow: '0 0 8px oklch(0.72 0.14 75 / 0.8)',
              }}
            />
          </div>

          <div
            className="mt-8 px-6 py-3 rounded-2xl z-10"
            style={{
              background: 'oklch(0.12 0.04 150 / 0.8)',
              border: '1px solid oklch(0.52 0.09 145 / 0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: 'oklch(0.72 0.14 75)',
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: 'oklch(0.85 0.04 140)', fontFamily: 'Nunito, sans-serif' }}
              >
                Analyzing image...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Not-Real Overlay ── */}
      {scanState === 'not-real' && (
        <NotRealOverlay
          reason={notRealReason}
          capturedImageUrl={capturedImageUrl}
          onTryAgain={handleReset}
        />
      )}

      {/* ── Not-Plant Overlay ── */}
      {scanState === 'not-plant' && notPlantCategory && (
        <NotPlantOverlay
          detectedCategory={notPlantCategory.category}
          categoryEmoji={notPlantCategory.emoji}
          capturedImageUrl={capturedImageUrl}
          onTryAgain={handleReset}
        />
      )}

      {/* ── Plant Result Panel ── */}
      {scanState === 'result' && plantResult && (
        <PlantResultPanel
          plant={plantResult}
          capturedImageUrl={capturedImageUrl}
          onClose={handleReset}
          onViewDiscoveries={onViewDiscoveries}
        />
      )}

      {/* Bottom Controls — visible during idle and scanning */}
      {(scanState === 'idle' || scanState === 'scanning') && (
        <div
          className="absolute bottom-0 left-0 right-0 z-20 pb-safe"
          style={{ paddingBottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 5rem))' }}
        >
          <div
            className="flex items-center justify-center gap-6 px-6 py-4"
            style={{
              background: 'linear-gradient(0deg, oklch(0.08 0.04 150 / 0.9) 0%, transparent 100%)',
            }}
          >
            {/* Discoveries button */}
            <button
              onClick={onViewDiscoveries}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all"
              style={{
                background: 'oklch(0.99 0.008 100 / 0.1)',
                border: '1px solid oklch(0.99 0.008 100 / 0.2)',
                backdropFilter: 'blur(12px)',
                color: 'oklch(0.85 0.04 140)',
              }}
            >
              <BookOpen size={20} />
              <span className="text-xs font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Collection
              </span>
            </button>

            {/* Main scan button */}
            <button
              onClick={handleScan}
              disabled={!cameraReady || scanState === 'scanning'}
              className="relative w-20 h-20 rounded-full transition-all active:scale-95 disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, oklch(0.58 0.16 68), oklch(0.72 0.14 75))',
                boxShadow: '0 0 0 4px oklch(0.72 0.14 75 / 0.2), 0 8px 24px oklch(0.72 0.14 75 / 0.4)',
              }}
            >
              <div className="absolute inset-2 rounded-full border-2 border-white/30" />
              {scanState === 'scanning' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: 'oklch(0.18 0.06 150)', borderTopColor: 'transparent' }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ background: 'oklch(0.18 0.06 150 / 0.3)', border: '2px solid oklch(0.18 0.06 150 / 0.5)' }}
                  />
                </div>
              )}
            </button>

            {/* Reset / placeholder */}
            <button
              onClick={handleReset}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all"
              style={{
                background: 'oklch(0.99 0.008 100 / 0.1)',
                border: '1px solid oklch(0.99 0.008 100 / 0.2)',
                backdropFilter: 'blur(12px)',
                color: 'oklch(0.85 0.04 140)',
              }}
            >
              <RotateCcw size={20} />
              <span className="text-xs font-semibold" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Reset
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
