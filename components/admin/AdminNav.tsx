"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  SettingsIcon,
  NavIcon,
  ImageIcon,
  TicketIcon,
  RideIcon,
  FacilityIcon,
  HotelIcon,
  ShuttleIcon,
  TipIcon,
  FaqIcon,
  HomeIcon,
  PageIcon,
  RouteIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
  InfoPageIcon,
} from "./icons";

type NavItem = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => JSX.Element;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

// Flat and direct on purpose: every content list gets its own one-click
// sidebar entry, nothing is nested inside another page's editor. "Pages"
// below covers hero/prose/SEO for each public page; "Content" covers the
// data lists shown on those pages (a couple are shown on more than one
// page — each form says where else it appears).
const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: DashboardIcon }],
  },
  {
    title: "Site-wide",
    items: [
      { href: "/admin/settings", label: "Site Settings", icon: SettingsIcon },
      { href: "/admin/navigation", label: "Navigation", icon: NavIcon },
      { href: "/admin/header-footer", label: "Header, Footer & Guide Links", icon: NavIcon },
      { href: "/admin/images", label: "Images", icon: ImageIcon },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/tickets", label: "Tickets & Prices", icon: TicketIcon },
      { href: "/admin/rides", label: "Rides", icon: RideIcon },
      { href: "/admin/facilities", label: "Facilities", icon: FacilityIcon },
      { href: "/admin/hotels", label: "Hotels", icon: HotelIcon },
      { href: "/admin/shuttles", label: "Shuttles & Buses", icon: ShuttleIcon },
      { href: "/admin/tips", label: "Visitor Tips", icon: TipIcon },
      { href: "/admin/faqs", label: "FAQs", icon: FaqIcon },
    ],
  },
  {
    title: "Pages",
    items: [
      { href: "/admin/pages/homepage", label: "Homepage", icon: HomeIcon },
      { href: "/admin/pages/inside-park", label: "Rides & Attractions Page", icon: PageIcon },
      { href: "/admin/pages/how-to-reach", label: "How to Reach", icon: RouteIcon },
      { href: "/admin/pages/traveler-information", label: "Traveler Information", icon: PageIcon },
      { href: "/admin/pages/things-to-do-near", label: "Things to Do Near", icon: PageIcon },
      { href: "/admin/pages/about", label: "About Siam Park", icon: PageIcon },
      { href: "/admin/pages/contact", label: "Contact Page", icon: MailIcon },
      { href: "/admin/pages/interesting-facts", label: "Interesting Facts", icon: InfoPageIcon },
      { href: "/admin/pages/privacy", label: "Privacy Policy", icon: ShieldIcon },
    ],
  },
  {
    title: "Account",
    items: [{ href: "/admin/account", label: "My Account", icon: UserIcon }],
  },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
      {NAV_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/40">{group.title}</p>
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
