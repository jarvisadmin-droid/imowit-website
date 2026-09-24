import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const ADMIN_HOSTNAMES = new Set(["admin.imowit.com"]);

// Admin paths reachable without a session (as seen on admin.imowit.com).
const ADMIN_PUBLIC_PATHS = new Set(["/login"]);

function isAdminHost(hostname: string): boolean {
  if (ADMIN_HOSTNAMES.has(hostname)) return true;
  // Local development: admin.localhost or admin.localhost:3000
  return hostname.startsWith("admin.localhost");
}

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (isAdminHost(hostname)) {
    return adminProxy(request);
  }

  // The /admin tree only exists to be rewritten into from admin.imowit.com.
  // Block it from being reached directly as a path on the main marketing host.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

// admin.imowit.com: refresh the Supabase session cookies, send signed-out
// visitors to /login, and rewrite into the /admin route tree. This is only an
// early redirect for signed-out visitors; the real access check is
// requireAdmin() in every admin page and Server Action (src/lib/auth/admin.ts).
async function adminProxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const target = request.nextUrl.clone();
  target.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;

  let response = NextResponse.rewrite(target, { request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // Refreshed tokens go to both the request (so pages rendered for this
          // request see them) and the response (so the browser keeps them).
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.rewrite(target, { request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    },
  );

  // Verifies (and if needed refreshes) the session with Supabase Auth.
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !ADMIN_PUBLIC_PATHS.has(pathname)) {
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.search = "";
    if (pathname !== "/") login.searchParams.set("next", `${pathname}${search}`);
    const redirect = NextResponse.redirect(login);
    // Keep any cookie changes (e.g. clearing an expired session).
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return withAdminHeaders(redirect);
  }

  return withAdminHeaders(response);
}

function withAdminHeaders(response: NextResponse): NextResponse {
  // Every admin response is per-user: never cache it (Cloudflare sits in
  // front of Vercel), never index it, never allow it inside a frame.
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "same-origin");
  return response;
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico).*)"],
};
