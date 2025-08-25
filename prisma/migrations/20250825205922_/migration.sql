-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'BUILDING_MANAGER', 'COUNSELOR', 'RESIDENT');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT,
    "document" TEXT NOT NULL,
    "rg" TEXT,
    "ra" TEXT,
    "profession" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT,
    "whatsapp" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'RESIDENT',
    "status" "public"."Status" NOT NULL DEFAULT 'ACTIVE',
    "marital_status" "public"."MaritalStatus",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_document_key" ON "public"."users"("document");
