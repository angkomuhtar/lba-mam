import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const vesselSchema = z.object({
  id: z.string(),
  vessel_name: z.string(),
  mechanic: z.string(),
  pbm: z.string(),
  dozer: z.string(),
  loader: z.string(),
  qty: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  operator: z.string(),
  status: z.string(),
});

export type Vessel = z.infer<typeof vesselSchema>;
