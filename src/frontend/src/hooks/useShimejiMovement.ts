import { useCallback, useEffect, useRef, useState } from "react";

export type ShimejiState =
  | "idle"
  | "walkLeft"
  | "walkRight"
  | "jump"
  | "falling"
  | "sit"
  | "wave"
  | "talking"
  | "celebrating";

interface ShimejiPosition {
  x: number;
  y: number;
}

export interface UseShimejiMovementReturn {
  position: ShimejiPosition;
  shimejiState: ShimejiState;
  facingRight: boolean;
  setPosition: (pos: ShimejiPosition) => void;
  triggerTalking: () => void;
  triggerCelebrating: () => void;
  triggerIdle: () => void;
}

const SPRITE_WIDTH = 96;
const WALK_SPEED = 1.5;
const GROUND_OFFSET = 180; // distance from bottom of viewport

function getGroundY(): number {
  return window.innerHeight - GROUND_OFFSET;
}

function getMaxX(): number {
  return window.innerWidth - SPRITE_WIDTH - 20;
}

// Random int between min and max (inclusive)
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type AutoState = "idle" | "walkLeft" | "walkRight" | "sit" | "wave" | "jump";

export function useShimejiMovement(): UseShimejiMovementReturn {
  const [position, setPositionState] = useState<ShimejiPosition>(() => ({
    x: Math.max(20, window.innerWidth - 160),
    y: getGroundY(),
  }));
  const [shimejiState, setShimejiState] = useState<ShimejiState>("idle");
  const [facingRight, setFacingRight] = useState(false);

  // Refs for rAF physics
  const posRef = useRef<ShimejiPosition>({
    x: Math.max(20, window.innerWidth - 160),
    y: getGroundY(),
  });
  const stateRef = useRef<ShimejiState>("idle");
  const facingRef = useRef(false);
  const rafRef = useRef<number>(0);
  const externalOverrideRef = useRef<ShimejiState | null>(null);
  const externalOverrideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const isDraggingRef = useRef(false);
  const dragResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Jump physics
  const jumpVelocityRef = useRef(0);
  const isJumpingRef = useRef(false);
  const groundYRef = useRef(getGroundY());

  // Auto-movement timer
  const autoStateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStateRef = useRef<AutoState>("idle");

  const scheduleNextAutoState = useCallback(() => {
    if (autoStateTimerRef.current) clearTimeout(autoStateTimerRef.current);

    const pickState = (): AutoState => {
      const weights: Record<AutoState, number> = {
        idle: 3,
        walkLeft: 3,
        walkRight: 3,
        sit: 2,
        wave: 1,
        jump: 1,
      };
      const total = Object.values(weights).reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      for (const [s, w] of Object.entries(weights)) {
        r -= w;
        if (r <= 0) return s as AutoState;
      }
      return "idle";
    };

    const next = pickState();
    autoStateRef.current = next;

    const duration =
      next === "idle"
        ? randInt(2000, 5000)
        : next === "walkLeft" || next === "walkRight"
          ? randInt(3000, 8000)
          : next === "sit"
            ? randInt(5000, 10000)
            : next === "wave"
              ? randInt(1500, 3000)
              : next === "jump"
                ? 900
                : 2000;

    autoStateTimerRef.current = setTimeout(() => {
      scheduleNextAutoState();
    }, duration);
  }, []);

  // Sync refs to state for React renders
  const syncState = useCallback(() => {
    setPositionState({ ...posRef.current });
    setShimejiState(stateRef.current);
    setFacingRight(facingRef.current);
  }, []);

  // Main animation loop
  useEffect(() => {
    scheduleNextAutoState();
    groundYRef.current = getGroundY();

    const animate = () => {
      if (!isDraggingRef.current) {
        const effectiveState =
          externalOverrideRef.current ?? (autoStateRef.current as ShimejiState);

        // Handle jump physics
        if (effectiveState === "jump" || isJumpingRef.current) {
          if (!isJumpingRef.current) {
            isJumpingRef.current = true;
            jumpVelocityRef.current = -8; // initial upward velocity
          }
          jumpVelocityRef.current += 0.4; // gravity
          posRef.current.y += jumpVelocityRef.current;

          if (posRef.current.y >= groundYRef.current) {
            posRef.current.y = groundYRef.current;
            isJumpingRef.current = false;
            jumpVelocityRef.current = 0;
            stateRef.current = "idle";
          } else {
            stateRef.current = jumpVelocityRef.current < 0 ? "jump" : "falling";
          }
        } else {
          // Walking
          if (effectiveState === "walkLeft") {
            posRef.current.x -= WALK_SPEED;
            facingRef.current = false;
            stateRef.current = "walkLeft";
            if (posRef.current.x <= 10) {
              posRef.current.x = 10;
              autoStateRef.current = "walkRight";
            }
          } else if (effectiveState === "walkRight") {
            posRef.current.x += WALK_SPEED;
            facingRef.current = true;
            stateRef.current = "walkRight";
            const maxX = getMaxX();
            if (posRef.current.x >= maxX) {
              posRef.current.x = maxX;
              autoStateRef.current = "walkLeft";
            }
          } else {
            stateRef.current = effectiveState as ShimejiState;
          }

          // Keep on ground
          posRef.current.y = groundYRef.current;
        }
      }

      syncState();
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      groundYRef.current = getGroundY();
      posRef.current.y = groundYRef.current;
      const maxX = getMaxX();
      if (posRef.current.x > maxX) posRef.current.x = maxX;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (autoStateTimerRef.current) clearTimeout(autoStateTimerRef.current);
      if (externalOverrideTimerRef.current)
        clearTimeout(externalOverrideTimerRef.current);
      if (dragResumeTimerRef.current) clearTimeout(dragResumeTimerRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [scheduleNextAutoState, syncState]);

  const setPosition = useCallback((pos: ShimejiPosition) => {
    posRef.current = { ...pos };
    isDraggingRef.current = true;
    if (dragResumeTimerRef.current) clearTimeout(dragResumeTimerRef.current);
    dragResumeTimerRef.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, 3000);
  }, []);

  const triggerTalking = useCallback(() => {
    externalOverrideRef.current = "talking";
    if (externalOverrideTimerRef.current)
      clearTimeout(externalOverrideTimerRef.current);
    // talking ends when triggerIdle is called
  }, []);

  const triggerCelebrating = useCallback(() => {
    externalOverrideRef.current = "celebrating";
    if (externalOverrideTimerRef.current)
      clearTimeout(externalOverrideTimerRef.current);
    externalOverrideTimerRef.current = setTimeout(() => {
      externalOverrideRef.current = null;
    }, 3000);
  }, []);

  const triggerIdle = useCallback(() => {
    externalOverrideRef.current = null;
    if (externalOverrideTimerRef.current)
      clearTimeout(externalOverrideTimerRef.current);
  }, []);

  return {
    position,
    shimejiState,
    facingRight,
    setPosition,
    triggerTalking,
    triggerCelebrating,
    triggerIdle,
  };
}
