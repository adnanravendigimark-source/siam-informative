import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Wraps every public page (everything under this route group) with the
// site chrome. Admin routes live outside this group entirely, so they
// never render Header/Footer — no risk of the public nav/CTA/footer
// leaking into /admin/*.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-md"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
