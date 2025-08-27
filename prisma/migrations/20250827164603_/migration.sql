/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `condominiums` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `condominiums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."condominiums" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "condominiums_cnpj_key" ON "public"."condominiums"("cnpj");
