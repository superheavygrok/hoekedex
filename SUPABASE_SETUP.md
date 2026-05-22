# Hoedex Beta Infrastructure - Supabase Setup (Run This Once)

## 1. Create the `catches` table

Go to Supabase → SQL Editor and run this:

```sql
create table if not exists catches (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,                    -- Privy user ID
  dex_number integer,
  name text not null,
  display_handle text,
  rarity text not null,
  types text[] not null,
  met_at timestamptz,
  rating integer not null,
  notes text,
  flavor_text text,
  evolution_stage integer default 1,
  tags text[] default '{}',
  consent_given boolean default true,
  hard_limits text[] default '{}',
  photo_urls text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table catches enable row level security;

-- Basic policy (we'll enforce user_id in the app for beta)
create policy "Users manage their own catches"
  on catches
  for all
  using (user_id = current_setting('app.current_user_id', true))
  with check (user_id = current_setting('app.current_user_id', true));
```

## 2. Create Storage Bucket for Photos

1. Go to Storage → New Bucket
2. Name: `hoedex-photos`
3. Make it **Public** (for easy display in beta)
4. Save

## 3. Recommended Row Level Security (Simpler for beta)

Because we're using Privy (not Supabase Auth), the cleanest way for beta is:

- Store the Privy user ID in the `user_id` column.
- In the app we always filter by `user_id = currentPrivyUser.id`

This is fast and secure enough for beta testing.

---

After running the SQL above, add your Supabase keys to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Then restart the dev server.

The app will now save catches and photos to your real Supabase project, scoped per logged-in Privy user.