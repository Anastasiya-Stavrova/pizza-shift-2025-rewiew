"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useGetPizzaOrderByIdQuery } from "@/api";
import { ICONS } from "@/constants";

import { Loader, Typography } from "@/components";
import { FullOrderCard } from "./full-order-card";

export const OrderDetails = ({ orderId }: { orderId: string }) => {
  const { data, error, isLoading } = useGetPizzaOrderByIdQuery({
    orderId,
  });

  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    setTimeout(() => {
      router.replace("/");
      toast.error("Не удалось получить заказ с таким id!", {
        icon: "❌",
      });
    }, 1000);

    return null;
  }

  const order = data!.data.order;

  return (
    <>
      <div className="w-full h-full flex flex-col sm:hidden">
        <div className="w-full flex gap-4 p-4 items-center">
          <button
            className="cursor-pointer w-fit h-fit p-0"
            onClick={() => router.back()}
          >
            <img src={ICONS.ARROW} alt="Arrow" className="size-8" />
          </button>
          <Typography text="Детали заказа" size="xl" />
        </div>
      </div>

      <div className="sm:flex flex-col gap-6 hidden">
        <button
          className="flex gap-1  group"
          onClick={() => {
            router.back();
          }}
        >
          <img src={ICONS.ARROW} alt="Arrow" />
          <p className="text-base text-[#97A1AF] group-hover:text-[#141C24] transition duration-300">
            Назад
          </p>
        </button>

        <Typography text="Детали заказа" size="xl" />
      </div>

      <div className="w-full flex flex-col justify-between gap-6 px-4 sm:px-0">
        <FullOrderCard
          id={order?._id}
          status={order.status}
          address={order.receiverAddress}
          pizzas={order.pizzas}
          isSpecificOrder={true}
        />
      </div>
    </>
  );
};
