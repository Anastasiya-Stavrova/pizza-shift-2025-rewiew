import { useMutation } from "@tanstack/react-query";

import { Api } from "../api-client";
import { PostPizzaPaymentRequestConfig } from "../requests/pizza";

export const usePostPizzaPaymentMutation = (
  settings?: MutationSettings<
    PostPizzaPaymentRequestConfig,
    typeof Api.pizza.postPizzaPayment
  >
) => {
  return useMutation({
    mutationKey: ["postPizzaPayment"],
    mutationFn: ({ params, config }) =>
      Api.pizza.postPizzaPayment({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
