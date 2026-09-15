import { sql, getSiteContentRow, dbErrorMessage } from "./db";

// Central, admin-editable image manifest. The set of KEYS is fixed (code
// references IMAGES.homeHero, IMAGES.thaiTemple, etc. throughout the
// site), but the src/alt/credit for each entry can be changed from
// /admin/images — swapping in a different photo does not require a code
// change or redeploy.
export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
}

export type ImageKey =
  | "homeHero"
  | "insideAttractions"
  | "lazyRiver"
  | "kidsWaterPark"
  | "thaiTemple"
  | "tenerifePalm"
  | "tropicalBeach"
  | "coastalRoad";

export type ImagesContent = Record<ImageKey, SiteImage>;

export const IMAGE_KEYS: ImageKey[] = [
  "homeHero",
  "insideAttractions",
  "lazyRiver",
  "kidsWaterPark",
  "thaiTemple",
  "tenerifePalm",
  "tropicalBeach",
  "coastalRoad",
];

export const IMAGE_LABELS: Record<ImageKey, string> = {
  homeHero: "Homepage Hero",
  insideAttractions: "Rides & Attractions Page Hero",
  lazyRiver: "Lazy River (Mai Thai River)",
  kidsWaterPark: "Kids Water Park / Traveler Info Hero",
  thaiTemple: "Thai Temple / About & Facts Hero",
  tenerifePalm: "Tenerife Palm Tree",
  tropicalBeach: "Tropical Beach (Contact / Things to Do Hero)",
  coastalRoad: "Coastal Road (How to Reach Hero)",
};

export const DEFAULT_IMAGES: ImagesContent = {
  homeHero: {
    src: "https://images.unsplash.com/photo-1739295194212-0602c4d1e797",
    alt: "Water slides and a swimming pool at a tropical outdoor water park",
    credit: "Meg von Haartman",
  },
  insideAttractions: {
    src: "https://images.unsplash.com/photo-1707575532556-9e4febd8c171",
    alt: "Colorful water slides and a pool at an outdoor water park",
    credit: "Yoga Sukma",
  },
  lazyRiver: {
    src: "https://images.unsplash.com/photo-1775807319100-caeac311698f",
    alt: "Visitors floating along a lazy river at a tropical water park",
    credit: "Vivu Vietnam",
  },
  kidsWaterPark: {
    src: "https://images.unsplash.com/photo-1706843540966-1a1685971dc0",
    alt: "A family enjoying a water park together",
    credit: "April Walker",
  },
  thaiTemple: {
    src: "https://images.unsplash.com/photo-1704391445538-cf5e763234be",
    alt: "Golden Buddha statue and ornate architecture at Wat Pho Temple, Bangkok, Thailand",
    credit: "Nino Steffen",
  },
  tenerifePalm: {
    src: "https://images.unsplash.com/photo-1551462355-af68d82db7ac",
    alt: "Palm tree silhouette against a blue sky in Tenerife, Canary Islands",
    credit: "Marlene Céline Nordvik",
  },
  tropicalBeach: {
    src: "https://images.unsplash.com/photo-1672841828271-54340a6fbcd3",
    alt: "Tropical beach with palm trees and turquoise water",
    credit: "Simon Spring",
  },
  coastalRoad: {
    src: "https://images.unsplash.com/photo-1776142519474-9edba6839e5c",
    alt: "Cars driving along a scenic coastal highway",
    credit: "Fabio Sasso",
  },
};

export async function getImages(): Promise<ImagesContent> {
  const row = await getSiteContentRow();
  const data = row?.images_json;
  if (!data || typeof data !== "object") return DEFAULT_IMAGES;
  const merged = { ...DEFAULT_IMAGES } as ImagesContent;
  for (const key of IMAGE_KEYS) {
    if (data[key] && typeof data[key] === "object") {
      merged[key] = { ...DEFAULT_IMAGES[key], ...data[key] };
    }
  }
  return merged;
}

export async function saveImages(data: ImagesContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, images_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET images_json = EXCLUDED.images_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

// Back-compat plain constant (built-in defaults only, not admin edits).
export const IMAGES = DEFAULT_IMAGES;
