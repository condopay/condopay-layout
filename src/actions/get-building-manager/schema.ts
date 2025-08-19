import { z } from "zod";

export const getBuildingManagerSchema = z.object({
  buildingId: z.string(),
});

export type GetBuildingManagerSchema = z.infer<typeof getBuildingManagerSchema>;
