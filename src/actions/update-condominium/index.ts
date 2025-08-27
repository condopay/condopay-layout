"use server";

import { prisma } from "@/lib/prisma";

import type { CondominiumType } from "../../../generated/prisma";
import type { UpdateCondominiumSchema } from "./schema";

export const updateCondominium = async (data: UpdateCondominiumSchema) => {
  const condominium = await prisma.condominium.update({
    where: { id: data.id },
    data: {
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
      condominium_type: data.condominiumType as CondominiumType,
      address: {
        update: {
          street: data.address.street,
          number: data.address.number,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          zip_code: data.address.zipCode,
          country: data.address.country,
        },
      },
    },
  });
  return condominium;
};
