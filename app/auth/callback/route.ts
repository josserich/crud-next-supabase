// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = "/"; // halaman tujuan setelah login
    if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Supabase exchangeCodeForSession failed:", error);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";
    const redirectUrl =
      !isLocalEnv && forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;
    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Auth callback error:", err);
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
