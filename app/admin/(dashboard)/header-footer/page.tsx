import { getSiteChrome } from "@/lib/siteChrome";
import SiteChromeForm from "@/components/admin/SiteChromeForm";

export const dynamic = "force-dynamic";

export default async function AdminHeaderFooterPage() {
  const chrome = await getSiteChrome();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Header, Footer & Guide Links</h1>
      <p className="mt-1 text-sm text-guide-500">
        Every word of copy in the site header, footer, and the "Explore More of This Guide" card grid shown across
        pages. Nav link labels themselves are edited on the Navigation page.
      </p>
      <div className="mt-8 max-w-2xl">
        <SiteChromeForm initial={chrome} />
      </div>
    </div>
  );
}
