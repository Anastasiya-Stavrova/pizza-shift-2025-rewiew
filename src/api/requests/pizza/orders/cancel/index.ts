import { instance } from "@/api/instance";

type PutCancelPizzaOrderParams = CancelPizzaOrderDto;

export type PutCancelPizzaOrderRequestConfig =
  RequestConfig<PutCancelPizzaOrderParams>;

export const putCancelPizzaOrder = async ({
  params,
  config,
}: PutCancelPizzaOrderRequestConfig) => {
  return instance.put<BaseResponse>("pizza/orders/cancel", params, config);
};
