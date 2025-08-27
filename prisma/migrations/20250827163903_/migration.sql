-- CreateEnum
CREATE TYPE "public"."CondominiumType" AS ENUM ('APARTMENT', 'HOUSE', 'COMMERCIAL');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "condominium_id" TEXT;

-- CreateTable
CREATE TABLE "public"."addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "condominium_id" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."condominiums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "condominium_type" "public"."CondominiumType" NOT NULL,

    CONSTRAINT "condominiums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_condominium_id_key" ON "public"."addresses"("condominium_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "public"."condominiums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "public"."condominiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
