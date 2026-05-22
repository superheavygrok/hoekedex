import { z } from 'zod';

// Core Enums matching the production schemas + Hoedex flavor
export const RaritySchema = z.enum([
  'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Shiny', 'Mythical'
]);
export type Rarity = z.infer<typeof RaritySchema>;

export const PokeTypeSchema = z.enum([
  'Fire', 'Water', 'Electric', 'Grass', 'Dark', 'Fairy', 'Psychic', 'Fighting', 'Poison', 'Flying'
]);
export type PokeType = z.infer<typeof PokeTypeSchema>;

export const EvolutionStageSchema = z.number().int().min(1).max(4);
export type EvolutionStage = z.infer<typeof EvolutionStageSchema>;
// 1: First Catch / Met  2: Repeat / FWB   3: Situationship   4: Deep Bond / "Legendary"

export const RoomTypeSchema = z.enum(['circle', 'event_group', 'poly_pod', 'roster_share', 'kink_club']);
export type RoomType = z.infer<typeof RoomTypeSchema>;

export const EventTypeSchema = z.enum(['date', 'munch', 'play_party', 'casual_hang', 'private']);
export type EventType = z.infer<typeof EventTypeSchema>;

// Full domain models (subset of the architected surface for MVP, privacy-first)

export const UserSchema = z.object({
  userId: z.string().uuid(),
  displayId: z.string().min(3).max(20).regex(/^[a-z0-9_]+$/),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  status: z.enum(['active', 'suspended', 'deleted']).default('active'),
});
export type User = z.infer<typeof UserSchema>;

export const ProfileFacetSchema = z.object({
  facetId: z.string().uuid(),
  userId: z.string().uuid(), // owner of this facet (for shared later)
  category: z.enum(['basic', 'appearance', 'kink', 'history', 'preferences', 'media', 'notes']),
  visibility: z.enum(['public', 'matches', 'trusted', 'private']).default('private'),
  data: z.record(z.string(), z.any()),
  order: z.number().int().default(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type ProfileFacet = z.infer<typeof ProfileFacetSchema>;

export const ConsentVectorSchema = z.object({
  consentId: z.string().uuid(),
  userId: z.string().uuid(),
  hardLimits: z.array(z.string()),
  softPreferences: z.array(z.string()),
  consentRules: z.object({
    requiresExplicitYes: z.boolean().default(true),
    autoExpireAfter: z.number().int().min(7).default(90),
    allowedContactTypes: z.array(z.enum(['text', 'voice', 'video', 'in_person'])),
  }),
  lastUpdated: z.string().datetime(),
  version: z.number().int().default(1),
});
export type ConsentVector = z.infer<typeof ConsentVectorSchema>;

export const RoomSchema = z.object({
  roomId: z.string().uuid(),
  name: z.string().min(2).max(80),
  type: RoomTypeSchema,
  visibility: z.enum(['invite_only', 'application', 'public']).default('invite_only'),
  ownerId: z.string().uuid(),
  memberRoles: z.record(z.string(), z.enum(['owner', 'admin', 'member', 'viewer'])),
  consentGate: z.record(z.string(), z.any()).optional(), // future: rule engine
  createdAt: z.string().datetime(),
  memberCount: z.number().int().default(0),
  catchIds: z.array(z.string().uuid()).default([]), // linked catches in this MVP
});
export type Room = z.infer<typeof RoomSchema>;

export const EventSchema = z.object({
  eventId: z.string().uuid(),
  roomId: z.string().uuid().nullable(),
  title: z.string().min(3),
  type: EventTypeSchema,
  startTime: z.string().datetime(),
  endTime: z.string().datetime().nullable(),
  location: z.object({
    name: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  participantCatchIds: z.array(z.string().uuid()),
  status: z.enum(['planned', 'active', 'completed', 'cancelled']).default('planned'),
  notes: z.string().optional(),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
});
export type Event = z.infer<typeof EventSchema>;

export interface Catch {
  id: string;
  dexNumber: number;
  name: string;
  displayHandle?: string;
  rarity: Rarity;
  types: PokeType[];
  metAt: string;
  rating: number;
  notes: string;
  flavorText?: string;
  evolutionStage: number;
  tags: string[];
  consentGiven: boolean;
  hardLimits: string[];
  photoUrls: string[];
  battleLogs: Array<{ id: string; timestamp: string; note: string }>;
  facetIds: string[];
  age?: number;
  isCookedOverride?: boolean;
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const RARITY_ORDER: Rarity[] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Shiny', 'Mythical'];
export const RARITY_COLORS: Record<Rarity, string> = {
  Common: '#3f3f46',
  Uncommon: '#16a34a',
  Rare: '#2563eb',
  Epic: '#7c3aed',
  Legendary: '#ca8a04',
  Shiny: '#be185d',
  Mythical: '#b91c1c',
};
export const TYPE_COLORS: Record<PokeType, string> = {
  Fire: '#ef4444',
  Water: '#3b82f6',
  Electric: '#eab308',
  Grass: '#22c55e',
  Dark: '#1f2937',
  Fairy: '#ec4899',
  Psychic: '#a855f7',
  Fighting: '#f97316',
  Poison: '#8b5cf6',
  Flying: '#06b6d4',
};
export const EVOLUTION_LABELS = ['First Meet', 'Repeat / FWB', 'Situationship', 'Legendary Bond'];