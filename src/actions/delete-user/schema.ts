import { z } from "zod";

export const deleteUserSchema = z.object({
  id: z.uuid("ID do usuário é obrigatório"),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
