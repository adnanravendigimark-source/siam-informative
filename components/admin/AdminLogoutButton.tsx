"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (compact) {
    return (
      <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-full border border-guide-200 px-3 py-1.5 text-xs font-medium text-guide-600 transition hover:bg-guide-50">
        Log out
      </button>
    );
  }

  return (
    <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-left text-sm font-medium text-white/70 transition hover:border-white/25 hover:text-white">
      Log out
    </button>
  );
}
