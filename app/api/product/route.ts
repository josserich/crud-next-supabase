import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { requireAuth } from "@/src/utils/validation";

export async function GET() {
  const products = await prisma.product.findMany({});
  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: NextRequest) {
  // authorization
  const authError = await requireAuth(request);
  if (authError) return authError;
  // get value
  const body = await request.formData();
  const name = body.get("name")?.toString() || "";
  const price = Number(body.get("price"));
  const desc = body.get("desc")?.toString() || "";
  const imgFile = body.get("img");
  // validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Product Name is Required !";
  if (!price || isNaN(price)) errors.price = "Product Price is Required !";
  if (imgFile) {
    if (!(imgFile instanceof File)) {
      errors.image = "Invalid image file.";
    } else {
      // validation types
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(imgFile.type)) {
        errors.image = "Only JPG, PNG, or WEBP images are allowed.";
      }
      // validation size
      const maxSize = 2 * 1024 * 1024;
      if (imgFile.size > maxSize) {
        errors.image = "Image size must be less than 2 MB.";
      }
    }
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  // image load url
  let imgUrl = "";
  if (imgFile instanceof File) {
    const supabase = await createClient();
    const imgName = `product-${Date.now()}-${imgFile.name}`;
    const { error } = await supabase.storage
      .from("img")
      .upload(imgName, imgFile, { cacheControl: "3600", upsert: true });
    if (error) throw error;
    const publicUrlRes = supabase.storage.from("img").getPublicUrl(imgName);
    imgUrl = publicUrlRes.data.publicUrl;
  }
  await prisma.product.create({
    data: { name, price, img: imgUrl, desc },
  });
  return NextResponse.json(
    { msg: `Product - ${name} created successfully!` },
    { status: 200 }
  );
}
