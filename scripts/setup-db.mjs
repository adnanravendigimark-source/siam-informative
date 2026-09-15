#!/usr/bin/env node
// One-time (and safe-to-rerun) DB setup for the siam-informative admin panel.
//
// This site used to be 100% static (output: "export", no DB). It now needs
// a live Postgres database so every page can be edited from /admin. This
// script creates the two tables the app needs and seeds them with the
// site's original, already-published content — so turning on the admin
// panel does not lose or change anything visitors currently see.
//
// Usage:
//   DATABASE_URL="postgres://..." node scripts/setup-db.mjs
//
// Safe to run more than once: every CREATE is IF NOT EXISTS / ADD COLUMN IF
// NOT EXISTS, and the seed INSERT only fires the first time (id=1 row does
// not yet exist) unless you pass --reseed.

import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Plain `node scripts/setup-db.mjs` does NOT auto-load .env files the way
// `next dev`/`next build` do — Next's env loading is baked into its own
// CLI, not Node itself. So this script loads .env.local / .env manually
// (same precedence Next.js uses: .env.local wins over .env) before
// reading DATABASE_URL, ADMIN_EMAIL, ADMIN_PASSWORD below.
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const contents = readFileSync(filePath, "utf8");
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
loadEnvFile(path.join(projectRoot, ".env.local"));
loadEnvFile(path.join(projectRoot, ".env"));

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Put it in .env.local or .env at the project root, e.g.:\n  DATABASE_URL=postgres://user:pass@host/db\nor pass it inline:\n  DATABASE_URL=postgres://user:pass@host/db node scripts/setup-db.mjs"
  );
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const RESEED = process.argv.includes("--reseed");

/* ------------------------------------------------------------------ */
/* Default content — this is the site's original hardcoded content,   */
/* preserved verbatim so the first admin-panel deploy changes nothing */
/* visitors see until someone actually edits it in /admin.            */
/* ------------------------------------------------------------------ */

const SETTINGS = {
  siteName: "Siam Park Visitor Guide",
  siteUrl: "https://www.siam-informative.com",
  siteTagline: "Tickets, Prices & Visitor Guide",
  siteDescription:
    "An independent, unofficial visitor's guide to Siam Park in Costa Adeje, Tenerife — ticket prices, opening hours, what's inside the park, getting there, and everything else you need to plan your visit.",
  contactEmail: "jrandrewclark@gmaill.com",
  officialTicketsUrl: "https://siampark.net/en/tickets-and-prices",
  officialHoursUrl: "https://siampark.net/plan-your-visit/opening-hours/",
  officialDirectionsUrl: "https://siampark.net/plan-your-visit/directions/",
  officialSiteUrl: "https://siampark.net/en",
};

