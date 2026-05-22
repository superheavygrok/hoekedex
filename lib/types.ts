import { z } from 'zod';

export const Rarity = z.enum(['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Shiny', 'Mythical']);
export const Type = z.enum(['Fire', 'Water', 'Electric', 'Grass', 'Dark', 'Fairy', 'Psychic', 'Fighting']);

export type Catch = {
  id: string;
  name: string;
  displayName: string;
  rarity: z.infer<typeof Rarity>;
  types: z.infer<typeof Type>[];
  dateCaught: string;
  rating: number;
  notes: string;
  consentGiven: boolean;
  hardLimits: string[];
  photos: string[];
  evolutionStage: number;
  tags: string[];
};

export type ConsentVector = {
  hardLimits: string[];
  softPreferences: string[];
  requiresExplicitYes: boolean;
  autoExpireDays: number;
};