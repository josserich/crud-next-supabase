/*
  Warnings:

  - Added the required column `desc` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
