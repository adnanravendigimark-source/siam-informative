export interface Faq {
  question: string;
  answer: string;
  category?: "Tickets & Pricing" | "Rides & Restrictions" | "Planning & Practicalities" | "Food & Facilities";
}

export const FAQS: Faq[] = [
  {
    question: "What are the opening hours of Siam Park?",
    answer: "Siam Park is open 365 days a year from 10:00 AM daily. In the summer season (May 1 to October 31), closing time is 6:00 PM. In the winter season (November 1 to April 30), closing time is 5:00 PM. The park is widely reported to close on Christmas Day (December 25).",
    category: "Planning & Practicalities",
  },
  {
    question: "Is the water heated at Siam Park?",
    answer: "Yes. All water throughout Siam Park's slides, pools, and lazy river is heated to a consistent 24°C to 25°C (75°F–77°F) year-round using the park's eco-efficient thermal system, making winter visits very pleasant.",
    category: "Planning & Practicalities",
  },
  {
    question: "How much does a Siam Park admission ticket cost?",
    answer: "Standard 1-day adult admission (age 12+) is approximately €42–€45, and child admission (age 3–11) is approximately €30–€32. Infants under 3 years enter free. Canary Islands residents receive a substantial local discount (~50% off) upon presenting valid government ID and empadronamiento.",
    category: "Tickets & Pricing",
  },
  {
    question: "What is the Twin Ticket with Loro Parque?",
    answer: "The Twin Ticket bundles 1 full day at Siam Park in Costa Adeje with 1 full day at Loro Parque zoo in Puerto de la Cruz. It costs around €74–€76 for adults and €53–€55 for children, saving about €12–€15 compared to purchasing separate admissions. You have up to 15 days from your first park visit to visit the second park.",
    category: "Tickets & Pricing",
  },
  {
    question: "How does the Fast Pass work and is it worth it?",
    answer: "A Fast Pass wristband allows you one priority skip-the-line access per participating major ride (excluding the Tower of Power). It costs approximately €15–€28 and can only be purchased inside the park on the morning of your visit from the photo desk. Because quantities are strictly limited daily, it is highly recommended during peak summer months (July–August) and European school holidays.",
    category: "Tickets & Pricing",
  },
  {
    question: "How do I ride the free Siam Park shuttle bus?",
    answer: "Siam Park operates dedicated free double-decker shuttle buses running approximately every 30 minutes from 9:30 AM across major pickup points in Los Cristianos (CC Pasarela, Sol Arona), Playa de las Américas (CC Presidente, Best Tenerife, Llanos de Troya), and Costa Adeje (CC El Duque, Fañabé Plaza, Ocean Park). No prior booking is required for these local shuttles.",
    category: "Planning & Practicalities",
  },
  {
    question: "What are the height and age restrictions on major rides?",
    answer: "The Tower of Power has a strict minimum height requirement of 1.40 m (4 ft 7 in) and an age guideline of 14+. High-speed raft coasters like Singha, Saifa, The Dragon, Kinnaree, and Vulcano require a minimum height of 1.25 m (4 ft 1 in). Moderate slides like Mekong Rapids and Naga Racer require 1.10 m (3 ft 7 in). Children's play areas (The Lost City, Sawasdee, Coco Beach) are designed specifically for young kids and toddlers.",
    category: "Rides & Restrictions",
  },
  {
    question: "Can I bring my own food and drinks into Siam Park?",
    answer: "Commercial outside food, take-away fast food, coolers, and alcoholic beverages are strictly prohibited. Small baby food, formula, small fresh fruit, and food for certified medical/dietary requirements (e.g. celiac or diabetes) are permitted. Bags are inspected by security at the entrance turnstiles.",
    category: "Food & Facilities",
  },
  {
    question: "How much are lockers and towels to rent?",
    answer: "Lockers are available in Small (€5/day) and Large (€7/day) sizes, with a refundable €5 deposit for the electronic wristband. Towels can be rented for €5/day plus a €5 refundable deposit. We recommend bringing your own microfiber towel to avoid rental fees.",
    category: "Food & Facilities",
  },
  {
    question: "What footwear and clothing are permitted on the slides?",
    answer: "Standard swimwear is required. Swimsuits with exposed metal buckles, zippers, or hard buttons are not permitted on slides. Water shoes and neoprene aqua socks are permitted and highly recommended on all slides. Flip-flops and sandals can be worn on paths but must be left in shoe cubbies at the start of steep slides.",
    category: "Rides & Restrictions",
  },
  {
    question: "Can I use a GoPro or action camera on the rides?",
    answer: "Yes, action cameras (like GoPro) are permitted on most tube and raft slides if securely attached to a body chest harness or head strap. Handheld selfie sticks, loose mobile phones, and loose cameras are prohibited on high-speed drop rides for safety reasons.",
    category: "Rides & Restrictions",
  },
  {
    question: "What is the best day of the week to visit Siam Park?",
    answer: "Tuesdays, Wednesdays, and Thursdays typically see fewer crowds than weekends. In addition, Mondays and Fridays are common hotel check-in/travel days for European package holidays, making mid-week days the best time for shorter queue times.",
    category: "Planning & Practicalities",
  },
  {
    question: "What is Siam Night?",
    answer: "Siam Night is a special seasonal evening event running on selected Friday and Saturday nights in July and August from 8:00 PM to midnight. The park is illuminated with neon lights, live DJ music, and illuminated water slides open under the stars with an adult/teen party atmosphere (separate ticket required).",
    category: "Planning & Practicalities",
  },
  {
    question: "Is Siam Park accessible for wheelchair users and guests with limited mobility?",
    answer: "Yes. The lower sections of the park, including the main entrance, Floating Market, Siam Beach, and restaurants, have ramped pathways and elevator access to the beach. Accessible restrooms and dedicated disabled parking bays are available. Due to the natural hillside terrain, some upper slides involve stairs and steep slopes.",
    category: "Food & Facilities",
  },
  {
    question: "How much is parking at Siam Park?",
    answer: "On-site parking is available for a flat daily rate of €5.00 per vehicle. The parking lot opens at 9:15 AM and has over 500 vehicle spots. During peak summer months, arriving before 10:00 AM is recommended as the lot can fill up quickly.",
    category: "Planning & Practicalities",
  },
  {
    question: "Is this website affiliated with Siam Park?",
    answer: "No. This is an independent, non-commercial traveler information guide created to help visitors plan their trip with accurate, unbiased details. We do not sell tickets or process bookings. Official tickets and live announcements are available on siampark.net.",
    category: "Planning & Practicalities",
  },
];
