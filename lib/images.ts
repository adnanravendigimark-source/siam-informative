// Central, verified image manifest. Every entry was individually sourced
// from Unsplash, confirmed "Free to use under the Unsplash License", and
// captioned to honestly describe what the photo actually shows — most of
// these are stock photos of OTHER water parks, beaches, and landmarks used
// for atmosphere, not photos of Siam Park itself (this is an unofficial,
// independent guide with no affiliation to the park). Real, verified
// locations (Tenerife, Bangkok) are named only where the source photo's
// own metadata confirms them.
export interface SiteImage {
  src: string;
  alt: string;
  credit: string;
}

export const IMAGES = {
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
} satisfies Record<string, SiteImage>;
