import { sql, getSiteContentRow, dbErrorMessage } from "./db";
import type { ImageKey } from "./images";

// Every page on this site that isn't purely a listing of already-DB-backed
// structured data (tickets, rides, hotels, etc. — see lib/tickets.ts,
// lib/rides.ts, lib/hotels.ts, ...) has its hero, prose body, and SEO
// fields defined here. Prose sections are stored as small HTML strings
// (matching the "one rich-text field per section" pattern used across
// this portfolio) so admins can format with basic tags without needing a
// WYSIWYG dependency.

/* ------------------------------------------------------------------ */
/* Shared shapes                                                       */
/* ------------------------------------------------------------------ */

export interface StatItem {
  value: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export interface HomepageHero {
  badge: string;
  location: string;
  title: string;
  description: string;
  footerNote: string;
  imageKey: ImageKey;
  imageCaption: string;
  quickJumpLabel: string;
  quickJumpLinks: string[]; // fixed order: hours, tickets, rides, shuttles, facilities, faq
}

export interface HomepageContent {
  hero: HomepageHero;
  stats: StatItem[];
  hoursSection: {
    heading: string;
    subheading: string;
    locationParagraph: string;
    highlights: string[];
    eyebrow: string;
    hoursCardHeading: string;
    locationCardHeading: string;
    holidayNoteLabel: string;
    transportLinkLabel: string;
  };
  ticketsSection: {
    heading: string;
    subheading: string;
    ctaHeading: string;
    ctaBody: string;
    eyebrow: string;
    optionsHeading: string;
    ctaEyebrow: string;
    ctaButtonLabel: string;
  };
  ridesSection: { heading: string; subheading: string; eyebrow: string; viewAllLabel: string; thrillHeading: string; familyHeading: string };
  shuttlesSection: {
    heading: string;
    subheading: string;
    otherOptions: { label: string; body: string }[];
    gpsAddress: string;
    eyebrow: string;
    cardHeading: string;
    frequencyBadge: string;
    noBookingNote: string;
    alsoServingNote: string;
    fullGuideLabel: string;
    otherModesHeading: string;
    gpsLabel: string;
  };
  facilitiesSection: {
    heading: string;
    subheading: string;
    eyebrow: string;
    servicesHeading: string;
    rulesHeading: string;
    foodBadge: string;
    foodHeading: string;
    swimwearBadge: string;
    swimwearHeading: string;
    footwearBadge: string;
    footwearHeading: string;
    cameraBadge: string;
    cameraHeading: string;
  };
  tipsSection: { heading: string; subheading: string; eyebrow: string };
  faqSection: { heading: string; subheading: string; eyebrow: string };
  independentNotice: { heading: string; body: string; linkLabel: string };
  guideLinksHeading: string; // overrides the default Explore-More heading on the homepage only
  metaTitleSuffix: string;
}

export const DEFAULT_HOMEPAGE: HomepageContent = {
  hero: {
    badge: "Comprehensive Visitor Guide",
    location: "Costa Adeje, Tenerife, Canary Islands",
    title: "Siam Park Tenerife: The Complete Visitor Guide",
    description:
      "Your independent, all-in-one resource for planning a visit to Siam Park in Tenerife. Find complete information on all 16+ water slides, seasonal operating hours, ticket pricing tiers, height/weight restrictions, free shuttle bus stops, on-site food and locker policies, and practical tips.",
    footerNote: "This is a 100% free informational guide for travelers. We do not sell tickets or take commissions.",
    imageKey: "homeHero",
    imageCaption: "Siam Park grounds & attractions, Costa Adeje, South Tenerife",
    quickJumpLabel: "Fast Jump Navigation:",
    quickJumpLinks: [
      "⏰ Hours & Seasons",
      "🎟️ Tickets & Prices",
      "🎢 Rides & Height Rules",
      "🚌 Free Shuttles",
      "🎒 Food & Lockers",
      "💬 FAQs",
    ],
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
    locationParagraph:
      "Siam Park is located in Costa Adeje in sunny southern Tenerife, known for having over 300 days of sunshine per year. The park is situated immediately off the TF-1 motorway (Exits 73 and 74).",
    highlights: [
      "Heated Water: All water is continuously heated to 24–25°C (75–77°F) year-round.",
      "Airport Proximity: 18 km (15–20 minutes) from Tenerife South Airport (TFS).",
      "Best Days to Visit: Tuesdays, Wednesdays, and Thursdays typically have the shortest queues.",
    ],
    eyebrow: "Plan Your Schedule",
    hoursCardHeading: "⏰ Daily Operating Hours",
    locationCardHeading: "☀️ Location & Weather Highlights",
    holidayNoteLabel: "★ Holiday Note:",
    transportLinkLabel: "View complete transport & shuttle schedules",
  },
  ticketsSection: {
    heading: "Ticket Pricing Reference & Admission Tiers",
    subheading: "Overview of 1-day standard tickets, Twin Tickets (with Loro Parque), Premium packages, Fast Passes, and VIP Cabanas.",
    ctaHeading: "Official Ticket Verification",
    ctaBody: "To check real-time availability, purchase official admission tickets directly, or reserve VIP cabanas, visit the operator's official portal.",
    eyebrow: "Official Prices 2026",
    optionsHeading: "🎟️ Ticket Options & Inclusions",
    ctaEyebrow: "Official Ticket Gateways",
    ctaButtonLabel: "Go to Official Ticket Portal",
  },
  ridesSection: {
    heading: "Rides, Slides & Attractions Overview",
    subheading: "16+ world-class water attractions ranging from adrenaline mega-slides to relaxing lagoons.",
    eyebrow: "Attractions Spotlight",
    viewAllLabel: "View all 16+ rides & height rules",
    thrillHeading: "High-Intensity & Adrenaline Slides",
    familyHeading: "Family, Leisure & Wave Pool",
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
    eyebrow: "Free Bus Service",
    cardHeading: "🚌 Free Double-Decker Shuttle Pickups",
    frequencyBadge: "Every 30 Mins (from 9:30 AM)",
    noBookingNote: "No tickets or advance bookings needed. Simply wait at the official pick-up points across Los Cristianos, Las Américas, and Costa Adeje.",
    alsoServingNote: "Also serving CC El Duque, Hotel Ocean Park & San Eugenio.",
    fullGuideLabel: "Full Transport Guide & Routes →",
    otherModesHeading: "🚗 Other Transport Modes",
    gpsLabel: "📍 GPS Address:",
  },
  facilitiesSection: {
    heading: "Facilities, Dining & Visitor Rules",
    subheading: "Essential knowledge regarding locker hire, outside food regulations, swimwear, and accessibility.",
    eyebrow: "Park Amenities & Rules",
    servicesHeading: "🍽️ Park Services & Amenities",
    rulesHeading: "⚠️ Essential Visitor Regulations",
    foodBadge: "Strict Security Inspection",
    foodHeading: "Outside Food & Beverage Policy",
    swimwearBadge: "Slide Safety Standard",
    swimwearHeading: "Permitted Swimwear & Clothing",
    footwearBadge: "Recommended For Comfort",
    footwearHeading: "Water Shoes & Footwear Guidelines",
    cameraBadge: "Harness Required",
    cameraHeading: "Action Cameras & GoPro Rules",
  },
  tipsSection: {
    heading: "Practical Advice for a Smoother Visit",
    subheading: "Tried-and-tested advice to avoid long queues, protect your belongings, and stay sun-safe.",
    eyebrow: "Insider Advice",
  },
  faqSection: {
    heading: "Frequently Asked Questions",
    subheading: "Answers to the top 16 questions asked by travelers planning a visit.",
    eyebrow: "Got Questions?",
  },
  independentNotice: {
    heading: "Independent Traveler Reference",
    body: "This guide is created independently to provide clear, accurate, and unbiased information for tourists visiting Tenerife. To verify live park announcements, current ride maintenance, or to purchase official entry, please visit the park's official portal.",
    linkLabel: "Visit Official Siam Park Site (siampark.net)",
  },
  guideLinksHeading: "Guide Chapters & Detailed Articles",
  metaTitleSuffix: "— Full Travel Guide: Rides, Tickets, Hours & Shuttles",
};

export async function getHomepage(): Promise<HomepageContent> {
  const row = await getSiteContentRow();
  const data = row?.homepage_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_HOMEPAGE;
  // Deep-merge every nested section so older saved rows (from before a
  // field was added to one of these objects) get the new field's default
  // instead of losing it to a shallow top-level spread.
  return {
    ...DEFAULT_HOMEPAGE,
    ...data,
    hero: { ...DEFAULT_HOMEPAGE.hero, ...data.hero },
    hoursSection: { ...DEFAULT_HOMEPAGE.hoursSection, ...data.hoursSection },
    ticketsSection: { ...DEFAULT_HOMEPAGE.ticketsSection, ...data.ticketsSection },
    ridesSection: { ...DEFAULT_HOMEPAGE.ridesSection, ...data.ridesSection },
    shuttlesSection: { ...DEFAULT_HOMEPAGE.shuttlesSection, ...data.shuttlesSection },
    facilitiesSection: { ...DEFAULT_HOMEPAGE.facilitiesSection, ...data.facilitiesSection },
    tipsSection: { ...DEFAULT_HOMEPAGE.tipsSection, ...data.tipsSection },
    faqSection: { ...DEFAULT_HOMEPAGE.faqSection, ...data.faqSection },
    independentNotice: { ...DEFAULT_HOMEPAGE.independentNotice, ...data.independentNotice },
  };
}

export async function saveHomepage(data: HomepageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, homepage_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET homepage_json = EXCLUDED.homepage_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Shared page hero + SEO shapes                                       */
/* ------------------------------------------------------------------ */

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  imageKey: ImageKey;
  readTime?: string;
}

/* ------------------------------------------------------------------ */
/* About Siam Park                                                     */
/* ------------------------------------------------------------------ */

export interface AboutPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  tocLabels: string[];
  vitalStatsHeading: string;
  sectionImageCaption: string;
  bodyHtml: string;
  vitalStats: StatItem[];
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_ABOUT_PAGE: AboutPageContent = {
  hero: {
    eyebrow: "History & Background",
    title: "The Story & Design of Siam Park",
    description: "From royal Thai permissions and hillside construction to custom desalination technology — here is the comprehensive background of Europe's premier water park.",
    imageKey: "thaiTemple",
    readTime: "6 min read",
  },
  breadcrumbLabel: "About Siam Park",
  tocLabels: [
    "Origins & Royal Opening",
    "Thai Architectural Heritage",
    "Hillside Engineering",
    "Desalination & Eco-Systems",
    "The Loro Parque Group",
    "Key Park Statistics",
  ],
  vitalStatsHeading: "Key Facts at a Glance",
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

export async function getAboutPage(): Promise<AboutPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_about_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_ABOUT_PAGE;
  return { ...DEFAULT_ABOUT_PAGE, ...data };
}

export async function saveAboutPage(data: AboutPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_about_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_about_json = EXCLUDED.page_about_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  cardHeading: string;
  cardNote: string;
  quickAnswers: { q: string; a: string }[];
  faqHeading: string;
  officialLinkLabel: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  hero: {
    eyebrow: "Contact & Inquiries",
    title: "Get in Touch",
    description: "Questions, corrections, or feedback regarding this independent guide — we'd like to hear from you.",
    imageKey: "tropicalBeach",
  },
  breadcrumbLabel: "Contact",
  cardHeading: "Email Inquiries",
  cardNote: "We aim to review submissions and reply within a few business days. If you are reporting an outdated price or broken link, please include the relevant page link.",
  quickAnswers: [
    { q: "Does this website sell park tickets or process bookings?", a: "No. This is an independent, non-commercial travel guide. We do not sell tickets, manage bookings, or collect payments. For tickets and official bookings, please visit siampark.net." },
    { q: "I have a question about an existing ticket purchase or refund.", a: "Please contact the official Siam Park customer support or the authorized third-party agency from which you bought your tickets. We do not have access to booking databases." },
    { q: "I noticed outdated information or want to suggest a correction.", a: "We welcome visitor feedback. Please email us with the specific page URL and the information that needs updating." },
  ],
  faqHeading: "Frequently Asked Questions",
  officialLinkLabel: "Visit Official Siam Park Website (siampark.net)",
  metaTitle: "Contact Us & Guide Inquiries",
  metaDescription: "Get in touch with corrections, feedback, or general questions regarding this Siam Park independent visitor guide.",
};

export async function getContactPage(): Promise<ContactPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_contact_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_CONTACT_PAGE;
  return { ...DEFAULT_CONTACT_PAGE, ...data };
}