const NAV = {
  navLinks: [
    { label: "Overview", href: "/" },
    { label: "Rides & Attractions", href: "/inside-siam-park/" },
    { label: "Tickets & Prices", href: "/#tickets" },
    { label: "Traveler Guide", href: "/traveler-information/" },
    { label: "Getting There & Shuttles", href: "/how-to-reach-siam-park/" },
    { label: "About & History", href: "/about-siam-park/" },
  ],
  footerLinks: [
    { label: "Home Guide", href: "/" },
    { label: "Rides & Attractions", href: "/inside-siam-park/" },
    { label: "Tickets & Admission Prices", href: "/#tickets" },
    { label: "Traveler Practicalities & Tips", href: "/traveler-information/" },
    { label: "Getting There & Free Shuttles", href: "/how-to-reach-siam-park/" },
    { label: "About Siam Park & Design", href: "/about-siam-park/" },
    { label: "Interesting Facts & Records", href: "/interesting-facts-about-siam-park/" },
    { label: "Things to Do & Hotels Nearby", href: "/things-to-do-near-siam-park/" },
    { label: "Contact & Inquiries", href: "/contact/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
  ],
};

const IMAGES = {
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

const TICKETS = [
  {
    id: "general",
    name: "General Admission (1 Day)",
    priceAdult: "€42.00 – €45.00",
    priceChild: "€30.00 – €32.00 (Age 3–11)",
    summary: "Standard full-day entry covering every water slide, wave pool, lazy river, and kids play zone in the park.",
    includes: [
      "Access to all 16+ water slides and thrill rides",
      "Siam Beach and Wave Palace wave pool",
      "Mai Thai River lazy river and kids zones",
      "Complimentary sun loungers, umbrellas, and lifejackets",
      "Free entry for infants under 3 years old",
    ],
    bestFor: "First-time visitors and budget-conscious travelers wanting full access.",
  },
  {
    id: "twin",
    name: "Twin Ticket (Siam Park + Loro Parque)",
    priceAdult: "€74.00 – €76.00",
    priceChild: "€53.00 – €55.00 (Age 3–11)",
    summary: "Combined pass granting 1 day at Siam Park (Costa Adeje) and 1 day at Loro Parque (Puerto de la Cruz). Valid for 15 days from first use.",
    includes: [
      "1 full day at Siam Park",
      "1 full day at Loro Parque zoo in the north",
      "Save ~€12–15 compared to buying tickets individually",
      "Tickets do not need to be used on consecutive days",
    ],
    bestFor: "Travelers planning to visit both of Tenerife's world-class theme parks.",
  },
  {
    id: "premium",
    name: "Premium Ticket",
    priceAdult: "€65.00 – €70.00",
    priceChild: "€48.00 – €52.00",
    summary: "Upgrades general admission with a dining voucher at the Beach Club buffet restaurant, towel hire, and locker rental.",
    includes: ["Standard park admission", "Lunch voucher (€15 credit for adult / €9 for child)", "Locker rental included", "Towel hire included"],
    bestFor: "Visitors wanting a hassle-free all-in-one package without carrying extra cash for lunch and locker.",
  },
  {
    id: "all-inclusive",
    name: "All-Inclusive Deluxe Ticket",
    priceAdult: "€154.00 – €160.00",
    priceChild: "€105.00 – €110.00",
    summary: "The ultimate VIP day pass including unlimited food & drinks all day, locker, towel, and a Fast Pass wristband for major rides.",
    includes: [
      "General admission ticket",
      "Fast Pass wristband (priority access to major slides)",
      "All-day unlimited dining and soft drinks at select eateries",
      "Locker rental and towel hire included",
      "Beer and non-alcoholic beverages all day",
    ],
    bestFor: "Guests visiting during peak summer season who want to maximize ride time and skip queues.",
  },
  {
    id: "fast-pass",
    name: "Fast Pass Wristband (Add-On)",
    priceAdult: "€15.00 – €28.00",
    priceChild: "€15.00 – €28.00",
    summary: "Add-on wristband allowing one priority queue access on each participating major ride (excluding Tower of Power).",
    includes: [
      "1-time priority queue access per participating slide",
      "Valid either for morning (opening–2pm) or afternoon (2pm–closing) slot depending on season",
      "Can only be purchased inside the park at the main photo desk on the day of visit (limited daily quantity)",
    ],
    bestFor: "Peak season visitors who purchased general tickets and want to reduce queue times on busy days.",
  },
  {
    id: "vip-cabana",
    name: "VIP Cabana (Up to 4 Guests)",
    priceAdult: "€510.00 – €550.00 / cabana",
    priceChild: "Included in cabana cap",
    summary: "Private Thai-style wooden cabana for 4 people with plush sofas, TV, fan, mini-bar, unlimited food/drinks, and Fast Pass wristbands.",
    includes: [
      "Admission for up to 4 guests",
      "Private shaded cabana with sun loungers on Siam Beach",
      "All-Inclusive food and beverage service all day",
      "Fast Pass wristbands for all 4 occupants",
      "Private locker, towels, and mini-fridge with drinks",
    ],
    bestFor: "Families or small groups seeking privacy, luxury, and maximum relaxation.",
  },
  {
    id: "vip-villa",
    name: "VIP House & Villa (Up to 6–8 Guests)",
    priceAdult: "€820.00 – €1,200.00 / unit",
    priceChild: "Included in villa cap",
    summary: "Exclusive private luxury house or villa equipped with a private outdoor hydromassage jacuzzi, dining terrace, shower, and dedicated VIP host.",
    includes: [
      "Admission for 6 to 8 guests",
      "Private outdoor hot tub / jacuzzi overlooking the wave pool",
      "All-Inclusive dining, cocktails, and premium beverages",
      "Unlimited Fast Pass wristbands for all occupants",
      "Private bathroom, shower, television, and hammocks",
    ],
    bestFor: "Celebrations, large families, and luxury VIP groups wanting the finest water park experience in Europe.",
  },
  {
    id: "resident",
    name: "Canary Islands Resident Rate",
    priceAdult: "€21.00 – €23.00",
    priceChild: "€15.00 – €17.00",
    summary: "Discounted admission for official residents of the Canary Islands upon presenting a valid DNI/NIE and empadronamiento certificate.",
    includes: [
      "Full standard 1-day park admission",
      "Available to Spanish and EU citizens officially registered as Canary residents",
      "ID must be presented at the ticket gates for each visitor",
    ],
    bestFor: "Local Canary Island residents and expats living in Tenerife.",
  },
];

const SEASONAL_HOURS = [
  { label: "Summer Season (May 1 – Oct 31)", hours: "10:00 AM – 6:00 PM", season: "Peak summer hours with daily wave pool and full restaurant services." },
  { label: "Winter Season (Nov 1 – Apr 30)", hours: "10:00 AM – 5:00 PM", season: "Winter schedule. All water is heated to 24–25°C throughout the park." },
];

const HOLIDAY_NOTE =
  "Siam Park is open 365 days a year (including weekends and public holidays), but is widely reported to close on Christmas Day (Dec 25). Special night sessions (Siam Night) run on selected July and August weekends from 8:00 PM to 12:00 midnight.";

const RIDES = [
  {
    id: "tower-of-power", name: "Tower of Power", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.40 m (4 ft 7 in)", ageRecommendation: "14+ years",
    description: "The park's flagship attraction. A heart-stopping 28-meter (92 ft) near-vertical drop reaching speeds of up to 80 km/h (50 mph), shooting you through a transparent acrylic tunnel surrounded by a shark and manta ray aquarium.",
    highlights: ["28-meter near-vertical slide", "Speeds up to 80 km/h", "Passes through a 360° shark aquarium"],
    rules: "Strict single rider only. No jewelry, eyewear, or loose items. Arms and legs must remain crossed throughout the descent.",
  },
  {
    id: "singha", name: "Singha", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)", ageRecommendation: "8+ years",
    description: "A hybrid water coaster combining high-speed slide curves with water-jet propulsion sections that shoot 3-person inline rafts uphill at speeds of 18 m/s (65 km/h) through 14 change-of-direction turns.",
    highlights: ["240-meter total track length", "Uphill water propulsion technology", "High-banked hairpin turns"],
    rules: "3 riders per raft (minimum 2 riders). Total raft weight must not exceed 250 kg.",
  },
  {
    id: "saifa", name: "Saifa", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)", ageRecommendation: "8+ years",
    description: "The park's newest double-lane dueling water coaster. Two parallel 306-meter tracks launch side-by-side rafts through high-speed drops, uphill boosters, and 360-degree helical turns overlooking the southern coastline.",
    highlights: ["Twin dueling racing tracks", "82-meter elevation drop total", "RocketBLAST water jet boosters"],
    rules: "2 riders per raft. Riders race side-by-side against the opposing lane.",
  },
  {
    id: "the-dragon", name: "The Dragon", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)", ageRecommendation: "8+ years",
    description: "A 4-person cloverleaf raft plunges down a steep enclosed tube into a colossal 20-meter wide open funnel, swinging back and forth with near-vertical zero-gravity sensation under the gaze of a giant Thai dragon.",
    highlights: ["Zero-gravity sensations in the funnel", "4-person cloverleaf tube", "Iconic giant dragon sculpture"],
    rules: "3 to 4 riders per raft. Balance of weight is checked by ride operators before dispatch.",
  },
  {
    id: "kinnaree", name: "Kinnaree", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)", ageRecommendation: "8+ years",
    description: "A 213-meter mega-slide that weaves through the hillside vegetation. Features an enclosed funnel, a high-speed drop, and a dramatic sweeping vertical wall turn before splashing down into the pool.",
    highlights: ["Combines funnel, drop, and vertical wall", "200+ meters of lush hillside track", "4-person round tube"],
    rules: "Requires 4 riders per raft. Maximum combined weight 320 kg.",
  },
  {
    id: "vulcano", name: "Vulcano", category: "Adrenaline / Thrill", intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)", ageRecommendation: "8+ years",
    description: "An enclosed 4-person raft ride that drops into complete pitch-black darkness inside an artificial volcano crater, featuring synchronized laser lights and volcanic rumbling sound effects before exiting.",
    highlights: ["Pitch-black enclosed tunnel drops", "Laser and light show inside crater", "Sensory audio-visual experience"],
    rules: "4 riders per raft. Not recommended for visitors sensitive to flashing strobe lights or complete darkness.",
  },
  {
    id: "mekong-rapids", name: "Mekong Rapids", category: "Adrenaline / Thrill", intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)", ageRecommendation: "6+ years",
    description: "A classic fast-paced white-water rafting simulation. Family groups ride a circular 4-to-5 person raft down twisting outdoor rapids and sudden drop pools.",
    highlights: ["High-speed white-water river simulation", "Wide open air family raft", "Scenic hillside descent"],
    rules: "Children under 1.40 m must wear a life jacket and be accompanied by an adult.",
  },
  {
    id: "patong-rapids", name: "Patong Rapids", category: "Adrenaline / Thrill", intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)", ageRecommendation: "6+ years",
    description: "A multi-person family raft slide featuring alternating sections of complete darkness and illuminated open-air curves, offering a gentler alternative to the extreme coasters.",
    highlights: ["Over 230 meters in length", "Mix of enclosed and open-air track", "Smooth family-friendly drop sections"],
    rules: "Raft accommodates 2 to 4 guests.",
  },
  {
    id: "naga-racer", name: "Naga Racer", category: "Family & Moderate", intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)", ageRecommendation: "6+ years",
    description: "A 6-lane head-first mat-racing slide. Grab a foam mat with handles and race alongside friends and family through an initial enclosed spiral tube before bursting into 6 parallel straight drop lanes.",
    highlights: ["6 parallel racing lanes", "Head-first mat riding experience", "Speed sensor timers at the finish line"],
    rules: "Single rider per lane. Must ride head-first on foam mat holding both handles.",
  },
  {
    id: "jungle-snakes", name: "Jungle Snakes", category: "Family & Moderate", intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in) or 1.25 m depending on tube", ageRecommendation: "6+ years",
    description: "A collection of 4 individual twisting body and tube slides named Boa, Python, Viper, and Cobra. Each slide winds through tropical flora with differing speeds, turns, and covered sections.",
    highlights: ["4 distinct slide layouts", "Both single and double-ring options", "Shaded rainforest canopy surrounds"],
    rules: "Single or double inflatable rings depending on the chosen snake route.",
  },
  {
    id: "wave-palace", name: "The Wave Palace (Wave Pool)", category: "Family & Moderate", intensity: "Medium",
    minHeight: "No minimum (Children must be supervised)",
    description: "The centerpiece of Siam Park. An immense artificial wave pool that generates clean rolling waves up to 3 to 4 meters high (the largest in any European water park), gently lapping onto a 330-meter white sand beach.",
    highlights: ["Waves up to 3–4 meters on schedule", "Heated turquoise water (24–25°C)", "Gentle shallow beach entry for wading"],
    rules: "A loud siren sounds prior to wave activation. Deep water is restricted to competent swimmers. Lifejackets recommended for small children.",
  },
  {
    id: "mai-thai-river", name: "Mai Thai River (Lazy River)", category: "Relax & Leisure", intensity: "Relaxed",
    minHeight: "No minimum (Under 1.10m must wear lifejacket)",
    description: "A 1-kilometer lazy river winding through cascading waterfalls, lush botanical gardens, and tropical rock formations. Features a unique water-lift conveyor belt where you can choose between a relaxing river loop or an elevated slide descent through an aquarium.",
    highlights: ["Over 1,000 meters in length", "Elevated rapids section with slide exit", "Slow and fast lane options"],
    rules: "Single or double ring tubes provided at entry points. Small children must wear complimentary flotation vests.",
  },
  {
    id: "siam-beach", name: "Siam Beach", category: "Relax & Leisure", intensity: "Relaxed", minHeight: "No minimum",
    description: "A tropical oasis featuring natural imported golden sand, hundreds of complimentary sun loungers, thatched umbrellas, and beachside bar services overlooking the Wave Palace.",
    highlights: ["Free sunbeds and shade umbrellas", "Beach Club restaurant and cocktail bar nearby", "Gentle sunbathing atmosphere"],
    rules: "Loungers are available on a first-come, first-served basis.",
  },
  {
    id: "sea-lion-island", name: "Sea Lion Island", category: "Relax & Leisure", intensity: "Relaxed", minHeight: "No minimum",
    description: "Located near the entrance bridges, this naturalistic rocky pool is home to active South American sea lions swimming, basking, and diving throughout the day.",
    highlights: ["Live marine animal observation", "Viewing bridges directly overhead", "Great photo spot upon entry"],
    rules: "Viewing only. Feeding or touching animals is strictly prohibited.",
  },
  {
    id: "floating-market", name: "The Floating Market", category: "Relax & Leisure", intensity: "Relaxed", minHeight: "No minimum",
    description: "An authentic recreation of a Thai floating village built on wooden stilts over a tranquil lake. Houses retail shops, snack kiosks, beachwear boutiques, and a natural fish spa.",
    highlights: ["Traditional Thai teak wood architecture", "Boutique gift shops and snacks", "Garra rufa fish spa therapy"],
    rules: "Walking plaza and shopping area accessible to all guests.",
  },
  {
    id: "the-lost-city", name: "The Lost City (Kids Water Fortress)", category: "Kids & Toddlers", intensity: "Low",
    minHeight: "Designed for children up to 12 years",
    description: "A massive interactive water fortress featuring 15 mini slides, swinging rope bridges, climbing cargo nets, water cannons, fountains, and a giant tipping bucket that soaks the courtyard every few minutes.",
    highlights: ["15 kid-friendly water slides", "Dedicated zero-depth splash zone for infants", "Continuous interactive water features"],
    rules: "Adults are permitted to accompany children. Taller slides inside the structure have a 1.25m maximum limit.",
  },
  {
    id: "sawasdee", name: "Sawasdee", category: "Kids & Toddlers", intensity: "Low",
    minHeight: "Designed for younger kids",
    description: "A dedicated mini-thrill zone offering scaled-down junior versions of Siam Park's famous adult slides, including a mini Dragon slide and 4 twisting chutes designed for children not yet tall enough for the main coaster rides.",
    highlights: ["Mini Dragon slide for junior thrill-seekers", "4 parallel beginner slides", "Shallow landing pools"],
    rules: "Intended for children under 1.40 m. Adult supervision required.",
  },
  {
    id: "coco-beach", name: "Coco Beach", category: "Kids & Toddlers", intensity: "Relaxed", minHeight: "No minimum",
    description: "A secondary family-friendly beach area featuring white sand and a dedicated gentle wave pool with smaller 0.5-meter waves perfectly calibrated for young children and nervous swimmers.",
    highlights: ["Gentle mini wave pool", "Shaded family loungers and restaurant", "Less crowded than the main Siam Beach"],
    rules: "Ideal safe swimming area for toddlers and younger children.",
  },
];

