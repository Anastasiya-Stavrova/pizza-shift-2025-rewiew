import { z } from "zod";

import { paymentUserDataSchema } from "@/app/payment/_constants";

export const profileSchema = paymentUserDataSchema.extend({
  middleName: z.string().optional(),
});

export type ProfileSchemaFields = z.infer<typeof profileSchema>;
