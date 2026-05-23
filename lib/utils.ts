import { Rarity, PokeType, RARITY_ORDER, RARITY_COLORS, TYPE_COLORS, Catch, HoedexRoot } from './types';
import { format, formatDistanceToNow } from 'date-fns';

export function getRarityColor(rarity: Rarity): string {
  return RARITY_COLORS[rarity] || '#6b7280';
}

export function getTypeColor(type: PokeType): string {
  return TYPE_COLORS[type] || '#64748b';
}

export function getRarityRank(rarity: Rarity): number {
  return RARITY_ORDER.indexOf(rarity);
}

export function formatDate(iso: string, style: 'short' | 'relative' = 'short'): string {
  const d = new Date(iso);
  if (style === 'relative') {
    return formatDistanceToNow(d, { addSuffix: true });
  }
  return format(d, 'MMM d, yyyy');
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), 'MMM d • h:mm a');
}

export function sortCatches(catches: Catch[], sortBy: string): Catch[] {
  const sorted = [...catches];
  switch (sortBy) {
    case 'rarity':
      return sorted.sort((a, b) => getRarityRank(b.rarity) - getRarityRank(a.rarity) || b.rating - a.rating);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'recent':
      return sorted.sort((a, b) => new Date(b.metAt).getTime() - new Date(a.metAt).getTime());
    case 'evolution':
      return sorted.sort((a, b) => b.evolutionStage - a.evolutionStage || getRarityRank(b.rarity) - getRarityRank(a.rarity));
    default:
      return sorted;
  }
}

export function filterCatches(
  catches: Catch[],
  query: string,
  rarityFilter: Rarity | 'All',
  typeFilter: PokeType | 'All',
  minRating: number
): Catch[] {
  const q = query.toLowerCase().trim();
  return catches.filter(c => {
    const matchesQuery = !q ||
      c.name.toLowerCase().includes(q) ||
      (c.displayHandle && c.displayHandle.toLowerCase().includes(q)) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      (c.notes && c.notes.toLowerCase().includes(q));

    const matchesRarity = rarityFilter === 'All' || c.rarity === rarityFilter;
    const matchesType = typeFilter === 'All' || c.types.includes(typeFilter);
    const matchesRating = c.rating >= minRating;

    return matchesQuery && matchesRarity && matchesType && matchesRating;
  });
}

export function computeInsights(root: HoedexRoot) {
  const { catches } = root;
  if (catches.length === 0) {
    return {
      total: 0,
      avgRating: 0,
      legendaryCount: 0,
      shinyCount: 0,
      topTypes: [],
      evolutionBreakdown: [0, 0, 0, 0],
      message: "Go outside and fill that Dex, trainer. The night is young.",
    };
  }

  const total = catches.length;
  const avgRating = Math.round(catches.reduce((s, c) => s + c.rating, 0) / total * 10) / 10;
  const legendaryCount = catches.filter(c => c.rarity === 'Legendary' || c.rarity === 'Mythical').length;
  const shinyCount = catches.filter(c => c.rarity === 'Shiny').length;

  // Type affinity
  const typeCounts: Record<string, number> = {};
  catches.forEach(c => c.types.forEach(t => { typeCounts[t] = (typeCounts[t] || 0) + 1; }));
  const topTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([t, count]) => ({ type: t as PokeType, count, pct: Math.round((count / total) * 100) }));

  // Evolution
  const evolutionBreakdown = [1, 2, 3, 4].map(stage =>
    catches.filter(c => c.evolutionStage === stage).length
  );

  // Fun Professor message
  let message = "Solid roster. Keep catching responsibly.";
  if (shinyCount > 1) message = "Bro... multiple Shinies? The universe is smiling on you.";
  else if (legendaryCount >= 1) message = "You have a Legendary. Most trainers only dream of that pull.";
  else if (avgRating > 8.5) message = "Your standards are elite. Quality over quantity, respect.";
  else if (topTypes[0] && topTypes[0].pct > 55) message = `Heavy ${topTypes[0].type} bias detected. You have a type and it shows.`;

  return { total, avgRating, legendaryCount, shinyCount, topTypes, evolutionBreakdown, message };
}

export function getEvolutionLabel(stage: number): string {
  return ['First Meet', 'FWB / Repeat', 'Situationship', 'Legendary Bond'][stage - 1] || 'Unknown';
}

// Simple overlap detector (demo only, based on tags + recent)
export function detectOverlaps(catches: Catch[]): string[] {
  const warnings: string[] = [];
  const recent = catches.filter(c => {
    const days = (Date.now() - new Date(c.metAt).getTime()) / (1000 * 3600 * 24);
    return days < 60;
  });
  if (recent.length > 4) warnings.push("High volume last 60 days — watch for burnout & overlaps.");
  // naive same tag cluster
  const tagMap = new Map<string, number>();
  recent.forEach(c => c.tags.forEach(t => tagMap.set(t, (tagMap.get(t) || 0) + 1)));
  tagMap.forEach((count, tag) => {
    if (count > 2) warnings.push(`Multiple "${tag}" energy recently — potential roster collision.`);
  });
  return warnings.slice(0, 2);
}