"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";

import { usePaymentStore } from "../_store";
import { ICONS } from "@/constants";

import { Typography } from "@/components";
import {
  CreatePaymentUserCartForm,
  CreatePaymentUserDataForm,
  Receipt,
} from ".";

export const PaymentSheet = () => {
  const { currentStage, setCurrentStage } = usePaymentStore(
    useShallow(state => ({
      currentStage: state.currentStage,
      setCurrentStage: state.setCurrentStage,
    }))
  );

  const router = useRouter();

  if (currentStage === "USER_PAYMENT_INFO_STAGE") {
    return (
      <div className="w-full flex flex-col gap-6 px-4 sm:px-0">
        <div className="flex items-center gap-6 flex-col sm:flex-row">
          <Image src={ICONS.SUCCESS} alt="Успешно" width={80} height={80} />
          <Typography text="Оплата прошла успешно!" size="xl" />
        </div>
        <Receipt />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:px-0">
      <div className="w-full h-full flex flex-col sm:hidden">
        <div className="w-full flex gap-4 p-4 items-center">
          <button
            className="cursor-pointer w-fit h-fit p-0"
            onClick={() => {
              if (currentStage === "SET_USER_DATA_STAGE") {
                router.back();
              } else {
                setCurrentStage("SET_USER_DATA_STAGE");
              }
            }}
          >
            <img src={ICONS.ARROW} alt="Arrow" className="size-8" />
          </button>

          <Typography
            text={
              currentStage === "SET_USER_DATA_STAGE"
                ? "Ваши данные"
                : "Карта оплаты"
            }
            size="xl"
          />
        </div>
      </div>

      {currentStage === "SET_USER_DATA_STAGE" && <CreatePaymentUserDataForm />}

      {currentStage === "SET_USER_CART_STAGE" && <CreatePaymentUserCartForm />}
    </div>
  );
};
