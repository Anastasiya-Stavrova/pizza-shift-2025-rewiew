import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    onError: error => {
      console.log(error);
      toast.error("Не удалось обновить профиль", {
        icon: "❌",
      });
    },
    onSuccess: () => {
      toast.success("Профиль успешно обновлен!", {
        icon: "🙎🏻‍♂️",
      });
    },
    ...settings?.options,
  });
};
