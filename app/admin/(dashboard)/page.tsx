import Link from "next/link";
import {
  SettingsIcon,
  NavIcon,
  ImageIcon,
  HomeIcon,
  TicketIcon,
  RideIcon,
  FacilityIcon,
  HotelIcon,
  ShuttleIcon,
  TipIcon,
  FaqIcon,
  PageIcon,
  RouteIcon,
  MailIcon,
  ShieldIcon,
  InfoPageIcon,
} from "@/components/admin/icons";

// Mirrors AdminNav.tsx's grouping exactly — flat and direct, one card per
// content list or page, nothing nested inside another card.
const SECTIONS: {
  title: string;
  items: { href: string; label: string; desc: string; icon: (p: { className?: string }) => JSX.Element }[];
}[] = [
  {
    title: "Site-wide",
    items: [
      { href: "/admin/settings", label: "Site Settings", desc: "Name, logo, contact details, social links.", icon: SettingsIcon },
      { href: "/admin/navigation", label: "Navigation", desc: "Header and footer links.", icon: NavIcon },
      { href: "/admin/header-footer", label: "Header, Footer & Guide Links", desc: "Every other word in the header, footer, and Explore More grid.", icon: NavIcon },
      { href: "/admin/images", label: "Images", desc: "Shared site imagery and alt text.", icon: ImageIcon },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/tickets", label: "Tickets & Prices", desc: "Ticket types, pricing, inclusions, hours.", icon: TicketIcon },
      { href: "/admin/rides", label: "Rides", desc: "Rides and attractions list.", icon: RideIcon },
      { href: "/admin/facilities", label: "Facilities", desc: "Dining, amenities, park rules.", icon: FacilityIcon },
      { href: "/admin/hotels", label: "Hotels", desc: "Nearby hotel recommendations.", icon: HotelIcon },
      { href: "/admin/shuttles", label: "Shuttles & Buses", desc: "Transport routes, stops, parking.", icon: ShuttleIcon },
      { href: "/admin/tips", label: "Visitor Tips", desc: "Practical tips for visitors.", icon: TipIcon },
      { href: "/admin/faqs", label: "FAQs", desc: "Frequently asked questions.", icon: FaqIcon },
    ],
  },
  {
    title: "Pages",
    items: [
      { href: "/admin/pages/homepage", label: "Homepage", desc: "Hero, stats, and every section heading.", icon: HomeIcon },
      { href: "/admin/pages/inside-park", label: "Rides & Attractions Page", desc: "Hero, overview, strategy sections.", icon: PageIcon },
      { href: "/admin/pages/how-to-reach", label: "How to Reach", desc: "Directions and travel info.", icon: RouteIcon },
      { href: "/admin/pages/traveler-information", label: "Traveler Information", desc: "Practical visitor info page.", icon: PageIcon },
      { href: "/admin/pages/things-to-do-near", label: "Things to Do Near", desc: "Nearby activities page.", icon: PageIcon },
      { href: "/admin/pages/about", label: "About Siam Park", desc: "Hero, body content, SEO.", icon: PageIcon },
      { href: "/admin/pages/contact", label: "Contact Page", desc: "Contact page content.", icon: MailIcon },
      { href: "/admin/pages/interesting-facts", label: "Interesting Facts", desc: "Fun facts page content.", icon: InfoPageIcon },
      { href: "/admin/pages/privacy", label: "Privacy Policy", desc: "Legal/privacy page content.", icon: ShieldIcon },
    ],
  },
];

export default function AdminDashboardHome() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Dashboard</h1>
      <p className="mt-1 text-sm text-guide-500">Everything on the site is editable from here — pick a section to get started.</p>

      <div className="mt-8 space-y-8">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-guide-400">{section.title}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-3 rounded-xl border border-guide-200 bg-white p-4 transition hover:border-navy/30 hover:shadow-lift"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-guide-900">{item.label}</p>
                      <p className="mt-0.5 text-xs text-guide-500">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
