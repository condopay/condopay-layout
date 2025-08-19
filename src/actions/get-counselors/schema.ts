import { z } from "zod";

export const getCounselorsSchema = z.object({
  buildingId: z.string(),
});

export type GetCounselorsSchema = z.infer<typeof getCounselorsSchema>;
