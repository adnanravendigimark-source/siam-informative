import { getNav } from "@/lib/nav";
import NavigationForm from "@/components/admin/NavigationForm";

export const dynamic = "force-dynamic";

export default async function AdminNavigationPage() {
  const nav = await getNav();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Navigation</h1>
      <p className="mt-1 text-sm text-guide-500">Header and footer links.</p>
      <div className="mt-8 max-w-2xl">
        <NavigationForm initial={nav} />
      </div>
    </div>
  );
}
