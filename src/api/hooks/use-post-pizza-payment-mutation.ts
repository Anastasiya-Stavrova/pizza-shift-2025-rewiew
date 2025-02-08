import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onError: error => {
      console.log(error);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    },
    onSuccess: () => {
      toast.success("Заказ успешно оформлен!📝", {
        icon: "✅",
      });
    },
    ...settings?.options,
  });
};
