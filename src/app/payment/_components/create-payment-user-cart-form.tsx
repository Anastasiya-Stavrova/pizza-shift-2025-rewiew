import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";

import { usePostPizzaPaymentMutation } from "@/api";
import { useBasketStore } from "@/store";
import { getNumbers } from "@/helpers";
import { usePaymentStore } from "../_store";
import { getOrderedPizzas } from "../_helpers";
import {
  paymentUserCartSchema,
  PaymentUserCartSchemaFields,
} from "../_constants";

import { Button, FormInput, Loader, Typography } from "@/components";

export const CreatePaymentUserCartForm = () => {
  const [submitting, setSubmitting] = React.useState(false);

  const postPizzaPaymentMutation = usePostPizzaPaymentMutation();

  const { userData, setCurrentStage } = usePaymentStore(
    useShallow(state => ({
      userData: state.userData,
      setCurrentStage: state.setCurrentStage,
    }))
  );
  const basketItems = useBasketStore(useShallow(state => state.basketItems));

  const form = useForm<PaymentUserCartSchemaFields>({
    resolver: zodResolver(paymentUserCartSchema),
    defaultValues: {
      pan: "",
      expireDate: "",
      cvv: "",
    },
  });

  const onSubmit = async (data: PaymentUserCartSchemaFields) => {
    setSubmitting(true);

    try {
      await postPizzaPaymentMutation.mutateAsync({
        params: {
          receiverAddress: {
            street: userData!.address,
            house: " ",
            apartment: " ",
          },
          person: {
            firstname: userData!.firstName,
            middlename: "",
            lastname: userData!.lastName,
            phone: getNumbers(userData!.phone),
          },
          debitCard: {
            pan: data.pan,
            expireDate: data.expireDate,
            cvv: data.cvv,
          },
          pizzas: getOrderedPizzas(basketItems),
        },
      });

      setCurrentStage("USER_PAYMENT_INFO_STAGE");
    } catch {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:gap-6">
        <Typography
          text="Введите данные карты для оплаты"
          size="xl"
          className="hidden sm:block"
        />

        <div className="flex flex-col justify-between gap-6 w-full max-w-[370px]">
          <div className="flex flex-col gap-2">
            <Typography
              text="Шаг 2 из 2"
              size="xs"
              className="text-foreground"
            />

            <div className="w-full h-1 bg-[#4ECF53] rounded-md" />
          </div>

          <FormProvider {...form}>
            <form
              className="flex flex-col gap-4 md:gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-4 sm:gap-6 bg-[#F3F4F6] rounded-md p-6">
                <FormInput
                  name="pan"
                  label="Номер"
                  placeholder="0000 0000"
                  required
                />

                <div className="flex flex-row gap-6">
                  <FormInput
                    name="expireDate"
                    label="Срок"
                    placeholder="00/00"
                    required
                  />

                  <FormInput
                    name="cvv"
                    label="CVV"
                    placeholder="0000"
                    required
                    type="password"
                  />
                </div>
              </div>

              <div className="flex gap-6 py-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="hidden sm:block"
                  disabled={submitting}
                  onClick={() => setCurrentStage("SET_USER_DATA_STAGE")}
                >
                  Назад
                </Button>
                <Button disabled={submitting}>Оплатить</Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {submitting && <Loader />}
    </>
  );
};
