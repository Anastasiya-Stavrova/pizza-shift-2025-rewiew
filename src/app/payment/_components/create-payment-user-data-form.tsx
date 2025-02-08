"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatPhone } from "@/helpers";
import { useAuth } from "@/hooks";
import { usePayment } from "../_hooks";
import {
  paymentUserDataSchema,
  PaymentUserDataSchemaFields,
} from "../_constants";

import {
  AddressInput,
  Button,
  ErrorText,
  FormInput,
  RequiredSymbol,
  Typography,
} from "@/components";

export const CreatePaymentUserDataForm = () => {
  const { userData, setUserData, setCurrentStage } = usePayment();
  const { user } = useAuth();

  const router = useRouter();

  const form = useForm<PaymentUserDataSchemaFields>({
    resolver: zodResolver(paymentUserDataSchema),
    defaultValues: {
      firstName: userData?.firstName || user?.firstname || "",
      lastName: userData?.lastName || user?.lastname || "",
      phone: formatPhone(userData?.phone) || formatPhone(user?.phone) || "",
      email: userData?.email || user?.email || "",
      address: userData?.address || user?.city || "",
    },
  });

  const onSubmit = (data: PaymentUserDataSchemaFields) => {
    setUserData(data);
    setCurrentStage("SET_USER_CART_STAGE");
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <Typography
        text="Введите ваши данные"
        size="xl"
        className="hidden sm:block"
      />

      <div className="flex flex-col justify-between gap-4 sm:gap-6 w-full max-w-[370px]">
        <div className="flex flex-col gap-2">
          <Typography text="Шаг 1 из 2" size="xs" className="text-foreground" />

          <div className="w-full h-1 bg-[#CED2DA] rounded-md">
            <div className="w-[50%] h-1 bg-[#4ECF53] rounded-md" />
          </div>
        </div>

        <FormProvider {...form}>
          <form
            className="flex flex-col gap-4 sm:gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormInput
              name="lastName"
              label="Фамилия"
              placeholder="Фамилия"
              required
            />

            <FormInput
              name="firstName"
              label="Имя"
              placeholder="Имя"
              required
            />

            <FormInput
              name="phone"
              label="Номер телефона"
              type="phone"
              placeholder="Телефон"
              required
            />

            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              required
            />

            <div>
              <p className="mb-2 text-sm">
                Адрес <RequiredSymbol />
              </p>
              <Controller
                control={form.control}
                name="address"
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <AddressInput
                      className={error?.message && "error-input"}
                      onChange={field.onChange}
                      value={userData?.address || user?.city}
                    />
                    {error?.message && (
                      <ErrorText text={error.message} className="mt-2" />
                    )}
                  </div>
                )}
              />
            </div>

            <div className="flex gap-6 py-4">
              <Button
                type="button"
                variant="secondary"
                className="hidden sm:block"
                onClick={() => router.back()}
              >
                Назад
              </Button>
              <Button>Продолжить</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