const DINING = [
  {
    name: "The Beach Club", type: "Buffet & Grill Restaurant", location: "Directly overlooking Siam Beach and Wave Palace",
    description: "The park's main dining hub with open-air terrace seating. Offers hot buffet choices, grilled burgers, roast chicken, hot dogs, pasta, salad bar, and kids' meal boxes.",
    popularItems: ["Grilled Cheeseburger & Fries", "Roast Chicken Platter", "Fresh Mediterranean Salad", "Kids Chicken Nuggets Meal"],
  },
  {
    name: "Thai House", type: "Asian & Thai Specialties", location: "Near the park entrance and Sea Lion Island",
    description: "Traditional wooden Thai architecture serving authentic Southeast Asian street foods, wok noodles, and mild curries alongside international snacks.",
    popularItems: ["Pad Thai Wok Noodles", "Chicken Yellow Curry", "Vegetable Spring Rolls", "Thai Jasmine Rice Bowls"],
  },
  {
    name: "Sweet Siam", type: "Dessert & Coffee Parlor", location: "The Floating Market",
    description: "Specializes in sweet snacks, freshly made Belgian waffles, crepes, artisanal Italian ice creams, sorbets, and barista coffee.",
    popularItems: ["Nutella & Banana Waffles", "Artisanal Gelato Scoops", "Fresh Fruit Smoothies", "Iced Espresso"],
  },
  {
    name: "Tea House & Bar", type: "Tea Salon & Snack Bar", location: "Adjacent to the Floating Market",
    description: "A tranquil setting over the lake serving specialty teas, coffees, sandwiches, fresh pastries, and light sandwiches.",
    popularItems: ["Selection of Herbal & Asian Teas", "Fresh Baguettes & Sandwiches", "Croissants & Pastries"],
  },
  {
    name: "Siam Beach Bar & Coco Bar", type: "Tropical Cocktail & Beverage Bar", location: "Siam Beach & Coco Beach",
    description: "Cocktail huts serving chilled Spanish beers (Dorada), sangria, piña coladas, mojitos, mocktails, soft drinks, and ice creams right by the sun loungers.",
    popularItems: ["Fresh Mint Mojito", "Tropical Piña Colada", "Chilled Canarian Dorada Beer", "Frozen Slushies"],
  },
];

const FACILITY_SERVICES = [
  { title: "Lockers & Secure Storage", details: "Available in Small (€5/day) and Large (€7/day) sizes. A refundable €5 cash deposit or card hold is required for the digital RFID key wristband." },
  { title: "Towel Rental", details: "Towels are available for hire near the main entrance lockers for €5 per day plus a €5 refundable deposit upon return." },
  { title: "Wetsuit Rental", details: "Shorty neoprene wetsuits are available for €5/day in the winter months (November to March) for guests sensitive to cooler breezes." },
  { title: "Free Sun Loungers & Lifejackets", details: "Hundreds of sunbeds across Siam Beach and Coco Beach are included free with admission. Flotation vests for children are provided free of charge at all ride stations." },
  { title: "Medical & First Aid Center", details: "A fully staffed medical center with certified emergency medical personnel and lifeguards is located near the Wave Palace beach area." },
  { title: "Baby Changing & Stroller Facilities", details: "All main restroom blocks feature infant changing stations. Umbrella strollers can be brought into the park, though some hillside pathways have stairs where ramps must be followed." },
];

const RULES = {
  outsideFood: "Siam Park strictly prohibits bringing commercial outside food, fast food, coolers, or alcoholic beverages into the park. Baby food, baby milk, small fruit snacks, and items required for certified medical/dietary conditions (e.g., celiac/diabetes) are permitted. Bags are routinely checked by security personnel at the entrance turnstiles.",
  swimwear: "Only standard lycra or nylon swimwear (bikinis, swimsuits, boardshorts, rashguards) is permitted on rides. Swimwear with exposed metal zips, rivets, buttons, or hard plastic buckles is forbidden to protect slide surfaces. Cotton T-shirts and denim shorts are not permitted on high-speed slides.",
  footwear: "Water shoes, neoprene booties, and aqua socks with soft rubber soles are permitted and encouraged on all water slides. Flip-flops and sandals cannot be worn on steep drop slides and should be left in shoe cubbies at slide entrances.",
  cameras: "GoPro and action cameras are allowed on tube and raft rides provided they are securely fastened via an approved chest harness or head strap. Handheld selfie sticks and loose phones are strictly prohibited on high-speed slides.",
  heightChecks: "Height measurements are strictly enforced by ride staff using official measuring sticks. Children must meet height limits with bare feet or standard water socks.",
};

const HOTELS = [
  {
    name: "GF Gran Costa Adeje", category: "Luxury 5-Star", distance: "5-minute drive / 2.2 km",
    description: "A premier 5-star resort featuring large swimming pools, rooftop solarium, luxury wellness spa, mini-golf, and upscale dining, located close to Playa del Duque.",
    features: ["Multiple heated swimming pools", "Luxury spa & wellness circuit", "Kids mini-club & family rooms"],
  },
  {
    name: "Hotel Jardín Tropical", category: "Luxury 5-Star", distance: "15-minute walk / 1.2 km",
    description: "An iconic Moorish-style resort overlooking Puerto Colón marina with cliffside saltwater pools, lush subtropical gardens, and sunset ocean views.",
    features: ["Cliffside saltwater lagoon", "Direct access to beach boardwalk", "Fine dining restaurants"],
  },
  {
    name: "Iberostar Bouganville Playa", category: "Family Resort 4-Star", distance: "10-minute walk / 800 meters",
    description: "A family-favorite 4-star hotel situated very close to Siam Park and San Eugenio beach, equipped with a Star Camp kids' activity program and water splash pool.",
    features: ["Aquafun kids splash park", "All-inclusive board options", "Walking distance to Siam Park"],
  },
  {
    name: "H10 Conquistador", category: "Family Resort 4-Star", distance: "5-minute shuttle / 2.0 km",
    description: "Located right on the Playa de las Américas seafront promenade with expansive lagoon pools, multiple themed restaurants (Italian, Teppanyaki, Steakhouse), and Despacio spa.",
    features: ["Oceanfront promenade location", "Thalasso spa center", "Close to free shuttle bus pickup"],
  },
  {
    name: "Vanilla Garden Boutique Hotel", category: "Adults Only", distance: "12-minute walk / 950 meters",
    description: "A stylish, tranquil adults-only boutique hotel featuring modern minimalist rooms, a heated pool with Bali sunbeds, French bistro dining, and evening lounge music.",
    features: ["Adults-only relaxed atmosphere", "Heated pool with daybeds", "Modern bohemian design"],
  },
  {
    name: "Sol Arona Tenerife", category: "Great Value 3/4-Star", distance: "Free shuttle bus stops directly outside",
    description: "A very popular, budget-friendly family hotel in Los Cristianos with large outdoor pools, children's play area, and an official Siam Park shuttle stop at the door.",
    features: ["Direct free shuttle bus pickup", "All-inclusive packages", "Short walk to Los Cristianos beach"],
  },
];

const SHUTTLE_STOPS = [
  { area: "Los Cristianos", location: "CC Pasarela (Shopping Center)", notes: "Main pickup point in southern Los Cristianos, near the port & harbor." },
  { area: "Los Cristianos", location: "Hotel Sol Arona Tenerife", notes: "Bus stop located directly in front of the hotel entrance on Av. Juan Carlos I." },
  { area: "Playa de las Américas", location: "CC Presidente (Shopping Center)", notes: "Central pickup along the Golden Mile (Av. Las Américas)." },
  { area: "Playa de las Américas", location: "Hotel Best Tenerife", notes: "Bus stop adjacent to the hotel roundabout on C. Antonio Dominguez Alfonso." },
  { area: "Playa de las Américas", location: "CC Llanos de Troya", notes: "Convenient stop for guests staying near Troya Beach and Veronica's strip." },
  { area: "Costa Adeje", location: "CC El Duque (Shopping Plaza)", notes: "Serves luxury hotels in the northern El Duque beachfront zone." },
  { area: "Costa Adeje", location: "CC Fañabé Plaza", notes: "Pickup point in front of Fañabé commercial center on Av. de Bruselas." },
  { area: "Costa Adeje", location: "Hotel Ocean Park (San Eugenio)", notes: "Stops along the main avenue near Puerto Colón marina." },
];

const BUS_ROUTES = [
  { number: "Line 111 / 711", origin: "Santa Cruz / Airport South (TFS)", destination: "Costa Adeje Bus Station", frequency: "Every 20–30 mins", notes: "Direct express route connecting the capital, Tenerife South Airport, and Costa Adeje." },
  { number: "Line 473 / 477", origin: "Los Gigantes / Callao Salvaje", destination: "Costa Adeje Bus Station", frequency: "Every 30 mins", notes: "Ideal for visitors staying in western coastal towns (Alcalá, Playa San Juan, Puerto de Santiago)." },
  { number: "Line 467", origin: "Costa del Silencio / Las Galletas", destination: "La Caleta (via Costa Adeje)", frequency: "Every 20 mins", notes: "Connects south-eastern resort towns directly through Los Cristianos and Las Américas." },
  { number: "Line 343", origin: "Puerto de la Cruz / Airport North (TFN)", destination: "Costa Adeje Bus Station", frequency: "4 times daily", notes: "Direct cross-island express connecting North Tenerife with Costa Adeje." },
];

const PARKING = {
  fee: "€5.00 flat daily rate",
  capacity: "Over 500 vehicle spaces plus dedicated coach bays",
  disabledParking: "Designated accessible bays located immediately opposite the main ticket turnstiles",
  operatingHours: "Opens at 9:15 AM and closes 30 minutes after park closure",
  evCharging: "Limited EV charging points available at neighboring Siam Mall",
};

