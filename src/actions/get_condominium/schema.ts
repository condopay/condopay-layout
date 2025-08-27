import { z } from "zod";

export const getCondominiumSchema = z.object({
  id: z.string(),
});
