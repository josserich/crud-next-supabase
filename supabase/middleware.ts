import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const publicRoutes = ["/", "/auth"];
  const protectedRoutes = ["/matches", "/chat", "/profile"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route)
  );
  if (!user && isProtectedRoute) {
    const redirectUrl = new URL("/auth", request.url);
    return NextResponse.redirect(redirectUrl);
  }
  if (user && pathname === "/auth") {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  }
  if (user && isProtectedRoute) {
    return supabaseResponse;
  }

  return supabaseResponse;
}
