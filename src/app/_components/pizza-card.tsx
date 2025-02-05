"use client";

import React from "react";
import { useMedia } from "react-use";
import Image from "next/image";

import { API_URL } from "@/constants";
import { getMinPizzaPrice } from "../_helpers";
import { cn } from "@/lib";

import { Button, PizzaModal, Typography } from "@/components";

interface PizzaCardProps {
  pizza: Pizza;
  className?: string;
}

export const PizzaCard = ({ pizza, className }: PizzaCardProps) => {
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);

  const isSmallDevice = useMedia("(max-width: 640px)", true);

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  return (
    <>
      <div
        className={cn(
          "flex sm:flex-col items-center justify-start sm:justify-between gap-6 w-full px-4 " +
            "sm:px-0 cursor-pointer sm:cursor-default sm:max-w-[300px] sm:h-[520px] mx-auto",
          className
        )}
        onClick={() => {
          if (isSmallDevice) {
            toggleDialog();
          }
        }}
      >
        <div className="size-[116px] sm:size-[220px]">
          <div className="relative size-[116px] sm:size-[220px]">
            <Image
              src={API_URL + pizza.img}
              alt={pizza.name}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL="/assets/images/pizza.png"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {isSmallDevice && (
          <div className="flex justify-between flex-col gap-2">
            <Typography text={pizza.name} size="md" className="font-medium" />

            <Typography
              text={pizza.description}
              size="xs"
              className="text-[#344051]"
            />

            <p className="font-normal text-[#535353] text-base"></p>

            <Typography
              text={`от ${getMinPizzaPrice(pizza.sizes)} ₽`}
              size="md"
              className="font-medium"
            />
          </div>
        )}

        {!isSmallDevice && (
          <div className="h-full w-full flex flex-col justify-between gap-8">
            <div className="w-full flex flex-col gap-2">
              <Typography text={pizza.name} size="lg" />

              <Typography
                text={pizza.description}
                size="md"
                className="text-[#535353]"
              />
            </div>

            <div className="w-full flex flex-col gap-6">
              <Typography
                text={`от ${getMinPizzaPrice(pizza.sizes)} ₽`}
                size="lg"
              />

              <Button onClick={toggleDialog}>Добавить</Button>
            </div>
          </div>
        )}
      </div>

      <PizzaModal
        isOpen={isOpenDialog}
        pizza={pizza}
        onClickOpenChange={toggleDialog}
      />
    </>
  );
};
