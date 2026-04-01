import { useCallback, useEffect, useRef, useState } from "react";

export type AnimationState = "idle" | "talking" | "celebrating" | "alert";

export interface CharacterAnimationValues {
  bodyY: number;
  bodyRotation: number;
  headTilt: number;
  leftArmRotation: number;
  rightArmRotation: number;
  scale: number;
  glowIntensity: number;
}

const IDLE_VALUES: CharacterAnimationValues = {
  bodyY: 0,
  bodyRotation: 0,
  headTilt: 0,
  leftArmRotation: -0.3,
  rightArmRotation: 0.3,
  scale: 1,
  glowIntensity: 0.5,
};

const TALKING_VALUES: CharacterAnimationValues = {
  bodyY: 0.05,
  bodyRotation: 0.02,
  headTilt: 0.1,
  leftArmRotation: -0.5,
  rightArmRotation: 0.5,
  scale: 1.02,
  glowIntensity: 0.8,
};

const CELEBRATING_VALUES: CharacterAnimationValues = {
  bodyY: 0.2,
  bodyRotation: 0.1,
  headTilt: -0.2,
  leftArmRotation: -1.2,
  rightArmRotation: 1.2,
  scale: 1.1,
  glowIntensity: 1.0,
};

const ALERT_VALUES: CharacterAnimationValues = {
  bodyY: 0.15,
  bodyRotation: 0,
  headTilt: 0.05,
  leftArmRotation: -0.15,
  rightArmRotation: 0.15,
  scale: 1.05,
  glowIntensity: 0.9,
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpValues(
  current: CharacterAnimationValues,
  target: CharacterAnimationValues,
  t: number,
): CharacterAnimationValues {
  return {
    bodyY: lerp(current.bodyY, target.bodyY, t),
    bodyRotation: lerp(current.bodyRotation, target.bodyRotation, t),
    headTilt: lerp(current.headTilt, target.headTilt, t),
    leftArmRotation: lerp(current.leftArmRotation, target.leftArmRotation, t),
    rightArmRotation: lerp(
      current.rightArmRotation,
      target.rightArmRotation,
      t,
    ),
    scale: lerp(current.scale, target.scale, t),
    glowIntensity: lerp(current.glowIntensity, target.glowIntensity, t),
  };
}

function getTargetValues(state: AnimationState): CharacterAnimationValues {
  switch (state) {
    case "idle":
      return IDLE_VALUES;
    case "talking":
      return TALKING_VALUES;
    case "celebrating":
      return CELEBRATING_VALUES;
    case "alert":
      return ALERT_VALUES;
  }
}

export function useCharacterAnimation(animationState: AnimationState) {
  const [values, setValues] = useState<CharacterAnimationValues>(IDLE_VALUES);
  const currentValuesRef = useRef<CharacterAnimationValues>(IDLE_VALUES);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const animate = useCallback(
    (timestamp: number) => {
      const _delta = timestamp - timeRef.current;
      timeRef.current = timestamp;

      const target = getTargetValues(animationState);
      const speed = 0.08;

      // Add oscillation for idle and talking states
      let oscillatedTarget = { ...target };
      if (animationState === "idle") {
        const t = timestamp * 0.001;
        oscillatedTarget.bodyY = target.bodyY + Math.sin(t * 1.5) * 0.03;
        oscillatedTarget.headTilt = target.headTilt + Math.sin(t * 0.8) * 0.02;
      } else if (animationState === "talking") {
        const t = timestamp * 0.001;
        oscillatedTarget.bodyY = target.bodyY + Math.sin(t * 4) * 0.02;
        oscillatedTarget.headTilt = target.headTilt + Math.sin(t * 3) * 0.05;
        oscillatedTarget.bodyRotation =
          target.bodyRotation + Math.sin(t * 2) * 0.01;
      } else if (animationState === "celebrating") {
        const t = timestamp * 0.001;
        oscillatedTarget.bodyY = target.bodyY + Math.sin(t * 6) * 0.05;
        oscillatedTarget.leftArmRotation =
          target.leftArmRotation + Math.sin(t * 5) * 0.2;
        oscillatedTarget.rightArmRotation =
          target.rightArmRotation + Math.sin(t * 5 + Math.PI) * 0.2;
      } else if (animationState === "alert") {
        const t = timestamp * 0.001;
        // Alert: upright, attentive, slight forward lean pulse
        oscillatedTarget.bodyY = target.bodyY + Math.sin(t * 2) * 0.01;
        oscillatedTarget.scale = target.scale + Math.sin(t * 3) * 0.01;
        oscillatedTarget.glowIntensity =
          target.glowIntensity + Math.sin(t * 4) * 0.1;
      }

      const newValues = lerpValues(
        currentValuesRef.current,
        oscillatedTarget,
        speed,
      );
      currentValuesRef.current = newValues;
      setValues({ ...newValues });

      frameRef.current = requestAnimationFrame(animate);
    },
    [animationState],
  );

  useEffect(() => {
    timeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animate]);

  return values;
}
