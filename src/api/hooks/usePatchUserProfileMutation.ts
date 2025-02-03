import { useMutation } from "@tanstack/react-query";

import { Api } from "../api-client";
import { PatchUserProfileRequestConfig } from "../requests/user";

export const usePatchUserProfileMutation = (
  settings?: MutationSettings<
    PatchUserProfileRequestConfig,
    typeof Api.user.patchUserProfile
  >
) => {
  return useMutation({
    mutationKey: ["patchUserProfile"],
    mutationFn: ({ params, config }) =>
      Api.user.patchUserProfile({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
