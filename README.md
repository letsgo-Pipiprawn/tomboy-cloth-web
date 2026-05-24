# Tomboy Cloth Web — AXIS / NEUTRAL

Australia-first tomboy / cinematic DTC storefront workspace.

## Projects

| Folder | Stack | Description |
|--------|--------|-------------|
| **`axis-_-neutral/`** | Vite + React | **Main site** — full pages, cart drawer, AU policies |
| **`axis-neutral-web/`** | Next.js | Landing MVP (optional / experimental) |

## Run main site

```bash
cd axis-_-neutral
npm install
npm run dev
```

Open http://localhost:3000 (or the port Vite prints).

## Docs

- `brand-and-site-spec.md` — unified brand + technical spec
- `site.md` / `brand-config-tomboy.md` — legacy pointers

## Push to GitHub

```bash
gh auth login
gh repo create axis-neutral --public --source=. --remote=origin --push
```

Use `--private` instead of `--public` if you prefer a private repo.