const TIPS = [
  { icon: "👕", title: "What to Wear", body: "Swimwear under comfortable clothes, plus water-friendly sandals — park surfaces get wet and some paths are uneven underfoot." },
  { icon: "☀️", title: "Sun Protection", body: "Shade is limited around the pools. Reef-safe sunscreen, a hat, and sunglasses make a real difference over a full day outdoors." },
  { icon: "🔒", title: "Lockers & Towels", body: "Lockers are available to rent inside the park. Bring your own towel if you'd rather not pay to rent one on-site." },
  { icon: "♿", title: "Accessibility", body: "Large water parks built into hillside terrain can involve slopes and stairs between zones — if mobility is a concern, it's worth checking current accessibility details directly with the park before you go." },
  { icon: "🍽️", title: "Dining On-Site", body: "Multiple restaurants and snack bars are spread throughout the park, from quick bites to sit-down meals — no need to leave for lunch." },
  { icon: "📸", title: "Photography", body: "A waterproof phone pouch or action camera is worth bringing if you want photos on the slides and in the wave pool." },
];

const FAQS = [
  { question: "What are the opening hours of Siam Park?", answer: "Siam Park is open 365 days a year from 10:00 AM daily. In the summer season (May 1 to October 31), closing time is 6:00 PM. In the winter season (November 1 to April 30), closing time is 5:00 PM. The park is widely reported to close on Christmas Day (December 25).", category: "Planning & Practicalities" },
  { question: "Is the water heated at Siam Park?", answer: "Yes. All water throughout Siam Park's slides, pools, and lazy river is heated to a consistent 24°C to 25°C (75°F–77°F) year-round using the park's eco-efficient thermal system, making winter visits very pleasant.", category: "Planning & Practicalities" },
  { question: "How much does a Siam Park admission ticket cost?", answer: "Standard 1-day adult admission (age 12+) is approximately €42–€45, and child admission (age 3–11) is approximately €30–€32. Infants under 3 years enter free. Canary Islands residents receive a substantial local discount (~50% off) upon presenting valid government ID and empadronamiento.", category: "Tickets & Pricing" },
  { question: "What is the Twin Ticket with Loro Parque?", answer: "The Twin Ticket bundles 1 full day at Siam Park in Costa Adeje with 1 full day at Loro Parque zoo in Puerto de la Cruz. It costs around €74–€76 for adults and €53–€55 for children, saving about €12–€15 compared to purchasing separate admissions. You have up to 15 days from your first park visit to visit the second park.", category: "Tickets & Pricing" },
  { question: "How does the Fast Pass work and is it worth it?", answer: "A Fast Pass wristband allows you one priority skip-the-line access per participating major ride (excluding the Tower of Power). It costs approximately €15–€28 and can only be purchased inside the park on the morning of your visit from the photo desk. Because quantities are strictly limited daily, it is highly recommended during peak summer months (July–August) and European school holidays.", category: "Tickets & Pricing" },
  { question: "How do I ride the free Siam Park shuttle bus?", answer: "Siam Park operates dedicated free double-decker shuttle buses running approximately every 30 minutes from 9:30 AM across major pickup points in Los Cristianos (CC Pasarela, Sol Arona), Playa de las Américas (CC Presidente, Best Tenerife, Llanos de Troya), and Costa Adeje (CC El Duque, Fañabé Plaza, Ocean Park). No prior booking is required for these local shuttles.", category: "Planning & Practicalities" },
  { question: "What are the height and age restrictions on major rides?", answer: "The Tower of Power has a strict minimum height requirement of 1.40 m (4 ft 7 in) and an age guideline of 14+. High-speed raft coasters like Singha, Saifa, The Dragon, Kinnaree, and Vulcano require a minimum height of 1.25 m (4 ft 1 in). Moderate slides like Mekong Rapids and Naga Racer require 1.10 m (3 ft 7 in). Children's play areas (The Lost City, Sawasdee, Coco Beach) are designed specifically for young kids and toddlers.", category: "Rides & Restrictions" },
  { question: "Can I bring my own food and drinks into Siam Park?", answer: "Commercial outside food, take-away fast food, coolers, and alcoholic beverages are strictly prohibited. Small baby food, formula, small fresh fruit, and food for certified medical/dietary requirements (e.g. celiac or diabetes) are permitted. Bags are inspected by security at the entrance turnstiles.", category: "Food & Facilities" },
  { question: "How much are lockers and towels to rent?", answer: "Lockers are available in Small (€5/day) and Large (€7/day) sizes, with a refundable €5 deposit for the electronic wristband. Towels can be rented for €5/day plus a €5 refundable deposit. We recommend bringing your own microfiber towel to avoid rental fees.", category: "Food & Facilities" },
  { question: "What footwear and clothing are permitted on the slides?", answer: "Standard swimwear is required. Swimsuits with exposed metal buckles, zippers, or hard buttons are not permitted on slides. Water shoes and neoprene aqua socks are permitted and highly recommended on all slides. Flip-flops and sandals can be worn on paths but must be left in shoe cubbies at the start of steep slides.", category: "Rides & Restrictions" },
  { question: "Can I use a GoPro or action camera on the rides?", answer: "Yes, action cameras (like GoPro) are permitted on most tube and raft slides if securely attached to a body chest harness or head strap. Handheld selfie sticks, loose mobile phones, and loose cameras are prohibited on high-speed drop rides for safety reasons.", category: "Rides & Restrictions" },
  { question: "What is the best day of the week to visit Siam Park?", answer: "Tuesdays, Wednesdays, and Thursdays typically see fewer crowds than weekends. In addition, Mondays and Fridays are common hotel check-in/travel days for European package holidays, making mid-week days the best time for shorter queue times.", category: "Planning & Practicalities" },
  { question: "What is Siam Night?", answer: "Siam Night is a special seasonal evening event running on selected Friday and Saturday nights in July and August from 8:00 PM to midnight. The park is illuminated with neon lights, live DJ music, and illuminated water slides open under the stars with an adult/teen party atmosphere (separate ticket required).", category: "Planning & Practicalities" },
  { question: "Is Siam Park accessible for wheelchair users and guests with limited mobility?", answer: "Yes. The lower sections of the park, including the main entrance, Floating Market, Siam Beach, and restaurants, have ramped pathways and elevator access to the beach. Accessible restrooms and dedicated disabled parking bays are available. Due to the natural hillside terrain, some upper slides involve stairs and steep slopes.", category: "Food & Facilities" },
  { question: "How much is parking at Siam Park?", answer: "On-site parking is available for a flat daily rate of €5.00 per vehicle. The parking lot opens at 9:15 AM and has over 500 vehicle spots. During peak summer months, arriving before 10:00 AM is recommended as the lot can fill up quickly.", category: "Planning & Practicalities" },
  { question: "Is this website affiliated with Siam Park?", answer: "No. This is an independent, non-commercial traveler information guide created to help visitors plan their trip with accurate, unbiased details. We do not sell tickets or process bookings. Official tickets and live announcements are available on siampark.net.", category: "Planning & Practicalities" },
];

const HOMEPAGE = {
  hero: {
    badge: "Comprehensive Visitor Guide",
    location: "Costa Adeje, Tenerife, Canary Islands",
    title: "Siam Park Tenerife: The Complete Visitor Guide",
    description: "Your independent, all-in-one resource for planning a visit to Siam Park in Tenerife. Find complete information on all 16+ water slides, seasonal operating hours, ticket pricing tiers, height/weight restrictions, free shuttle bus stops, on-site food and locker policies, and practical tips.",
    footerNote: "This is a 100% free informational guide for travelers. We do not sell tickets or take commissions.",
    imageKey: "homeHero",
    imageCaption: "Siam Park grounds & attractions, Costa Adeje, South Tenerife",
  },
  stats: [
    { value: "Costa Adeje", label: "Tenerife, Spain" },
    { value: "10:00 AM", label: "Opens Daily 365 Days" },
    { value: "18.5 ha", label: "Park Grounds (46 Acres)" },
    { value: "24–25°C", label: "Heated Water Year-Round" },
  ],
  hoursSection: {
    heading: "Operating Hours & Seasonal Schedule",
    subheading: "Siam Park is open 365 days a year. All pools and water rides are heated to 24–25°C.",
    locationParagraph: "Siam Park is located in Costa Adeje in sunny southern Tenerife, known for having over 300 days of sunshine per year. The park is situated immediately off the TF-1 motorway (Exits 73 and 74).",
    highlights: [
      "Heated Water: All water is continuously heated to 24–25°C (75–77°F) year-round.",
      "Airport Proximity: 18 km (15–20 minutes) from Tenerife South Airport (TFS).",
      "Best Days to Visit: Tuesdays, Wednesdays, and Thursdays typically have the shortest queues.",
    ],
  },
  ticketsSection: {
    heading: "Ticket Pricing Reference & Admission Tiers",
    subheading: "Overview of 1-day standard tickets, Twin Tickets (with Loro Parque), Premium packages, Fast Passes, and VIP Cabanas.",
    ctaHeading: "Official Ticket Verification",
    ctaBody: "To check real-time availability, purchase official admission tickets directly, or reserve VIP cabanas, visit the operator's official portal.",
  },
  ridesSection: {
    heading: "Rides, Slides & Attractions Overview",
    subheading: "16+ world-class water attractions ranging from adrenaline mega-slides to relaxing lagoons.",
  },
  shuttlesSection: {
    heading: "Free Shuttle Bus Service & Getting There",
    subheading: "Siam Park provides complimentary double-decker bus transport across major southern Tenerife resort towns.",
    otherOptions: [
      { label: "Public Bus (TITSA)", body: "Lines 111, 473, 467, 711 terminate at Costa Adeje Bus Station (5-min walk)." },
      { label: "Driving & Parking", body: "Direct off TF-1 Highway exit 73/74. On-site secure parking is €5.00/day." },
      { label: "Taxis", body: "Metered taxis from Playa de las Américas / Los Cristianos cost ~€8–€12." },
    ],
    gpsAddress: "Av. Siam, s/n, 38660 Costa Adeje, Santa Cruz de Tenerife.",
  },
  facilitiesSection: {
    heading: "Facilities, Dining & Visitor Rules",
    subheading: "Essential knowledge regarding locker hire, outside food regulations, swimwear, and accessibility.",
  },
  tipsSection: {
    heading: "Practical Advice for a Smoother Visit",
    subheading: "Tried-and-tested advice to avoid long queues, protect your belongings, and stay sun-safe.",
  },
  faqSection: {
    heading: "Frequently Asked Questions",
    subheading: "Answers to the top 16 questions asked by travelers planning a visit.",
  },
  independentNotice: {
    heading: "Independent Traveler Reference",
    body: "This guide is created independently to provide clear, accurate, and unbiased information for tourists visiting Tenerife. To verify live park announcements, current ride maintenance, or to purchase official entry, please visit the park's official portal.",
  },
  guideLinksHeading: "Guide Chapters & Detailed Articles",
  metaTitleSuffix: "— Full Travel Guide: Rides, Tickets, Hours & Shuttles",
};

