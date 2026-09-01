export interface Ride {
  id: string;
  name: string;
  category: "Adrenaline / Thrill" | "Family & Moderate" | "Relax & Leisure" | "Kids & Toddlers";
  intensity: "High" | "Medium" | "Low" | "Relaxed";
  minHeight: string;
  weightLimit?: string;
  ageRecommendation?: string;
  description: string;
  highlights: string[];
  rules: string;
}

export interface Zone {
  name: string;
  tagline: string;
  description: string;
  rides: Ride[];
}

export const PARK_RIDES: Ride[] = [
  // Thrill / Adrenaline
  {
    id: "tower-of-power",
    name: "Tower of Power",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.40 m (4 ft 7 in)",
    ageRecommendation: "14+ years",
    description: "The park's flagship attraction. A heart-stopping 28-meter (92 ft) near-vertical drop reaching speeds of up to 80 km/h (50 mph), shooting you through a transparent acrylic tunnel surrounded by a shark and manta ray aquarium.",
    highlights: [
      "28-meter near-vertical slide",
      "Speeds up to 80 km/h",
      "Passes through a 360° shark aquarium",
    ],
    rules: "Strict single rider only. No jewelry, eyewear, or loose items. Arms and legs must remain crossed throughout the descent.",
  },
  {
    id: "singha",
    name: "Singha",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)",
    ageRecommendation: "8+ years",
    description: "A hybrid water coaster combining high-speed slide curves with water-jet propulsion sections that shoot 3-person inline rafts uphill at speeds of 18 m/s (65 km/h) through 14 change-of-direction turns.",
    highlights: [
      "240-meter total track length",
      "Uphill water propulsion technology",
      "High-banked hairpin turns",
    ],
    rules: "3 riders per raft (minimum 2 riders). Total raft weight must not exceed 250 kg.",
  },
  {
    id: "saifa",
    name: "Saifa",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)",
    ageRecommendation: "8+ years",
    description: "The park's newest double-lane dueling water coaster. Two parallel 306-meter tracks launch side-by-side rafts through high-speed drops, uphill boosters, and 360-degree helical turns overlooking the southern coastline.",
    highlights: [
      "Twin dueling racing tracks",
      "82-meter elevation drop total",
      "RocketBLAST water jet boosters",
    ],
    rules: "2 riders per raft. Riders race side-by-side against the opposing lane.",
  },
  {
    id: "the-dragon",
    name: "The Dragon",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)",
    ageRecommendation: "8+ years",
    description: "A 4-person cloverleaf raft plunges down a steep enclosed tube into a colossal 20-meter wide open funnel, swinging back and forth with near-vertical zero-gravity sensation under the gaze of a giant Thai dragon.",
    highlights: [
      "Zero-gravity sensations in the funnel",
      "4-person cloverleaf tube",
      "Iconic giant dragon sculpture",
    ],
    rules: "3 to 4 riders per raft. Balance of weight is checked by ride operators before dispatch.",
  },
  {
    id: "kinnaree",
    name: "Kinnaree",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)",
    ageRecommendation: "8+ years",
    description: "A 213-meter mega-slide that weaves through the hillside vegetation. Features an enclosed funnel, a high-speed drop, and a dramatic sweeping vertical wall turn before splashing down into the pool.",
    highlights: [
      "Combines funnel, drop, and vertical wall",
      "200+ meters of lush hillside track",
      "4-person round tube",
    ],
    rules: "Requires 4 riders per raft. Maximum combined weight 320 kg.",
  },
  {
    id: "vulcano",
    name: "Vulcano",
    category: "Adrenaline / Thrill",
    intensity: "High",
    minHeight: "1.25 m (4 ft 1 in)",
    ageRecommendation: "8+ years",
    description: "An enclosed 4-person raft ride that drops into complete pitch-black darkness inside an artificial volcano crater, featuring synchronized laser lights and volcanic rumbling sound effects before exiting.",
    highlights: [
      "Pitch-black enclosed tunnel drops",
      "Laser and light show inside crater",
      "Sensory audio-visual experience",
    ],
    rules: "4 riders per raft. Not recommended for visitors sensitive to flashing strobe lights or complete darkness.",
  },
  {
    id: "mekong-rapids",
    name: "Mekong Rapids",
    category: "Adrenaline / Thrill",
    intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)",
    ageRecommendation: "6+ years",
    description: "A classic fast-paced white-water rafting simulation. Family groups ride a circular 4-to-5 person raft down twisting outdoor rapids and sudden drop pools.",
    highlights: [
      "High-speed white-water river simulation",
      "Wide open air family raft",
      "Scenic hillside descent",
    ],
    rules: "Children under 1.40 m must wear a life jacket and be accompanied by an adult.",
  },
  {
    id: "patong-rapids",
    name: "Patong Rapids",
    category: "Adrenaline / Thrill",
    intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)",
    ageRecommendation: "6+ years",
    description: "A multi-person family raft slide featuring alternating sections of complete darkness and illuminated open-air curves, offering a gentler alternative to the extreme coasters.",
    highlights: [
      "Over 230 meters in length",
      "Mix of enclosed and open-air track",
      "Smooth family-friendly drop sections",
    ],
    rules: "Raft accommodates 2 to 4 guests.",
  },

  // Family & Moderate
  {
    id: "naga-racer",
    name: "Naga Racer",
    category: "Family & Moderate",
    intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in)",
    ageRecommendation: "6+ years",
    description: "A 6-lane head-first mat-racing slide. Grab a foam mat with handles and race alongside friends and family through an initial enclosed spiral tube before bursting into 6 parallel straight drop lanes.",
    highlights: [
      "6 parallel racing lanes",
      "Head-first mat riding experience",
      "Speed sensor timers at the finish line",
    ],
    rules: "Single rider per lane. Must ride head-first on foam mat holding both handles.",
  },
  {
    id: "jungle-snakes",
    name: "Jungle Snakes",
    category: "Family & Moderate",
    intensity: "Medium",
    minHeight: "1.10 m (3 ft 7 in) or 1.25 m depending on tube",
    ageRecommendation: "6+ years",
    description: "A collection of 4 individual twisting body and tube slides named Boa, Python, Viper, and Cobra. Each slide winds through tropical flora with differing speeds, turns, and covered sections.",
    highlights: [
      "4 distinct slide layouts",
      "Both single and double-ring options",
      "Shaded rainforest canopy surrounds",
    ],
    rules: "Single or double inflatable rings depending on the chosen snake route.",
  },
  {
    id: "wave-palace",
    name: "The Wave Palace (Wave Pool)",
    category: "Family & Moderate",
    intensity: "Medium",
    minHeight: "No minimum (Children must be supervised)",
    description: "The centerpiece of Siam Park. An immense artificial wave pool that generates clean rolling waves up to 3 to 4 meters high (the largest in any European water park), gently lapping onto a 330-meter white sand beach.",
    highlights: [
      "Waves up to 3–4 meters on schedule",
      "Heated turquoise water (24–25°C)",
      "Gentle shallow beach entry for wading",
    ],
    rules: "A loud siren sounds prior to wave activation. Deep water is restricted to competent swimmers. Lifejackets recommended for small children.",
  },

  // Relax & Leisure
  {
    id: "mai-thai-river",
    name: "Mai Thai River (Lazy River)",
    category: "Relax & Leisure",
    intensity: "Relaxed",
    minHeight: "No minimum (Under 1.10m must wear lifejacket)",
    description: "A 1-kilometer lazy river winding through cascading waterfalls, lush botanical gardens, and tropical rock formations. Features a unique water-lift conveyor belt where you can choose between a relaxing river loop or an elevated slide descent through an aquarium.",
    highlights: [
      "Over 1,000 meters in length",
      "Elevated rapids section with slide exit",
      "Slow and fast lane options",
    ],
    rules: "Single or double ring tubes provided at entry points. Small children must wear complimentary flotation vests.",
  },
  {
    id: "siam-beach",
    name: "Siam Beach",
    category: "Relax & Leisure",
    intensity: "Relaxed",
    minHeight: "No minimum",
    description: "A tropical oasis featuring natural imported golden sand, hundreds of complimentary sun loungers, thatched umbrellas, and beachside bar services overlooking the Wave Palace.",
    highlights: [
      "Free sunbeds and shade umbrellas",
      "Beach Club restaurant and cocktail bar nearby",
      "Gentle sunbathing atmosphere",
    ],
    rules: "Loungers are available on a first-come, first-served basis.",
  },
  {
    id: "sea-lion-island",
    name: "Sea Lion Island",
    category: "Relax & Leisure",
    intensity: "Relaxed",
    minHeight: "No minimum",
    description: "Located near the entrance bridges, this naturalistic rocky pool is home to active South American sea lions swimming, basking, and diving throughout the day.",
    highlights: [
      "Live marine animal observation",
      "Viewing bridges directly overhead",
      "Great photo spot upon entry",
    ],
    rules: "Viewing only. Feeding or touching animals is strictly prohibited.",
  },
  {
    id: "floating-market",
    name: "The Floating Market",
    category: "Relax & Leisure",
    intensity: "Relaxed",
    minHeight: "No minimum",
    description: "An authentic recreation of a Thai floating village built on wooden stilts over a tranquil lake. Houses retail shops, snack kiosks, beachwear boutiques, and a natural fish spa.",
    highlights: [
      "Traditional Thai teak wood architecture",
      "Boutique gift shops and snacks",
      "Garra rufa fish spa therapy",
    ],
    rules: "Walking plaza and shopping area accessible to all guests.",
  },

  // Kids & Toddlers
  {
    id: "the-lost-city",
    name: "The Lost City (Kids Water Fortress)",
    category: "Kids & Toddlers",
    intensity: "Low",
    minHeight: "Designed for children up to 12 years",
    description: "A massive interactive water fortress featuring 15 mini slides, swinging rope bridges, climbing cargo nets, water cannons, fountains, and a giant tipping bucket that soaks the courtyard every few minutes.",
    highlights: [
      "15 kid-friendly water slides",
      "Dedicated zero-depth splash zone for infants",
      "Continuous interactive water features",
    ],
    rules: "Adults are permitted to accompany children. Taller slides inside the structure have a 1.25m maximum limit.",
  },
  {
    id: "sawasdee",
    name: "Sawasdee",
    category: "Kids & Toddlers",
    intensity: "Low",
    minHeight: "Designed for younger kids",
    description: "A dedicated mini-thrill zone offering scaled-down junior versions of Siam Park's famous adult slides, including a mini Dragon slide and 4 twisting chutes designed for children not yet tall enough for the main coaster rides.",
    highlights: [
      "Mini Dragon slide for junior thrill-seekers",
      "4 parallel beginner slides",
      "Shallow landing pools",
    ],
    rules: "Intended for children under 1.40 m. Adult supervision required.",
  },
  {
    id: "coco-beach",
    name: "Coco Beach",
    category: "Kids & Toddlers",
    intensity: "Relaxed",
    minHeight: "No minimum",
    description: "A secondary family-friendly beach area featuring white sand and a dedicated gentle wave pool with smaller 0.5-meter waves perfectly calibrated for young children and nervous swimmers.",
    highlights: [
      "Gentle mini wave pool",
      "Shaded family loungers and restaurant",
      "Less crowded than the main Siam Beach",
    ],
    rules: "Ideal safe swimming area for toddlers and younger children.",
  },
];
