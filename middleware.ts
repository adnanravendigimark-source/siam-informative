import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

function withNoIndex(res: NextResponse) {
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

function withNoCache(res: NextResponse) {
  res.headers.set("Cache-Control", "no-store, must-revalidate");
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  const isLoginPage = cleanPath === "/admin/login";
  const isLoginApi = cleanPath === "/api/admin/login";
  const isAdminPage = cleanPath.startsWith("/admin") && !isLoginPage;
  const isAdminApi = cleanPath.startsWith("/api/admin") && !isLoginApi;
  const isAdminArea = cleanPath.startsWith("/admin") || cleanPath.startsWith("/api/admin");

  if (!isAdminPage && !isAdminApi) {
    return isAdminArea ? withNoIndex(NextResponse.next()) : NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    if (isAdminApi) {
      return withNoCache(withNoIndex(NextResponse.json({ error: "Unauthorized" }, { status: 401 })));
    }
    const loginUrl = new URL("/admin/login", req.url);
    if (cleanPath && cleanPath !== "/admin" && !cleanPath.startsWith("/admin/login")) {
      loginUrl.searchParams.set("next", pathname);
    }
    return withNoCache(withNoIndex(NextResponse.redirect(loginUrl)));
  }

  return withNoCache(withNoIndex(NextResponse.next()));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
