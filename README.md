# Portfolio (Next.js)

Personal portfolio site with **SQLite-backed content** and an **admin area** at `/admin`.

## Setup

```bash
npm install
cp .env.example .env.local
```

Optional: run **`npm run seed:admin`** once to create `.env.local` with admin ID, password, and a random session secret (skips if `.env.local` already exists).

Default admin (used when env vars are **not** set, dev only for session secret):

- **ID:** `madhusudantimalsina`
- **Password:** set in app defaults (override with `ADMIN_USERNAME` / `ADMIN_PASSWORD` in `.env.local`)

In **production**, always set `ADMIN_SESSION_SECRET` (16+ characters) and strong `ADMIN_PASSWORD` in the environment.

Initialize the database and seed default content (from `src/db/seed-source.ts`):

```bash
npm run db:migrate
npm run db:seed
```

Start the app:

```bash
npm run dev
```

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Gallery (public): [http://localhost:3000/gallery](http://localhost:3000/gallery)

From **Admin** you can manage the full public experience: profile & SEO (tab title, Open Graph, hero image and copy), **main navigation** links, **inner page titles/descriptions** (About, Skills, Projects, …), plus all portfolio content (projects, skills, gallery uploads, etc.).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run db:migrate` | Apply SQL migrations in `drizzle/` |
| `npm run db:seed` | Replace all content with seed snapshot (destructive) |
| `npm run db:generate` | Regenerate migrations after editing `src/db/schema.ts` |
| `npm run db:studio` | Open Drizzle Studio against the SQLite file |

## Backups

Back up both:

1. The SQLite file (`data/portfolio.db` and WAL/SHM if present).
2. Uploaded gallery files under `public/uploads/gallery/`.

## Deployment and SQLite

File-based SQLite works well on a **single long-lived Node host** (VPS, Docker, `next start` on one machine).

Typical **serverless** hosts use an ephemeral filesystem and many instances, so a **writable local SQLite file is not a good fit**. For that model, consider [Turso](https://turso.tech/) (libSQL) or another hosted database, and point Drizzle at that driver instead of `better-sqlite3`.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [Drizzle ORM](https://orm.drizzle.team/) + [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- [Tailwind CSS](https://tailwindcss.com/) v4

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
