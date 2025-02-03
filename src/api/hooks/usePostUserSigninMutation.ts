import { useMutation } from "@tanstack/react-query";

import { Api } from "../api-client";
import { PostUserSigninRequestConfig } from "../requests/user";

export function usePostUsersSignInMutation(
  settings?: MutationSettings<
    PostUserSigninRequestConfig,
    typeof Api.user.postUsersSignin
  >
) {
  return useMutation({
    mutationKey: ["postUserSignin"],
    mutationFn: ({ params, config }) =>
      Api.user.postUsersSignin({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
}
