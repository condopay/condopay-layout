-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT NOT NULL DEFAULT 'resident',
    "status" TEXT NOT NULL DEFAULT 'active',
    "avatarUrl" TEXT,
    "document" TEXT,
    "rg" TEXT,
    "ra" TEXT,
    "phone1" TEXT,
    "phone2" TEXT,
    "whatsapp" TEXT,
    "profession" TEXT,
    "birthDate" TEXT,
    "maritalStatus" TEXT,
    "buildingId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");
