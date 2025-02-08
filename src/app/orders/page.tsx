import { Metadata } from "next";

import { Api } from "@/api";

import { Typography } from "@/components";
import { OrdersSheet } from "./_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | Заказы",
};

export default async function OrdersPage() {
  const getPizzaOrdersResponse = await Api.pizza.getPizzaOrders();

  if (!getPizzaOrdersResponse.data.success) {
    console.log(getPizzaOrdersResponse.data.reason);

    return (
      <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
        <Typography
          text="Не удалось загрузить заказы"
          size="xl"
          className="p-4"
        />
      </div>
    );
  }

  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <OrdersSheet orders={getPizzaOrdersResponse.data.orders} />
    </div>
  );
}
