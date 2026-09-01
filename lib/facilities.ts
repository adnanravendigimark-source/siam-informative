export interface DiningVenue {
  name: string;
  type: string;
  location: string;
  description: string;
  popularItems: string[];
}

export const DINING_VENUES: DiningVenue[] = [
  {
    name: "The Beach Club",
    type: "Buffet & Grill Restaurant",
    location: "Directly overlooking Siam Beach and Wave Palace",
    description: "The park's main dining hub with open-air terrace seating. Offers hot buffet choices, grilled burgers, roast chicken, hot dogs, pasta, salad bar, and kids' meal boxes.",
    popularItems: ["Grilled Cheeseburger & Fries", "Roast Chicken Platter", "Fresh Mediterranean Salad", "Kids Chicken Nuggets Meal"],
  },
  {
    name: "Thai House",
    type: "Asian & Thai Specialties",
    location: "Near the park entrance and Sea Lion Island",
    description: "Traditional wooden Thai architecture serving authentic Southeast Asian street foods, wok noodles, and mild curries alongside international snacks.",
    popularItems: ["Pad Thai Wok Noodles", "Chicken Yellow Curry", "Vegetable Spring Rolls", "Thai Jasmine Rice Bowls"],
  },
  {
    name: "Sweet Siam",
    type: "Dessert & Coffee Parlor",
    location: "The Floating Market",
    description: "Specializes in sweet snacks, freshly made Belgian waffles, crepes, artisanal Italian ice creams, sorbets, and barista coffee.",
    popularItems: ["Nutella & Banana Waffles", "Artisanal Gelato Scoops", "Fresh Fruit Smoothies", "Iced Espresso"],
  },
  {
    name: "Tea House & Bar",
    type: "Tea Salon & Snack Bar",
    location: "Adjacent to the Floating Market",
    description: "A tranquil setting over the lake serving specialty teas, coffees, sandwiches, fresh pastries, and light sandwiches.",
    popularItems: ["Selection of Herbal & Asian Teas", "Fresh Baguettes & Sandwiches", "Croissants & Pastries"],
  },
  {
    name: "Siam Beach Bar & Coco Bar",
    type: "Tropical Cocktail & Beverage Bar",
    location: "Siam Beach & Coco Beach",
    description: "Cocktail huts serving chilled Spanish beers (Dorada), sangria, piña coladas, mojitos, mocktails, soft drinks, and ice creams right by the sun loungers.",
    popularItems: ["Fresh Mint Mojito", "Tropical Piña Colada", "Chilled Canarian Dorada Beer", "Frozen Slushies"],
  },
];

export const FACILITY_SERVICES = [
  {
    title: "Lockers & Secure Storage",
    details: "Available in Small (€5/day) and Large (€7/day) sizes. A refundable €5 cash deposit or card hold is required for the digital RFID key wristband.",
  },
  {
    title: "Towel Rental",
    details: "Towels are available for hire near the main entrance lockers for €5 per day plus a €5 refundable deposit upon return.",
  },
  {
    title: "Wetsuit Rental",
    details: "Shorty neoprene wetsuits are available for €5/day in the winter months (November to March) for guests sensitive to cooler breezes.",
  },
  {
    title: "Free Sun Loungers & Lifejackets",
    details: "Hundreds of sunbeds across Siam Beach and Coco Beach are included free with admission. Flotation vests for children are provided free of charge at all ride stations.",
  },
  {
    title: "Medical & First Aid Center",
    details: "A fully staffed medical center with certified emergency medical personnel and lifeguards is located near the Wave Palace beach area.",
  },
  {
    title: "Baby Changing & Stroller Facilities",
    details: "All main restroom blocks feature infant changing stations. Umbrella strollers can be brought into the park, though some hillside pathways have stairs where ramps must be followed.",
  },
];

export const RULES_AND_RESTRICTIONS = {
  outsideFood: "Siam Park strictly prohibits bringing commercial outside food, fast food, coolers, or alcoholic beverages into the park. Baby food, baby milk, small fruit snacks, and items required for certified medical/dietary conditions (e.g., celiac/diabetes) are permitted. Bags are routinely checked by security personnel at the entrance turnstiles.",
  swimwear: "Only standard lycra or nylon swimwear (bikinis, swimsuits, boardshorts, rashguards) is permitted on rides. Swimwear with exposed metal zips, rivets, buttons, or hard plastic buckles is forbidden to protect slide surfaces. Cotton T-shirts and denim shorts are not permitted on high-speed slides.",
  footwear: "Water shoes, neoprene booties, and aqua socks with soft rubber soles are permitted and encouraged on all water slides. Flip-flops and sandals cannot be worn on steep drop slides and should be left in shoe cubbies at slide entrances.",
  cameras: "GoPro and action cameras are allowed on tube and raft rides provided they are securely fastened via an approved chest harness or head strap. Handheld selfie sticks and loose phones are strictly prohibited on high-speed slides.",
  heightChecks: "Height measurements are strictly enforced by ride staff using official measuring sticks. Children must meet height limits with bare feet or standard water socks.",
};
