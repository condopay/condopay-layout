import { z } from "zod";

export const getUsersSchema = z.object({
  buildingId: z.string(),
  search: z.string().optional(),
});

export type GetUsersSchema = z.infer<typeof getUsersSchema>;
