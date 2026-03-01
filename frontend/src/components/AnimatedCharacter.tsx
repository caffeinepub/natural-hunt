import React from 'react';
import type { AnimeCharacterData } from '../data/animeCharacters';

interface AnimatedCharacterProps {
  character: AnimeCharacterData;
  size?: number;
  className?: string;
}

export default function AnimatedCharacter({ character, size = 80, className = '' }: AnimatedCharacterProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Aura/glow effect behind character */}
      <div
        className={`absolute inset-0 rounded-full ${character.animationClass}-aura`}
        style={{
          background: `radial-gradient(circle, ${character.color}33 0%, transparent 70%)`,
          filter: 'blur(4px)',
        }}
      />
      {/* Character image with animation */}
      <img
        src={character.imageUrl}
        alt={character.name}
        className={`relative z-10 object-contain select-none pointer-events-none ${character.animationClass}`}
        style={{ width: size, height: size }}
        draggable={false}
      />
    </div>
  );
}
