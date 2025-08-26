"use server";

import { prisma } from "@/lib/prisma";

import { deleteUserSchema } from "./schema";

export const deleteUser = async (id: string) => {
  try {
    const validatedData = deleteUserSchema.parse({ id });
    await prisma.user.delete({
      where: { id: validatedData.id },
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return {
      success: false,
      error: "Erro ao deletar usuário",
    };
  }
};
