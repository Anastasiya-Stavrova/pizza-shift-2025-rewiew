import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^.{16}$/, { message: "Введите корректный номер телефона" });

export const paymentUserDataSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2-х символов" }),
  lastName: z
    .string()
    .min(2, { message: "Фамилия должна содержать не менее 2-х символов" }),
  phone: phoneSchema,
  email: z.string().email({ message: "Введите корректную почту" }),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
});

export const paymentUserCartSchema = z.object({
  pan: z
    .string()
    .min(9, { message: "Поле должно содержать 8 цифр" })
    .max(9, { message: "Поле должно содержать 8 цифр" }),
  expireDate: z
    .string()
    .min(5, { message: "Поле должно содержать 4 цифры" })
    .max(5, { message: "Поле должно содержать 4 цифры" }),
  cvv: z
    .string()
    .min(4, { message: "Поле должно содержать 4 цифры" })
    .max(4, { message: "Поле должно содержать 4 цифры" }),
});

export type PaymentUserDataSchemaFields = z.infer<typeof paymentUserDataSchema>;
export type PaymentUserCartSchemaFields = z.infer<typeof paymentUserCartSchema>;
