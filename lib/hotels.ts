export interface Hotel {
  name: string;
  category: "Luxury 5-Star" | "Family Resort 4-Star" | "Great Value 3/4-Star" | "Adults Only";
  distance: string;
  description: string;
  features: string[];
}

export const NEARBY_HOTELS: Hotel[] = [
  {
    name: "GF Gran Costa Adeje",
    category: "Luxury 5-Star",
    distance: "5-minute drive / 2.2 km",
    description: "A premier 5-star resort featuring large swimming pools, rooftop solarium, luxury wellness spa, mini-golf, and upscale dining, located close to Playa del Duque.",
    features: ["Multiple heated swimming pools", "Luxury spa & wellness circuit", "Kids mini-club & family rooms"],
  },
  {
    name: "Hotel Jardín Tropical",
    category: "Luxury 5-Star",
    distance: "15-minute walk / 1.2 km",
    description: "An iconic Moorish-style resort overlooking Puerto Colón marina with cliffside saltwater pools, lush subtropical gardens, and sunset ocean views.",
    features: ["Cliffside saltwater lagoon", "Direct access to beach boardwalk", "Fine dining restaurants"],
  },
  {
    name: "Iberostar Bouganville Playa",
    category: "Family Resort 4-Star",
    distance: "10-minute walk / 800 meters",
    description: "A family-favorite 4-star hotel situated very close to Siam Park and San Eugenio beach, equipped with a Star Camp kids' activity program and water splash pool.",
    features: ["Aquafun kids splash park", "All-inclusive board options", "Walking distance to Siam Park"],
  },
  {
    name: "H10 Conquistador",
    category: "Family Resort 4-Star",
    distance: "5-minute shuttle / 2.0 km",
    description: "Located right on the Playa de las Américas seafront promenade with expansive lagoon pools, multiple themed restaurants (Italian, Teppanyaki, Steakhouse), and Despacio spa.",
    features: ["Oceanfront promenade location", "Thalasso spa center", "Close to free shuttle bus pickup"],
  },
  {
    name: "Vanilla Garden Boutique Hotel",
    category: "Adults Only",
    distance: "12-minute walk / 950 meters",
    description: "A stylish, tranquil adults-only boutique hotel featuring modern minimalist rooms, a heated pool with Bali sunbeds, French bistro dining, and evening lounge music.",
    features: ["Adults-only relaxed atmosphere", "Heated pool with daybeds", "Modern bohemian design"],
  },
  {
    name: "Sol Arona Tenerife",
    category: "Great Value 3/4-Star",
    distance: "Free shuttle bus stops directly outside",
    description: "A very popular, budget-friendly family hotel in Los Cristianos with large outdoor pools, children's play area, and an official Siam Park shuttle stop at the door.",
    features: ["Direct free shuttle bus pickup", "All-inclusive packages", "Short walk to Los Cristianos beach"],
  },
];
