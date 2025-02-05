import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postAuthOtp, PostAuthOtpRequestConfig } from "../requests/auth/otp";

export const usePostAuthOtpMutation = (
  settings?: MutationSettings<PostAuthOtpRequestConfig, typeof postAuthOtp>
) => {
  return useMutation({
    mutationKey: ["postAuthOtp"],
    mutationFn: ({ params, config }) =>
      postAuthOtp({
        params,
        config: { ...settings?.config, ...config },
      }),
    onError: error => {
      console.log(error);
      toast.error("Не удалось отправить сообщение на данный номер", {
        icon: "❌",
      });
    },
    ...settings?.options,
  });
};
