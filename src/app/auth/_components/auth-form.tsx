"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useTimer } from "../_hooks";
import { getAuthFormOptions } from "../_helpers";

import { Button, FormInput, Typography } from "@/components";
import { getNumbers } from "@/helpers";
import { usePostAuthOtpMutation, usePostUserSigninMutation } from "@/api";
import { useAuthActions } from "@/context";

export type AuthStage = "PHONE_STAGE" | "OTP_STAGE";

interface AuthFields {
  phone: string;
  code?: string;
}

export const AuthForm = () => {
  const [stage, setStage] = React.useState<AuthStage>("PHONE_STAGE");
  const [phone, setPhone] = React.useState("");

  const { retryDelay, setRetryDelay } = useTimer();
  const { signin } = useAuthActions();

  const postAuthOtpMutation = usePostAuthOtpMutation();
  const postUserSigninMutation = usePostUserSigninMutation();

  const form = useForm<AuthFields>(getAuthFormOptions(stage, phone));

  const handleError = (error: unknown, isCode: boolean = false) => {
    console.log(error);
    toast.error(
      isCode
        ? "Не удалось войти"
        : "Не удалось отправить сообщение на данный номер",
      {
        icon: "❌",
      }
    );
  };

  const onSubmitPhone = async (phone: string): Promise<void> => {
    try {
      const { data } = await postAuthOtpMutation.mutateAsync({
        params: { phone: getNumbers(phone) },
      });
      setRetryDelay(data.retryDelay / 1000);
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data: AuthFields) => {
    if (stage === "PHONE_STAGE") {
      try {
        await onSubmitPhone(getNumbers(data.phone));
        setPhone(data.phone);
        setStage("OTP_STAGE");
      } catch (error) {
        handleError(error);
      }
    } else if (data.code) {
      try {
        const { data: responseData } = await postUserSigninMutation.mutateAsync(
          {
            params: { phone: getNumbers(data.phone), code: data.code },
          }
        );

        signin(responseData.token);
        toast.success("Авторизация прошла успешно!", {
          icon: "✅",
        });
      } catch (error) {
        handleError(error, true);
      }
    }
  };

  return (
    <>
      <Typography
        text={`${
          stage === "PHONE_STAGE"
            ? "Введите номер телефона"
            : "Введите проверочный код"
        } для входа в личный кабинет`}
        size="md"
      />
      <FormProvider {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormInput
              className="w-[328px]"
              name="phone"
              type="phone"
              placeholder="Телефон"
            />

            {stage === "OTP_STAGE" && (
              <FormInput
                className="w-[328px]"
                name="code"
                placeholder="Проверочный код"
              />
            )}

            <div className="w-full flex flex-col gap-2 py-4">
              <Button className="w-[328px]">
                {stage === "PHONE_STAGE" ? "Продолжить" : "Войти"}
              </Button>

              {stage === "OTP_STAGE" &&
                (retryDelay > 0 ? (
                  <Typography
                    text={`Запросить код повторно можно через ${retryDelay} секунд`}
                    className="text-[#97A1AF] mr-auto mt-4"
                  />
                ) : (
                  <button
                    className="h-14 w-[328px]"
                    type="button"
                    onClick={() => {
                      try {
                        onSubmitPhone(phone);
                      } catch (error) {
                        handleError(error);
                      }
                    }}
                  >
                    <p className="text-[#344051] text-base font-semibold">
                      Запросить код ещё раз
                    </p>
                  </button>
                ))}
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
