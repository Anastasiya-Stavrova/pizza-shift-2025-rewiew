import { instance } from "@/api/instance";

type PostPizzaPaymentParams = CreatePizzaPaymentDto;

export type PostPizzaPaymentRequestConfig =
  RequestConfig<PostPizzaPaymentParams>;

export const postPizzaPayment = async ({
  params,
  config,
}: PostPizzaPaymentRequestConfig) => {
  return instance.post<PizzaPaymentResponse>("pizza/payment", params, config);
};
