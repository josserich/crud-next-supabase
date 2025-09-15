import prisma from "@/prisma";
import { requireAuth } from "@/src/utils/validation";
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const productId = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json(productId, { status: 200 });
};

export const PATCH = async (request: NextRequest) => {
  // authorization
  const authError = await requireAuth(request);
  if (authError) return authError;
  // get value from params & body
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const body = await request.formData();
  // all fields
  const name = body.get("name")?.toString() || "";
  const price = Number(body.get("price")) || 0;
  const desc = body.get("desc")?.toString() || "";
  const img = body.get("img");
  const removeImg = body.get("removeImg")?.toString() === "true";
  // validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Product name is required !";
  if (!price || isNaN(price)) errors.price = "Product price is Required !";
  if (img) {
    if (!(img instanceof File)) {
      errors.image = "Invalid Image File !";
    } else {
      // validation types
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(img.type)) {
        errors.image = "Only JPG, PNG, or WEBP images are allowed !";
      }
      // validation size
      const maxSize = 2 * 1024 * 1024;
      if (img.size > maxSize) {
        errors.image = "Image size must be less than 2 MB !";
      }
    }
  }
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    errors.image = "Product is not found !";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }
  // update image
  const supabase = await createClient();
  let imgUrl = product?.img || ""; //default
  function extractFileNameFromUrl(url: string) {
    return url.split("/").pop() || "";
  }
  // only remove img
  if (removeImg && !img) {
    const oldImg = extractFileNameFromUrl(product?.img || "");
    await supabase.storage.from("img").remove([oldImg]);
    imgUrl = "";
  }
  // image load and update url
  if (img instanceof File) {
    const supabase = await createClient();
    // remove img if exist
    if (product?.img) {
      const oldImg = extractFileNameFromUrl(product?.img || "");
      await supabase.storage.from("img").remove([oldImg]);
    }
    // upload img with new file
    const newImg = `product-${Date.now()}-${img.name}`;
    const { error } = await supabase.storage
      .from("img")
      .upload(newImg, img, { cacheControl: "3600", upsert: true });
    if (error) throw error;
    // publicURL
    const { data } = supabase.storage.from("img").getPublicUrl(newImg);
    imgUrl = data.publicUrl;
  }
  // executed
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      desc,
      img: imgUrl,
    },
  });
  return NextResponse.json(
    { msg: `Product - ${name} updated successfully` },
    { status: 200 }
  );
};

export const DELETE = async (request: NextRequest) => {
  // authorization
  const authError = await requireAuth(request);
  if (authError) return authError;
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  const productId = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!productId) {
    return NextResponse.json({ errors: "Product not found" }, { status: 404 });
  }
  // removeImg
  if (productId.img) {
    const supabase = await createClient();
    const fileName = productId.img.split("/").pop() || "";
    const { data, error } = await supabase.storage
      .from("img")
      .remove([fileName]);
    if (error) {
      return NextResponse.json({ errors: error }, { status: 404 });
    }
  }
  await prisma.product.delete({
    where: {
      id,
    },
  });
  return NextResponse.json(
    { msg: `Product - ${productId.name} updated successfully` },
    { status: 200 }
  );
};
