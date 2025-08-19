import { z } from "zod";

export const getAdminsSchema = z.object({
  buildingId: z.string(),
});

export type GetAdminsSchema = z.infer<typeof getAdminsSchema>;