// Site-wide "chrome" copy shown via Header, Footer, and the Internal Link
// Grid ("Explore More of This Guide") on nearly every page — see
// lib/siteChrome.ts for the shape this mirrors.
const SITE_CHROME = {
  header: {
    tagline: "Visitor & Travel Guide",
    ticketsCtaLabel: "Official Tickets",
    ticketsCtaUrl: "https://tickets.siampark.net/",
    mobileQuickJumpHeading: "Quick Jump Sections",
    mobileQuickJumpLinks: [
      { emoji: "⏰", label: "Hours & Seasons", href: "/#hours" },
      { emoji: "🎟️", label: "Tickets & Prices", href: "/#tickets" },
      { emoji: "🎢", label: "Rides & Slides", href: "/#rides-overview" },
      { emoji: "🚌", label: "Free Shuttles", href: "/#shuttles" },
    ],
    mobileGuideHeading: "Guide Chapters",
    mobileBookCtaLabel: "Book Official Park Tickets",
  },
  footer: {
    smallTagline: "Unofficial Tenerife Guide",
    aboutBlurbSuffix: "An independent, non-commercial travel resource designed to help visitors explore Siam Park in Costa Adeje, Tenerife.",
    badgeText: "Independent Traveler Reference · 2026",
    navColumnHeading: "Guide Navigation",
    resourcesColumnHeading: "Help & Resources",
    officialPortalLabel: "Official Park Portal (siampark.net)",
    copyrightSuffix: "Unofficial visitor resource.",
    disclaimer:
      "Not affiliated with, endorsed by, or operated by Siam Park or Loro Parque S.A. All tickets and bookings must be completed on official channels.",
  },
  guideLinks: {
    heading: "Explore More of This Guide",
    subheading: "Comprehensive information chapters to help plan your perfect day.",
    ctaLabel: "Read Chapter Guide",
    links: [
      {
        href: "/inside-siam-park/",
        title: "Inside the Park",
        description: "Rides catalogue, Tower of Power, Mai Thai lazy river, Wave Palace, and cabanas.",
        icon: "🌊",
        tag: "Attractions",
      },
      {
        href: "/how-to-reach-siam-park/",
        title: "Getting There & Shuttles",
        description: "Free double-decker shuttle stops, TITSA public buses, driving routes, and parking.",
        icon: "🧭",
        tag: "Transport",
      },
      {
        href: "/traveler-information/",
        title: "Traveler Practicalities",
        description: "Operating hours, ticket categories, locker/towel rentals, and packing essentials.",
        icon: "🎒",
        tag: "Planning",
      },
      {
        href: "/about-siam-park/",
        title: "About Park & Thai Heritage",
        description: "Architectural history, authentic Thai royal design, and engineering hillside story.",
        icon: "🏛️",
        tag: "History",
      },
      {
        href: "/interesting-facts-about-siam-park/",
        title: "World Records & Facts",
        description: "3.3m artificial waves, desalination plants, green energy, and verified trivia.",
        icon: "📌",
        tag: "Records",
      },
      {
        href: "/things-to-do-near-siam-park/",
        title: "Things to Do Nearby",
        description: "Costa Adeje beaches, Siam Mall shopping, Aqualand, and Loro Parque twin trip.",
        icon: "🗺️",
        tag: "Explore",
      },
    ],
  },
};

const PAGE_ABOUT = {
  hero: {
    eyebrow: "History & Background",
    title: "The Story & Design of Siam Park",
    description: "From royal Thai permissions and hillside construction to custom desalination technology — here is the comprehensive background of Europe's premier water park.",
    imageKey: "thaiTemple",
    readTime: "6 min read",
  },
  sectionImageCaption: "Traditional Thai design traditions that guided the architectural styling of Siam Park.",
  bodyHtml: `<h2 id="origins">Origins &amp; Royal Opening</h2>
<p>Siam Park was officially inaugurated on <strong>15 September 2008</strong> in Costa Adeje, Tenerife, after nearly four years and over &euro;52 million of specialized construction. The park was conceived by German-Canarian entrepreneur <strong>Wolfgang Kiessling</strong>, founder of the famous Loro Parque animal sanctuary in Puerto de la Cruz.</p>
<p>The grand opening ceremony was presided over by <strong>Her Royal Highness Princess Maha Chakri Sirindhorn of Thailand</strong>, emphasizing the deep relationship and mutual respect established between the park's founders and the Thai royal family.</p>
<h2 id="thai-heritage">Thai Architectural Heritage</h2>
<p>Prior to breaking ground, the park's designers obtained formal authorization from the Thai monarchy to use the ancient name "Siam" and incorporate Thai artistic traditions. Out of respect for Thai cultural and religious sensibilities, the creators deliberately avoided copying actual Buddhist temples or royal palaces.</p>
<p>Instead, architect and designer <strong>Christoph Kiessling</strong> crafted an original interpretation of classic Thai village and pavilion architecture across more than <strong>25 authentic structures</strong>. Hand-carved teak woodwork, gilded roof ridges, ornamental dragons, and traditional floating village markets over water create one of the largest assemblies of Thai architectural motifs found outside Asia.</p>
<h2 id="engineering">Hillside Terrain Engineering</h2>
<p>Most commercial water parks worldwide are built on flat agricultural land, using exposed steel scaffolding and stair towers to support elevated slide platforms. In contrast, Siam Park was engineered directly into a <strong>35-degree natural volcanic hillside</strong>.</p>
<p>By molding the slides and raft tracks directly into the contours of the terrain, riders experience a lush, garden-immersed journey surrounded by imported tropical trees, palms, and natural volcanic rock formations rather than industrial metal girders. This natural elevation gradient also enabled the construction of the 1-kilometer Mai Thai River with its unique elevated rapids section.</p>
<h2 id="sustainability">Desalination &amp; Environmental Eco-Systems</h2>
<p>Due to Tenerife's volcanic island geography and limited natural fresh groundwater, Siam Park was engineered with a state-of-the-art <strong>closed-loop eco-water management system</strong>:</p>
<ul>
<li><strong>Seawater Desalination:</strong> The park pumps seawater directly from the Atlantic Ocean into its on-site reverse osmosis desalination plant, producing up to 1,800 cubic meters of fresh water daily.</li>
<li><strong>Thermal Heat Recovery:</strong> The water is heated to a consistent 24&deg;C&ndash;25&deg;C using natural gas and heat recovery systems, making year-round swimming comfortable.</li>
<li><strong>Botanical Recycling:</strong> After water completes its circulation and filtration in the rides, it is recycled through an on-site treatment plant to irrigate the thousands of tropical palms and botanical plants throughout the park grounds, ensuring zero water waste.</li>
</ul>
<h2 id="loro-parque-group">The Loro Parque Group</h2>
<p>Siam Park is part of the <strong>Loro Parque Group</strong> (comprising Loro Parque zoo, Siam Park, the Poema del Mar aquarium in Gran Canaria, and the Hotel Botanico in Puerto de la Cruz). The company has received numerous international certifications for animal welfare, biodiversity conservation, and environmental sustainability.</p>`,
  vitalStats: [
    { value: "2008", label: "Opening Year" },
    { value: "18.5 ha", label: "Park Grounds" },
    { value: "25+", label: "Thai Buildings" },
    { value: "28 m", label: "Tower of Power" },
  ],
  metaTitle: "About Siam Park: History, Thai Architecture & Eco-Engineering",
  metaDescription: "The comprehensive history of Siam Park Tenerife — royal Thai design heritage, construction into a natural hillside, owner Wolfgang Kiessling, and on-site eco-sustainability.",
};

const PAGE_CONTACT = {
  hero: {
    eyebrow: "Contact & Inquiries",
    title: "Get in Touch",
    description: "Questions, corrections, or feedback regarding this independent guide — we'd like to hear from you.",
    imageKey: "tropicalBeach",
  },
  cardHeading: "Email Inquiries",
  cardNote: "We aim to review submissions and reply within a few business days. If you are reporting an outdated price or broken link, please include the relevant page link.",
  quickAnswers: [
    { q: "Does this website sell park tickets or process bookings?", a: "No. This is an independent, non-commercial travel guide. We do not sell tickets, manage bookings, or collect payments. For tickets and official bookings, please visit siampark.net." },
    { q: "I have a question about an existing ticket purchase or refund.", a: "Please contact the official Siam Park customer support or the authorized third-party agency from which you bought your tickets. We do not have access to booking databases." },
    { q: "I noticed outdated information or want to suggest a correction.", a: "We welcome visitor feedback. Please email us with the specific page URL and the information that needs updating." },
  ],
  metaTitle: "Contact Us & Guide Inquiries",
  metaDescription: "Get in touch with corrections, feedback, or general questions regarding this Siam Park independent visitor guide.",
};

