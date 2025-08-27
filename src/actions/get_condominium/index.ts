"use server";

import { prisma } from "@/lib/prisma";

export const getCondominiumInfo = async () => {
  const condominium = await prisma.condominium.findFirst({
    include: {
      address: true,
    },
  });
  return condominium;
};
