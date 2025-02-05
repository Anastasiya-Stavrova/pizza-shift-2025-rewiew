import { z } from "zod";

import { phoneSchema } from "@/constants";

export const authPartialSchema = z.object({
  phone: phoneSchema,
});

export const authFullSchema = z.object({
  phone: phoneSchema,
  code: z
    .string()
    .min(6, { message: "Код должен содержать 6 цифр" })
    .max(6, { message: "Код должен содержать 6 цифр" }),
});

export type AuthPartialFields = z.infer<typeof authPartialSchema>;
export type AuthFullFields = z.infer<typeof authFullSchema>;
