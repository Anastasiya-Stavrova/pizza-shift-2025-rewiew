import { useMutation } from "@tanstack/react-query";

import { Api } from "../api-client";
import { PostAuthOtpRequestConfig } from "../requests/auth/otp";

export const usePostAuthOtpMutation = (
  settings?: MutationSettings<
    PostAuthOtpRequestConfig,
    typeof Api.auth.postAuthOtp
  >
) => {
  return useMutation({
    mutationKey: ["postAuthOtp"],
    mutationFn: ({ params, config }) =>
      Api.auth.postAuthOtp({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
