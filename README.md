# HOEDEX

**The Ultimate Dating Pokédex** — Gotta Catch ’Em All… Responsibly.

A premium, Gen-1 hardware-accurate Pokédex-themed personal romantic/sexual history tracker.

> Track, rate, remember, and organize every romantic & sexual connection without judgment. Real talk only.

---

## Live Demo (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/superheavygrok/hoekedex)

Or click **Import Git Repository** on Vercel and select `superheavygrok/hoekedex`.

Runs fully in the browser (demo mode). No backend required yet.

---

## Local Development

```bash
git clone https://github.com/superheavygrok/hoekedex.git
cd hoekedex
npm install
npm run dev
```

Then open **http://localhost:3001**

---

## What You Get Right Now (Fully Working)

- **Authentic Gen-1 Pokédex hardware shell** — red plastic, thick bezels, physical-feeling CATCH / SCAN / EVOLVE buttons, scanlines, premium materials
- **Professor Oak degen tutorial** — auto-starts on first visit (or force it with the TUTORIAL button). Savage, gender-aware, 3–3.5 min, with "Skip this shit" and interactive roasts
- **Full Catch system** — name, age, rarity (Common → Mythical + Shiny), types, photos (URL or upload), rating, notes, battle logs, evolution stage
- **Cooked Factor + Expired Meat** — age on first entry + manual override. Auto-cooked at 35. Irreversible archive for "expired meat" entries with funny Professor Oak commentary
- **Professor Oak Insights tab** — real computed stats, overlap detection, savage summaries
- **Circles / Pods** — organize your roster into groups
- **Events & Logs** — timeline of dates and interactions
- **Consent & Safety Vault** — per-entry boundaries + hard limits
- **Demo wallet simulation** — "Connect Solana Wallet" just gives you a fake trainer address (safe, no real Privy call unless you put a real key in `.env.local`)
- Everything saved per-trainer via localStorage (multiple fake wallets = separate Dexes)

---

## Current Status

**Phase 1 complete** — Premium frontend + working demo (localStorage only, fake wallet).

**Next (Option C)** — Clean data layer + real Privy (Solana) + Supabase (private per-user data + photo storage) + loading/error states.

The app is intentionally safe in demo mode. No real wallet will ever pop unless you deliberately add a real `NEXT_PUBLIC_PRIVY_APP_ID`.

---

## Environment Variables (for real backend later)

Copy `.env.example` → `.env.local` (or just leave it empty for pure demo).

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_real_privy_id_here   # only if you want real login
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

If `NEXT_PUBLIC_PRIVY_APP_ID` is missing or a placeholder, the Connect button stays in safe simulation mode.

---

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind + custom high-end component system
- Framer Motion (ready)
- Sonner (toasts)
- Lucide icons
- Built inside a pixel-perfect Gen-1 Pokédex shell

---

## Philosophy

No sugar-coating. No vibe-coded UI. This is meant to feel like an expensive piece of hardware you actually own.

Built for the culture. Own your history.

---

© 2026 — For entertainment + personal organization only. Always get consent.