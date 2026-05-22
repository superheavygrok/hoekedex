import { Catch, Rarity, PokeType, RARITY_ORDER } from './types';

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getRarityColor(rarity: Rarity): string {
  const colors: Record<Rarity, string> = {
    Common: 'bg-zinc-600',
    Uncommon: 'bg-emerald-600',
    Rare: 'bg-blue-600',
    Epic: 'bg-violet-600',
    Legendary: 'bg-yellow-600',
    Shiny: 'bg-pink-600',
    Mythical: 'bg-red-700',
  };
  return colors[rarity] || 'bg-zinc-600';
}

export function getTypeColor(type: PokeType): string {
  const colors: Record<PokeType, string> = {
    Fire: 'bg-red-600',
    Water: 'bg-blue-600',
    Electric: 'bg-yellow-500 text-black',
    Grass: 'bg-emerald-600',
    Dark: 'bg-zinc-800',
    Fairy: 'bg-pink-600',
    Psychic: 'bg-purple-600',
    Fighting: 'bg-orange-600',
    Poison: 'bg-violet-600',
    Flying: 'bg-cyan-600',
  };
  return colors[type] || 'bg-zinc-600';
}

export function sortCatches(catches: Catch[], mode: 'recent' | 'rarity' | 'rating' | 'evolution'): Catch[] {
  const sorted = [...catches];
  switch (mode) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.metAt).getTime() - new Date(a.metAt).getTime());
    case 'rarity':
      return sorted.sort((a, b) => RARITY_ORDER.indexOf(b.rarity) - RARITY_ORDER.indexOf(a.rarity));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'evolution':
      return sorted.sort((a, b) => b.evolutionStage - a.evolutionStage);
    default:
      return sorted;
  }
}

export function filterCatches(
  catches: Catch[],
  search: string,
  rarityFilter: Rarity | 'All',
  typeFilter: PokeType | 'All',
  minRating: number
): Catch[] {
  return catches.filter(c => {
    const matchesSearch = !search || 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.displayHandle && c.displayHandle.toLowerCase().includes(search.toLowerCase())) ||
      c.notes.toLowerCase().includes(search.toLowerCase());
    const matchesRarity = rarityFilter === 'All' || c.rarity === rarityFilter;
    const matchesType = typeFilter === 'All' || c.types.includes(typeFilter);
    const matchesRating = c.rating >= minRating;
    return matchesSearch && matchesRarity && matchesType && matchesRating;
  });
}

export function computeInsights(catches: Catch[]) {
  // ... (insights logic kept from current build)
  return {
    total: catches.length,
    avgRating: catches.length ? (catches.reduce((s, c) => s + c.rating, 0) / catches.length) : 0,
    topRarity: catches.length ? catches.reduce((a, b) => RARITY_ORDER.indexOf(b.rarity) > RARITY_ORDER.indexOf(a.rarity) ? b : a).rarity : 'Common' as Rarity,
  };
}

export function getEvolutionLabel(stage: number): string {
  return ['First Meet', 'Repeat / FWB', 'Situationship', 'Legendary Bond'][Math.max(0, Math.min(3, stage - 1))];
}

export function detectOverlaps(catches: Catch[]) {
  // placeholder for overlap detection
  return [];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString();
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString();
}