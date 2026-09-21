import { NextRequest, NextResponse } from "next/server";

const ADMIN_HOSTNAMES = new Set(["admin.imowit.com"]);

function isAdminHost(hostname: string): boolean {
  if (ADMIN_HOSTNAMES.has(hostname)) return true;
  // Local development: admin.localhost or admin.localhost:3000
  return hostname.startsWith("admin.localhost");
}

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (isAdminHost(hostname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  // The /admin tree only exists to be rewritten into from admin.imowit.com.
  // Block it from being reached directly as a path on the main marketing host.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
