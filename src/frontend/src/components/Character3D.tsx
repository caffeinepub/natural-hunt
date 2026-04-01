import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import type { AnimeCharacter } from "../data/animeCharacters";
import type { AnimationState } from "../hooks/useCharacterAnimation";
import Character3DModel from "./Character3DModel";

interface Character3DProps {
  character: AnimeCharacter;
  size?: number;
  animationState?: AnimationState;
  enableOrbit?: boolean;
  className?: string;
}

function FallbackBox({ color }: { color: string }) {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Character3D({
  character,
  size = 120,
  animationState = "idle",
  enableOrbit = false,
  className = "",
}: Character3DProps) {
  const glowColor = character.primaryColor;

  return (
    <div
      className={`relative rounded-full overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 ${size * 0.2}px ${glowColor}60, 0 0 ${size * 0.4}px ${glowColor}30`,
        background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 2.8], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 3]} intensity={1.2} castShadow />
        <directionalLight
          position={[-2, 1, -1]}
          intensity={0.4}
          color="#8888ff"
        />
        <pointLight position={[0, 2, 2]} intensity={0.6} color={glowColor} />

        <Suspense fallback={<FallbackBox color={character.primaryColor} />}>
          <Character3DModel
            character={character}
            animationState={animationState}
          />
        </Suspense>

        {enableOrbit && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          />
        )}
      </Canvas>
    </div>
  );
}
