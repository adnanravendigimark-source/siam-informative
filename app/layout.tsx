import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { getSiteSettings } from "@/lib/site";
import { getImages } from "@/lib/images";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const { siteName, siteUrl, siteDescription } = settings;
  const title = `${siteName} — Unofficial Guide to Siam Park, Tenerife`;
  const images = await getImages();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s | ${siteName}` },
    description: siteDescription,
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: siteDescription,
      url: siteUrl,
      siteName,
      type: "website",
      images: [{ url: `${images.homeHero.src}?w=1200&h=630&fit=crop&auto=format&q=75`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: siteDescription,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2b48",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const { siteName, siteUrl, siteDescription } = settings;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    logo: `${siteUrl}/icon.svg`,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  };

  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-guide-50 font-body text-guide-900 antialiased selection:bg-ocean-border selection:text-navy">
        {/* Header/Footer are intentionally NOT rendered here — this layout
            wraps every route, including /admin/*. Public pages render
            <Header/>/<Footer/> themselves (see app/(site)/layout.tsx) so
            the admin panel never shows the public site chrome. */}
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </body>
    </html>
  );
}
