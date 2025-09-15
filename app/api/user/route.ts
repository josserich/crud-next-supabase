import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email } = body;
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is Required !";
  if (!email) errors.email = "Email is Required !";
  const existed = await prisma.user.count({
    where: {
      email,
    },
  });
  if (existed === 0) {
    await prisma.user.create({
      data: { name, email },
    });
  }
  return NextResponse.json(
    { msg: `Name - ${name} is Registered !` },
    { status: 200 }
  );
}
