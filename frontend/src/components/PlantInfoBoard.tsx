import { useEffect, useState, useRef } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface PlantInfoBoardProps {
  plantName: string;
  benefits: string[];
  onComplete: () => void;
  onDismiss: () => void;
}

export default function PlantInfoBoard({ plantName, benefits, onComplete, onDismiss }: PlantInfoBoardProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const typewriterRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charIndexRef = useRef(0);

  const fullText = benefits.slice(0, 3).join(' • ');
  const speechText = `${plantName} has amazing benefits! ${benefits.slice(0, 3).join('. ')}`;

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Start typewriter after a short delay
    const typeTimer = setTimeout(() => {
      charIndexRef.current = 0;
      setDisplayedText('');

      const typeNext = () => {
        if (charIndexRef.current < fullText.length) {
          charIndexRef.current++;
          setDisplayedText(fullText.slice(0, charIndexRef.current));
          typewriterRef.current = setTimeout(typeNext, 28);
        }
      };
      typeNext();
    }, 400);

    // Start speech after board appears
    const speechTimer = setTimeout(() => {
      speak(speechText, () => {
        // Auto-dismiss 2s after speech ends
        setTimeout(() => {
          handleDismiss();
        }, 2000);
      });
    }, 600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(typeTimer);
      clearTimeout(speechTimer);
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = () => {
    stop();
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
      onDismiss();
    }, 300);
  };

  return (
    <div
      className="absolute inset-0 z-35 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 35 }}
    >
      <div
        className="relative flex items-end gap-2 pointer-events-auto"
        style={{
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
          maxWidth: '90vw',
        }}
      >
        {/* Board */}
        <div className="relative" style={{ width: 280, minHeight: 200 }}>
          {/* Board background image */}
          <img
            src="/assets/generated/plant-board.dim_400x300.png"
            alt="Plant info board"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 12,
              filter: 'drop-shadow(0 8px 24px oklch(0.08 0.04 150 / 0.7))',
            }}
          />

          {/* Text overlay on board */}
          <div
            className="absolute inset-0 flex flex-col justify-center px-5 py-4"
            style={{ top: '8%', bottom: '8%' }}
          >
            {/* Plant name */}
            <p
              className="text-center font-black mb-2 leading-tight"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'oklch(0.95 0.04 90)',
                fontSize: '15px',
                textShadow: '0 1px 3px oklch(0.08 0.04 150 / 0.8)',
              }}
            >
              🌿 {plantName}
            </p>

            {/* Divider */}
            <div
              className="w-full h-px mb-2 opacity-40"
              style={{ background: 'oklch(0.85 0.04 90)' }}
            />

            {/* Benefits text with typewriter */}
            <p
              className="text-center leading-relaxed"
              style={{
                fontFamily: 'Nunito, sans-serif',
                color: 'oklch(0.92 0.03 90)',
                fontSize: '11px',
                textShadow: '0 1px 2px oklch(0.08 0.04 150 / 0.6)',
                minHeight: '60px',
              }}
            >
              {displayedText}
              {displayedText.length < fullText.length && (
                <span
                  className="inline-block w-0.5 h-3 ml-0.5 align-middle"
                  style={{
                    background: 'oklch(0.92 0.03 90)',
                    animation: 'corner-pulse 0.8s ease-in-out infinite',
                  }}
                />
              )}
            </p>
          </div>

          {/* Controls row */}
          <div className="absolute top-2 right-2 flex gap-1">
            {/* TTS toggle */}
            {isSupported && (
              <button
                onClick={() => isSpeaking ? stop() : speak(speechText)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'oklch(0.12 0.04 150 / 0.7)',
                  border: '1px solid oklch(0.52 0.09 145 / 0.4)',
                  color: isSpeaking ? 'oklch(0.72 0.14 75)' : 'oklch(0.65 0.05 140)',
                }}
              >
                {isSpeaking ? <Volume2 size={12} /> : <VolumeX size={12} />}
              </button>
            )}
            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'oklch(0.12 0.04 150 / 0.7)',
                border: '1px solid oklch(0.52 0.09 145 / 0.4)',
                color: 'oklch(0.65 0.05 140)',
              }}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
