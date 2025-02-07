"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { cn } from "@/lib";
import { BasketItemState } from "@/store";
import { useGetSpecificPizza } from "../_hooks";
import { getBasketItemDetails } from "../_helpers";

import { Button, PizzaModal, Typography } from "@/components";
import { BasketItemSkeleton, CountButton } from ".";

interface BasketItemProps {
  item: BasketItemState;
  className?: string;
  onClickRemoveItem: (cartItem: BasketItemState) => void;
  onClickUpdateItem: (cartItem: BasketItemState, quantity: number) => void;
}

export const BasketItem = ({
  item,
  className,
  onClickRemoveItem,
  onClickUpdateItem,
}: BasketItemProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { loading, specificPizza } = useGetSpecificPizza(item.id);

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  const onClickCountButton = (type: "plus" | "minus") => {
    const changedValue = type === "plus" ? 1 : -1;
    onClickUpdateItem(item, changedValue);
  };

  if (loading) {
    return <BasketItemSkeleton />;
  }

  return (
    <>
      <div
        className={cn("w-full flex gap-4 sm:items-center sm:gap-6", className)}
      >
        <div className="size-[66px] relative min-w-[66px] sm:mb-auto">
          <Image
            fill
            sizes="66px"
            style={{ objectFit: "contain" }}
            src={process.env.NEXT_PUBLIC_API_URL + item.img}
            alt={item.name}
          />
        </div>

        <div className="flex flex-col gap-2 w-full sm:flex-row sm:gap-4 sm:items-center flex-wrap lg:flex-nowrap">
          <Typography
            text={item.name}
            size="md"
            className="font-medium sm:min-w-[120px] sm:max-w-[120px] sm:mb-auto"
          />

          <Typography
            text={getBasketItemDetails(item.pizzaSize, item.toppings)}
            size="md"
            className="sm:max-w-[calc(100%-144px)] lg:min-w-[280px] lg:max-w-[280px] sm:mb-auto"
          />

          <div className="flex flex-col gap-6 justify-between sm:flex-row sm:gap-4 sm:w-full">
            <div className="w-full flex gap-8 items-center justify-between sm:hidden">
              <Typography
                text={`${item.price * item.quantity} ₽`}
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
                  value={item.quantity}
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
                  text={`${item.price * item.quantity} ₽`}
                  size="md"
                  className="font-medium min-w-fit"
                />
              </div>

              <button type="button" className="ml-auto">
                <X
                  className="text-[#141C24] cursor-pointer hover:text-[#637083]"
                  size={24}
                  onClick={() => onClickRemoveItem(item)}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <PizzaModal
        isOpen={isOpenDialog}
        pizza={specificPizza}
        item={item}
        onClickOpenChange={toggleDialog}
      />
    </>
  );
};
