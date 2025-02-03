import { useMutation } from "@tanstack/react-query";

import { Api } from "../api-client";
import { PutCancelPizzaOrderRequestConfig } from "../requests/pizza";

export const usePutPizzaOrdersCancelMutation = (
  settings?: MutationSettings<
    PutCancelPizzaOrderRequestConfig,
    typeof Api.pizza.putCancelPizzaOrder
  >
) => {
  return useMutation({
    mutationKey: ["putCancelPizzaOrder"],
    mutationFn: ({ params, config }) =>
      Api.pizza.putCancelPizzaOrder({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
