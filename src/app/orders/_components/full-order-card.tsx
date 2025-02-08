"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  useGetPizzaCatalogQuery,
  usePutPizzaOrdersCancelMutation,
} from "@/api";
import { useBasket } from "@/hooks";
import { calcTotalPizzaPrice } from "@/helpers";
import { mapPizzaSizeToNumber } from "@/constants";
import { getOrderDetails } from "../_helpers";
import {
  mapOrderStatusToColor,
  mapOrderStatusToDescription,
} from "../_constants";

import {
  Button,
  InfoCard,
  Loader,
  QuestionModal,
  Typography,
} from "@/components";
import { PartialOrderCardProps } from "./partial-order-card";

type FullOrderCardProps = PartialOrderCardProps & {
  isSpecificOrder?: boolean;
};

export const FullOrderCard = ({
  id,
  address,
  pizzas,
  status,
  isSpecificOrder = false,
}: FullOrderCardProps) => {
  const [submitting, setSubmitting] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const { clearBasket, addBasketItem } = useBasket();

  const putPizzaOrdersCancelMutation = usePutPizzaOrdersCancelMutation();
  const { data, error } = useGetPizzaCatalogQuery();

  const { orderAddress, orderStructure, totalAmount } = getOrderDetails(
    address,
    pizzas,
    true
  );

  const router = useRouter();

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const onClickCancelOrder = async () => {
    setSubmitting(true);
    try {
      await putPizzaOrdersCancelMutation.mutateAsync({
        params: { orderId: id },
      });
    } catch {
    } finally {
      setSubmitting(false);
      toggleDialog();
    }
  };

  const onClickReorder = () => {
    clearBasket();

    if (error) {
      return;
    }

    pizzas.forEach(orderedPizza => {
      const similarPizza = data?.data.catalog.find(
        pizza => pizza.id === orderedPizza.id
      )!;

      const selectedToppings = orderedPizza.toppings.map(
        topping => topping.name
      );

      addBasketItem([
        similarPizza,
        {
          name: orderedPizza.name,
          pizzaSize: mapPizzaSizeToNumber[orderedPizza.size.name],
          quantity: 1,
          toppings: selectedToppings,
          price: calcTotalPizzaPrice(
            similarPizza.sizes.find(
              size => size.name === orderedPizza.size.name
            )!,
            similarPizza.toppings,
            new Set(selectedToppings)
          ),
        },
      ]);
    });

    router.push("/basket");
  };

  return (
    <>
      <InfoCard>
        <div className="flex flex-col gap-[2px]">
          <Typography text="Статус" size="xs" />

          <div className="flex gap-3 items-center">
            <div
              className="size-2 rounded-[50%]"
              style={{ background: mapOrderStatusToColor[status] }}
            />
            <Typography text={mapOrderStatusToDescription[status]} size="md" />
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Адрес доставки" size="xs" />
          <Typography text={orderAddress} size="md" />
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Состав заказа" size="xs" />

          {orderStructure.map((order, index) => (
            <p key={index} className="text-base">
              {order}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-[2px]">
          <Typography text="Сумма заказа" size="xs" />
          <Typography text={`${totalAmount} ₽`} size="md" />
        </div>

        {isSpecificOrder ? (
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="w-full max-w-[145px] hidden sm:block"
              onClick={() => {
                router.back();
              }}
            >
              Назад
            </Button>
            <Button
              className="w-full sm:max-w-[200px]"
              onClick={onClickReorder}
            >
              Повторить заказ
            </Button>
          </div>
        ) : (
          <Button className="w-full max-w-[328px]" onClick={toggleDialog}>
            Отменить заказ
          </Button>
        )}
      </InfoCard>

      <QuestionModal
        exitButtonText="Не отменять"
        question="Отменить заказ?"
        isOpen={isOpenDialog}
        submitting={submitting}
        onClickAgree={onClickCancelOrder}
        onClickOpenChange={toggleDialog}
        onClickExit={toggleDialog}
      />

      {submitting && <Loader />}
    </>
  );
};