const PAGE_PRIVACY = {
  lastUpdated: "September 2026",
  bodyHtml: `<h2>Overview</h2>
<p>Siam Park Visitor Guide is a static informational website. It has no user accounts, no login system, no comment sections, and no e-commerce or booking functionality — there is no customer database or backend user management behind it. This policy explains what little data is involved in simply visiting the site.</p>
<h2>Information We Collect</h2>
<p>We do not operate contact forms, newsletter sign-ups, or payment processors that collect personal information directly. The Contact page provides a plain email address; any information you choose to send us by email is used only to respond to your message and is not shared with third parties or added to any marketing lists.</p>
<h2>Cookies &amp; Analytics</h2>
<p>This site does not set third-party tracking or behavioral advertising cookies. If we add privacy-conscious aggregated analytics in the future (to understand which guide chapters are helpful to readers), we will update this policy to describe what data is collected.</p>
<h2>Hosting &amp; Server Logs</h2>
<p>Like virtually all websites, our hosting infrastructure automatically processes standard technical connection data (such as IP address, user agent, and request timestamps) to maintain network security and ensure reliable content delivery. We do not use this data for profiling or advertising.</p>
<h2>External Links</h2>
<p>This guide links out to external websites — including Siam Park's official pages, transport authorities (TITSA), and travel resources — for convenience. We are not responsible for the content or privacy practices of external websites.</p>
<h2>Contact Us</h2>
<p>Questions about this policy? Email us at jrandrewclark@gmaill.com.</p>`,
  metaTitle: "Privacy Policy",
  metaDescription: "Privacy Policy for Siam Park Visitor Guide — what information this site does and does not collect.",
};

const PAGE_FACTS = {
  hero: {
    eyebrow: "Park Background",
    title: "14 Interesting Facts & Verified Records About Siam Park",
    description: "A closer look at Siam Park's design history, record-setting water attractions, environmental innovation, and fact-checks on common online claims.",
    imageKey: "thaiTemple",
    readTime: "7 min read",
  },
  sectionImageCaption: "Traditional Thai design traditions that guided the architectural styling of Siam Park.",
  bodyHtml: `<h2 id="origins">Origins &amp; Royal Opening</h2>
<ol>
<li><strong>Royal Thai Inauguration:</strong> Siam Park was officially inaugurated on 15 September 2008 in the presence of Her Royal Highness Princess Maha Chakri Sirindhorn of Thailand.</li>
<li><strong>Family-Owned Heritage:</strong> The park was founded and built by Wolfgang Kiessling and his son Christoph Kiessling, the visionaries behind the renowned Loro Parque sanctuary.</li>
<li><strong>Four Years of Hillside Sculpting:</strong> Construction required nearly four years to excavate, reinforce, and contour the natural 35-degree volcanic hillside in Costa Adeje.</li>
</ol>
<h2 id="design-records">Thai Architecture &amp; Design</h2>
<ol start="4">
<li><strong>Monarchy Approval:</strong> The park obtained royal permission from Thailand to use the historic name "Siam" and incorporate Thai architectural traditions, while respectfully avoiding the duplication of actual religious temples.</li>
<li><strong>25+ Authentic Thai Buildings:</strong> Siam Park features over 25 individual structures built in classic Thai architectural styles, representing one of the largest single collections of Thai-themed buildings outside Southeast Asia.</li>
<li><strong>The Floating Market:</strong> The central retail and dining village is built on wooden stilts over a naturalistic freshwater lake, replicating the traditional water markets of Bangkok.</li>
</ol>
<h2 id="ride-records">Ride Heights &amp; Wave Records</h2>
<ol start="7">
<li><strong>Tower of Power Shark Tunnel:</strong> The 28-meter (92 ft) near-vertical slide accelerates riders up to 80 km/h before passing through a submerged, transparent acrylic tube surrounded by live sharks and rays.</li>
<li><strong>World's Largest Artificial Waves:</strong> The Wave Palace wave pool produces clean rolling waves reaching up to 3 to 4 meters (10 to 13 feet) high, suitable for both recreational swimming and professional surfing events.</li>
<li><strong>The Longest Elevated Lazy River:</strong> The 1,000-meter Mai Thai River is one of the world's longest lazy rivers and incorporates a mechanical water conveyor that lifts rafts 8 meters above the ground to an elevated slide descent.</li>
<li><strong>Singha's High-Speed Water Jets:</strong> Singha uses specialized water-injection propulsion technology to propel 3-person rafts uphill at speeds exceeding 65 km/h across 14 changes of direction.</li>
</ol>
<h2 id="awards">Awards &amp; Recognition</h2>
<ol start="11">
<li><strong>TripAdvisor #1 Water Park in the World:</strong> Siam Park has repeatedly received TripAdvisor's Travellers' Choice "Best Water Park in the World" award for more than nine consecutive years.</li>
<li><strong>European Star Award:</strong> Awarded multiple times as Europe's Best Water Park by the leading international theme park industry body (Kirmes &amp; Park Revue).</li>
</ol>
<h2 id="sustainability">Environmental Technology</h2>
<ol start="13">
<li><strong>On-Site Desalination:</strong> The park pumps seawater directly from the Atlantic Ocean and desalinates up to 1,800 m&sup3; of fresh water daily using an eco-efficient reverse osmosis plant.</li>
<li><strong>100% Water Recycling:</strong> Water cycled out of the filtration systems is purified and reused exclusively to irrigate the thousands of tropical palms, bamboo, and exotic flora throughout the grounds.</li>
</ol>`,
  factCheckHeading: "Editorial Note on Common Marketing Claims",
  factCheckHtml: `<p>Several online sources claim that the golden sand on Siam Beach was imported directly from Thailand. Official park documents confirm that the sand is natural high-grade sand sourced from the Canary Islands. Similarly, while Siam Park has won numerous consumer choice awards, superlatives like "world's first green water park" represent marketing terminology rather than ISO-certified titles. As an independent travel guide, we provide these distinctions for accuracy.</p>`,
  metaTitle: "14 Interesting Facts & Record Claims About Siam Park, Tenerife",
  metaDescription: "The real facts and verified records behind Siam Park — Tower of Power shark tank, world's highest artificial waves, royal Thai inauguration, and marketing claim fact-checks.",
};

const PAGE_INSIDE = {
  hero: {
    eyebrow: "Attractions Directory",
    title: "Complete Guide to Siam Park Rides & Zones",
    description: "Every slide, coaster, pool, and family area inside the park — complete with height requirements, rider rules, and queue strategies.",
    imageKey: "insideAttractions",
    readTime: "8 min read",
  },
  overviewHtml: `<p>Siam Park is set across 18.5 hectares (46 acres) of natural hillside in Costa Adeje, Tenerife. The park's attractions are divided into four distinct categories: high-adrenaline speed slides and water coasters, moderate family raft rides, relaxing lagoons and beaches, and dedicated shallow-water playgrounds for younger children.</p>
<p>Because the park is built directly into a 35-degree natural slope, water slides follow the terrain rather than relying on scaffold towers. All pools and water rides are continuously heated to <strong>24&deg;C to 25&deg;C (75&deg;F to 77&deg;F)</strong> year-round.</p>`,
  restrictionsIntroHtml: `<p>Height limits are strictly checked at ride queue entrances. Children are measured barefoot or with flat water socks.</p>`,
  sectionIntros: {
    adrenaline: "These are Siam Park's flagship high-intensity attractions, designed for thrill-seekers and older children.",
    family: "These attractions are suited for groups, families, and riders looking for excitement without extreme vertical drops.",
    relax: "When you want to relax between high-speed slides, the park offers world-class leisure zones:",
    kids: "Siam Park provides extensive, dedicated aquatic playgrounds specifically designed for younger children and infants.",
  },
  relaxImageCaption: "The Mai Thai River lazy river weaving through the tropical hillside gardens.",
  amenitiesHtml: `<ul>
<li><strong>Changing Rooms &amp; Showers:</strong> Spacious locker houses equipped with hot showers, hair dryers, and changing cubicles.</li>
<li><strong>Locker Rentals:</strong> Small (&euro;5/day) and large (&euro;7/day) digital lockers activated with waterproof RFID wristbands (&euro;5 deposit).</li>
<li><strong>Sun Loungers:</strong> Over 1,000 sunbeds across Siam Beach and Coco Beach provided free of charge.</li>
<li><strong>Complimentary Lifejackets:</strong> Flotation vests in multiple sizes available free at all ride stations for kids and non-swimmers.</li>
</ul>`,
  strategyHtml: `<ul>
<li><strong>Head straight to Tower of Power, Singha, or Saifa at 10:00 AM opening.</strong> Lines are consistently shortest during the first 45 minutes of the morning.</li>
<li><strong>Visit the Wave Palace during the lunchtime lull (1:00 PM &ndash; 2:30 PM)</strong> when many visitors head to the restaurants.</li>
<li><strong>Wear water shoes.</strong> The paths cover significant elevation gains and can become hot under the midday sun.</li>
</ul>`,
  metaTitle: "Complete Siam Park Rides, Attractions & Height Restrictions Guide",
  metaDescription: "A complete breakdown of every ride, slide, and zone inside Siam Park Tenerife — height limits, weight rules, adrenaline coasters, wave pool, lazy river, and kids areas.",
};

