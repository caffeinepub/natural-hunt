import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import type { AnimeCharacter } from "../data/animeCharacters";
import {
  type AnimationState,
  useCharacterAnimation,
} from "../hooks/useCharacterAnimation";

interface Character3DModelProps {
  character: AnimeCharacter;
  animationState?: AnimationState;
}

export default function Character3DModel({
  character,
  animationState = "idle",
}: Character3DModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  const animValues = useCharacterAnimation(animationState);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = animValues.bodyY;
      groupRef.current.rotation.y = animValues.bodyRotation;
      groupRef.current.scale.setScalar(animValues.scale);
    }
    if (headRef.current) {
      headRef.current.rotation.z = animValues.headTilt;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = animValues.leftArmRotation;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = animValues.rightArmRotation;
    }
  });

  const primaryColor = new THREE.Color(character.primaryColor);
  const hairColor = new THREE.Color(character.hairColor);
  const outfitColor = new THREE.Color(character.outfitColor);
  const accentColor = new THREE.Color(character.accentColor);
  const eyeColor = new THREE.Color(character.eyeColor);

  const skinColor = new THREE.Color("#FFDAB9");

  const renderCharacterGeometry = () => {
    switch (character.id) {
      case "naruto":
        return (
          <group ref={groupRef}>
            {/* Body */}
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.25, 0.3, 0.7, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            {/* Head */}
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Spiky hair */}
            {([-0.15, 0, 0.15] as const).map((x, i) => (
              <mesh key={`hair-${x}`} position={[x, 0.65 + i * 0.02, 0]}>
                <coneGeometry args={[0.08, 0.25, 6]} />
                <meshToonMaterial color={hairColor} />
              </mesh>
            ))}
            {/* Eyes */}
            <mesh position={[-0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            {/* Whisker marks */}
            {([-1, 1] as const).map((side) => (
              <mesh
                key={`whisker-${side}`}
                position={[side * 0.18, 0.32, 0.27]}
                rotation={[0, 0, side * 0.3]}
              >
                <boxGeometry args={[0.08, 0.01, 0.01]} />
                <meshToonMaterial color={new THREE.Color("#FF6B00")} />
              </mesh>
            ))}
            {/* Arms */}
            <mesh ref={leftArmRef} position={[-0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            {/* Legs */}
            <mesh position={[-0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
          </group>
        );

      case "sasuke":
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.25, 0.3, 0.7, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Duck-butt hair */}
            <mesh position={[0, 0.6, -0.1]}>
              <coneGeometry args={[0.2, 0.35, 8]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[0, 0.55, 0.05]}>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            {/* Sharingan eyes */}
            <mesh position={[-0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[-0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
          </group>
        );

      case "sakura":
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.22, 0.28, 0.7, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.28, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Short pink hair */}
            <mesh position={[0, 0.58, 0]}>
              <sphereGeometry args={[0.3, 12, 12]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[0, 0.45, -0.15]}>
              <sphereGeometry args={[0.15, 8, 8]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[-0.1, 0.38, 0.25]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.38, 0.25]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.38, -0.1, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.38, -0.1, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[-0.1, -0.75, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[0.1, -0.75, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
          </group>
        );

      case "goku":
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.28, 0.32, 0.7, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.32, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Spiky black hair - multiple spikes */}
            {[
              [-0.2, 0.7, 0],
              [0, 0.78, 0],
              [0.2, 0.7, 0],
              [-0.1, 0.75, 0.1],
              [0.1, 0.75, 0.1],
            ].map(([x, y, z]) => (
              <mesh
                key={`spike-${x}-${y}`}
                position={[x as number, y as number, z as number]}
              >
                <coneGeometry args={[0.07, 0.22, 6]} />
                <meshToonMaterial color={hairColor} />
              </mesh>
            ))}
            <mesh position={[-0.1, 0.4, 0.3]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.4, 0.3]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.45, -0.1, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.55, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.45, -0.1, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.55, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[-0.14, -0.78, 0]}>
              <cylinderGeometry args={[0.11, 0.1, 0.55, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh position={[0.14, -0.78, 0]}>
              <cylinderGeometry args={[0.11, 0.1, 0.55, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
          </group>
        );

      case "sailormoon":
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.22, 0.28, 0.7, 8]} />
              <meshToonMaterial color={new THREE.Color("#FFFFFF")} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.28, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Odango buns */}
            <mesh position={[-0.2, 0.62, 0]}>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.2, 0.62, 0]}>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            {/* Long pigtails */}
            <mesh position={[-0.22, 0.2, 0]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.05, 0.03, 0.6, 8]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.22, 0.2, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.05, 0.03, 0.6, 8]} />
              <meshToonMaterial color={hairColor} />
            </mesh>
            <mesh position={[-0.1, 0.38, 0.25]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.38, 0.25]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.38, -0.1, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#FFFFFF")} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.38, -0.1, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#FFFFFF")} />
            </mesh>
            <mesh position={[-0.1, -0.75, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#1E90FF")} />
            </mesh>
            <mesh position={[0.1, -0.75, 0]}>
              <cylinderGeometry args={[0.09, 0.08, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#1E90FF")} />
            </mesh>
          </group>
        );

      case "luffy":
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.26, 0.3, 0.7, 8]} />
              <meshToonMaterial color={outfitColor} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            {/* Straw hat */}
            <mesh position={[0, 0.65, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
              <meshToonMaterial color={new THREE.Color("#F5DEB3")} />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.45, 0.45, 0.04, 16]} />
              <meshToonMaterial color={new THREE.Color("#F5DEB3")} />
            </mesh>
            {/* Scar under eye */}
            <mesh position={[0.12, 0.32, 0.28]}>
              <boxGeometry args={[0.04, 0.01, 0.01]} />
              <meshToonMaterial color={new THREE.Color("#CC0000")} />
            </mesh>
            <mesh position={[-0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.38, 0.28]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.42, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.55, 8]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.42, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.55, 8]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            <mesh position={[-0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#1E90FF")} />
            </mesh>
            <mesh position={[0.12, -0.75, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.5, 8]} />
              <meshToonMaterial color={new THREE.Color("#1E90FF")} />
            </mesh>
          </group>
        );

      case "pikachu":
        return (
          <group ref={groupRef}>
            {/* Round body */}
            <mesh ref={bodyRef} position={[0, -0.1, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* Head */}
            <mesh ref={headRef} position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.2, 0.8, 0]}>
              <coneGeometry args={[0.08, 0.35, 6]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh position={[0.2, 0.8, 0]}>
              <coneGeometry args={[0.08, 0.35, 6]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* Black ear tips */}
            <mesh position={[-0.2, 0.95, 0]}>
              <coneGeometry args={[0.05, 0.12, 6]} />
              <meshToonMaterial color={new THREE.Color("#1A1A1A")} />
            </mesh>
            <mesh position={[0.2, 0.95, 0]}>
              <coneGeometry args={[0.05, 0.12, 6]} />
              <meshToonMaterial color={new THREE.Color("#1A1A1A")} />
            </mesh>
            {/* Red cheeks */}
            <mesh position={[-0.22, 0.42, 0.22]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color={accentColor} />
            </mesh>
            <mesh position={[0.22, 0.42, 0.22]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshToonMaterial color={accentColor} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.1, 0.5, 0.27]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.1, 0.5, 0.27]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            {/* Tail */}
            <mesh position={[0.3, -0.1, -0.2]} rotation={[0, 0, 0.8]}>
              <cylinderGeometry args={[0.04, 0.06, 0.4, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.42, 0.05, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.35, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.42, 0.05, 0]}>
              <cylinderGeometry args={[0.07, 0.06, 0.35, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
          </group>
        );

      case "totoro":
        return (
          <group ref={groupRef}>
            {/* Large round body */}
            <mesh ref={bodyRef} position={[0, -0.15, 0]}>
              <sphereGeometry args={[0.45, 16, 16]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* Head */}
            <mesh ref={headRef} position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.38, 16, 16]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* Totoro ears */}
            <mesh position={[-0.25, 0.9, 0]}>
              <coneGeometry args={[0.1, 0.3, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh position={[0.25, 0.9, 0]}>
              <coneGeometry args={[0.1, 0.3, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            {/* White belly */}
            <mesh position={[0, 0.1, 0.3]}>
              <sphereGeometry args={[0.3, 12, 12]} />
              <meshToonMaterial color={new THREE.Color("#F5F5DC")} />
            </mesh>
            {/* Belly markings */}
            {([-0.1, 0, 0.1] as const).map((x, i) => (
              <mesh key={`belly-${x}`} position={[x, 0.05 + i * 0.08, 0.42]}>
                <sphereGeometry args={[0.04, 6, 6]} />
                <meshToonMaterial color={new THREE.Color("#4A7C59")} />
              </mesh>
            ))}
            {/* Big eyes */}
            <mesh position={[-0.14, 0.55, 0.33]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            <mesh position={[0.14, 0.55, 0.33]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshToonMaterial color={eyeColor} />
            </mesh>
            {/* Whiskers */}
            {([-1, 1] as const).map((side) => (
              <mesh
                key={`totoro-whisker-${side}`}
                position={[side * 0.3, 0.45, 0.3]}
                rotation={[0, 0, side * 0.2]}
              >
                <boxGeometry args={[0.15, 0.01, 0.01]} />
                <meshToonMaterial color={new THREE.Color("#1A1A1A")} />
              </mesh>
            ))}
            <mesh ref={leftArmRef} position={[-0.55, 0.1, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.4, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.55, 0.1, 0]}>
              <cylinderGeometry args={[0.1, 0.09, 0.4, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
          </group>
        );

      default:
        return (
          <group ref={groupRef}>
            <mesh ref={bodyRef} position={[0, -0.3, 0]}>
              <cylinderGeometry args={[0.25, 0.3, 0.7, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh ref={headRef} position={[0, 0.35, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshToonMaterial color={skinColor} />
            </mesh>
            <mesh ref={leftArmRef} position={[-0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
            <mesh ref={rightArmRef} position={[0.4, -0.1, 0]}>
              <cylinderGeometry args={[0.08, 0.07, 0.5, 8]} />
              <meshToonMaterial color={primaryColor} />
            </mesh>
          </group>
        );
    }
  };

  return renderCharacterGeometry();
}
