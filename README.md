# Siam Park Visitor Guide (siam-informative)

An informational visitor's guide to Siam Park in Costa Adeje, Tenerife —
built independently, following the page structure of
[siamwaterpark.com](https://siamwaterpark.com/) (Inside the Park / Getting
There / Traveler Information / Interesting Facts) but with entirely
original architecture, theme, branding, images, and content.

Every page and every piece of content — site settings, navigation, images,
the homepage, tickets, rides, facilities, hotels, shuttles/buses, tips,
FAQs, and all 8 long-form pages (hero, body copy, SEO fields) — is
editable from a built-in admin panel at `/admin`, backed by a Postgres
database. There is no code change or redeploy needed to update copy.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Postgres (built for [Neon](https://neon.tech), via `@neondatabase/serverless`)
  as a single-row-per-domain JSONB store — see "How content storage works" below
- Server-rendered, `output: "export"` **removed** — the site now needs a
  live Node server (Vercel or any Node-capable host) so the admin API
  routes and dynamic content fetches can run
- All photography served from Unsplash's CDN through a custom
  `next/image` loader (`lib/imageLoader.js`); image URLs, alt text, and
  captions are editable from `/admin/images`

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage hub — ticket pricing table, ticket types, hours & location, visitor tips, FAQ, links to every other page |
| `/inside-siam-park/` | Attractions, rides, and facilities |
| `/about-siam-park/` | The park's history, Thai design story, and how it was built |
| `/how-to-reach-siam-park/` | Transport: car, bus, taxi, organized transfers |
| `/traveler-information/` | Location, hours, tickets, tips (deeper dive) |
| `/interesting-facts-about-siam-park/` | Origin story, design, and a fact-check note on marketing claims |
| `/things-to-do-near-siam-park/` | Siam Mall, nearby beaches, Aqualand, Loro Parque |
| `/contact/` | Contact email + quick answers to common questions |
| `/privacy-policy/` | Privacy policy |

Every "Book" / "Check Prices" call-to-action links out to the park's own
official ticket page in a new tab — this site is an information resource,
not a booking system.

## Admin panel

Visit `/admin/login` and sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`
(see Environment variables below). The dashboard is organized into:

- **Site-wide** — Site Settings (name, tagline, contact email, URL),
  Navigation (header + footer links), Images (the full photo manifest),
  Homepage (hero, stats, and every homepage section's copy)
- **Park Content** — Tickets & hours, Rides, Facilities (dining, services,
  rules), Hotels, Shuttles & Buses (+ parking info), Visitor Tips, FAQs
- **Pages** — a dedicated editor for each of the 8 long-form pages: hero
  content, every prose section (as raw HTML — write `<p>`, `<strong>`,
  `<ul>/<li>`, `<h2>` tags directly), and SEO meta title/description
- **Account** — change the admin password

Saving any form calls `revalidatePath()` on the affected public route, so
changes go live immediately without a rebuild or redeploy.

## How content storage works

All editable content lives in one Postgres table, `site_content`, with a
single row (`id = 1`) and one JSONB column per content domain (nav,
images, homepage, tickets, rides, dining, hotels, shuttles, tips, FAQs,
and one column per long-form page). Every `lib/*.ts` file exports a
`getX()` / `saveX()` pair for its domain; every `getX()` reads from a
single shared, per-request-cached row fetch (`getSiteContentRow()` in
`lib/db.ts`), so a full page render costs exactly one database query no
matter how many content domains that page needs. The admin password is
kept in a separate `admin_account` table so a security credential never
shares a row with editable page copy.

If the database is unreachable or a column is missing, every `getX()`
falls back to sensible built-in defaults so the public site still
renders — but admin saves will fail until the database is set up
correctly (see below).

## Environment variables

Create a `.env` (or `.env.local`) with:

```bash
# Postgres connection string (Neon recommended — https://neon.tech)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Admin login. On first run, scripts/setup-db.mjs creates the admin_account
# row from these two values (hashed). ADMIN_PASSWORD also stays valid
# permanently as a break-glass credential even after you change your
# password from /admin/account — see lib/adminPassword.ts.
ADMIN_EMAIL=you@example.com
ADMIN_PASSWORD=a-strong-password

# Long random string used to sign admin session cookies.
# Generate one with: openssl rand -base64 32
ADMIN_SESSION_SECRET=
```

**Change `ADMIN_PASSWORD` and generate a real `ADMIN_SESSION_SECRET`
before deploying** — the placeholder values checked into this repo's
`.env` are not safe for production.

## Database setup

Run once against your Postgres database (creates the `site_content` and
`admin_account` tables, and seeds the site's original content and your
admin login):

```bash
node scripts/setup-db.mjs
```

Run it again with `--reseed` any time you want to reset all content back
to the original seed data (this does **not** touch your admin password):

```bash
node scripts/setup-db.mjs --reseed
```

> This repo was developed in a sandboxed environment with no outbound
> network access to a live database, so `setup-db.mjs` has been verified
> with `node --check` (syntax-valid) but has not actually been run
> against a real Postgres instance. **Run it yourself** against your Neon
> (or other Postgres) database before first use — it's a one-time step.

## Install & run locally

Requires Node.js 18.17+.

```bash
cd siam-informative
npm install
node scripts/setup-db.mjs   # one-time — see above
npm run dev
```

Open http://localhost:3000, or http://localhost:3000/admin/login for the
admin panel.

## Build & deploy

```bash
npm run build
npm start
```

Deploy to Vercel or any Node-capable host and set the environment
variables above in your hosting provider's dashboard. Because the admin
panel needs a live server (not just static files), a purely static host
(GitHub Pages, S3 without a server, etc.) will not work anymore.

## A note on this repo's own build verification

This project was built and type-checked (`npx tsc --noEmit`, clean) in a
sandboxed development environment whose outbound network access is
restricted to an allowlist that does not include the npm registry or
Neon's database endpoints. `node --check` was used to verify script
syntax, and every admin form/API route pair was reviewed for correct
wiring, but a literal `next build` and a real database round-trip could
not be executed here. Please run `npm install && npm run build` once on
a normal machine (or let Vercel/Netlify build it) and run
`node scripts/setup-db.mjs` against your real database before treating
this as fully verified.

## Before you launch

- `/admin/settings` → update the site URL, contact email, and site name
  to your real values (feeds canonical URLs, metadataBase, Open
  Graph/JSON-LD, and `sitemap.xml`).
- Change `ADMIN_PASSWORD` and set a real `ADMIN_SESSION_SECRET`.
- Connect your real domain in your hosting provider before relying on
  the sitemap/canonical URLs for indexing.

## Content & sourcing

Every factual claim (opening hours, ticket price ranges, attraction
names, historical details) was independently researched and
cross-referenced across multiple sources rather than copied from the
reference site. Where a claim is disputed or only supported by the
park's own marketing (e.g. certain "world record" claims), the copy says
so explicitly — see `/interesting-facts-about-siam-park/`'s "A Note on
Marketing Claims" section, editable from `/admin/pages/interesting-facts`.
This site is not affiliated with, endorsed by, or operated by Siam Park
or the Loro Parque group.

## Images

All photography is sourced from Unsplash under the Unsplash License
(free for commercial use, no attribution required) and captioned to
honestly describe what's actually shown — most are stock photos of
other water parks, beaches, and landmarks used for atmosphere, not
photos of Siam Park itself. Manage the full manifest (URLs, alt text,
photographer credit) from `/admin/images`.
