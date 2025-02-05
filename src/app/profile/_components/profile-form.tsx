"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import toast from "react-hot-toast";

import { useAuth, useAuthActions } from "@/context";
import { profileSchema, ProfileSchemaFields } from "../_constants";
import { formatPhone, getNumbers } from "@/helpers";
import { usePatchUserProfileMutation } from "@/api";

import {
  AddressInput,
  Button,
  ErrorText,
  FormInput,
  QuestionModal,
  RequiredSymbol,
} from "@/components";

export const ProfileForm = () => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const { user } = useAuth();
  const { logout, updateUser } = useAuthActions();

  const patchUserProfileMutation = usePatchUserProfileMutation();

  const form = useForm<ProfileSchemaFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstname,
      middleName: user?.middlename,
      lastName: user?.lastname,
      phone: formatPhone(user?.phone),
      email: user?.email,
      address: user?.city,
    },
  });

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const onSubmit = async (data: ProfileSchemaFields) => {
    try {
      const a = await patchUserProfileMutation.mutateAsync({
        params: {
          profile: {
            firstname: data.firstName,
            middlename: data.middleName,
            lastname: data.lastName,
            email: data.email,
            city: data.address,
          },
          phone: getNumbers(data.phone),
        },
      });
      updateUser();
      toast.success("Профиль успешно обновлен!", {
        icon: "🙎🏻‍♂️",
      });
    } catch (error) {
      console.log(error);
      toast.error("Не удалось обновить профиль", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-6 w-full max-w-[368px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="lastName"
            label="Фамилия"
            placeholder="Фамилия"
            required
          />

          <FormInput name="firstName" label="Имя" placeholder="Имя" required />

          <FormInput
            name="middleName"
            label="Отчество"
            placeholder="Отчество"
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
            <p className="font-normal mb-2 text-sm">
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
                    value={user?.city}
                  />
                  {error?.message && (
                    <ErrorText text={error.message} className="mt-2" />
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex gap-6 py-4">
            {!isOpenDialog && (
              <Button type="button" variant="secondary" onClick={toggleDialog}>
                Выйти
              </Button>
            )}
            <Button className="max-w-[207px] ml-auto">Обновить данные</Button>
          </div>
        </form>
      </FormProvider>

      <QuestionModal
        exitButtonText="Выйти"
        question="Вы точно хотите выйти?"
        isOpen={isOpenDialog}
        onClickAgree={toggleDialog}
        onClickOpenChange={toggleDialog}
        onClickExit={logout}
      />
    </>
  );
};
