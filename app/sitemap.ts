import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Fully static site — every route is known at build time, so the sitemap
// is just a plain list (no database/content-loader calls needed). Next.js
// emits this as a real /sitemap.xml file during `next build` with
// output: "export".
const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1.0 },
  { path: "/inside-siam-park/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about-siam-park/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-to-reach-siam-park/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/traveler-information/", changeFrequency: "monthly", priority: 0.9 },
  { path: "/interesting-facts-about-siam-park/", changeFrequency: "monthly", priority: 0.8 },
  { path: "/things-to-do-near-siam-park/", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact/", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy-policy/", changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
