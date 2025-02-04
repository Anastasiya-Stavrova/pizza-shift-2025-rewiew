import { useMutation } from "@tanstack/react-query";

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
    ...settings?.options,
  });
};
