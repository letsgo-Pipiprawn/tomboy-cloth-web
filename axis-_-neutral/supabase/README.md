# Supabase CLI — AXIS / NEUTRAL

**Correct project ref:** `opjgvabhdserpotkoguu`  
**API URL:** `https://opjgvabhdserpotkoguu.supabase.co`  
**Dashboard:** https://supabase.com/dashboard/project/opjgvabhdserpotkoguu

> Do **not** use `xporcrzmhguplimvrijm` (Shopify loyalty app — separate product).

## One-time setup (run in your terminal)

```bash
cd axis-_-neutral

npx supabase login

# already ran init — skip if supabase/config.toml exists
# npx supabase init

npx supabase link --project-ref opjgvabhdserpotkoguu
# Enter database password when prompted (Supabase → Settings → Database)
```

Or use the npm script:

```bash
npm run db:link
```

## Push schema + seed (first time)

```bash
npm run db:push
npm run db:seed
npm run db:types
```

## Vercel env (must match this project)

| Key | Value |
|-----|--------|
| `VITE_SUPABASE_URL` | `https://opjgvabhdserpotkoguu.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Dashboard → Settings → API → anon / publishable |
| `SUPABASE_URL` | same as above |
| `SUPABASE_SERVICE_ROLE_KEY` | server only — never `VITE_` |

Redeploy after updating env vars.

## npm scripts

| Script | Action |
|--------|--------|
| `npm run db:link` | Link CLI to `opjgvabhdserpotkoguu` |
| `npm run db:push` | Apply `supabase/migrations/*` |
| `npm run db:seed` | Run `supabase/seed.sql` |
| `npm run db:types` | Generate `src/types/database.generated.ts` |

## New migration

```bash
npx supabase migration new your_change_name
# edit supabase/migrations/<timestamp>_your_change_name.sql
npm run db:push
npm run db:types
```
