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
// 1: First Catch / Met  2 = FWB   3 = Situationship   4 = Deep Bond

export const RoomTypeSchema = z.enum(['circle', 'event_group', 'poly_pod', 'roster_share', 'kink_club']);
export type RoomType = z.infer<typeof RoomTypeSchema>;

export const EventTypeSchema = z.enum(['date', 'munch', 'play_party', 'casual_hang', 'private']);
export type EventType = z.infer<typeof EventTypeSchema>;

// Full domain models
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
  userId: z.string().uuid(),
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
  consentGate: z.record(z.string(), z.any()).optional(),
  createdAt: z.string().datetime(),
  memberCount: z.number().int().default(0),
  catchIds: z.array(z.string().uuid()).default([]),
});
export type Room = z.infer<typeof RoomSchema>;

export const EventSchema = z.object({
  eventId: z.string().uuid(),
  roomId: z.string().uuid().nullable(),
  title: z.string().min(3),
  type: EventTypeSchema,
  startTime: z.string().datetime(),
  endTime: z.string().datetime().nullable(),
  location: z.object({ name: z.string().optional(), lat: z.number().optional(), lng: z.number().optional() }).optional(),
  participantCatchIds: z.array(z.string().uuid()),
  status: z.enum(['planned', 'active', 'completed', 'cancelled']).default('planned'),
  notes: z.string().optional(),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
});
export type Event = z.infer<typeof EventSchema>;

export const BattleLogEntrySchema = z.object({
  id: z.string().uuid(),
  timestamp: z.string().datetime(),
  note: z.string().min(1).max(500),
  ratingDelta: z.number().int().min(-2).max(2).optional(),
});
export type BattleLogEntry = z.infer<typeof BattleLogEntrySchema>;

export const CatchSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(60),
  displayHandle: z.string().max(30).optional(),
  rarity: RaritySchema,
  types: z.array(PokeTypeSchema).min(1).max(3),
  metAt: z.string().datetime(),
  rating: z.number().int().min(1).max(10),
  notes: z.string().max(2000).optional(),
  evolutionStage: EvolutionStageSchema,
  tags: z.array(z.string().min(1).max(30)).max(8),
  consentGiven: z.boolean().default(true),
  hardLimits: z.array(z.string()),
  photoUrls: z.array(z.string().url().or(z.string().startsWith('data:'))).max(4),
  battleLogs: z.array(BattleLogEntrySchema).default([]),
  facetIds: z.array(z.string().uuid()).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Catch = z.infer<typeof CatchSchema>;

export const SafetySignalSchema = z.object({
  signalId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.enum(['green', 'yellow', 'red']).default('green'),
  lastCheckIn: z.string().datetime(),
  trustedContacts: z.array(z.string().uuid()),
  panicCode: z.string().min(4).max(8).optional(),
  createdAt: z.string().datetime(),
});
export type SafetySignal = z.infer<typeof SafetySignalSchema>;

export const ContextualReputationSchema = z.object({
  repId: z.string().uuid(),
  targetUserId: z.string().uuid(),
  context: z.enum(['overall', 'date', 'play', 'poly', 'room']),
  roomId: z.string().uuid().nullable(),
  score: z.number().min(0).max(100),
  signals: z.array(z.string()),
  lastUpdated: z.string().datetime(),
  version: z.number().int().default(1),
});
export type ContextualReputation = z.infer<typeof ContextualReputationSchema>;

export const HoedexRootSchema = z.object({
  user: UserSchema,
  catches: z.array(CatchSchema),
  rooms: z.array(RoomSchema),
  events: z.array(EventSchema),
  consent: ConsentVectorSchema,
  safety: SafetySignalSchema,
  version: z.number().default(1),
});
export type HoedexRoot = z.infer<typeof HoedexRootSchema>;

export const RARITY_ORDER: Rarity[] = ['Mythical', 'Shiny', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
export const RARITY_COLORS: Record<Rarity, string> = {
  Common: '#6b7280', Uncommon: '#22c55e', Rare: '#3b82f6', Epic: '#a855f7', Legendary: '#eab308', Shiny: '#ec4899', Mythical: '#ef4444',
};
export const TYPE_COLORS: Record<PokeType, string> = {
  Fire: '#f97316', Water: '#0ea5e9', Electric: '#eab308', Grass: '#22c55e', Dark: '#334155', Fairy: '#f472b6', Psychic: '#c026ff', Fighting: '#e11d48', Poison: '#854d0e', Flying: '#64748b',
};
export const EVOLUTION_LABELS = ['First Meet', 'FWB / Repeat', 'Situationship', 'Legendary Bond'];

export const DEFAULT_USER: User = {
  userId: '550e8400-e29b-41d4-a716-446655440000',
  displayId: 'pgh_trainer92',
  createdAt: '2025-11-01T08:15:00Z',
  updatedAt: new Date().toISOString(),
  status: 'active',
};

export const DEFAULT_CONSENT: ConsentVector = {
  consentId: 'c1a2b3c4-d5e6-7890-abcd-ef1234567890',
  userId: DEFAULT_USER.userId,
  hardLimits: ['no photos', 'no ex talk', 'no public disclosure'],
  softPreferences: ['aftercare', 'clear communication', 'STI test recent'],
  consentRules: { requiresExplicitYes: true, autoExpireAfter: 90, allowedContactTypes: ['text', 'in_person'] },
  lastUpdated: new Date().toISOString(),
  version: 1,
};

export const DEFAULT_SAFETY: SafetySignal = {
  signalId: 's1a2b3c4-d5e6-7890-abcd-ef1234567890',
  userId: DEFAULT_USER.userId,
  status: 'green',
  lastCheckIn: new Date().toISOString(),
  trustedContacts: [],
  panicCode: 'HOE42',
  createdAt: '2025-11-01T08:15:00Z',
};
