"use client";

import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import React from "react";

import { useBasketStore } from "@/store";
import { getBasketItemDetails } from "@/helpers";
import { useOrdersStore } from "@/app/orders/_store";
import { usePaymentStore } from "../_store";

import { Button, InfoCard, Typography } from "@/components";

export const Receipt = () => {
  const userData = usePaymentStore(state => state.userData);
  const setOrderStage = useOrdersStore(state => state.setCurrentStage);
  const { basketItems, totalAmount, clearBasket } = useBasketStore(
    useShallow(state => ({
      basketItems: state.basketItems,
      totalAmount: state.totalAmount,
      clearBasket: state.clearBasket,
    }))
  );

  const [oldBasketItems, oldTotalAmount] = React.useMemo(() => {
    return [basketItems, totalAmount];
  }, []);

  const router = useRouter();

  React.useEffect(() => {
    clearBasket();
  }, []);

  return (
    <div className="flex gap-6 flex-col">
      <InfoCard>
        <div className="flex flex-col gap-[2px]">
          <Typography text="Заказ" size="xs" />
          {oldBasketItems.map((item, index) => (
            <Typography
              key={index}
              text={`${item[1].name}, ${getBasketItemDetails(
                item[1].pizzaSize,
                new Set(item[1].toppings),
                item[1].quantity
              )}`}
              size="md"
            />
          ))}
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Адрес доставки" size="xs" />
          <Typography text={userData?.address || "Адрес..."} size="md" />
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Сумма заказа" size="xs" />
          <Typography text={`${oldTotalAmount} ₽`} size="md" />
        </div>

        <Typography
          text="Вся информация была продублирована в SMS"
          size="md"
          className="text-[#97A1AF]"
        />
      </InfoCard>

      <div className="flex gap-6 py-4 w-full max-w-[368px] flex-col sm:flex-row mx-auto sm:mx-0">
        <Button
          variant="secondary"
          onClick={() => {
            setOrderStage("ACTIVE");
            router.replace("/orders");
          }}
        >
          Детали заказа
        </Button>
        <Button onClick={() => router.replace("/")}>На главную</Button>
      </div>
    </div>
  );
};
