import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = "/";
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  // redirect bersih tanpa ?code=
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  const redirectUrl =
    !isLocalEnv && forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;
  return NextResponse.redirect(redirectUrl);
}