const PAGE_HOW_TO_REACH = {
  hero: {
    eyebrow: "Transport & Directions",
    title: "How to Reach Siam Park",
    description: "Every way to travel to Siam Park in Costa Adeje — from the complimentary double-decker shuttle buses and public transit routes to driving directions, GPS coordinates, and parking.",
    imageKey: "coastalRoad",
    readTime: "6 min read",
  },
  introHtml: `<p>Siam Park is located in the Costa Adeje municipality on Tenerife's south coast, directly adjacent to the TF-1 motorway and within 5 to 10 minutes of major tourist resorts in Playa de las Américas and Los Cristianos.</p>`,
  shuttleIntroHtml: `<p>Siam Park operates its own dedicated fleet of branded double-decker shuttle buses offering <strong>100% free transportation</strong> for all park visitors staying in Los Cristianos, Playa de las Américas, and Costa Adeje.</p>
<ul>
<li><strong>Service Frequency:</strong> Operates daily approximately every 30 minutes between <strong>9:30 AM and 1:00 PM</strong>, with return shuttles departing the park from <strong>4:00 PM to 6:30 PM</strong> (depending on season).</li>
<li><strong>Booking:</strong> No ticket or advance reservation is required. Simply queue at the official pickup stop.</li>
</ul>`,
  publicBusIntroHtml: `<p>Tenerife's green public bus network (TITSA) offers modern, air-conditioned connections across the entire island. The nearest major hub is <strong>Estación de Guaguas de Costa Adeje</strong> (Costa Adeje Central Bus Station), located roughly 400 meters (a 5-minute walk) from Siam Park's entrance turnstiles.</p>`,
  drivingImageCaption: "The TF-1 coastal motorway connects Santa Cruz and the South Airport directly to Costa Adeje.",
  drivingHtml: `<p>If you are driving a rental car, access is fast and direct via the <strong>Autopista del Sur (TF-1)</strong> motorway:</p>
<ul>
<li><strong>Arriving from the South / Airport (TFS) / Los Cristianos:</strong> Take <strong>Exit 73 (San Eugenio / Siam)</strong> and follow the roundabouts towards Siam Park / Siam Mall.</li>
<li><strong>Arriving from the North / Santa Cruz / Puerto de la Cruz:</strong> Take <strong>Exit 74 (San Eugenio)</strong> and merge onto the service road leading directly to the park entry gates.</li>
<li><strong>GPS Coordinates:</strong> 28.0718&deg; N, 16.7262&deg; W (Address: <em>Avenida Siam, s/n, 38660 Costa Adeje</em>).</li>
</ul>`,
  parkingHtml: `<ul>
<li><strong>Daily Parking Fee:</strong> €5.00 flat daily rate.</li>
<li><strong>Capacity:</strong> Over 500 vehicle spaces plus dedicated coach bays.</li>
<li><strong>Accessible Bays:</strong> Designated accessible bays located immediately opposite the main ticket turnstiles.</li>
<li><strong>Hours of Operation:</strong> Opens at 9:15 AM and closes 30 minutes after park closure.</li>
</ul>`,
  taxiHtml: `<p>Official white metered taxis in Tenerife are regulated by local municipal tariffs. Taxi ranks are located right outside the Siam Park entrance archway and operate continuously.</p>
<ul>
<li>From <strong>Playa de las Américas / Los Cristianos:</strong> &euro;8.00 &ndash; &euro;12.00 (5&ndash;10 mins).</li>
<li>From <strong>Playa del Duque / La Caleta:</strong> &euro;10.00 &ndash; &euro;15.00 (10 mins).</li>
<li>From <strong>Los Gigantes / Puerto de Santiago:</strong> &euro;35.00 &ndash; &euro;45.00 (25 mins).</li>
</ul>`,
  airportHtml: `<ul>
<li><strong>Tenerife South Airport (Reina Sofía - TFS):</strong> 18 km away (~15&ndash;20 minutes drive). Direct via TF-1 Highway. Public bus line 111/711 or taxi (~&euro;40&ndash;&euro;50).</li>
<li><strong>Tenerife North Airport (Ciudad de La Laguna - TFN):</strong> 80 km away (~60&ndash;75 minutes drive). Direct via TF-1 or TITSA express line 343.</li>
</ul>`,
  tipsHtml: `<ul>
<li><strong>Arrive by 9:45 AM</strong> if parking in the on-site lot to secure spaces close to the ticket booths.</li>
<li>If taking the free shuttle back in the afternoon, board by 5:15 PM in winter or 6:15 PM in summer before the final departure rush.</li>
</ul>`,
  metaTitle: "How to Reach Siam Park: Free Shuttles, Public Buses, Driving & Parking",
  metaDescription: "Complete transport guide to Siam Park Tenerife — free shuttle bus timetables and pickup points in Los Cristianos and Las Américas, TITSA bus routes, driving directions, and parking details.",
};

const PAGE_THINGS_TO_DO = {
  hero: {
    eyebrow: "Local Surroundings",
    title: "Things to Do & Hotels Near Siam Park",
    description: "Explore the best attractions, beaches, shopping centers, and top-rated hotels within easy reach of Siam Park in Costa Adeje.",
    imageKey: "tropicalBeach",
    readTime: "6 min read",
  },
  imageCaption: "Costa Adeje beachfront and coastal resort strip in South Tenerife.",
  nearbyIntroHtml: `<p>Siam Park is situated right in the center of Costa Adeje, one of the most developed holiday resort corridors in the Canary Islands. Here is what is situated right on the park's doorstep:</p>`,
  nearbyAttractions: [
    { title: "Siam Mall", distance: "Directly Adjacent (5-minute walk)", body: "An open-air Thai-styled shopping, dining, and leisure complex located directly next to the water park. Houses over 70 international retail brands (Zara, Mango, H&M), a large HiperDino supermarket, cafes, and rooftop dining with sunset ocean views." },
    { title: "Playa del Duque & Playa de Fañabé", distance: "5–10 minute drive / taxi", body: "Two of Tenerife's cleanest and most luxurious golden sand beaches, lined with a wide promenade, sunbeds, beachside restaurants, and water sports." },
    { title: "Puerto Colón Marina", distance: "15-minute walk / 3-minute drive", body: "The primary harbor for whale and dolphin watching catamaran excursions, jet ski rentals, scuba diving, and yacht charters along the Adeje coastline." },
    { title: "Aqualand Costa Adeje", distance: "5-minute drive / 1.5 km away", body: "Tenerife's traditional family water park featuring dedicated toddler splash pools and daily educational dolphin shows." },
    { title: "Golf Costa Adeje", distance: "10-minute drive / 6 km away", body: "An acclaimed 27-hole championship golf course integrated into natural volcanic terraces with panoramic views of the Atlantic and La Gomera island." },
  ],
  siamMallHtml: `<p>Located right across the street from the park entrance, <strong>Siam Mall</strong> is open 365 days a year from 10:00 AM to 10:00 PM. It is the ideal place to grab dinner, buy sunscreen, or relax in air-conditioned cafes after a day on the slides. The mall also provides free underground parking and EV charging points.</p>`,
  hotelsIntroHtml: `<p>If you want to stay within walking distance or a short shuttle ride from Siam Park, these are the highest-rated accommodations in Costa Adeje and Playa de las Américas:</p>`,
  loroParqueHtml: `<p>Many visitors combine Siam Park with <strong>Loro Parque</strong> in northern Tenerife using the discounted <strong>Twin Ticket</strong>. Loro Parque is famous for its lush botanical gardens, dolphin and sea lion presentations, and world-leading parrot conservation center.</p>
<p>The two parks are approximately 75 km apart (a 60-to-75-minute drive across the island). The Twin Ticket gives you up to 15 days between visits, so you do not need to do them on consecutive days.</p>`,
  itineraryHtml: `<ul>
<li><strong>The Thrill &amp; Chill Day:</strong> Full day at Siam Park (10:00 AM &ndash; 4:30 PM), followed by sunset drinks and dinner at the open-air terraces of Siam Mall or Puerto Colón marina.</li>
<li><strong>The Family Beach &amp; Water Weekend:</strong> Day 1 at Siam Park, Day 2 enjoying water sports and swimming at Playa del Duque and a dolphin-watching catamaran cruise from Puerto Colón.</li>
</ul>`,
  metaTitle: "Things to Do Near Siam Park & Top Hotels in Costa Adeje",
  metaDescription: "Complete guide to attractions, beaches, shopping malls, and top-rated hotels near Siam Park in Costa Adeje and Playa de las Américas, Tenerife.",
};

