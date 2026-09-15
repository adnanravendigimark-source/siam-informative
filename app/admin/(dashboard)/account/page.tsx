import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import AccountForm from "@/components/admin/AccountForm";

export const dynamic = "force-dynamic";

export default async function AdminAccountPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-guide-900">My Account</h1>
      <p className="mt-1 text-sm text-guide-500">Manage your admin login credentials.</p>
      <div className="mt-8 max-w-lg">
        <AccountForm email={session!.email} />
      </div>
    </div>
  );
}
