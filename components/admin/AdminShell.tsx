import Link from "next/link";
import AdminNav from "./AdminNav";
import AdminLogoutButton from "./AdminLogoutButton";
import ToastProvider from "./Toast";
import type { Session } from "@/lib/auth";

export default function AdminShell({ session, children }: { session: Session; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-guide-50">
      {/* Fixed sidebar — pinned to the viewport, scrolls its own nav list
          independently of the (often much taller) page content on the
          right, instead of scrolling away with it. */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col bg-navy">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean text-sm font-bold text-white">SP</div>
          <div>
            <p className="text-sm font-semibold text-white">Siam Park Admin</p>
            <p className="text-[11px] text-white/40">Content management</p>
          </div>
        </div>
        <AdminNav />
        <div className="space-y-2 border-t border-white/10 px-3 py-3">
          <p className="truncate px-3 text-[11px] text-white/40">{session.email}</p>
          <AdminLogoutButton />
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col pl-64">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-guide-200 bg-white px-6 py-3.5">
          <p className="text-sm text-guide-500">Signed in as <span className="font-medium text-guide-800">{session.email}</span></p>
          <Link href="/" target="_blank" className="rounded-lg border border-guide-200 px-3 py-1.5 text-xs font-medium text-guide-600 transition hover:bg-guide-50">
            View site ↗
          </Link>
        </header>
        <ToastProvider>
          <main className="flex-1 px-6 py-8">
            <div className="mx-auto max-w-4xl">{children}</div>
          </main>
        </ToastProvider>
      </div>
    </div>
  );
}
