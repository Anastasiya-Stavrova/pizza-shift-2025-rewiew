import { instance } from "@/api/instance";

export type GetPizzaOrderByIdRequestConfig = RequestConfig<CancelPizzaOrderDto>;

export const getPizzaOrderById = async ({
  params,
  config,
}: GetPizzaOrderByIdRequestConfig) => {
  return instance.get<PizzaOrderResponse>(
    `pizza/orders/${params.orderId}`,
    config
  );
};
