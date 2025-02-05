import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^.{16}$/, { message: "Введите корректный номер телефона" });