const PAGE_TRAVELER = {
  hero: {
    eyebrow: "Traveler Practicalities",
    title: "Siam Park: Practical Visitor Guide",
    description: "Everything you need to know before stepping through the gates — locker rentals, on-site dining, outside food rules, safety regulations, accessibility, and packing advice.",
    imageKey: "kidsWaterPark",
    readTime: "7 min read",
  },
  hoursAdmissionHtml: `<p>Siam Park is open every single day of the year at <strong>10:00 AM</strong>. Closing time is <strong>6:00 PM</strong> in the summer season (May 1 to October 31) and <strong>5:00 PM</strong> in the winter season (November 1 to April 30).</p>
<ul>
<li><strong>Standard Entry:</strong> Grants full-day access to all 16+ slides, wave pool, lazy river, sun loungers, and lifejackets.</li>
<li><strong>Twin Ticket:</strong> Bundles Siam Park and Loro Parque zoo at a discounted combination price, valid for 15 days.</li>
<li><strong>Fast Pass Wristband:</strong> Sold only inside the park at the photo desk for ~&euro;15&ndash;&euro;28 on the morning of your visit, giving 1 priority access per participating ride.</li>
</ul>`,
  lockersIntroHtml: `<p>The park features automated electronic locker houses positioned near the entrance turnstiles and changing areas. Lockers use RFID silicone wristbands that you wear on slides.</p>`,
  lockerPricing: [
    { title: "Small Locker", price: "€5.00 / day", note: "Fits 1–2 small backpacks, shoes, wallets, and dry clothes. +€5 refundable deposit." },
    { title: "Large Locker", price: "€7.00 / day", note: "Ideal for family bags, towels, and bulkier gear. +€5 refundable deposit." },
    { title: "Towel Hire", price: "€5.00 / day", note: "Clean plush beach towel rental. +€5 refundable deposit on return." },
  ],
  wetsuitNoteHtml: `<p><strong>Wetsuits:</strong> During the winter months (November to March), shorty neoprene wetsuits are available to rent for &euro;5/day, which is useful on breezy afternoons.</p>`,
  diningIntroHtml: `<p>Siam Park features 5 primary dining and refreshment hubs spread across the grounds:</p>`,
  diningImageCaption: "The Beach Club and Siam Beach dining terraces.",
  outsideFoodExtraHtml: `<p>If you wish to eat outside food that does not qualify under the medical/infant exception, there are shaded picnic benches located just outside the main turnstiles. You can have your hand stamped for re-entry at the gate.</p>`,
  eyewearNote: "Sunglasses and prescription glasses must be secured with a tight sports strap or removed on thrill rides.",
  accessibilityHtml: `<p>Siam Park welcomes guests with disabilities and reduced mobility:</p>
<ul>
<li><strong>Wheelchair Access:</strong> Ramped pathways connect the main entrance, Floating Market, restaurant terraces, and Siam Beach. An elevator provides direct access to the beach level.</li>
<li><strong>Parking &amp; Restrooms:</strong> Dedicated disabled parking bays are located next to the ticket gates, and all major toilet facilities include accessible stalls.</li>
<li><strong>Terrain Considerations:</strong> Because the park is built on a natural hillside, the upper slides (Tower of Power, Singha, Saifa) require walking up stairways. Guests with mobility concerns are advised to consult guest services upon arrival for assistance.</li>
</ul>`,
  packingHtml: `<ul>
<li><strong>Fitted water shoes / neoprene socks</strong> (protects feet against hot paths and allowed on all rides).</li>
<li><strong>High-SPF water-resistant sunscreen</strong> (reapply frequently throughout the day).</li>
<li><strong>Waterproof phone pouch with lanyard</strong> (keeps your phone dry for photos).</li>
<li><strong>Microfiber towel</strong> (compact, quick-drying, and avoids on-site towel hire fees).</li>
<li><strong>Change of dry clothes and light fleece</strong> (for the evening ride home).</li>
</ul>`,
  bestTimeHtml: `<ul>
<li><strong>Best Days of the Week:</strong> Tuesday, Wednesday, and Thursday have the lightest crowds. Weekends and Mondays (package holiday check-in day) are busier.</li>
<li><strong>Best Time of Day:</strong> Arrive at 9:40 AM (20 minutes before gates open) and head immediately to the popular Tower of Power, Singha, or Saifa water coasters.</li>
<li><strong>Lunch Hour Lull:</strong> From 1:00 PM to 2:30 PM, slide lines noticeably decrease as crowds move to the restaurants. Use this window to hit major rides.</li>
</ul>`,
  metaTitle: "Siam Park Practical Traveler Guide: Lockers, Dining, Rules & Tips",
  metaDescription: "Essential practical guide for visiting Siam Park Tenerife — locker hire, towel rentals, dining venues, outside food rules, accessibility, packing list, and queue tips.",
};

async function main() {
  console.log("Setting up siam-informative admin panel database...\n");

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id INTEGER PRIMARY KEY DEFAULT 1,
      settings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      nav_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      images_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      homepage_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      tickets_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      seasonal_hours_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      holiday_note TEXT NOT NULL DEFAULT '',
      rides_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      dining_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      facility_services_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      rules_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      hotels_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      shuttle_stops_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      bus_routes_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      parking_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      tips_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      faqs_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      page_about_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_contact_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_privacy_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_facts_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_inside_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_how_to_reach_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_things_to_do_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      page_traveler_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      site_chrome_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      ticket_policy_notes_json JSONB NOT NULL DEFAULT '[]'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("✓ site_content table ready");

  // Safety net for databases where site_content already existed before
  // these columns were added — CREATE TABLE IF NOT EXISTS above won't
  // add columns to an already-created table.
  await sql`ALTER TABLE site_content ADD COLUMN IF NOT EXISTS site_chrome_json JSONB NOT NULL DEFAULT '{}'::jsonb`;
  await sql`ALTER TABLE site_content ADD COLUMN IF NOT EXISTS ticket_policy_notes_json JSONB NOT NULL DEFAULT '[]'::jsonb`;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_account (
      id INTEGER PRIMARY KEY DEFAULT 1,
      email TEXT NOT NULL DEFAULT '',
      password_hash TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
  console.log("✓ admin_account table ready");

  const existing = await sql`SELECT id FROM site_content WHERE id = 1`;
  if (existing.length && !RESEED) {
    console.log("\nsite_content row already exists (id=1) — skipping seed. Pass --reseed to overwrite with defaults.");
  } else {
    await sql`
      INSERT INTO site_content (
        id, settings_json, nav_json, images_json, homepage_json,
        tickets_json, seasonal_hours_json, holiday_note,
        rides_json, dining_json, facility_services_json, rules_json,
        hotels_json, shuttle_stops_json, bus_routes_json, parking_json,
        tips_json, faqs_json,
        page_about_json, page_contact_json, page_privacy_json, page_facts_json,
        page_inside_json, page_how_to_reach_json, page_things_to_do_json, page_traveler_json,
        site_chrome_json
      ) VALUES (
        1, ${JSON.stringify(SETTINGS)}::jsonb, ${JSON.stringify(NAV)}::jsonb, ${JSON.stringify(IMAGES)}::jsonb, ${JSON.stringify(HOMEPAGE)}::jsonb,
        ${JSON.stringify(TICKETS)}::jsonb, ${JSON.stringify(SEASONAL_HOURS)}::jsonb, ${HOLIDAY_NOTE},
        ${JSON.stringify(RIDES)}::jsonb, ${JSON.stringify(DINING)}::jsonb, ${JSON.stringify(FACILITY_SERVICES)}::jsonb, ${JSON.stringify(RULES)}::jsonb,
        ${JSON.stringify(HOTELS)}::jsonb, ${JSON.stringify(SHUTTLE_STOPS)}::jsonb, ${JSON.stringify(BUS_ROUTES)}::jsonb, ${JSON.stringify(PARKING)}::jsonb,
        ${JSON.stringify(TIPS)}::jsonb, ${JSON.stringify(FAQS)}::jsonb,
        ${JSON.stringify(PAGE_ABOUT)}::jsonb, ${JSON.stringify(PAGE_CONTACT)}::jsonb, ${JSON.stringify(PAGE_PRIVACY)}::jsonb, ${JSON.stringify(PAGE_FACTS)}::jsonb,
        ${JSON.stringify(PAGE_INSIDE)}::jsonb, ${JSON.stringify(PAGE_HOW_TO_REACH)}::jsonb, ${JSON.stringify(PAGE_THINGS_TO_DO)}::jsonb, ${JSON.stringify(PAGE_TRAVELER)}::jsonb,
        ${JSON.stringify(SITE_CHROME)}::jsonb
      )
      ON CONFLICT (id) DO UPDATE SET
        settings_json = EXCLUDED.settings_json,
        nav_json = EXCLUDED.nav_json,
        images_json = EXCLUDED.images_json,
        homepage_json = EXCLUDED.homepage_json,
        tickets_json = EXCLUDED.tickets_json,
        seasonal_hours_json = EXCLUDED.seasonal_hours_json,
        holiday_note = EXCLUDED.holiday_note,
        rides_json = EXCLUDED.rides_json,
        dining_json = EXCLUDED.dining_json,
        facility_services_json = EXCLUDED.facility_services_json,
        rules_json = EXCLUDED.rules_json,
        hotels_json = EXCLUDED.hotels_json,
        shuttle_stops_json = EXCLUDED.shuttle_stops_json,
        bus_routes_json = EXCLUDED.bus_routes_json,
        parking_json = EXCLUDED.parking_json,
        tips_json = EXCLUDED.tips_json,
        faqs_json = EXCLUDED.faqs_json,
        page_about_json = EXCLUDED.page_about_json,
        page_contact_json = EXCLUDED.page_contact_json,
        page_privacy_json = EXCLUDED.page_privacy_json,
        page_facts_json = EXCLUDED.page_facts_json,
        page_inside_json = EXCLUDED.page_inside_json,
        page_how_to_reach_json = EXCLUDED.page_how_to_reach_json,
        page_things_to_do_json = EXCLUDED.page_things_to_do_json,
        page_traveler_json = EXCLUDED.page_traveler_json,
        site_chrome_json = EXCLUDED.site_chrome_json,
        updated_at = now()
    `;
    console.log("✓ site_content seeded with original site content (id=1)");
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const account = await sql`SELECT id FROM admin_account WHERE id = 1`;
    if (!account.length) {
      const { scryptSync, randomBytes } = await import("node:crypto");
      const salt = randomBytes(16).toString("hex");
      const hash = scryptSync(password, salt, 64).toString("hex");
      await sql`
        INSERT INTO admin_account (id, email, password_hash)
        VALUES (1, ${email}, ${`${salt}:${hash}`})
        ON CONFLICT (id) DO NOTHING
      `;
      console.log(`✓ admin_account created for ${email} (from ADMIN_EMAIL/ADMIN_PASSWORD)`);
    } else {
      console.log("\nadmin_account row already exists — leaving password hash untouched.");
    }
  } else {
    console.log(
      "\nNo ADMIN_EMAIL/ADMIN_PASSWORD set — skipping admin_account seed. You can still log in with ADMIN_EMAIL/ADMIN_PASSWORD as a break-glass credential even without a DB row (see lib/adminPassword.ts)."
    );
  }

  console.log("\nDone. The admin panel is at /admin/login.");
}

main().catch((err) => {
  console.error("\nsetup-db.mjs failed:", err);
  process.exit(1);
});
