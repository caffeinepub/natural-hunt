export interface RealPlantResult {
  type: "real_plant";
  plantData: {
    name: string;
    scientificName: string;
    emoji: string;
    category: string;
    healthBenefits: string[];
    ecologicalBenefits: string[];
    funFact: string;
    accentColor: string;
    warnings: string[];
    medicalUses: string[];
    confidence: number;
  };
}

export interface NotPlantResult {
  type: "not_plant";
  detectedCategory: string;
  emoji: string;
}

export interface NotRealResult {
  type: "not_real";
  reason: string;
}

export type ClassificationResult =
  | RealPlantResult
  | NotPlantResult
  | NotRealResult;
