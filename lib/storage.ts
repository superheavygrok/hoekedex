import { HoedexRoot, DEFAULT_USER, DEFAULT_CONSENT, DEFAULT_SAFETY, Catch, Room, Event } from './types';

// Use Web Crypto for UUIDs in browser (no extra dep)
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}

const STORAGE_KEY = 'hoekedex_v1';
const VERSION = 1;

export function createEmptyRoot(): HoedexRoot {
  const now = new Date().toISOString();
  return {
    user: { ...DEFAULT_USER, updatedAt: now },
    catches: [],
    rooms: [],
    events: [],
    consent: { ...DEFAULT_CONSENT, lastUpdated: now },
    safety: { ...DEFAULT_SAFETY, lastCheckIn: now },
    version: VERSION,
  };
}

export function loadRoot(): HoedexRoot {
  if (typeof window === 'undefined') return createEmptyRoot();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyRoot();

    const parsed = JSON.parse(raw);
    // Basic migration / validation
    if (!parsed.version || parsed.version < VERSION) {
      console.info('[Hoedex] Migrating storage to v1');
    }
    parsed.catches = parsed.catches || [];
    parsed.rooms = parsed.rooms || [];
    parsed.events = parsed.events || [];
    parsed.user = parsed.user || DEFAULT_USER;
    parsed.consent = parsed.consent || DEFAULT_CONSENT;
    parsed.safety = parsed.safety || DEFAULT_SAFETY;
    return parsed as HoedexRoot;
  } catch (e) {
    console.warn('[Hoedex] Storage corrupt, resetting', e);
    return createEmptyRoot();
  }
}

export function saveRoot(root: HoedexRoot): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...root, version: VERSION }));
  } catch (e) {
    console.error('[Hoedex] Failed to persist', e);
  }
}

export function generateUUID(): string {
  return generateId();
}

export function createDemoCatch(overrides: Partial<Catch> = {}): Catch {
  const now = new Date().toISOString();
  const id = generateUUID();
  return {
    id,
    dexNumber: 1,
    name: 'Alex Rivera',
    displayHandle: '@wildspark_pgh',
    rarity: 'Rare',
    types: ['Fire', 'Electric'],
    metAt: '2025-10-12T23:45:00Z',
    rating: 8,
    notes: 'Met at karaoke night. Insane chemistry, great conversation after. Voice like velvet.',
    flavorText: 'A fiery trainer from the Pittsburgh bars. Known for strong vocals and even stronger eye contact.',
    evolutionStage: 2,
    tags: ['adventurous', 'vocal'],
    consentGiven: true,
    hardLimits: ['no ex talk'],
    photoUrls: ['https://picsum.photos/id/1011/300/300', 'https://picsum.photos/id/1005/300/300'],
    battleLogs: [
      { id: generateUUID(), timestamp: '2025-10-12T23:50:00Z', note: 'First kiss outside the bar. 10/10 tension.' },
      { id: generateUUID(), timestamp: '2025-10-19T21:00:00Z', note: 'Second date - made dinner. Used "praise" super effective.' },
    ],
    facetIds: [],
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function seedIfEmpty(root: HoedexRoot): HoedexRoot {
  if (root.catches.length > 0) return root;

  const demo1 = createDemoCatch({ dexNumber: 3 });
  const demo2: Catch = {
    ...createDemoCatch({
      dexNumber: 2,
      name: 'Jordan Vale',
      displayHandle: '@moonlit93',
      rarity: 'Epic',
      types: ['Fairy', 'Psychic'],
      metAt: '2025-09-03T19:20:00Z',
      rating: 9,
      notes: 'Golden retriever energy but kinky as hell. Still think about that one night.',
      flavorText: 'A rare Psychic/Fairy type. Extremely affectionate but will drain your energy in the best way.',
      evolutionStage: 3,
      tags: ['golden', 'kinky', 'aftercare'],
      hardLimits: ['blood', 'scat'],
      photoUrls: ['https://picsum.photos/id/1009/300/300'],
      battleLogs: [{ id: generateUUID(), timestamp: '2025-09-03T19:25:00Z', note: 'She used "brat tamer". It was super effective.' }],
    }),
    id: generateUUID(),
  };
  const demo3: Catch = {
    ...createDemoCatch({
      dexNumber: 1,
      name: 'Sam "Spark" Torres',
      displayHandle: undefined,
      rarity: 'Legendary',
      types: ['Electric', 'Dark'],
      metAt: '2025-05-14T02:10:00Z',
      rating: 10,
      notes: 'The one. Still dream about them. 3am deep talks + insane physical connection.',
      flavorText: 'The ultimate Electric/Dark legendary. Only appears in the dead of night. Extremely rare pull.',
      evolutionStage: 4,
      tags: ['legendary', 'late-night'],
      hardLimits: ['no photos ever'],
      photoUrls: ['https://picsum.photos/id/201/300/300'],
      battleLogs: [],
    }),
    id: generateUUID(),
  };

  return {
    ...root,
    catches: [demo3, demo2, demo1],
  };
}