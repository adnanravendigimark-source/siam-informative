import { getNav } from "@/lib/nav";
import { getSiteSettings } from "@/lib/site";
import { getSiteChrome } from "@/lib/siteChrome";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const [nav, settings, chrome] = await Promise.all([getNav(), getSiteSettings(), getSiteChrome()]);
  return <HeaderClient siteName={settings.siteName} navLinks={nav.navLinks} chrome={chrome.header} />;
}
