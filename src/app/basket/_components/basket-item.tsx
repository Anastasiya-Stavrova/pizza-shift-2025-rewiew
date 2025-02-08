"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { BasketItemState } from "@/store";
import { useBasket } from "@/hooks";
import { getBasketItemDetails } from "@/helpers";

import { Button, PizzaModal, Typography } from "@/components";
import { CountButton } from ".";

export const BasketItem = ({ item }: { item: BasketItemState }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  console.log("BasketItem Render");
  const { removeBasketItem, updateItemQuantity } = useBasket();

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const onClickCountButton = (type: "plus" | "minus") => {
    const changedValue = type === "plus" ? 1 : -1;
    updateItemQuantity(item, changedValue);
  };

  return (
    <>
      <div className="w-full flex gap-4 sm:items-center sm:gap-6">
        <div className="size-[66px] relative min-w-[66px] sm:mb-auto">
          <Image
            fill
            sizes="66px"
            style={{ objectFit: "contain" }}
            src={process.env.NEXT_PUBLIC_API_URL + item[0].img}
            alt={item[1].name}
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-4 sm:items-center flex-wrap lg:flex-nowrap">
          <Typography
            text={item[1].name}
            size="md"
            className="font-medium sm:min-w-[120px] sm:max-w-[120px] sm:mb-auto"
          />

          <Typography
            text={getBasketItemDetails(
              item[1].pizzaSize,
              new Set(item[1].toppings)
            )}
            size="md"
            className="sm:max-w-[calc(100%-144px)] lg:min-w-[280px] lg:max-w-[280px] sm:mb-auto"
          />

          <div className="flex flex-col gap-6 justify-between sm:flex-row sm:gap-4 sm:w-full">
            <div className="w-full flex gap-8 items-center justify-between sm:hidden">
              <Typography
                text={`${item[1].price * item[1].quantity} ₽`}
                size="md"
                className="font-medium min-w-fit"
              />

              <Button
                variant="link"
                onClick={toggleDialog}
                className="p-1 h-fit w-fit"
              >
                Изменить
              </Button>
            </div>

            <div className="w-full flex gap-8 items-center justify-between sm:gap-4 sm:items-ctart">
              <div className="sm:mr-6">
                <CountButton
                  value={item[1].quantity}
                  onClick={onClickCountButton}
                />
              </div>

              <div className="w-full sm:flex gap-8 items-center justify-start hidden">
                <Button
                  variant="link"
                  onClick={toggleDialog}
                  className="p-1 h-fit w-fit min-w-[100px]"
                >
                  Изменить
                </Button>

                <Typography
                  text={`${item[1].price * item[1].quantity} ₽`}
                  size="md"
                  className="font-medium min-w-fit"
                />
              </div>

              <button type="button" className="ml-auto">
                <X
                  className="text-[#141C24] cursor-pointer hover:text-[#637083]"
                  size={24}
                  onClick={() => removeBasketItem(item)}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <PizzaModal
        isOpen={isOpenDialog}
        pizza={item[0]}
        item={item[1]}
        onClickOpenChange={toggleDialog}
      />
    </>
  );
};