export async function saveContactPage(data: ContactPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_contact_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_contact_json = EXCLUDED.page_contact_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Privacy Policy                                                      */
/* ------------------------------------------------------------------ */

export interface PrivacyPageContent {
  breadcrumbLabel: string;
  title: string;
  lastUpdated: string;
  bodyHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_PRIVACY_PAGE: PrivacyPageContent = {
  breadcrumbLabel: "Privacy Policy",
  title: "Privacy Policy",
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

export async function getPrivacyPage(): Promise<PrivacyPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_privacy_json;
  if (!data || typeof data !== "object" || !data.bodyHtml) return DEFAULT_PRIVACY_PAGE;
  return { ...DEFAULT_PRIVACY_PAGE, ...data };
}

export async function savePrivacyPage(data: PrivacyPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_privacy_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_privacy_json = EXCLUDED.page_privacy_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Interesting Facts                                                   */
/* ------------------------------------------------------------------ */

export interface FactsPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  tocLabels: string[];
  sectionImageCaption: string;
  bodyHtml: string;
  factCheckHeading: string;
  factCheckHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_FACTS_PAGE: FactsPageContent = {
  hero: {
    eyebrow: "Park Background",
    title: "14 Interesting Facts & Verified Records About Siam Park",
    description: "A closer look at Siam Park's design history, record-setting water attractions, environmental innovation, and fact-checks on common online claims.",
    imageKey: "thaiTemple",
    readTime: "7 min read",
  },
  breadcrumbLabel: "Interesting Facts",
  tocLabels: [
    "Origins & Royal Opening",
    "Thai Architecture & Design",
    "Ride Heights & Wave Records",
    "Awards & Recognition",
    "Environmental Technology",
    "Editorial Fact-Check on Claims",
  ],
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

export async function getFactsPage(): Promise<FactsPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_facts_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_FACTS_PAGE;
  return { ...DEFAULT_FACTS_PAGE, ...data };
}

export async function saveFactsPage(data: FactsPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_facts_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_facts_json = EXCLUDED.page_facts_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Inside Siam Park (Rides & Attractions page)                         */
/* ------------------------------------------------------------------ */

export interface InsidePageHeadings {
  overview: string;
  heightRestrictions: string;
  adrenalineSlides: string;
  familyRides: string;
  relaxLeisure: string;
  kidsZones: string;
  facilitiesInside: string;
  rideStrategy: string;
}

export interface InsidePageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  headings: InsidePageHeadings;
  overviewHtml: string;
  restrictionsIntroHtml: string;
  sectionIntros: { adrenaline: string; family: string; relax: string; kids: string };
  relaxImageCaption: string;
  amenitiesHtml: string;
  strategyHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_INSIDE_PAGE: InsidePageContent = {
  hero: {
    eyebrow: "Attractions Directory",
    title: "Complete Guide to Siam Park Rides & Zones",
    description: "Every slide, coaster, pool, and family area inside the park — complete with height requirements, rider rules, and queue strategies.",
    imageKey: "insideAttractions",
    readTime: "8 min read",
  },
  breadcrumbLabel: "Rides & Attractions",
  headings: {
    overview: "Park Layout & Zones",
    heightRestrictions: "Height & Safety Restrictions Table",
    adrenalineSlides: "Adrenaline & Thrill Rides",
    familyRides: "Family & Moderate Rides",
    relaxLeisure: "Relaxation, Beach & Lazy River",
    kidsZones: "Kids & Toddler Play Zones",
    facilitiesInside: "On-Site Amenities",
    rideStrategy: "Queue Strategy & Tips",
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

export async function getInsidePage(): Promise<InsidePageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_inside_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_INSIDE_PAGE;
  return { ...DEFAULT_INSIDE_PAGE, ...data };
}

export async function saveInsidePage(data: InsidePageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_inside_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_inside_json = EXCLUDED.page_inside_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* How to Reach Siam Park                                              */
/* ------------------------------------------------------------------ */

export interface HowToReachPageHeadings {
  freeShuttle: string;
  publicBus: string;
  byCar: string;
  parking: string;
  byTaxi: string;
  airportTransfers: string;
  tips: string;
}

export interface HowToReachPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  headings: HowToReachPageHeadings;
  introHtml: string;
  shuttleIntroHtml: string;
  shuttleBoxHeading: string;
  publicBusIntroHtml: string;
  drivingImageCaption: string;
  drivingHtml: string;
  parkingHtml: string;
  taxiHtml: string;
  airportHtml: string;
  tipsHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_HOW_TO_REACH_PAGE: HowToReachPageContent = {
  hero: {
    eyebrow: "Transport & Directions",
    title: "How to Reach Siam Park",
    description: "Every way to travel to Siam Park in Costa Adeje — from the complimentary double-decker shuttle buses and public transit routes to driving directions, GPS coordinates, and parking.",
    imageKey: "coastalRoad",
    readTime: "6 min read",
  },
  breadcrumbLabel: "Getting There",
  headings: {
    freeShuttle: "Free Siam Park Shuttle Bus",
    publicBus: "Public TITSA Bus Network",
    byCar: "Driving Directions & Highway Exits",
    parking: "On-Site Parking & Facilities",
    byTaxi: "Taxi Fares & Taxi Ranks",
    airportTransfers: "Airport Transfers",
    tips: "Transit Advice",
  },
  introHtml: `<p>Siam Park is located in the Costa Adeje municipality on Tenerife's south coast, directly adjacent to the TF-1 motorway and within 5 to 10 minutes of major tourist resorts in Playa de las Américas and Los Cristianos.</p>`,
  shuttleIntroHtml: `<p>Siam Park operates its own dedicated fleet of branded double-decker shuttle buses offering <strong>100% free transportation</strong> for all park visitors staying in Los Cristianos, Playa de las Américas, and Costa Adeje.</p>
<ul>
<li><strong>Service Frequency:</strong> Operates daily approximately every 30 minutes between <strong>9:30 AM and 1:00 PM</strong>, with return shuttles departing the park from <strong>4:00 PM to 6:30 PM</strong> (depending on season).</li>
<li><strong>Booking:</strong> No ticket or advance reservation is required. Simply queue at the official pickup stop.</li>
</ul>`,
  shuttleBoxHeading: "Official Free Shuttle Bus Pickup Points",
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

export async function getHowToReachPage(): Promise<HowToReachPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_how_to_reach_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_HOW_TO_REACH_PAGE;
  return { ...DEFAULT_HOW_TO_REACH_PAGE, ...data };
}

export async function saveHowToReachPage(data: HowToReachPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_how_to_reach_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_how_to_reach_json = EXCLUDED.page_how_to_reach_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Things to Do Near Siam Park                                         */
/* ------------------------------------------------------------------ */

export interface ThingsToDoPageHeadings {
  nearbyAttractions: string;
  siamMall: string;
  hotelsNear: string;
  loroParque: string;
  itinerary: string;
}

export interface ThingsToDoPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  headings: ThingsToDoPageHeadings;
  imageCaption: string;
  nearbyIntroHtml: string;
  nearbyAttractions: { title: string; distance: string; body: string }[];
  siamMallHtml: string;
  hotelsIntroHtml: string;
  loroParqueHtml: string;
  itineraryHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_THINGS_TO_DO_PAGE: ThingsToDoPageContent = {
  hero: {
    eyebrow: "Local Surroundings",
    title: "Things to Do & Hotels Near Siam Park",
    description: "Explore the best attractions, beaches, shopping centers, and top-rated hotels within easy reach of Siam Park in Costa Adeje.",
    imageKey: "tropicalBeach",
    readTime: "6 min read",
  },
  breadcrumbLabel: "Things to Do Nearby",
  headings: {
    nearbyAttractions: "Nearby Attractions & Beaches",
    siamMall: "Siam Mall Shopping & Dining",
    hotelsNear: "Top Hotels Near Siam Park",
    loroParque: "Twin Day Trip: Loro Parque (Puerto de la Cruz)",
    itinerary: "Suggested Costa Adeje Itineraries",
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

export async function getThingsToDoPage(): Promise<ThingsToDoPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_things_to_do_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_THINGS_TO_DO_PAGE;
  return { ...DEFAULT_THINGS_TO_DO_PAGE, ...data };
}

export async function saveThingsToDoPage(data: ThingsToDoPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_things_to_do_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_things_to_do_json = EXCLUDED.page_things_to_do_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}

/* ------------------------------------------------------------------ */
/* Traveler Information                                                */
/* ------------------------------------------------------------------ */

export interface TravelerPageHeadings {
  hoursAdmission: string;
  lockersAmenities: string;
  foodDining: string;
  outsideFood: string;
  swimwearRules: string;
  accessibility: string;
  whatToPack: string;
  bestTime: string;
}

export interface TravelerPageContent {
  hero: PageHeroContent;
  breadcrumbLabel: string;
  headings: TravelerPageHeadings;
  hoursAdmissionHtml: string;
  lockersIntroHtml: string;
  lockerPricing: { title: string; price: string; note: string }[];
  wetsuitNoteHtml: string;
  diningIntroHtml: string;
  diningImageCaption: string;
  outsideFoodExtraHtml: string;
  eyewearNote: string;
  accessibilityHtml: string;
  packingHtml: string;
  bestTimeHtml: string;
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_TRAVELER_PAGE: TravelerPageContent = {
  hero: {
    eyebrow: "Traveler Practicalities",
    title: "Siam Park: Practical Visitor Guide",
    description: "Everything you need to know before stepping through the gates — locker rentals, on-site dining, outside food rules, safety regulations, accessibility, and packing advice.",
    imageKey: "kidsWaterPark",
    readTime: "7 min read",
  },
  breadcrumbLabel: "Traveler Practicalities",
  headings: {
    hoursAdmission: "Hours & Admission Basics",
    lockersAmenities: "Lockers, Towels & Wetsuits",
    foodDining: "Restaurants & Dining Venues",
    outsideFood: "Outside Food & Security Check Policy",
    swimwearRules: "Swimwear, Footwear & Action Cameras",
    accessibility: "Accessibility & Special Needs",
    whatToPack: "What to Pack for Siam Park",
    bestTime: "Best Time to Visit & Queue Strategies",
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

export async function getTravelerPage(): Promise<TravelerPageContent> {
  const row = await getSiteContentRow();
  const data = row?.page_traveler_json;
  if (!data || typeof data !== "object" || !data.hero) return DEFAULT_TRAVELER_PAGE;
  return { ...DEFAULT_TRAVELER_PAGE, ...data };
}

export async function saveTravelerPage(data: TravelerPageContent): Promise<void> {
  try {
    await sql`
      INSERT INTO site_content (id, page_traveler_json, updated_at)
      VALUES (1, ${JSON.stringify(data)}::jsonb, now())
      ON CONFLICT (id) DO UPDATE SET page_traveler_json = EXCLUDED.page_traveler_json, updated_at = now()
    `;
  } catch (err) {
    throw new Error(dbErrorMessage(err));
  }
}
