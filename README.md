# Siam Park Visitor Guide (siam-informative)

A 100% static, informational visitor's guide to Siam Park in Costa Adeje,
Tenerife — built independently, following the page structure of
[siamwaterpark.com](https://siamwaterpark.com/) (Inside the Park / Getting
There / Traveler Information / Interesting Facts) but with entirely
original architecture, theme, branding, images, and content. There is no
admin panel, no CMS, and no database — every word of copy lives directly
in the page source.

## Stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- `output: "export"` — `next build` emits plain static HTML/CSS/JS into
  `/out`, deployable to any static host (Vercel, Netlify, Cloudflare
  Pages, S3, GitHub Pages — no Node server required)
- All photography served from Unsplash's CDN through a custom
  `next/image` loader (`lib/imageLoader.js`) so images stay responsive
  and served in modern formats without needing Next's server-side Image
  Optimization API

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage — overview, stats, FAQ |
| `/inside-siam-park/` | Attractions, rides, and facilities |
| `/how-to-reach-siam-park/` | Transport: car, bus, taxi, organized transfers |
| `/traveler-information/` | Location, hours, tickets, tips |
| `/interesting-facts-about-siam-park/` | Origin story, design, and a fact-check note on marketing claims |
| `/about/` | Editorial policy, independence disclosure |
| `/contact/` | Contact email |
| `/privacy-policy/` | Privacy policy |

## Install & run locally

Requires Node.js 18.17+.

```bash
cd siam-informative
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

This produces a static export in `/out`. Deploy that folder's contents
directly to any static host, or connect the repo to Vercel/Netlify and
let their build pipeline run `next build` for you (recommended — see
note below).

## A note on this repo's own build verification

This project was built and type-checked (`npx tsc --noEmit`, clean) in a
sandboxed development environment whose outbound network access is
restricted to an allowlist that does not include the npm registry. Next.js
14's build step needs to download a small platform-specific native binary
(`@next/swc-*`) on first use for whatever machine architecture is running
`next build` — that download was blocked in this sandbox, so a literal
`next build` could not be executed here as a final check, on top of the
TypeScript check and a manual link/reference audit that were completed.
This is an environment limitation, not a code issue: running `npm install`
and `npm run build` on a normal machine, or letting Vercel/Netlify build
it (both have full registry access), will download the correct binary
automatically and build normally. Please run a build once after pulling
this down, just to be safe, before treating it as fully verified.

## Before you launch

- `lib/site.ts` → `SITE_URL` is currently set to a placeholder,
  `https://www.siam-informative.com`. Update it to your real domain —
  it feeds canonical URLs, metadataBase, Open Graph/JSON-LD, and
  `sitemap.xml`.
- `lib/site.ts` → `CONTACT_EMAIL` is a placeholder; update it to your
  real inbox.
- Connect your real domain in your hosting provider before relying on
  the sitemap/canonical URLs for indexing.

## Content & sourcing

Every factual claim (opening hours, ticket price ranges, attraction
names, historical details) was independently researched and
cross-referenced across multiple sources rather than copied from the
reference site. Where a claim is disputed or only supported by the
park's own marketing (e.g. certain "world record" claims), the copy says
so explicitly — see `/interesting-facts-about-siam-park/`'s "A Note on
Marketing Claims" section. This site is not affiliated with, endorsed
by, or operated by Siam Park or the Loro Parque group.

## Images

All photography is sourced from Unsplash under the Unsplash License
(free for commercial use, no attribution required) and captioned to
honestly describe what's actually shown — most are stock photos of
other water parks, beaches, and landmarks used for atmosphere, not
photos of Siam Park itself. See `lib/images.ts` for the full manifest
with photographer credit and source notes.
