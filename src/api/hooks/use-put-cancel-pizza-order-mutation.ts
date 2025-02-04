import { useMutation } from "@tanstack/react-query";

import {
  putCancelPizzaOrder,
  PutCancelPizzaOrderRequestConfig,
} from "../requests/pizza";

export const usePutPizzaOrdersCancelMutation = (
  settings?: MutationSettings<
    PutCancelPizzaOrderRequestConfig,
    typeof putCancelPizzaOrder
  >
) => {
  return useMutation({
    mutationKey: ["putCancelPizzaOrder"],
    mutationFn: ({ params, config }) =>
      putCancelPizzaOrder({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
