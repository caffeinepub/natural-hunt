import { useRef, useState, useEffect, useCallback } from 'react';

interface DraggableMascotProps {
  animationMode?: 'free' | 'standBeside';
  boardPosition?: { x: number; y: number };
  visible?: boolean;
}

const MASCOT_WIDTH = 80;
const MASCOT_HEIGHT = 160;

export default function DraggableMascot({
  animationMode = 'free',
  boardPosition,
  visible = true,
}: DraggableMascotProps) {
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight * 0.45 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Clamp position within viewport
  const clamp = useCallback((x: number, y: number) => {
    const maxX = window.innerWidth - MASCOT_WIDTH;
    const maxY = window.innerHeight - MASCOT_HEIGHT;
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  }, []);

  // When animationMode changes to 'standBeside', animate to board position
  useEffect(() => {
    if (animationMode === 'standBeside' && boardPosition) {
      const targetX = Math.max(0, boardPosition.x - MASCOT_WIDTH - 8);
      const targetY = boardPosition.y;
      setPosition(clamp(targetX, targetY));
    }
  }, [animationMode, boardPosition, clamp]);

  // Mouse events
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (animationMode !== 'free') return;
      e.preventDefault();
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [animationMode, position]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(clamp(e.clientX - dragOffset.current.x, e.clientY - dragOffset.current.y));
    };
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, clamp]);

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (animationMode !== 'free') return;
      const touch = e.touches[0];
      setIsDragging(true);
      dragOffset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
    },
    [animationMode, position]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setPosition(clamp(touch.clientX - dragOffset.current.x, touch.clientY - dragOffset.current.y));
    };
    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, clamp]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="absolute z-30 select-none"
      style={{
        left: position.x,
        top: position.y,
        width: MASCOT_WIDTH,
        height: MASCOT_HEIGHT,
        cursor: animationMode === 'free' ? (isDragging ? 'grabbing' : 'grab') : 'default',
        transition: animationMode === 'standBeside' ? 'left 0.6s cubic-bezier(0.16,1,0.3,1), top 0.6s cubic-bezier(0.16,1,0.3,1)' : 'none',
        filter: isDragging ? 'drop-shadow(0 8px 16px oklch(0.08 0.04 150 / 0.6))' : 'drop-shadow(0 4px 8px oklch(0.08 0.04 150 / 0.4))',
        touchAction: 'none',
      }}
    >
      <img
        src="/assets/generated/anime-mascot.dim_256x512.png"
        alt="Plant Guide Mascot"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          userSelect: 'none',
          animation: animationMode === 'free' && !isDragging ? 'mascot-idle 3s ease-in-out infinite' : 'none',
        }}
      />
      {/* Drag hint tooltip */}
      {animationMode === 'free' && !isDragging && (
        <div
          className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-xs pointer-events-none opacity-70"
          style={{
            background: 'oklch(0.12 0.04 150 / 0.8)',
            color: 'oklch(0.85 0.04 140)',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '9px',
          }}
        >
          drag me!
        </div>
      )}
    </div>
  );
}
