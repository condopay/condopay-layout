"use server";

import { prisma } from "@/lib/prisma";

// TODO: get building id from context
const BUILDING_ID = "5393ad83-b8e1-4adf-8b26-e7e9ebb5af52";

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    where: {
      condominium_id: BUILDING_ID,
    },
  });
  return users;
};
