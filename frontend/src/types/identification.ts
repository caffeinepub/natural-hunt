import type { PlantData } from '../hooks/usePlantIdentification';

export interface RealPlantResult {
  type: 'real-plant';
  plantData: PlantData;
}

export interface NotPlantResult {
  type: 'not-plant';
  detectedCategory: string;
  categoryEmoji: string;
  confidence: number;
}

export interface NotRealResult {
  type: 'not-real';
  reason: string;
}

export type ClassificationResult = RealPlantResult | NotPlantResult | NotRealResult;
