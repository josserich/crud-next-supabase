// lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/client";
import prisma from "@/prisma";

export async function requireAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { authorization: "Unauthorized" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return NextResponse.json(
      { authorization: "Invalid Token !" },
      { status: 401 }
    );
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return NextResponse.json(
      { authorization: "User is not Existed !" },
      { status: 401 }
    );
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (!dbUser) {
    return NextResponse.json(
      { authorization: "User is not Existed !" },
      { status: 401 }
    );
  }
  if (dbUser.role !== "ADMIN") {
    return NextResponse.json(
      { authorization: `You're not admin !` },
      { status: 403 }
    );
  }
}
