import { Metadata } from "next";

import { Api, useGetPizzaOrderByIdQuery } from "@/api";

import { OrderDetails } from "../_components";

export const metadata: Metadata = {
  title: "ШИФТ PIZZA | информация о заказе",
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="custom-container w-full mt-6 sm:mt-12 gap-6 mb-[84px] sm:mb-12">
      <OrderDetails orderId={id} />
    </div>
  );
}
