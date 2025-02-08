"use client";

import { useRouter } from "next/navigation";
import { useMedia } from "react-use";

import { getOrderDetails } from "../_helpers";
import {
  mapOrderStatusToColor,
  mapOrderStatusToDescription,
} from "../_constants";

import { Button, InfoCard, Typography } from "@/components";

export interface PartialOrderCardProps {
  id: string;
  status: OrderStatus;
  address: ReceiverAddress;
  pizzas: OrderedPizza[];
  className?: string;
}

export const PartialOrderCard = ({
  id,
  status,
  address,
  pizzas,
}: PartialOrderCardProps) => {
  const { orderAddress, orderStructure } = getOrderDetails(address, pizzas);

  const isSmallDevice = useMedia("(max-width: 640px)", true);

  const router = useRouter();

  if (isSmallDevice) {
    return (
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

        <Button
          variant="link"
          className="p-0 w-fit h-fit"
          onClick={() => {
            router.push(`orders/${id}`);
          }}
        >
          Подробнее
        </Button>
      </InfoCard>
    );
  }

  return (
    <div className="w-full flex gap-6 pb-6 border-b border-[#E3E5E5]">
      <div className="flex items-center h-fit gap-3 w-full max-w-[220px]">
        <div
          className="size-2 rounded-[50%]"
          style={{ background: mapOrderStatusToColor[status] }}
        />
        <Typography text={mapOrderStatusToDescription[status]} size="md" />
      </div>

      <Typography
        text={orderAddress}
        size="md"
        className="w-full max-w-[300px]"
      />

      <Typography
        text={orderStructure.join(", ")}
        size="md"
        className="w-full max-w-[300px]"
      />

      <Button
        variant="link"
        className="p-0 w-fit h-fit"
        onClick={() => {
          router.push(`orders/${id}`);
        }}
      >
        Подробнее
      </Button>
    </div>
  );
};
