import { useMutation } from "@tanstack/react-query";

import { PostUserSigninRequestConfig, postUsersSignin } from "../requests/user";

export function usePostUsersSignInMutation(
  settings?: MutationSettings<
    PostUserSigninRequestConfig,
    typeof postUsersSignin
  >
) {
  return useMutation({
    mutationKey: ["postUserSignin"],
    mutationFn: ({ params, config }) =>
      postUsersSignin({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
}
