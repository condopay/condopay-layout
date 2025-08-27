-- DropForeignKey
ALTER TABLE "public"."addresses" DROP CONSTRAINT "addresses_condominium_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_condominium_id_fkey" FOREIGN KEY ("condominium_id") REFERENCES "public"."condominiums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
