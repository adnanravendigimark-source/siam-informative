import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login | Siam Park Visitor Guide",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-guide-50 px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-guide-200 bg-white p-8 shadow-card sm:p-10">
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-guide-500">Siam Park Visitor Guide</p>
          <h1 className="mt-2 text-2xl font-bold text-navy">Admin Sign In</h1>
        </div>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
