"use client";

import { useShallow } from "zustand/react/shallow";
import { useRouter } from "next/navigation";

import { useOrdersStore } from "../_store";
import { OrderTypeName, orderTypeNames } from "../_constants";

import { ToggleGroup, Typography } from "@/components";
import { FullOrderCard, PartialOrderCard } from ".";

export const OrdersSheet = ({ orders }: { orders: PizzaOrder[] }) => {
  const { currentStage, setCurrentStage } = useOrdersStore(
    useShallow(state => ({
      currentStage: state.currentStage,
      setCurrentStage: state.setCurrentStage,
    }))
  );

  const router = useRouter();

  return (
    <div className="w-full flex flex-col justify-between gap-6 px-4 sm:px-0">
      <Typography text="Заказы" size="xl" />

      {orders.length === 0 && (
        <h3 className="text-xl text-[#292929] font-semibold">
          Вы ничего не заказывали у нас. 🥹 <br /> Пора это исправлять! 👉{" "}
          <button onClick={() => router.push("/")}> 🍕</button>
        </h3>
      )}

      {orders.length !== 0 && (
        <>
          <ToggleGroup
            className="w-full max-w-[328px]"
            items={orderTypeNames}
            value={currentStage}
            onClick={value => setCurrentStage(value as OrderTypeName)}
          />

          {currentStage === "ACTIVE"
            ? orders
                .filter(order => order.status === 0)
                .map(order => (
                  <FullOrderCard
                    key={order._id}
                    id={order._id}
                    status={order.status}
                    address={order.receiverAddress}
                    pizzas={order.pizzas}
                  />
                ))
            : orders
                .filter(order => order.status !== 0)
                .sort((a, b) => a.status - b.status)
                .map(order => (
                  <PartialOrderCard
                    key={order._id}
                    id={order._id}
                    status={order.status}
                    address={order.receiverAddress}
                    pizzas={order.pizzas}
                  />
                ))}
        </>
      )}
    </div>
  );
};
