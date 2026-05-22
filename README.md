# HOEDEX

**The Ultimate Dating Pokédex** — Gotta Catch ’Em All… Responsibly.

Privacy-first, consent-native, meme-powered personal roster tracker for the modern player.

> Track, rate, remember, and organize every romantic & sexual connection without judgment.

## Live MVP (Local)

```bash
git clone https://github.com/superheavygrok/hoekedex.git
cd hoekedex
npm install
npm run dev
```

Open **http://localhost:3001**

## What’s Included (Fully Functional)

- Pokémon rarity system (Common → Mythical + Shinies)
- 10 Types with color-coded badges (Fire, Electric, Dark, Fairy…)
- Evolution stages (First Meet → Legendary Bond)
- Rich catch cards with progressive disclosure
- Full Add/Edit modal with photos (URL + local upload), tags, per-entry consent
- Battle logs per catch (timestamped notes)
- One-tap evolve + quick actions
- Search, multi-filter, sort by rarity/rating/recent
- Circles / Pods (Rooms) — group your roster (poly pods, city crews)
- Event timeline logging
- Professor Oak Insights dashboard with real computed stats + overlap warnings
- ConsentVector editor + Safety Signal (check-in + panic demo)
- Export full JSON + anonymized share-to-chat
- Keyboard shortcuts (`/` search, `N` new catch, `ESC` close)
- 100% client-side (localStorage) — zero data leaves your machine

## Architecture Alignment

Implements the production surface models from the spec:
- User / displayId separation
- ProfileFacet-style progressive disclosure
- ConsentVector + per-catch overrides
- Room + Event + SafetySignal + ContextualReputation ready
- Audit fields everywhere

Future: Supabase + E2EE + biometric + mobile (React Native).

## Stack

Next.js 16 (App Router) • TypeScript • Zod • Tailwind • Sonner • date-fns • Framer (ready)

Built with love for the culture. No screenshots. No shame. Own your history.

---

© 2026 — For entertainment + personal organization only. Always get consent.