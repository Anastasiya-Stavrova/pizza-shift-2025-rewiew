import { useMutation } from "@tanstack/react-query";

import {
  postPizzaPayment,
  PostPizzaPaymentRequestConfig,
} from "../requests/pizza";

export const usePostPizzaPaymentMutation = (
  settings?: MutationSettings<
    PostPizzaPaymentRequestConfig,
    typeof postPizzaPayment
  >
) => {
  return useMutation({
    mutationKey: ["postPizzaPayment"],
    mutationFn: ({ params, config }) =>
      postPizzaPayment({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
