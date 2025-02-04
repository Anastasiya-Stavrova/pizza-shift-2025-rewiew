import { useMutation } from "@tanstack/react-query";

import {
  patchUserProfile,
  PatchUserProfileRequestConfig,
} from "../requests/user";

export const usePatchUserProfileMutation = (
  settings?: MutationSettings<
    PatchUserProfileRequestConfig,
    typeof patchUserProfile
  >
) => {
  return useMutation({
    mutationKey: ["patchUserProfile"],
    mutationFn: ({ params, config }) =>
      patchUserProfile({
        params,
        config: { ...settings?.config, ...config },
      }),
    ...settings?.options,
  });
};
