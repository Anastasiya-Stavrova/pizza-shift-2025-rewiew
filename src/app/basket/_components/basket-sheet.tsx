"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import toast from "react-hot-toast";

import { useBasketStore } from "@/store";
import { ICONS, ROUTES } from "@/constants";
import { usePaymentStore } from "@/app/payment/_store";

import { Button, Typography } from "@/components";
import { BasketItem } from ".";

export const BasketSheet = () => {
  const resetStage = usePaymentStore(state => state.resetStage);
  const { totalAmount, basketItems } = useBasketStore(
    useShallow(state => ({
      totalAmount: state.totalAmount,
      basketItems: state.basketItems,
    }))
  );

  const router = useRouter();

  const PaymentButton = () => {
    return (
      <Button
        className="max-w-[328px]"
        onClick={() => {
          if (totalAmount === 0) {
            toast.error("В вашей корзине нет товаров для оплаты!", {
              icon: "❌",
            });
          } else {
            resetStage();
            router.push(ROUTES.PAYMENT);
          }
        }}
      >
        Оформить заказ
      </Button>
    );
  };

  return (
    <div className="w-full flex flex-col gap-6 px-4 sm:px-0  mb-[130px] sm:mb-0">
      <div className="w-full h-full flex flex-col sm:hidden">
        <div className="w-full flex gap-4 p-4 items-center">
          <button
            className="cursor-pointer w-fit h-fit p-0"
            onClick={() => router.back()}
          >
            <img src={ICONS.ARROW} alt="Arrow" className="size-8" />
          </button>
          <Typography text="Корзина" size="xl" />
        </div>
      </div>

      <Typography text="Корзина" size="xl" className="hidden sm:block" />

      <div className="flex flex-col gap-6">
        {basketItems.map((item, index) => (
          <BasketItem key={index} item={item} />
        ))}
      </div>

      <hr className="bg-[#E3E5E5]" />

      <div className="fixed bottom-[60px] right-0 left-0 w-full sm:hidden bg-background">
        <div className="w-full flex flex-col items-center justify-between gap-4 p-4 rounded-sm sheet-shadow">
          <div className="flex flex-row gap-6">
            <Typography
              text="Стоимость заказа:"
              size="md"
              className="font-medium"
            />
            <Typography
              text={`${totalAmount} ₽`}
              size="md"
              className="font-medium"
            />
          </div>
          <PaymentButton />
        </div>
      </div>

      <div className="hidden sm:flex items-center justify-between gap-6">
        <div className="flex flex-row gap-6 min-w-fit">
          <Typography text="Стоимость заказа:" size="xl" />
          <Typography text={`${totalAmount} ₽`} size="xl" />
        </div>
        <PaymentButton />
      </div>
    </div>
  );
};
