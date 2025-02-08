"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return useMutation({
    mutationKey: ["putCancelPizzaOrder"],
    mutationFn: ({ params, config }) =>
      putCancelPizzaOrder({
        params,
        config: { ...settings?.config, ...config },
      }),
    onError: error => {
      console.log(error);
      toast.error("Не удалось отменить заказ", {
        icon: "❌",
      });
    },
    onSuccess: () => {
      toast.success("Заказ успешно отменен!", {
        icon: "📦",
      });
      router.refresh();
    },
    ...settings?.options,
  });
};
