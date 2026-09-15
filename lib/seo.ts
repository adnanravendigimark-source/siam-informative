import type { Metadata } from "next";
import { getSiteSettings, DEFAULT_SETTINGS } from "./site";
import { getImages } from "./images";

// Small helper so every page builds its Metadata object the same way —
// canonical always set, OG/Twitter always populated, title always run
// through the same site-wide template. Site name/URL and the default OG
// image are admin-editable (Settings / Images), so this is async and
// looks them up itself — call it from an async generateMetadata().
export async function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const [settings, images] = await Promise.all([getSiteSettings(), getImages()]);
  const url = `${settings.siteUrl}${path}`;
  const ogImage = image ?? `${images.homeHero.src}?w=1200&h=630&fit=crop&auto=format&q=75`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: settings.siteName,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Kept synchronous (unlike buildMetadata) since it's called inline inside
// JSX for the JSON-LD <script> tag on every page. Accepts the current
// site URL so it stays correct even after an admin edits Site Settings;
// falls back to the built-in default if the caller doesn't have it handy.
export function breadcrumbJsonLd(items: { name: string; path: string }[], siteUrl: string = DEFAULT_SETTINGS.siteUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
