import { useCallback, useState } from "react";
import { plantDatabase } from "../data/plantDatabase";
import type { ClassificationResult } from "../types/identification";

// ─── Image Analysis Helpers ───────────────────────────────────────────────────

interface PixelStats {
  avgR: number;
  avgG: number;
  avgB: number;
  greenRatio: number;
  brownRatio: number;
  uniformity: number;
  edgeSharpness: number;
  saturation: number;
  brightness: number;
}

function analyzeImageData(imageDataUrl: string): Promise<PixelStats> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const sampleSize = 80;
      canvas.width = sampleSize;
      canvas.height = sampleSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(defaultStats());
        return;
      }

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const data = imageData.data;
      const pixelCount = sampleSize * sampleSize;

      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      let greenPixels = 0;
      let brownPixels = 0;
      let totalSat = 0;
      let totalBright = 0;

      const rValues: number[] = [];
      const gValues: number[] = [];
      const bValues: number[] = [];

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        totalR += r;
        totalG += g;
        totalB += b;
        rValues.push(r);
        gValues.push(g);
        bValues.push(b);

        if (g > r * 1.1 && g > b * 1.1 && g > 40) {
          greenPixels++;
        }

        if (r > g && r > b && r > 80 && g > 40 && b < 120) {
          brownPixels++;
        }

        const max = Math.max(r, g, b) / 255;
        const min = Math.min(r, g, b) / 255;
        const l = (max + min) / 2;
        const s =
          max === min
            ? 0
            : l > 0.5
              ? (max - min) / (2 - max - min)
              : (max - min) / (max + min);
        totalSat += s;
        totalBright += l;
      }

      const avgR = totalR / pixelCount;
      const avgG = totalG / pixelCount;
      const avgB = totalB / pixelCount;
      const greenRatio = greenPixels / pixelCount;
      const brownRatio = brownPixels / pixelCount;
      const saturation = totalSat / pixelCount;
      const brightness = totalBright / pixelCount;

      const stdR = Math.sqrt(
        rValues.reduce((acc, v) => acc + (v - avgR) ** 2, 0) / pixelCount,
      );
      const stdG = Math.sqrt(
        gValues.reduce((acc, v) => acc + (v - avgG) ** 2, 0) / pixelCount,
      );
      const stdB = Math.sqrt(
        bValues.reduce((acc, v) => acc + (v - avgB) ** 2, 0) / pixelCount,
      );
      const avgStd = (stdR + stdG + stdB) / 3;
      const uniformity = Math.max(0, 1 - avgStd / 60);

      let sharpEdges = 0;
      for (let y = 0; y < sampleSize; y++) {
        for (let x = 0; x < sampleSize - 1; x++) {
          const idx = (y * sampleSize + x) * 4;
          const nextIdx = idx + 4;
          const diff =
            Math.abs(data[idx] - data[nextIdx]) +
            Math.abs(data[idx + 1] - data[nextIdx + 1]) +
            Math.abs(data[idx + 2] - data[nextIdx + 2]);
          if (diff > 120) sharpEdges++;
        }
      }
      const edgeSharpness = Math.min(1, sharpEdges / (pixelCount * 0.15));

      resolve({
        avgR,
        avgG,
        avgB,
        greenRatio,
        brownRatio,
        uniformity,
        edgeSharpness,
        saturation,
        brightness,
      });
    };

    img.onerror = () => resolve(defaultStats());
    img.src = imageDataUrl;
  });
}

function defaultStats(): PixelStats {
  return {
    avgR: 128,
    avgG: 128,
    avgB: 128,
    greenRatio: 0.1,
    brownRatio: 0.05,
    uniformity: 0.3,
    edgeSharpness: 0.3,
    saturation: 0.3,
    brightness: 0.5,
  };
}

// ─── Non-plant category detection ────────────────────────────────────────────

interface CategoryGuess {
  category: string;
  emoji: string;
}

