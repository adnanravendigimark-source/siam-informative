import { getSiteSettings } from "@/lib/site";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">Site Settings</h1>
      <p className="mt-1 text-sm text-guide-500">Site name, description, contact email, and links to the official Siam Park site.</p>
      <div className="mt-8 max-w-2xl">
        <SettingsForm initial={settings} />
      </div>
    </div>
  );
}
