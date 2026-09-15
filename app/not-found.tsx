import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import InternalLinkGrid from "@/components/InternalLinkGrid";

// Kept at the app root (not inside app/(site)/) because only a root-level
// not-found.tsx handles truly unmatched URLs in Next.js App Router — a
// route-group-scoped one only catches notFound() calls thrown from within
// that group. Since this file sits outside app/(site)/layout.tsx, it
// renders Header/Footer itself rather than inheriting them.
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container className="py-16 text-center sm:py-24">
          <p className="text-6xl font-extrabold text-guide-300">404</p>
          <h1 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">
            Page Not Found
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-guide-600">
            The requested guide page could not be located. You can return to the main guide or browse one of the chapters below.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-guide-300 bg-white px-4 py-2 text-xs font-semibold text-navy hover:bg-guide-100 transition-colors shadow-subtle"
            >
              <span>← Back to Guide Home</span>
            </Link>
          </div>
          <div className="mx-auto mt-12 max-w-3xl text-left border-t border-guide-200 pt-10">
            <InternalLinkGrid />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