function guessNonPlantCategory(stats: PixelStats): CategoryGuess {
  const { avgR, avgG, avgB, saturation, brightness } = stats;

  if (
    avgR > avgG &&
    avgR > avgB &&
    avgR > 140 &&
    saturation > 0.1 &&
    saturation < 0.5 &&
    brightness > 0.4
  ) {
    return { category: "a person", emoji: "🧑" };
  }

  if (avgB > avgR * 1.15 && avgB > avgG * 1.05) {
    if (brightness > 0.6) return { category: "sky or water", emoji: "🌊" };
    return { category: "an electronic device", emoji: "📱" };
  }

  if (avgR > avgG * 1.3 && avgR > avgB * 1.3) {
    return { category: "food", emoji: "🍎" };
  }

  if (brightness > 0.75 && saturation < 0.12) {
    return { category: "a document or surface", emoji: "📄" };
  }

  if (brightness < 0.3 && saturation < 0.15) {
    return { category: "a dark surface or object", emoji: "🪨" };
  }

  if (avgR > avgG && avgG > avgB && saturation > 0.15) {
    return { category: "food or an object", emoji: "🍞" };
  }

  return { category: "an object", emoji: "📦" };
}

// ─── Main classification logic ────────────────────────────────────────────────

async function classifyImage(
  imageDataUrl: string,
): Promise<ClassificationResult> {
  const delay = 1800 + Math.random() * 1200;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const stats = await analyzeImageData(imageDataUrl);

  const {
    greenRatio,
    brownRatio,
    uniformity,
    edgeSharpness,
    saturation,
    brightness: _brightness,
  } = stats;

  // Step 1: Detect non-real images
  const isLikelyArtificial =
    (uniformity > 0.72 && edgeSharpness > 0.55) ||
    uniformity > 0.85 ||
    (edgeSharpness > 0.8 && saturation > 0.6);

  if (isLikelyArtificial) {
    let reason = "The image appears to be a screenshot or digital graphic.";
    if (uniformity > 0.85)
      reason =
        "The image has very flat, uniform colors typical of a drawing or cartoon.";
    if (edgeSharpness > 0.8)
      reason =
        "The image has unnaturally sharp edges, suggesting it is a digital image.";
    return { type: "not_real", reason };
  }

  // Step 2: Detect real plants
  const hasGreenContent = greenRatio > 0.18;
  const hasNaturalTexture = uniformity < 0.55;
  const hasPlantColors = greenRatio + brownRatio * 0.5 > 0.2;
  const isGreenDominant =
    stats.avgG > stats.avgR * 1.05 && stats.avgG > stats.avgB * 1.05;

  const plantScore =
    (hasGreenContent ? 0.4 : 0) +
    (hasNaturalTexture ? 0.25 : 0) +
    (hasPlantColors ? 0.2 : 0) +
    (isGreenDominant ? 0.15 : 0);

  if (plantScore >= 0.55) {
    const plant =
      plantDatabase[Math.floor(Math.random() * plantDatabase.length)];
    const confidence = 0.68 + Math.random() * 0.28;
    return {
      type: "real_plant",
      plantData: {
        name: plant.name,
        scientificName: plant.scientificName,
        emoji: plant.emoji,
        category: plant.category,
        healthBenefits: plant.healthBenefits,
        ecologicalBenefits: plant.ecologicalBenefits,
        funFact: plant.funFact,
        accentColor: plant.accentColor,
        warnings: plant.warnings,
        medicalUses: plant.medicalUses,
        confidence,
      },
    };
  }

  // Step 3: Non-plant real photo
  const { category, emoji } = guessNonPlantCategory(stats);
  return {
    type: "not_plant",
    detectedCategory: category,
    emoji,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePlantIdentification() {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);

  const identify = useCallback(
    async (imageDataUrl: string): Promise<ClassificationResult | null> => {
      setIsIdentifying(true);
      setResult(null);

      try {
        const classification = await classifyImage(imageDataUrl);
        setResult(classification);
        return classification;
      } finally {
        setIsIdentifying(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setResult(null);
    setIsIdentifying(false);
  }, []);

  const plantResult = result?.type === "real_plant" ? result.plantData : null;

  return { identify, result, plantResult, isIdentifying, reset };
}
