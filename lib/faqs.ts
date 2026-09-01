// Shared FAQ content — rendered on the homepage and marked up with
// FAQPage structured data. Answers are original writing based on
// independently verified facts (see /interesting-facts-about-siam-park/
// and /traveler-information/ for sourcing context); prices/hours are
// clearly flagged as approximate and subject to change.
export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "What are Siam Park's opening hours?",
    answer:
      "Siam Park generally opens at 10:00 AM year-round. Closing time shifts with the season — around 6:00 PM during the summer months (roughly May to October) and around 5:00 PM in winter (roughly November to April). The park is widely reported to close on Christmas Day. Hours can change for holidays or special events, so always check the park's own website for the exact dates of your visit before you travel.",
  },
  {
    question: "How much does a Siam Park ticket cost?",
    answer:
      "As an independent guide, we don't sell tickets, but general one-day admission has typically run somewhere in the €38–€48 range for adults, with reduced pricing for children, plus higher-tier options that bundle fast-track queueing, food, or extra perks. Prices change by season and year, so treat any figure — including ours — as a starting point and confirm current pricing directly with the park or a trusted ticket provider before booking.",
  },
  {
    question: "Is Siam Park suitable for young children?",
    answer:
      "Yes. Alongside its taller, faster slides, the park includes dedicated family and children's zones with shallower water and gentler rides, plus a lazy river that's easygoing enough for most ages. A number of the more intense attractions do carry minimum height or age requirements, so if you're travelling with younger kids it's worth checking individual ride restrictions once you arrive.",
  },
  {
    question: "Can I bring my own food and drink into the park?",
    answer:
      "Policies on outside food and drink vary and appear to have shifted over time, so we'd rather not state a firm rule here — check the park's current visitor terms before you go. Either way, there are multiple restaurants, bars, and snack points inside the park if you'd rather not carry anything in.",
  },
  {
    question: "How do I get to Siam Park without a car?",
    answer:
      "Public buses run from various points on Tenerife to the Costa Adeje area, and Siam Park has historically also run its own shuttle and coach services from nearby resort towns. See our full Getting There guide for a walk-through of the bus, taxi, and organized-transport options.",
  },
  {
    question: "Is this the official Siam Park website?",
    answer:
      "No. This is an independent, unofficial visitor's guide written to help travelers plan a visit — we are not affiliated with, endorsed by, or operated by Siam Park or the Loro Parque group. For tickets, live pricing, and official policies, always go to the park's own official channels.",
  },
];
