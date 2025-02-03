import { instance } from "@/api/instance";

export type GetPizzaOrdersRequestConfig = RequestConfig;

export const getPizzaOrders = async (params?: GetPizzaOrdersRequestConfig) => {
  return instance.get<PizzaOrderResponse>("pizza/orders", params?.config);
};

export * from "./cancel";
export * from "./id";
